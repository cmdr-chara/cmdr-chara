// Web Audio playback with GameMaker semantics: snd_play starts a new,
// overlapping instance; caster_loop(song, volume, pitch) loops a song whose
// pitch changes its speed, as in the original. Browsers only allow sound after
// a user gesture, so nothing plays until unlock() runs from one.
export class Sound {
 constructor({sounds={},songs={},playlists={},enabled=true,base='game-assets/'}={}){
  this.base=base;this.files={...sounds,...songs};this.songs=songs;this.playlists=playlists;this.buffers={};this.enabled=enabled;this.song=null;this.wanted=null;this.ctx=null;this.layers={};this.wantedLayers={};this.hidden=false;this.streams=new Set();
 }
 async unlock(){
  if(this.ctx){if(!this.hidden&&this.ctx.state==='suspended')await this.ctx.resume().catch(()=>{});if(this.song?.playlist)this.playStream(this.song);return;}
  const AC=globalThis.AudioContext??globalThis.webkitAudioContext;if(!AC)return;
  this.ctx=new AC();this.master=this.ctx.createGain();this.master.connect(this.ctx.destination);this.master.gain.value=this.enabled?1:0;
  // Playlist tracks are streamed only when requested, including when their
  // logical name also appears in the old songs map. A long track never needs
  // a decoded, full-length AudioBuffer in memory.
  await Promise.all(Object.entries(this.files).filter(([name])=>!this.playlists[name]?.length).map(async([name,file])=>{try{const r=await fetch(this.base+file);this.buffers[name]=await this.ctx.decodeAudioData(await r.arrayBuffer());}catch{/* a missing sound stays silent */}}));
  if(this.wanted)this.music(...this.wanted);
  for(const [name,args] of Object.entries(this.wantedLayers))this.layer(name,...args);
 }
 setEnabled(on){this.enabled=on;if(this.master)this.master.gain.setTargetAtTime(on?1:0,this.ctx.currentTime,.05);}
 suspend(hidden){
  this.hidden=hidden;if(!this.ctx)return;
  if(hidden){for(const song of this.streams)song.media?.pause();this.ctx.suspend().catch(()=>{});}
  else this.ctx.resume().then(()=>{if(!this.hidden&&this.song?.playlist)this.playStream(this.song);}).catch(()=>{});
 }
 play(name,volume=.5,pitch=1){
  const b=this.buffers[name];if(!b||!this.enabled)return;
  const src=this.ctx.createBufferSource(),gain=this.ctx.createGain();src.buffer=b;src.playbackRate.value=pitch;gain.gain.value=volume;src.connect(gain).connect(this.master);src.start();return {src,gain};
 }
 // Loops `name`, starting at `start` seconds. Without `loop` the whole buffer
 // loops sample-accurately (caster_loop). With loop {start,end,crossfade} the
 // song plays once from `start`, then keeps returning from loop.end to
 // loop.start through an equal-power crossfade centred on both points.
 // A different song fades the current one out first, like the *musicfade
 // doors; the same song only adjusts its volume. A playlist can start at a
 // chosen track without changing this logical song identity.
 music(name,volume=.8,pitch=1,fade=.6,start=0,loop=null,trackIndex=0){
  this.wanted=[name,volume,pitch,fade,start,loop,trackIndex];if(!this.ctx)return;
  const now=this.ctx.currentTime;
  // null: no song, as when obj_ambientrain sets global.currentsong = -999.
  if(name===null){if(this.song)this.stopSong(fade);return;}
  if(this.song?.name===name){this.song.bus.gain.setTargetAtTime(volume,now,fade/3);return;}
  const delay=this.song?fade/2:0;
  if(this.song)this.stopSong(fade);
  const playlist=this.playlists[name],b=this.buffers[name];if(!playlist?.length&&!b)return;
  const bus=this.ctx.createGain();bus.gain.value=0;bus.gain.setTargetAtTime(volume,now+delay,fade/3);bus.connect(this.master);
  if(playlist?.length){
   const index=Number.isFinite(trackIndex)?Math.trunc(trackIndex):0;
   const song={name,bus,pitch,playlist,index:0,media:null,source:null,segments:[],timer:null,stopping:false};this.song=song;this.streams.add(song);this.streamTrack(song,((index%playlist.length)+playlist.length)%playlist.length);return;
  }
  const song={name,bus,buffer:b,pitch,loop,segments:[],timer:null};this.song=song;
  if(!loop){const seg=this.segment(song,Math.min(start,b.duration-1),now);seg.src.loop=true;return;}
  this.segment(song,start,now);this.scheduleLoop(song);
 }
 segment(song,offset,when,fadeIn=0){
  const src=this.ctx.createBufferSource(),gain=this.ctx.createGain();src.buffer=song.buffer;src.playbackRate.value=song.pitch;
  if(fadeIn)gain.gain.setValueCurveAtTime(curve(true),when,fadeIn);
  src.connect(gain).connect(song.bus);src.start(when,offset);
  const seg={src,gain,offset,began:when};song.segments=[...song.segments.slice(-1),seg];return seg;
 }
 scheduleLoop(song){
  const seg=song.segments.at(-1),{start,end,crossfade}=song.loop,half=crossfade/2,length=crossfade/song.pitch;
  const at=seg.began+(end-half-seg.offset)/song.pitch;
  const check=()=>{
   if(this.song!==song)return;
   // Schedule a few seconds ahead; a suspended context simply waits.
   if(this.ctx.currentTime<at-4){song.timer=setTimeout(check,1000);return;}
   const when=Math.max(at,this.ctx.currentTime+.05);
   seg.gain.gain.setValueCurveAtTime(curve(false),when,length);seg.src.stop(when+length+.05);
   this.segment(song,start-half,when,length);this.scheduleLoop(song);
  };
  check();
 }
 // Each playlist owns one media voice. End callbacks also check object
 // identity, so a skipped/stopped element cannot restart an obsolete track.
 streamTrack(song,index){
  if(this.song!==song)return;
  this.releaseMedia(song);song.index=index;
  const media=new Audio(),file=song.playlist[index].file;
  media.preload='metadata';media.playbackRate=song.pitch;
  media.src=/^(?:blob:|data:|https?:\/\/)/.test(file)?file:this.base+file;
  const source=this.ctx.createMediaElementSource(media);source.connect(song.bus);
  song.media=media;song.source=source;
  media.onended=()=>{if(this.song===song&&song.media===media&&!this.hidden)this.nextTrack();};
  this.playStream(song);
 }
 async playStream(song){
  const media=song.media;if(this.hidden||this.song!==song||!media)return;
  if(media.ended){this.nextTrack();return;}
  try{await media.play();}catch{/* Retry a browser-blocked play on unlock(). */}
  if(this.hidden||song.media!==media||this.song!==song&&!song.stopping)media.pause();
 }
 releaseMedia(song){
  const media=song.media;if(!media)return;
  media.onended=null;media.pause();song.source?.disconnect();
  media.removeAttribute('src');media.load();song.media=null;song.source=null;
 }
 nextTrack(){
  const song=this.song;if(!song?.playlist)return null;
  this.streamTrack(song,(song.index+1)%song.playlist.length);return this.track;
 }
 stopSong(fade=.6){
  const old=this.song;if(!old)return;
  const now=this.ctx.currentTime;clearTimeout(old.timer);old.bus.gain.setTargetAtTime(0,now,fade/4);this.song=null;
  if(old.playlist){
   old.stopping=true;if(old.media)old.media.onended=null;
   const release=()=>{this.releaseMedia(old);old.bus.disconnect();this.streams.delete(old);};
   if(fade>0)old.timer=setTimeout(release,fade*1000);else release();
  }else for(const s of old.segments)s.src.stop(now+fade);
 }
 // Looping ambient layers beside the song (rain, the statue's music box).
 // Each moves linearly toward its volume at `rate` per second; the original
 // ramps 0.02 per step at 30 steps/s, i.e. 0.6/s. A silent layer stops.
 layer(name,volume,{pitch=1,rate=.6}={}){
  this.wantedLayers[name]=[volume,{pitch,rate}];if(!this.ctx)return;
  const now=this.ctx.currentTime;let l=this.layers[name];
  if(!l){
   const b=this.buffers[name];if(!b||volume<=0)return;
   const src=this.ctx.createBufferSource(),gain=this.ctx.createGain();src.buffer=b;src.loop=true;gain.gain.value=0;src.connect(gain).connect(this.master);src.start();
   l=this.layers[name]={src,gain};
  }
  l.src.playbackRate.value=pitch;
  const from=l.gain.gain.value,length=Math.max(.02,Math.abs(volume-from)/rate);
  l.gain.gain.cancelScheduledValues(now);l.gain.gain.setValueAtTime(from,now);l.gain.gain.linearRampToValueAtTime(volume,now+length);
  clearTimeout(l.timer);
  if(volume<=0)l.timer=setTimeout(()=>{if(this.layers[name]===l){l.src.stop();delete this.layers[name];}},length*1000+50);
 }
 get ambience(){return Object.keys(this.layers).sort().join(' ');}
 get playing(){return this.song?.name??null;}
 get track(){const s=this.song;return s?.playlist?s.playlist[s.index].name:s?.name??null;}
 // Seconds into the current song.
 get position(){
  const x=this.song;if(!x)return null;if(x.playlist)return x.media?.currentTime??0;const now=this.ctx.currentTime;
  const seg=[...x.segments].reverse().find(s=>s.began<=now)??x.segments[0];const t=seg.offset+(now-seg.began)*x.pitch;
  return x.loop?t:t%x.buffer.duration;
 }
}
// Equal-power crossfade curves.
function curve(up){const c=new Float32Array(64);for(let i=0;i<64;i++){const a=i/63*Math.PI/2;c[i]=up?Math.sin(a):Math.cos(a);}return c;}
