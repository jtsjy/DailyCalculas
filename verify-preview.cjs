const assert=require('node:assert/strict');
const fs=require('node:fs');
const {params,href}=require('./dist/routes.js');
const source='https://git.nju.edu.cn/JSchwarz/dailycalculas/-/raw/main/dist/preview.html';
for(const base of ['http://localhost:4173/','https://example.com/project/index.html','file:///tmp/preview.html','https://htmlpreview.github.io/?'+source]){
  for(const answer of ['limit','integral']){
    const link=href(base,answer,'2026-11-08');
    const url=new URL(link);
    const route=params(url.search,url.hash);
    assert.equal(route.get('answer'),answer);
    assert.equal(route.get('date'),'2026-11-08');
    assert.equal(link.split('#')[0],base);
    const back=new URL(href(link));
    assert.equal(params(back.search,back.hash).has('answer'),false);
  }
}
assert.equal(params('?answer=limit&date=2026-11-08','').get('answer'),'limit');
assert.equal(params('?answer=limit&date=2026-11-08','#home').has('answer'),false);
const html=fs.readFileSync('dist/preview.html','utf8');
assert(!/<script[^>]+src\s*=|<link[^>]+rel="stylesheet"/.test(html));
assert(!/url\((?!data:)/.test(html));
assert(html.includes('data:font/woff2;base64,'));
assert(html.indexOf('<main id="app"')<html.indexOf('<script>'));
console.log('Preview bundle is self-contained; hash navigation preserves preview URLs and legacy answers.');
