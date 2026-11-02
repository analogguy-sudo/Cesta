'use strict';
// Cesta – gemeinsame Einkaufsliste mit Vorrat, Deutsch/Spanisch.
// Daten liegen in Supabase (Tabellen cesta_*); mit ?demo läuft die App ohne Konto nur im Browser.

const T = {
  de: {
    tagline: 'Einkaufsliste & Vorrat für den ganzen Haushalt', email: 'E-Mail', password: 'Passwort', login: 'Anmelden',
    forgot: 'Passwort vergessen?', forgotNeedEmail: 'Bitte zuerst die E-Mail eintragen.', forgotSent: 'Link zum Zurücksetzen ist unterwegs.',
    setPasswordHint: 'Lege dein Passwort fest.', newPassword: 'Neues Passwort', savePassword: 'Passwort speichern', passwordSaved: 'Passwort gespeichert.',
    loginFailed: 'Anmeldung fehlgeschlagen. E-Mail und Passwort prüfen.',
    tabList: 'Liste', tabStock: 'Vorrat', tabCatalog: 'Sortiment', tabSettings: 'Einstellungen',
    searchList: 'Was brauchst du?', searchStock: 'Produkt zum Vorrat hinzufügen …', searchCatalog: 'Sortiment durchsuchen …',
    create: 'neu anlegen', onList: 'auf der Liste', inStock: 'im Vorrat', add: 'hinzufügen',
    emptyList: 'Die Liste ist leer.', emptyListHint: 'Oben suchen und antippen, um etwas hinzuzufügen.',
    emptyStock: 'Noch nichts im Vorrat.', emptyStockHint: 'Füge oben Produkte hinzu, deren Bestand du im Blick haben willst.',
    finish: 'Einkauf abschließen', shopping: 'Einkauf', startShopping: '🛒 Einkauf starten', inCart: 'Im Wagen',
    shopProgress: (d, n) => `${d} von ${n} im Wagen`, allInCart: 'Alles im Wagen! 🎉', finishDone: n => `${n} erledigt – Vorrat aktualisiert.`, addLow: n => `Knappe Vorräte auf die Liste (${n})`,
    addedLow: n => `${n} auf die Liste gesetzt.`, autoAdded: x => `${x} ist knapp – auf die Liste gesetzt.`,
    added: x => `${x} hinzugefügt.`, already: x => `${x} steht schon auf der Liste.`,
    min: n => `mindestens ${n}`, low: 'knapp', noCategory: 'Ohne Kategorie',
    editProduct: 'Produkt bearbeiten', newProduct: 'Neues Produkt', nameDe: 'Name (Deutsch)', nameEs: 'Name (Spanisch)', emoji: 'Symbol',
    category: 'Kategorie', unit: 'Einheit', threshold: 'Mindestmenge', stock: 'Bestand', thresholdHint: '0 = kein Vorrat führen',
    save: 'Speichern', cancel: 'Abbrechen', delete: 'Löschen', confirmDelete: x => `„${x}“ wirklich löschen?`, close: 'Fertig',
    editCategories: 'Kategorien bearbeiten', newCategory: 'Neue Kategorie', confirmDeleteCategory: x => `Kategorie „${x}“ löschen? Die Produkte bleiben erhalten.`,
    addProduct: '+ Produkt',
    language: 'Sprache', theme: 'Design', themeSystem: 'System', themeLight: 'Hell', themeDark: 'Dunkel',
    household: 'Haushalt', members: 'Mitglieder', invite: 'Einladungscode erstellen', inviteHint: 'Code an die andere Person schicken. Gilt 7 Tage und einmal.',
    join: 'Mit Code beitreten', joinPrompt: 'Einladungscode', joinWarn: 'Du verlässt dabei deinen bisherigen Haushalt.', joined: 'Haushalt beigetreten.',
    data: 'Daten', export: 'Sicherung herunterladen', import: 'Sicherung einspielen',
    importConfirm: (c, p) => `Sortiment, Liste und Vorrat durch die Sicherung ersetzen? (${c} Kategorien, ${p} Produkte)`,
    importDone: 'Sicherung eingespielt.', importBad: 'Diese Datei ist keine Cesta-Sicherung.',
    account: 'Konto', logout: 'Abmelden', demo: 'Demo – Daten nur in diesem Browser',
    live: 'live', offline: 'offline', saveFailed: 'Speichern fehlgeschlagen – wird neu geladen.',
    units: { pack: 'Pkg.', piece: 'Stk.', kg: 'kg', g: 'g', l: 'l', ml: 'ml', bottle: 'Fl.', can: 'Dose' }
  },
  es: {
    tagline: 'Lista de la compra y despensa para todo el hogar', email: 'Correo', password: 'Contraseña', login: 'Entrar',
    forgot: '¿Olvidaste la contraseña?', forgotNeedEmail: 'Primero escribe tu correo.', forgotSent: 'Te enviamos un enlace para restablecerla.',
    setPasswordHint: 'Elige tu contraseña.', newPassword: 'Nueva contraseña', savePassword: 'Guardar contraseña', passwordSaved: 'Contraseña guardada.',
    loginFailed: 'No se pudo entrar. Revisa correo y contraseña.',
    tabList: 'Lista', tabStock: 'Despensa', tabCatalog: 'Productos', tabSettings: 'Ajustes',
    searchList: '¿Qué necesitas?', searchStock: 'Añadir producto a la despensa …', searchCatalog: 'Buscar productos …',
    create: 'crear', onList: 'en la lista', inStock: 'en la despensa', add: 'añadir',
    emptyList: 'La lista está vacía.', emptyListHint: 'Busca arriba y toca para añadir algo.',
    emptyStock: 'La despensa está vacía.', emptyStockHint: 'Añade arriba los productos que quieres controlar.',
    finish: 'Terminar la compra', shopping: 'Compra', startShopping: '🛒 Empezar la compra', inCart: 'En el carro',
    shopProgress: (d, n) => `${d} de ${n} en el carro`, allInCart: '¡Todo en el carro! 🎉', finishDone: n => `${n} comprados – despensa actualizada.`, addLow: n => `Añadir lo que falta a la lista (${n})`,
    addedLow: n => `${n} añadidos a la lista.`, autoAdded: x => `Queda poco ${x} – añadido a la lista.`,
    added: x => `${x} añadido.`, already: x => `${x} ya está en la lista.`,
    min: n => `mínimo ${n}`, low: 'poco', noCategory: 'Sin categoría',
    editProduct: 'Editar producto', newProduct: 'Nuevo producto', nameDe: 'Nombre (alemán)', nameEs: 'Nombre (español)', emoji: 'Icono',
    category: 'Categoría', unit: 'Unidad', threshold: 'Cantidad mínima', stock: 'Existencias', thresholdHint: '0 = no controlar',
    save: 'Guardar', cancel: 'Cancelar', delete: 'Eliminar', confirmDelete: x => `¿Eliminar «${x}»?`, close: 'Listo',
    editCategories: 'Editar categorías', newCategory: 'Nueva categoría', confirmDeleteCategory: x => `¿Eliminar la categoría «${x}»? Los productos se conservan.`,
    addProduct: '+ Producto',
    language: 'Idioma', theme: 'Tema', themeSystem: 'Sistema', themeLight: 'Claro', themeDark: 'Oscuro',
    household: 'Hogar', members: 'Miembros', invite: 'Crear código de invitación', inviteHint: 'Envía el código a la otra persona. Vale 7 días y una vez.',
    join: 'Unirse con código', joinPrompt: 'Código de invitación', joinWarn: 'Saldrás de tu hogar actual.', joined: 'Te uniste al hogar.',
    data: 'Datos', export: 'Descargar copia', import: 'Restaurar copia',
    importConfirm: (c, p) => `¿Reemplazar productos, lista y despensa por la copia? (${c} categorías, ${p} productos)`,
    importDone: 'Copia restaurada.', importBad: 'Este archivo no es una copia de Cesta.',
    account: 'Cuenta', logout: 'Cerrar sesión', demo: 'Demo – datos solo en este navegador',
    live: 'en vivo', offline: 'sin conexión', saveFailed: 'No se pudo guardar – recargando.',
    units: { pack: 'paq.', piece: 'ud.', kg: 'kg', g: 'g', l: 'l', ml: 'ml', bottle: 'bot.', can: 'lata' }
  }
};
const UNITS = ['pack', 'piece', 'kg', 'g', 'l', 'ml', 'bottle', 'can'];
const DEMO = new URLSearchParams(location.search).has('demo');

const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
const uid = () => crypto.randomUUID();
const store = {
  get(k) { try { return localStorage.getItem('cesta.' + k); } catch (e) { return null; } },
  set(k, v) { try { v == null ? localStorage.removeItem('cesta.' + k) : localStorage.setItem('cesta.' + k, v); } catch (e) {} }
};

const state = {
  lang: store.get('lang') === 'es' ? 'es' : 'de',
  theme: store.get('theme') || 'system',
  tab: store.get('tab') || 'list',
  shopping: store.get('shopping') === '1',
  household: null, user: null, categories: [], products: new Map(), members: [], invite: null, live: false
};
const t = (k, ...a) => { const v = T[state.lang][k] ?? T.de[k]; return typeof v === 'function' ? v(...a) : v; };
const label = x => (x && (x[state.lang] || x.de || x.es)) || '';
const tracked = p => p.threshold > 0 || p.stock_qty > 0;
const isLow = p => p.threshold > 0 && p.stock_qty <= p.threshold;

// ---------- Datenzugriff ----------

function supabaseBackend() {
  const linkType = new URLSearchParams(location.hash.slice(1)).get('type');
  const sb = supabase.createClient(CESTA_CONFIG.url, CESTA_CONFIG.publishableKey);
  let channel = null;
  const must = ({ data, error }) => { if (error) throw error; return data; };
  return {
    linkType,
    onAuth(cb) {
      sb.auth.onAuthStateChange((event, session) => setTimeout(() => cb(event, session), 0));
    },
    async login(email, password) { must(await sb.auth.signInWithPassword({ email, password })); },
    async forgot(email) { must(await sb.auth.resetPasswordForEmail(email, { redirectTo: location.origin + location.pathname })); },
    async setPassword(password) { must(await sb.auth.updateUser({ password })); },
    async logout() { await sb.auth.signOut(); },
    async household() { return must(await sb.rpc('cesta_my_household')); },
    async load(h) {
      const [c, p] = await Promise.all([
        sb.from('cesta_categories').select('*').eq('household_id', h).order('sort'),
        sb.from('cesta_products').select('*').eq('household_id', h)
      ]);
      return { categories: must(c), products: must(p) };
    },
    async save(table, rows) { must(await sb.from('cesta_' + table).upsert(rows)); },
    async remove(table, id) { must(await sb.from('cesta_' + table).delete().eq('id', id)); },
    async clear(h) {
      must(await sb.from('cesta_products').delete().eq('household_id', h));
      must(await sb.from('cesta_categories').delete().eq('household_id', h));
    },
    async createInvite() { return must(await sb.rpc('cesta_create_invite')); },
    async join(code) { return must(await sb.rpc('cesta_join', { invite_code: code })); },
    async members() { return (must(await sb.rpc('cesta_member_emails')) || []).map(r => r.email); },
    subscribe(h, onChange, onStatus) {
      if (channel) sb.removeChannel(channel);
      channel = sb.channel('cesta-' + h);
      for (const table of ['products', 'categories']) {
        channel.on('postgres_changes', { event: '*', schema: 'public', table: 'cesta_' + table, filter: 'household_id=eq.' + h },
          payload => onChange(table, payload.eventType, payload.eventType === 'DELETE' ? payload.old : payload.new));
      }
      channel.subscribe(status => onStatus(status === 'SUBSCRIBED'));
    }
  };
}

function demoBackend() {
  const read = () => { try { return JSON.parse(store.get('demo')) || { categories: [], products: [] }; } catch (e) { return { categories: [], products: [] }; } };
  const write = d => store.set('demo', JSON.stringify(d));
  return {
    linkType: null,
    onAuth(cb) { setTimeout(() => cb('SIGNED_IN', { user: { email: 'demo@cesta' } }), 0); },
    async logout() { store.set('demo', null); location.reload(); },
    async household() { return 'demo'; },
    async load() { return read(); },
    async save(table, rows) {
      const d = read();
      for (const r of rows) { const i = d[table].findIndex(x => x.id === r.id); i < 0 ? d[table].push(r) : d[table][i] = r; }
      write(d);
    },
    async remove(table, id) { const d = read(); d[table] = d[table].filter(x => x.id !== id); write(d); },
    async clear() { write({ categories: [], products: [] }); },
    async createInvite() { return 'DEMO1234'; },
    async join() { throw new Error('Demo'); },
    async members() { return ['demo@cesta']; },
    subscribe(h, onChange, onStatus) { onStatus(true); }
  };
}

const db = DEMO ? demoBackend() : supabaseBackend();

// ---------- Schreiben ----------

let reloadTimer = null;
async function persist(table, rows) {
  rows = [].concat(rows);
  for (const r of rows) {
    if (table === 'products') { r.updated_at = new Date().toISOString(); state.products.set(r.id, r); }
    else { const i = state.categories.findIndex(c => c.id === r.id); i < 0 ? state.categories.push(r) : state.categories[i] = r; }
  }
  render();
  try { await db.save(table, rows); }
  catch (e) { console.error(e); failed(); }
}
async function erase(table, id) {
  if (table === 'products') state.products.delete(id); else state.categories = state.categories.filter(c => c.id !== id);
  render();
  try { await db.remove(table, id); } catch (e) { console.error(e); failed(); }
}
function failed() {
  toast(t('saveFailed'));
  clearTimeout(reloadTimer);
  reloadTimer = setTimeout(loadData, 800);
}
const product = (id, patch) => persist('products', { ...state.products.get(id), ...patch });

function newProduct(fields) {
  return {
    id: uid(), household_id: state.household, category_id: null, de: '', es: '', emoji: '🛒',
    on_list: false, list_qty: 1, done: false, stock_qty: 0, unit: 'pack', threshold: 0, ...fields
  };
}

// ---------- Laden ----------

async function loadData() {
  const { categories, products } = await db.load(state.household);
  state.categories = categories.sort((a, b) => a.sort - b.sort);
  state.products = new Map(products.map(p => [p.id, p]));
  if (!state.categories.length && !state.products.size) await seedDefaults();
  render();
}

async function seedDefaults() {
  const D = window.CESTA_DEFAULTS;
  const cats = D.categories.map(([de, es], i) => ({ id: uid(), household_id: state.household, sort: i, de, es }));
  const prods = D.products.map(([c, de, es, emoji]) => newProduct({ category_id: cats[c].id, de, es, emoji }));
  state.categories = cats;
  state.products = new Map(prods.map(p => [p.id, p]));
  await db.save('categories', cats);
  await db.save('products', prods);
}

let renderQueued = false;
function onRemote(table, type, row) {
  if (table === 'products') type === 'DELETE' ? state.products.delete(row.id) : state.products.set(row.id, row);
  else {
    state.categories = state.categories.filter(c => c.id !== row.id);
    if (type !== 'DELETE') state.categories.push(row);
    state.categories.sort((a, b) => a.sort - b.sort);
  }
  if (!renderQueued) { renderQueued = true; requestAnimationFrame(() => { renderQueued = false; render(); }); }
}

// ---------- Anmeldung ----------

function show(id) {
  $('#auth').hidden = id !== 'auth';
  $('#main').hidden = id !== 'main' || state.shopping;
  $('#shop').hidden = id !== 'main' || !state.shopping;
}
function showAuth(mode) {
  show('auth');
  $('#login-form').hidden = mode !== 'login';
  $('#password-form').hidden = mode !== 'password';
}

let started = false;
db.onAuth(async (event, session) => {
  if (event === 'PASSWORD_RECOVERY' || (session && ['invite', 'recovery'].includes(db.linkType))) {
    return showAuth('password');
  }
  if (!session) { started = false; return showAuth('login'); }
  state.user = session.user;
  if (started) return;
  started = true;
  show('main');
  try {
    state.household = await db.household();
    await loadData();
    db.subscribe(state.household, onRemote, ok => { state.live = ok; renderSync(); });
    db.members().then(m => { state.members = m; if (state.tab === 'settings') render(); }).catch(() => {});
  } catch (e) {
    console.error(e);
    toast(e.message || String(e));
  }
});

$('#login-form').addEventListener('submit', async e => {
  e.preventDefault();
  const f = e.target;
  try { await db.login(f.email.value.trim(), f.password.value); }
  catch (err) { toast(t('loginFailed')); }
});
$('#password-form').addEventListener('submit', async e => {
  e.preventDefault();
  try {
    await db.setPassword(e.target.password.value);
    history.replaceState(null, '', location.pathname + location.search);
    db.linkType = null;
    toast(t('passwordSaved'));
    location.reload();
  } catch (err) { toast(err.message); }
});

// ---------- Darstellung ----------

function applyChrome() {
  document.documentElement.lang = state.lang;
  if (state.theme === 'system') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = state.theme;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-action=lang]').forEach(b => b.classList.toggle('on', b.dataset.lang === state.lang));
}

function renderSync() {
  const el = $('#sync');
  const ok = state.live && navigator.onLine;
  el.textContent = ok ? '● ' + t('live') : t('offline');
  el.classList.toggle('offline', !ok);
}

const sortedCats = () => [...state.categories].sort((a, b) => a.sort - b.sort);
const byName = (a, b) => label(a).localeCompare(label(b), state.lang);

function grouped(items) {
  const groups = sortedCats().map(c => ({ cat: c, items: [] }));
  const index = new Map(groups.map(g => [g.cat.id, g]));
  const none = { cat: null, items: [] };
  for (const p of items) (index.get(p.category_id) || none).items.push(p);
  return [...groups, none].filter(g => g.items.length);
}
const groupHtml = (g, rowFn) => `<div class="group"><h2>${esc(g.cat ? label(g.cat) : t('noCategory'))}</h2>
  <div class="card">${g.items.map(rowFn).join('')}</div></div>`;
const stepper = (id, value, action) => `<div class="stepper"><button type="button" data-action="${action}" data-id="${id}" data-d="-1" aria-label="−">−</button>
  <span>${value}</span><button type="button" data-action="${action}" data-id="${id}" data-d="1" aria-label="+">+</button></div>`;
const unitLabel = u => t('units')[u] || u;

function render() {
  applyChrome();
  $('#main').hidden = state.shopping;
  $('#shop').hidden = !state.shopping;
  if (state.shopping) return renderShop();
  renderSync();
  const all = [...state.products.values()];
  const listCount = all.filter(p => p.on_list && !p.done).length;
  const lowCount = all.filter(p => isLow(p) && !p.on_list).length;
  $('#list-count').hidden = !listCount; $('#list-count').textContent = listCount;
  $('#low-count').hidden = !lowCount; $('#low-count').textContent = lowCount;
  document.querySelectorAll('[data-tab]').forEach(b => b.classList.toggle('on', b.dataset.tab === state.tab));
  $('#view-title').textContent = t({ list: 'tabList', stock: 'tabStock', catalog: 'tabCatalog', settings: 'tabSettings' }[state.tab]);
  $('#search-wrap').hidden = state.tab === 'settings';
  $('#search').placeholder = t({ list: 'searchList', stock: 'searchStock', catalog: 'searchCatalog' }[state.tab] || 'searchList');
  $('#view').innerHTML = ({ list: viewList, stock: viewStock, catalog: viewCatalog, settings: viewSettings }[state.tab])(all);
  if (!$('#suggestions').hidden) renderSuggestions();
}

function viewList(all) {
  const items = all.filter(p => p.on_list).sort((a, b) => (a.done - b.done) || byName(a, b));
  const lows = all.filter(p => isLow(p) && !p.on_list).length;
  const done = items.filter(p => p.done).length;
  const lowBtn = lows ? `<button class="btn" data-action="add-low">${esc(t('addLow', lows))}</button>` : '';
  if (!items.length) return `<div class="empty"><div class="big">🧺</div><p><b>${esc(t('emptyList'))}</b><br>${esc(t('emptyListHint'))}</p>
    <div class="actions">${lowBtn}</div></div>`;
  return `<button class="btn primary start" data-action="shop-start">${esc(t('startShopping'))}</button>` + grouped(items).map(g => groupHtml(g, p => `<div class="row${p.done ? ' done' : ''}">
      <button class="tap" data-action="toggle" data-id="${p.id}"><span class="check">${p.done ? '✓' : ''}</span>
        <span class="emoji">${esc(p.emoji)}</span><span class="name">${esc(label(p))}</span></button>
      ${stepper(p.id, p.list_qty, 'list-qty')}
      <button class="icon-btn" data-action="unlist" data-id="${p.id}" aria-label="${esc(t('delete'))}">✕</button></div>`)).join('')
    + `<div class="actions">${done ? `<button class="btn primary" data-action="finish">${esc(t('finish'))} (${done})</button>` : ''}${lowBtn}</div>`;
}

function viewStock(all) {
  const items = all.filter(tracked).sort(byName);
  const lows = all.filter(p => isLow(p) && !p.on_list).length;
  if (!items.length) return `<div class="empty"><div class="big">🏠</div><p><b>${esc(t('emptyStock'))}</b><br>${esc(t('emptyStockHint'))}</p></div>`;
  return (lows ? `<div class="actions"><button class="btn" data-action="add-low">${esc(t('addLow', lows))}</button></div>` : '')
    + grouped(items).map(g => groupHtml(g, p => `<div class="row${isLow(p) ? ' low' : ''}">
      <button class="tap" data-action="edit" data-id="${p.id}"><span class="emoji">${esc(p.emoji)}</span>
        <span class="name">${esc(label(p))}<small>${p.threshold ? esc(t('min', p.threshold)) : ''}${isLow(p) ? ' · ' + esc(t('low')) : ''}${p.on_list ? ' · 🧺' : ''}</small></span></button>
      ${stepper(p.id, p.stock_qty, 'stock-qty')}<span class="unit">${esc(unitLabel(p.unit))}</span></div>`)).join('');
}

function viewCatalog(all) {
  const q = norm($('#search').value);
  const items = all.filter(p => !q || norm(p.de).includes(q) || norm(p.es).includes(q)).sort(byName);
  return `<div class="actions"><button class="btn" data-action="new-product">${esc(t('addProduct'))}</button>
      <button class="btn" data-action="categories">${esc(t('editCategories'))}</button></div>`
    + grouped(items).map(g => groupHtml(g, p => `<div class="row">
      <button class="tap" data-action="edit" data-id="${p.id}"><span class="emoji">${esc(p.emoji)}</span>
        <span class="name">${esc(label(p))}<small>${esc(state.lang === 'de' ? p.es : p.de)}</small></span></button>
      <button class="icon-btn" data-action="${p.on_list ? 'unlist' : 'list'}" data-id="${p.id}" aria-label="${esc(t('add'))}">${p.on_list ? '🧺' : '＋'}</button></div>`)).join('');
}

function viewSettings() {
  const seg = (action, current, opts) => `<div class="seg">${opts.map(([v, l]) =>
    `<button data-action="${action}" data-v="${v}" class="${v === current ? 'on' : ''}">${esc(l)}</button>`).join('')}</div>`;
  return `<div class="settings">
    <div class="group"><div class="card">
      <div class="row"><span>${esc(t('language'))}</span>${seg('set-lang', state.lang, [['de', 'Deutsch'], ['es', 'Español']])}</div>
      <div class="row"><span>${esc(t('theme'))}</span>${seg('set-theme', state.theme, [['system', t('themeSystem')], ['light', t('themeLight')], ['dark', t('themeDark')]])}</div>
    </div></div>
    <div class="group"><h2>${esc(t('household'))}</h2><div class="card">
      <div class="row"><span class="name">${esc(t('members'))}<small>${esc(state.members.join(', '))}</small></span></div>
      <div class="row">${state.invite ? `<span class="name"><span class="code">${esc(state.invite)}</span><small>${esc(t('inviteHint'))}</small></span>`
        : `<button class="btn small" data-action="invite">${esc(t('invite'))}</button>`}</div>
      <div class="row"><button class="btn small" data-action="join">${esc(t('join'))}</button></div>
    </div></div>
    <div class="group"><h2>${esc(t('data'))}</h2><div class="card">
      <div class="row"><button class="btn small" data-action="export">${esc(t('export'))}</button></div>
      <div class="row"><button class="btn small" data-action="import">${esc(t('import'))}</button></div>
    </div></div>
    <div class="group"><h2>${esc(t('account'))}</h2><div class="card">
      <div class="row"><span class="name">${esc(DEMO ? t('demo') : state.user?.email)}</span>
        <button class="btn small danger" data-action="logout">${esc(t('logout'))}</button></div>
    </div></div>
  </div>`;
}

// ---------- Einkaufsmodus ----------

function renderShop() {
  const items = [...state.products.values()].filter(p => p.on_list).sort(byName);
  const open = items.filter(p => !p.done), done = items.filter(p => p.done);
  const row = p => `<div class="row${p.done ? ' done' : ''}">
      <button class="tap" data-action="toggle" data-id="${p.id}"><span class="check">${p.done ? '✓' : ''}</span>
        <span class="emoji">${esc(p.emoji)}</span><span class="name">${esc(label(p))}</span>
        ${p.list_qty > 1 ? `<span class="qty">${p.list_qty}×</span>` : ''}</button></div>`;
  $('#shop-progress').textContent = t('shopProgress', done.length, items.length);
  $('#shop-bar').style.width = items.length ? (100 * done.length / items.length) + '%' : '0';
  $('#shop-finish').textContent = `${t('finish')}${done.length ? ` (${done.length})` : ''}`;
  $('#shop-finish').disabled = !done.length;
  $('#shop-view').innerHTML = (open.length ? grouped(open).map(g => groupHtml(g, row)).join('')
      : `<div class="empty"><div class="big">🛒</div><p><b>${esc(items.length ? t('allInCart') : t('emptyList'))}</b></p></div>`)
    + (done.length ? `<div class="group"><h2>${esc(t('inCart'))}</h2><div class="card">${done.map(row).join('')}</div></div>` : '');
}

let wakeLock = null;
async function keepAwake(on) {
  try {
    if (on && !wakeLock && 'wakeLock' in navigator && !document.hidden) {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', () => { wakeLock = null; });
    } else if (!on && wakeLock) { await wakeLock.release(); wakeLock = null; }
  } catch (e) { wakeLock = null; }
}

function setShopping(on) {
  state.shopping = on;
  store.set('shopping', on ? '1' : null);
  $('#search').value = ''; $('#suggestions').hidden = true;
  keepAwake(on);
  render();
  $('#shop-view').scrollTop = 0; scrollTo(0, 0);
}

// ---------- Suche ----------

function matches() {
  const q = norm($('#search').value);
  if (!q) return [];
  const all = [...state.products.values()];
  const score = p => { const a = norm(p.de), b = norm(p.es); return a.startsWith(q) || b.startsWith(q) ? 0 : a.includes(q) || b.includes(q) ? 1 : 9; };
  return all.map(p => [score(p), p]).filter(([s]) => s < 9).sort((a, b) => a[0] - b[0] || byName(a[1], b[1])).slice(0, 8).map(x => x[1]);
}

function renderSuggestions() {
  const box = $('#suggestions');
  const text = $('#search').value.trim();
  if (!text || state.tab === 'catalog') { box.hidden = true; return; }
  const list = matches();
  const exact = list.some(p => norm(p.de) === norm(text) || norm(p.es) === norm(text));
  const hint = p => state.tab === 'list' ? (p.on_list ? t('onList') : '') : (tracked(p) ? t('inStock') : '');
  box.innerHTML = list.map(p => `<button type="button" data-action="pick" data-id="${p.id}"><span class="emoji">${esc(p.emoji)}</span>
      <span>${esc(label(p))}</span><span class="hint">${esc(hint(p))}</span></button>`).join('')
    + (exact ? '' : `<button type="button" data-action="pick-new"><span class="emoji">＋</span><span>„${esc(text)}“</span><span class="hint">${esc(t('create'))}</span></button>`);
  box.hidden = false;
}

function pick(p) {
  if (state.tab === 'list') {
    if (p.on_list && !p.done) toast(t('already', label(p)));
    else { product(p.id, { on_list: true, done: false, list_qty: 1 }); toast(t('added', label(p))); }
  } else if (state.tab === 'stock') {
    if (!tracked(p)) product(p.id, { threshold: 1 });
    toast(t('added', label(p)));
  }
  $('#search').value = '';
  $('#suggestions').hidden = true;
}

function pickNew() {
  const text = $('#search').value.trim();
  if (!text) return;
  const other = sortedCats().find(c => norm(c.de) === 'sonstiges') || null;
  const p = newProduct({ de: text, es: text, category_id: other?.id || null,
    on_list: state.tab === 'list', threshold: state.tab === 'stock' ? 1 : 0 });
  persist('products', p);
  $('#search').value = '';
  $('#suggestions').hidden = true;
  openProduct(p, true);
}

$('#search').addEventListener('input', () => state.tab === 'catalog' ? render() : renderSuggestions());
$('#search').addEventListener('keydown', e => {
  if (e.key === 'Enter' && state.tab !== 'catalog') {
    e.preventDefault();
    const q = norm(e.target.value), list = matches();
    const hit = list.find(p => norm(p.de) === q || norm(p.es) === q) || list[0];
    hit ? pick(hit) : pickNew();
  }
  if (e.key === 'Escape') { e.target.value = ''; $('#suggestions').hidden = true; }
});
document.addEventListener('click', e => {
  if (!e.target.closest('.search-wrap')) $('#suggestions').hidden = true;
});

// ---------- Bearbeiten ----------

const sheet = $('#sheet');
const sheetForm = $('#sheet-form');

function openProduct(p, isNew = false) {
  const opts = (list, cur) => list.map(([v, l]) => `<option value="${esc(v)}"${v === cur ? ' selected' : ''}>${esc(l)}</option>`).join('');
  sheetForm.innerHTML = `<h3>${esc(t(isNew ? 'newProduct' : 'editProduct'))}</h3>
    <div class="two" style="grid-template-columns:72px 1fr">
      <label>${esc(t('emoji'))}<input name="emoji" class="emoji-input" value="${esc(p.emoji)}" maxlength="8"></label>
      <label>${esc(t('nameDe'))}<input name="de" value="${esc(p.de)}" required></label>
    </div>
    <label>${esc(t('nameEs'))}<input name="es" value="${esc(p.es)}"></label>
    <label>${esc(t('category'))}<select name="category_id">${opts([['', t('noCategory')], ...sortedCats().map(c => [c.id, label(c)])], p.category_id || '')}</select></label>
    <div class="two">
      <label>${esc(t('threshold'))}<input name="threshold" type="number" min="0" inputmode="numeric" value="${p.threshold}"></label>
      <label>${esc(t('unit'))}<select name="unit">${opts(UNITS.map(u => [u, unitLabel(u)]), p.unit)}</select></label>
    </div>
    <label>${esc(t('stock'))}<input name="stock_qty" type="number" min="0" inputmode="numeric" value="${p.stock_qty}"></label>
    <p class="muted" style="margin:0;font-size:13px">${esc(t('thresholdHint'))}</p>
    <div class="sheet-actions">${isNew ? '' : `<button type="button" class="btn danger" data-sheet="delete">${esc(t('delete'))}</button>`}
      <span class="spacer"></span><button type="button" class="btn" data-sheet="cancel">${esc(t('cancel'))}</button>
      <button type="submit" class="btn primary">${esc(t('save'))}</button></div>`;
  sheetForm.onsubmit = e => {
    e.preventDefault();
    const f = sheetForm.elements;
    const int = v => Math.max(0, parseInt(v, 10) || 0);
    const patch = { emoji: f.emoji.value.trim() || '🛒', de: f.de.value.trim(), es: f.es.value.trim() || f.de.value.trim(),
      category_id: f.category_id.value || null, threshold: int(f.threshold.value), unit: f.unit.value, stock_qty: int(f.stock_qty.value) };
    sheet.close();
    const next = { ...state.products.get(p.id), ...patch };
    if (isLow(next) && !next.on_list) Object.assign(patch, { on_list: true, done: false, list_qty: Math.max(1, next.threshold - next.stock_qty + 1) });
    product(p.id, patch);
  };
  sheetForm.onclick = e => {
    const a = e.target.dataset.sheet;
    if (a === 'cancel') sheet.close();
    if (a === 'delete' && confirm(t('confirmDelete', label(p)))) { sheet.close(); erase('products', p.id); }
  };
  sheet.showModal();
}

function openCategories() {
  const draw = () => {
    const cats = sortedCats();
    sheetForm.innerHTML = `<h3>${esc(t('editCategories'))}</h3>
      ${cats.map((c, i) => `<div class="two" style="grid-template-columns:1fr 1fr auto;align-items:center">
        <input data-cat="${c.id}" data-field="de" value="${esc(c.de)}" aria-label="${esc(t('nameDe'))}">
        <input data-cat="${c.id}" data-field="es" value="${esc(c.es)}" aria-label="${esc(t('nameEs'))}">
        <span style="white-space:nowrap"><button type="button" class="icon-btn" data-up="${i}" ${i ? '' : 'disabled'}>↑</button><button type="button" class="icon-btn" data-del="${c.id}">🗑</button></span>
      </div>`).join('')}
      <div class="sheet-actions"><button type="button" class="btn" data-sheet="add">${esc(t('newCategory'))}</button>
        <span class="spacer"></span><button type="submit" class="btn primary">${esc(t('close'))}</button></div>`;
  };
  draw();
  sheetForm.onsubmit = e => { e.preventDefault(); sheet.close(); };
  sheetForm.onchange = e => {
    const id = e.target.dataset.cat;
    if (!id) return;
    const c = state.categories.find(x => x.id === id);
    persist('categories', { ...c, [e.target.dataset.field]: e.target.value.trim() });
  };
  sheetForm.onclick = e => {
    const b = e.target.closest('button');
    if (!b) return;
    const cats = sortedCats();
    if (b.dataset.up) {
      const i = +b.dataset.up;
      persist('categories', [{ ...cats[i], sort: cats[i - 1].sort }, { ...cats[i - 1], sort: cats[i].sort }]);
      draw();
    } else if (b.dataset.del) {
      const c = cats.find(x => x.id === b.dataset.del);
      if (!confirm(t('confirmDeleteCategory', label(c)))) return;
      for (const p of state.products.values()) if (p.category_id === c.id) p.category_id = null;
      erase('categories', c.id);
      draw();
    } else if (b.dataset.sheet === 'add') {
      const sort = cats.length ? Math.max(...cats.map(c => c.sort)) + 1 : 0;
      persist('categories', { id: uid(), household_id: state.household, sort, de: t('newCategory'), es: T.es.newCategory });
      draw();
      [...sheetForm.querySelectorAll('[data-field=de]')].pop()?.select();
    }
  };
  sheet.showModal();
}
sheet.addEventListener('close', () => { sheetForm.onchange = null; });

// ---------- Aktionen ----------

function changeStock(p, d) {
  const qty = Math.max(0, p.stock_qty + d);
  const patch = { stock_qty: qty };
  if (d < 0 && p.threshold > 0 && qty <= p.threshold && !p.on_list) {
    Object.assign(patch, { on_list: true, done: false, list_qty: Math.max(1, p.threshold - qty + 1) });
    toast(t('autoAdded', label(p)));
  }
  product(p.id, patch);
}

function addLow() {
  const lows = [...state.products.values()].filter(p => isLow(p) && !p.on_list);
  persist('products', lows.map(p => ({ ...p, on_list: true, done: false, list_qty: Math.max(1, p.threshold - p.stock_qty + 1) })));
  toast(t('addedLow', lows.length));
}

function finish() {
  const done = [...state.products.values()].filter(p => p.on_list && p.done);
  persist('products', done.map(p => ({ ...p, on_list: false, done: false, list_qty: 1,
    stock_qty: tracked(p) ? p.stock_qty + p.list_qty : p.stock_qty })));
  toast(t('finishDone', done.length));
  if (state.shopping && ![...state.products.values()].some(p => p.on_list)) setShopping(false);
}

function exportBackup() {
  const cats = sortedCats();
  const catIndex = new Map(cats.map((c, i) => [c.id, i]));
  const all = [...state.products.values()];
  const data = {
    format: 'cesta-backup', version: 1, createdAt: new Date().toISOString(),
    products: all.map(p => ({ id: p.id, cat: catIndex.get(p.category_id) ?? null, de: p.de, es: p.es, emoji: p.emoji, iconManual: false })),
    shopping: all.filter(p => p.on_list).map(p => ({ id: p.id, qty: p.list_qty, done: p.done })),
    inventory: all.filter(tracked).map(p => ({ id: p.id, qty: p.stock_qty, unit: p.unit, threshold: p.threshold })),
    categories: cats.map((c, i) => ({ id: i, de: c.de, es: c.es })),
    preferences: { language: state.lang, theme: state.theme === 'system' ? 'auto' : state.theme }
  };
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
  a.download = `cesta-sicherung-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

async function importBackup(file) {
  let d;
  try { d = JSON.parse(await file.text()); } catch (e) { return toast(t('importBad')); }
  if (d?.format !== 'cesta-backup' || !Array.isArray(d.products) || !Array.isArray(d.categories)) return toast(t('importBad'));
  if (!confirm(t('importConfirm', d.categories.length, d.products.length))) return;
  const h = state.household;
  const catIds = new Map();
  const cats = d.categories.map((c, i) => { const id = uid(); catIds.set(c.id, id); return { id, household_id: h, sort: i, de: c.de || '', es: c.es || '' }; });
  const shop = new Map((d.shopping || []).map(s => [s.id, s]));
  const inv = new Map((d.inventory || []).map(s => [s.id, s]));
  const prods = d.products.map(p => {
    const s = shop.get(p.id), v = inv.get(p.id);
    return newProduct({
      category_id: catIds.get(p.cat) || null, de: p.de || p.es || '?', es: p.es || p.de || '', emoji: p.emoji || '🛒',
      on_list: !!s, list_qty: Math.max(1, s?.qty || 1), done: !!s?.done,
      stock_qty: Math.max(0, v?.qty || 0), unit: UNITS.includes(v?.unit) ? v.unit : 'pack', threshold: Math.max(0, v?.threshold || 0)
    });
  });
  try {
    await db.clear(h);
    await db.save('categories', cats);
    await db.save('products', prods);
  } catch (e) { console.error(e); return failed(); }
  const pref = d.preferences || {};
  if (pref.language === 'de' || pref.language === 'es') { state.lang = pref.language; store.set('lang', state.lang); }
  if (['light', 'dark'].includes(pref.theme)) { state.theme = pref.theme; store.set('theme', state.theme); }
  await loadData();
  toast(t('importDone'));
}

$('#import-file').addEventListener('change', e => { const f = e.target.files[0]; e.target.value = ''; if (f) importBackup(f); });

document.addEventListener('click', async e => {
  const b = e.target.closest('[data-action],[data-tab]');
  if (!b || b.closest('#sheet')) return;
  if (b.dataset.tab) {
    state.tab = b.dataset.tab; store.set('tab', state.tab);
    $('#search').value = ''; $('#suggestions').hidden = true;
    render(); scrollTo(0, 0);
    return;
  }
  const p = state.products.get(b.dataset.id);
  const d = +b.dataset.d;
  switch (b.dataset.action) {
    case 'lang': case 'set-lang': state.lang = b.dataset.lang || b.dataset.v; store.set('lang', state.lang); state.household ? render() : applyChrome(); break;
    case 'set-theme': state.theme = b.dataset.v; store.set('theme', state.theme === 'system' ? null : state.theme); render(); break;
    case 'forgot': {
      const email = $('#login-form').email.value.trim();
      if (!email) return toast(t('forgotNeedEmail'));
      try { await db.forgot(email); toast(t('forgotSent')); } catch (err) { toast(err.message); }
      break;
    }
    case 'pick': pick(p); break;
    case 'pick-new': pickNew(); break;
    case 'toggle': product(p.id, { done: !p.done }); break;
    case 'list-qty': if (p.list_qty + d >= 1) product(p.id, { list_qty: p.list_qty + d }); else product(p.id, { on_list: false, done: false, list_qty: 1 }); break;
    case 'unlist': product(p.id, { on_list: false, done: false, list_qty: 1 }); break;
    case 'list': product(p.id, { on_list: true, done: false, list_qty: 1 }); toast(t('added', label(p))); break;
    case 'stock-qty': changeStock(p, d); break;
    case 'add-low': addLow(); break;
    case 'finish': finish(); break;
    case 'shop-start': setShopping(true); break;
    case 'shop-close': setShopping(false); break;
    case 'edit': openProduct(p); break;
    case 'new-product': {
      const q = $('#search').value.trim();
      const np = newProduct({ de: q, es: q });
      openProduct(np, true);
      const submit = sheetForm.onsubmit;
      sheetForm.onsubmit = ev => { state.products.set(np.id, np); submit(ev); };
      break;
    }
    case 'categories': openCategories(); break;
    case 'invite': try { state.invite = await db.createInvite(); render(); } catch (err) { toast(err.message); } break;
    case 'join': {
      const code = prompt(`${t('joinPrompt')}\n${t('joinWarn')}`);
      if (!code) return;
      try {
        state.household = await db.join(code.trim());
        await loadData();
        db.subscribe(state.household, onRemote, ok => { state.live = ok; renderSync(); });
        state.members = await db.members();
        render(); toast(t('joined'));
      } catch (err) { toast(err.message); }
      break;
    }
    case 'export': exportBackup(); break;
    case 'import': $('#import-file').click(); break;
    case 'logout': setShopping(false); await db.logout(); state.household = null; state.products = new Map(); state.categories = []; break;
  }
});

let toastTimer;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

addEventListener('online', renderSync);
addEventListener('offline', renderSync);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) return;
  if (state.household) loadData().catch(() => {});
  if (state.shopping) keepAwake(true);
});
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyChrome);
applyChrome();
