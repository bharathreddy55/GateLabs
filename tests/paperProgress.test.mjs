import assert from 'node:assert/strict';
import {test} from 'node:test';
import {indexPaperAttempts,libraryPaperKey} from '../src/utils/paperProgress.js';

test('paper progress joins older results by title and mode and counts keyed retakes',()=>{
  const papers=[{key:'file:sbi',title:'Practice set',mode:'full'},{key:'model:Drill',title:'Drill',mode:'practice'}];
  const attempts=[
    {scope:'Practice set',mode:'full'},
    {scope:'Renamed practice set',mode:'full',paperKey:'file:sbi'},
    {scope:'Practice set',mode:'practice'},
    {scope:'English · Practice set',mode:'practice'},
    {scope:'Drill',mode:'practice'}
  ];
  assert.deepEqual([...indexPaperAttempts(attempts,papers)],[['file:sbi',2],['model:Drill',1]]);
});

test('years, alternate imports and renamed source paths keep separate paper identities',()=>{
  const base={title:'Same title',questions:[{id:'a'},{id:'b'}]};
  const first=libraryPaperKey(base,true);
  const second=libraryPaperKey({...base,questions:[{id:'c'}]},true);
  assert.notEqual(first,second);
  assert.equal(first,libraryPaperKey({...base,questions:base.questions.toReversed()},true));
  assert.equal(libraryPaperKey({file:'bank'}),libraryPaperKey({file:'bank.txt'}));
  const papers=[first,second].map(key=>({key,title:base.title,mode:'full'}));
  const attempts=[{scope:base.title,mode:'full'},{paperKey:second}];
  assert.deepEqual([...indexPaperAttempts(attempts,papers)],[[first,0],[second,1]]);
});
