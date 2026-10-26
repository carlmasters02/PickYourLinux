// ─── Compare ─────────────────────────────────────────────────────────────────

(() => {
  const { esc, logo, distroURL } = PYL;
  const pickersEl = document.getElementById("pickers");
  const out = document.getElementById("compareOut");
  const FAMILY_ORDER = ["debian", "fedora", "arch", "independent"];

  // The link wins over the stored selection, so shared comparisons open as sent.
  const fromURL = (new URLSearchParams(location.search).get("ids") || "").split(",").filter(id => DISTRO_BY_ID[id]);
  if (fromURL.length) PYL.compare.set(fromURL);

  const STRENGTHS = [
    ["ease", "Ease of use"], ["gaming", "Gaming"], ["dev", "Development"], ["server", "Servers"],
    ["privacy", "Privacy"], ["lightweight", "Older hardware"], ["customize", "Customisation"], ["community", "Community size"],
    ["ai", "AI and ML"], ["security", "Security tools"], ["longevity", "Support length"], ["atomic", "Rollback safety"],
  ];

  function options(selected) {
    return `<option value="">Choose a distro</option>` + FAMILY_ORDER.map(f =>
      `<optgroup label="${esc(FAMILIES[f].name)}">${DISTROS.filter(d => d.family === f).map(d =>
        `<option value="${d.id}" ${d.id === selected ? "selected" : ""}>${esc(d.name)}</option>`).join("")}</optgroup>`
    ).join("");
  }

  function renderPickers(ids) {
    pickersEl.innerHTML = Array.from({ length: PYL.compare.max }, (_, i) =>
      `<label class="field"><span>Distro ${i + 1}</span><select class="select" data-slot="${i}">${options(ids[i])}</select></label>`
    ).join("") + `<div class="compare-reset"><button class="btn btn-ghost" type="button" id="resetCompare" ${ids.length ? "" : "disabled"}>Reset all</button></div>`;
    document.getElementById("resetCompare").addEventListener("click", () => PYL.compare.set([]));
  }
  pickersEl.addEventListener("change", e => {
    const sel = e.target.closest("select[data-slot]");
    if (!sel) return;
    const slots = [...pickersEl.querySelectorAll("select")].map(s => s.value);
    PYL.compare.set(slots.filter(Boolean));
  });

  const bar = (val, best, fam) =>
    `<div class="bar" data-family="${fam}"><div class="track"><div class="fill" style="width:${val * 10}%"></div></div><span class="num">${val}</span></div>`;

  function render(ids) {
    const qs = ids.length ? `?ids=${ids.join(",")}` : location.pathname;
    history.replaceState(null, "", qs);
    renderPickers(ids);

    if (ids.length < 2) {
      out.innerHTML = `<div class="panel empty-state">
        <p>${ids.length ? "Pick at least one more distro above to see them side by side." : "Pick two to four distros above, or tick them in the catalog."}</p>
        <a class="btn" href="catalog.html">Open the catalog</a>
      </div>`;
      return;
    }
    const ds = ids.map(id => DISTRO_BY_ID[id]);
    const cells = fn => ds.map(d => `<td>${fn(d)}</td>`).join("");
    const factRow = (label, fn) => `<tr><th scope="row">${label}</th>${cells(fn)}</tr>`;
    const group = label => `<tr class="group"><th scope="rowgroup" colspan="${ds.length + 1}">${label}</th></tr>`;
    const list = arr => `<ul>${arr.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`;

    const strengthRows = STRENGTHS.map(([key, label]) => {
      const best = Math.max(...ds.map(d => d.scores[key]));
      return `<tr><th scope="row">${label}</th>${ds.map(d =>
        `<td class="${d.scores[key] === best ? "best" : ""}">${bar(d.scores[key], best, d.family)}</td>`).join("")}</tr>`;
    }).join("");

    out.innerHTML = `<div class="compare-scroll"><table class="compare-table">
      <caption class="visually-hidden">Comparison of ${esc(ds.map(d => d.name).join(", "))}</caption>
      <thead><tr><th scope="col"><span class="visually-hidden">Attribute</span></th>${ds.map(d => `
        <th scope="col"><div class="head">
          <a href="${distroURL(d.id)}">${logo(d.id, 32)}<span>${esc(d.name)}</span></a>
          <p>${esc(d.tagline)}</p>
          <button class="btn btn-ghost btn-sm" type="button" data-remove="${d.id}" style="justify-self:start">Remove</button>
        </div></th>`).join("")}</tr></thead>
      <tbody>
        ${group("Basics")}
        ${factRow("Lineage", d => PYL.lineageHTML(d.id))}
        ${factRow("First release", d => d.since)}
        ${factRow("Default desktop", d => esc(d.desktop))}
        ${factRow("Packages", d => `<span class="mono">${esc(d.pkg)}</span>`)}
        ${factRow("Updates", d => esc(d.release))}
        ${factRow("Init system", d => esc(d.init))}
        ${factRow("Editions", d => d.editions.length > 1 ? list(d.editions.map(e => e.name)) : "One edition")}
        ${factRow("Difficulty", d => `${PYL.pips(d.difficulty)}<span class="pips-label">${DIFFICULTY_LABELS[d.difficulty]}</span>`)}
        ${group("Strengths, rated 0 to 10")}
        ${strengthRows}
        ${group("Trade-offs")}
        ${factRow("Pros", d => list(d.pros))}
        ${factRow("Cons", d => list(d.cons))}
        ${factRow("Good for", d => list(d.best_for))}
      </tbody>
    </table></div>
    <p class="faint" style="margin-top:12px;font-size:var(--step--1)">Strength ratings are this site's editorial judgement, used by the quiz. They're relative, not benchmarks.</p>`;
  }

  out.addEventListener("click", e => {
    const b = e.target.closest("[data-remove]");
    if (b) PYL.compare.set(PYL.compare.get().filter(id => id !== b.dataset.remove));
  });

  PYL.compare.onChange(render);
  render(PYL.compare.get());
})();
