const width = 480;
const margin = 18;
const innerWidth = width - 2 * margin;
const ink = '#172540';
const teal = '#126558';
const slate = '#435579';

const escapeXml = value => value.replace(/[&<>]/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;'}[char]));

function wrap(value, limit, fontSize) {
  const lines = [];
  let line = '';
  for (const word of value.split(/\s+/)) {
    const candidate = line ? line + ' ' + word : word;
    const estimatedWidth = [...candidate].reduce((sum, char) =>
      sum + (/[ ilI.,’'1]/.test(char) ? 0.34 : /[MW@%Ω]/.test(char) ? 0.95 : 0.60), 0) * fontSize;
    if (line && estimatedWidth > limit) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  lines.push(line);
  return lines;
}

function label(value, x, y, size, color = ink, center = false) {
  return `<text x="${x}" y="${y}" font-size="${size}" fill="${color}"${center ? ' text-anchor="middle"' : ''}>${escapeXml(value)}</text>`;
}

function linesOf(lines, x, y, size, leading, color = ink) {
  return lines.map((line, i) => label(line, x, y + i * leading, size, color)).join('\n');
}

const box = (x, y, w, h, color, radius = 12) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${color}"/>`;

const path = (d, color = teal, weight = 3) =>
  `<path d="${d}" fill="none" stroke="${color}" stroke-width="${weight}" stroke-linecap="round" stroke-linejoin="round"/>`;

const dot = (x, y, r, color = teal) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`;

// Diagrams use the same data as the example on the card.
const diagrams = {
  'work-power-energy': () => [
    box(95, 13, 57, 43, '#f7c576', 7),
    path('M67 63H372 M150 34H320 M310 25l10 9-10 9'),
    label('40 N', 240, 26, 18, teal, true),
    path('M96 81H351 M105 74l-9 7 9 7 M342 74l9 7-9 7', slate),
    label('5 m displacement', 223, 108, 19, slate, true)
  ],
  trigonometry: () => [
    path('M150 84H250V9Z M235 84V69H250 M172 84Q171 77 167 71'),
    label('θ', 183, 78, 19, teal),
    label('8 m adjacent', 200, 106, 18, slate, true),
    label('6 m opposite', 264, 50, 18, slate)
  ],
  'heat-temperature': () => [
    path('M82 92V16 M82 92H366', slate),
    path('M99 78l60-35h121l64-27'),
    dot(159, 43, 4), dot(280, 43, 4),
    label('Temperature', 98, 22, 18, slate),
    label('Melting', 219, 67, 18, teal, true),
    label('Heat added', 293, 111, 18, slate)
  ],
  'basic-electricity': () => [
    path('M90 51h50 M140 51V24H191 M140 51V82H191 M253 24H304V82H253 M304 51h50', slate),
    box(191, 11, 62, 28, '#b8e2d3', 6), box(191, 69, 62, 28, '#b8e2d3', 6),
    label('6 Ω', 222, 32, 19, teal, true), label('3 Ω', 222, 90, 19, teal, true),
    dot(140, 51, 4, slate), dot(304, 51, 4, slate),
    label('2 A', 268, 17, 18, slate), label('4 A', 268, 106, 18, slate)
  ],
  'levers-machines': () => [
    path('M78 51H366 M151 51l-18 32h36z', slate, 4),
    path('M85 14V42m-5-6 5 6 5-6 M354 14V42m-5-6 5 6 5-6'),
    label('120 N', 103, 28, 19, teal), label('40 N', 340, 28, 19, teal, true),
    label('10 cm', 102, 101, 18, slate, true), label('30 cm', 255, 101, 18, slate, true)
  ],
  'data-bar-charts': () => [
    box(162, 61, 70, 35, '#d5dcee', 0),
    box(162, 17, 70, 44, '#8fd4bc', 0),
    path('M116 17H160 M116 61H160 M116 96H242', slate, 2),
    label('70', 87, 23, 18, slate), label('30', 87, 67, 18, slate),
    label('0', 96, 102, 18, slate),
    path('M241 17h8v44h-8', teal, 2),
    label('40 in band', 261, 46, 19, teal)
  ],
  'data-line-graphs': () => [
    path('M92 17V95H362 M145 79h153V24', slate, 2),
    path('M145 79L298 24', teal, 4),
    dot(145, 79, 5), dot(298, 24, 5),
    label('(1, 10)', 104, 64, 18, slate),
    label('(4, 25)', 313, 33, 18, slate),
    label('3 days', 217, 103, 18, teal, true),
    label('+15', 309, 66, 18, teal)
  ],
  'scatter-plots': () => [
    path('M100 17V96H364 M124 83l198-47', slate, 2),
    dot(134, 74, 4, slate), dot(158, 76, 4, slate), dot(288, 44, 4, slate), dot(312, 29, 4, slate),
    path('M221 30V60', teal, 3),
    dot(221, 30, 6), dot(221, 60, 5, slate),
    label('9', 235, 35, 18, teal), label('6', 235, 66, 18, slate),
    label('x = 3', 221, 115, 18, slate, true)
  ],
  'data-pie-charts': () => [
    dot(151, 55, 44, '#dce6f5'),
    '<path d="M151 55V11A44 44 0 0 1 195 55Z" fill="#80cdb1"/>',
    label('90° = ¼', 215, 53, 23, teal),
    label('¼ of 400 tickets', 215, 81, 18, slate)
  ],
  'statistical-distributions': () => [
    path('M109 16V92H349', slate, 2),
    box(136, 24, 60, 68, '#dce6f5', 0),
    box(196, 41, 120, 51, '#8fd4bc', 0),
    label('20', 166, 65, 22, slate, true),
    label('30', 256, 73, 22, teal, true),
    label('Width 5', 166, 113, 18, slate, true),
    label('Width 10', 256, 113, 18, slate, true)
  ],
  'venn-diagrams': () => [
    dot(190, 55, 53, '#dce6f5'),
    dot(252, 55, 53, '#b8e2d3'),
    '<path d="M221 12 A53 53 0 0 1 221 98 A53 53 0 0 1 221 12Z" fill="#80cdb1"/>',
    label('10', 172, 63, 24, slate, true),
    label('5', 221, 63, 24, teal, true),
    label('7', 274, 63, 24, teal, true),
    label('A', 126, 24, 19, slate), label('B', 310, 24, 19, teal)
  ],
  intelligence: () => {
    const grids = [
      ['Original', [0, 3, 6, 7]],
      ['Rotated', [0, 1, 2, 3]],
      ['Mirrored', [2, 5, 7, 8]]
    ];
    return grids.flatMap(([caption, filled], group) => {
      const x = 61 + 137 * group;
      return [
        ...Array.from({length:9}, (_, cell) =>
          box(x + cell % 3 * 19, 10 + Math.floor(cell / 3) * 19, 17, 17,
            filled.includes(cell) ? teal : '#dde8e7', 3)),
        label(caption, x + 27, 93, 18, slate, true)
      ];
    });
  },
  spatial: () => [
    path('M54 55H179H286H390', teal, 5),
    path('M54 55V90H151H281H390V55', slate, 3),
    dot(54, 55, 5), dot(179, 55, 5), dot(286, 55, 5), dot(390, 55, 5),
    dot(151, 90, 4, slate), dot(281, 90, 4, slate),
    label('A', 34, 61, 18, teal), label('B', 399, 61, 18, teal),
    label('House 2', 286, 39, 18, teal, true), label('House 1', 151, 113, 18, slate, true)
  ]
};

export function buildStationMasterRevision(title, id, { rule, steps, trap }, stage) {
  const titleLines = wrap(title, innerWidth, 33);
  const ruleLines = wrap(rule, innerWidth - 29, 24);
  const trapLines = wrap(trap, innerWidth - 29, 19);
  const ruleY = 68 + titleLines.length * 43;
  const ruleHeight = 46 + ruleLines.length * 33;
  const exampleY = ruleY + ruleHeight + 21;
  const diagram = diagrams[id]?.();
  let stepY = exampleY + (diagram ? 144 : 26);
  const example = steps.map(([heading, value], i) => {
    const headings = wrap(heading, 141, 17);
    const values = wrap(value, innerWidth - 183, 21);
    const rowHeight = 21 + Math.max(headings.length * 24, values.length * 29);
    const row = [
      box(margin, stepY, innerWidth, rowHeight, i === steps.length - 1 ? '#dcefe8' : '#e9edf6', 9),
      linesOf(headings, margin + 14, stepY + 29, 17, 24, slate),
      linesOf(values, margin + 168, stepY + 30, 21, 29)
    ].join('\n');
    stepY += rowHeight + 5;
    return row;
  });
  const trapY = stepY + 10;
  const trapHeight = 43 + trapLines.length * 27;
  const height = trapY + trapHeight + margin;
  const description = [rule, ...steps.map(([heading, value]) => heading + ', ' + value), 'Watch for: ' + trap].join(' ');

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title description">`,
    `<title id="title">${escapeXml(title)} — Quick revision</title>`,
    `<desc id="description">${escapeXml(description)}</desc>`,
    box(0, 0, width, height, '#faf7ee', 20),
    '<g font-family="Segoe UI, Arial, sans-serif" font-weight="700">',
    label('STATION MASTER  ·  ' + stage, margin, 33, 17, teal),
    linesOf(titleLines, margin, 78, 33, 43),
    box(margin, ruleY, innerWidth, ruleHeight, '#dcefe8'),
    label('KEY RULE', margin + 14, ruleY + 25, 17, teal),
    linesOf(ruleLines, margin + 14, ruleY + 55, 24, 33),
    label('QUICK EXAMPLE', margin, exampleY + 15, 17, slate),
    diagram ? `<g transform="translate(${margin} ${exampleY + 21})" aria-hidden="true">${diagram.join('')}</g>` : '',
    ...example,
    box(margin, trapY, innerWidth, trapHeight, '#f9e9c9'),
    label('WATCH FOR', margin + 14, trapY + 24, 17, '#83530e'),
    linesOf(trapLines, margin + 14, trapY + 50, 19, 27),
    '</g>',
    '</svg>',
    ''
  ].join('\n');
}
