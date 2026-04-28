/* Scroll progress */
window.addEventListener('scroll',()=>{
    const h=document.documentElement;
    const sc=(h.scrollTop)/(h.scrollHeight-h.clientHeight)*100;
    const sb=document.getElementById('scrollBar');
    if(sb) sb.style.width=sc+'%';
    const nav=document.getElementById('nav');
    if(nav) nav.classList.toggle('scrolled',h.scrollTop>40);
},{passive:true});

/* Reveal on scroll */
const rvObs=new IntersectionObserver(es=>{
    es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');rvObs.unobserve(e.target)}});
},{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.rv').forEach(el=>rvObs.observe(el));

/* Counter */
const cntObs=new IntersectionObserver(es=>{
    es.forEach(e=>{
        if(!e.isIntersecting)return;
        e.target.querySelectorAll('[data-count]').forEach(n=>{
            const t=+n.dataset.count;let c=0;
            const step=()=>{c+=Math.ceil(t/30);if(c>=t){n.textContent=t;return}n.textContent=c;requestAnimationFrame(step)};step();
        });
        cntObs.unobserve(e.target);
    });
},{threshold:0.4});
document.querySelectorAll('.stats-strip,.hero-meta').forEach(el=>cntObs.observe(el));

/* Mobile menu */
const mt=document.getElementById('menuToggle'),mm=document.getElementById('mobileMenu'),mc=document.getElementById('mobileClose');
mt&&mt.addEventListener('click',()=>mm.classList.add('open'));
mc&&mc.addEventListener('click',()=>mm.classList.remove('open'));
mm&&mm.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mm.classList.remove('open')));

/* Calendly placeholder */
document.querySelectorAll('[data-cal]').forEach(el=>{
    el.addEventListener('click',e=>{
        e.preventDefault();
        // Reemplaza con tu link real de Calendly:
        window.open('https://calendly.com/','_blank');
    });
});
