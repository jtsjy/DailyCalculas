const app=document.getElementById('app');
const title='Everyday Calculas Exercise';
function today(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
let lastDay=today();
function formatDate(date){const [,month,day]=date.split('-').map(Number);const suffix=day%100>=11&&day%100<=13?'th':({1:'st',2:'nd',3:'rd'}[day%10]||'th');const months=['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'];return `${day}${suffix} ${months[month-1]}`;}
function math(tex){const el=document.createElement('div');el.className='formula';katex.render(tex,el,{displayMode:true,throwOnError:true,output:'htmlAndMathml',strict:'error'});return el;}
function prose(text,className){const el=document.createElement('p');el.className=className;el.textContent=text;renderMathInElement(el,{delimiters:[{left:'\\(',right:'\\)',display:false},{left:'$',right:'$',display:false}],throwOnError:false,trust:false});return el;}
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
  p.s.forEach((s,i)=>{const row=document.createElement('section');row.className='step';const content=document.createElement('div');content.className='step-content';const note=prose(p.notes[i],'explanation');content.append(note,math(s));row.append(content);steps.append(row);});
  app.append(steps);
  app.append(prose(p.tip,'tip'));
 }
 const footer=document.createElement('footer');footer.className='footer';
 if(isAnswer){const back=document.createElement('a');back.className='back';back.href=dailyRoutes.href(location.href);back.textContent='← Back';footer.append(back);}
 const dateLabel=document.createElement('time');dateLabel.className='date';dateLabel.dateTime=date;dateLabel.textContent=formatDate(date);footer.append(dateLabel);app.append(footer);
 const repository=document.createElement("div");repository.className="repository";const repositoryLink=document.createElement("a");repositoryLink.className="repository-link";repositoryLink.href="https://github.com/jtsjy/DailyCalculas";repositoryLink.target="_blank";repositoryLink.rel="noopener noreferrer";repositoryLink.setAttribute("aria-label","GitHub repository");repositoryLink.innerHTML="<svg aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path d=\"M6.766 11.328c-2.063-.25-3.516-1.734-3.516-3.656 0-.781.281-1.625.75-2.188-.203-.515-.172-1.609.063-2.062.625-.078 1.468.25 1.968.703.594-.187 1.219-.281 1.985-.281.765 0 1.39.094 1.953.265.484-.437 1.344-.765 1.969-.687.218.422.25 1.515.046 2.047.5.593.766 1.39.766 2.203 0 1.922-1.453 3.375-3.547 3.64.531.344.89 1.094.89 1.954v1.625c0 .468.391.734.86.547C13.781 14.359 16 11.53 16 8.03 16 3.61 12.406 0 7.984 0 3.563 0 0 3.61 0 8.031a7.88 7.88 0 0 0 5.172 7.422c.422.156.828-.125.828-.547v-1.25c-.219.094-.5.156-.75.156-1.031 0-1.64-.562-2.078-1.609-.172-.422-.36-.672-.719-.719-.187-.015-.25-.093-.25-.187 0-.188.313-.328.625-.328.453 0 .844.281 1.25.86.313.452.64.655 1.031.655s.641-.14 1-.5c.266-.265.47-.5.657-.656\"/></svg><span>/jtsjy/DailyCalculas</span>";repository.append(repositoryLink);app.append(repository);
 document.title=title;requestAnimationFrame(fit);
}
 document.fonts.ready.then(fit);window.addEventListener('hashchange',render);window.addEventListener('resize',fit);window.addEventListener('pageshow',()=>{if(today()!==lastDay){lastDay=today();render();}});document.addEventListener('visibilitychange',()=>{if(!document.hidden&&today()!==lastDay){lastDay=today();render();}});setInterval(()=>{if(today()!==lastDay){lastDay=today();if(!dailyRoutes.params(location.search,location.hash).has('answer'))render();}},1000);render();
