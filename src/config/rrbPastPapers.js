const archive = 'https://vault.sscdrishti.com/english_file_uploads/';
const cbt1 = (day,shift) => archive+`1767878095_RRB-NTPC-Graduate-level-CBT-1-Question-Paper-English-${day}-06-2025-Shift-${shift}.pdf`;
const cbt2 = shift => archive+`1768643348_RRB-NTPC-Graduate-level-CBT-2-Question-Paper-English-13-10-2025-Shift-${shift}.pdf`;

export const RRB_RELATED_PAPERS = [
  ...['05','06'].flatMap(day=>['I','II','III'].map(shift=>[
    `NTPC Graduate CBT 1 · ${Number(day)} June 2025 · Shift ${shift}`, cbt1(day,shift)
  ])),
  ['NTPC Graduate CBT 1 · 9 June 2025 · Shift I','https://cdn.testbook.com/pdfs/2025/July/2/RRB%20NTPC%20Graduate%20Level%20CBT-I%20Official%20Paper%20%28Held%20On%2009%20Jun%2C%202025%20Shift%201%29_English_1751456771.pdf'],
  ['NTPC Graduate CBT 1 · 9 June 2025 · Shift II','https://cdn.testbook.com/pdfs/2025/July/2/RRB%20NTPC%20Graduate%20Level%20CBT-I%20Official%20Paper%20%28Held%20On%2009%20Jun%2C%202025%20Shift%202%29_English_1751456801.pdf'],
  ...['I','II'].map(shift=>[`NTPC Graduate CBT 2 · 13 October 2025 · Shift ${shift}`,cbt2(shift)])
];
