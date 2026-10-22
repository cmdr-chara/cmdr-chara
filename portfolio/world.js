// Event-order translation of the owned game's decompiled obj_mainchara.
// Step_0 -> collision events -> Step_2. Keep opposing keys: they cause wall dance.
export const FPS=30, SPEED=3, FRAME_SPEED=.2;
// Scenes are original rooms. Waterfall stitches room 105 to the shop room 124;
// the statue room 104 is the room_previous of 105, reached through its doorB;
// room 101 (room_water14) is joined to 104 by obj_door_s_musfade both ways.
export const scenes={
 waterfall:{width:660,height:240,parts:[{room:'room_water_prewaterfall',x:0},{room:'room_water_shop',x:340}],
  // The only added marker: the save star near the shop.
  extras:[{id:'save',x:420,y:147,sprite:'spr_savepoint'}]},
 statue:{width:320,height:240,parts:[{room:'room_water_statue',x:0}],extras:[]},
 // Corridor with the three glyph plaques (obj_readable_room1/2/3) and two
 // obj_foreground_waterfall. The Shyren NPCs exist only with flag 7 set and
 // obj_shyrentrigger is a story cutscene: neither is part of this walk.
 water14:{width:740,height:240,parts:[{room:'room_water14',x:0}],extras:[]},
};
export const WIDTH=scenes.waterfall.width, HEIGHT=240, parts=scenes.waterfall.parts, portfolioObjects=scenes.waterfall.extras;
export const spawn={x:390,y:117,facing:'down',renderFacing:'down',frame:0,moving:false};
export const playerBounds={left:0,right:19,top:19,bottom:29};
// Door behaviour from the original Other_19/Alarm_2 events.
// obj_doorB: entrance 2, room_previous; obj_doorA: entrance 1, room_next.
// obj_door_s_musfade: entrance 19 (obj_markers), alarm 14, 104 <-> 101 in its
// Alarm_2. obj_doorAmusicfade is a child of obj_doorA (alarm 13, room_next).
// Doors whose destination is not part of this site narrate a closed path.
export const doorRules={
 waterfall:{
  'room_water_prewaterfall:obj_doorB':{to:'statue',marker:'obj_markerB',delay:8},
  'room_water_shop:obj_doorXmusicfade':{shop:true,delay:13},
  'room_water_shop:obj_doorAmusicfade':{closed:'closedPath'},
  'room_water_shop:obj_doorCmusicfade':{closed:'closedPath'},
 },
 statue:{
  'room_water_statue:obj_doorA':{to:'waterfall',marker:'obj_markerA',room:'room_water_prewaterfall',delay:8},
  'room_water_statue:obj_door_s_musfade':{to:'water14',marker:'obj_markers',delay:14},
 },
 water14:{
  'room_water14:obj_door_s_musfade':{to:'statue',marker:'obj_markers',delay:14},
  // room_previous is 100 (room_water_onionsan), room_next 102 (room_water_piano).
  'room_water14:obj_doorB':{closed:'closedPath'},
  'room_water14:obj_doorAmusicfade':{closed:'closedPath'},
 },
};
function sceneOf(name){return scenes[name]??scenes.waterfall;}
export function interactionObjects(manifest,scene='waterfall'){const s=sceneOf(scene);return [...s.parts.flatMap(part=>manifest.rooms[part.room].props.map(p=>({...p,x:p.x+part.x}))),...s.extras].map(o=>{const b=manifest.sprites[o.sprite].bounds;return {...o,box:{x:o.x+b.left,y:o.y+b.top,w:b.right-b.left+1,h:b.bottom-b.top+1}};});}
export function collisionRects(manifest,scene='waterfall'){const s=sceneOf(scene);return [...s.parts.flatMap(part=>manifest.rooms[part.room].collisions.map(r=>({...r,x:r.x+part.x}))),...interactionObjects(manifest,scene).filter(o=>o.id).map(o=>({...o.box,kind:'npc',object:o.id}))];}
export function doors(manifest,scene='waterfall'){const s=sceneOf(scene),rules=doorRules[scene]??{};return s.parts.flatMap(part=>manifest.rooms[part.room].doors.map(d=>({...d,x:d.x+part.x,rule:rules[`${part.room}:${d.object}`]})).filter(d=>d.rule));}
export function overlaps(left,top,right,bottom,r){return right>=r.x&&left<r.x+r.w&&bottom>=r.y&&top<r.y+r.h;}
export function hits(x,y,rects,kind){return rects.some(r=>(!kind||(r.kind??'wall')===kind)&&overlaps(x,y,x+19,y+10,r));}
function wallRect(l,t,r,b,rects){return rects.some(o=>(o.kind??'wall')==='wall'&&overlaps(Math.min(l,r),Math.min(t,b),Math.max(l,r),Math.max(t,b),o));}
export function canStand(x,y,rects,width=WIDTH,height=HEIGHT){
 return Number.isFinite(x)&&Number.isFinite(y)&&x>=0&&x<=width-20&&y>=0&&y<=height-30&&!hits(x,y+19,rects);
}
export function stepPlayer(p,keys,rects,width=WIDTH,height=HEIGHT){
 const oldx=p.x,oldy=p.y;const left=keys.has('left'),right=keys.has('right'),up=keys.has('up'),down=keys.has('down');
 p.renderFacing=p.facing;p.imageSpeed=p.moving?FRAME_SPEED:0;
 // Step_0 selects the sprite BEFORE changing global.facing. Preserve its one-step lag.
 if(left){p.x-=oldx===p.x+3?2:3;if(!p.moving)p.frame=1;p.moving=true;p.imageSpeed=FRAME_SPEED;if(!(up&&p.facing==='up')&&!(down&&p.facing==='down'))p.facing='left';}
 if(up){p.y-=3;if(!p.moving)p.frame=1;p.moving=true;p.imageSpeed=FRAME_SPEED;if(!(right&&p.facing==='right')&&!(left&&p.facing==='left'))p.facing='up';}
 if(right&&!left){p.x+=oldx===p.x-3?2:3;p.moving=true;p.imageSpeed=FRAME_SPEED;if(!(up&&p.facing==='up')&&!(down&&p.facing==='down'))p.facing='right';}
 if(down&&!up){p.y+=3;if(!p.moving)p.frame=1;p.moving=true;p.imageSpeed=FRAME_SPEED;if(!(right&&p.facing==='right')&&!(left&&p.facing==='left'))p.facing='down';}
 // Collision_820 resets both axes, then resolves up AND down independently.
 // Holding Up+Down at the upper wall therefore alternates y=102/105 and facing.
 if(hits(p.x,p.y+19,rects,'wall')){
  p.x=oldx;p.y=oldy;
  if(up){
   if(wallRect(p.x+2,p.y+15,p.x+18,p.y+19,rects)){
    if(left&&!wallRect(p.x-3,p.y+19,p.x,p.y+19,rects)){p.x-=3;p.facing='left';}
    if(right&&!wallRect(p.x+22,p.y+19,p.x+19,p.y+19,rects)){p.x+=3;p.facing='right';}
   }else{p.y-=3;p.facing='up';}
  }
  if(down){
   if(wallRect(p.x+2,p.y+30,p.x+18,p.y+33,rects)){
    if(left&&!wallRect(p.x-3,p.y+29,p.x,p.y+29,rects)){p.x-=3;p.facing='left';}
    if(right&&!wallRect(p.x+22,p.y+29,p.x+19,p.y+29,rects)){p.x+=3;p.facing='right';}
   }else{p.y+=3;p.facing='down';}
  }
  p.moving=false;
 }
 // Collision_1365: readable solid objects stop movement without wall sliding.
 if(hits(p.x,p.y+19,rects,'npc')){p.x=oldx;p.y=oldy;p.moving=false;}
 // Doors sit on the room edge, so the player may step up to 10 pixels past it
 // Above, the mask (y+19..y+29) may reach the top edge: room 101's north
 // doors span y -10..9, so they need y <= -10.
 if(p.x<-10||p.x>width-10||p.y+19<0||p.y>height-30){p.x=oldx;p.y=oldy;p.moving=false;}
 // Step_2 overrides moving again when collision resolution actually moved the actor.
 if(!left&&!right&&!up&&!down)p.moving=false;
 if(oldx!==p.x||oldy!==p.y)p.moving=true;
 if(!p.moving){p.imageSpeed=0;p.frame=0;}
 return p;
}
export function advanceAnimation(p){const count=['left','right'].includes(p.renderFacing)?2:4;p.frame=(p.frame+(p.imageSpeed??0))%count;}
export function cameraPosition(p,width=WIDTH){return Math.max(0,Math.min(width-320,Math.round(p.x-160+10)));}
export function depth(y,height){return 50000-(y+height)*10;}
export function doorAt(p,list){return list.find(d=>overlaps(p.x,p.y+19,p.x+19,p.y+29,d));}
export function atShop(p,manifest){return doors(manifest).some(d=>d.rule.shop&&overlaps(p.x,p.y+19,p.x+19,p.y+29,d));}
export function markerPosition(manifest,scene,object,room){const s=sceneOf(scene);const part=s.parts.find(p=>!room||p.room===room);const m=manifest.rooms[part.room].instances.find(i=>i.objectName===object);return {x:part.x+m.x,y:m.y};}
export function shopReturnPosition(manifest){return markerPosition(manifest,'waterfall','obj_markerX','room_water_shop');}
export function saveScene(s){const sc=s?.version===3?s.scene:s?.version===2&&s.room==='waterfall'?'waterfall':null;return Object.hasOwn(scenes,sc??'')?sc:null;}
export function validSave(s,rects,scene='waterfall'){
 const sc=saveScene(s);
 if(!sc||sc!==scene)return false;
 const {width,height}=scenes[sc];
 return s.y>=60&&canStand(s.x,s.y,rects,width,height)&&['up','down','left','right'].includes(s.facing);
}
export const saveKey='chara-waterfall-v2';
