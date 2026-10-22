// Small adapter for the original GML events. It is not a general GameMaker VM.
// Text content, URL actions and browser accessibility are the portfolio boundary.
import {gmlEvents} from './gml-events.js';
const compiled=new Map();
function event(name,scope){
 if(!compiled.has(name)){
  const code=gmlEvents[name];if(!code)throw Error('Missing original event: '+name);
  compiled.set(name,new Function('scope','with(scope){\n'+code.replace(/with \(([^\n]+)\)/g,'with (__instance($1))')+'\n}'));
 }
 return compiled.get(name)(scope);
}
function proxy(target,builtins){return new Proxy(target,{has:()=>true,get:(obj,key)=>key===Symbol.unscopables?undefined:key in obj?obj[key]:key in builtins?builtins[key]:0,set:(obj,key,value)=>(obj[key]=value,true)});}
const colors=n=>'#'+[n&255,(n>>8)&255,(n>>16)&255].map(c=>c.toString(16).padStart(2,'0')).join('');
export class NativeText {
 constructor(pages,{playerY=0,camera=0,shop=false,writerX=0,respond=null,drawText=()=>{},drawRectangle=()=>{},drawHeart=()=>{},sound=()=>{}}={}){
  this.shop=shop;this.camera=camera;this.respond=respond;this.hooks={drawText,drawRectangle,drawHeart,sound};this.actors=[];this.drawColor=16777215;this.drawFont=2;this.pressed=-1;this.choiceResult=null;
  this.global={typer:shop?23:5,msg:[...pages,'%%%'],msc:0,facechoice:0,faceemotion:0,facechange:0,inbattle:0,choice:-1,flag:Array(600).fill(0),idealborder:[0,320]};
  this.builtins={global:this.global,view_xview:[camera],view_yview:[0],view_current:0,room:105,room_width:320,obj_mainchara:{y:playerY},
   round:Math.round,floor:Math.floor,random:n=>Math.random()*n,real:Number,string_char_at:(s,n)=>String(s??'').charAt(n-1),string_length:s=>String(s??'').length,
   keyboard_multicheck_pressed:i=>Number(this.pressed===i),keyboard_clear:()=>{},snd_play:()=>sound('text'),snd_stop:()=>{},
   draw_set_color:c=>{this.drawColor=c;},draw_set_font:f=>{this.drawFont=f;},
   draw_text:(x,y,t)=>drawText(t,x-camera,y,colors(this.drawColor),this.drawFont),
   draw_rectangle:(l,t,r,b)=>drawRectangle(l-camera,t,r-camera,b,colors(this.drawColor)),
   draw_sprite_ext:()=>{},
   instance_exists:id=>id===1569?1:Number(this.actors.some(a=>!a.destroyed&&(a.id===id||a===id))),
   instance_create:(x,y,id)=>this.create(id,x,y),
   __instance:id=>typeof id==='object'?id:this.actors.find(a=>!a.destroyed&&a.id===id)??proxy({destroyed:true},this.builtins),
  };
  for(const n of ['SCR_TEXTTYPE','SCR_TEXTSETUP','SCR_NEWLINE','scr_msgup'])this.builtins[n]='gml_Script_'+n;
  this.builtins.SCR_TEXT='portfolio-content';this.builtins.scr_facechoice='no-face';
  const machine=this;
  this.builtins.script_execute=function(name,...args){
   if(name==='no-face')return;
   // SCR_TEXT boundary: msc 0 is the opening text; the original scr_msgup
   // increments msc after a choice and asks for the follow-up messages.
   if(name==='portfolio-content'){if(args[0]>0){machine.choiceResult=machine.global.choice;machine.global.msg=[...(machine.respond?.(machine.global.choice)??[' %%']),'%%%'];}return;}
   const old=this.argument0;this.argument0=args[0]??0;for(let i=1;i<args.length;i++)this['argument'+i]=args[i];event(name,this);this.argument0=old;
  };
  this.builtins.instance_destroy=function(){this.destroyed=true;};
  this.builtins.event_user=function(){event('gml_Object_OBJ_WRITER_Other_10',this);};
  this.builtins.event_perform=function(){event('gml_Object_obj_choicer_Other_10',this);};
  if(shop)this.writer=this.create(782,writerX,110);else this.dialoguer=this.create(779,camera,0);
 }
 create(id,x,y){
  const kind={779:'obj_dialoguer',782:'OBJ_WRITER',783:'obj_choicer'}[id];if(!kind)throw Error('Unsupported native text object '+id);
  const actor=proxy({id,x,y,kind,alarm:Array(12).fill(-1),mystring:[],hspeed:0,vspeed:0,destroyed:false},this.builtins);this.actors.push(actor);
  if(id===782)this.writer=actor;if(id===783)this.choice=actor;if(id===779){this.dialoguer=actor;this.builtins.obj_dialoguer=actor;}
  event(`gml_Object_${kind}_Create_0`,actor);return actor;
 }
 input(kind){
  if(this.closed)return;
  if(kind==='left'||kind==='right'){if(this.choice&&!this.choice.destroyed)event(`gml_Object_obj_choicer_KeyPress_${kind==='left'?37:39}`,this.choice);return;}
  this.pressed=kind==='confirm'?0:1;
  if(kind==='cancel'&&this.shop&&this.writer.halt===0)this.writer.stringpos=this.writer.originalstring.length;
  if(this.choice&&!this.choice.destroyed)event('gml_Object_obj_choicer_Step_0',this.choice);
  else event('gml_Object_OBJ_WRITER_Step_0',this.writer);
  if(this.dialoguer&&!this.dialoguer.destroyed)event('gml_Object_obj_dialoguer_Step_0',this.dialoguer);
  this.pressed=-1;
 }
 tick(){
  for(const a of [...this.actors]){
   if(a.destroyed)continue;
   if(a.id===782)event('gml_Object_OBJ_WRITER_Step_1',a);
   for(let i=0;i<a.alarm.length;i++)if(a.alarm[i]>0){a.alarm[i]--;if(a.alarm[i]===0){a.alarm[i]=-1;event(`gml_Object_${a.kind}_Alarm_${i}`,a);}}
   if(a.id===782||a.id===783)event(`gml_Object_${a.kind}_Step_0`,a);
  }
  if(this.dialoguer&&!this.dialoguer.destroyed)event('gml_Object_obj_dialoguer_Step_0',this.dialoguer);
 }
 draw(){
  if(this.dialoguer&&!this.dialoguer.destroyed)event('gml_Object_obj_dialoguer_Draw_0',this.dialoguer);
  if(this.writer&&!this.writer.destroyed)event('gml_Object_OBJ_WRITER_Draw_0',this.writer);
  if(this.choice&&!this.choice.destroyed)this.hooks.drawHeart(this.choice.x-this.camera,this.choice.y);
 }
 get ready(){return this.writer.halt!==0;}
 get closed(){return Boolean(this.writer.destroyed);}
 get page(){return this.writer.stringno;}
}
export function nativeInteraction(player,targets){
 const facing={down:0,right:1,up:2,left:3};const actors=targets.map((t,i)=>({...t,nativeId:10000+i}));let selected=null;
 const builtins={global:{interact:0,facing:facing[player.facing]},instance_exists:()=>false,scr_interact:'interact',
  collision_rectangle:(l,t,r,b)=>actors.find(o=>Math.max(l,r)>=o.box.x&&Math.min(l,r)<o.box.x+o.box.w&&Math.max(t,b)>=o.box.y&&Math.min(t,b)<o.box.y+o.box.h)?.nativeId??-4,
 };
 const contexts=actors.map(a=>proxy(a,builtins));builtins.__instance=id=>contexts.find(a=>a.nativeId===id);
 builtins.script_execute=function(){selected=actors.find(a=>a.nativeId===this.nativeId);};
 const scope=proxy({...player,sprite_width:20,sprite_height:30,uncan:0},builtins);event('gml_Object_obj_mainchara_Other_10',scope);return selected;
}
export class NativePause {
 constructor({playerY=0,camera=0,save=null,localize=t=>t,drawText=()=>{},drawRectangle=()=>{},drawHeart=()=>{},sound=()=>{}}={}){
  this.camera=camera;this.pressed=null;this.paint=true;this.color=16777215;this.font=2;
  // Frisk uses SCR_GAMESTART's initial stats, Stick (3) and Bandage (4).
  // Internal AT/DF 10 draw as 0; the equipment adds 0, and NEXT is 10.
  // Equipped items are not in global.item, so ITEM stays empty.
  // No invented inventory or phone. Native ITEM stays in the main menu when
  // empty; native STAT renders game statistics. CELL requires a phone.
  // `save` opens the original save box (menuno 4) of obj_savepoint_Step_1:
  // {file:{name,love,time,room}|null, roomName(room), write()}.
  const global={interact:5,menuno:save?4:0,menucoord:Array(10).fill(0),menuchoice:[1,1,0],hp:20,maxhp:20,lv:1,gold:0,charname:'FRISK',item:Array(8).fill(0),itemname:Array(8).fill(' '),phone:Array(8).fill(0),phonename:Array(8).fill(' '),at:10,df:10,wstrength:0,adef:0,weapon:3,armor:4,xp:0,kills:0};
  const builtins={global,obj_mainchara:{y:playerY},view_xview:[camera],view_yview:[0],view_current:0,string:String,string_length:s=>String(s).length,round:Math.round,floor:Math.floor,
   draw_set_color:c=>this.color=c,draw_set_font:f=>this.font=f,draw_text:(x,y,t)=>{if(this.paint)drawText(localize(t),x-camera,y,colors(this.color),this.font);},
   draw_rectangle:(l,t,r,b)=>{if(this.paint)drawRectangle(l-camera,t,r-camera,b,colors(this.color));},draw_sprite:(id,frame,x,y)=>{if(this.paint)drawHeart(x-camera,y);},
   keyboard_multicheck_pressed:c=>Number(this.pressed==={13:'confirm',16:'back',17:'menu'}[c]),keyboard_check_pressed:c=>Number(this.pressed==={38:'up',40:'down',37:'left',39:'right'}[c]),
   // As in GameMaker, a cleared key is no longer pressed later in the same step.
   keyboard_clear:()=>{this.pressed=null;},
   instance_exists:()=>false,snd_play:n=>sound({25:'save',111:'select',112:'move',114:'squeak'}[n]??'move'),__instance:()=>({}),
   // undertale.ini is the browser save; scr_roomname and scr_save are the site's.
   ini_open:()=>0,ini_close:()=>{},
   ini_read_string:(section,key,fallback)=>key==='Name'&&save?.file?save.file.name:localize(fallback),
   ini_read_real:(section,key,fallback)=>save?.file?.[{Love:'love',Time:'time',Kills:'kills',Room:'room'}[key]]??fallback,
   scr_roomname:'scr_roomname',scr_save:'scr_save',
   script_execute:function(name,arg){if(name==='scr_roomname')this.roomname=arg===0?'--':save.roomName(arg);if(name==='scr_save')save.file=save.write();},
  };
  this.scope=proxy({buffer:0},builtins);this.global=global;
 }
 draw(){event('gml_Object_obj_overworldcontroller_Draw_0',this.scope);}
 input(key){this.pressed=key;this.paint=false;this.draw();this.paint=true;this.pressed=null;}
 get selected(){return this.global.menucoord[0];}
 get closed(){return this.global.interact===0;}
 get destination(){return this.global.menuno;}
}
export class NativeFade {
 constructor(width=320,height=240,out=false){this.kind=out?'unfader':'fader';this.scope=proxy({room_width:width,room_height:height},{action_move_to:()=>{},instance_destroy:function(){this.destroyed=true;}});event('gml_Object_obj_'+this.kind+'_Create_0',this.scope);}
 tick(){if(!this.scope.destroyed)event('gml_Object_obj_'+this.kind+'_'+(this.kind==='fader'?'Step_1':'Step_0'),this.scope);return this.alpha;}
 get alpha(){return Math.max(0,Math.min(1,this.scope.image_alpha));}
}
// One obj_foreground_waterfall instance: its room x and the room width that
// clamps the parallax (room 105: x 160 in 340 px; room 101: x 140 and 380 in 740 px).
export class NativeWaterfall {
 constructor(drawSprite,{x=160,y=0,roomWidth=340}={}){this.view=[0];this.scope=proxy({x,y,xstart:x,sprite_index:'spr_waterfall_anim',room_width:roomWidth,view_wview:[320],view_xview:this.view},{draw_sprite_ext:drawSprite});event('gml_Object_obj_foreground_waterfall_Create_0',this.scope);}
 draw(camera,reduced=false){this.view[0]=camera;const previous={x:this.scope.x,anim:this.scope.anim};event('gml_Object_obj_foreground_waterfall_Draw_0',this.scope);if(reduced)Object.assign(this.scope,previous);}
}
export class NativeNpcAnimation {
 constructor(){this.scope=proxy({image_speed:0,image_index:0,myinteract:0},{instance_exists:()=>Boolean(this.writer),OBJ_WRITER:{halt:0}});}
 tick(writer){if(!writer){this.scope.image_index=0;this.scope.image_speed=0;return;}this.scope.myinteract=3;this.scope.instance_exists=()=>!writer.closed;this.scope.OBJ_WRITER=writer.writer;event('gml_Script_scr_npc_anim',this.scope);}
 advance(){this.scope.image_index=(this.scope.image_index+this.scope.image_speed)%2;}
 get frame(){return this.scope.image_index;}
}
