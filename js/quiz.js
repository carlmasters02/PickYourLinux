// ─── Quiz ────────────────────────────────────────────────────────────────────
// A staged quiz: the first answer picks a track (desktop, server, security…),
// each track asks its own questions in stages, and filter answers narrow the
// pool. Between stages that narrowed things, a checkpoint shows what's left.
// A finished quiz is shared as quiz.html#r=3<mode>.<answers>, where answers are
// one group per question in QUIZ_QUESTIONS order, separated by "-", each group
// being the chosen option indexes in base 36.

(() => {
  const { esc, logo, distroURL } = PYL;
  const root = document.getElementById("quiz");
  const Q = QUIZ_QUESTIONS;
  const MODES = {
    full:  { label: "Thorough", desc: "Every follow-up question that applies to you" },
    quick: { label: "Quick",    desc: "Just the questions that narrow the field" },
  };

  let mode = "full";
  let answers = {};
  let current = null;     // id of the question on screen
  let checkpoint = null;  // { after: qid of the last question in the stage, next: qid } while a checkpoint is showing

  // ── Encoding ──
  function encode() {
    const groups = Q.map(q => quizSelected(answers, q.id)
      .map(id => q.options.findIndex(o => o.id === id))
      .filter(i => i >= 0)
      .map(i => i.toString(36)).join(""));
    return `3${mode === "quick" ? "q" : "f"}.${groups.join("-")}`;
  }
  function decode(code) {
    const m = /^3([qf])\.(.*)$/.exec(code || "");
    if (!m) return null;
    const a = {};
    m[2].split("-").forEach((g, i) => {
      const q = Q[i];
      if (!q || !g) return;
      const ids = [...g].map(ch => q.options[Number.parseInt(ch, 36)]?.id).filter(Boolean);
      if (ids.length) a[q.id] = q.type === "multi" ? ids : ids[0];
    });
    return { mode: m[1] === "q" ? "quick" : "full", answers: a };
  }

  // ── Questions that currently apply ──
  const active = () => quizActiveQuestions(answers, mode);
  const answered = q => quizSelected(answers, q.id).length > 0;
  const complete = () => !!answers.track && active().every(answered);
  const byId = id => Q.find(q => q.id === id);
  const stageOf = q => quizStage(q, answers.track);
  const stageName = q => quizStageName(q, answers.track);
  const poolSize = (upTo = null) => quizPool(upTo ? quizAnswersBefore(answers, mode, upTo) : answers, mode).pool.length;

  function next() {
    const q = byId(current);
    if (!answered(q)) return;
    const list = active();
    const i = list.findIndex(x => x.id === current);
    const after = list.slice(i + 1).find(x => !answered(x)) || list[i + 1];
    // Pause at the end of a stage that narrowed the pool (and always after picking a track).
    const leavingStage = !after || stageOf(after) !== stageOf(q);
    if (leavingStage && after) {
      const first = list.find(x => stageOf(x) === stageOf(q));
      const before = q.id === "track" ? DISTROS.length : poolSize(first.id);
      if (q.id === "track" || poolSize(after.id) !== before) {
        checkpoint = { stageQ: q.id, firstQ: first.id, next: after.id, before };
        renderCheckpoint();
        return;
      }
    }
    if (after) { current = after.id; renderQuestion(); window.scrollTo({ top: 0 }); }
    else showResults();
  }
  function back() {
    if (checkpoint) { checkpoint = null; renderQuestion(); return; }
    const list = active();
    const i = list.findIndex(x => x.id === current);
    if (i > 0) { current = list[i - 1].id; renderQuestion(); }
    else renderStart();
  }

  // ── Shared pieces ──
  function progress(q, extra = "") {
    const list = active();
    const index = list.findIndex(x => x.id === q.id);
    const settled = answers.track && list.slice(0, 3).every(answered);
    const left = poolSize();
    const total = settled ? `${list.length}` : `about ${Math.max(list.length, 12)}`;
    return `<div class="quiz-progress">
      <div class="meta"><span>${esc(stageName(q))}</span><span>${extra || `Question ${index + 1} of ${total}`}${answers.track ? `, ${left} ${left === 1 ? "distro" : "distros"} left` : ""}</span></div>
      <div class="segments" style="--n:${list.length}" aria-hidden="true">${list.map((x, i) =>
        `<i class="${i < index ? "done" : i === index ? "now" : ""}${i > 0 && stageOf(x) !== stageOf(list[i - 1]) ? " gap" : ""}"></i>`).join("")}</div>
    </div>`;
  }
  const chip = (r, big = false) => {
    const ed = r.edition && !r.edition.single ? `<small>${esc(r.edition.edition.name)}</small>` : "";
    return big
      ? `<li class="lead-card" data-family="${r.distro.family}">${logo(r.distro.id, 36)}<span><strong>${esc(r.distro.name)}</strong>${ed}</span></li>`
      : `<li class="pool-chip" title="${esc(r.distro.name)}">${logo(r.distro.id, 18)}<span>${esc(r.distro.name)}</span></li>`;
  };

  // ── Start screen ──
  function renderStart() {
    current = null; checkpoint = null;
    root.innerHTML = `
      <header class="page-head" style="padding-top:0">
        <h1 tabindex="-1" id="startTitle">Find your distro</h1>
        <p>An operating system is a bigger commitment than an app. This quiz starts by working out what you're building, then asks only the questions that matter for that, narrowing the field in stages. At each stage you'll see which distros are still in the running.</p>
      </header>
      <ol class="how-stages" aria-label="How it works">
        <li><strong>Pick a track</strong><span>Desktop, server, security, privacy, gaming device or IoT</span></li>
        <li><strong>Narrow it down</strong><span>Hardware, skills, jobs and dealbreakers rule distros out</span></li>
        <li><strong>Fine-tune</strong><span>Preferences rank what's left and pick the right edition</span></li>
      </ol>
      <div class="mode-pick">
        <button class="mode" type="button" data-mode="full">
          <span class="mode-title">Thorough <span class="tag">Recommended</span></span>
          <span class="mode-meta">10 to 25 questions, depending on the track</span>
          <span class="mode-desc">${MODES.full.desc}. Choose this if you're switching your main computer or setting up a server you'll rely on.</span>
        </button>
        <button class="mode" type="button" data-mode="quick">
          <span class="mode-title">Quick</span>
          <span class="mode-meta">4 to 10 questions</span>
          <span class="mode-desc">${MODES.quick.desc}, for a fast first suggestion you can refine later.</span>
        </button>
      </div>`;
    root.querySelectorAll("[data-mode]").forEach(b => b.addEventListener("click", () => {
      mode = b.dataset.mode;
      answers = {};
      current = "track";
      renderQuestion();
    }));
  }

  // ── Question view ──
  function renderQuestion(focus = true) {
    checkpoint = null;
    const q = byId(current);
    const list = active();
    const index = list.findIndex(x => x.id === q.id);
    const multi = q.type === "multi";
    const chosen = quizSelected(answers, q.id);
    const options = q.visible ? q.options.filter(o => q.visible(answers).includes(o.id)) : q.options;
    const filtering = options.some(o => o.keep);

    root.innerHTML = `
      ${progress(q)}
      <form class="question" id="qform">
        <h1 id="qtitle" tabindex="-1">${esc(q.text)}</h1>
        <p class="hint">${esc(q.hint)}${filtering && q.id !== "track" ? ` <span class="filter-flag">Narrows the field</span>` : ""}</p>
        <fieldset class="options${multi ? " multi" : ""}" aria-labelledby="qtitle">
          ${options.map((o, i) => `
            <label class="option">
              <input type="${multi ? "checkbox" : "radio"}" name="opt" value="${o.id}" ${chosen.includes(o.id) ? "checked" : ""}>
              <span class="radio" aria-hidden="true"></span>
              <span class="label">${esc(o.label)}</span>
              ${o.desc ? `<span class="desc">${esc(o.desc)}</span>` : ""}
              ${i < 9 ? `<kbd aria-hidden="true">${i + 1}</kbd>` : ""}
            </label>`).join("")}
        </fieldset>
        <div class="quiz-nav">
          <button class="btn" type="button" id="backBtn">Back</button>
          <span class="spacer"></span>
          <span class="keys"><kbd>1</kbd>–<kbd>${Math.min(9, options.length)}</kbd> to ${multi ? "toggle" : "choose"}, <kbd>Enter</kbd> to continue</span>
          ${complete() && index < list.length - 1 ? `<button class="btn" type="button" id="resultsBtn">See results</button>` : ""}
          <button class="btn btn-primary" type="submit" id="nextBtn" ${chosen.length ? "" : "disabled"}>${index === list.length - 1 ? "See my results" : "Next"}</button>
        </div>
      </form>`;

    const form = document.getElementById("qform");
    let pointerPick = false;
    form.addEventListener("pointerdown", e => { if (e.target.closest(".option")) pointerPick = true; });
    form.addEventListener("change", e => {
      if (multi) setMulti(q, e.target.value, e.target.checked);
      else answers[q.id] = e.target.value;
      syncInputs(q);
      // Clicking a single-choice answer moves on; arrow keys and multi-choice don't.
      if (!multi && pointerPick && index < list.length - 1) setTimeout(next, 220);
      pointerPick = false;
    });
    form.addEventListener("submit", e => { e.preventDefault(); next(); });
    document.getElementById("backBtn").addEventListener("click", back);
    document.getElementById("resultsBtn")?.addEventListener("click", showResults);
    if (focus) document.getElementById("qtitle").focus({ preventScroll: true });
  }

  // Multi-choice: "exclusive" options (like "None of these") clear the others, and vice versa.
  function setMulti(q, id, on) {
    let picked = quizSelected(answers, q.id).filter(x => x !== id);
    if (on) {
      const exclusive = q.exclusive || [];
      picked = exclusive.includes(id) ? [] : picked.filter(x => !exclusive.includes(x));
      picked.push(id);
    }
    // Keep the original option order so encoding is stable.
    answers[q.id] = q.options.map(o => o.id).filter(x => picked.includes(x));
    if (!answers[q.id].length) delete answers[q.id];
  }
  function syncInputs(q) {
    const chosen = quizSelected(answers, q.id);
    document.querySelectorAll("#qform input[name=opt]").forEach(inp => { inp.checked = chosen.includes(inp.value); });
    document.getElementById("nextBtn").disabled = chosen.length === 0;
  }

  // ── Checkpoint between stages ──
  function renderCheckpoint() {
    const q = byId(checkpoint.stageQ);
    const nextQ = byId(checkpoint.next);
    const { ranked, steps } = scoreDistros(answers, mode, checkpoint.next);
    const after = ranked.length, before = checkpoint.before;
    const relaxed = steps.filter(s => s.relaxed && active().findIndex(x => x.id === s.qid) >= active().findIndex(x => x.id === checkpoint.firstQ));
    const isTrack = q.id === "track";
    const title = after === 1 ? `Only ${ranked[0].distro.name} fits so far`
      : isTrack ? `${after} distros can do this`
      : `${after} distros still fit`;
    const sub = isTrack
      ? `Out of ${DISTROS.length} on the site. Next up: ${stageName(nextQ).toLowerCase()}.`
      : `Your answers about ${stageName(q).toLowerCase()} ruled out ${before - after} of ${before}. Next up: ${stageName(nextQ).toLowerCase()}.`;
    const leaders = ranked.slice(0, Math.min(3, ranked.length));
    const rest = ranked.slice(leaders.length);
    const shown = rest.slice(0, 18);

    root.innerHTML = `
      ${progress(q, "Checkpoint")}
      <section class="checkpoint" aria-labelledby="cpTitle">
        <h1 id="cpTitle" tabindex="-1">${esc(title)}</h1>
        <p class="hint">${esc(sub)}</p>
        ${relaxed.length ? `<p class="relaxed">Nothing matched every answer in this stage, so the closest options were kept instead of ruling everything out.</p>` : ""}
        <h2 class="cp-label">${after === 1 ? "The only match" : "Leading so far"}</h2>
        <ul class="leaders">${leaders.map(r => chip(r, true)).join("")}</ul>
        ${shown.length ? `<h2 class="cp-label">Also still in</h2>
          <ul class="pool">${shown.map(r => chip(r)).join("")}${rest.length > shown.length ? `<li class="pool-more">and ${rest.length - shown.length} more</li>` : ""}</ul>` : ""}
        <div class="quiz-nav">
          <button class="btn" type="button" id="cpBack">Back</button>
          <span class="spacer"></span>
          <button class="btn" type="button" id="cpResults">See results now</button>
          <button class="btn btn-primary" type="button" id="cpNext">Continue to ${esc(stageName(nextQ).toLowerCase())}</button>
        </div>
      </section>`;
    document.getElementById("cpTitle").focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
    document.getElementById("cpBack").addEventListener("click", back);
    document.getElementById("cpResults").addEventListener("click", () => showResults(true));
    document.getElementById("cpNext").addEventListener("click", continueFromCheckpoint);
  }
  function continueFromCheckpoint() {
    current = checkpoint.next;
    checkpoint = null;
    renderQuestion();
    window.scrollTo({ top: 0 });
  }

  document.addEventListener("keydown", e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (checkpoint) {
      if (e.key === "Enter" && !e.target.closest("button, a")) { e.preventDefault(); continueFromCheckpoint(); }
      return;
    }
    const form = document.getElementById("qform");
    if (!form) return;
    if (PYL.typingTarget(document.activeElement) && !["radio", "checkbox"].includes(document.activeElement.type)) return;
    const q = byId(current);
    const inputs = [...form.querySelectorAll("input[name=opt]")];
    const n = Number.parseInt(e.key, 10);
    if (n >= 1 && n <= inputs.length) {
      e.preventDefault();
      const id = inputs[n - 1].value;
      if (q.type === "multi") {
        setMulti(q, id, !quizHas(answers, q.id, id));
        syncInputs(q);
      } else {
        answers[q.id] = id;
        const list = active();
        if (list.findIndex(x => x.id === q.id) < list.length - 1) next();
        else syncInputs(q);
      }
    } else if (e.key === "Enter" && !e.target.closest("button, a")) {
      // Buttons and links handle Enter themselves; anywhere else it means "continue".
      e.preventDefault();
      next();
    } else if (e.key === "Backspace" || (e.key === "ArrowLeft" && !["radio", "checkbox"].includes(document.activeElement?.type))) {
      e.preventDefault();
      back();
    }
  });

  // ── Results ──
  const fitBar = (fit, fam) =>
    `<span class="fit" data-family="${fam}"><span class="track" aria-hidden="true"><span class="fill" style="display:block;width:${fit}%"></span></span><span>Fit ${fit}</span></span>`;

  function funnel(steps) {
    return `<ol class="funnel">
      <li><span class="n">${DISTROS.length}</span><span>Every distro on the site</span></li>
      ${steps.map(s => `<li${s.relaxed ? ' class="loosened"' : ""}><span class="n">${s.after}</span><span>${esc(s.labels.join(", "))}${s.relaxed ? " (relaxed: nothing matched)" : ""}</span></li>`).join("")}
    </ol>`;
  }

  function showResults(early = false) {
    if (!early && !complete()) { current = active().find(q => !answered(q)).id; renderQuestion(); return; }
    checkpoint = null;
    history.replaceState(null, "", `#r=${encode()}`);

    const { ranked, steps, notes } = scoreDistros(answers, mode);
    const top = ranked[0], w = top.distro;
    const why = explainResult(top);
    if (ranked.length === 1) why.reasons.unshift("The only distro that fits all of your answers");
    // A distro's general drawbacks are written for desktop use, so only fall back to them there.
    const heads = why.caveats.length ? why.caveats : answers.track === "pc" ? [w.cons[0]] : [];
    const runners = ranked.slice(1, 5);
    const ed = top.edition && !top.edition.single ? top.edition.edition : null;
    const unanswered = active().filter(q => !answered(q)).length;

    const answerRows = active().filter(answered).map(q => {
      const labels = quizSelected(answers, q.id).map(id => q.options.find(o => o.id === id)?.label).filter(Boolean);
      return `<li><span>${esc(q.text)}</span><strong>${esc(labels.join(", "))}</strong><button type="button" data-edit="${q.id}">Change</button></li>`;
    }).join("");

    root.innerHTML = `
      <article class="result-hero" data-family="${w.family}">
        <div class="big-logo">${logo(w.id, 56)}</div>
        <div>
          <p class="eyebrow">Your best match for ${esc(QUIZ_TRACKS[answers.track].label.toLowerCase())}</p>
          <h1 id="resultTitle" tabindex="-1">${esc(w.name)}</h1>
          <p class="tagline">${esc(w.tagline)}</p>
          ${PYL.lineageHTML(w.id)}
        </div>
        ${ed ? `<div class="edition-pick"><span class="faint">Get this edition</span><strong>${esc(ed.name)}</strong><span>${esc(ed.desc)}</span></div>` : ""}
        <div class="body">
          <div><h3>Why it fits you</h3><ul class="ticks good">${why.reasons.slice(0, 4).map(r => `<li>${esc(r)}</li>`).join("")}</ul></div>
          ${heads.length ? `<div><h3>Worth knowing</h3><ul class="ticks bad">${heads.map(r => `<li>${esc(r)}</li>`).join("")}</ul></div>` : ""}
        </div>
        <div class="actions">
          <a class="btn btn-primary" href="${distroURL(w.id)}">Read about ${esc(w.name)}</a>
          ${runners.length ? `<a class="btn" href="compare.html?ids=${[w.id, ...runners.slice(0, 2).map(r => r.distro.id)].join(",")}">Compare the top ${Math.min(3, runners.length + 1)}</a>` : ""}
          <button class="btn" type="button" id="shareBtn">Copy link to results</button>
          <button class="btn btn-ghost" type="button" id="retakeBtn">Start over</button>
        </div>
      </article>

      ${early && unanswered ? `<p class="relaxed" style="margin-top:16px">You skipped ${unanswered} remaining ${unanswered === 1 ? "question" : "questions"}. <button class="btn btn-sm" type="button" id="finishBtn">Answer them</button></p>` : ""}

      ${notes.length ? `<section class="notes" aria-labelledby="notesTitle">
        <h2 id="notesTitle">Before you switch</h2>
        <ul>${notes.map(n => `<li>${esc(QUIZ_NOTES[n])}</li>`).join("")}</ul>
      </section>` : ""}

      <section style="margin-top:36px">
        <h2 style="font-size:var(--step-2)">${runners.length ? "Also worth a look" : "No close alternatives"}</h2>
        ${runners.length ? `<ul class="runners">${runners.map(r => {
          const ex = explainResult(r, 2);
          const red = r.edition && !r.edition.single ? `${r.edition.edition.name}. ` : "";
          return `<li><a class="runner" href="${distroURL(r.distro.id)}" data-family="${r.distro.family}">
            ${logo(r.distro.id, 32)}
            <span class="name">${esc(r.distro.name)}</span>
            <span class="why">${esc(red + (ex.reasons.join(". ") || r.distro.tagline))}</span>
            ${fitBar(r.fit, r.distro.family)}
          </a></li>`;
        }).join("")}</ul>` : ""}
        <p class="faint" style="margin-top:10px;font-size:var(--step--1)">${ranked.length < 5
          ? `Only ${ranked.length} ${ranked.length === 1 ? "distro fits" : "distros fit"} after narrowing. Change an answer below to widen the field.`
          : "Fit is relative to the other distros for your answers. 100 is the best match, not a guarantee."}</p>
      </section>

      <section class="narrowing" aria-labelledby="funnelTitle">
        <h2 id="funnelTitle">How we narrowed it down</h2>
        ${funnel(steps)}
      </section>

      <details class="answers">
        <summary>Your answers (${active().filter(answered).length}, ${MODES[mode].label.toLowerCase()} quiz)</summary>
        <ol>${answerRows}</ol>
        ${mode === "quick" ? `<p style="padding-bottom:16px"><button class="btn btn-sm" type="button" id="deeperBtn">Answer the follow-up questions too</button></p>` : ""}
      </details>`;

    document.getElementById("resultTitle").focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
    document.getElementById("shareBtn").addEventListener("click", () => PYL.copy(location.href, "Link copied"));
    document.getElementById("retakeBtn").addEventListener("click", () => {
      answers = {};
      history.replaceState(null, "", location.pathname);
      renderStart();
    });
    const resume = () => {
      current = (active().find(q => !answered(q)) || active()[0]).id;
      history.replaceState(null, "", location.pathname);
      renderQuestion();
    };
    document.getElementById("finishBtn")?.addEventListener("click", resume);
    document.getElementById("deeperBtn")?.addEventListener("click", () => { mode = "full"; resume(); });
    root.querySelectorAll("[data-edit]").forEach(b => b.addEventListener("click", () => {
      current = b.dataset.edit;
      history.replaceState(null, "", location.pathname);
      renderQuestion();
    }));
  }

  // A results link pasted into an open quiz tab only changes the hash.
  window.addEventListener("hashchange", () => {
    const linked = decode((/^#r=(.+)$/.exec(location.hash) || [])[1]);
    if (!linked) return;
    mode = linked.mode;
    answers = linked.answers;
    if (answers.track) showResults(true);
  });

  // ── Start: a shared results link opens the results; otherwise a fresh quiz ──
  // Progress isn't kept between visits: leaving the page and coming back starts over.
  function start() {
    const shared = decode((/^#r=(.+)$/.exec(location.hash) || [])[1]);
    if (shared && shared.answers.track) {
      mode = shared.mode;
      answers = shared.answers;
      showResults(true);
    } else {
      mode = "full";
      answers = {};
      renderStart();
    }
  }
  start();

  // Coming back with the browser's Back button can restore the page exactly as it was left.
  window.addEventListener("pageshow", e => { if (e.persisted) start(); });

  // Clear progress saved by earlier versions of the quiz.
  ["pyl-quiz", "pyl-quiz2", "pyl-quiz3"].forEach(key => { try { localStorage.removeItem(key); } catch { /* storage unavailable */ } });
})();
