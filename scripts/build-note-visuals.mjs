import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';

function buildVisual(row, markdown){
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
  const inner = markdown.replaceAll("\r\n", "\n");
  const tidy=s=>s.replace(/<\/?(?:b|i|u|s|code)>|\*\*|`/g,"").replace(/\r/g,"").trim();
  const parts=inner.split(/^## /m);
  const concepts=tidy(parts[0]);
  const sections=Object.fromEntries(parts.slice(1).map(p=>{const j=p.indexOf("\n");return [p.slice(0,j).trim().toLowerCase(),tidy(p.slice(j+1))]}));
  const example=sections["worked example"];
  const mistake=sections["common mistake"];
  const practice=sections.practice;
  if(!concepts||!example||!practice) throw Error("Expected note sections unavailable");
  const marker=practice.search(/\bAnswer:\s*/i);
  const prompt=marker<0?practice:practice.slice(0,marker).trim();
  const answer=marker<0?"":practice.slice(marker).replace(/^Answer:\s*/i,"").split(/\n\n/)[0];
  const widths=s=>[...s].reduce((sum,c)=>sum+(/[ilI1.,:;!|’‘' ]/.test(c)?.33:/[mwMW@%Ω]/.test(c)?.87:/[\u0600-\u0eff]/.test(c)?1:.58),0);
  const wrap=(value,cap)=>{
    const out=[];
    for(const para of value.split(/\n+/)){
      let line="";
      for(const word of para.trim().split(/\s+/)){
        const candidate=line?line+" "+word:word;
        if(line&&widths(candidate)>cap){out.push(line);line=word;}else line=candidate;
      }
      if(line)out.push(line);
    }
    return out;
  };
  const cards=[["Core concepts",concepts,"#f3edff","#d8bbfa","book"],
    ["Worked example",example,"#e9f6ff","#b0dcf6","example"],
    ["Common mistake",mistake,"#ffedf0","#f4bcc8","warning"],
    ["Try it",prompt,"#edf8e9","#bfe8b7","question"],
    ["Check your answer",answer,"#fff5d9","#f5d889","check"],
    ["Quick revision",sections["quick revision"],"#eef2ff","#bcccf0","book"]].filter(([,body])=>body);
  const icons={
    book:'<path d="M5 12 Q20 7 32 14 Q44 7 59 12 V49 Q43 45 32 52 Q20 45 5 49 Z M32 14 V52 M12 23 Q22 21 26 25 M38 25 Q43 21 52 23"/>',
    example:'<rect x="7" y="14" width="50" height="40" rx="8"/><path d="M17 34 H45 M36 25 L45 34 L36 43 M20 8 H44"/>',
    warning:'<path d="M32 8 L60 54 H4 Z M32 23 V37 M32 45 H32.5"/>',
    question:'<circle cx="32" cy="32" r="26"/><path d="M22 24 C23 10 48 16 43 27 C41 34 32 33 32 41 M32 48 H32.5"/>',
    check:'<circle cx="32" cy="32" r="26"/><path d="M19 33 L28 42 L46 23"/>'
  };
  const drawIcon=(kind,x,y,scale=1)=>`<g transform="translate(${x} ${y}) scale(${scale})" fill="none" stroke="#344468" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">${icons[kind]}</g>`;
  const artKind=/data|probability|arith|speed|number|mathe|quant|calcul|physics|electric/i.test(row.section+" "+row.title)?"plot":/history|current affairs|civilisation|literature|governance|movement/i.test(row.section+" "+row.title)?"timeline":/computer|program|compiler|database|logic|network|operating|algorithm/i.test(row.section+" "+row.title)?"flow":/environment|geograph|plant|earth|society/i.test(row.section+" "+row.title)?"map":"study";
  const artwork={
    plot:'<path d="M7 70 V11 M7 70 H110 M19 60 L44 44 L62 50 L94 22" /><circle cx="44" cy="44" r="4"/><circle cx="94" cy="22" r="4"/>',
    timeline:'<path d="M10 58 H110 M21 58 V26 M58 58 V14 M96 58 V35"/><circle cx="21" cy="58" r="5"/><circle cx="58" cy="58" r="5"/><circle cx="96" cy="58" r="5"/>',
    flow:'<rect x="4" y="28" width="26" height="26" rx="5"/><rect x="46" y="12" width="26" height="26" rx="5"/><rect x="86" y="42" width="26" height="26" rx="5"/><path d="M30 33 L46 25 M71 34 L87 47 M40 24 L46 25 L44 31 M84 40 L87 47 L80 46"/>',
    map:'<path d="M4 67 L33 23 L56 54 L79 11 L114 67 Z M65 37 L79 11 L93 36 M24 39 L33 23 L44 38"/><circle cx="100" cy="18" r="8"/>',
    study:'<path d="M6 20 Q34 9 57 24 Q83 9 111 20 V67 Q83 57 57 72 Q33 57 6 67 Z M57 24 V72 M16 35 Q35 31 47 38 M67 38 Q82 31 101 35"/>'
  };
  const w=1440, margin=48, gap=26, half=(w-2*margin-gap)/2;
  const title=wrap(row.title,24);
  const labels={gate:"GATE CS 2027",group2:"APPSC Group 2 Prelims",rrb:"RRB Station Master CBT",sbi:"SBI Clerk Prelims","group2-mains-1":"APPSC Group 2 Mains Paper I","group2-mains-2":"APPSC Group 2 Mains Paper II"};
  const out=[];
  const write=(ln,x,y,size,fill="#192644",bold=false)=>`<text x="${x}" y="${y}" font-size="${size}" fill="${fill}"${bold?' font-weight="700"':''}>${esc(ln)}</text>`;
  out.push(`<rect x="48" y="46" width="204" height="42" rx="20" fill="#f9df9a"/>${write("VISUAL STUDY GUIDE",65,74,17,"#523f24",true)}`);
  out.push(`<g transform="translate(1201 52) scale(1.37)" stroke="#55418a" stroke-width="3.8" fill="#f0e8fb" stroke-linejoin="round" stroke-linecap="round">${artwork[artKind]}</g>`);
  title.forEach((line,i)=>out.push(write(line,48,150+i*62,56,"#182342",true)));
  let y=175+(title.length-1)*62;
  out.push(`<path d="M50 ${y} Q210 ${y+9} 372 ${y}" stroke="#e4ad2b" stroke-width="7" fill="none" stroke-linecap="round"/>`);
  y+=39;
  out.push(write(`${labels[row.exam]}  •  ${row.section}`,49,y,26,"#394978",true));
  y+=33;
  function drawCard(card,x,cy,width,forcedHeight){
    const [head,body,bg,accent,kind]=card;
    const lines=wrap(body,(width-78)/28);
    const height=forcedHeight||106+lines.length*38;
    out.push(`<rect x="${x}" y="${cy}" width="${width}" height="${height}" rx="23" fill="${bg}" stroke="${accent}" stroke-width="2"/>`);
    const headWidth=Math.ceil(widths(head)*31+32);
    out.push(`<rect x="${x+29}" y="${cy+21}" width="${headWidth}" height="46" rx="18" fill="${accent}"/>`);
    out.push(write(head,x+45,cy+53,31,"#17243f",true));
    out.push(drawIcon(kind,x+width-86,cy+19,.72));
    lines.forEach((line,i)=>out.push(write(line,x+36,cy+101+i*38,28)));
    return height;
  }
  y+=drawCard(cards[0],margin,y,w-2*margin)+gap;
  const remaining=cards.slice(1);
  for(let i=0;i<remaining.length;i+=2){
    const pair=remaining.slice(i,i+2);
    const widths=pair.length===1?[w-2*margin]:[half,half];
    const rowHeight=Math.max(...pair.map((card,j)=>106+wrap(card[1],(widths[j]-78)/28).length*38));
    pair.forEach((card,j)=>drawCard(card,margin+j*(half+gap),y,widths[j],rowHeight));
    y+=rowHeight+gap;
  }
  const height=y+22;
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${height}" viewBox="0 0 ${w} ${height}"><rect width="${w}" height="${height}" fill="#fffaf4"/><g font-family="Segoe UI, Arial, sans-serif">${out.join("")}</g></svg>`;
  return svg;
}

const catalogs = new URL('../src/config/notes/', import.meta.url);
const notes = new URL('../public/notes/', import.meta.url);
const visuals = new URL('../public/notes/visuals/', import.meta.url);
let count = 0;

for (const file of readdirSync(catalogs).filter(name => name.endsWith('.json'))) {
  const exam = file.slice(0, -5);
  const entries = JSON.parse(readFileSync(new URL(file, catalogs), 'utf8'));
  const directory = new URL(exam + '/', visuals);
  mkdirSync(directory, { recursive: true });

  for (const entry of entries) {
    const output = new URL(entry.id + '.svg', directory);
    // The original, individually illustrated Notion guide is stored verbatim.
    if (exam === 'rrb' && entry.id === 'work-power-energy') {
      readFileSync(output, 'utf8');
    } else {
      const markdown = readFileSync(new URL(exam + '/' + entry.id + '.md', notes), 'utf8');
      writeFileSync(output, buildVisual({ ...entry, exam }, markdown) + '\n');
    }
    count++;
  }
}
console.log('Generated or checked ' + count + ' visual study guides.');
