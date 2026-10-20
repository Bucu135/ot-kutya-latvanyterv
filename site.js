/* Öt Kutya · látványterv — nyelv, élő nyitvatartás, napi menü, étlap, kockajáték, foglaló, motion */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = { get: k => { try { return localStorage.getItem(k); } catch { return null; } },
                  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} } };

  /* ---------- Nyitvatartás (0 = vasárnap) ---------- */
  const HOURS = [[11, 22], null, [11, 22], [11, 22], [11, 22], [11, 22], [10, 22]];

  /* ---------- Dinamikus szövegek ---------- */
  const T = {
    hu: {
      loc: 'hu-HU', cur: 'lej',
      openUntil: h => `Most nyitva · ${h}:00-ig`,
      opensToday: h => `Zárva · ma ${h}:00-kor nyitunk`,
      opensTomorrow: h => `Zárva · holnap ${h}:00-kor nyitunk`,
      opensOn: (d, h) => `Zárva · ${d} ${h}:00-kor nyitunk`,
      today: 'Ma', tomorrow: 'Holnap',
      pop: 'népszerű', veg: 'vegetáriánus', hot: 'csípős',
      empty: 'Ebben a kategóriában nincs a szűrésnek megfelelő étel.',
      caps: { breakfast: 'Reggeli mellé: kávé a teraszon', soups: 'Gulyásleves csipetkével', mains: 'Mézes-fokhagymás camembert chilipehellyel',
              pasta: 'Spagetti garnélarákkal és koktélparadicsommal', burgers: 'Hagyományos hamburger coleslaw salátával', sides: 'Vegyes tál köretekkel', desserts: 'Desszert mellé egy kávé' },
      noSlots: 'Erre a napra már nincs szabad időpont.',
      seat: { in: 'bent', out: 'terasz' },
      sum: (d, t, n, s) => `${d}, ${t} · ${n} fő · ${s}`,
      sms: (name, d, t, n, s) => `Kedves ${name}! Asztalod foglalva: ${d}, ${t}, ${n} fő (${s}). Öt Kutya, Zöld Péter u. 17. Ha mégsem jönnél, válaszolj: NEM.`,
    },
    ro: {
      loc: 'ro-RO', cur: 'lei',
      openUntil: h => `Deschis acum · până la ${h}:00`,
      opensToday: h => `Închis · deschidem azi la ${h}:00`,
      opensTomorrow: h => `Închis · deschidem mâine la ${h}:00`,
      opensOn: (d, h) => `Închis · deschidem ${d} la ${h}:00`,
      today: 'Azi', tomorrow: 'Mâine',
      pop: 'popular', veg: 'vegetarian', hot: 'picant',
      empty: 'În această categorie nu există preparate potrivite filtrului.',
      caps: { breakfast: 'La micul dejun: o cafea pe terasă', soups: 'Supă de gulaș cu găluște', mains: 'Camembert cu miere, usturoi și fulgi de chilli',
              pasta: 'Spaghete cu creveți și roșii cherry', burgers: 'Hamburger clasic cu salată coleslaw', sides: 'Platou cu garnituri', desserts: 'La desert, o cafea' },
      noSlots: 'Pentru această zi nu mai sunt ore libere.',
      seat: { in: 'înăuntru', out: 'terasă' },
      sum: (d, t, n, s) => `${d}, ${t} · ${n} pers. · ${s}`,
      sms: (name, d, t, n, s) => `Bună, ${name}! Masa ta e rezervată: ${d}, ${t}, ${n} pers. (${s}). Cinci Căței, str. Zöld Péter 17. Dacă nu mai poți veni, răspunde: NU.`,
    }
  };
  let lang = 'hu';
  const t = () => T[lang];

  /* ---------- Idő: mindig csíkszeredai (Europe/Bucharest) ---------- */
  function localNow() {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Bucharest', year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date()).map(x => [x.type, x.value]));
    return new Date(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute);
  }
  const dayName = (d, style = 'long') => new Intl.DateTimeFormat(t().loc, { weekday: style }).format(d);

  function status() {
    const now = localNow(), dow = now.getDay(), h = now.getHours() + now.getMinutes() / 60;
    const today = HOURS[dow];
    if (today && h >= today[0] && h < today[1]) return { open: true, text: t().openUntil(today[1]) };
    if (today && h < today[0]) return { open: false, text: t().opensToday(today[0]) };
    for (let i = 1; i <= 7; i++) {
      const hh = HOURS[(dow + i) % 7];
      if (!hh) continue;
      if (i === 1) return { open: false, text: t().opensTomorrow(hh[0]) };
      const d = new Date(now); d.setDate(d.getDate() + i);
      return { open: false, text: t().opensOn(dayName(d), hh[0]) };
    }
    return { open: false, text: '' };
  }
  function renderStatus() {
    const st = status();
    $$('[data-live]').forEach(el => {
      el.classList.toggle('open', st.open); el.classList.toggle('closed', !st.open);
      $('.st-text', el).textContent = st.text;
    });
    // mai sor a nyitvatartás-táblában (a tábla hétfővel kezdődik)
    const idx = (localNow().getDay() + 6) % 7;
    $$('#hours dt').forEach((dt, i) => { dt.classList.toggle('today', i === idx); dt.nextElementSibling.classList.toggle('today', i === idx); });
  }
  setInterval(renderStatus, 60 * 1000);

  function renderToday() {
    const el = $('[data-today]'); if (!el) return;
    el.textContent = new Intl.DateTimeFormat(t().loc, { weekday: 'long', month: 'long', day: 'numeric' }).format(localNow());
  }

  /* ---------- Étlap ---------- */
  const MENU = window.MENU || [], PIZZA = window.PIZZA || [], ALG = window.ALLERGENS || {};
  const M = { cat: MENU[0] && MENU[0].id, veg: false, hot: false, alg: false };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const other = () => (lang === 'hu' ? 'ro' : 'hu');

  function renderTabs() {
    const wrap = $('#menuTabs'); if (!wrap) return;
    wrap.innerHTML = MENU.map(c => `<button type="button" class="tab" role="tab" data-cat="${c.id}" aria-selected="${c.id === M.cat}">${esc(c[lang])}</button>`).join('');
  }
  function setPhoto(name, cap) {
    const fig = $('#menuPhoto'), img = $('#menuPhotoImg'); if (!fig) return;
    const src = `img/${name}-800.webp`;
    $('#menuPhotoCap').textContent = cap;
    if (img.getAttribute('src') === src) return;
    fig.classList.add('swap');
    setTimeout(() => {
      img.src = src; img.alt = cap;
      const done = () => fig.classList.remove('swap');
      img.decode ? img.decode().then(done, done) : (img.onload = done);
    }, reduced ? 0 : 260);
  }
  function renderMenu() {
    const cat = MENU.find(c => c.id === M.cat); if (!cat) return;
    const items = cat.items.filter(it => (!M.veg || (it.tags || '').includes('v')) && (!M.hot || (it.tags || '').includes('h')));
    const list = $('#menuList');
    list.classList.toggle('show-alg', M.alg);
    list.innerHTML = `<h3 class="m-cat">${esc(cat[lang])} <small>${esc(cat[other()])}</small></h3>` + (items.length
      ? `<ul class="m-items${cat.compact ? ' compact' : ''}">` + items.map((it, i) => {
          const tags = it.tags || '';
          const icons = (tags.includes('v') ? `<span class="ic ic-veg" title="${t().veg}" aria-label="${t().veg}"></span>` : '')
                      + (tags.includes('h') ? `<span class="ic ic-hot" title="${t().hot}" aria-label="${t().hot}"></span>` : '');
          const desc = lang === 'hu' ? it.dHu : it.dRo;
          return `<li class="m-item" style="animation-delay:${Math.min(i, 10) * 35}ms"${it.ph ? ` data-ph="${it.ph}"` : ''}>
            <span class="m-name">${esc(it[lang])}${icons ? `<span class="m-tags">${icons}</span>` : ''}${it.star ? `<span class="m-pop">${t().pop}</span>` : ''}</span>
            <span class="m-price">${it.p}<small>${t().cur}</small></span>
            <span class="m-alt">${esc(it[other()])}</span>
            ${desc && !cat.compact ? `<span class="m-desc">${esc(desc)}</span>` : ''}
            ${it.alg ? `<span class="m-alg">${[...it.alg].map(a => `<span title="${esc((ALG[a] || {})[lang] || a)}">${a}</span>`).join('')}</span>` : ''}
          </li>`;
        }).join('') + '</ul>'
      : `<p class="m-empty">${t().empty}</p>`);
    setPhoto(cat.photo, t().caps[cat.id]);
  }
  $('#menuTabs') && $('#menuTabs').addEventListener('click', e => {
    const b = e.target.closest('.tab'); if (!b) return;
    M.cat = b.dataset.cat;
    $$('.tab').forEach(x => x.setAttribute('aria-selected', String(x === b)));
    b.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduced ? 'auto' : 'smooth' });
    renderMenu();
  });
  $$('[data-filter]').forEach(b => b.addEventListener('click', () => {
    const k = b.dataset.filter; M[k] = !M[k];
    b.setAttribute('aria-pressed', String(M[k]));
    renderMenu();
  }));
  // egy-egy fotós tételnél a kép követi az egeret
  $('#menuList') && $('#menuList').addEventListener('pointerover', e => {
    const li = e.target.closest('[data-ph]'); if (!li) return;
    setPhoto(li.dataset.ph, $('.m-name', li).firstChild.textContent);
  });

  function renderPizza() {
    const ol = $('#pizzaList'); if (!ol) return;
    ol.innerHTML = PIZZA.map(p => `<li><b>${esc(p.n)}${p.h ? `<span class="ic ic-hot" aria-label="${t().hot}"></span>` : ''}</b><em>${p.p} ${t().cur}</em><span>${esc(p[lang])}</span></li>`).join('');
  }
  function renderLegend() {
    const dl = $('#legend'); if (!dl) return;
    dl.innerHTML = Object.entries(ALG).map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v[lang])}</dd></div>`).join('');
  }

  /* ---------- Foglaló ---------- */
  const form = $('#bkForm');
  const B = { day: null, time: null, ppl: 2 };
  const pad = n => String(n).padStart(2, '0');
  function goStep(n) {
    $$('.bk-pane', form).forEach(p => p.classList.toggle('on', +p.dataset.pane === n));
    if (n === 2) $('#bkSum').textContent = summary();
  }
  function openDays(count = 12) {
    const out = [], now = localNow();
    for (let i = 0; out.length < count && i < 30; i++) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
      const hh = HOURS[d.getDay()];
      if (!hh) continue;
      const slots = [];
      for (let m = hh[0] * 60; m <= (hh[1] - 1.5) * 60; m += 30) {
        const at = new Date(d); at.setMinutes(m);
        if (at - now > 60 * 60 * 1000) slots.push(`${pad(Math.floor(m / 60))}:${pad(m % 60)}`);
      }
      if (slots.length) out.push({ date: d, slots, rel: i });
    }
    return out;
  }
  function renderDays() {
    const days = openDays();
    if (!B.day || !days.find(d => +d.date === +B.day)) { B.day = days[0] && days[0].date; B.time = null; }
    $('#bkDays').innerHTML = days.map(o => `<button type="button" class="day${+o.date === +B.day ? ' sel' : ''}" data-d="${+o.date}" aria-pressed="${+o.date === +B.day}"><small>${o.rel === 0 ? t().today : o.rel === 1 ? t().tomorrow : dayName(o.date, 'short')}</small><b>${o.date.getDate()}</b><small>${new Intl.DateTimeFormat(t().loc, { month: 'short' }).format(o.date)}</small></button>`).join('');
    const cur = days.find(d => +d.date === +B.day);
    $('#bkSlots').innerHTML = cur
      ? cur.slots.map(s => `<button type="button" class="slot${s === B.time ? ' sel' : ''}" data-t="${s}" aria-pressed="${s === B.time}">${s}</button>`).join('')
      : `<p>${t().noSlots}</p>`;
    $('#bkNext').disabled = !B.time;
  }
  const dateText = () => B.day ? new Intl.DateTimeFormat(t().loc, { weekday: 'long', month: 'long', day: 'numeric' }).format(B.day) : '';
  const seatText = () => t().seat[form.elements.seat.value];
  const summary = () => t().sum(dateText(), B.time, B.ppl, seatText());
  function renderSms() {   // magyarul a keresztnév (utolsó tag), románul a teljes név — a sorrend nem kitalálható
    const full = form.elements.name.value.trim();
    $('#smsText').textContent = t().sms(lang === 'hu' ? full.split(/\s+/).pop() : full, dateText(), B.time, B.ppl, seatText());
  }

  if (form) {
    $('#bkDays').addEventListener('click', e => { const b = e.target.closest('.day'); if (!b) return; B.day = new Date(+b.dataset.d); B.time = null; renderDays(); });
    $('#bkSlots').addEventListener('click', e => { const b = e.target.closest('.slot'); if (!b) return; B.time = b.dataset.t; renderDays(); });
    $$('[data-step]', form).forEach(b => b.addEventListener('click', () => {
      B.ppl = Math.max(1, Math.min(20, B.ppl + +b.dataset.step)); $('#bkPpl').textContent = B.ppl;
    }));
    $('#bkNext').addEventListener('click', () => goStep(2));
    form.addEventListener('click', e => { if (e.target.closest('[data-prev]')) goStep(1); });
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.elements.name, phone = form.elements.phone;
      const okName = name.value.trim().length > 1, okPhone = phone.value.replace(/\D/g, '').length >= 9;
      name.classList.toggle('err', !okName); phone.classList.toggle('err', !okPhone);
      if (!okName) return name.focus();
      if (!okPhone) return phone.focus();
      renderSms();
      goStep(3);
    });
    $('#bkReset').addEventListener('click', () => { form.reset(); B.day = B.time = null; B.ppl = 2; $('#bkPpl').textContent = 2; renderDays(); goStep(1); });
  }

  /* ---------- Nyelv ---------- */
  const HU = {};
  $$('[data-i18n]').forEach(el => { if (!(el.dataset.i18n in HU)) HU[el.dataset.i18n] = el.innerHTML; });
  function setLang(l) {
    lang = l === 'ro' ? 'ro' : 'hu';
    const dict = lang === 'ro' ? (window.LOCALE_RO || {}) : HU;
    $$('[data-i18n]').forEach(el => { const v = dict[el.dataset.i18n]; if (v != null) el.innerHTML = v; });
    document.documentElement.lang = lang;
    $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    store.set('ok-lang', lang);
    renderStatus(); renderToday(); renderTabs(); renderMenu(); renderPizza(); renderLegend();
    if (form) {
      renderDays();
      const pane = $('.bk-pane.on').dataset.pane;
      if (pane === '2') $('#bkSum').textContent = summary();
      if (pane === '3') renderSms();
    }
  }
  $$('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

  /* ---------- Fejléc, fiók, görgetés ---------- */
  const nav = $('.nav'), mbar = $('.mbar'), burger = $('.burger'), drawer = $('.drawer');
  function toggleDrawer(open) {
    burger.setAttribute('aria-expanded', String(open));
    drawer.classList.toggle('open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', () => toggleDrawer(burger.getAttribute('aria-expanded') !== 'true'));
  $$('.drawer a').forEach(a => a.addEventListener('click', () => toggleDrawer(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('open')) toggleDrawer(false); });

  const heroImg = $('.hero-photo img'), bookSec = $('#foglalas');
  let ticking = false;
  function onScroll() {
    const y = scrollY;
    nav.classList.toggle('scrolled', y > 40);
    const r = bookSec.getBoundingClientRect();
    mbar.classList.toggle('hide', y < 320 || (r.top < innerHeight * .8 && r.bottom > 0));
    if (!reduced && heroImg && y < innerHeight * 1.2) heroImg.style.transform = `translate3d(0, ${(y * 0.14).toFixed(1)}px, 0)`;
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  const links = $$('.nav-links a');
  const secIO = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(a => { const s = $(a.getAttribute('href')); s && secIO.observe(s); });

  /* ---------- Reveal: két irányba ---------- */
  const rvIO = new IntersectionObserver(es => es.forEach(en => en.target.classList.toggle('shown', en.isIntersecting)),
    { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
  $$('.rv').forEach(el => rvIO.observe(el));

  /* ---------- Számláló ---------- */
  const cIO = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting || reduced) return;
    const el = en.target, to = +el.dataset.count, from = to > 100 ? to - 30 : 0, t0 = performance.now();
    const step = now => {
      const p = Math.min(1, (now - t0) / 1400), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(from + (to - from) * e);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }), { threshold: 0.6 });
  $$('[data-count]').forEach(el => cIO.observe(el));

  /* ---------- Indulás ---------- */
  setLang(store.get('ok-lang') || 'hu');
  onScroll();
  const ready = () => document.body.classList.add('is-ready');
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => setTimeout(ready, 100));
  setTimeout(ready, 1500);
})();
