document.addEventListener("DOMContentLoaded",function(){
  const main=document.querySelector("main"),header=document.querySelector(".header");
  if(main&&header&&!document.querySelector(".skip-link")){
    if(!main.id)main.id="main-content";
    const skip=document.createElement("a");
    skip.className="skip-link";
    skip.href="#"+main.id;
    skip.textContent="Skip to main content";
    document.body.insertBefore(skip,document.body.firstChild);
  }

  if(header&&!document.querySelector(".language-switcher")){
    const langStyle=document.createElement("style");
    langStyle.textContent=`
      .language-switcher{position:relative;flex:0 0 auto}
      .language-toggle{width:46px;height:46px;border-radius:50%;border:1px solid #d9dee7;background:#fff;color:#0b1f3a;display:flex;align-items:center;justify-content:center;gap:2px;cursor:pointer;font:800 11px/1 Inter,Arial,sans-serif;box-shadow:0 5px 16px rgba(15,31,58,.06);transition:border-color .2s ease,box-shadow .2s ease,transform .2s ease}
      .language-toggle:hover{border-color:#c89b3c;box-shadow:0 8px 20px rgba(15,31,58,.1);transform:translateY(-1px)}
      .language-toggle:focus-visible{outline:3px solid rgba(200,155,60,.35);outline-offset:3px}
      .language-icon{font-size:16px;line-height:1}.language-code{font-size:10px;letter-spacing:.2px}
      .language-menu{position:absolute;right:0;top:55px;z-index:2200;min-width:158px;padding:7px;background:#fff;border:1px solid #e1e6ee;border-radius:12px;box-shadow:0 16px 38px rgba(7,21,43,.16);display:none}
      .language-switcher.is-open .language-menu{display:block}
      .language-menu button{width:100%;border:0;background:transparent;color:#25324a;text-align:left;padding:10px 11px;border-radius:8px;font:700 13px/1.2 Inter,Arial,sans-serif;cursor:pointer}
      .language-menu button:hover,.language-menu button:focus-visible{background:#f5f7fa;color:#9b7425;outline:none}
      .language-menu button.is-active{background:#f7f1e5;color:#8a651c}
      @media(max-width:1100px){.language-toggle{width:42px;height:42px}.language-menu{top:50px}}
      @media(max-width:780px){.language-switcher{margin-left:auto}.language-toggle{width:40px;height:40px}.language-menu{right:0;top:47px}}
    `;
    document.head.appendChild(langStyle);
    const wrap=document.createElement("div");wrap.className="language-switcher";
    const toggle=document.createElement("button");toggle.type="button";toggle.className="language-toggle";toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Choose website language");
    toggle.innerHTML='<span class="language-icon" aria-hidden="true">🌐</span><span class="language-code">EN</span>';
    const menu=document.createElement("div");menu.className="language-menu";menu.setAttribute("role","menu");
    const languages=[['en','English'],['nl','Nederlands'],['de','Deutsch']];
    const saved=localStorage.getItem('azibal-language')||'en';
    languages.forEach(([code,label])=>{const b=document.createElement('button');b.type='button';b.dataset.lang=code;b.textContent=label;b.setAttribute('role','menuitem');if(code===saved)b.classList.add('is-active');b.addEventListener('click',()=>{localStorage.setItem('azibal-language',code);toggle.querySelector('.language-code').textContent=code.toUpperCase();menu.querySelectorAll('button').forEach(x=>x.classList.toggle('is-active',x===b));wrap.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');if(code!=='en'){const msg=code==='nl'?'De Nederlandse versie wordt toegevoegd. De Engelse inhoud blijft voorlopig zichtbaar.':'Die deutsche Version wird hinzugefügt. Die englischen Inhalte bleiben vorerst sichtbar.';window.alert(msg);}});menu.appendChild(b)});
    toggle.querySelector('.language-code').textContent=saved.toUpperCase();
    toggle.addEventListener('click',e=>{e.stopPropagation();const open=wrap.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));});
    document.addEventListener('click',e=>{if(!wrap.contains(e.target)){wrap.classList.remove('is-open');toggle.setAttribute('aria-expanded','false')}});
    wrap.append(toggle,menu);
    const cta=header.querySelector('.header-btn');header.insertBefore(wrap,cta||null);
  }

  if(document.getElementById("azibal-chat-launcher")) return;

  const style=document.createElement("style");
  style.textContent=`
    .az-chat-launcher{position:fixed;right:22px;bottom:22px;z-index:3000;border:0;border-radius:999px;background:#0b1f3a;color:#fff;box-shadow:0 12px 30px rgba(7,21,43,.28);padding:13px 18px;display:flex;align-items:center;gap:9px;font:700 14px/1.2 Inter,Arial,sans-serif;cursor:pointer}
    .az-chat-launcher:hover{transform:translateY(-1px)}
    .az-chat-dot{width:10px;height:10px;border-radius:50%;background:#d6b260;box-shadow:0 0 0 4px rgba(214,178,96,.18)}
    .az-chat-panel{position:fixed;right:22px;bottom:82px;width:min(380px,calc(100vw - 28px));height:min(570px,calc(100vh - 120px));z-index:3001;background:#fff;border:1px solid #e2e7ee;border-radius:18px;box-shadow:0 22px 55px rgba(7,21,43,.25);overflow:hidden;display:none;flex-direction:column;font-family:Inter,Arial,sans-serif}
    .az-chat-panel.is-open{display:flex}
    .az-chat-head{padding:16px 18px;background:#0b1f3a;color:#fff;display:flex;align-items:center;gap:12px}
    .az-chat-badge{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;background:#c89b3c;color:#fff;font-weight:800}
    .az-chat-title{font-weight:800;font-size:16px;line-height:1.2}.az-chat-sub{font-size:12px;color:#cbd4df;margin-top:3px}
    .az-chat-close{margin-left:auto;border:0;background:transparent;color:#fff;font-size:24px;line-height:1;cursor:pointer;padding:4px 7px;border-radius:6px}
    .az-chat-close:focus-visible,.az-chat-launcher:focus-visible,.az-chat-chip:focus-visible,.az-chat-send:focus-visible,.az-chat-input:focus-visible{outline:3px solid rgba(200,155,60,.45);outline-offset:2px}
    .az-chat-messages{flex:1;overflow:auto;padding:16px;background:#f7f8fa;display:flex;flex-direction:column;gap:10px}
    .az-msg{max-width:86%;padding:10px 12px;border-radius:13px;font-size:14px;line-height:1.5;white-space:pre-wrap}
    .az-msg.bot{align-self:flex-start;background:#fff;border:1px solid #e3e7ed;color:#25324a;border-bottom-left-radius:5px}
    .az-msg.user{align-self:flex-end;background:#0b1f3a;color:#fff;border-bottom-right-radius:5px}
    .az-chat-links{display:flex;flex-wrap:wrap;gap:7px;margin-top:8px}
    .az-chat-link{display:inline-block;text-decoration:none;background:#eef2f6;color:#0b1f3a;border:1px solid #dce2e9;border-radius:999px;padding:6px 9px;font-size:12px;font-weight:700}
    .az-chat-quick{padding:10px 12px;border-top:1px solid #e8ebf0;background:#fff;display:flex;gap:7px;overflow-x:auto;scrollbar-width:thin}
    .az-chat-chip{flex:0 0 auto;border:1px solid #d8dee7;background:#fff;color:#25324a;border-radius:999px;padding:7px 10px;font:700 12px/1.2 Inter,Arial,sans-serif;cursor:pointer}
    .az-chat-chip:hover{border-color:#c89b3c;color:#8a651c}
    .az-chat-form{display:flex;gap:8px;padding:11px 12px 13px;border-top:1px solid #e8ebf0;background:#fff}
    .az-chat-input{flex:1;min-width:0;border:1px solid #d7dce5;border-radius:10px;padding:11px 12px;font:14px Inter,Arial,sans-serif;color:#172033}
    .az-chat-send{border:0;border-radius:10px;background:#c89b3c;color:#fff;padding:0 14px;font-weight:800;cursor:pointer}
    .az-chat-note{font-size:11px;color:#7b8494;text-align:center;padding:0 12px 10px;background:#fff}
    @media(max-width:520px){.az-chat-launcher{right:14px;bottom:14px}.az-chat-panel{right:14px;bottom:72px;width:calc(100vw - 28px);height:min(610px,calc(100vh - 92px));border-radius:15px}}
  `;
  document.head.appendChild(style);

  function el(tag,className,text){const n=document.createElement(tag);if(className)n.className=className;if(text!==undefined)n.textContent=text;return n}
  const launcher=el("button","az-chat-launcher");launcher.id="azibal-chat-launcher";launcher.type="button";launcher.setAttribute("aria-expanded","false");launcher.setAttribute("aria-controls","azibal-chat-panel");launcher.setAttribute("aria-label","Open AziBal Assistant");launcher.appendChild(el("span","az-chat-dot"));launcher.appendChild(el("span","","Chat with AziBal"));
  const panel=el("section","az-chat-panel");panel.id="azibal-chat-panel";panel.setAttribute("aria-label","AziBal Assistant");
  const head=el("div","az-chat-head");head.appendChild(el("div","az-chat-badge","A"));const headText=el("div");headText.appendChild(el("div","az-chat-title","AziBal Assistant"));headText.appendChild(el("div","az-chat-sub","Wholesale & partnership help"));head.appendChild(headText);const close=el("button","az-chat-close","×");close.type="button";close.setAttribute("aria-label","Close chat");head.appendChild(close);
  const messages=el("div","az-chat-messages");messages.setAttribute("aria-live","polite");const quick=el("div","az-chat-quick");const form=el("form","az-chat-form");const input=el("input","az-chat-input");input.type="text";input.placeholder="Ask about wholesale, brands, products…";input.setAttribute("aria-label","Message AziBal Assistant");input.autocomplete="off";const send=el("button","az-chat-send","Send");send.type="submit";form.append(input,send);const note=el("div","az-chat-note","Automated website assistant · For commercial decisions, contact AziBal directly.");panel.append(head,messages,quick,form,note);document.body.append(launcher,panel);
  function addLinks(container,links){if(!links||!links.length)return;const wrap=el("div","az-chat-links");links.forEach(item=>{const a=el("a","az-chat-link",item.label);a.href=item.href;wrap.appendChild(a)});container.appendChild(wrap)}
  function bot(text,links){const m=el("div","az-msg bot",text);addLinks(m,links);messages.appendChild(m);messages.scrollTop=messages.scrollHeight}
  function user(text){messages.appendChild(el("div","az-msg user",text));messages.scrollTop=messages.scrollHeight}
  const answers={buyer:{text:"If you want to buy wholesale, send your company details, country, products/categories of interest, intended sales channels and expected order level. AziBal reviews enquiries based on commercial fit and availability.",links:[{label:"Start buyer enquiry",href:"partner-form.html"},{label:"View categories",href:"products.html"}]},supplier:{text:"AziBal welcomes enquiries from legitimate suppliers and distributors with clear product sourcing and commercial documentation. Useful details include your catalogue, wholesale pricing, MOQ, lead times, territories and sales-channel rules.",links:[{label:"For Suppliers",href:"for-suppliers.html"},{label:"Submit enquiry",href:"partner-form.html"}]},brand:{text:"Brands and manufacturers can introduce their range for a potential wholesale relationship. AziBal respects written territory, marketplace, pricing and distribution requirements.",links:[{label:"For Brands",href:"partner.html"},{label:"Submit enquiry",href:"partner-form.html"}]},products:{text:"AziBal sources and evaluates Home & Living, Kitchen & Household, Electronics & Accessories, Beauty & Personal Care, Pet Supplies, Health & Personal Care, Baby & Family, Office & Stationery, Sports & Outdoor, Toys/Games/Lifestyle, Seasonal Products and other suitable opportunities.",links:[{label:"Explore products",href:"products.html"}]},marketplace:{text:"Marketplace sales depend on each brand or supplier's written policy and agreed commercial terms. AziBal does not assume permission to sell on Amazon, bol.com or other marketplaces without supplier approval.",links:[{label:"Partnership approach",href:"for-suppliers.html"}]},moq:{text:"MOQ and order requirements vary by supplier and product range. They are reviewed during the commercial discussion rather than being fixed across all AziBal opportunities.",links:[{label:"Business enquiry",href:"partner-form.html"}]},contact:{text:"You can contact AziBal at info@azibal.com or +31 6 848 19466. Business address: Torenmolen 8, 1444 GE Purmerend, Noord-Holland, Netherlands.",links:[{label:"Contact page",href:"contact.html"},{label:"Email AziBal",href:"mailto:info@azibal.com"}]},registration:{text:"AziBal's company registration is being completed. Official registration details will be added to the website when issued and verified.",links:[{label:"Company information",href:"about.html"}]},pricing:{text:"Wholesale pricing, availability, payment terms and delivery conditions depend on the specific supplier, products and agreement. Please send a business enquiry with the products or categories you are interested in.",links:[{label:"Business enquiry",href:"partner-form.html"}]},default:{text:"I can help with AziBal's product categories, wholesale buying, supplier introductions, brand partnerships, marketplace policy, MOQ, company information and contact details. For a specific commercial request, please use the business enquiry form.",links:[{label:"Business enquiry",href:"partner-form.html"},{label:"Contact AziBal",href:"contact.html"}]}};
  function respond(raw){const q=raw.toLowerCase();if(/buy|buyer|purchase|wholesale account|order products/.test(q))return answers.buyer;if(/supplier|distributor|supply|catalog|catalogue/.test(q))return answers.supplier;if(/brand|manufacturer|partnership|partner/.test(q))return answers.brand;if(/product|categor|what do you sell|what you sell|range/.test(q))return answers.products;if(/amazon|bol\.com|marketplace|kaufland|sales channel/.test(q))return answers.marketplace;if(/moq|minimum order|minimum quantity/.test(q))return answers.moq;if(/contact|email|phone|address|location|where are you/.test(q))return answers.contact;if(/kvk|vat|register|registration|company number/.test(q))return answers.registration;if(/price|pricing|cost|payment|delivery|shipping|stock|availability/.test(q))return answers.pricing;return answers.default}
  [["Buy wholesale","buyer"],["I'm a supplier","supplier"],["I represent a brand","brand"],["Product categories","products"],["Contact AziBal","contact"]].forEach(([label,key])=>{const b=el("button","az-chat-chip",label);b.type="button";b.addEventListener("click",()=>{user(label);const a=answers[key];setTimeout(()=>bot(a.text,a.links),120)});quick.appendChild(b)});
  function openChat(){panel.classList.add("is-open");launcher.setAttribute("aria-expanded","true");input.focus()}function closeChat(){panel.classList.remove("is-open");launcher.setAttribute("aria-expanded","false");launcher.focus()}launcher.addEventListener("click",()=>panel.classList.contains("is-open")?closeChat():openChat());close.addEventListener("click",closeChat);document.addEventListener("keydown",e=>{if(e.key==="Escape"&&panel.classList.contains("is-open"))closeChat()});form.addEventListener("submit",e=>{e.preventDefault();const text=input.value.trim();if(!text)return;user(text);input.value="";const a=respond(text);setTimeout(()=>bot(a.text,a.links),160)});bot("Hello! I'm the AziBal website assistant. I can help with wholesale buying, supplier or brand partnerships, product categories and contact information.");
});
(function(){const script=document.createElement('script');script.src='js/newsletter.js';script.async=true;document.head.appendChild(script)})();