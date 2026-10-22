// DELTARUNE's shop scenery and darkbox frame, drawn on the 320x240 grid.
// Source: obj_shop2_Draw_0, scr_darkbox and scr_shopmenu (chapter 1).
// Chara replaces Rouxls. Keep the original black backdrop and prop positions,
// excluding his baked-in body and the magenta animated-limb placeholders.
import {wrap} from './text-layout.js';
export const SHOP_PORTRAIT_SHIFT=-59.625;
const PORTRAIT_SCALE=.93;
export const shopPortraitX=x=>108+(x+SHOP_PORTRAIT_SHIFT-108)*PORTRAIT_SCALE;
// The panel starts at 120, but its first four source rows are transparent.
// Align the illustration's original counter contact with the visible rail at
// 124; the pendant shares this translation so its cord stays in her fingers.
export function shopPortraitLayout(p){return {x:shopPortraitX(p.x),y:124+(p.y-120)*PORTRAIT_SCALE,width:p.width*p.scale*PORTRAIT_SCALE,height:p.height*p.scale*PORTRAIT_SCALE};}

// A paragraph is a thought, so translation follows that thought even when it
// takes a different number of pages in the other language. Keep sentences that
// fit a page whole; an oversized sentence may break at a clause or word.
const storySentences=new Intl.Segmenter('en',{granularity:'sentence'});
function storyParagraph(value){
 const words=[],boundaries=new Map();
 for(const {segment} of storySentences.segment(value)){
  const sentence=segment.trim();if(!sentence)continue;
  const start=words.length;words.push(...sentence.split(/\s+/));
  if(wrap([sentence]).length>1)for(let end=start+1;end<words.length;end++)
   boundaries.set(end,/[,;:]["'”’)]?$/.test(words[end-1])?1:2);
  boundaries.set(words.length,0);
 }
 // Choose the fewest pages, then the fewest word/clause breaks. Among equally
 // natural breaks, balanced lengths avoid a tiny trailing sentence fragment.
 const layouts=new Map([[words.length,{score:[0,0,0,0],parts:[]}]]);
 for(let start=words.length-1;start>=0;start--){
  let best=null;
  for(let end=start+1;end<=words.length;end++){
   const text=words.slice(start,end).join(' ');
   if(wrap([text]).length>1)break;
   if(!boundaries.has(end)||!layouts.has(end))continue;
   const rest=layouts.get(end),kind=boundaries.get(end);
   const score=[rest.score[0]+1,rest.score[1]+(kind===2),rest.score[2]+(kind===1),rest.score[3]+text.length**2];
   const difference=best?score.findIndex((value,i)=>value!==best.score[i]):-1;
   if(!best||difference>=0&&score[difference]<best.score[difference])best={score,parts:[text,...rest.parts]};
  }
  if(best)layouts.set(start,best);
 }
 return (layouts.get(0)?.parts??[]).flatMap(text=>wrap([text],{end:'/'}));
}
export function shopStory(paragraphs){
 const pages=[],origins=[];
 for(const [paragraph,value] of paragraphs.entries()){
  for(const [part,page] of storyParagraph(value).entries()){pages.push(page);origins.push({paragraph,part});}
 }
 if(pages.length)pages[pages.length-1]+='%%';
 return {pages,origins};
}
export function shopPageForOrigin(origins,previous){
 if(!previous)return 0;
 const same=origins.flatMap((origin,i)=>origin.paragraph===previous.paragraph?[i]:[]);
 return same[Math.min(previous.part,same.length-1)]??0;
}
export function shopFiles(shop){return Object.values(shop.sprites).flatMap(s=>s.frames);}
const frame=(shop,images,name,index=0)=>{const s=shop.sprites[name];return images[s.frames[Math.floor(index)%s.frames.length]];};
const hollowHeart=[
 '  ##   ##  ',
 ' #  # #  # ',
 '#    #    #',
 '#         #',
 ' #       # ',
 '  #     #  ',
 '   #   #   ',
 '    # #    ',
 '     #     ',
];

export function drawShopRoom(ctx,shop,images,tick,{reduced=false}={}){
 const bg=frame(shop,images,'background');
 ctx.fillStyle='#000';ctx.fillRect(0,0,320,120);
 // These two source regions retain the whole axe without Rouxls's knee or
 // magenta foot placeholder. The bucket under it was drawn open around his
 // foot: its left edge stops at y72 and its right edge at y93, with no base.
 ctx.drawImage(bg,158,18,56,35,158,18,56,35);
 ctx.drawImage(bg,190,53,30,22,190,53,30,22);
 // Rouxls and the magenta limb markers end at x203. Starting at x248 cut
 // the cupboard's left edge and discarded the tall jug beside it.
 ctx.drawImage(bg,204,0,116,120,204,0,116,120);
 // With Chara in a different pose those gaps are exposed. Continue only the
 // missing one-pixel bucket contours, matching the surviving x192/x219 sides
 // and the source's stepped corners. Steam still passes in front as before.
 ctx.fillStyle='#fff';
 ctx.fillRect(192,73,1,21);
 ctx.fillRect(193,94,26,1);
 // The source sheet carries an eight-pixel blue guide on its top-right edge.
 ctx.fillStyle='#000';
 ctx.fillRect(319,0,1,8);
 const t=reduced?0:tick;
 ctx.drawImage(frame(shop,images,'steam',t/20),211,Math.round(84+Math.sin(t/8)));
 // A hollow red soul floats inside the jar. Its entire motion stays within
 // the clear glass interior (x254..290, y92..110); reduced motion holds it still.
 const hx=Math.round(267+Math.sin(t/38)),hy=Math.round(96+3*Math.sin(t/22));
 ctx.fillStyle='#f00';
 hollowHeart.forEach((row,y)=>{for(let x=0;x<row.length;x++)if(row[x]==='#')ctx.fillRect(hx+x,hy+y,1,1);});
}

export function drawShopPanel(ctx,shop,images,left,top,right,bottom,tick,{reduced=false}={}){
 // Inclusive edges snap the source's 640px coordinates to our native grid.
 const edgeX=right+1,edgeY=bottom+1,w=edgeX-left,h=edgeY-top;
 ctx.fillStyle='#000';ctx.fillRect(left,top,w,h);
 const corner=frame(shop,images,'corner',reduced?0:tick/5);
 const rail=frame(shop,images,'top'),side=frame(shop,images,'left');
 if(w>32){
  ctx.drawImage(rail,left+16,top,w-32,16);
  ctx.save();ctx.translate(left+16,edgeY);ctx.scale(1,-1);ctx.drawImage(rail,0,0,w-32,16);ctx.restore();
 }
 if(h>32){
  ctx.drawImage(side,left,top+16,16,h-32);
  ctx.save();ctx.translate(edgeX,top+16);ctx.scale(-1,1);ctx.drawImage(side,0,0,16,h-32);ctx.restore();
 }
 for(const [x,y,sx,sy] of [[left,top,1,1],[edgeX,top,-1,1],[left,edgeY,1,-1],[edgeX,edgeY,-1,-1]]){
  ctx.save();ctx.translate(x,y);ctx.scale(sx,sy);ctx.drawImage(corner,0,0);ctx.restore();
 }
}
