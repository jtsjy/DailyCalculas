const assert=require('node:assert/strict');
const katex=require('katex');
const {limits,integrals,getProblems}=require('./dist/problems.js');
let count=0;
for(const factory of [...limits,...integrals])for(let a=2;a<=12;a++){
  const p=factory(a);
  assert.equal(p.notes.length,p.s.length);
  assert(p.notes.every(note=>typeof note==='string'&&note.length>0));
  for(const tex of [p.q,...p.s]){katex.renderToString(tex,{displayMode:true,throwOnError:true,strict:'error'});count++;}
}
let previous;
for(let i=0;i<400;i++){
  const date=new Date(Date.UTC(2026,10,8+i)).toISOString().slice(0,10);
  const questions=getProblems(date).map(p=>p.q).join('|');
  assert.notEqual(questions,previous);previous=questions;
  assert.deepEqual(getProblems(date),getProblems(date));
}
console.log(`${count} LaTeX formulas render; 400 daily transitions and stable dated answers verified.`);
