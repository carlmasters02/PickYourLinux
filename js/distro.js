// ─── Distro page ─────────────────────────────────────────────────────────────

(() => {
  const { esc, logo, distroURL } = PYL;
  const page = document.getElementById("distroPage");
  const id = new URLSearchParams(location.search).get("id");
  const d = DISTRO_BY_ID[id];

  if (!d) {
    document.title = "Distro not found · PickYourLinux";
    page.innerHTML = `<div class="not-found">
      <h1>${id ? `There's no distro called “${esc(id)}” here` : "No distro selected"}</h1>
      <p class="muted">Find it in the catalog, or press <kbd>/</kbd> to search by name.</p>
      <a class="btn btn-primary" href="catalog.html">Open the catalog</a>
    </div>`;
    return;
  }

  document.title = `${d.name} · PickYourLinux`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", `${d.name}: ${d.tagline}. ${d.relation}.`);

  const parent = d.parent ? DISTRO_BY_ID[d.parent] : null;
  const kids = childrenOf(d.id);
  const siblings = parent ? childrenOf(parent.id).filter(s => s.id !== d.id) : [];

  const relationship = !parent
    ? (d.family === "independent" ? "Independent" : `Root of the ${FAMILIES[d.family].name} family`)
    : d.link === "repo"
      ? `Uses ${parent.name}'s package repositories, plus its own`
      : `Keeps its own repositories, rebuilt from ${parent.name}`;

  const isCommand = s => /^[a-z]/.test(s);
  const cmd = (label, text) => {
    if (!isCommand(text)) return `<div class="cmd"><span class="cmd-label">${label}</span><div class="cmd-box"><code class="plain">${esc(text)}</code></div></div>`;
    return `<div class="cmd"><span class="cmd-label">${label}</span><div class="cmd-box"><code>${esc(text)}</code><button class="copy" type="button" data-copy="${esc(text)}">Copy</button></div></div>`;
  };

  const relatedList = list => `<ul class="related">${list.map(x =>
    `<li><a href="${distroURL(x.id)}">${logo(x.id, 24)}<span>${esc(x.name)}</span><small>${esc(x.relation)}</small></a></li>`).join("")}</ul>`;

  const ROLE_LABELS = { desktop: "Desktop", server: "Server", security: "Security", privacy: "Privacy", gaming: "Gaming device", iot: "IoT and boards" };
  const manName = d.id.replace(/_/g, "-");
  const inCompare = PYL.compare.has(d.id);

  page.innerHTML = `
    <div class="man-head" aria-hidden="true"><span>${esc(manName)}(7)</span><span>PickYourLinux distro manual</span><span>${esc(manName)}(7)</span></div>

    <section class="distro-hero" data-family="${d.family}">
      <div class="big-logo">${logo(d.id, 60)}</div>
      <h1>${esc(d.name)}</h1>
      <p class="tagline">${esc(d.tagline)}</p>
      ${PYL.lineageHTML(d.id)}
      <div class="actions">
        <a class="btn btn-primary" href="${esc(d.web)}" rel="noopener" target="_blank">Official website
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3H3v10h10v-3M9 3h4v4M13 3 7 9"/></svg>
          <span class="visually-hidden">(opens in a new tab)</span></a>
        <button class="btn" type="button" id="compareBtn" aria-pressed="${inCompare}">${inCompare ? "Added to compare" : "Add to compare"}</button>
      </div>
    </section>

    <div class="distro-body">
      <div class="distro-main">
        <section>
          <h2 class="visually-hidden">Overview</h2>
          <p class="lead">${esc(d.desc)}</p>
        </section>
        <section>
          <h2>What stands out</h2>
          <ul class="ticks">${d.standouts.map(s => `<li>${esc(s)}</li>`).join("")}</ul>
        </section>
        ${d.editions.length > 1 ? `<section>
          <h2>Editions and variants</h2>
          <ul class="editions">${d.editions.map(e => `<li>
            <strong>${esc(e.name)}</strong>
            <span>${esc(e.desc)}</span>
            <span class="roles">${e.roles.map(r => `<span class="tag">${ROLE_LABELS[r]}</span>`).join("")}</span>
          </li>`).join("")}</ul>
        </section>` : ""}
        <section>
          <h2>Trade-offs</h2>
          <div class="two-up">
            <div><h3>Pros</h3><ul class="ticks good">${d.pros.map(s => `<li>${esc(s)}</li>`).join("")}</ul></div>
            <div><h3>Cons</h3><ul class="ticks bad">${d.cons.map(s => `<li>${esc(s)}</li>`).join("")}</ul></div>
          </div>
        </section>
        <section>
          <h2>Good for</h2>
          <ul class="pill-list">${d.best_for.map(s => `<li class="tag">${esc(s)}</li>`).join("")}</ul>
        </section>
        <section>
          <h2>Relatives</h2>
          ${parent ? `<div class="related-group"><h3>Built on</h3>${relatedList([parent])}</div>` : ""}
          ${kids.length ? `<div class="related-group"><h3>Built on ${esc(d.name)}</h3>${relatedList(kids)}</div>` : ""}
          ${siblings.length ? `<div class="related-group"><h3>Also built on ${esc(parent.name)}</h3>${relatedList(siblings)}</div>` : ""}
          ${!parent && !kids.length ? `<p class="muted">${esc(d.name)} isn't built on another distro, and none of the distros listed here are built on it.</p>` : ""}
        </section>
      </div>

      <aside class="distro-aside">
        <div class="panel">
          <h2>At a glance</h2>
          <dl class="facts">
            <dt>Family</dt><dd><span class="tag" data-family="${d.family}"><span class="swatch" aria-hidden="true"></span>${esc(FAMILIES[d.family].name)}</span></dd>
            <dt>Relationship</dt><dd>${esc(relationship)}</dd>
            <dt>First release</dt><dd>${d.since}</dd>
            <dt>Default desktop</dt><dd>${esc(d.desktop)}</dd>
            ${d.desktops.length > 1 ? `<dt>Also offers</dt><dd>${esc(d.desktops.filter(x => x !== d.desktop).join(", "))}</dd>` : ""}
            <dt>Packages</dt><dd>${esc(d.pkg)}</dd>
            <dt>Updates</dt><dd>${esc(d.release)}</dd>
            <dt>Init system</dt><dd>${esc(d.init)}</dd>
            <dt>Difficulty</dt><dd>${PYL.pips(d.difficulty)}<span class="pips-label">${DIFFICULTY_LABELS[d.difficulty]}</span></dd>
          </dl>
        </div>
        <div class="panel">
          <h2>In the terminal</h2>
          ${cmd("Install an app", d.install)}
          ${cmd("Update the system", d.update)}
        </div>
      </aside>
    </div>`;

  page.addEventListener("click", e => {
    const c = e.target.closest("[data-copy]");
    if (c) PYL.copy(c.dataset.copy, "Command copied");
  });
  const btn = document.getElementById("compareBtn");
  const syncBtn = () => {
    const on = PYL.compare.has(d.id);
    btn.setAttribute("aria-pressed", String(on));
    btn.textContent = on ? "Added to compare" : "Add to compare";
  };
  btn.addEventListener("click", () => { PYL.compare.toggle(d.id); syncBtn(); });
  PYL.compare.onChange(syncBtn);
})();
