export const sum = values => values.reduce((a,b)=>a+b,0);
export const near = (a,b) => Math.abs(a-b)<1e-7;

export function item(topic,stem,key,distractors,proves,steps,extra={}) {
  const options=[key,...distractors];
  if (options.length!==4 || new Set(options.map(String)).size!==4 ||
      options.some((option,i)=>Boolean(proves(option))!==(i===0))) {
    throw Error(`Unverified RRB item: ${stem} [${options.join(', ')}]`);
  }
  const solution={steps};
  return [topic,stem,key,distractors,steps.join(' '),{...extra,solution,proves}];
}

export function quantity(topic,stem,key,distractors,proves,steps,unit='',extra) {
  const display=value=>String(value)+unit;
  return item(topic,stem,display(key),distractors.map(display),candidate=>{
    const value=Number(unit?candidate.slice(0,-unit.length):candidate);
    return Number.isFinite(value)&&proves(value);
  },steps,extra);
}

export const table = (title,head,rows,details='')=>({
  table:[title,head,...rows.map(row=>row.join(' | ')),details].filter(Boolean).join('\n')
});

export function permutations(items) {
  if (!items.length) return [[]];
  return items.flatMap((value,index)=>
    permutations(items.filter((_,i)=>i!==index)).map(tail=>[value,...tail]));
}

export function rotate(rows,offset) {
  const start=offset%rows.length;
  return [...rows.slice(start),...rows.slice(0,start)];
}
