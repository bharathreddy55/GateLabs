import { EXAMS } from '../config/exams.js';
import { normaliseQuestions } from './examAdapters.js';
// Reject absent keys/options rather than silently inventing an answer.
export function parseExamText(text, examId) {
  const blocks=text.includes('---')?text.split(/---/):text.split(/(?=^Q\d+[:.])/m);
  const questions=[];
  for(const block of blocks){
    if(!block.trim())continue;
    const q={id:`${examId}-text-${questions.length+1}`,type:'MCQ',marks:1,question:'',options:[],correctAnswer:null,topic:'Imported practice',explanation:''};
    let current=null;
    for(const raw of block.trim().split(/\r?\n/)){
      const line=raw.trim();if(!line)continue;
      let match;
      if((match=line.match(/^(subject|topic|question|explanation|passage|table):\s*(.*)$/i))){current=match[1].toLowerCase();q[current]=match[2];}
      else if((match=line.match(/^(?:option\s+)?([A-E])[:).]\s*(.*)$/i))){current=`option${match[1].toUpperCase().charCodeAt(0)-65}`;q.options[Number(current.slice(6))]=match[2];}
      else if((match=line.match(/^(?:correct|answer|correct answer):\s*([A-E]|[0-4])\s*$/i))){q.correctAnswer=/\d/.test(match[1])?Number(match[1]):match[1].toUpperCase().charCodeAt(0)-65;current=null;}
      else if((match=line.match(/^Q\d+[:.]\s*(.*)$/i))){q.question=match[1];current='question';}
      else if(/^(marks|year|difficulty|type):/i.test(line)){current=null;}
      else if(current?.startsWith('option'))q.options[Number(current.slice(6))]+='\n'+line;
      else if(current)q[current]+='\n'+line;
    }
    // Text without section labels may use the documented paper order.
    if(!q.subject){let end=0;for(const [name,count] of EXAMS[examId].sections){end+=count;if(questions.length<end){q.subject=name;break;}}}
    questions.push(q);
  }
  return normaliseQuestions(examId,questions);
}
