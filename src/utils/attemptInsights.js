export const outcomeLabels = {correct:'Correct', wrong:'Incorrect', skipped:'Unanswered'};
export const outcomes = Object.keys(outcomeLabels);

export function summarizeResponses(responses) {
  const tally = {correct:0, wrong:0, skipped:0, marked:0, total:responses.length, earned:0, deducted:0, possible:0};
  let hasMarks = Boolean(responses.length);
  for (const response of responses) {
    if (outcomes.includes(response.status)) tally[response.status]++;
    if (response.markedForReview === true) tally.marked++;
    if (Number.isFinite(response.earnedMarks) && Number.isFinite(response.marks)) {
      tally.possible += response.marks;
      tally.earned += Math.max(0, response.earnedMarks);
      tally.deducted += Math.max(0, -response.earnedMarks);
    } else {
      hasMarks = false;
    }
  }
  const attempted = tally.correct + tally.wrong;
  const accuracy = attempted ? tally.correct / attempted * 100 : null;
  const marks = hasMarks ? {
    earned:tally.earned, deducted:tally.deducted, possible:tally.possible, net:tally.earned-tally.deducted
  } : null;
  return {...tally, attempted, accuracy, marks};
}

export function attemptGroups(responses, mode) {
  const groups = new Map();
  responses.forEach((response,index)=>{
    const section = response.section || response.subject || 'Unclassified section';
    const name = mode === 'topic' ? response.topic || 'Unclassified topic' : section;
    const key = JSON.stringify([section,name]);
    if (!groups.has(key)) groups.set(key,{name,section,indices:[],responses:[]});
    const group = groups.get(key);
    group.indices.push(index);
    group.responses.push(response);
  });
  return [...groups.values()].map(({name,section,indices,responses})=>({
    name,section,indices,...summarizeResponses(responses)
  }));
}
