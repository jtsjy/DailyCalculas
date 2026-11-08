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
const limitNotes=[
  [
    "分母为五次幂，将正弦函数在零点展开到五阶，并保留余项。",
    "代入分子后，一次项与三次项恰好抵消。除以五次幂，余项趋于零。",
    "因此，所求极限就是五次项的系数。"
  ],
  [
    "将对数函数在零点展开到四阶；分子中其余各项用于抵消前三阶。",
    "代入并约去低阶项后，除以四次幂。剩余项趋于零。",
    "取四次项的系数，得到所求极限。"
  ],
  [
    "原式在零点附近底数为正。设原极限为 \\(L\\)，先研究原式对数的极限，并将正弦商展开。",
    "利用对数在 1 附近的展开，取出二阶主项，再与指数相乘。",
    "对得到的对数极限取指数，即得原极限。"
  ],
  [
    "先展开被积函数。由于积分后要除以三次幂，只需要找到二次主项。",
    "从零到 \\(x\\) 逐项积分，二次主项变成三次项，余项积分后为五阶。",
    "再除以三次幂并令 \\(x\\) 趋于零，得到结果。"
  ],
  [
    "设所求极限为 \\(L\\)。将每项的分子、分母同除以 \\(n\\) 的平方，提出步长 \\(1/n\\)。",
    "此时求和正是区间 \\([0,1]\\) 上连续函数的黎曼和，极限可写成定积分。",
    "分子与分母的导数成比例，用对数原函数求值。",
    "代入上下限，并把两个对数合并。"
  ],
  [
    "将两个平方根在零点展开到三阶，注意奇数次项的符号相反。",
    "两式相减后，常数项和二次项抵消；再减去题目给出的一次项。",
    "分子只剩三次主项与更高阶余项，除以三次幂后取极限。"
  ],
  [
    "先把指数中的 \\(x\\ln x\\) 看作一个整体。由 \\(x\\) 从右侧趋于零，可知该整体趋于零。",
    "将幂函数改写为指数函数，再展开到二阶。",
    "分子的一阶部分已被减去；换元后注意分母带来的常数系数。",
    "使用指数函数展开中的二阶系数，得到结果。"
  ],
  [
    "将第一个反正切函数展开到三阶。",
    "将第二个反正切函数展开后乘上相应系数，使两式的阶数一致。",
    "相减时一次项抵消，取三次项系数的差即可。"
  ]
];
const integralNotes=[
  [
    "令 \\(t\\) 等于 \\(x\\) 的相应幂次，同时变换对数和微分，消去分母中的高次幂。",
    "先引入小于 1 的参数 \\(r\\)，用几何级数展开，再逐项积分；最后令 \\(r\\) 从左侧趋于 1。",
    "利用幂函数乘对数的积分公式，每一项给出负的平方倒数。所得级数绝对收敛，可以取参数极限。",
    "把交错平方倒数和写成所有项之和减去两倍的偶数项之和，得到圆周率的表达式。",
    "代回换元时提出的系数，整理出最终结果。"
  ],
  [
    "记原积分为 \\(I\\)。作倒数代换，积分区间仍为零到正无穷，得到分子为平方项的另一种表达。",
    "将原积分与变换后的积分相加，再将分子和分母同时除以 \\(x\\) 的平方。",
    "令 \\(u\\) 等于 \\(x\\) 与其倒数之差。该函数严格递增，将原区间映射到整个实轴，微分也恰好匹配。",
    "利用标准反正切积分求出 \\(2I\\)，再除以 2。"
  ],
  [
    "把固定系数换成正参数 \\(b\\)，定义参数积分 \\(F\\)。原题是其中一个参数值。",
    "先对参数求导，再令 \\(t\\) 为正切函数，将三角积分改写为有理函数积分。对参数限制在任意正的紧区间内，可在积分号下求导。",
    "对有理式作部分分式分解，使用标准反正切积分；在 \\(b=1\\) 处取连续延拓。",
    "参数为 1 时，被积函数恒为零。以此为初值，对求得的导数积分。",
    "代入原题参数并合并对数，得到答案。"
  ],
  [
    "把两个指数函数之差除以 \\(x\\) 的表达式，写成对指数参数的积分。这保留了零点附近的抵消。",
    "被积函数非负，可用 Tonelli 定理交换积分顺序，先对 \\(x\\) 积分。",
    "内层的指数积分等于参数的倒数，问题化为有限区间上的对数积分。",
    "代入上下限，得到结果。"
  ],
  [
    "以 \\(x\\) 的相应幂次作代换，注意 \\(\\mathrm{d}x/x\\) 变为 \\(\\mathrm{d}t/t\\) 的常数倍。",
    "展开负对数。各项非负，可由单调收敛定理逐项积分。",
    "每项积分再贡献一个分母 \\(n\\)，因此得到平方倒数级数。",
    "使用平方倒数级数的和，代回系数并保留负号。"
  ],
  [
    "令 \\(t=\\frac{x}{1+x}\\)，将无穷区间变为 \\([0,1]\\)，并写出逆变换及微分。",
    "将分子、分母和微分中的因子合并，大部分幂次抵消，只剩一个多项式。",
    "拆成两个幂函数，分别求原函数并代入端点。",
    "把两个分数相减，得到最终结果。"
  ],
  [
    "先引入正参数 \\(b\\)，考虑不含对数的幂函数积分，它的值可以直接求出。",
    "对参数求导一次，会在被积函数中产生一个对数因子。",
    "再求导一次，便得到对数的平方。参数位于任意正的紧区间时，两次积分号下求导均成立。",
    "把参数取为原题给定的数值，得到积分值。"
  ],
  [
    "用正参数 \\(b\\) 替代原题的固定系数，记所得积分为 \\(F\\)。",
    "对参数求导，将对数变为有理函数。参数位于任意正的紧区间时，导数有可积的控制函数，因此可以在积分号下求导。",
    "当 \\(b\\) 不等于 1 时，作部分分式分解，并分别使用两个标准反正切积分，化简导数。",
    "在 \\(b=1\\) 处由连续性得到导数值。令 \\(b\\) 从右侧趋于零，利用支配收敛可得初值为零。",
    "从零到原题参数，对导数积分，即可恢复原积分的值。",
    "计算对数原函数并代入上下限，得到答案。"
  ]
];
limits.forEach((factory,i)=>{limits[i]=a=>({...factory(a),notes:limitNotes[i]});});
integrals.forEach((factory,i)=>{integrals[i]=a=>({...factory(a),notes:integralNotes[i]});});
function getProblems(date){const day=Math.floor(Date.parse(date+'T00:00:00+08:00')/86400000);const cycle=Math.floor(day/8);const a=2+((cycle%11)+11)%11;return [limits[((day%8)+8)%8](a),integrals[(((day+3)%8)+8)%8](2+((cycle*7%11)+11)%11)];}
root.getProblems=getProblems;
if(typeof module!=='undefined')module.exports={getProblems,limits,integrals};
})(typeof window!=='undefined'?window:globalThis);
