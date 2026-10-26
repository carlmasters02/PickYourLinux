// ─── PickYourLinux · Shared helpers and header behaviour ─────────────────────
// Loaded on every page after data.js and logos.js. Exposes a small PYL namespace.

const PYL = (() => {
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); }
      catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
    },
  };

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function logo(id, size = 24, cls = "") {
    const L = LOGOS[id];
    if (!L) return "";
    if (L.img) {
      return `<img class="logo ${cls}" src="${L.img}" width="${size}" height="${size}" alt="" loading="lazy" decoding="async">`;
    }
    const vars = [L.c && `--logo-c:${L.c}`, (L.d || L.c) && `--logo-d:${L.d || L.c}`].filter(Boolean).join(";");
    return `<svg class="logo ${cls}" viewBox="${L.vb}" width="${size}" height="${size}" aria-hidden="true" style="${vars}">${L.body}</svg>`;
  }

  function pips(level) {
    let html = `<span class="pips" role="img" aria-label="Difficulty ${level} of 5: ${DIFFICULTY_LABELS[level]}">`;
    for (let i = 1; i <= 5; i++) html += `<i class="${i <= level ? "on" : ""}"></i>`;
    return html + "</span>";
  }

  const distroURL = id => `distro.html?id=${encodeURIComponent(id)}`;

  function basedOn(d) {
    if (!d.parent) return d.family === "independent" ? "Independent" : "Original";
    return DISTRO_BY_ID[d.parent].name;
  }

  // Root → … → distro, as a breadcrumb. Dashed joints mark "rebuilt from source".
  function lineageHTML(id) {
    const chain = lineageOf(id);
    return `<ol class="lineage" aria-label="Lineage">` + chain.map((d, i) => {
      const cur = i === chain.length - 1;
      const cls = d.link === "source" ? ' class="source"' : "";
      const inner = `${logo(d.id, 16)}<span>${esc(d.name)}</span>`;
      return `<li${cls}>${cur ? `<span aria-current="page" style="display:inline-flex;align-items:center;gap:6px">${inner}</span>` : `<a href="${distroURL(d.id)}">${inner}</a>`}</li>`;
    }).join("") + `</ol>`;
  }

  // ── Compare selection (persists across pages) ──
  const COMPARE_MAX = 4;
  const compareListeners = new Set();
  const compare = {
    max: COMPARE_MAX,
    get: () => store.get("pyl-compare", []).filter(id => DISTRO_BY_ID[id]),
    set(ids) {
      store.set("pyl-compare", [...new Set(ids)].slice(0, COMPARE_MAX));
      compareListeners.forEach(fn => fn(compare.get()));
    },
    has: id => compare.get().includes(id),
    toggle(id) {
      const ids = compare.get();
      if (ids.includes(id)) { compare.set(ids.filter(x => x !== id)); return false; }
      if (ids.length >= COMPARE_MAX) { toast(`You can compare up to ${COMPARE_MAX} distros at once.`); return false; }
      compare.set([...ids, id]);
      return true;
    },
    onChange: fn => compareListeners.add(fn),
  };
  window.addEventListener("storage", e => { if (e.key === "pyl-compare") compareListeners.forEach(fn => fn(compare.get())); });

  // ── Toast ──
  let toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
  }

  async function copy(text, label = "Copied") {
    try {
      await navigator.clipboard.writeText(text);
      toast(label);
    } catch {
      toast("Couldn't access the clipboard. Select the text and copy it manually.");
    }
  }

  const typingTarget = el => el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));

  return { store, esc, logo, pips, distroURL, basedOn, lineageHTML, compare, toast, copy, typingTarget };
})();

// Where the source lives. Every GitHub link on the site reads this one value.
const REPO_URL = "https://github.com/carlmasters02/PickYourLinux";
document.querySelectorAll("[data-repo]").forEach(a => { a.href = REPO_URL; });

// ─── Header: theme, menu, compare count, jump-to-distro ─────────────────────

(() => {
  const root = document.documentElement;

  // Theme: system → light → dark → system
  const themeBtn = document.getElementById("themeToggle");
  const ICONS = {
    system: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2.5" y="3.5" width="15" height="10" rx="1.5"/><path d="M7 17h6M10 13.5V17"/></svg>',
    light:  '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="10" cy="10" r="3.5"/><path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M4 4l1.4 1.4M14.6 14.6 16 16M4 16l1.4-1.4M14.6 5.4 16 4"/></svg>',
    dark:   '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M16.5 12.2A7 7 0 0 1 7.8 3.5a7 7 0 1 0 8.7 8.7Z"/></svg>',
  };
  function applyTheme(mode) {
    if (mode === "system") delete root.dataset.theme; else root.dataset.theme = mode;
    if (themeBtn) {
      themeBtn.innerHTML = ICONS[mode];
      themeBtn.setAttribute("aria-label", `Theme: ${mode}. Click to change.`);
      themeBtn.title = `Theme: ${mode}`;
    }
    document.dispatchEvent(new CustomEvent("pyl:theme"));
  }
  let mode = PYL.store.get("pyl-theme-mode", "system");
  applyTheme(mode);
  themeBtn?.addEventListener("click", () => {
    mode = { system: "light", light: "dark", dark: "system" }[mode];
    PYL.store.set("pyl-theme-mode", mode);
    applyTheme(mode);
  });

  // Mobile menu
  const menuBtn = document.getElementById("menuToggle");
  const nav = document.getElementById("siteNav");
  menuBtn?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  // Compare count in the nav
  const countEl = document.getElementById("compareCount");
  const renderCount = ids => {
    if (!countEl) return;
    countEl.textContent = ids.length;
    countEl.hidden = ids.length === 0;
  };
  renderCount(PYL.compare.get());
  PYL.compare.onChange(renderCount);

  // Jump-to-distro combobox
  const input = document.getElementById("jumpInput");
  const list = document.getElementById("jumpList");
  if (!input || !list) return;
  let matches = [], active = -1;

  function search(q) {
    q = q.trim().toLowerCase();
    if (!q) return [];
    const starts = [], contains = [];
    for (const d of DISTROS) {
      const hay = `${d.name} ${d.id}`.toLowerCase();
      if (hay.startsWith(q) || d.name.toLowerCase().split(/[\s!_]+/).some(w => w.startsWith(q))) starts.push(d);
      else if (hay.includes(q) || d.tagline.toLowerCase().includes(q) || d.desktop.toLowerCase().includes(q)) contains.push(d);
    }
    return [...starts, ...contains].slice(0, 8);
  }
  function render() {
    if (!input.value.trim()) { close(); return; }
    list.hidden = false;
    input.setAttribute("aria-expanded", "true");
    if (!matches.length) {
      list.innerHTML = `<li class="empty" role="option" aria-disabled="true">No distro called “${PYL.esc(input.value.trim())}”</li>`;
      return;
    }
    list.innerHTML = matches.map((d, i) =>
      `<li role="option" id="jump-opt-${i}" data-id="${d.id}" aria-selected="${i === active}">${PYL.logo(d.id, 20)}<span>${PYL.esc(d.name)}</span><small>${PYL.esc(FAMILIES[d.family].name)}</small></li>`
    ).join("");
    input.setAttribute("aria-activedescendant", active >= 0 ? `jump-opt-${active}` : "");
  }
  function close() {
    list.hidden = true; active = -1;
    input.setAttribute("aria-expanded", "false");
    input.removeAttribute("aria-activedescendant");
  }
  const go = id => { location.href = PYL.distroURL(id); };

  input.addEventListener("input", () => { matches = search(input.value); active = matches.length ? 0 : -1; render(); });
  input.addEventListener("keydown", e => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (!matches.length) return;
      e.preventDefault();
      active = (active + (e.key === "ArrowDown" ? 1 : -1) + matches.length) % matches.length;
      render();
    } else if (e.key === "Enter" && matches[active]) {
      e.preventDefault(); go(matches[active].id);
    } else if (e.key === "Escape") {
      input.value = ""; close(); input.blur();
    }
  });
  input.addEventListener("blur", () => setTimeout(close, 120));
  list.addEventListener("mousedown", e => {
    const li = e.target.closest("li[data-id]");
    if (li) { e.preventDefault(); go(li.dataset.id); }
  });
  document.addEventListener("keydown", e => {
    if (e.key === "/" && !PYL.typingTarget(document.activeElement) && !e.metaKey && !e.ctrlKey) {
      if (getComputedStyle(input.parentElement).display === "none") return;
      e.preventDefault(); input.focus();
    }
  });
})();
