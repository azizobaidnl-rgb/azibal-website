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
