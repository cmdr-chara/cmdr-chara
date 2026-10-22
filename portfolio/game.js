import {profile} from './portfolio.js';
import {NativeText,NativePause,NativeFade,NativeWaterfall,nativeInteraction} from './native-text.js';
import {FPS,scenes,spawn,interactionObjects,collisionRects,doors,doorAt,stepPlayer,advanceAnimation,cameraPosition,depth,markerPosition,shopReturnPosition,validSave,saveScene,saveKey} from './world.js';
import {LANGUAGES,LANGUAGE_KEY,detectLanguage,language,setLanguage,t,gmlText} from './i18n.js';
import {plain} from './text-layout.js';
import {Sound} from './audio.js';
import {shopPortraitX,shopPortraitLayout,shopStory,shopPageForOrigin,shopFiles,drawShopRoom,drawShopPanel} from './rouxls-shop.js';
const $=id=>document.getElementById(id),canvas=$('world'),screen=$('screen'),ctx=canvas.getContext('2d',{alpha:false});
const buffer=document.createElement('canvas');buffer.width=320;buffer.height=240;const base=buffer.getContext('2d',{alpha:false});let g=base;
// The shop interface is a transparent layer drawn over Chara's portrait.
const ui=document.createElement('canvas');ui.width=320;ui.height=240;const uiG=ui.getContext('2d');
const keys=new Set(),player={...spawn};
let manifest,images={},tiles={},font,ticks=0,last=0,accumulator=0,mode='loading',fade=0,dialog=null,helpTimeout;
let pauseMenu,transition,pendingRoom=null,charaSheet,poses,masks={};
let scene='waterfall',room=null,playTime=0,savedFile=null,saveError=false;
// global.flag[85] (umbrella held) and global.flag[86] (umbrella on the statue).
const flags={umbrella:false,statue:false};
const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches,AUDIO_KEY='chara-waterfall-audio';
const SHOP_ROOM=124,SHOP_TRACK_KEY='chara-waterfall-next-shop-track',SHOP_SELL_LIMIT=12;
let shopTrackIndex=0;
function storage(action){try{return action(localStorage);}catch{return null;}}
// Pixel art needs every game pixel to cover the same number of device pixels,
// so the canvas uses the largest whole multiple of 320x240. Only when that
// would waste more than 15% and each game pixel still spans 3+ device pixels
// (phones) does it fill the space; there the uneven remainder is invisible.
function resize(){
 const touch=matchMedia('(pointer:coarse),(max-width:700px)').matches,dpr=devicePixelRatio||1;
 const width=document.documentElement.clientWidth||innerWidth,height=document.documentElement.clientHeight||innerHeight;
 const fit=Math.max(.25,Math.min(width/320,(height-(touch?165:24))/240));
 const scale=fit*dpr,whole=Math.max(1,Math.floor(scale)),device=scale<1||(scale>=3&&(scale-whole)/scale>.15)?scale:whole;
 canvas.width=Math.round(320*device);canvas.height=Math.round(240*device);
 screen.style.width=`${canvas.width/dpr}px`;screen.style.height=`${canvas.height/dpr}px`;
}
addEventListener('resize',resize);resize();
function announce(text){$('status').textContent=text;}
// Original sounds and the two Waterfall songs of the local game copy.
// Audio is on by default and starts with the first key press or tap.
let audioOn=storage(st=>st.getItem(AUDIO_KEY))!=='off';
const sound=new Sound({enabled:audioOn,
 sounds:{text:'SND_TXT1.wav',select:'snd_select.wav',move:'snd_movemenu.wav',save:'snd_save.wav',power:'snd_power.wav',buyitem:'snd_buyitem.wav',squeak:'snd_squeak.wav'},
 songs:{waterquiet:'quiet.ogg',waterfall:'waterfall.ogg',ambientwater:'ambientwater.ogg',rain_deep:'rain_deep.ogg',musicbox:'musicbox.ogg'},
 playlists:{shop:[{name:'shopA',file:'shop-JR_PDfbgPW0.ogg'},{name:'shopB',file:'shop-FhwXL412A3s.ogg'},{name:'shopC',file:'shop-megalo-lullaby.mp3'}]}});
function play(n){sound.play(n,n==='text'?.35:.5);}
// Songs and rain come from the game's own files (UNDERTALE.exe archive).
// obj_quietwatermusic loops waterquiet at 0.8, pitch 0.9 (rooms 116, 124).
// The shop streams three arrangements in sequence, at their
// original speed, with the same door crossfade on entry and exit.
// obj_ambientrain is in room 101 too, but its Create plays rain only in rooms
// 104-110 and its Step only fades the rain out: room 101 has no rain.
function updateMusic(){
 if(mode==='loading')return;
 const statueRoom=mode!=='shop'&&scene==='statue';
 if(mode==='shop')sound.music('shop',.7,1,.6,0,null,shopTrackIndex);
 // obj_ambientrain sets global.currentsong to -999 in room 104: rain only.
 else if(statueRoom)sound.music(null);
 // Room 101: obj_ambientwater loops ambientwater (0.8) when no song plays.
 else if(scene==='water14')sound.music('ambientwater',.8,1);
 else sound.music('waterquiet',.8,.9);
 // Room 104 starts rain_deep at 0.5, pitch 0.9; outside 104-110 it ramps out.
 sound.layer('rain_deep',statueRoom?.5:0,{pitch:.9});
 // obj_musicstatue: the box loops at pitch 0.9 while the umbrella is on the
 // statue; leaving the room (Other_5) frees it at once.
 sound.layer('musicbox',statueRoom&&flags.statue?musicBox:0,{pitch:.9,rate:statueRoom?20:100});
}
// Music box volume: 0.25 when it starts; then, within 76 px of the statue,
// (100 - distance) / 100 (obj_musicstatue_Step_1, distance_to_object).
let musicBox=.25;
function tickMusicBox(){
 const s=statueProp();if(scene!=='statue'||!flags.statue||mode==='shop'||!s)return;
 const b=manifest.sprites[s.sprite].bounds,dx=Math.max(0,s.x+b.left-(player.x+19),player.x-(s.x+b.right)),dy=Math.max(0,s.y+b.top-(player.y+29),player.y+19-(s.y+b.bottom));
 const d=Math.hypot(dx,dy);if(d<76&&Math.abs((100-d)/100-musicBox)>.005){musicBox=(100-d)/100;sound.layer('musicbox',musicBox,{pitch:.9,rate:20});}
}
function syncMusic(){sound.setEnabled(audioOn);$('audio').textContent=t(audioOn?'audioOn':'audioOff');$('audio').setAttribute('aria-pressed',String(audioOn));}
function toggleAudio(){audioOn=!audioOn;storage(st=>st.setItem(AUDIO_KEY,audioOn?'on':'off'));sound.unlock();syncMusic();}
function syncShopMusic(){
 const row=$('shop-music');row.hidden=mode!=='shop';
 const track=manifest?.shopMusic?.tracks.find(track=>track.name===(sound.track??'shopA'));
 if(!track||row.dataset.track===track.name)return;
 row.dataset.track=track.name;
 const link=$('shop-music-link');link.href=track.url;link.textContent=track.label;link.title=track.title;
 $('shop-music-artist').textContent='— '+track.artist;
}
for(const type of ['keydown','pointerdown'])addEventListener(type,()=>sound.unlock(),{capture:true});
function showHelp(){document.body.classList.add('show-help');clearTimeout(helpTimeout);helpTimeout=setTimeout(()=>document.body.classList.remove('show-help'),4500);}
document.addEventListener('pointermove',e=>{if(e.clientY>innerHeight-45)showHelp();});

// ---- Bitmap text. fnt_maintext uses the derived atlas with accented letters.
function sprite(name,frame=0){const s=manifest.sprites[name];return images[s.frames[Math.floor(frame)%s.frames.length]];}
function drawSprite(name,x,y,frame=0,alpha=1){const s=manifest.sprites[name];if(alpha!==1)g.globalAlpha=alpha;g.drawImage(sprite(name,frame),Math.round(x-s.origin[0]),Math.round(y-s.origin[1]));g.globalAlpha=1;}
function clean(s){return String(s).replace(/[’‘]/g,"'").replace(/[“”]/g,'"').replace(/…/g,'...').replace(/[–—]/g,'-');}
function glyph(f,c){return f.glyphs[c]??f.glyphs[c.normalize('NFD')[0]];}
function width(s,f=font){return [...clean(s)].reduce((w,c)=>w+(glyph(f,c)?.advance??7),0);}
function text(s,x,y,color='#fff',fontId=2){
 const f=fontId===3?manifest.fonts.fnt_small:font,atlas=images[f.file];let dx=x;
 for(const c of clean(s)){const ch=glyph(f,c);if(!ch){dx+=7;continue;}
  let source=atlas;
  if(color!=='#fff'){const key=`${f.file}:${color}`;if(!images[key]){const c2=document.createElement('canvas');c2.width=atlas.width;c2.height=atlas.height;const q=c2.getContext('2d');q.drawImage(atlas,0,0);q.globalCompositeOperation='source-in';q.fillStyle=color;q.fillRect(0,0,c2.width,c2.height);images[key]=c2;}source=images[key];}
  g.drawImage(source,ch.x,ch.y,ch.w,ch.h,Math.round(dx+ch.offset),Math.round(y),ch.w,ch.h);dx+=ch.advance;
 }
}
function lines(s,max){const out=[];for(const p of String(s).split('\n')){let row='';for(const word of p.split(' ')){const next=row?`${row} ${word}`:word;if(width(next)>max&&row){out.push(row);row=word;}else row=next;}out.push(row);}return out;}
function paragraph(s,x,y,max,color='#fff',lineHeight=16){lines(s,max).forEach((l,i)=>text(l,x,y+i*lineHeight,color));}
function heart(x,y){drawSprite('spr_heartsmall',x,y);}
const rect=(l,top,r,b,color)=>{g.fillStyle=color;g.fillRect(l,top,r-l+1,b-top+1);};

// ---- Accessible hit areas over the 320x240 canvas.
function hitButton(label,x,y,w,h,action,url){
 const el=document.createElement(url?'a':'button');el.textContent=label;el.setAttribute('aria-label',label);
 Object.assign(el.style,{left:`${x/3.2}%`,top:`${y/2.4}%`,width:`${w/3.2}%`,height:`${h/2.4}%`});
 if(url){el.href=url;el.target='_blank';el.rel='noopener noreferrer';el.onclick=()=>action?.();}else el.onclick=e=>{e.preventDefault();play('select');action();};
 return el;
}
function change(next){mode=next;keys.clear();$('buttons').replaceChildren();canvas.dataset.mode=mode;}

// ---- Scenes and doors.
let world={rects:[],targets:[],doors:[],props:[],foregrounds:[]};
// obj_foreground_waterfall draws in room coordinates; the view is the camera.
function drawForeground(name,frame,x,y,sx,sy,angle,color,alpha){const im=sprite(name,frame);g.save();g.globalAlpha=alpha;g.drawImage(im,Math.round(x-cameraPosition(player,world.width)),Math.round(y),im.width*sx,im.height*sy);g.restore();}
function loadScene(name){
 scene=name;const s=scenes[name];
 world={width:s.width,height:s.height,rects:collisionRects(manifest,name),targets:interactionObjects(manifest,name),doors:doors(manifest,name),
  props:[...s.parts.flatMap(part=>manifest.rooms[part.room].props.map(o=>({...o,x:o.x+part.x}))),...s.extras],
  // Every obj_foreground_waterfall of the room runs its own Create on entry.
  foregrounds:s.parts.flatMap(part=>{const r=manifest.rooms[part.room];return r.instances.filter(i=>i.objectName==='obj_foreground_waterfall').map(i=>new NativeWaterfall(drawForeground,{x:part.x+i.x,y:i.y,roomWidth:r.width}));})};
 statueFx.drops.length=0;statueFx.plinks.length=0;
 canvas.dataset.scene=name;
}
function sceneAnnouncement(){return t({statue:'announceStatue',water14:'announceWater14'}[scene]??'announceWorld');}
function toWorld({transition:withFade=false}={}){change('world');transition=withFade?new NativeFade():null;fade=transition?.alpha??0;announce(sceneAnnouncement());updateMusic();}
function roomChange(delay,finish){if(pendingRoom)return;keys.clear();transition=new NativeFade(320,240,true);fade=0;pendingRoom={remaining:delay,finish};}
function enterScene(name,position){loadScene(name);Object.assign(player,position,{renderFacing:player.facing,frame:0,moving:false});toWorld({transition:true});}

// ---- Dialogue. A script gives the opening pages and, for a choice, the
// follow-up that the original scr_msgup writes into the same box.
// respond(choice) runs its side effects once and returns ()=>pages or null.
function nativeText(pages,{shop=false,writerX=0,offsetY=0,lineHeight=null,respond=null}={}){
 const engine=new NativeText(pages,{playerY:shop?0:player.y,writerX,camera:shop?0:cameraPosition(player,world.width),shop,respond,
  drawText:(s,x,y,color,fontId)=>text(s,x,y+offsetY,color,fontId),drawRectangle:rect,drawHeart:heart,sound:play});
 if(lineHeight!==null)engine.writer.vspacing=lineHeight;
 return engine;
}
function startDialog(script){
 change('dialogue');
 dialog={script,followUp:null,signature:''};
 dialog.engine=dialogEngine(script.pages());
 syncButtons();
}
function dialogEngine(pages){const d=dialog;return nativeText(pages,{respond:choice=>{d.followUp=d.script.respond?.(choice)??(()=>[' %%']);return d.followUp();}});}
const say=key=>({pages:()=>[].concat(t(key))});
function finishDialog(){const d=dialog;dialog=null;if(d.script.after)d.script.after();else toWorld();}
// Language change: rebuild the box at the same page, fully written.
function rebuildDialog(){
 const d=dialog,old=d.engine,choiceState=old.choice&&!old.choice.destroyed?{mychoice:old.choice.mychoice}:null;
 const pages=old.global.msc>0&&d.followUp?d.followUp():d.script.pages();
 d.engine=dialogEngine(pages);d.engine.global.msc=old.global.msc;d.engine.choiceResult=old.choiceResult;
 const w=d.engine.writer,page=Math.min(old.page,pages.length-1);
 w.stringno=page;w.originalstring=w.mystring[page];w.stringpos=String(w.originalstring).length;d.signature='';
 if(choiceState){d.engine.draw();const c=d.engine.choice;if(c){c.mychoice=choiceState.mychoice;c.x=(c.mychoice?185:89)+d.engine.camera;}}
}

// ---- Save point: original message, then the original save box (menuno 4).
function saveFile(){
 const s={version:3,scene,x:player.x,y:player.y,facing:player.facing,umbrella:flags.umbrella,statue:flags.statue,time:playTime,name:'FRISK',love:1,room:SHOP_ROOM};
 const ok=storage(st=>{st.setItem(saveKey,JSON.stringify(s));return true;});
 if(!ok){saveError=true;return savedFile;}
 return {name:s.name,love:s.love,time:s.time,room:s.room};
}
function openSaveMenu(){
 change('menu');saveError=false;
 pauseMenu=pause({save:{file:savedFile,roomName:()=>t('roomName'),write:()=>(savedFile=saveFile())}});
 syncButtons();announce(t('announceSave'));
}
function pause(options={}){return new NativePause({playerY:player.y,camera:cameraPosition(player,world.width),localize:gmlText,drawText:(s,x,y,c,f)=>text(s,x,y,c,f),drawRectangle:rect,drawHeart:heart,sound:play,...options});}
function closeMenu(){if(saveError){saveError=false;startDialog(say('saveFailed'));return;}toWorld();}

// ---- Overworld objects. Every branch follows the object's original event.
function interact(){
 const o=nativeInteraction(player,world.targets);if(!o)return;
 play('select');
 if(o.id==='save'){play('power');startDialog({...say('savePoint'),after:openSaveMenu});}
 else if(o.object==='obj_sign_room')startDialog(say('sign'));
 else if(o.object==='obj_umbrellabox')startDialog({pages:()=>[t(flags.umbrella?'umbrellaReturn':'umbrellaTake')],respond:c=>{if(c!==0)return null;flags.umbrella=!flags.umbrella;const key=flags.umbrella?'umbrellaTook':'umbrellaReturned';return ()=>[t(key)];}});
 else if(o.object==='obj_sansbox')startDialog({pages:()=>[t('box')],respond:c=>{if(c!==0)return null;const i=Math.floor(Math.random()*3);return ()=>[t('boxEmpty')[i]];}});
 // obj_readable_room1/2/3 Alarm_0, room 101 branch.
 else if(/^obj_readable_room[123]$/.test(o.object))startDialog(say('glyph'+o.object.at(-1)));
 else if(o.object==='obj_musicstatue'){
  if(flags.statue)startDialog(say('statuePlaying'));
  else if(flags.umbrella)startDialog({pages:()=>[t('statueOffer')],respond:c=>{if(c!==0)return null;flags.umbrella=false;flags.statue=true;musicBox=.25;updateMusic();return ()=>t('statuePlaced');}});
  else startDialog(say('statue'));
 }
}

// ---- Shop: the menu state machine of obj_shop2 (menu 0 main, 1 list,
// 2 confirm, 3 talk, 4 full-width text). Portfolio items replace the goods.
const shop={menu:0,menuc:[0,0,0,0,0],sidemessage:0,sell:0,soldo:0,visitSells:0,kickDelay:-1,kickedLastVisit:false,returnedAfterKick:false,visits:0,greeting:0,returnVisits:0,returnGreeting:0,farewells:0,farewell:0,smallTalks:0,smallTalk:0,minimenuy:120,writer:null,confirm:'project',pages:[],origins:[]};
const topics=()=>[...t('shopTopics')];
// Choose alternatives only at an entry or a new conversation. Repainting,
// returning to the counter and translating must keep the current thought.
const shopGreetingScript=()=>shop.returnedAfterKick?t('shopReturnGreetings')[shop.returnGreeting]:t('shopGreetings')[shop.greeting];
const shopKickingOut=()=>shop.menu===4&&shop.sell===1&&shop.visitSells>=SHOP_SELL_LIMIT;
function ejectFromShop(){if(pendingRoom)return;shop.kickedLastVisit=true;leaveShop();}
function shopFullScript(){
 if(shop.sell===1){
  const replies=t('shopSell'),warnings=t('shopSellWarnings');
  const message=shop.visitSells>=SHOP_SELL_LIMIT?t('shopSellKick'):shop.visitSells>=SHOP_SELL_LIMIT-2?warnings[shop.visitSells-(SHOP_SELL_LIMIT-2)]:replies[(shop.soldo-1)%replies.length];
  return {pages:[message],origins:[{paragraph:0,part:0}]};
 }
 if(shop.sell===2)return {pages:[t('shopFarewells')[shop.farewell]],origins:[{paragraph:0,part:0}]};
 const lang=language();
 if(shop.sell===3)return shopStory(profile.about[lang]);
 if(shop.sell===4)return shopStory(profile.stack[lang]);
 if(shop.sell===7)return shopStory(t('shopSmallTalk')[shop.smallTalk]);
 // Buy: the story of the chosen project, told before the confirmation.
 if(shop.sell===6)return shopStory(profile.projects[shop.menuc[1]].story[lang]);
 return shopStory(t('contacts',profile.handle));
}
const shopReaderTitle=()=>shop.sell===6?profile.projects[shop.menuc[1]].name:shop.sell===7?topics()[3]:shop.sell>=3?topics()[shop.sell-3]:t('shopMenu')[shop.sell===2?3:1];
function shopWriter(full=false){
 const oldPage=full&&shop.writer?shop.writer.page:0,origin=shop.origins[oldPage];
 const script=shop.menu===4?shopFullScript():null;
 const spec=shop.menu===0?[[shopGreetingScript()],0]:shop.menu===1?[[t('shopBuySide')[shop.sidemessage]],210]:shop.menu===3?[[t('shopTalkSide')],210]:script?[script.pages,10]:null;
 shop.pages=spec?.[0]??[];shop.origins=script?.origins??[];
 const page=script?shopPageForOrigin(shop.origins,full?origin:null):oldPage;
 shop.writer=spec?nativeText(spec[0],{shop:true,writerX:spec[1],offsetY:shop.menu===4?(shop.sell>=3?25:8):0,lineHeight:shop.menu===4&&shop.sell>=3?21:null}):null;
 if(full&&shop.writer){const w=shop.writer.writer;w.stringno=Math.min(page,spec[0].length-1);w.originalstring=w.mystring[w.stringno];w.stringpos=String(w.originalstring).length;}
}
function shopAnnouncement(){
 const lang=language();
 if(shop.menu===0)return plain(shopGreetingScript())+' '+t('announceShop');
 if(shop.menu===1)return t('announceProjects')+profile.projects.map(p=>p.name).join(', ');
 if(shop.menu===2)return shop.confirm==='github'?t('announceGithub'):t('announceOpen')+profile.projects[shop.menuc[1]].name+'? '+profile.projects[shop.menuc[1]].description[lang];
 if(shop.menu===3)return t('announceTopics')+topics().join(', ');
 const page=shop.writer?.page??0;
 if(shop.sell<3)return plain(shop.pages[page]??'');
 return `${shopReaderTitle()}. ${t('shopReaderPage',page+1,shop.pages.length)}. ${plain(shop.pages[page]??'')}`;
}
function setShopMenu(menu){
 // Back at the counter the original resets every sub-menu cursor.
 if(menu===0){shop.sidemessage=0;shop.sell=0;shop.menuc=[shop.menuc[0],0,0,0,0];}
 if(menu===2)shop.menuc[2]=0;
 shop.menu=menu;shopWriter();syncButtons();announce(shopAnnouncement());
}
function openShop(){
 shop.visitSells=0;shop.kickDelay=-1;shop.returnedAfterKick=shop.kickedLastVisit;shop.kickedLastVisit=false;
 if(shop.returnedAfterKick)shop.returnGreeting=shop.returnVisits++%t('shopReturnGreetings').length;
 else shop.greeting=shop.visits++%t('shopGreetings').length;
 const next=Number(storage(st=>st.getItem(SHOP_TRACK_KEY))),count=manifest.shopMusic.tracks.length;
 shopTrackIndex=Number.isInteger(next)&&next>=0?next%count:0;
 storage(st=>st.setItem(SHOP_TRACK_KEY,String((shopTrackIndex+1)%count)));
 change('shop');shop.menuc=[0,0,0,0,0];shop.minimenuy=120;setShopMenu(0);transition=new NativeFade();fade=transition.alpha;updateMusic();
}
function leaveShop(){
 const current=manifest.shopMusic.tracks.findIndex(track=>track.name===sound.track);
 storage(st=>st.setItem(SHOP_TRACK_KEY,String(((current<0?shopTrackIndex:current)+1)%manifest.shopMusic.tracks.length)));
 roomChange(40,()=>{loadScene('waterfall');Object.assign(player,shopReturnPosition(manifest),{renderFacing:player.facing,frame:0});toWorld({transition:true});});
}
function shopConfirm(){
 const m=shop.menu,c=shop.menuc[m];
 if(m===0){if(c===0)setShopMenu(1);else if(c===1){shop.sell=1;shop.visitSells++;if(shop.visitSells<SHOP_SELL_LIMIT-2)shop.soldo++;setShopMenu(4);}else if(c===2)setShopMenu(3);else{shop.sell=2;shop.farewell=shop.farewells++%t('shopFarewells').length;setShopMenu(4);}}
 else if(m===1){if(c===profile.projects.length)setShopMenu(0);else{shop.sell=6;setShopMenu(4);}}
 else if(m===2){
  if(c===0){openTarget();play('buyitem');shop.sidemessage=1;}else shop.sidemessage=2;
  setShopMenu(shop.confirm==='github'?3:1);
 }
 else if(m===3){
  if(c<topics().length){
   // The fourth topic has its own ID; 6 remains the project's story/URL flow.
   shop.sell=c===3?7:c+3;
   if(c===3)shop.smallTalk=shop.smallTalks++%t('shopSmallTalk').length;
   setShopMenu(4);
  }else setShopMenu(0);
 }
 else{const page=shop.writer?.page;shop.writer?.input('confirm');if(shop.writer?.page!==page)announce(shopAnnouncement());}
}
function confirmUrl(){return shop.confirm==='github'?profile.github:profile.projects[shop.menuc[1]].url;}
function openTarget(){window.open(confirmUrl(),'_blank','noopener,noreferrer');}
function shopBack(){
 const m=shop.menu;
 if(m===0||m===4)shop.writer?.input('cancel');
 else if(m===2){shop.sidemessage=2;setShopMenu(shop.confirm==='github'?3:1);}
 else setShopMenu(0);
}
function leaveShopReader(){
 if(shop.menu!==4)return;
 if(shop.sell>=3){play('select');setShopMenu(shop.sell===6?1:3);}
 else shopBack();
}
function shopTick(){
 shop.writer?.tick();
 // The DELTARUNE info panel rises to y=10; reduced motion changes it at once.
 if((shop.menu===1||shop.menu===2&&shop.confirm==='project')&&shop.menuc[1]!==profile.projects.length){
  const y=shop.minimenuy,delta=2.5+(y>25?2.5:0)+(y>50?4:0)+(y>75?5:0);
  shop.minimenuy=reduced?10:Math.max(10,Math.round(y-delta));
 }else if(shop.minimenuy<120)shop.minimenuy=reduced?120:Math.min(120,shop.minimenuy+20);
 // The final warning completes on its own; confirming a ready page can
 // dismiss it sooner. Its state stays intact throughout the door fade.
 if(shopKickingOut()){
  if(pendingRoom)return;
  if(shop.writer?.closed){ejectFromShop();return;}
  if(shop.writer?.ready){
   if(shop.kickDelay<0)shop.kickDelay=45;
   else if(--shop.kickDelay<=0)ejectFromShop();
  }
  return;
 }
 if(shop.menu===4&&shop.writer?.closed){
  if(shop.sell===2){shop.writer=null;leaveShop();}
  else if(shop.sell===5){shop.confirm='github';setShopMenu(2);}
  else if(shop.sell===6){shop.sell=0;shop.confirm='project';setShopMenu(2);}
  else setShopMenu(shop.sell===1?0:3);
 }
}
function shopMove(dir){
 const max=[3,profile.projects.length,1,topics().length][shop.menu];if(max===undefined)return;
 shop.menuc[shop.menu]=(shop.menuc[shop.menu]+dir+max+1)%(max+1);syncButtons();
}

// ---- Buttons for pointer and assistive technology.
function syncButtons(){
 const list=[];
 if(mode==='dialogue'){
  const e=dialog.engine,c=e.choice;
  if(c&&!c.destroyed){const labels=choiceLabels(e);labels.forEach((label,i)=>{const el=hitButton(label,102+i*96-12,c.y-7,90,20,()=>{c.mychoice=i;c.x=(i?185:89)+e.camera;e.input('confirm');});el.disabled=!c.canchoose;list.push(el);});}
  else list.push(hitButton(t('continue'),16,e.dialoguer?.side?160:5,289,76,confirm));
 }
 if(mode==='shop'){
  const m=shop.menu,choose=i=>()=>{shop.menuc[m]=i;shopConfirm();},hover=(b,i)=>{b.onmouseenter=()=>{shop.menuc[m]=i;};return b;};
  if(m===0)t('shopMenu').forEach((label,i)=>list.push(hover(hitButton(label,220,126+i*20,98,20,choose(i)),i)));
  if(m===1)[...profile.projects.map(p=>p.name),t('shopExit')].forEach((label,i)=>list.push(hover(hitButton(label,20,126+i*20,185,20,choose(i)),i)));
  if(m===2){list.push(hover(hitButton(t('yes'),220,165,90,15,()=>{play('buyitem');shop.sidemessage=1;setShopMenu(shop.confirm==='github'?3:1);},confirmUrl()),0),hover(hitButton(t('no'),220,180,90,15,choose(1)),1));}
  if(m===3)[...topics(),t('shopExit')].forEach((label,i)=>list.push(hover(hitButton(label,20,126+i*20,185,20,choose(i)),i)));
  if(m===4&&shop.sell<3)list.push(hitButton(t('continue'),16,128,288,104,confirm));
  if(m===4&&shop.sell>=3){
   list.push(hitButton(t('continue'),20,216,88,20,confirm));
   list.push(hitButton(t('shopReaderReveal'),113,216,85,20,back));
   if(shop.sell>=3)list.push(hitButton(t(shop.sell===6?'shopReaderBackProjects':'shopReaderBackTopics'),202,216,102,20,leaveShopReader));
  }
 }
 if(mode==='menu'){
  if(pauseMenu.destination===0)[gmlText('ITEM'),gmlText('STAT')].forEach((label,i)=>{const b=hitButton(label,40,94+i*18,43,18,()=>{pauseMenu.global.menucoord[0]=i;menuConfirm();});b.onmouseenter=()=>pauseMenu.global.menucoord[0]=i;list.push(b);});
  else if(pauseMenu.destination===4){
   if(pauseMenu.global.menucoord[4]<2)[gmlText('Save'),gmlText('Return')].forEach((label,i)=>list.push(hitButton(label,68+i*90,108,80,20,()=>{pauseMenu.global.menucoord[4]=i;menuConfirm();})));
   else list.push(hitButton(gmlText('File saved.'),68,108,170,20,menuConfirm));
  }
  else list.push(hitButton(t('back'),97,29,167,203,back));
 }
 $('buttons').replaceChildren(...list);canvas.dataset.mode=mode;canvas.dataset.shopMenu=String(mode==='shop'?shop.menu:-1);
}
// Option labels as written on the choice row (columns 9 and 21).
function choiceLabels(e){const row=String(e.writer.originalstring).split('&').at(-1).replace(/\\C.*$/,'');return [row.slice(9,21).trim(),row.slice(21).trim()];}

// ---- Input.
function confirm(){
 if(pendingRoom||(mode==='world'&&fade>0))return;
 if(mode==='world'){interact();return;}
 play('select');
 if(mode==='menu')menuConfirm();
 else if(mode==='shop')shopConfirm();
 else if(mode==='dialogue')dialog.engine.input('confirm');
}
function back(){
 if(pendingRoom)return;
 if(mode==='dialogue')dialog.engine.input('cancel');
 else if(mode==='menu'){play('select');pauseMenu.input('back');if(pauseMenu.closed)closeMenu();else syncButtons();}
 else if(mode==='shop')shopBack();
}
function menu(){
 if(pendingRoom||(mode==='world'&&fade>0))return;
 if(mode==='menu'){if(pauseMenu.destination===4)return;pauseMenu.input('menu');if(pauseMenu.closed)toWorld();return;}
 if(mode!=='world')return;
 change('menu');pauseMenu=pause();syncButtons();announce(t('announceMenu'));
}
function menuConfirm(){
 const saving=pauseMenu.destination===4;pauseMenu.input('confirm');
 if(pauseMenu.closed){closeMenu();return;}
 syncButtons();
 announce(saving?t('announceSaved'):pauseMenu.destination===2?t('announceStats'):t('announceItems'));
}

// ---- Statue room: obj_musicstatue Alarm_5, obj_statuedrop and obj_statueplink.
const statueFx={drops:[],plinks:[],alarm:2};
function statueProp(){return world.props.find(o=>o.object==='obj_musicstatue');}
function plinkHit(s,x,y){const m=masks[`spr_plinkmask:${flags.statue?1:0}`];if(!m)return false;const mx=Math.floor(x-s.x),my=Math.floor(y-s.y);return mx>=0&&mx<m.width&&my>=0&&my<m.height&&m.alpha[my*m.width+mx]>0;}
function tickStatue(){
 const s=statueProp();if(!s||reduced)return;
 if(--statueFx.alarm<=0){statueFx.alarm=3;statueFx.drops.push({x:s.x+2+Math.random()*(40-6),y:-8-Math.random()*20,vy:2});}
 statueFx.drops=statueFx.drops.filter(d=>{
  d.vy+=.4;d.y+=d.vy;
  for(let r=0;r<6;r++)if(plinkHit(s,d.x,d.y+r)){for(let i=0;i<2;i++){const dir=(60+Math.random()*60)*Math.PI/180,sp=1+Math.random()*2;statueFx.plinks.push({x:d.x,y:d.y+5,vx:Math.cos(dir)*sp,vy:-Math.sin(dir)*sp,alpha:1});}return false;}
  return d.y<=s.y+100;
 });
 statueFx.plinks=statueFx.plinks.filter(p=>{p.vy+=.2;p.x+=p.vx;p.y+=p.vy;p.alpha-=.05;return p.alpha>=.05;});
}

// ---- Rendering.
function renderWorld(){
 const camera=cameraPosition(player,world.width),items=[];
 // GameMaker depth ordering: tiles, room instances, actor, foreground.
 for(const part of scenes[scene].parts)for(const layer of tiles[part.room])items.push({depth:layer.depth,draw:()=>g.drawImage(layer.canvas,part.x-camera,0)});
 for(const o of world.props){
  if(o.visible===false)continue;
  const height=manifest.sprites[o.sprite].height,frame=o.id==='save'&&!reduced?ticks/5:o.object==='obj_musicstatue'&&flags.statue?1:0;
  items.push({depth:depth(o.y,height),draw:()=>drawSprite(o.sprite,o.x-camera,o.y,frame)});
 }
 items.push({depth:depth(player.y,30),draw:()=>{
  const facing=player.renderFacing??player.facing;
  // Frisk: obj_mainchara's own dsprite/rsprite/usprite/lsprite (and the
  // umbrella set of SCR_TEXT 584), drawn at their original origins.
  if(profile.character!=='chara'){const name=`spr_mainchara${facing[0]}${flags.umbrella?'_umbrella':''}`;drawSprite(name,player.x-camera,player.y,reduced?0:Math.floor(player.frame)%manifest.sprites[name].frames.length);return;}
  const pose=poses[facing],frame=!reduced?Math.floor(player.frame)%pose.length:0;
  if(flags.umbrella){const meta=manifest.charaUmbrella[facing];g.drawImage(images[meta.frames[frame]],Math.round(player.x-camera-meta.origin[0]),Math.round(player.y-meta.origin[1]));}
  else{const [x,y,w,h]=pose[frame];g.drawImage(charaSheet,x,y,w,h,Math.round(player.x-camera),Math.round(player.y+30-h),w,h);}
 }});
 // obj_foreground_waterfall: object depth 1000, in front of the actor.
 for(const f of world.foregrounds)items.push({depth:1000,draw:()=>f.draw(camera,reduced)});
 if(scene==='statue'){
  items.push({depth:1000,draw:()=>{drawSprite('spr_statueshadow',-camera,0,0,.4);drawSprite('spr_statuelight',-camera,0,0,.1);}});
  items.push({depth:0,draw:()=>{for(const d of statueFx.drops)drawSprite('spr_statuedrop',d.x-camera,d.y);for(const p of statueFx.plinks)drawSprite('spr_statueplink',p.x-camera,p.y,0,p.alpha);}});
 }
 items.sort((a,b)=>b.depth-a.depth).forEach(o=>o.draw());
}
// Chara's illustration stands where obj_shopkeeper2 would be. It is drawn at
// screen resolution, not in the 320x240 buffer, so it is not pixelated.
function portrait(top,bottom,layer='charaPortrait',left=0,right=320){
 const p=shopPortraitLayout(manifest[layer]),k=canvas.width/320;
 ctx.save();ctx.beginPath();ctx.rect(left*k,top*k,(right-left)*k,(bottom-top)*k);ctx.clip();
 ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
 ctx.drawImage(images[manifest[layer].file],p.x*k,p.y*k,p.width*k,p.height*k);ctx.restore();
}
// DELTARUNE's decorated shop panels, with portfolio actions in the same slots.
function renderShopInterface(){
 const m=shop.menu,lang=language();
 const panel=(l,t,r,b)=>drawShopPanel(g,manifest.shopRouxls,images,l,t,r,b,ticks,{reduced});
 if(shop.minimenuy<120){
  panel(200,shop.minimenuy,319,127);
  const p=shop.confirm==='project'||m===1?profile.projects[shop.menuc[1]]:null;if(p)p.summary[lang].forEach((l,i)=>text(l,220,shop.minimenuy+14+i*16));
 }
 if(m<4){panel(0,120,207,239);panel(200,120,319,239);}else panel(0,120,319,239);
 if(m===0){t('shopMenu').forEach((s,i)=>text(s,240,130+i*20));heart(225,135+shop.menuc[0]*20);}
 if(m===1){profile.projects.forEach((p,i)=>text(p.name,30,130+i*20));text(t('shopExit'),30,130+profile.projects.length*20);heart(15,135+shop.menuc[1]*20);}
 if(m===2){
  if(shop.confirm==='github'){text('GitHub',15,130,'#ffff00');paragraph(profile.github.replace('https://',''),15,152,185);}
  else{const p=profile.projects[shop.menuc[1]];text(p.name,15,130,'#ffff00');paragraph(p.description[lang],15,152,185,'#fff',18);}
  const q=t(shop.confirm==='github'?'shopOpenGithub':'shopOpen');text(q[0],230,130);text(q[1],230,145);text(t('yes'),240,170);text(t('no'),240,185);heart(225,175+shop.menuc[2]*15);
 }
 if(m===3){topics().forEach((s,i)=>text(s,30,130+i*20));text(t('shopExit'),30,130+topics().length*20);heart(15,135+shop.menuc[3]*20);}
 if(m<4){text('0 D$',228,210);text('0/8',280,210);}
 if(m===4&&shop.sell>=3){
  const page=t('shopReaderPage',(shop.writer?.page??0)+1,shop.pages.length);
  text(shopReaderTitle(),22,134,'#e6cf99');text(page,298-width(page),134,'#918b9d');
  g.save();g.beginPath();g.rect(20,155,280,59);g.clip();shop.writer?.draw();g.restore();
  rect(22,216,297,216,'#302c39');
  const action=(key,label,x,active)=>{
   const w=key==='ESC'?24:12,color=active?'#e6cf99':'#ada6b8';
   rect(x,218,x+w-1,228,active?'#76674b':'#443d50');rect(x+1,219,x+w-2,227,'#100e15');
   const keyFont=key==='ESC'?manifest.fonts.fnt_small:font;
   text(key,x+Math.round((w-width(key,keyFont))/2),key==='ESC'?221:215,color,key==='ESC'?3:2);
   text(label,x+w+4,215,color);
  };
  action('Z',t('shopReaderNext'),22,shop.writer?.ready===true);
  action('X',t('shopReaderRevealLabel'),115,shop.writer?.ready!==true);
  if(shop.sell>=3)action('ESC',t('shopReaderBack'),205,false);
 }else shop.writer?.draw();
}
function render(){
 g=base;g.imageSmoothingEnabled=false;g.fillStyle='#000';g.fillRect(0,0,320,240);
 if(mode==='shop')drawShopRoom(g,manifest.shopRouxls,images,ticks,{reduced});else renderWorld();
 if(mode==='dialogue')dialog.engine.draw();
 if(mode==='menu')pauseMenu.draw();
 ctx.imageSmoothingEnabled=false;ctx.drawImage(buffer,0,0,canvas.width,canvas.height);
 if(mode==='shop'){
  // Scene behind the counter, then the interface, her contact with the rail,
  // and the pendant in front. Only the fingertip crosses the silver surface.
  portrait(0,124);
  g=uiG;uiG.clearRect(0,0,320,240);uiG.imageSmoothingEnabled=false;renderShopInterface();g=base;
  ctx.imageSmoothingEnabled=false;ctx.drawImage(ui,0,0,canvas.width,canvas.height);
  // The panel's black backing starts at120 but its silver rail begins at124.
  // Restore the torso into that gap; only her fingertip crosses the silver.
  portrait(120,124);
  portrait(124,127,'charaPortrait',shopPortraitX(137),shopPortraitX(185));
  // The necklace hangs in front of the box, over the first text row.
  portrait(0,240,'charaPendant');
 }
 if(fade>0){ctx.fillStyle=`rgba(0,0,0,${fade})`;ctx.fillRect(0,0,canvas.width,canvas.height);}
 const d=canvas.dataset;
 syncShopMusic();
 Object.assign(d,{x:String(player.x),y:String(player.y),facing:player.facing,frame:String(Math.floor(player.frame)),renderFacing:player.renderFacing??player.facing,moving:String(player.moving),
  spriteHeight:String(30*screen.clientHeight/240),tick:String(ticks),transitionAlpha:String(fade),transitionPending:String(Boolean(pendingRoom)),umbrella:String(flags.umbrella),statue:String(flags.statue),
  dialogReady:String(mode==='dialogue'&&dialog.engine.ready),dialogPage:String(mode==='dialogue'?dialog.engine.page:-1),choiceReady:String(mode==='dialogue'&&Boolean(dialog.engine.choice?.canchoose&&!dialog.engine.choice.destroyed)),
  pausePage:String(mode==='menu'?pauseMenu.destination:-1),shopPage:String(mode==='shop'&&shop.menu===4?shop.writer?.page??0:-1),shopPages:String(mode==='shop'&&shop.menu===4?shop.pages.length:0),shopParagraph:String(mode==='shop'&&shop.menu===4?shop.origins[shop.writer?.page??0]?.paragraph??0:-1),shopReady:String(mode==='shop'&&shop.writer?.ready===true),language:language(),music:String(sound.playing),shopTrack:sound.track??'',ambience:sound.ambience,musicTime:String(Math.round((sound.position??-1)*10)/10),audio:String(audioOn)});
}
function step(){
 ticks++;
 if(mode!=='loading')playTime++;
 if(transition&&(fade>0||pendingRoom))fade=transition.tick();
 if(pendingRoom){pendingRoom.remaining--;if(pendingRoom.remaining<=0){const action=pendingRoom.finish;pendingRoom=null;action();}}
 if(mode==='world'&&fade===0&&!pendingRoom){
  const before={x:player.x,y:player.y};
  stepPlayer(player,keys,world.rects,world.width,world.height);
  const door=doorAt(player,world.doors);
  if(door){const r=door.rule;
   if(r.shop)roomChange(r.delay,openShop);
   else if(r.to)roomChange(r.delay,()=>enterScene(r.to,markerPosition(manifest,r.to,r.marker,r.room)));
   else{Object.assign(player,before,{moving:false,frame:0});
    // Room 101's north doors lie above y=0: keep Chara whole inside the view.
    player.y=Math.max(0,player.y);startDialog(say(r.closed));}
  }
 }
 else{player.moving=false;player.imageSpeed=0;}
 tickStatue();tickMusicBox();
 if(mode==='shop')shopTick();
 if(mode==='dialogue'){
  const e=dialog.engine;e.tick();
  if(e.closed){finishDialog();return;}
  const signature=[e.page,e.ready,e.choice?.canchoose,e.choice?.mychoice,e.global.msc].join(':');
  if(signature!==dialog.signature){dialog.signature=signature;announce(plain(e.writer.originalstring));syncButtons();}
 }
}
function loop(now){accumulator+=Math.min(now-last,100);last=now;while(accumulator>=1000/FPS){step();render();advanceAnimation(player);accumulator-=1000/FPS;}requestAnimationFrame(loop);}

// ---- Language.
function localizeDocument(){
 const lang=language();document.documentElement.lang=lang;document.title=t('htmlTitle');
 document.querySelector('meta[name=description]').content=t('metaDescription');
 for(const el of document.querySelectorAll('[data-i18n]'))el.textContent=t(el.dataset.i18n);
 for(const el of document.querySelectorAll('[data-i18n-label]'))el.setAttribute('aria-label',t(el.dataset.i18nLabel));
 for(const b of document.querySelectorAll('#lang [data-lang]')){const on=b.dataset.lang===lang;b.setAttribute('aria-pressed',String(on));b.setAttribute('aria-label',on?`${b.textContent} · ${t('langName')}`:setLabel(b.dataset.lang));}
 const list=$('project-links');list.replaceChildren(...profile.projects.map(p=>{const li=document.createElement('li'),a=document.createElement('a');a.href=p.url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=p.name;li.append(a,document.createTextNode(' — '+p.description[lang]));return li;}));
 syncMusic();
}
function setLabel(lang){const prev=language();setLanguage(lang);const label=t('languageSwitch');setLanguage(prev);return label;}
function applyLanguage(next){
 if(!LANGUAGES.includes(next)||next===language())return;
 setLanguage(next);storage(st=>st.setItem(LANGUAGE_KEY,next));localizeDocument();
 if(mode==='dialogue')rebuildDialog();
 if(mode==='shop')shopWriter(true);
 if(mode!=='loading'){syncButtons();announce(mode==='shop'&&shop.menu===4?shopAnnouncement():t('languageChanged'));}
}
setLanguage(detectLanguage(storage(st=>st.getItem(LANGUAGE_KEY)),navigator.languages??[navigator.language]));localizeDocument();
for(const b of document.querySelectorAll('#lang [data-lang]'))b.onclick=()=>applyLanguage(b.dataset.lang);

const mapping={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down',a:'left',d:'right',w:'up',s:'down'};
document.addEventListener('keydown',e=>{
 if(e.target.closest?.('#text-version')||e.ctrlKey||e.metaKey||e.altKey)return;const k=e.key.length===1?e.key.toLowerCase():e.key;
 if(k==='l'&&!e.repeat){applyLanguage(language()==='it'?'en':'it');return;}
 if(mode==='loading'||pendingRoom)return;
 if(mapping[k]){
  e.preventDefault();document.body.classList.add('playing');const dir=mapping[k];
  if(mode==='dialogue'){const c=dialog.engine.choice;if(c&&!c.destroyed&&['left','right'].includes(dir)){dialog.engine.input(dir);syncButtons();}return;}
  if(mode==='menu'){if(!e.repeat){pauseMenu.input(dir);syncButtons();}return;}
  if(mode==='shop'){if(!e.repeat&&['up','down'].includes(dir))shopMove(dir==='up'?-1:1);return;}
  if(mode==='world')keys.add(dir);
  return;
 }
 if(!['z','x','c','m','f','Enter','Escape',' ','Shift'].includes(k))return;
 if(e.target.tagName==='A'&&k==='Enter')return;
 if(e.target.tagName==='BUTTON'&&(k==='Enter'||k===' '))return;
 if(k==='Escape'&&mode==='shop'&&shop.menu===4&&shop.sell>=3){e.preventDefault();if(!e.repeat)leaveShopReader();return;}
 e.preventDefault();if(e.repeat)return;
 if(k==='z'||k==='Enter'||k===' ')confirm();if(k==='x'||k==='Escape'||k==='Shift')back();if(k==='c')menu();if(k==='m')toggleAudio();if(k==='f')fullscreen();
});
document.addEventListener('keyup',e=>{const k=e.key.length===1?e.key.toLowerCase():e.key;if(mapping[k])keys.delete(mapping[k]);});
addEventListener('blur',()=>{keys.clear();player.moving=false;});
document.addEventListener('visibilitychange',()=>{keys.clear();sound.suspend(document.hidden);});
function fullscreen(){if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});else $('game').requestFullscreen().catch(()=>showHelp());}
$('fullscreen').onclick=fullscreen;$('audio').onclick=toggleAudio;
$('shop-music-next').onclick=()=>{sound.unlock();sound.nextTrack();syncShopMusic();};
for(const b of document.querySelectorAll('[data-key]')){
 b.onpointerdown=e=>{e.preventDefault();b.setPointerCapture(e.pointerId);const dir=b.dataset.key;
  if(mode==='world')keys.add(dir);
  else if(mode==='shop'&&['up','down'].includes(dir))shopMove(dir==='up'?-1:1);
  else if(mode==='menu'){pauseMenu.input(dir);syncButtons();}
  else if(mode==='dialogue'&&dialog.engine.choice&&!dialog.engine.choice.destroyed&&['left','right'].includes(dir)){dialog.engine.input(dir);syncButtons();}};
 b.onpointerup=b.onpointercancel=b.onlostpointercapture=()=>keys.delete(b.dataset.key);
}
for(const b of document.querySelectorAll('[data-action]'))b.onclick=()=>({menu,back,confirm}[b.dataset.action])();

// ---- Loading.
async function image(file){return new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>{images[file]=im;resolve(im);};im.onerror=()=>reject(Error(t('missingAsset')+file));im.src='game-assets/'+file;});}
function createTiles(){
 for(const [name,r] of Object.entries(manifest.rooms)){
  const groups=new Map();
  for(const tile of r.tiles){if(!groups.has(tile.depth))groups.set(tile.depth,[]);groups.get(tile.depth).push(tile);}
  tiles[name]=[...groups].map(([layerDepth,layer])=>{const c=document.createElement('canvas');c.width=r.width;c.height=r.height;const q=c.getContext('2d');q.imageSmoothingEnabled=false;
   for(const tile of layer){const im=images[manifest.backgrounds[tile.background]];q.drawImage(im,tile.sourceX,tile.sourceY,tile.width,tile.height,tile.x,tile.y,tile.width*tile.scaleX,tile.height*tile.scaleY);}
   return {depth:layerDepth,canvas:c};
  });
 }
}
function pixels(im){const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const q=c.getContext('2d',{willReadFrequently:true});q.drawImage(im,0,0);return {canvas:c,q,data:q.getImageData(0,0,c.width,c.height)};}
function prepareChara(){const {canvas:c,q,data}=pixels(images['chara-overworld.png']);const bg=data.data.slice(0,3);for(let i=0;i<data.data.length;i+=4)if((data.data[i]===bg[0]&&data.data[i+1]===bg[1]&&data.data[i+2]===bg[2])||(data.data[i]===195&&data.data[i+1]===134&&data.data[i+2]===255))data.data[i+3]=0;q.putImageData(data,0,0);charaSheet=c;}
function prepareMasks(){manifest.sprites.spr_plinkmask.frames.forEach((file,i)=>{const {data}=pixels(images[file]);const alpha=new Uint8Array(data.width*data.height);for(let p=0;p<alpha.length;p++)alpha[p]=data.data[p*4+3];masks[`spr_plinkmask:${i}`]={width:data.width,height:data.height,alpha};});}
function restore(){
 const s=storage(st=>JSON.parse(st.getItem(saveKey)));const sc=saveScene(s);
 if(!sc){loadScene('waterfall');return;}
 loadScene(sc);
 if(!validSave(s,world.rects,sc)){loadScene('waterfall');return;}
 Object.assign(player,{x:s.x,y:s.y,facing:s.facing,renderFacing:s.facing});
 flags.umbrella=s.umbrella===true;flags.statue=s.statue===true;playTime=Number.isFinite(s.time)?s.time:0;
 // Normalize old character metadata in memory; keep progress and disk data until Save.
 savedFile={name:'FRISK',love:1,time:playTime,room:SHOP_ROOM};
}
async function load(){
 try{
  const r=await fetch('game-assets/manifest.json');if(!r.ok)throw Error('manifest.json');manifest=await r.json();
  $('shop-music-credits').replaceChildren(...manifest.shopMusic.tracks.map(track=>{const li=document.createElement('li'),a=document.createElement('a');a.href=track.url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=track.label+' — '+track.artist;li.append(a);return li;}));
  const accents=manifest.fontAccents.fnt_maintext;font={file:accents.file,glyphs:{...manifest.fonts.fnt_maintext.glyphs,...accents.glyphs}};
  poses=manifest.charaWalk;
  // Chara's community sprites are loaded only when she is the playable character.
  const chara=profile.character==='chara',charaFiles=chara?['chara-overworld.png',...Object.values(manifest.charaUmbrella).flatMap(s=>s.frames)]:[];
  const files=new Set([...charaFiles,manifest.charaPortrait.file,manifest.charaPendant.file,font.file,manifest.fonts.fnt_small.file,...Object.values(manifest.backgrounds),...Object.values(manifest.sprites).flatMap(s=>s.frames),...shopFiles(manifest.shopRouxls)]);
  await Promise.all([...files].map(image));
  createTiles();if(chara)prepareChara();prepareMasks();
  $('chara-sprite-credit').hidden=!chara;
  restore();
  $('loading').hidden=true;toWorld({transition:true});requestAnimationFrame(loop);setTimeout(()=>document.body.classList.add('playing'),8000);
 }catch(e){console.error(e);$('loading').textContent=t('loadError');}
}
load();
