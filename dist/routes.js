(function(root){
  function params(search,hash){
    // The preview service owns the query string; the application owns the hash.
    if(hash==='#home')return new URLSearchParams();
    if(hash.startsWith('#answer='))return new URLSearchParams(hash.slice(1));
    return new URLSearchParams(search);
  }
  function href(currentHref,answer,date){
    const base=currentHref.split('#')[0];
    if(!answer)return base+'#home';
    const route=new URLSearchParams({answer,date});
    return base+'#'+route.toString();
  }
  const routes={params,href};
  root.dailyRoutes=routes;
  if(typeof module!=='undefined')module.exports=routes;
})(typeof window!=='undefined'?window:globalThis);
