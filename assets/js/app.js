/* ============================================================
   APP — i18n · nav · reveal · hero slider · cart · lightbox · checkout
   Vanilla JS, no dependencies. Runs on every page (feature-detected).
   ============================================================ */
(function(){
"use strict";

/* ---------------- helpers ---------------- */
const $  = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));
const LS_LANG = "ik_lang", LS_CART = "ik_cart";
const fmt = n => new Intl.NumberFormat("pl-PL").format(n) + " zł";
function goToCheckout(){ location.href = "/checkout/"; }
const svg = {
  arrowL:'<svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>',
  arrowR:'<svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>',
  close:'<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  plus:'<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  check:'<svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>'
};

/* ---------------- i18n ---------------- */
let lang = localStorage.getItem(LS_LANG) || "pl";
function t(key){ return (I18N[lang] && I18N[lang][key]) || (I18N.pl[key]) || key; }
function applyI18n(){
  document.documentElement.lang = lang;
  $$("[data-i18n]").forEach(el=>{ el.innerHTML = t(el.getAttribute("data-i18n")); });
  $$("[data-i18n-ph]").forEach(el=>{ el.placeholder = t(el.getAttribute("data-i18n-ph")); });
  $$(".lang button").forEach(b=>b.classList.toggle("on", b.dataset.lang===lang));
  // re-render dynamic, language-dependent content
  renderCart(); renderShop(); renderCheckout(); refreshLightboxLang();
}
function setLang(l){ if(l===lang) return; lang=l; localStorage.setItem(LS_LANG,l); applyI18n(); }
$$(".lang button").forEach(b=> b.addEventListener("click", ()=>setLang(b.dataset.lang)));

/* ---------------- nav ---------------- */
const nav = $(".nav");
if(nav){
  const onScroll=()=>nav.classList.toggle("scrolled", window.scrollY>40);
  onScroll(); window.addEventListener("scroll", onScroll, {passive:true});
}
const burger = $(".burger");
const navLinks = $(".nav-links");
if(burger && navLinks){
  const setMenu = open => {
    navLinks.classList.toggle("mobile-open", open);
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true":"false");
    document.body.classList.toggle("no-scroll", open);
  };
  burger.addEventListener("click", ()=> setMenu(!navLinks.classList.contains("mobile-open")));
  navLinks.querySelectorAll("a").forEach(a=> a.addEventListener("click", ()=> setMenu(false)));
  document.addEventListener("keydown", e=>{ if(e.key==="Escape" && navLinks.classList.contains("mobile-open")) setMenu(false); });
}

/* ---------------- reveal on scroll ---------------- */
const io = ("IntersectionObserver" in window) ? new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){
    e.target.classList.add("in");
    if(e.target.classList.contains("signature")) e.target.classList.add("draw");
    io.unobserve(e.target);
  }});
},{threshold:.14, rootMargin:"0px 0px -8% 0px"}) : null;
function observeReveals(root=document){
  if(!io){ $$(".reveal,.signature",root).forEach(el=>el.classList.add("in","draw")); return; }
  $$(".reveal",root).forEach(el=>io.observe(el));
  $$(".signature",root).forEach(el=>io.observe(el));
}

/* ---------------- HERO slider ---------------- */
function initHero(){
  const stage = $("#slides"); if(!stage) return;
  const hero = $(".hero");
  const dotsWrap = $("#heroDots");
  const slidesData = ORIGINALS.filter(a=>a.hero).slice(0,4);
  let idx = 0, timer = null, paused = false;
  const INTERVAL = 6000;

  slidesData.forEach((a,i)=>{
    const s = document.createElement("div");
    s.className = "slide"+(i===0?" active":"");
    s.innerHTML = `<div class="slide-img" style="background-image:url('${a.img}')"></div>`;
    stage.appendChild(s);
    const d = document.createElement("button");
    d.className = "dot"+(i===0?" on":"");
    d.setAttribute("aria-label","Slide "+(i+1));
    d.addEventListener("click", ()=>go(i,true));
    dotsWrap.appendChild(d);
  });
  const slides = $$(".slide", stage);
  const dots = $$("button", dotsWrap);

  function go(n, manual){
    idx = (n+slides.length)%slides.length;
    slides.forEach((s,i)=>s.classList.toggle("active", i===idx));
    dots.forEach((d,i)=>d.classList.toggle("on", i===idx));
    if(manual) restart();
  }
  const next=()=>go(idx+1);
  const prev=()=>go(idx-1);
  function tick(){ if(!paused) next(); }
  function start(){ timer = setInterval(tick, INTERVAL); }
  function restart(){ clearInterval(timer); start(); }

  $("#heroPrev").addEventListener("click", ()=>{prev();restart();});
  $("#heroNext").addEventListener("click", ()=>{next();restart();});
  hero.addEventListener("mouseenter", ()=>paused=true);
  hero.addEventListener("mouseleave", ()=>paused=false);
  document.addEventListener("keydown", e=>{
    if(e.key==="ArrowLeft"){prev();restart();}
    if(e.key==="ArrowRight"){next();restart();}
  });
  if(!window.matchMedia("(prefers-reduced-motion:reduce)").matches) start();
}

/* ---------------- CART ---------------- */
function getCart(){ try{ return JSON.parse(localStorage.getItem(LS_CART))||{}; }catch(e){ return {}; } }
function saveCart(c){ localStorage.setItem(LS_CART, JSON.stringify(c)); updateCartCount(); renderCart(); renderCheckout(); }
function cartCount(){ return Object.values(getCart()).reduce((a,b)=>a+b,0); }
function cartLines(){ return Object.entries(getCart()).map(([id,q])=>({item:ALL_BY_ID[id],qty:q})).filter(x=>x.item); }
function cartTotal(){ return cartLines().reduce((s,l)=>s+l.item.price*l.qty,0); }
function addToCart(id){ const c=getCart(); c[id]=(c[id]||0)+1; saveCart(c); toast(t("cart.added")); }
function setQty(id,q){ const c=getCart(); if(q<=0){delete c[id];} else {c[id]=q;} saveCart(c); }
function removeItem(id){ const c=getCart(); delete c[id]; saveCart(c); }

function updateCartCount(){
  const n = cartCount();
  $$(".cart-count").forEach(el=>{ el.textContent=n; el.classList.toggle("show", n>0); });
}

function renderCart(){
  const body = $("#cartBody"); if(!body) return;
  const lines = cartLines();
  if(!lines.length){ body.innerHTML = `<p class="cart-empty">${t("cart.empty")}</p>`; }
  else{
    body.innerHTML = lines.map(l=>`
      <div class="cart-item">
        <img src="${l.item.img}" alt="">
        <div>
          <div class="ci-t">${l.item.title[lang]}</div>
          <div class="ci-m">${l.item.medium[lang]}</div>
          <div class="ci-p">${fmt(l.item.price)}</div>
          <div class="qty">
            <button data-dec="${l.item.id}" aria-label="-">–</button>
            <span>${l.qty}</span>
            <button data-inc="${l.item.id}" aria-label="+">+</button>
          </div>
        </div>
        <button class="ci-remove" data-rm="${l.item.id}">${t("cart.remove")}</button>
      </div>`).join("");
  }
  const foot = $("#cartFoot");
  if(foot) foot.style.display = lines.length ? "block":"none";
  const sum = $("#cartSum"); if(sum) sum.textContent = fmt(cartTotal());

  body.querySelectorAll("[data-inc]").forEach(b=>b.onclick=()=>{const id=b.dataset.inc;setQty(id,(getCart()[id]||0)+1);});
  body.querySelectorAll("[data-dec]").forEach(b=>b.onclick=()=>{const id=b.dataset.dec;setQty(id,(getCart()[id]||0)-1);});
  body.querySelectorAll("[data-rm]").forEach(b=>b.onclick=()=>removeItem(b.dataset.rm));
}

/* cart drawer open/close */
function openCart(){ $("#cartDrawer")?.classList.add("open"); $("#overlay")?.classList.add("open"); document.body.classList.add("no-scroll"); }
function closeCart(){ $("#cartDrawer")?.classList.remove("open"); $("#overlay")?.classList.remove("open"); document.body.classList.remove("no-scroll"); }
$$(".cart-btn").forEach(b=>b.addEventListener("click", openCart));
$("#cartClose")?.addEventListener("click", closeCart);
$("#overlay")?.addEventListener("click", closeCart);

/* ---------------- SHOP ---------------- */
let shopCat = "obraz";
function renderShop(){
  const grid = $("#shopGrid"); if(!grid) return;
  const list = ARTWORKS[shopCat];
  grid.innerHTML = list.map(a=>`
    <article class="product reveal">
      <div class="product-media" data-view="${a.id}">
        ${a.sold?`<span class="badge sold">${t("shop.sold")}</span>`:``}
        <img src="${a.img}" alt="${a.title[lang]}" loading="lazy">
      </div>
      <div class="product-body">
        <div class="p-medium">${a.medium[lang]}</div>
        <h3>${a.title[lang]}</h3>
        <div class="p-dim">${a.dim}${a.year&&a.year!=="[rok]"?" · "+a.year:""}</div>
        <div class="product-foot">
          <div class="price">${fmt(a.price)}</div>
          ${a.sold
            ? `<button class="btn btn-ghost btn-sm" disabled>${t("shop.sold")}</button>`
            : `<button class="btn btn-accent btn-sm" data-add="${a.id}">${t("shop.add")}</button>`}
        </div>
      </div>
    </article>`).join("");
  $$(".tab").forEach(tb=>tb.classList.toggle("on", tb.dataset.cat===shopCat));
  // counts
  const oc=$("#countObraz"), pc=$("#countPrint");
  if(oc) oc.textContent = ARTWORKS.obraz.length;
  if(pc) pc.textContent = ARTWORKS.print.length;
  grid.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>{ addToCart(b.dataset.add); goToCheckout(); });
  grid.querySelectorAll("[data-view]").forEach(el=>el.onclick=()=>openLightbox(el.dataset.view));
  observeReveals(grid);
}
$$(".tab").forEach(tab=>tab.addEventListener("click", ()=>{ shopCat=tab.dataset.cat; renderShop(); }));

/* ---------------- PORTFOLIO (homepage) ---------------- */
function renderPortfolio(){
  const grid = $("#pfGrid"); if(!grid) return;
  grid.innerHTML = PORTFOLIO.map(a=>`
    <figure class="pf-item reveal" data-view="${a.id}">
      <img src="${a.img}" alt="${a.title[lang]}" loading="lazy">
      <span class="pf-corner">${svg.plus}</span>
      <figcaption class="pf-overlay">
        <div class="pf-t">${a.title[lang]}</div>
        <div class="pf-meta">
          <span class="pf-medium">${a.medium[lang]}</span>
          <span class="pf-price">${fmt(a.price)}</span>
        </div>
      </figcaption>
    </figure>`).join("");
  grid.querySelectorAll("[data-view]").forEach(el=>el.onclick=()=>openLightbox(el.dataset.view));
  observeReveals(grid);
}

/* ---------------- LIGHTBOX ---------------- */
let lbId = null, lbList = [];
function openLightbox(id){
  const lb = $("#lightbox"); if(!lb) return;
  lbList = (shopCat && $("#shopGrid")) ? ARTWORKS[shopCat] : PORTFOLIO;
  if(!lbList.find(a=>a.id===id)) lbList = [...ORIGINALS, ...PRINTS];
  lbId = id;
  fillLightbox();
  lb.classList.add("open"); document.body.classList.add("no-scroll");
}
function fillLightbox(){
  const a = ALL_BY_ID[lbId]; if(!a) return;
  $("#lbImg").src = a.img;
  $("#lbImg").alt = a.title[lang];
  $("#lbMedium").textContent = a.medium[lang];
  $("#lbTitle").textContent = a.title[lang];
  $("#lbDim").textContent = a.dim + (a.year&&a.year!=="[rok]"?" · "+a.year:"");
  $("#lbDesc").textContent = a.desc[lang];
  $("#lbPrice").textContent = fmt(a.price);
  const badge = $("#lbBadge");
  if(badge){ badge.textContent = t("shop.sold"); badge.style.display = a.sold ? "inline-block":"none"; }
  const addBtn = $("#lbAdd");
  if(a.sold){
    addBtn.textContent = t("shop.sold");
    addBtn.disabled = true;
    addBtn.classList.remove("btn-accent"); addBtn.classList.add("btn-ghost");
    addBtn.onclick = null;
  } else {
    addBtn.textContent = t("lb.add");
    addBtn.disabled = false;
    addBtn.classList.remove("btn-ghost"); addBtn.classList.add("btn-accent");
    addBtn.onclick = ()=>{ addToCart(a.id); goToCheckout(); };
  }
  addBtn.style.display = "inline-flex";
  // secondary: "Powrót do sklepu" — na stronie sklepu zamyka podgląd, poza nią prowadzi do /sklep
  const shopBtn = $("#lbShop");
  shopBtn.textContent = t("lb.shop");
  if($("#shopGrid")){
    shopBtn.setAttribute("href","#");
    shopBtn.onclick = e=>{ e.preventDefault(); closeLightbox(); };
  } else {
    shopBtn.setAttribute("href","/sklep/");
    shopBtn.onclick = null;
  }
}
function refreshLightboxLang(){ if($("#lightbox")?.classList.contains("open")) fillLightbox(); }
function lbGo(dir){
  const i = lbList.findIndex(a=>a.id===lbId);
  lbId = lbList[(i+dir+lbList.length)%lbList.length].id;
  fillLightbox();
}
function closeLightbox(){ $("#lightbox")?.classList.remove("open"); document.body.classList.remove("no-scroll"); }
$("#lbClose")?.addEventListener("click", closeLightbox);
$("#lbPrev")?.addEventListener("click", ()=>lbGo(-1));
$("#lbNext")?.addEventListener("click", ()=>lbGo(1));
$("#lightbox")?.addEventListener("click", e=>{ if(e.target.id==="lightbox") closeLightbox(); });
document.addEventListener("keydown", e=>{
  if(!$("#lightbox")?.classList.contains("open")) return;
  if(e.key==="Escape") closeLightbox();
  if(e.key==="ArrowLeft") lbGo(-1);
  if(e.key==="ArrowRight") lbGo(1);
});

/* ---------------- CHECKOUT ---------------- */
function renderCheckout(){
  const wrap = $("#coSummary"); if(!wrap) return;
  const lines = cartLines();
  const formCard = $("#coFormCard"), emptyCard = $("#coEmpty");
  if(!lines.length){
    if(formCard) formCard.style.display="none";
    if(emptyCard) emptyCard.style.display="block";
    wrap.style.display="none";
    return;
  }
  if(formCard) formCard.style.display="block";
  if(emptyCard) emptyCard.style.display="none";
  wrap.style.display="block";

  const sub = cartTotal();
  wrap.querySelector("#coLines").innerHTML = lines.map(l=>`
    <div class="co-line">
      <img src="${l.item.img}" alt="">
      <div>
        <div class="cl-t">${l.item.title[lang]}</div>
        <div class="cl-q">${l.item.medium[lang]} · ×${l.qty}</div>
      </div>
      <div class="cl-p">${fmt(l.item.price*l.qty)}</div>
    </div>`).join("");
  wrap.querySelector("#coSub").textContent = fmt(sub);
  wrap.querySelector("#coShip").textContent = t("co.free");
  wrap.querySelector("#coGrand").textContent = fmt(sub);
}
const WEB3FORMS_KEY = "377a94b8-0a74-4db2-b62d-86f6e674f028";
const coForm = $("#coForm");
if(coForm){
  coForm.addEventListener("submit", async e=>{
    e.preventDefault();
    if(!coForm.reportValidity()) return;
    const lines = cartLines();
    if(!lines.length) return;
    const val = id => (document.getElementById(id)?.value || "").trim();
    const name = `${val("coFirst")} ${val("coLast")}`.trim();
    const itemsTxt = lines.map(l=>`- ${l.item.title.pl} (${l.item.medium.pl}, ${l.item.dim}) x${l.qty} = ${fmt(l.item.price*l.qty)}`).join("\n");

    const fd = new FormData();
    fd.append("access_key", WEB3FORMS_KEY);
    fd.append("subject", `Nowe zamówienie iwonakaus.pl — ${name}`);
    fd.append("from_name", "Sklep iwonakaus.pl");
    fd.append("Imię i nazwisko", name);
    fd.append("email", val("coEmail"));               // reply-to
    fd.append("Telefon", val("coPhone"));
    fd.append("Adres wysyłki", `${val("coStreet")}, ${val("coZip")} ${val("coCity")}, ${val("coCountry")}`);
    fd.append("Uwagi", val("coNotes"));
    fd.append("Zamówienie", `${itemsTxt}\n\nRAZEM: ${fmt(cartTotal())}`);

    const submitBtn = coForm.querySelector('button[type="submit"]');
    const label = submitBtn.querySelector('[data-i18n="co.place"]') || submitBtn;
    const prev = label.textContent;
    label.textContent = t("co.sending");
    submitBtn.disabled = true;
    try{
      const res = await fetch("https://api.web3forms.com/submit", {method:"POST", body:fd});
      const data = await res.json();
      if(res.ok && data.success){
        localStorage.removeItem(LS_CART); updateCartCount();
        $("#coLayout").style.display="none";
        const done = $("#coDone"); done.style.display="block";
        done.scrollIntoView({behavior:"smooth"});
      } else {
        alert(t("co.error"));
      }
    } catch(err){
      alert(t("co.error"));
    } finally {
      label.textContent = prev;
      submitBtn.disabled = false;
    }
  });
}

/* ---------------- TOAST ---------------- */
let toastTimer=null;
function toast(msg){
  let el = $("#toast");
  if(!el){ el=document.createElement("div"); el.id="toast"; el.className="toast"; document.body.appendChild(el); }
  el.innerHTML = svg.check + "<span>"+msg+"</span>";
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>el.classList.remove("show"), 2200);
}

/* ---------------- INIT ---------------- */
document.addEventListener("DOMContentLoaded", ()=>{
  applyI18n();
  updateCartCount();
  initHero();
  renderPortfolio();
  renderShop();
  renderCheckout();
  renderCart();
  observeReveals();
  // deep-link: #art=<id> opens that artwork's popup
  const h = location.hash.match(/^#art=(\w+)/);
  if(h && ALL_BY_ID[h[1]]) openLightbox(h[1]);
});
})();
