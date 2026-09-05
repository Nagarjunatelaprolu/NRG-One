
const menu=document.querySelector('.menu'), links=document.querySelector('.navlinks');
if(menu) menu.addEventListener('click',()=>links.classList.toggle('open'));
document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
const prog=document.querySelector('.progress');window.addEventListener('scroll',()=>{if(prog){const h=document.documentElement.scrollHeight-innerHeight;prog.style.width=(h>0?scrollY/h*100:0)+'%'}});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
document.querySelectorAll('[data-count]').forEach(el=>{const target=+el.dataset.count;const ob=new IntersectionObserver(es=>{if(es[0].isIntersecting){let n=0;const step=Math.max(1,Math.ceil(target/45));const t=setInterval(()=>{n=Math.min(target,n+step);el.textContent=n+(el.dataset.suffix||'');if(n>=target)clearInterval(t)},28);ob.disconnect()}},{threshold:.5});ob.observe(el)});
