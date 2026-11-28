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
  // ➕ زر «أضف لسيرفرك»: ينفتح سؤال سريع قبل ما نودّي المستخدم لصفحة الإضافة بزرزور
  function inviteModal(){
    var old=document.getElementById("inv-modal");if(old)old.remove();
    var m=document.createElement("div");m.id="inv-modal";m.className="modal";m.setAttribute("role","dialog");m.setAttribute("aria-modal","true");
    m.innerHTML='<div class="modal-box"><button type="button" class="modal-x" aria-label="إغلاق">✕</button>'+
      '<h3>➕ أضف '+V.name+' لسيرفرك</h3>'+
      '<div id="inv-step1"><p>هل عندك سيرفر بزرزور تقدر تضيف له بوتات؟ (تكون مالكه، أو أدمن، أو عندك رتبة تسمح بإضافة بوتات)</p>'+
      '<div class="modal-act"><button type="button" class="btn" id="inv-yes">✅ نعم، أضف البوت</button><button type="button" class="btn ghost" id="inv-no">❌ ما عندي سيرفر</button></div></div>'+
      '<div id="inv-yes-box" hidden><p>راح تنفتح صفحة الإضافة بزرزور. اختر سيرفرك ووافق على الصلاحيات.</p>'+
      '<p class="modal-note">التحقق من صلاحياتك يتم بزرزور نفسه. إذا ما ظهر سيرفرك هناك، يعني ما عندك صلاحية إضافة بوتات فيه؛ اطلب من المالك يعطيك الصلاحية أو يضيف البوت بنفسه.</p>'+
      '<div class="modal-act"><a class="btn" id="inv-go" href="'+V.inviteUrl+'" target="_blank" rel="noopener">فتح صفحة الإضافة</a></div></div>'+
      '<div id="inv-no-box" hidden><p>ما عندك سيرفر أصلاً 🙂 سوّ سيرفر جديد بزرزور أول (مجاني)، وبعدها ارجع واضغط «أضف».</p>'+
      '<div class="modal-act"><a class="btn" href="https://zrzur.com" target="_blank" rel="noopener">فتح زرزور</a><button type="button" class="btn ghost" id="inv-back">رجوع</button></div></div></div>';
    document.body.appendChild(m);
    function q(i){return document.getElementById(i);}
    function show(id){["inv-step1","inv-yes-box","inv-no-box"].forEach(function(x){q(x).hidden=(x!==id);});}
    function close(){m.remove();document.removeEventListener("keydown",esc);}
    function esc(e){if(e.key==="Escape")close();}
    m.addEventListener("click",function(e){if(e.target===m)close();});
    m.querySelector(".modal-x").onclick=close;
    q("inv-yes").onclick=function(){show("inv-yes-box");q("inv-go").focus();};
    q("inv-no").onclick=function(){show("inv-no-box");};
    q("inv-back").onclick=function(){show("inv-step1");};
    q("inv-go").addEventListener("click",function(){setTimeout(close,300);});
    document.addEventListener("keydown",esc);q("inv-yes").focus();
  }
  document.querySelectorAll("[data-link]").forEach(function(el){
    if(el.dataset.link==="inviteUrl"&&V.inviteUrl){
      var b=document.createElement("button");b.type="button";b.className="btn "+(el.dataset.cls||"");b.textContent=el.dataset.label;b.onclick=inviteModal;el.replaceWith(b);
    }
  });
  document.querySelectorAll("[data-link]").forEach(function(el){el.outerHTML=link(V[el.dataset.link],el.dataset.label,el.dataset.cls);});
})();
