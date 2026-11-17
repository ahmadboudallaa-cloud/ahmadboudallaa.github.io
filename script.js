
(function(){
  var burger=document.getElementById('burger'),menu=document.getElementById('menu');
  burger.addEventListener('click',function(){
    var o=menu.classList.toggle('open');
    burger.setAttribute('aria-expanded',o);
  });
  menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){menu.classList.remove('open');burger.setAttribute('aria-expanded','false')})});

  // Lien actif selon la section visible
  var links=[].slice.call(menu.querySelectorAll('a'));
  var ids=links.map(function(a){return a.getAttribute('href').slice(1)});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting){
          links.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id)});
        }
      });
    },{rootMargin:'-40% 0px -55% 0px'});
    ids.forEach(function(id){var el=document.getElementById(id);if(el)io.observe(el)});

    // Compteurs : un seul moment d’animation quand les stats apparaissent
    var counted=false;
    var st=document.querySelector('.stats');
    new IntersectionObserver(function(es,ob){
      if(es[0].isIntersecting&&!counted){
        counted=true;ob.disconnect();
        document.querySelectorAll('[data-count]').forEach(function(n){
          var t=+n.dataset.count,i=0;
          var tm=setInterval(function(){i++;n.textContent=i;if(i>=t)clearInterval(tm)},350);
        });
      }
    },{threshold:.5}).observe(st);
  } else {
    document.querySelectorAll('[data-count]').forEach(function(n){n.textContent=n.dataset.count});
  }

  // Copier l’e-mail
  var copy=document.getElementById('copy'),msg=document.getElementById('copied');
  copy.addEventListener('click',function(){
    var mail='ahmadboudallaa@gmail.com';
    function ok(){msg.textContent='E-mail copié !';setTimeout(function(){msg.textContent=''},2200)}
    try{navigator.clipboard.writeText(mail).then(ok,function(){window.location.href='mailto:'+mail})}
    catch(e){window.location.href='mailto:'+mail}
  });

  document.getElementById('year').textContent=new Date().getFullYear();
})();
