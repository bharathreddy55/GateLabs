import { escapeHtml as h } from './examEngine.js';
// Structured figure data only: imported papers never inject arbitrary SVG/HTML.
export function renderFigure(figure,readable=false) {
  if(!figure)return '';
  const {type,labels,values,title}=figure;
  if(!['bar','line','pie','scatter','venn'].includes(type)||!Array.isArray(labels)||!Array.isArray(values)||labels.length!==values.length||!values.length||values.length>12||values.some(n=>!Number.isFinite(n)||n<0))return '';
  const colors=['#6366f1','#06b6d4','#f59e0b','#e879f9','#10b981','#ef4444'];
  const max=Math.max(...values,1), total=values.reduce((a,b)=>a+b,0);
  let drawing='';
  if(type==='venn'&&values.length===3){
    drawing=`<circle cx="170" cy="115" r="85" fill="#6366f133" stroke="#6366f1"/><circle cx="280" cy="115" r="85" fill="#06b6d433" stroke="#06b6d4"/>${values.map((v,i)=>`<text x="${[125,225,325][i]}" y="120" text-anchor="middle" fill="currentColor">${v}</text>`).join('')}`;
  }else if(type==='pie'&&total>0){
    let angle=-Math.PI/2;
    drawing=values.map((v,i)=>{const next=angle+v/total*Math.PI*2;const x1=150+90*Math.cos(angle),y1=115+90*Math.sin(angle),x2=150+90*Math.cos(next),y2=115+90*Math.sin(next);const path=`<path d="M150 115 L${x1} ${y1} A90 90 0 ${v/total>.5?1:0} 1 ${x2} ${y2} Z" fill="${colors[i%colors.length]}"/>`;angle=next;return path;}).join('')+labels.map((l,i)=>`<text x="270" y="${55+i*30}" fill="${colors[i%colors.length]}">${h(l)}: ${values[i]}</text>`).join('');
  }else{
    const pts=values.map((v,i)=>[55+i*330/Math.max(1,values.length-1),190-v/max*140]);
    drawing='<path d="M35 25 V190 H425" fill="none" stroke="currentColor"/>';
    if(type==='line')drawing+=`<polyline points="${pts.map(p=>p.join(',')).join(' ')}" fill="none" stroke="#6366f1" stroke-width="3"/>`;
    drawing+=pts.map(([x,y],i)=>`${type==='bar'?`<rect x="${x-12}" y="${y}" width="24" height="${190-y}" fill="#6366f1"/>`:`<circle cx="${x}" cy="${y}" r="5" fill="#6366f1"/>`}<text x="${x}" y="${y-10}" text-anchor="middle" fill="currentColor">${values[i]}</text><text x="${x}" y="215" text-anchor="middle" fill="currentColor">${h(labels[i])}</text>`).join('');
  }
  const plot=`<svg viewBox="0 0 460 240" role="img" aria-label="${h(title||type+' chart')}">${drawing}</svg>`;
  return `<figure class="exam-figure"><figcaption>${h(title||'Question data')}</figcaption>${readable?`<span class="exam-figure-hint">Scroll sideways to see the full chart</span><div class="exam-figure-scroll" tabindex="0" role="group" aria-label="Chart, scroll horizontally if needed">${plot}</div>`:plot}<details><summary>Accessible data table</summary><table><tbody>${labels.map((l,i)=>`<tr><th>${h(l)}</th><td>${values[i]}</td></tr>`).join('')}</tbody></table></details></figure>`;
}
