
const menu=document.querySelector('.menu'),links=document.querySelector('.links');
if(menu&&links){menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',open?'true':'false')})}
document.querySelectorAll('.nav-drop>a').forEach(a=>a.addEventListener('click',e=>{
  if(window.innerWidth<=760){e.preventDefault();a.parentElement.classList.toggle('open')}
}));
document.addEventListener('click',e=>{if(!e.target.closest('.nav-drop'))document.querySelectorAll('.nav-drop').forEach(x=>x.classList.remove('open'))});
const progress=document.querySelector('.progress');
window.addEventListener('scroll',()=>{if(progress){const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(h>0?scrollY/h*100:0)+'%'}},{passive:true});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
document.querySelectorAll('.faq details').forEach(d=>d.addEventListener('toggle',()=>{}));
document.querySelectorAll('[data-tabs]').forEach(group=>{
 const buttons=group.querySelectorAll('.tab');
 buttons.forEach(btn=>btn.addEventListener('click',()=>{buttons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const wrap=group.parentElement;wrap.querySelectorAll('.tab-panel').forEach(p=>p.classList.toggle('active',p.id===btn.dataset.target))})
});
// Service filters — event delegated so buttons keep working even when animated/re-rendered.
(function(){
  const groups = document.querySelectorAll('[data-filter-group]');
  groups.forEach(group=>{
    const buttons = [...group.querySelectorAll('.filter-btn')];
    const grid = group.nextElementSibling && group.nextElementSibling.classList.contains('grid3')
      ? group.nextElementSibling : group.parentElement.querySelector('.grid3');
    if(!grid) return;
    const items = [...grid.querySelectorAll('.filter-item')];

    function applyFilter(value){
      buttons.forEach(btn=>{
        const active = (btn.dataset.filter || 'all') === value;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      items.forEach(item=>{
        const cats = (item.dataset.category || '').trim().split(/\s+/);
        const visible = value === 'all' || cats.includes(value);
        item.classList.remove('filter-enter');
        item.classList.toggle('is-filter-hidden', !visible);
        item.setAttribute('aria-hidden', visible ? 'false' : 'true');
        if(visible) requestAnimationFrame(()=>item.classList.add('filter-enter'));
      });
    }

    group.addEventListener('click', e=>{
      const btn = e.target.closest('.filter-btn');
      if(!btn || !group.contains(btn)) return;
      e.preventDefault();
      e.stopPropagation();
      applyFilter(btn.dataset.filter || 'all');
    });

    applyFilter('all');
  });
})();

// Contact prefill from service cards
(function(){
 const form=document.getElementById('contactForm'); if(!form)return;
 const q=new URLSearchParams(location.search).get('service');
 const map={product:'Web / SaaS',engineering:'Custom Software',cloud:'Cloud / DevOps',ai:'AI & Automation'};
 if(q && map[q]){const s=form.querySelector('[name="service"]');if(s){s.value=map[q]}}
})();
// Broken-image protection: if a visual is unavailable, show a clean local placeholder.
document.querySelectorAll('img').forEach(img=>{
  img.addEventListener('error',()=>{
    img.removeAttribute('src');
    img.classList.add('img-fallback');
    img.alt=img.alt||'NRG ONE visual';
  },{once:true});
});
// Desktop dropdowns use CSS hover/focus; mobile uses the menu toggle above.
(function(){
 const f=document.getElementById('contactForm'),fallback=document.getElementById('emailFallback'),status=document.getElementById('formStatus');
 if(!f)return;
 const mailBody=()=>{const d=new FormData(f);return `NRG ONE PROJECT ENQUIRY\n\nName: ${d.get('name')||''}\nEmail: ${d.get('email')||''}\nCompany: ${d.get('company')||''}\nPhone / WhatsApp: ${d.get('phone')||''}\nService: ${d.get('service')||''}\nTimeline: ${d.get('timeline')||''}\nBudget: ${d.get('budget')||''}\n\nRequirement:\n${d.get('message')||''}`};
 if(fallback)fallback.addEventListener('click',()=>{if(!f.reportValidity())return;const d=new FormData(f);location.href='mailto:nrgone1991@gmail.com?subject='+encodeURIComponent('NRG ONE Project Enquiry — '+(d.get('service')||'New enquiry'))+'&body='+encodeURIComponent(mailBody());if(status)status.textContent='Opening your email app…'});
 f.addEventListener('submit',()=>{if(status)status.textContent='Sending enquiry…'});
})();

// V4: motion is CSS-first; JavaScript only enhances interactions.
