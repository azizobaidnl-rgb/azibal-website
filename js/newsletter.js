(function(){
  const path=(window.location.pathname.split('/').pop()||'index.html').toLowerCase();
  const excluded=new Set(['privacy.html','terms.html','partner-form.html','thank-you.html','404.html']);
  if(excluded.has(path)) return;

  const SUBSCRIBED_KEY='azibalNewsletterSubscribed';
  const DISMISSED_KEY='azibalNewsletterDismissedAt';
  const DISMISS_DAYS=14;
  const SHOW_DELAY=10000;

  try{
    if(localStorage.getItem(SUBSCRIBED_KEY)==='1') return;
    const dismissed=Number(localStorage.getItem(DISMISSED_KEY)||0);
    if(dismissed && Date.now()-dismissed<DISMISS_DAYS*24*60*60*1000) return;
  }catch(e){}

  const style=document.createElement('style');
  style.textContent=`
    .az-newsletter{position:fixed;left:22px;bottom:22px;width:min(390px,calc(100vw - 28px));z-index:2900;background:#fff;border:1px solid #e1e6ee;border-radius:18px;box-shadow:0 18px 48px rgba(7,21,43,.22);font-family:Inter,Arial,sans-serif;overflow:hidden;opacity:0;transform:translateY(18px);pointer-events:none;transition:opacity .22s ease,transform .22s ease}
    .az-newsletter.is-visible{opacity:1;transform:translateY(0);pointer-events:auto}
    .az-newsletter-head{background:#0b1f3a;color:#fff;padding:18px 48px 16px 20px;position:relative}
    .az-newsletter-head small{display:block;color:#d6b260;font-size:11px;letter-spacing:.08em;font-weight:800;margin-bottom:5px}
    .az-newsletter-head h2{font-size:21px;line-height:1.25;margin:0;color:#fff}
    .az-newsletter-close{position:absolute;right:12px;top:11px;border:0;background:transparent;color:#fff;font-size:25px;line-height:1;cursor:pointer;padding:5px 8px;border-radius:7px}
    .az-newsletter-body{padding:18px 20px 20px}
    .az-newsletter-body p{margin:0 0 13px;color:#526075;font-size:14px;line-height:1.55}
    .az-newsletter-row{display:flex;gap:8px}
    .az-newsletter-email{flex:1;min-width:0;border:1px solid #d6dce5;border-radius:10px;padding:11px 12px;font:14px Inter,Arial,sans-serif;color:#172033;background:#fff}
    .az-newsletter-submit{border:0;border-radius:10px;background:#c89b3c;color:#fff;font-weight:800;padding:0 15px;cursor:pointer}
    .az-newsletter-consent{display:flex;gap:8px;align-items:flex-start;margin:12px 0 0;color:#687386;font-size:11.5px;line-height:1.45}
    .az-newsletter-consent input{width:auto;margin-top:2px;flex:0 0 auto}
    .az-newsletter-consent a{color:#0b1f3a;font-weight:700}
    .az-newsletter-status{min-height:18px;margin-top:10px!important;margin-bottom:0!important;font-size:12px!important}
    .az-newsletter-close:focus-visible,.az-newsletter-email:focus-visible,.az-newsletter-submit:focus-visible{outline:3px solid rgba(200,155,60,.45);outline-offset:2px}
    @media(max-width:520px){.az-newsletter{left:14px;bottom:14px;width:calc(100vw - 28px)}.az-newsletter-row{flex-direction:column}.az-newsletter-submit{min-height:44px}}
  `;
  document.head.appendChild(style);

  const popup=document.createElement('aside');
  popup.className='az-newsletter';
  popup.setAttribute('aria-label','AziBal email updates');
  popup.innerHTML=`
    <div class="az-newsletter-head">
      <small>AZIBAL BUSINESS UPDATES</small>
      <h2>Stay informed about new sourcing opportunities.</h2>
      <button class="az-newsletter-close" type="button" aria-label="Close email subscription popup">×</button>
    </div>
    <div class="az-newsletter-body">
      <p>Receive occasional AziBal updates about product categories, sourcing opportunities and business news.</p>
      <form class="az-newsletter-form">
        <input type="hidden" name="_subject" value="AziBal Email Subscription">
        <input type="hidden" name="enquiry_type" value="Email subscription">
        <input type="hidden" name="source" value="${location.href.replace(/"/g,'&quot;')}">
        <div class="az-newsletter-row">
          <input class="az-newsletter-email" type="email" name="email" autocomplete="email" placeholder="Business email" aria-label="Business email" required>
          <button class="az-newsletter-submit" type="submit">Subscribe</button>
        </div>
        <label class="az-newsletter-consent"><input type="checkbox" name="marketing_consent" value="Agreed" required><span>I agree to receive occasional AziBal business updates by email. I can opt out by contacting <a href="mailto:info@azibal.com">info@azibal.com</a>. See the <a href="privacy.html">Privacy Policy</a>.</span></label>
        <p class="az-newsletter-status" role="status" aria-live="polite"></p>
      </form>
    </div>`;
  document.body.appendChild(popup);

  const close=popup.querySelector('.az-newsletter-close');
  const form=popup.querySelector('.az-newsletter-form');
  const status=popup.querySelector('.az-newsletter-status');
  const email=popup.querySelector('.az-newsletter-email');
  const submit=popup.querySelector('.az-newsletter-submit');

  function dismiss(){
    popup.classList.remove('is-visible');
    try{localStorage.setItem(DISMISSED_KEY,String(Date.now()))}catch(e){}
  }
  close.addEventListener('click',dismiss);
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&popup.classList.contains('is-visible'))dismiss()});

  form.addEventListener('submit',async function(e){
    e.preventDefault();
    submit.disabled=true;
    status.textContent='Subscribing…';
    try{
      const response=await fetch('https://formspree.io/f/xqereodo',{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
      if(response.ok){
        try{localStorage.setItem(SUBSCRIBED_KEY,'1');localStorage.removeItem(DISMISSED_KEY)}catch(x){}
        status.textContent='Thank you — your email has been added to AziBal updates.';
        form.reset();
        setTimeout(()=>popup.classList.remove('is-visible'),2600);
      }else{
        status.textContent='We could not subscribe you. Please try again or email info@azibal.com.';
        submit.disabled=false;
      }
    }catch(err){
      status.textContent='Connection error. Please try again later.';
      submit.disabled=false;
    }
  });

  setTimeout(function(){
    const chat=document.getElementById('azibal-chat-panel');
    if(chat&&chat.classList.contains('is-open')) return;
    popup.classList.add('is-visible');
    setTimeout(()=>email.focus({preventScroll:true}),250);
  },SHOW_DELAY);
})();

(function(){
  function initHeaderPolish(){
    const header=document.querySelector('.header');
    if(!header||document.querySelector('.az-announcement-bar')) return;

    const path=window.location.pathname;
    const lang=path.startsWith('/nl/')?'nl':path.startsWith('/de/')?'de':'en';
    const messages={
      en:['Netherlands-based B2B sourcing','Wholesale sourcing & brand partnerships','Direct business contact','KVK 42143577'],
      nl:['Nederlandse B2B sourcing','Groothandel & merkpartnerschappen','Direct zakelijk contact','KVK 42143577'],
      de:['B2B-Sourcing aus den Niederlanden','Großhandel & Markenpartnerschaften','Direkter Geschäftskontakt','KVK 42143577']
    }[lang];

    const style=document.createElement('style');
    style.textContent=`
      .az-announcement-bar{height:46px;background:#1d2a3b;color:#fff;display:flex;align-items:center;justify-content:center;padding:0 18px;overflow:hidden;font-family:Inter,Arial,sans-serif}
      .az-announcement-inner{display:flex;align-items:center;justify-content:center;gap:10px;min-width:0}
      .az-announcement-mark{width:22px;height:22px;border:1.5px solid rgba(255,255,255,.9);border-radius:6px;display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;font-size:11px;font-weight:800;color:#fff}
      .az-announcement-text{font-size:14px;font-weight:500;letter-spacing:.01em;white-space:nowrap;opacity:1;transform:translateY(0);transition:opacity .2s ease,transform .2s ease}
      .az-announcement-text.is-changing{opacity:0;transform:translateY(-7px)}
      @media(max-width:780px){
        .az-announcement-bar{height:46px;padding:0 12px}
        .az-announcement-text{font-size:13px}
        .header{position:sticky!important;top:0!important;display:grid!important;grid-template-columns:46px 1fr 46px!important;align-items:center!important;column-gap:12px!important;min-height:76px!important;padding:12px 5%!important}
        .header>.header-btn{display:none!important}
        .header .logo{grid-column:2!important;grid-row:1!important;justify-self:center!important;margin:0!important;text-align:center!important;font-size:clamp(2.1rem,8vw,2.85rem)!important;line-height:1!important}
        .header .language-switcher{grid-column:3!important;grid-row:1!important;justify-self:end!important;margin-left:0!important}
        .header .language-toggle{width:42px!important;height:42px!important}
        .mobile-menu-toggle{grid-column:1!important;grid-row:1!important;justify-self:start!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:4px!important;width:42px!important;height:42px!important;padding:0!important}
        .mobile-menu-toggle span,.mobile-menu-toggle::before,.mobile-menu-toggle::after{width:19px!important;height:2px!important;margin:0!important;flex:0 0 auto!important}
        .header .nav{top:100%!important}
      }
      @media(max-width:390px){
        .az-announcement-text{font-size:12px}
        .az-announcement-mark{width:20px;height:20px;font-size:10px}
        .header{grid-template-columns:42px 1fr 42px!important;column-gap:8px!important}
      }
      @media(prefers-reduced-motion:reduce){.az-announcement-text{transition:none}}
    `;
    document.head.appendChild(style);

    const bar=document.createElement('div');
    bar.className='az-announcement-bar';
    bar.setAttribute('role','region');
    bar.setAttribute('aria-label','AziBal business information');
    bar.innerHTML='<div class="az-announcement-inner"><span class="az-announcement-mark" aria-hidden="true">AZ</span><span class="az-announcement-text"></span></div>';
    header.parentNode.insertBefore(bar,header);

    const text=bar.querySelector('.az-announcement-text');
    let index=0;
    text.textContent=messages[index];

    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      setInterval(function(){
        text.classList.add('is-changing');
        setTimeout(function(){
          index=(index+1)%messages.length;
          text.textContent=messages[index];
          text.classList.remove('is-changing');
        },200);
      },3200);
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initHeaderPolish);
  else initHeaderPolish();
})();

(function(){
  const script=document.createElement('script');
  script.src='/js/ai-chat.js';
  script.async=true;
  document.head.appendChild(script);
})();
