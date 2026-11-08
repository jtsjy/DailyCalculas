const app=document.getElementById('app');
const title='Everyday Calculas Exercise';
function today(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
let lastDay=today();
function formatDate(date){const [,month,day]=date.split('-').map(Number);const suffix=day%100>=11&&day%100<=13?'th':({1:'st',2:'nd',3:'rd'}[day%10]||'th');const months=['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'];return `${day}${suffix} ${months[month-1]}`;}
function math(tex){const el=document.createElement('div');el.className='formula';katex.render(tex,el,{displayMode:true,throwOnError:true,output:'htmlAndMathml',strict:'error'});return el;}
function fit(){document.querySelectorAll('.formula').forEach(el=>{el.style.fontSize='';const target=el.querySelector('.katex');if(!target)return;const desired=parseFloat(getComputedStyle(el).fontSize);const width=target.getBoundingClientRect().width;const available=el.clientWidth-4;if(width>available)el.style.fontSize=Math.max(14,desired*available/width)+'px';});}
function render(){
 const params=dailyRoutes.params(location.search,location.hash);
 const isAnswer=params.get('answer')==='limit'||params.get('answer')==='integral';
 const raw=params.get('date');
 const date=isAnswer&&/^\d{4}-\d{2}-\d{2}$/.test(raw||'')&&!isNaN(Date.parse(raw+'T00:00:00+08:00'))?raw:today();
 const [limit,integral]=getProblems(date);
 app.className=isAnswer?'answer':'';
 app.innerHTML=`<header><h1>${title}</h1></header>`;
 if(!isAnswer){
  [limit,integral].forEach((p,i)=>{
   const section=document.createElement('section');section.className='problem';
   const link=document.createElement('a');link.className='formula-link';link.href=dailyRoutes.href(location.href,i?'integral':'limit',date);
   link.setAttribute('aria-label',`查看${i?'积分':'极限'}的中文解析`);
   link.append(math(p.q));link.insertAdjacentHTML('beforeend','<span class="arrow" aria-hidden="true">↗</span>');section.append(link);app.append(section);
  });
 }else{
  const p=params.get('answer')==='integral'?integral:limit;
  const question=document.createElement('div');question.className='question-box';question.append(math(p.q));app.append(question);
  const steps=document.createElement('div');steps.className='steps';
  p.s.forEach((s,i)=>{const row=document.createElement('section');row.className='step';const content=document.createElement('div');content.className='step-content';const note=document.createElement('p');note.className='explanation';note.textContent=p.notes[i];content.append(note,math(s));row.append(content);steps.append(row);});
  app.append(steps);
  const tip=document.createElement('p');tip.className='tip';tip.textContent=p.tip;app.append(tip);
 }
 const footer=document.createElement('footer');footer.className='footer';
 if(isAnswer){const back=document.createElement('a');back.className='back';back.href=dailyRoutes.href(location.href);back.textContent='Back';footer.append(back);}
 const dateLabel=document.createElement('time');dateLabel.className='date';dateLabel.dateTime=date;dateLabel.textContent=formatDate(date);footer.append(dateLabel);app.append(footer);
 document.title=title;requestAnimationFrame(fit);
}
 document.fonts.ready.then(fit);window.addEventListener('hashchange',render);window.addEventListener('resize',fit);window.addEventListener('pageshow',()=>{if(today()!==lastDay){lastDay=today();render();}});document.addEventListener('visibilitychange',()=>{if(!document.hidden&&today()!==lastDay){lastDay=today();render();}});setInterval(()=>{if(today()!==lastDay){lastDay=today();if(!dailyRoutes.params(location.search,location.hash).has('answer'))render();}},1000);render();
