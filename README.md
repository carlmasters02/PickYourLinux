# PickYourLinux

A guide to choosing a Linux distribution. It shows how distros are related, starting from Debian, Fedora and Arch and following each branch down to the distros built on them. A staged quiz then narrows 56 distros down to the one, and the specific edition, that fits what you're setting up.

It's a static site: plain HTML, CSS and JavaScript with no build step, no framework, no cookies and no third-party requests. Fonts, logos and the one library it uses (d3) are all bundled.

## Features

- **Family tree.** An interactive graph of 56 distros and their parent distros. Line style shows whether a distro uses its parent's packages or rebuilds them. There's also a text tree view that works well on phones.
- **Staged quiz.** You first pick a track: a desktop or laptop, a server or homelab, a security toolkit, a private or anonymous system, a gaming handheld or TV PC, or a Raspberry Pi or IoT device. Each track asks its own questions in stages. Answers about hardware, skills, the job and dealbreakers rule distros out, and a checkpoint between stages shows what's left. Results recommend a distro and a specific edition, explain the reasons, list caveats and things to sort out before switching, and show how the field was narrowed. Results can be shared as a link.
- **Distro pages.** Each distro gets a page with its lineage, facts, editions and variants, install and update commands, and its relatives.
- **Catalog.** A sortable, filterable table of every distro. Filters are kept in the URL.
- **Compare.** Up to four distros side by side, shareable by link.
- Light and dark themes, keyboard shortcuts (`/` to jump to a distro, number keys in the quiz), and layouts that work at phone width.

## Running it locally

Open `index.html` in a browser. Everything works straight from disk.

If you'd rather serve it over HTTP:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Project structure

```
index.html     Home: introduction to Linux, the family tree, family overview
catalog.html   Filterable table of every distro
distro.html    One distro's page (distro.html?id=fedora)
compare.html   Side-by-side comparison (compare.html?ids=fedora,ubuntu)
quiz.html      The staged quiz

css/main.css   All styles: design tokens, light and dark themes, components

js/editions.js Editions and variants for every distro, with the roles and tags the quiz matches against
js/data.js     The distros, quiz profile scores and facts, quiz tracks and questions, scoring
js/logos.js    Distro logos: single-colour marks inlined as SVG, plus paths to full-colour image files
js/common.js   Shared helpers and header behaviour (theme, search, compare selection, GitHub link)
js/home.js     The family graph (d3 force layout), tree view and quick-look panel
js/catalog.js, js/distro.js, js/compare.js, js/quiz.js   Page logic

js/vendor/d3.min.js   d3 v7.9.0
fonts/                Fira Sans and Fira Code (woff2)
img/distros/          Full-colour distro logos
img/mark.svg          Site logo and favicon
```

Scripts load in this order on every page: `editions.js`, `data.js`, `logos.js`, `common.js`, then the page's own script.

## Adding or updating a distro

1. **`js/data.js`, `DISTROS`.** Add an entry with its family, parent and lineage link type (`"repo"` if it uses the parent's repositories, `"source"` if it rebuilds them). Fill in the facts, prose and base quiz `scores`. Entries are grouped by family.
2. **`js/data.js`, `QUIZ_PROFILE`.** Add a row with the extra quiz scores (AI, security, anonymity, handheld, tiling, atomic, support length, Windows/macOS feel, software freedom, NVIDIA ease) and the hard facts (systemd, Snap, company-run, FSF-endorsed, supported hardware).
3. **`js/editions.js`.** List its editions. Each edition's `roles` decide which quiz tracks the distro can appear in.
4. **`js/logos.js`.** Add a logo, either as an inline single-colour SVG with light- and dark-theme colours, or as a path to a file in `img/distros/`.

The family tree, catalog, compare page and quiz all read from this data, so nothing else needs changing.

## How the quiz decides

- **Narrowing.** Each track starts from every distro with an edition for that role. Answers marked "Narrows the field" remove distros that don't fit. If a filter would leave nothing, it's skipped and the results say so.
- **Ranking.** What's left is ranked by how well each distro's scores match what your answers asked for. Your main purpose counts double. Some answers point directly at a specific distro, and the reason is shown in the results, for example "The distro OffSec's courses and OSCP labs use".
- **Editions.** The recommended edition is the one whose tags best match your answers. Hardware and form-factor tags (NVIDIA, handheld, Raspberry Pi, Android) count for more than cosmetic ones.

The comments at the top of the quiz and scoring sections in `js/data.js` explain the model in more detail. The scores are editorial judgements, not benchmarks.

## Accuracy

Facts were checked in October 2026. Distros change quickly, especially edition lists, desktop defaults and hardware support. Corrections are welcome: open an issue or a pull request with a source.

## Credits

- Distro names and logos are trademarks of their respective projects and are used only to identify them. Marks come from [Simple Icons](https://simpleicons.org), [font-logos](https://github.com/lukas-w/font-logos), Wikimedia Commons and the projects' own websites.
- [d3](https://d3js.org) by Mike Bostock (ISC licence).
- [Fira Sans and Fira Code](https://github.com/mozilla/Fira) (SIL Open Font License).
