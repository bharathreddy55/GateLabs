export const RRB_NOTICE = 'https://rrb.indianrailways.gov.in/-/image/1793016771817CEN_08_2026_StationMaster.pdf/examsDocuments';
export const RDSO_GUIDE = 'https://rdso.indianrailways.gov.in/works/uploads/File/ASM_guidline.pdf';
export const RDSO_FAQ = 'https://rdso.indianrailways.gov.in/uploads/File/FAQ%20.pdf';
export const CBAT_PRACTICE_SETS = [1,2];

export const CBAT_BATTERIES = [
  { id:'intelligence', title:'Intelligence', count:12, seconds:180, instruction:'Find the one figure that cannot be made by rotating the other figures.' },
  { id:'attention', title:'Selective Attention', count:20, seconds:240, instruction:'Add the odd digits only. Ignore all even digits.' },
  { id:'spatial', title:'Spatial Scanning', count:10, seconds:240, instruction:'Trace the streets from A to B and identify the numbered house on the shortest route.' },
  { id:'ordering', title:'Information Ordering', count:12, seconds:240, instruction:'Apply the stated rules and choose the sequence that satisfies every rule.' },
  { id:'personality', title:'Personality', count:8, instruction:'Select the statement that best reflects your preferences. This familiarisation activity gives a completion count.' }
];

export function rrbStageNav(isCbat = false) {
  return `<nav class="exam-stage-nav" aria-label="Station Master stage">
    <a class="ui-button ${isCbat?'':'primary'}" href="#/rrb-station-master" ${isCbat?'':'aria-current="page"'}>Stage 1 · CBT</a>
    <a class="ui-button ${isCbat?'primary':''}" href="#/rrb-station-master/cbat" ${isCbat?'aria-current="page"':''}>Stage 2 · CBAT</a>
  </nav>`;
}
