export const EXAM_CATALOG = [
  {id:'gate',route:'gate',name:'GATE CS & IT',short:'GATE',category:'Engineering',description:'Computer science, mathematics and general aptitude.',symbol:'⌘',color:'#4563d8'},
  {id:'tet',route:'tet-exams',name:'AP TET Paper 1A',short:'AP TET',category:'Teaching',description:'Child development, languages, mathematics and environment.',symbol:'Aa',color:'#087f78'},
  {id:'group2',route:'group2',name:'APPSC Group 2',short:'Group 2',category:'State services',description:'Prelims and Mains preparation for Andhra Pradesh Group II services.',symbol:'Ⅱ',color:'#9b642b'},
  {id:'rrb',route:'rrb-station-master',name:'RRB Station Master',short:'Station Master',category:'Railways',description:'Science, mathematics, data analysis and reasoning.',symbol:'↔',color:'#8759bd'},
  {id:'sbi',route:'sbi-clerk',name:'SBI Clerk Prelims',short:'SBI Clerk',category:'Banking',description:'English, numerical ability and reasoning with section timers.',symbol:'₹',color:'#3470a3'}
];
export const NAV_GROUPS = [
  {label:'Your workspace',items:[['dashboard','Home','home'],['exams','Explore exams','grid']]},
  {label:'Exam preparation',items:EXAM_CATALOG.map(e=>[e.route,e.short,'book'])},
  {label:'Study & review',items:[['practice','Question practice','edit'],['analytics','Results & mistakes','chart'],['formulas','Formula notes','file'],['assistant','Study assistant','spark']]},
  {label:'More',items:[['study-planner','Study planner & backup','calendar'],['community','Personal study notes','users'],['about','About GateLabs','info']]}
];
export const PAGE_TITLES=Object.fromEntries(NAV_GROUPS.flatMap(g=>g.items.map(([route,title])=>[route,title])));
Object.assign(PAGE_TITLES,{'mock-test':'Exam room','pyq-mocks':'GATE paper library',gate:'GATE CS & IT'});
export function icon(name){
 const paths={home:'M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z',grid:'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',book:'M12 5c-3-2-6-2-10-1v15c4-1 7-1 10 1 3-2 6-2 10-1V4c-4-1-7-1-10 1v15',edit:'m16 3 5 5-12 12-6 1 1-6z M13 6l5 5',chart:'M4 3v17h17 M8 15v-4 M13 15V7 M18 15v-7',file:'M14 2H5v20h14V7z M14 2v6h5 M8 12h8 M8 16h6',spark:'m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z',calendar:'M4 5h16v16H4z M8 2v6 M16 2v6 M4 10h16',users:'M16 21v-3a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v3 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M17 3a4 4 0 0 1 0 8 M19 14a4 4 0 0 1 3 4v3',info:'M12 11v6 M12 7v.1 M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',menu:'M4 6h16 M4 12h16 M4 18h16',arrow:'M4 12h16 M14 6l6 6-6 6',moon:'M20 15.5A9 9 0 0 1 8.5 4 9 9 0 1 0 20 15.5',settings:'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M12 2v3 M12 19v3 M2 12h3 M19 12h3 M5 5l2 2 M17 17l2 2 M19 5l-2 2 M7 17l-2 2',logout:'M9 4H4v16h5 M12 12h10 M18 8l4 4-4 4'};
 return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]||paths.book}"/></svg>`;
}
