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

/* ═══════════════════════════════════════════
   DIAGNOSTIC MODAL
   - Captura nombre, teléfono, giro de empresa
   - Redirige a WhatsApp con datos pre-llenos
═══════════════════════════════════════════ */
(function(){
    const WA_NUMBER='525560515915';
    const modalHTML=`
<div class="diag-modal" id="diagModal" role="dialog" aria-modal="true" aria-labelledby="diagTitle">
    <div class="diag-card">
        <button class="diag-close" id="diagClose" aria-label="Cerrar">✕</button>
        <span class="diag-eye">// Diagnóstico estratégico</span>
        <h3 id="diagTitle">Cuéntame sobre tu <em>negocio.</em></h3>
        <p class="diag-sub">Contesta brevemente y te llevo directo a WhatsApp para coordinar tu diagnóstico.</p>
        <form class="diag-form" id="diagForm" novalidate>
            <div class="diag-field">
                <label for="diag-nombre">Nombre</label>
                <input type="text" id="diag-nombre" name="nombre" required autocomplete="name" placeholder="Tu nombre">
            </div>
            <div class="diag-field">
                <label for="diag-tel">Teléfono</label>
                <input type="tel" id="diag-tel" name="telefono" required autocomplete="tel" placeholder="+52 ..." pattern="[0-9+\\s\\-()]{7,}">
            </div>
            <div class="diag-field">
                <label for="diag-giro">Giro de la empresa</label>
                <input type="text" id="diag-giro" name="giro" required placeholder="eCommerce, B2B, Servicios, Lujo…">
            </div>
            <button type="submit" class="diag-submit">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/></svg>
                Enviar y abrir WhatsApp
            </button>
            <p class="diag-foot">Tus datos solo se usan para esta conversación.</p>
        </form>
    </div>
</div>`;
    document.body.insertAdjacentHTML('beforeend',modalHTML);
    const modal=document.getElementById('diagModal');
    const closeBtn=document.getElementById('diagClose');
    const form=document.getElementById('diagForm');

    function openModal(){
        modal.classList.add('open');
        document.body.style.overflow='hidden';
        setTimeout(()=>{const f=document.getElementById('diag-nombre');f&&f.focus()},80);
    }
    function closeModal(){
        modal.classList.remove('open');
        document.body.style.overflow='';
    }
    closeBtn.addEventListener('click',closeModal);
    modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal()});

    // Hook every "Agenda diagnóstico" link/button
    document.querySelectorAll('a[href*="wa.me"]').forEach(a=>{
        const txt=(a.textContent||'').toLowerCase();
        if(txt.includes('diagnóstico')||txt.includes('diagnostico')||a.classList.contains('nav-cta')||txt.includes('revisamos tu caso')||txt.includes('opciones de trabajo')||txt.includes('empieza por el diagnóstico')||txt.includes('empieza por el diagnostico')||txt.includes('agenda una conversación')||txt.includes('agenda una conversacion')){
            a.addEventListener('click',e=>{
                e.preventDefault();
                openModal();
            });
        }
    });
    // Also: any element with [data-diag]
    document.querySelectorAll('[data-diag]').forEach(el=>{
        el.addEventListener('click',e=>{e.preventDefault();openModal()});
    });

    form.addEventListener('submit',e=>{
        e.preventDefault();
        const nombre=form.nombre.value.trim();
        const telefono=form.telefono.value.trim();
        const giro=form.giro.value.trim();
        if(!nombre||!telefono||!giro){return}
        const msg=`Hola Aritzá, soy ${nombre}. Mi teléfono es ${telefono} y mi negocio es de ${giro}. Me gustaría agendar un diagnóstico estratégico.`;
        const url=`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
        window.open(url,'_blank','noopener');
        closeModal();
        form.reset();
    });
})();

/* ═══════════════════════════════════════════
   RESOURCE DOWNLOAD — captura email y envía a Aritzá
═══════════════════════════════════════════ */
(function(){
    document.querySelectorAll('.recurso').forEach(card=>{
        const cta=card.querySelector('.recurso-cta');
        if(!cta)return;
        // Build mini form
        const titleEl=card.querySelector('h3');
        const recurso=titleEl?titleEl.textContent.trim():'Recurso';
        const form=document.createElement('form');
        form.className='recurso-form';
        form.innerHTML=`
            <input type="email" name="email" placeholder="tu@correo.com" required>
            <button type="submit">Enviarme el recurso</button>
            <p class="ok">✓ Recibido — te llega al correo en minutos.</p>`;
        card.appendChild(form);

        cta.addEventListener('click',e=>{
            e.preventDefault();
            form.classList.add('open');
            cta.style.display='none';
            const inp=form.querySelector('input');inp&&inp.focus();
        });

        form.addEventListener('submit',e=>{
            e.preventDefault();
            const email=form.email.value.trim();
            if(!email)return;
            // mailto fallback to personal inbox (Aritzá puede reemplazar el destinatario)
            const subject=encodeURIComponent(`Solicitud de recurso · ${recurso}`);
            const body=encodeURIComponent(`Nuevo lead pidió el recurso: ${recurso}\nEmail: ${email}\n\n— Enviado desde aritzasalazar.com`);
            // Opens user's mail client to send to Aritzá's inbox
            window.location.href=`mailto:hola@aritzasalazar.com?subject=${subject}&body=${body}`;
            form.classList.add('sent');
        });
    });
})();

/* ═══════════════════════════════════════════
   NEWSLETTER — Suscripción
═══════════════════════════════════════════ */
(function(){
    const f=document.getElementById('nlForm');
    if(!f)return;
    const ok=document.getElementById('nlOk');
    f.addEventListener('submit',e=>{
        e.preventDefault();
        const email=f.email.value.trim();
        if(!email)return;
        const subject=encodeURIComponent('Suscripción · Newsletter Growth Lab');
        const body=encodeURIComponent(`Nueva suscripción al newsletter semanal.\nEmail: ${email}\n\n— Enviado desde aritzasalazar.com`);
        window.location.href=`mailto:hola@aritzasalazar.com?subject=${subject}&body=${body}`;
        if(ok){ok.style.display='block';f.querySelector('input').value=''}
    });
})();
