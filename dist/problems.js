/* Exact, parameterized problems. Every Shanghai calendar date has stable content. */
(function(root){
const R=String.raw;
const limits=[
a=>({q:R`\lim_{x\to0}\frac{\sin(${a}x)-${a}x+\frac{${a**3}}6x^3}{x^5}`,s:[R`\sin(${a}x)=${a}x-\frac{${a**3}}6x^3+\frac{${a**5}}{120}x^5+O(x^7)`,R`\frac{\sin(${a}x)-${a}x+\frac{${a**3}}6x^3}{x^5}=\frac{${a**5}}{120}+O(x^2)`,R`\boxed{\frac{${a**5}}{120}}`],tip:'消去低阶项后，再看第一个非零项。'}),
a=>({q:R`\lim_{x\to0}\frac{\ln(1+${a}x)-${a}x+\frac{${a*a}}2x^2-\frac{${a**3}}3x^3}{x^4}`,s:[R`\ln(1+${a}x)=${a}x-\frac{${a*a}}2x^2+\frac{${a**3}}3x^3-\frac{${a**4}}4x^4+O(x^5)`,R`L=\lim_{x\to0}\left(-\frac{${a**4}}4+O(x)\right)`,R`\boxed{-\frac{${a**4}}4}`],tip:'展开的阶数，由分母决定。'}),
a=>({q:R`\lim_{x\to0}\left(\frac{\sin x}{x}\right)^{\!${a}/x^2}`,s:[R`\ln L=\lim_{x\to0}\frac{${a}}{x^2}\ln\!\left(1-\frac{x^2}6+O(x^4)\right)`,R`\ln L=\lim_{x\to0}\frac{${a}}{x^2}\left(-\frac{x^2}6+O(x^4)\right)=-\frac{${a}}6`,R`\boxed{L=e^{-${a}/6}}`],tip:'幂指型极限，可以先取对数。'}),
a=>({q:R`\lim_{x\to0}\frac{\displaystyle\int_0^x(e^{${a}t^2}-1)\,dt}{x^3}`,s:[R`e^{${a}t^2}-1=${a}t^2+O(t^4)`,R`\int_0^x(e^{${a}t^2}-1)\,dt=\frac{${a}}3x^3+O(x^5)`,R`\boxed{\frac{${a}}3}`],tip:'积分会把主项的阶数提高一阶。'}),
a=>({q:R`\lim_{n\to\infty}\sum_{k=1}^{n}\frac{k}{${a*a}n^2+k^2}`,s:[R`L=\lim_{n\to\infty}\frac1n\sum_{k=1}^{n}\frac{k/n}{${a*a}+(k/n)^2}`,R`L=\int_0^1\frac{t}{${a*a}+t^2}\,dt`,R`L=\left[\frac12\ln(${a*a}+t^2)\right]_0^1`,R`\boxed{\frac12\ln\frac{${a*a+1}}{${a*a}}}`],tip:'把求和式整理成黎曼和。'}),
a=>({q:R`\lim_{x\to0}\frac{\sqrt{1+${a}x}-\sqrt{1-${a}x}-${a}x}{x^3}`,s:[R`\sqrt{1\pm ${a}x}=1\pm\frac{${a}}2x-\frac{${a*a}}8x^2\pm\frac{${a**3}}{16}x^3+O(x^4)`,R`\sqrt{1+${a}x}-\sqrt{1-${a}x}-${a}x=\frac{${a**3}}8x^3+O(x^4)`,R`\boxed{\frac{${a**3}}8}`],tip:'对称结构里，先观察奇偶项的消去。'}),
a=>({q:R`\lim_{x\to0^+}\frac{x^{${a}x}-1-${a}x\ln x}{x^2(\ln x)^2}`,s:[R`u=${a}x\ln x\longrightarrow0`,R`x^{${a}x}=e^u=1+u+\frac{u^2}2+o(u^2)`,R`L=${a*a}\lim_{u\to0}\frac{e^u-1-u}{u^2}`,R`\boxed{\frac{${a*a}}2}`],tip:'先确认复合变量确实趋于零。'}),
a=>({q:R`\lim_{x\to0}\frac{\arctan(${a}x)-${a}\arctan x}{x^3}`,s:[R`\arctan(${a}x)=${a}x-\frac{${a**3}}3x^3+O(x^5)`,R`${a}\arctan x=${a}x-\frac{${a}}3x^3+O(x^5)`,R`\boxed{-\frac{${a**3-a}}3}`],tip:'等价无穷小不能直接用于相减。'})
];
const integrals=[
a=>({q:R`\int_0^1\frac{x^{${a-1}}\ln x}{1+x^{${a}}}\,dx`,s:[R`t=x^{${a}},\qquad I=\frac1{${a*a}}\int_0^1\frac{\ln t}{1+t}\,dt`,R`I=\frac1{${a*a}}\lim_{r\uparrow1}\sum_{n=0}^{\infty}(-r)^n\int_0^1t^n\ln t\,dt`,R`I=-\frac1{${a*a}}\sum_{n=1}^{\infty}\frac{(-1)^{n-1}}{n^2}`,R`\sum_{n=1}^{\infty}\frac{(-1)^{n-1}}{n^2}=\left(1-\frac12\right)\frac{\pi^2}6`,R`\boxed{-\frac{\pi^2}{${12*a*a}}}`],tip:'先用代换消去幂次，再处理对数。'}),
a=>({q:R`\int_0^\infty\frac{dx}{x^4+${a}x^2+1}`,s:[R`I=\int_0^\infty\frac{x^2\,dx}{x^4+${a}x^2+1}\qquad(x\mapsto1/x)`,R`2I=\int_0^\infty\frac{(1+x^{-2})\,dx}{(x-x^{-1})^2+${a+2}}`,R`u=x-x^{-1},\qquad2I=\int_{-\infty}^{\infty}\frac{du}{u^2+${a+2}}`,R`\boxed{\frac{\pi}{2\sqrt{${a+2}}}}`],tip:'区间是零到无穷时，试试倒数代换。'}),
a=>({q:R`\int_0^{\pi/2}\ln\!\left(${a*a}\cos^2x+\sin^2x\right)\,dx`,s:[R`F(b)=\int_0^{\pi/2}\ln(b^2\cos^2x+\sin^2x)\,dx,\quad b>0`,R`F'(b)=\int_0^\infty\frac{2b\,dt}{(t^2+b^2)(t^2+1)}\qquad(t=\tan x)`,R`F'(b)=\frac{\pi}{b+1}`,R`F(1)=0,\qquad F(${a})=\int_1^{${a}}\frac{\pi}{b+1}\,db`,R`\boxed{\pi\ln\frac{${a+1}}2}`],tip:'带参数的对数积分，可以先对参数求导。'}),
a=>({q:R`\int_0^\infty\frac{e^{-x}-e^{-${a}x}}{x}\,dx`,s:[R`\frac{e^{-x}-e^{-${a}x}}x=\int_1^{${a}}e^{-tx}\,dt`,R`I=\int_1^{${a}}\left(\int_0^\infty e^{-tx}\,dx\right)dt`,R`I=\int_1^{${a}}\frac{dt}t`,R`\boxed{\ln ${a}}`],tip:'两个发散积分的差，不能随意拆开。'}),
a=>({q:R`\int_0^1\frac{\ln(1-x^{${a}})}x\,dx`,s:[R`t=x^{${a}},\qquad I=\frac1{${a}}\int_0^1\frac{\ln(1-t)}t\,dt`,R`-I=\frac1{${a}}\sum_{n=1}^{\infty}\frac1n\int_0^1t^{n-1}\,dt`,R`I=-\frac1{${a}}\sum_{n=1}^{\infty}\frac1{n^2}`,R`\boxed{-\frac{\pi^2}{${6*a}}}`],tip:'端点有奇性时，记得检查积分是否收敛。'}),
a=>({q:R`\int_0^\infty\frac{x^{${a-1}}}{(1+x)^{${a+2}}}\,dx`,s:[R`t=\frac{x}{1+x},\quad x=\frac{t}{1-t},\quad dx=\frac{dt}{(1-t)^2}`,R`I=\int_0^1t^{${a-1}}(1-t)\,dt`,R`I=\left[\frac{t^{${a}}}{${a}}-\frac{t^{${a+1}}}{${a+1}}\right]_0^1`,R`\boxed{\frac1{${a*(a+1)}}}`],tip:'把无穷区间映射到零和一之间。'}),
a=>({q:R`\int_0^1x^{${a-1}}\left(\ln x\right)^2\,dx`,s:[R`J(b)=\int_0^1x^{b-1}\,dx=\frac1b,\quad b>0`,R`J'(b)=\int_0^1x^{b-1}\ln x\,dx=-\frac1{b^2}`,R`J''(b)=\int_0^1x^{b-1}(\ln x)^2\,dx=\frac2{b^3}`,R`\boxed{\frac2{${a**3}}}`],tip:'对参数求导，可以让对数自然出现。'}),
a=>({q:R`\int_0^\infty\frac{\ln(1+${a*a}x^2)}{1+x^2}\,dx`,s:[R`F(b)=\int_0^\infty\frac{\ln(1+b^2x^2)}{1+x^2}\,dx,\quad b>0`,R`F'(b)=\int_0^\infty\frac{2bx^2\,dx}{(1+b^2x^2)(1+x^2)}`,R`F'(b)=\frac{2b}{b^2-1}\left(\frac\pi2-\frac\pi{2b}\right)=\frac\pi{b+1}\quad(b\ne1)`,R`F'(1)=\frac\pi2,\qquad F(0^+)=0`,R`F(${a})=\int_0^{${a}}\frac\pi{b+1}\,db`,R`\boxed{\pi\ln ${a+1}}`],tip:'对参数求导后，复杂的对数会变成有理式。'})
];
function getProblems(date){const day=Math.floor(Date.parse(date+'T00:00:00+08:00')/86400000);const cycle=Math.floor(day/8);const a=2+((cycle%11)+11)%11;return [limits[((day%8)+8)%8](a),integrals[(((day+3)%8)+8)%8](2+((cycle*7%11)+11)%11)];}
root.getProblems=getProblems;
if(typeof module!=='undefined')module.exports={getProblems,limits,integrals};
})(typeof window!=='undefined'?window:globalThis);
