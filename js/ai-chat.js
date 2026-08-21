(function(){
  function init(){
    const oldLauncher=document.getElementById('azibal-chat-launcher');
    const oldPanel=document.querySelector('.az-chat-panel');
    if(oldLauncher) oldLauncher.remove();
    if(oldPanel) oldPanel.remove();
    if(document.getElementById('azibal-ai-launcher')) return;

    const path=window.location.pathname;
    const lang=path.startsWith('/nl/')?'nl':path.startsWith('/de/')?'de':'en';
    const t={
      en:{chat:'Chat',title:'AziBal AI Assistant',intro:'Hi. I can help with AziBal, wholesale sourcing, suppliers, brands and business enquiries.',placeholder:'Ask about AziBal…',send:'Send',sending:'Thinking…',error:'The assistant is temporarily unavailable. Please try again.',note:'AI assistant · Please do not share sensitive information.',enquiry:'Business Enquiry',contact:'Contact',close:'Close chat'},
      nl:{chat:'Chat',title:'AziBal AI-assistent',intro:'Hallo. Ik kan helpen met AziBal, groothandel, sourcing, leveranciers, merken en zakelijke vragen.',placeholder:'Vraag iets over AziBal…',send:'Verstuur',sending:'Even denken…',error:'De assistent is tijdelijk niet beschikbaar. Probeer het opnieuw.',note:'AI-assistent · Deel geen gevoelige informatie.',enquiry:'Zakelijke aanvraag',contact:'Contact',close:'Chat sluiten'},
      de:{chat:'Chat',title:'AziBal KI-Assistent',intro:'Hallo. Ich helfe bei Fragen zu AziBal, Großhandel, Sourcing, Lieferanten, Marken und Geschäftsanfragen.',placeholder:'Frage zu AziBal…',send:'Senden',sending:'Denke nach…',error:'Der Assistent ist vorübergehend nicht verfügbar. Bitte erneut versuchen.',note:'KI-Assistent · Bitte keine sensiblen Daten teilen.',enquiry:'Geschäftsanfrage',contact:'Kontakt',close:'Chat schließen'}
    }[lang];

    const style=document.createElement('style');
    style.textContent=`
      .az-ai-launcher{position:fixed;right:20px;bottom:20px;z-index:3100;border:0;border-radius:999px;background:#0b1f3a;color:#fff;box-shadow:0 12px 30px rgba(7,21,43,.26);padding:12px 17px;font:800 14px Inter,Arial,sans-serif;cursor:pointer}.az-ai-launcher:hover{filter:brightness(1.08)}.az-ai-launcher:focus-visible{outline:3px solid rgba(200,155,60,.5);outline-offset:3px}
      .az-ai-panel{position:fixed;right:20px;bottom:76px;width:min(380px,calc(100vw - 24px));height:min(560px,calc(100vh - 110px));z-index:3101;background:#fff;border:1px solid #e2e7ee;border-radius:18px;box-shadow:0 22px 55px rgba(7,21,43,.25);display:none;overflow:hidden;font-family:Inter,Arial,sans-serif}.az-ai-panel.is-open{display:flex;flex-direction:column}
      .az-ai-head{display:flex;align-items:center;gap:10px;padding:15px 16px;background:#0b1f3a;color:#fff}.az-ai-head-copy{min-width:0;flex:1}.az-ai-head strong{display:block;font-size:15px}.az-ai-head small{display:block;color:#cbd5e1;font-size:11px;margin-top:1px}.az-ai-dot{width:8px;height:8px;border-radius:50%;background:#d6b260;flex:0 0 auto}.az-ai-close{border:0;background:transparent;color:#fff;font-size:25px;line-height:1;cursor:pointer;padding:2px 5px}
      .az-ai-messages{flex:1;overflow-y:auto;padding:15px;background:#f7f8fa;display:flex;flex-direction:column;gap:10px}.az-ai-bubble{max-width:86%;padding:10px 12px;border-radius:13px;font-size:13px;line-height:1.5;white-space:pre-wrap;overflow-wrap:anywhere}.az-ai-bubble.assistant{align-self:flex-start;background:#fff;border:1px solid #e3e8ef;color:#344054;border-bottom-left-radius:4px}.az-ai-bubble.user{align-self:flex-end;background:#0b1f3a;color:#fff;border-bottom-right-radius:4px}.az-ai-bubble.error{align-self:flex-start;background:#fff6f6;border:1px solid #f1caca;color:#8b3434}
      .az-ai-quick{padding:0 15px 10px;background:#f7f8fa;display:flex;gap:7px;flex-wrap:wrap}.az-ai-quick a{font-size:11px;font-weight:700;text-decoration:none;color:#0b1f3a;background:#fff;border:1px solid #dbe2eb;border-radius:999px;padding:6px 9px}
      .az-ai-form{display:flex;gap:8px;padding:12px;border-top:1px solid #e6e9ef;background:#fff}.az-ai-input{flex:1;min-width:0;border:1px solid #d7dce5;border-radius:10px;padding:10px 11px;font:13px Inter,Arial,sans-serif;outline:none}.az-ai-input:focus{border-color:#c89b3c;box-shadow:0 0 0 3px rgba(200,155,60,.14)}.az-ai-send{border:0;border-radius:10px;background:#c89b3c;color:#fff;padding:0 13px;font:800 12px Inter,Arial,sans-serif;cursor:pointer}.az-ai-send:disabled{opacity:.6;cursor:wait}.az-ai-note{padding:0 13px 11px;color:#7b8494;background:#fff;font-size:10px;line-height:1.4}
      @media(max-width:520px){.az-ai-launcher{right:12px;bottom:14px;padding:11px 15px}.az-ai-panel{right:12px;bottom:66px;width:calc(100vw - 24px);height:min(540px,calc(100vh - 92px));border-radius:16px}}
    `;
    document.head.appendChild(style);

    const launcher=document.createElement('button');
    launcher.id='azibal-ai-launcher';launcher.className='az-ai-launcher';launcher.type='button';launcher.textContent=t.chat;launcher.setAttribute('aria-expanded','false');launcher.setAttribute('aria-controls','azibal-ai-panel');
    const panel=document.createElement('section');
    panel.id='azibal-ai-panel';panel.className='az-ai-panel';panel.setAttribute('aria-label',t.title);
    const base=lang==='en'?'':'/'+lang;
    panel.innerHTML=`<div class="az-ai-head"><span class="az-ai-dot" aria-hidden="true"></span><div class="az-ai-head-copy"><strong>${t.title}</strong><small>Online</small></div><button class="az-ai-close" type="button" aria-label="${t.close}">×</button></div><div class="az-ai-messages" role="log" aria-live="polite"></div><div class="az-ai-quick"><a href="${base}/partner-form.html">${t.enquiry}</a><a href="${base}/contact.html">${t.contact}</a></div><form class="az-ai-form"><input class="az-ai-input" maxlength="1000" autocomplete="off" placeholder="${t.placeholder}" aria-label="${t.placeholder}"><button class="az-ai-send" type="submit">${t.send}</button></form><div class="az-ai-note">${t.note}</div>`;
    document.body.append(launcher,panel);

    const messages=panel.querySelector('.az-ai-messages');const form=panel.querySelector('.az-ai-form');const input=panel.querySelector('.az-ai-input');const send=panel.querySelector('.az-ai-send');const close=panel.querySelector('.az-ai-close');const history=[];const endpoint='https://azibal-ai.vercel.app/api/chat';
    function add(role,text,error){const b=document.createElement('div');b.className='az-ai-bubble '+(error?'error':role);b.textContent=text;messages.appendChild(b);messages.scrollTop=messages.scrollHeight}
    function open(value){panel.classList.toggle('is-open',value);launcher.setAttribute('aria-expanded',String(value));if(value)setTimeout(()=>input.focus({preventScroll:true}),80)}
    add('assistant',t.intro,false);
    launcher.addEventListener('click',()=>open(!panel.classList.contains('is-open')));close.addEventListener('click',()=>open(false));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.classList.contains('is-open'))open(false)});
    form.addEventListener('submit',async e=>{e.preventDefault();const message=input.value.trim();if(!message||send.disabled)return;const previous=history.slice(-6);input.value='';add('user',message,false);history.push({role:'user',content:message});send.disabled=true;const old=send.textContent;send.textContent=t.sending;try{const r=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message,history:previous})});const data=await r.json().catch(()=>({}));if(!r.ok||!data.reply)throw new Error(data.error||'Chat request failed');add('assistant',data.reply,false);history.push({role:'assistant',content:data.reply});if(history.length>8)history.splice(0,history.length-8)}catch(err){add('assistant',t.error,true)}finally{send.disabled=false;send.textContent=old;input.focus({preventScroll:true})}});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
