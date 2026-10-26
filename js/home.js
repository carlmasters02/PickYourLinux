// ─── Home: lineage graph, tree view, quick look, family overview ────────────

(() => {
  const graphEl = document.getElementById("graph");
  const treeEl = document.getElementById("tree");
  const peekEl = document.getElementById("peek");
  const viewBtns = [...document.querySelectorAll("[data-view]")];
  const { esc, logo, distroURL } = PYL;

  const descendantsOf = id => childrenOf(id).flatMap(c => [c, ...descendantsOf(c.id)]);

  // ── View switching ──────────────────────────────────────────────────────
  const narrow = matchMedia("(max-width: 680px)").matches;
  const fromHash = { "#tree": "tree", "#graph": "graph" }[location.hash];
  let view = fromHash || PYL.store.get("pyl-view", narrow ? "tree" : "graph");
  function setView(v) {
    view = v;
    PYL.store.set("pyl-view", v);
    if (location.hash !== `#${v}` && (location.hash === "#tree" || location.hash === "#graph")) history.replaceState(null, "", `#${v}`);
    viewBtns.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.view === v)));
    graphEl.hidden = v !== "graph";
    treeEl.hidden = v !== "tree";
    closePeek();
    if (v === "graph") Graph.ensure();
  }
  viewBtns.forEach(b => b.addEventListener("click", () => setView(b.dataset.view)));

  // ── Quick look ──────────────────────────────────────────────────────────
  let peekReturnFocus = null;
  function openPeek(id, returnFocus) {
    const d = DISTRO_BY_ID[id];
    const inCompare = PYL.compare.has(id);
    peekReturnFocus = returnFocus || null;
    peekEl.dataset.family = d.family;
    peekEl.innerHTML = `
      <button class="icon-btn close" type="button" aria-label="Close">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="m5 5 10 10M15 5 5 15"/></svg>
      </button>
      <div class="peek-head">${logo(id, 40)}<div><h3>${esc(d.name)}</h3><p>${esc(d.tagline)}</p></div></div>
      ${PYL.lineageHTML(id)}
      <p class="desc">${esc(d.relation)}.</p>
      <dl class="facts">
        <dt>Desktop</dt><dd>${esc(d.desktop)}</dd>
        <dt>Packages</dt><dd>${esc(d.pkg)}</dd>
        <dt>Updates</dt><dd>${esc(d.release)}</dd>
        <dt>Difficulty</dt><dd>${PYL.pips(d.difficulty)}<span class="pips-label">${DIFFICULTY_LABELS[d.difficulty]}</span></dd>
      </dl>
      <div class="actions">
        <a class="btn btn-primary btn-sm" href="${distroURL(id)}">Read about ${esc(d.name)}</a>
        <button class="btn btn-sm" type="button" data-compare aria-pressed="${inCompare}">${inCompare ? "Added to compare" : "Add to compare"}</button>
      </div>`;
    peekEl.hidden = false;
    peekEl.querySelector(".close").addEventListener("click", closePeek);
    peekEl.querySelector("[data-compare]").addEventListener("click", e => {
      const on = PYL.compare.toggle(id);
      e.currentTarget.setAttribute("aria-pressed", String(on));
      e.currentTarget.textContent = on ? "Added to compare" : "Add to compare";
    });
    peekEl.querySelector(".close").focus({ preventScroll: true });
  }
  function closePeek() {
    if (peekEl.hidden) return;
    peekEl.hidden = true;
    Graph.clearActive();
    peekReturnFocus?.focus({ preventScroll: true });
    peekReturnFocus = null;
  }
  document.addEventListener("keydown", e => { if (e.key === "Escape") closePeek(); });

  // ── Graph ───────────────────────────────────────────────────────────────
  const Graph = (() => {
    let built = false, svg, world, zoom, sim, nodeSel, edgeSel, nodes, links, userMoved = false;

    // The layout "world" takes the stage's aspect ratio so the forces fill the
    // whole canvas. Roots are pinned along the top; independents sit in a
    // framed grid in the bottom-right corner.
    const WORLD_W = 1400;
    let W, H, INDEP_BOX;

    function layout() {
      const { width, height } = graphEl.getBoundingClientRect();
      W = WORLD_W;
      H = Math.round(Math.min(1150, Math.max(760, W * (height / Math.max(width, 1)))));
      const ROOT_X = { debian: W * 0.24, fedora: W * 0.6, arch: W * 0.84 };
      INDEP_BOX = { x: W * 0.62, y: H - 210, cols: 4, dx: 112, dy: 112 };
      const indepRect = { x0: INDEP_BOX.x - 100, y0: INDEP_BOX.y - 165 };

      nodes = DISTROS.map(d => {
        const depth = lineageOf(d.id).length - 1;
        const root = !d.parent && d.family !== "independent";
        return { id: d.id, d, depth, root, r: root ? 34 : childrenOf(d.id).length >= 3 ? 28 : 23 };
      });
      const byId = Object.fromEntries(nodes.map(n => [n.id, n]));

      // Deterministic starting positions: a radial tree below each root, where
      // every branch gets an arc proportional to its size. The force pass then
      // only has to relax it, so branches don't tangle.
      const size = id => 1 + childrenOf(id).reduce((a, c) => a + size(c.id), 0);
      for (const [fam, x] of Object.entries(ROOT_X)) {
        const n = byId[fam];
        n.x = n.fx = x; n.y = n.fy = 70;
      }
      const seed = (id, a0, a1, depth, root) => {
        const kids = childrenOf(id);
        const total = kids.reduce((a, k) => a + size(k.id), 0);
        let a = a0;
        for (const k of kids) {
          const span = (a1 - a0) * size(k.id) / total;
          const mid = a + span / 2, rad = 190 + (depth - 1) * 150;
          byId[k.id].x = root.x - Math.cos(mid) * rad;
          byId[k.id].y = root.y + Math.sin(mid) * rad;
          seed(k.id, a, a + span, depth + 1, root);
          a += span;
        }
      };
      for (const fam of Object.keys(ROOT_X)) seed(fam, Math.PI * 0.06, Math.PI * 0.94, 1, byId[fam]);

      nodes.filter(n => n.d.family === "independent").forEach((n, i) => {
        n.x = n.fx = INDEP_BOX.x + (i % INDEP_BOX.cols) * INDEP_BOX.dx;
        n.y = n.fy = INDEP_BOX.y + Math.floor(i / INDEP_BOX.cols) * INDEP_BOX.dy;
      });

      links = DISTROS.filter(d => d.parent).map(d => ({ source: d.parent, target: d.id, type: d.link, family: d.family }));

      // Keep free nodes inside the world and out of the independents' frame.
      const contain = () => {
        for (const n of nodes) {
          if (n.fx != null) continue;
          n.x = Math.max(50, Math.min(W - 50, n.x));
          n.y = Math.max(170, Math.min(H - 50, n.y));
          if (n.x > indepRect.x0 && n.y > indepRect.y0) {
            if (n.x - indepRect.x0 < n.y - indepRect.y0) n.x = indepRect.x0; else n.y = indepRect.y0;
          }
        }
      };
      sim = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(n => n.id).distance(l => l.target.depth === 1 ? 150 : 118).strength(0.55))
        .force("charge", d3.forceManyBody().strength(n => n.root ? -1200 : -520).distanceMax(460))
        .force("collide", d3.forceCollide(n => n.r + 32).iterations(3))
        .force("y", d3.forceY(n => 70 + n.depth * 210).strength(n => n.d.family === "independent" ? 0 : 0.09))
        .force("x", d3.forceX(n => ROOT_X[n.d.family] ?? 0).strength(n => n.d.family === "independent" ? 0 : 0.02))
        .force("contain", contain)
        .stop();
      for (let i = 0; i < 700; i++) sim.tick();
    }

    // A distro mark inside the SVG: <image> for full-colour files, nested <svg> for inline marks.
    function logoSVG(id, size) {
      const L = LOGOS[id], h = size / 2;
      if (L.img) return `<image href="${L.img}" x="${-h}" y="${-h}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet"/>`;
      const vars = [L.c && `--logo-c:${L.c}`, (L.d || L.c) && `--logo-d:${L.d || L.c}`].filter(Boolean).join(";");
      return `<svg class="logo" x="${-h}" y="${-h}" width="${size}" height="${size}" viewBox="${L.vb}" style="${vars}">${L.body}</svg>`;
    }

    // Centre to centre with a slight bow; discs are drawn on top so the ends are hidden.
    const linkPath = l => {
      const sx = l.source.x, sy = l.source.y, tx = l.target.x, ty = l.target.y;
      const mx = (sx + tx) / 2, my = (sy + ty) / 2;
      const bow = 0.12;
      return `M${sx},${sy}Q${mx - (ty - sy) * bow},${my + (tx - sx) * bow} ${tx},${ty}`;
    };

    function render() {
      const NS = "http://www.w3.org/2000/svg";
      svg = d3.select(graphEl).insert("svg", ":first-child").attr("role", "group").attr("aria-label", "Distro family graph");
      world = svg.append("g").attr("class", "reveal-graph");

      // Independent group frame
      const ib = INDEP_BOX, rows = Math.ceil(nodes.filter(n => n.d.family === "independent").length / ib.cols);
      const frame = world.append("g").attr("data-family", "independent");
      frame.append("rect").attr("class", "group-box")
        .attr("x", ib.x - 62).attr("y", ib.y - 92).attr("rx", 14)
        .attr("width", (ib.cols - 1) * ib.dx + 124).attr("height", (rows - 1) * ib.dy + 150);
      frame.append("text").attr("class", "group-label").attr("x", ib.x - 46).attr("y", ib.y - 64)
        .text("Independent: not built on another distro");

      edgeSel = world.append("g").selectAll("path").data(links).join("path")
        .attr("class", l => `edge ${l.type}`)
        .attr("data-family", l => l.family)
        .style("--d", l => 120 + l.target.depth * 140);

      nodeSel = world.append("g").selectAll("g").data(nodes).join("g")
        .attr("class", n => `node${n.root ? " root" : ""}`)
        .attr("data-family", n => n.d.family)
        .attr("data-id", n => n.id)
        .attr("tabindex", 0)
        .attr("role", "button")
        .attr("aria-label", n => `${n.d.name}. ${n.d.parent ? "Built on " + DISTRO_BY_ID[n.d.parent].name : n.root ? "Root of the " + n.d.name + " family" : "Independent"}.`)
        .style("--d", n => n.d.family === "independent" ? 500 : n.depth * 140);

      nodeSel.each(function (n) {
        const g = this, size = n.root ? 40 : n.r > 23 ? 31 : 26;
        const disc = document.createElementNS(NS, "circle");
        disc.setAttribute("class", "disc"); disc.setAttribute("r", n.r);
        g.appendChild(disc);
        g.insertAdjacentHTML("beforeend", logoSVG(n.id, size));
        const label = document.createElementNS(NS, "text");
        label.setAttribute("class", "label"); label.setAttribute("text-anchor", "middle");
        label.setAttribute("y", n.r + 19); label.textContent = n.d.name;
        g.appendChild(label);
        if (n.root) {
          const sub = document.createElementNS(NS, "text");
          sub.setAttribute("class", "sub"); sub.setAttribute("text-anchor", "middle");
          sub.setAttribute("y", n.r + 39);
          sub.textContent = `Since ${n.d.since}, ${descendantsOf(n.id).length} descendants`;
          g.appendChild(sub);
        }
      });

      positions();

      // Interaction: hover/focus traces lineage; click opens quick look.
      nodeSel
        .on("mouseenter focus", (e, n) => highlight(n.id))
        .on("mouseleave blur", () => highlight(activeId))
        .on("click", (e, n) => activate(n.id, e.currentTarget))
        .on("keydown", (e, n) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(n.id, e.currentTarget); } });

      nodeSel.call(d3.drag()
        .filter(e => !e.button && e.pointerType !== "touch")
        .on("start", (e, n) => { if (n.root || n.d.family === "independent") return; sim.alphaTarget(0.25).restart(); n.fx = n.x; n.fy = n.y; })
        .on("drag", (e, n) => { if (n.root || n.d.family === "independent") return; n.fx = e.x; n.fy = e.y; })
        .on("end", (e, n) => { if (n.root || n.d.family === "independent") return; sim.alphaTarget(0); n.fx = null; n.fy = null; }));
      sim.on("tick", positions);

      zoom = d3.zoom().scaleExtent([0.3, 3])
        .on("zoom", e => { world.attr("transform", e.transform); if (e.sourceEvent) userMoved = true; });
      svg.call(zoom).on("dblclick.zoom", null);
      svg.on("click", e => { if (e.target === svg.node()) closePeek(); });

      graphEl.querySelectorAll("[data-zoom]").forEach(b => b.addEventListener("click", () => {
        const z = b.dataset.zoom;
        if (z === "fit") { userMoved = false; fit(true); }
        else svg.transition().duration(250).call(zoom.scaleBy, z === "in" ? 1.3 : 1 / 1.3);
      }));

      let resizeTimer;
      new ResizeObserver(() => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { if (!userMoved) fit(false); }, 80); }).observe(graphEl);
      fit(false);
    }

    function positions() {
      nodeSel.attr("transform", n => `translate(${n.x},${n.y})`);
      edgeSel.attr("d", linkPath);
    }

    function fit(animate) {
      const { width, height } = graphEl.getBoundingClientRect();
      if (!width || !height) return;
      const box = world.node().getBBox();
      const pad = 28;
      const k = Math.min((width - pad * 2) / box.width, (height - pad * 2) / box.height, 1.15);
      const t = d3.zoomIdentity
        .translate(width / 2, height / 2)
        .scale(k)
        .translate(-(box.x + box.width / 2), -(box.y + box.height / 2));
      (animate ? svg.transition().duration(350) : svg).call(zoom.transform, t);
    }

    // Lineage: ancestors and descendants of a node.
    let activeId = null;
    function highlight(id) {
      if (!id) {
        graphEl.classList.remove("focusing");
        nodeSel.classed("lit", false); edgeSel.classed("lit", false);
        return;
      }
      const lit = new Set([...lineageOf(id), ...descendantsOf(id)].map(d => d.id));
      graphEl.classList.add("focusing");
      nodeSel.classed("lit", n => lit.has(n.id));
      edgeSel.classed("lit", l => lit.has(l.source.id) && lit.has(l.target.id));
    }
    function activate(id, el) {
      activeId = id;
      nodeSel.classed("active", n => n.id === id);
      highlight(id);
      openPeek(id, el);
    }
    function clearActive() {
      activeId = null;
      nodeSel?.classed("active", false);
      if (nodeSel) highlight(null);
    }

    return {
      ensure() {
        if (built) return;
        built = true;
        layout();
        render();
      },
      clearActive,
    };
  })();

  // ── Tree view (static HTML, works as the accessible/mobile view) ────────
  function branch(id) {
    const kids = childrenOf(id);
    if (!kids.length) return "";
    return `<ul class="branch">${kids.map(k => `
      <li class="${k.link}">
        <a class="leaf" href="${distroURL(k.id)}" title="${esc(k.relation)}">${logo(k.id, 22)}<span class="name">${esc(k.name)}</span><span class="rel">${esc(k.relation)}</span></a>
        ${branch(k.id)}
      </li>`).join("")}</ul>`;
  }
  function rootHead(d, note) {
    return `<a class="tree-root" href="${distroURL(d.id)}">${logo(d.id, 36)}<div><h3>${esc(d.name)}</h3><span class="faint">${note}</span></div></a>`;
  }
  const indep = DISTROS.filter(d => d.family === "independent");
  treeEl.innerHTML = ["debian", "fedora", "arch"].map(f => {
    const d = DISTRO_BY_ID[f];
    return `<div class="tree-col${f === "debian" ? " wide" : ""}" data-family="${f}">
      ${rootHead(d, `Since ${d.since}. ${descendantsOf(f).length} descendants listed.`)}
      ${branch(f)}
    </div>`;
  }).join("") + `
    <div class="tree-col indep" data-family="independent">
      <div class="tree-root"><div><h3>Independent</h3><span class="faint">Not built on another distro</span></div></div>
      <ul class="indep-list">${indep.map(d => `<li><a class="leaf" href="${distroURL(d.id)}" title="${esc(d.tagline)}">${logo(d.id, 22)}<span class="name">${esc(d.name)}</span></a></li>`).join("")}</ul>
    </div>`;

  // ── Family overview ─────────────────────────────────────────────────────
  document.getElementById("families").innerHTML = Object.values(FAMILIES).map(f => {
    const members = DISTROS.filter(d => d.family === f.id);
    return `<article class="family" data-family="${f.id}">
      <h3><span class="swatch" aria-hidden="true"></span>${esc(f.name)}</h3>
      <p>${esc(f.blurb)}</p>
      <p class="count">${members.length} distros${f.since ? `, root released ${f.since}` : ""}</p>
      <div class="members">${members.map(d => `<a href="${distroURL(d.id)}" title="${esc(d.name)}" aria-label="${esc(d.name)}">${logo(d.id, 20)}</a>`).join("")}</div>
    </article>`;
  }).join("");

  setView(view);
})();
