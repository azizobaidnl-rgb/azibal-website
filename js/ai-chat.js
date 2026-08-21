(function(){
  function init(){
    const oldLauncher=document.getElementById('azibal-chat-launcher');
    const oldPanel=document.querySelector('.az-chat-panel');
    if(oldLauncher) oldLauncher.remove();
    if(oldPanel) oldPanel.remove();
    if(document.getElementById('azibal-ai-launcher')) return;

    const path=window.location.pathname;
    const lang=path.startsWith('/nl/')?'nl':path.startsWith('/de/')?'de':'en';
    const copy={
      en:{
        chat:'Chat',title:'AziBal Assistant',status:'Private · on this website',
        intro:'Hi. I can answer common questions about AziBal, wholesale sourcing, suppliers, brands, product categories and business enquiries.',
        placeholder:'Ask about AziBal…',send:'Send',note:'Private website assistant · Your message is not sent to an external AI service.',
        enquiry:'Business Enquiry',contact:'Contact',close:'Close chat',
        chips:['What is AziBal?','Products','For suppliers','Contact'],
        answers:{
          greeting:'Hello! How can I help with AziBal today?',
          about:'AziBal is a Netherlands-based B2B wholesale sourcing and brand-partnership business. We develop professional relationships with brands, manufacturers, suppliers, retailers and e-commerce businesses serving European markets.',
          products:'AziBal evaluates opportunities across Home & Living, Kitchen & Household, Electronics & Accessories, Beauty & Personal Care, Pet Supplies, Health & Personal Care, Baby & Family, Office & Stationery, Sports & Outdoor, Toys, Games & Lifestyle, Seasonal Products, and other suitable consumer ranges. These categories do not imply current stock or authorisation for every brand.',
          suppliers:'Suppliers and manufacturers can introduce their company, product range, wholesale programme, pricing structure and distribution requirements through the Business Enquiry form.',
          brands:'AziBal works with suitable brands on professional wholesale and distribution opportunities. Use the Business Enquiry form to introduce your brand, product range and commercial requirements.',
          contact:'You can contact AziBal at info@azibal.com or +31 6 848 19466. Address: Torenmolen 8, 1444 GE Purmerend, Noord-Holland, Netherlands.',
          kvk:'AziBal is registered with the Dutch Chamber of Commerce (KVK). KVK number: 42143577.',
          market:'AziBal is based in the Netherlands and focuses on B2B wholesale sourcing and commercial opportunities serving European markets.',
          importExport:'AziBal is active in import, export and online retail in a broad sense, with a focus on lawful B2B wholesale sourcing and partnerships.',
          commercial:'Prices, minimum order quantities, stock, delivery times, discounts and commercial terms depend on the specific opportunity and are not published in the assistant. Please use Business Enquiry for a quotation or commercial discussion.',
          delivery:'Shipping, delivery areas and lead times depend on the specific product, supplier and commercial arrangement. Please submit a Business Enquiry for confirmed information.',
          vat:'For VAT or invoice details, please contact AziBal directly. The assistant does not provide or guess tax identifiers or tax advice.',
          privacy:'This website assistant runs locally in your browser and does not send your chat message to an external AI service. Please still avoid sharing passwords, payment-card details or other sensitive information.',
          thanks:'You’re welcome. If you need a quotation or partnership discussion, use the Business Enquiry button below.',
          fallback:'I can help with AziBal, product categories, suppliers, brands, contact details, KVK information, sourcing and business enquiries. For a specific quotation, stock question or commercial decision, please use Business Enquiry or email info@azibal.com.'
        }
      },
      nl:{
        chat:'Chat',title:'AziBal Assistent',status:'Privé · op deze website',
        intro:'Hallo. Ik kan veelgestelde vragen beantwoorden over AziBal, groothandel, sourcing, leveranciers, merken, productcategorieën en zakelijke aanvragen.',
        placeholder:'Vraag iets over AziBal…',send:'Verstuur',note:'Privé website-assistent · Je bericht wordt niet naar een externe AI-dienst gestuurd.',
        enquiry:'Zakelijke aanvraag',contact:'Contact',close:'Chat sluiten',
        chips:['Wat is AziBal?','Producten','Voor leveranciers','Contact'],
        answers:{
          greeting:'Hallo! Waarmee kan ik je vandaag helpen over AziBal?',
          about:'AziBal is een in Nederland gevestigd B2B-bedrijf voor groothandelssourcing en merkpartnerschappen. We ontwikkelen professionele relaties met merken, fabrikanten, leveranciers, retailers en e-commercebedrijven die Europese markten bedienen.',
          products:'AziBal beoordeelt mogelijkheden binnen Wonen, Keuken & Huishouden, Elektronica & Accessoires, Beauty & Persoonlijke Verzorging, Dierenbenodigdheden, Gezondheid & Persoonlijke Verzorging, Baby & Gezin, Kantoor & Stationery, Sport & Outdoor, Speelgoed, Games & Lifestyle, Seizoensproducten en andere geschikte consumentenproducten. Deze categorieën betekenen niet dat elk product of merk op voorraad of geautoriseerd is.',
          suppliers:'Leveranciers en fabrikanten kunnen hun bedrijf, assortiment, groothandelsprogramma, prijsstructuur en distributievoorwaarden voorstellen via het formulier Zakelijke aanvraag.',
          brands:'AziBal werkt met geschikte merken aan professionele groothandels- en distributiemogelijkheden. Gebruik het formulier Zakelijke aanvraag om je merk, assortiment en commerciële voorwaarden voor te stellen.',
          contact:'Je kunt AziBal bereiken via info@azibal.com of +31 6 848 19466. Adres: Torenmolen 8, 1444 GE Purmerend, Noord-Holland, Nederland.',
          kvk:'AziBal staat ingeschreven bij de Kamer van Koophandel. KVK-nummer: 42143577.',
          market:'AziBal is gevestigd in Nederland en richt zich op B2B-groothandelssourcing en commerciële mogelijkheden voor Europese markten.',
          importExport:'AziBal is actief in import, export en online detailhandel in brede zin, met focus op rechtmatige B2B-groothandelssourcing en partnerschappen.',
          commercial:'Prijzen, minimale bestelhoeveelheden, voorraad, levertijden, kortingen en commerciële voorwaarden hangen af van de specifieke mogelijkheid en worden niet door deze assistent bevestigd. Gebruik Zakelijke aanvraag voor een offerte of commercieel gesprek.',
          delivery:'Verzending, leveringsgebieden en levertijden hangen af van het specifieke product, de leverancier en de commerciële afspraak. Dien een Zakelijke aanvraag in voor bevestigde informatie.',
          vat:'Neem voor btw- of factuurgegevens rechtstreeks contact op met AziBal. De assistent verstrekt of raadt geen belastingnummers en geeft geen belastingadvies.',
          privacy:'Deze website-assistent werkt lokaal in je browser en stuurt je chatbericht niet naar een externe AI-dienst. Deel toch geen wachtwoorden, betaalkaartgegevens of andere gevoelige informatie.',
          thanks:'Graag gedaan. Voor een offerte of partnerschap kun je de knop Zakelijke aanvraag hieronder gebruiken.',
          fallback:'Ik kan helpen met AziBal, productcategorieën, leveranciers, merken, contactgegevens, KVK-informatie, sourcing en zakelijke aanvragen. Voor een specifieke offerte, voorraadsvraag of commerciële beslissing kun je Zakelijke aanvraag gebruiken of mailen naar info@azibal.com.'
        }
      },
      de:{
        chat:'Chat',title:'AziBal Assistent',status:'Privat · auf dieser Website',
        intro:'Hallo. Ich kann häufige Fragen zu AziBal, Großhandel, Sourcing, Lieferanten, Marken, Produktkategorien und Geschäftsanfragen beantworten.',
        placeholder:'Frage zu AziBal…',send:'Senden',note:'Privater Website-Assistent · Ihre Nachricht wird nicht an einen externen KI-Dienst gesendet.',
        enquiry:'Geschäftsanfrage',contact:'Kontakt',close:'Chat schließen',
        chips:['Was ist AziBal?','Produkte','Für Lieferanten','Kontakt'],
        answers:{
          greeting:'Hallo! Wie kann ich heute bei Fragen zu AziBal helfen?',
          about:'AziBal ist ein in den Niederlanden ansässiges B2B-Unternehmen für Großhandels-Sourcing und Markenpartnerschaften. Wir entwickeln professionelle Beziehungen zu Marken, Herstellern, Lieferanten, Einzelhändlern und E-Commerce-Unternehmen für europäische Märkte.',
          products:'AziBal prüft Möglichkeiten in den Bereichen Wohnen, Küche & Haushalt, Elektronik & Zubehör, Beauty & Körperpflege, Tierbedarf, Gesundheit & Körperpflege, Baby & Familie, Büro & Schreibwaren, Sport & Outdoor, Spielzeug, Games & Lifestyle, Saisonprodukte sowie weitere geeignete Konsumgüter. Diese Kategorien bedeuten nicht, dass jedes Produkt oder jede Marke aktuell verfügbar oder autorisiert ist.',
          suppliers:'Lieferanten und Hersteller können ihr Unternehmen, Sortiment, Großhandelsprogramm, ihre Preisstruktur und Vertriebsanforderungen über das Formular Geschäftsanfrage vorstellen.',
          brands:'AziBal arbeitet mit geeigneten Marken an professionellen Großhandels- und Vertriebsmöglichkeiten. Nutzen Sie die Geschäftsanfrage, um Ihre Marke, Ihr Sortiment und Ihre kommerziellen Anforderungen vorzustellen.',
          contact:'Sie erreichen AziBal unter info@azibal.com oder +31 6 848 19466. Adresse: Torenmolen 8, 1444 GE Purmerend, Noord-Holland, Niederlande.',
          kvk:'AziBal ist bei der niederländischen Handelskammer registriert. KVK-Nummer: 42143577.',
          market:'AziBal hat seinen Sitz in den Niederlanden und konzentriert sich auf B2B-Großhandels-Sourcing und kommerzielle Möglichkeiten für europäische Märkte.',
          importExport:'AziBal ist im Import, Export und Online-Einzelhandel im weiteren Sinne tätig, mit Schwerpunkt auf rechtmäßigem B2B-Großhandels-Sourcing und Partnerschaften.',
          commercial:'Preise, Mindestbestellmengen, Lagerbestand, Lieferzeiten, Rabatte und kommerzielle Bedingungen hängen von der jeweiligen Möglichkeit ab und werden vom Assistenten nicht bestätigt. Nutzen Sie die Geschäftsanfrage für ein Angebot oder ein kommerzielles Gespräch.',
          delivery:'Versand, Liefergebiete und Lieferzeiten hängen vom Produkt, Lieferanten und der jeweiligen Geschäftsvereinbarung ab. Nutzen Sie die Geschäftsanfrage für bestätigte Informationen.',
          vat:'Für Umsatzsteuer- oder Rechnungsangaben kontaktieren Sie AziBal bitte direkt. Der Assistent nennt oder errät keine Steuerkennzeichen und gibt keine Steuerberatung.',
          privacy:'Dieser Website-Assistent läuft lokal in Ihrem Browser und sendet Ihre Chatnachricht nicht an einen externen KI-Dienst. Bitte teilen Sie trotzdem keine Passwörter, Zahlungskartendaten oder andere sensible Informationen.',
          thanks:'Gern. Für ein Angebot oder eine Partnerschaft nutzen Sie bitte die Schaltfläche Geschäftsanfrage unten.',
          fallback:'Ich kann bei Fragen zu AziBal, Produktkategorien, Lieferanten, Marken, Kontaktdaten, KVK-Informationen, Sourcing und Geschäftsanfragen helfen. Für ein konkretes Angebot, Lagerbestände oder kommerzielle Entscheidungen nutzen Sie bitte die Geschäftsanfrage oder schreiben Sie an info@azibal.com.'
        }
      }
    };
    const t=copy[lang];

    const style=document.createElement('style');
    style.textContent=`
      .az-ai-launcher{position:fixed;right:20px;bottom:20px;z-index:3100;border:0;border-radius:999px;background:#0b1f3a;color:#fff;box-shadow:0 12px 30px rgba(7,21,43,.26);padding:12px 17px;font:800 14px Inter,Arial,sans-serif;cursor:pointer}.az-ai-launcher:hover{filter:brightness(1.08)}.az-ai-launcher:focus-visible{outline:3px solid rgba(200,155,60,.5);outline-offset:3px}
      .az-ai-panel{position:fixed;right:20px;bottom:76px;width:min(380px,calc(100vw - 24px));height:min(560px,calc(100vh - 110px));z-index:3101;background:#fff;border:1px solid #e2e7ee;border-radius:18px;box-shadow:0 22px 55px rgba(7,21,43,.25);display:none;overflow:hidden;font-family:Inter,Arial,sans-serif}.az-ai-panel.is-open{display:flex;flex-direction:column}
      .az-ai-head{display:flex;align-items:center;gap:10px;padding:15px 16px;background:#0b1f3a;color:#fff}.az-ai-head-copy{min-width:0;flex:1}.az-ai-head strong{display:block;font-size:15px}.az-ai-head small{display:block;color:#cbd5e1;font-size:11px;margin-top:1px}.az-ai-dot{width:8px;height:8px;border-radius:50%;background:#d6b260;flex:0 0 auto}.az-ai-close{border:0;background:transparent;color:#fff;font-size:25px;line-height:1;cursor:pointer;padding:2px 5px}
      .az-ai-messages{flex:1;overflow-y:auto;padding:15px;background:#f7f8fa;display:flex;flex-direction:column;gap:10px}.az-ai-bubble{max-width:86%;padding:10px 12px;border-radius:13px;font-size:13px;line-height:1.5;white-space:pre-wrap;overflow-wrap:anywhere}.az-ai-bubble.assistant{align-self:flex-start;background:#fff;border:1px solid #e3e8ef;color:#344054;border-bottom-left-radius:4px}.az-ai-bubble.user{align-self:flex-end;background:#0b1f3a;color:#fff;border-bottom-right-radius:4px}
      .az-ai-chips{padding:0 15px 9px;background:#f7f8fa;display:flex;gap:7px;overflow-x:auto}.az-ai-chip{border:1px solid #dbe2eb;background:#fff;color:#0b1f3a;border-radius:999px;padding:7px 10px;font:700 11px Inter,Arial,sans-serif;white-space:nowrap;cursor:pointer}.az-ai-chip:hover{border-color:#c89b3c}
      .az-ai-quick{padding:0 15px 10px;background:#f7f8fa;display:flex;gap:7px;flex-wrap:wrap}.az-ai-quick a{font-size:11px;font-weight:700;text-decoration:none;color:#0b1f3a;background:#fff;border:1px solid #dbe2eb;border-radius:999px;padding:6px 9px}
      .az-ai-form{display:flex;gap:8px;padding:12px;border-top:1px solid #e6e9ef;background:#fff}.az-ai-input{flex:1;min-width:0;border:1px solid #d7dce5;border-radius:10px;padding:10px 11px;font:13px Inter,Arial,sans-serif;outline:none}.az-ai-input:focus{border-color:#c89b3c;box-shadow:0 0 0 3px rgba(200,155,60,.14)}.az-ai-send{border:0;border-radius:10px;background:#c89b3c;color:#fff;padding:0 13px;font:800 12px Inter,Arial,sans-serif;cursor:pointer}.az-ai-note{padding:0 13px 11px;color:#7b8494;background:#fff;font-size:10px;line-height:1.4}
      @media(max-width:520px){.az-ai-launcher{right:12px;bottom:14px;padding:11px 15px}.az-ai-panel{right:12px;bottom:66px;width:calc(100vw - 24px);height:min(540px,calc(100vh - 92px));border-radius:16px}}
    `;
    document.head.appendChild(style);

    const launcher=document.createElement('button');
    launcher.id='azibal-ai-launcher';launcher.className='az-ai-launcher';launcher.type='button';launcher.textContent=t.chat;launcher.setAttribute('aria-expanded','false');launcher.setAttribute('aria-controls','azibal-ai-panel');
    const panel=document.createElement('section');
    panel.id='azibal-ai-panel';panel.className='az-ai-panel';panel.setAttribute('aria-label',t.title);
    const base=lang==='en'?'':'/'+lang;
    panel.innerHTML=`<div class="az-ai-head"><span class="az-ai-dot" aria-hidden="true"></span><div class="az-ai-head-copy"><strong>${t.title}</strong><small>${t.status}</small></div><button class="az-ai-close" type="button" aria-label="${t.close}">×</button></div><div class="az-ai-messages" role="log" aria-live="polite"></div><div class="az-ai-chips"></div><div class="az-ai-quick"><a href="${base}/partner-form.html">${t.enquiry}</a><a href="${base}/contact.html">${t.contact}</a></div><form class="az-ai-form"><input class="az-ai-input" maxlength="1000" autocomplete="off" placeholder="${t.placeholder}" aria-label="${t.placeholder}"><button class="az-ai-send" type="submit">${t.send}</button></form><div class="az-ai-note">${t.note}</div>`;
    document.body.append(launcher,panel);

    const messages=panel.querySelector('.az-ai-messages');
    const chips=panel.querySelector('.az-ai-chips');
    const form=panel.querySelector('.az-ai-form');
    const input=panel.querySelector('.az-ai-input');
    const close=panel.querySelector('.az-ai-close');

    function add(role,text){
      const bubble=document.createElement('div');
      bubble.className='az-ai-bubble '+role;
      bubble.textContent=text;
      messages.appendChild(bubble);
      messages.scrollTop=messages.scrollHeight;
    }

    function open(value){
      panel.classList.toggle('is-open',value);
      launcher.setAttribute('aria-expanded',String(value));
      if(value)setTimeout(()=>input.focus({preventScroll:true}),80);
    }

    function normalize(value){
      return String(value||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9äöüß\s&+-]/gi,' ').replace(/\s+/g,' ').trim();
    }

    function has(q,terms){return terms.some(term=>q.includes(term));}

    function answer(raw){
      const q=normalize(raw);
      const a=t.answers;
      if(!q)return a.fallback;

      if(has(q,['hello','hi','hey','good morning','good afternoon','hallo','hoi','goedemorgen','goedenavond','guten morgen','guten tag'])) return a.greeting;
      if(has(q,['thank','thanks','thank you','bedankt','dank je','danke','vielen dank'])) return a.thanks;
      if(has(q,['privacy','private','data','gegevens','datenschutz','daten','safe','veilig','sicher'])) return a.privacy;
      if(has(q,['kvk','chamber of commerce','kamer van koophandel','handelskammer','registration number'])) return a.kvk;
      if(has(q,['vat','btw','tax number','umsatzsteuer','mwst','steuer'])) return a.vat;
      if(has(q,['contact','email','e-mail','phone','telephone','telefoon','address','adres','kontakt','telefon','adresse'])) return a.contact;
      if(has(q,['delivery','shipping','ship','lead time','levertijd','verzending','liefer','versand'])) return a.delivery;
      if(has(q,['price','pricing','quote','quotation','cost','discount','moq','minimum order','stock','order','prijs','offerte','korting','voorraad','bestellen','mindestbestell','preis','angebot','rabatt','lagerbestand','bestellung'])) return a.commercial;
      if(has(q,['supplier','suppliers','manufacturer','manufacturers','leverancier','leveranciers','fabrikant','lieferant','lieferanten','hersteller'])) return a.suppliers;
      if(has(q,['brand','brands','merk','merken','marke','marken'])) return a.brands;
      if(has(q,['product','products','category','categories','assortment','range','producten','categorie','categorieen','assortiment','produkt','produkte','kategorie','sortiment'])) return a.products;
      if(has(q,['import','export','importeren','exporteren','einfuhr','ausfuhr'])) return a.importExport;
      if(has(q,['europe','european','netherlands','nederland','market','markets','europa','niederlande','markt'])) return a.market;
      if(has(q,['what is azibal','who is azibal','about azibal','what does azibal','wat is azibal','wie is azibal','was ist azibal','wer ist azibal','uber azibal','over azibal','azibal'])) return a.about;
      return a.fallback;
    }

    function submitMessage(text){
      const message=String(text||'').trim();
      if(!message)return;
      add('user',message);
      input.value='';
      window.setTimeout(()=>add('assistant',answer(message)),120);
    }

    add('assistant',t.intro);
    t.chips.forEach(label=>{
      const button=document.createElement('button');
      button.type='button';button.className='az-ai-chip';button.textContent=label;
      button.addEventListener('click',()=>submitMessage(label));
      chips.appendChild(button);
    });

    launcher.addEventListener('click',()=>open(!panel.classList.contains('is-open')));
    close.addEventListener('click',()=>open(false));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.classList.contains('is-open'))open(false)});
    form.addEventListener('submit',e=>{e.preventDefault();submitMessage(input.value);input.focus({preventScroll:true});});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
