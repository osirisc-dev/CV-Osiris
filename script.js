// Fecha
document.addEventListener('DOMContentLoaded', () => {
  const date = document.getElementById('date');
  if (date) date.textContent = "Actualizado: " + new Date().toLocaleDateString();
});

// Back to top
document.getElementById('top')?.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

// Scroll reveal
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// Tilt 3D suave
const tilt = (el)=>{
  let rAF;
  const onMove = (e)=>{
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left)/rect.width;
    const y = (e.clientY - rect.top)/rect.height;
    const rx = (y - 0.5) * -6;
    const ry = (x - 0.5) * 6;
    cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(()=>{ el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`; });
  };
  const reset = ()=>{ el.style.transform=''; };
  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', reset);
};
document.querySelectorAll('.card').forEach(tilt);

// Media opcional: si no hay src o falla carga, colapsa el contenedor
document.querySelectorAll('.media img[data-optional]').forEach(img=>{
  const wrap = img.closest('.media');
  const remove = ()=> wrap && wrap.remove();
  if(!img.getAttribute('src')) remove();
  img.addEventListener('error', remove);
  img.addEventListener('load', ()=> wrap && wrap.classList.remove('skeleton'));
});

// Respeta reduce-motion
const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
if(mq.matches){
  document.querySelectorAll('.blob,.card').forEach(el=>el.style.animation='none');
}
