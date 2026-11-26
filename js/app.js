(function(){
  var V=window.VALK||{name:"Valk"}, page=document.body.dataset.page||"home";
  var nav=[["index.html","الرئيسية","home"],["index.html#features","المميزات","feat"],["commands.html","الأوامر","commands"],["updates.html","التحديثات","updates"],["support.html","الدعم","support"]];
  function link(url,label,cls){return url?'<a class="btn '+(cls||'')+'" href="'+url+'" target="_blank" rel="noopener">'+label+'</a>':'<span class="btn off" title="قريباً">'+label+' (قريباً)</span>';}
  window.valkLink=link;
  var h=document.getElementById("nav");
  if(h){h.className="nav";h.innerHTML='<div class="wrap"><a class="brand" href="index.html"><img src="assets/logo.svg" alt="">'+V.name+'</a>'+
   '<nav class="links" id="links">'+nav.map(function(n){return '<a href="'+n[0]+'" class="'+(n[2]===page?'on':'')+'">'+n[1]+'</a>';}).join("")+'</nav>'+
   '<button class="menu-btn" id="mb" aria-label="القائمة">☰</button></div>';
   document.getElementById("mb").onclick=function(){document.getElementById("links").classList.toggle("open");};}
  var f=document.getElementById("foot");
  if(f){f.innerHTML='<div class="wrap"><div>© '+new Date().getFullYear()+' '+V.name+' — بوت عربي لمنصة زرزور</div><div><a href="commands.html">الأوامر</a> · <a href="updates.html">التحديثات</a> · <a href="support.html">الدعم</a> · <a href="privacy.html">الخصوصية</a> · <a href="terms.html">الشروط</a></div></div>';}
  document.querySelectorAll("[data-link]").forEach(function(el){el.outerHTML=link(V[el.dataset.link],el.dataset.label,el.dataset.cls);});
})();
