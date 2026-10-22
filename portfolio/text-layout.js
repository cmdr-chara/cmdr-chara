// Helpers that produce strings in the original OBJ_WRITER format.
// Typers 5 and 23 write fixed 8-pixel cells from writingx; a dialogue box holds
// three 18-pixel rows. Continuation rows start with two spaces, as in SCR_TEXT.
export const LIMITS={dialogue:{cols:33,rows:3},shopMain:{cols:22,rows:5},shopSide:{cols:10,rows:4},shopFull:{cols:33,rows:3}};
// Characters the writer consumes without drawing them.
export function visible(row){return row.replace(/\\[EFTMz][0-9A-Za-z]|\\[A-Za-z]|\^[0-9]/g,'');}
export function rows(page){return page.replace(/(\/%%|\/\*|\/\^|\/|%%)$/,'').split('&').map(r=>r.replace(/\\C$/,''));}
export function fits(page,{cols,rows:max}){const r=rows(page);return r.length<=max&&r.every(row=>visible(row).length<=cols);}
function wrapWords(text,cols,first,next){
 const out=[];let row=first,empty=true;
 for(const word of text.split(/\s+/).filter(Boolean)){
  if(empty){row+=word;empty=false;}
  else if(visible(row+' '+word).length>cols){out.push(row);row=next+word;}
  else row+=' '+word;
 }
 if(!empty)out.push(row);
 return out;
}
// Paragraphs become "* " bullets. A bullet that fits on a page is never split
// across two pages; pages end with "/" and the last one with `end`.
export function wrap(paragraphs,{cols=33,rows:max=3,bullet=true,end='/%%'}={}){
 const pages=[];let page=[];
 for(const p of [].concat(paragraphs)){
  const lines=wrapWords(p,cols,bullet?'* ':'',bullet?'  ':'');
  if(page.length&&page.length+Math.min(lines.length,max)>max){pages.push(page);page=[];}
  for(const line of lines){if(page.length>=max){pages.push(page);page=[];}page.push(line);}
 }
 if(page.length)pages.push(page);
 return pages.map((p,i)=>p.join('&')+(i<pages.length-1?'/':end));
}
// Original choice layout: question, blank row, then options at columns 9 and 21.
export function choice(question,yes,no){
 const q=wrapWords(question,33,'* ','  ');
 if(q.length>2)throw Error('Choice question longer than two rows: '+question);
 if(visible(yes).length>11||visible(no).length>12)throw Error('Choice label too long: '+yes+' / '+no);
 return q.join('&')+(q.length===1?'& &':'&')+' '.repeat(9)+yes.padEnd(12)+no+'\\C';
}
// Text for screen readers: no control codes, rows joined with spaces.
export function plain(gml){return gml.replace(/\^[0-9]/g,'').replace(/\\[EFTMz][0-9A-Za-z]|\\[A-Za-z]/g,'').replace(/&\s*/g,' ').replace(/\/%%|\/\*|\/|%%/g,' ').replace(/\s+/g,' ').trim();}
