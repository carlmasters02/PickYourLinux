// ─── Catalog: filter, sort, select for comparison ───────────────────────────

(() => {
  const { esc, logo, distroURL } = PYL;
  const $ = id => document.getElementById(id);
  const form = $("filters"), rowsEl = $("rows"), emptyEl = $("empty");

  const FAMILY_ORDER = ["debian", "fedora", "arch", "independent"];
  const USES = {
    beginner: d => d.scores.ease >= 8,
    gaming:   d => d.scores.gaming >= 8,
    dev:      d => d.scores.dev >= 8,
    server:   d => d.scores.server >= 8,
    old:      d => d.scores.lightweight >= 8,
    privacy:  d => d.scores.privacy >= 8,
    creative: d => d.scores.creative >= 6,
    tinker:   d => d.scores.customize >= 9,
    ai:       d => d.scores.ai >= 8,
    security: d => d.scores.security >= 8,
    handheld: d => d.scores.handheld >= 7,
    tiling:   d => d.scores.tiling >= 7,
    free:     d => d.scores.freedom >= 8,
  };
  const DIFFS = { easy: d => d.difficulty <= 2, mid: d => d.difficulty === 3, hard: d => d.difficulty >= 4 };

  // ── State lives in the URL so filtered views can be shared ──
  const params = new URLSearchParams(location.search);
  const state = {
    q: params.get("q") || "",
    use: params.get("use") || "",
    cycle: params.get("cycle") || "",
    diff: params.get("diff") || "",
    fam: new Set((params.get("fam") || "").split(",").filter(f => FAMILY_ORDER.includes(f))),
    sort: params.get("sort") || "family",
    dir: params.get("dir") === "desc" ? "desc" : "asc",
  };
  function syncURL() {
    const p = new URLSearchParams();
    if (state.q) p.set("q", state.q);
    if (state.use) p.set("use", state.use);
    if (state.cycle) p.set("cycle", state.cycle);
    if (state.diff) p.set("diff", state.diff);
    if (state.fam.size) p.set("fam", [...state.fam].join(","));
    if (state.sort !== "family") p.set("sort", state.sort);
    if (state.dir === "desc") p.set("dir", "desc");
    const qs = p.toString();
    history.replaceState(null, "", qs ? `?${qs}` : location.pathname);
  }

  // ── Controls ──
  $("q").value = state.q;
  $("use").value = state.use;
  $("cycle").value = state.cycle;
  $("diff").value = state.diff;

  const chips = $("famChips");
  chips.innerHTML = FAMILY_ORDER.map(f =>
    `<button class="chip" type="button" data-family="${f}" aria-pressed="${state.fam.has(f)}"><span class="swatch" aria-hidden="true"></span>${esc(FAMILIES[f].name)}</button>`
  ).join("");
  chips.addEventListener("click", e => {
    const b = e.target.closest("[data-family]");
    if (!b) return;
    const f = b.dataset.family;
    state.fam.has(f) ? state.fam.delete(f) : state.fam.add(f);
    b.setAttribute("aria-pressed", String(state.fam.has(f)));
    render();
  });

  form.addEventListener("submit", e => e.preventDefault());
  form.addEventListener("input", e => {
    if (e.target.id === "q") state.q = e.target.value.trim();
    if (["use", "cycle", "diff"].includes(e.target.id)) state[e.target.id] = e.target.value;
    render();
  });
  const reset = () => {
    Object.assign(state, { q: "", use: "", cycle: "", diff: "" });
    state.fam.clear();
    form.reset();
    chips.querySelectorAll("[data-family]").forEach(b => b.setAttribute("aria-pressed", "false"));
    render();
  };
  form.addEventListener("reset", e => { e.preventDefault(); reset(); });
  $("emptyReset").addEventListener("click", reset);

  document.querySelectorAll("th[data-sort] button").forEach(btn => btn.addEventListener("click", () => {
    const key = btn.parentElement.dataset.sort;
    if (state.sort === key) state.dir = state.dir === "asc" ? "desc" : "asc";
    else { state.sort = key; state.dir = "asc"; }
    render();
  }));

  // ── Filtering and sorting ──
  const treeOrder = Object.fromEntries(DISTROS.map((d, i) => [d.id, i]));
  const CYCLE_ORDER = { fixed: 0, atomic: 1, rolling: 2 };
  const comparators = {
    name: (a, b) => a.name.localeCompare(b.name),
    family: (a, b) => FAMILY_ORDER.indexOf(a.family) - FAMILY_ORDER.indexOf(b.family) || treeOrder[a.id] - treeOrder[b.id],
    cycle: (a, b) => CYCLE_ORDER[a.cycle] - CYCLE_ORDER[b.cycle] || a.name.localeCompare(b.name),
    difficulty: (a, b) => a.difficulty - b.difficulty || a.name.localeCompare(b.name),
  };

  function matches(d) {
    if (state.fam.size && !state.fam.has(d.family)) return false;
    if (state.use && !USES[state.use](d)) return false;
    if (state.cycle && d.cycle !== state.cycle) return false;
    if (state.diff && !DIFFS[state.diff](d)) return false;
    if (state.q) {
      const q = state.q.toLowerCase();
      const hay = [d.name, d.tagline, d.desktop, d.desktops.join(" "), d.pkg, d.init, d.relation, PYL.basedOn(d), FAMILIES[d.family].name, d.best_for.join(" "), d.editions.map(e => e.name).join(" ")].join(" ").toLowerCase();
      if (!q.split(/\s+/).every(t => hay.includes(t))) return false;
    }
    return true;
  }

  function row(d) {
    const checked = PYL.compare.has(d.id);
    return `<tr data-family="${d.family}">
      <td class="col-check"><input class="check" type="checkbox" data-id="${d.id}" ${checked ? "checked" : ""} aria-label="Compare ${esc(d.name)}"></td>
      <td><div class="who">${logo(d.id, 32)}<div><a href="${distroURL(d.id)}">${esc(d.name)}</a><p>${esc(d.tagline)}</p></div></div></td>
      <td data-label="Based on"><span class="tag" data-family="${d.family}"><span class="swatch" aria-hidden="true"></span>${esc(PYL.basedOn(d))}</span></td>
      <td data-label="Desktop">${esc(d.desktop)}</td>
      <td data-label="Packages"><span class="pkg">${esc(d.pkg)}</span></td>
      <td data-label="Updates">${esc(CYCLE_LABELS[d.cycle])}</td>
      <td data-label="Difficulty">${PYL.pips(d.difficulty)}<span class="pips-label">${DIFFICULTY_LABELS[d.difficulty]}</span></td>
    </tr>`;
  }

  function render() {
    const list = DISTROS.filter(matches).sort(comparators[state.sort]);
    if (state.dir === "desc") list.reverse();
    rowsEl.innerHTML = list.map(row).join("");
    emptyEl.hidden = list.length > 0;
    $("resultCount").textContent = list.length === DISTROS.length ? `${list.length} distros` : `${list.length} of ${DISTROS.length} distros`;
    document.querySelectorAll("th[data-sort]").forEach(th => {
      if (th.dataset.sort === state.sort) th.setAttribute("aria-sort", state.dir === "asc" ? "ascending" : "descending");
      else th.removeAttribute("aria-sort");
    });
    syncURL();
  }

  rowsEl.addEventListener("change", e => {
    const box = e.target.closest(".check");
    if (!box) return;
    const on = PYL.compare.toggle(box.dataset.id);
    box.checked = on;
  });

  // ── Compare tray ──
  function renderTray(ids) {
    const tray = $("tray");
    tray.hidden = ids.length === 0;
    $("trayLogos").innerHTML = ids.map(id => `<span title="${esc(DISTRO_BY_ID[id].name)}">${logo(id, 20)}</span>`).join("");
    $("trayText").textContent = ids.length === 1 ? "Pick one more to compare" : `${ids.length} selected`;
    const go = $("trayGo");
    go.href = `compare.html?ids=${ids.join(",")}`;
    go.textContent = ids.length > 1 ? `Compare ${ids.length}` : "Compare";
    go.toggleAttribute("aria-disabled", ids.length < 2);
    go.style.pointerEvents = ids.length < 2 ? "none" : "";
    go.style.opacity = ids.length < 2 ? ".5" : "";
    rowsEl.querySelectorAll(".check").forEach(b => { b.checked = ids.includes(b.dataset.id); });
  }
  $("trayClear").addEventListener("click", () => PYL.compare.set([]));
  PYL.compare.onChange(renderTray);
  renderTray(PYL.compare.get());

  $("catalogIntro").textContent = `All ${DISTROS.length} distributions on the site in one table. Filter by family, purpose or how they update, and tick up to four to compare side by side.`;
  render();
})();
