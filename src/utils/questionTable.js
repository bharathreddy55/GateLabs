export function parseQuestionTable(raw) {
  if (typeof raw !== 'string' || !raw.includes('|')) return null;
  // Some older drills store literal backslash-n sequences.
  const lines = raw.replaceAll('\\n', '\n').trim().split(/\r?\n/);
  const first = lines.findIndex(line => line.includes('|'));
  const last = lines.findLastIndex(line => line.includes('|'));
  const grid = lines.slice(first, last + 1).map(line => line.split('|').map(cell => cell.trim()));
  if (grid.length < 2 || grid[0].length < 2 || grid.some(row => row.length !== grid[0].length)) return null;

  // Older frequency tables use a label at the start of each row.
  const labels = grid.map(([cell]) => cell.match(/^(.+?):\s+(.+)$/));
  const [headers, ...rows] = labels.every(Boolean)
    ? [labels.map(([, label]) => label), ...grid[0].map((_, i) =>
        grid.map((row, j) => i === 0 ? labels[j][2] : row[i]))]
    : grid;
  return {headers, rows, caption:lines.slice(0, first).join('\n').trim(), note:lines.slice(last + 1).join('\n').trim()};
}
