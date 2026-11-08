const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,'dist',file),'utf8').replace(/\r\n/g,'\n');
// Embed WOFF2 fonts as data URLs so the preview service fetches only one file.
const katexCSS=read('vendor/katex.min.css').replace(/src:url\(([^)]+\.woff2)\)[^}]+/g,(_,font)=>{
  const bytes=fs.readFileSync(path.join(root,'dist/vendor',font));
  return `src:url(data:font/woff2;base64,${bytes.toString('base64')}) format("woff2")`;
});
let html=read('index.html');
const licenses=['vendor/LICENSE','vendor/LICENSE-octicons.txt','fonts/OFL-NotoSerifSC.txt'].map(file=>read(file).replace(/--/g,'- -')).join('\n\n');
html=html.replace('<!doctype html>',()=>`<!doctype html>\n<!-- Bundled font and math library licenses:\n${licenses}\n-->`);
html=html.replace(/<link rel="stylesheet" href="\.\/vendor\/katex.min.css">/,()=>`<style>${katexCSS}</style>`);
const siteCSS=read('style.css').replace(/url\(["']?(\.\/fonts\/[^)'" ]+\.woff2)["']?\)/g,(_,font)=>{
  const bytes=fs.readFileSync(path.join(root,'dist',font));
  return `url(data:font/woff2;base64,${bytes.toString('base64')})`;
});
html=html.replace(/<link rel="stylesheet" href="\.\/style.css">/,()=>`<style>${siteCSS}</style>`);
// Inline scripts must run after #app exists, including when opened directly.
const scripts=[];
html=html.replace(/<script defer src="\.\/([^"]+)"><\/script>/g,(_,file)=>{
  scripts.push('<script>\n'+read(file).replace(/<\/script/gi,'<\\/script')+'\n</script>');return '';
});
html=html.replace('</body>',()=>scripts.join('\n')+'\n</body>');
const output=path.join(root,'dist/preview.html');
if(process.argv.includes('--check')){
  if(!fs.existsSync(output)||fs.readFileSync(output,'utf8').replace(/\r\n/g,'\n')!==html)throw new Error('preview.html is stale. Run npm run build:preview.');
}else{
  fs.writeFileSync(output,html);
  console.log(`Generated self-contained preview.html (${Math.round(Buffer.byteLength(html)/1024)} KiB)`);
}
