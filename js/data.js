// ─── PickYourLinux · Distro data ─────────────────────────────────────────────
//
// Lineage
//   family  which root the distro descends from: debian | fedora | arch | independent
//   parent  id of the distro it is built on directly (null for roots and independents)
//   link    "repo"   — uses the parent's package repositories (plus its own extras)
//           "source" — maintains its own repositories, rebuilt from the parent
//
// Quiz scores (0–10): ease, gaming, dev, server, privacy, lightweight, customize,
//   rolling, terminal, gnome_de, kde_de, lite_de, community, enterprise, creative
//
// Facts checked October 2026. Version numbers are kept out of prose on purpose so
// the text doesn't go stale with every point release.

const FAMILIES = {
  debian: {
    id: "debian", name: "Debian", since: 1993,
    blurb: "The universal operating system. Debian's stable base and APT tooling underpin Ubuntu and most of the distros newcomers end up on.",
  },
  fedora: {
    id: "fedora", name: "Fedora", since: 2003,
    blurb: "Red Hat's community distro and the proving ground for RHEL. New Linux technology tends to ship here first.",
  },
  arch: {
    id: "arch", name: "Arch", since: 2002,
    blurb: "A minimal, rolling base you assemble yourself. Its derivatives add installers, defaults and tuning on top.",
  },
  independent: {
    id: "independent", name: "Independent", since: null,
    blurb: "Built from scratch with their own package formats and tooling, not derived from any of the big three.",
  },
};

const DISTROS = [

  // ══ Debian family ═══════════════════════════════════════════════════════════

  {
    id: "debian", name: "Debian", family: "debian", parent: null, link: null,
    relation: "The root of the family",
    since: 1993, web: "https://www.debian.org",
    tagline: "The universal operating system",
    desktop: "GNOME", desktops: ["GNOME", "KDE Plasma", "Xfce", "Cinnamon", "MATE", "LXQt"],
    pkg: "APT (.deb)", install: "sudo apt install firefox-esr", update: "sudo apt update && sudo apt upgrade",
    release: "Stable release roughly every two years", cycle: "fixed", init: "systemd",
    difficulty: 3,
    desc: "Debian is one of the oldest Linux distributions still in active development and is run entirely by volunteers under a published social contract. Its stable branch is frozen and tested for months before release, which makes it a favourite for servers and for anyone who values predictability over new features. The installer lets you pick any major desktop. Stable releases get about three years of security support, then two more years through Debian LTS.",
    standouts: ["Tens of thousands of packages in the official archive", "Stable, testing and unstable branches let you choose your pace", "Community-governed, with no company in charge", "Runs on more CPU architectures than almost any other distro"],
    pros: ["Rock-solid stability", "Five years of combined security support per release", "Huge documentation base shared with Ubuntu", "No vendor-specific tooling to learn"],
    cons: ["Stable ships older versions of desktop apps", "The installer asks more questions than Ubuntu's or Mint's", "Proprietary NVIDIA drivers take a few manual steps"],
    best_for: ["Servers", "Long-lived desktops", "Learning standard Linux", "Old and unusual hardware"],
    scores: { ease:5, gaming:4, dev:7, server:9, privacy:6, lightweight:5, customize:6, rolling:0, terminal:6, gnome_de:6, kde_de:5, lite_de:5, community:8, enterprise:7, creative:2 },
  },

  {
    id: "ubuntu", name: "Ubuntu", family: "debian", parent: "debian", link: "source",
    relation: "Rebuilt from Debian unstable every six months",
    since: 2004, web: "https://ubuntu.com",
    tagline: "The most widely used Linux distro",
    desktop: "GNOME", desktops: ["GNOME"],
    pkg: "APT + Snap", install: "sudo apt install vlc", update: "sudo apt update && sudo apt upgrade",
    release: "New release every six months; LTS every two years", cycle: "fixed", init: "systemd",
    difficulty: 1,
    desc: "Ubuntu is developed by Canonical and is the distro most software vendors, cloud providers and tutorials target first. It ships a lightly customised GNOME desktop and installs Snap alongside APT. Long-term support releases arrive every April of even years with five years of standard updates. A free Ubuntu Pro subscription for personal use extends that to ten, and paid add-ons go up to fifteen.",
    standouts: ["Default image on most clouds and for WSL", "Broadest third-party hardware and software certification", "Official flavours for KDE, LXQt, Budgie and creative work", "Ubuntu Pro is free for personal use on up to five machines"],
    pros: ["Almost every Linux guide is written for it", "Drivers and codecs installable from the installer", "Very predictable release schedule", "Commercial support exists if you ever need it"],
    cons: ["Snap packages can be slow to start on first launch", "Canonical's decisions are sometimes unpopular with the community", "Software is older than on Fedora or Arch"],
    best_for: ["Beginners", "Developers", "Cloud and DevOps work", "Students"],
    scores: { ease:9, gaming:6, dev:8, server:7, privacy:3, lightweight:2, customize:5, rolling:0, terminal:3, gnome_de:10, kde_de:0, lite_de:0, community:10, enterprise:6, creative:4 },
  },

  {
    id: "mint", name: "Linux Mint", family: "debian", parent: "ubuntu", link: "repo",
    relation: "Ubuntu LTS packages with Mint's own desktop and tools",
    since: 2006, web: "https://linuxmint.com",
    tagline: "A familiar desktop that stays out of your way",
    desktop: "Cinnamon", desktops: ["Cinnamon", "MATE", "Xfce"],
    pkg: "APT + Flatpak", install: "sudo apt install vlc", update: "sudo apt update && sudo apt upgrade",
    release: "Point releases on each Ubuntu LTS", cycle: "fixed", init: "systemd",
    difficulty: 1,
    desc: "Linux Mint builds on Ubuntu LTS and replaces the desktop with Cinnamon, its own traditional layout with a panel, start menu and system tray. Windows users find it immediately familiar. Mint blocks Snap by default and offers Flatpak instead. Its Update Manager and Timeshift snapshots are set up so that a bad update is easy to undo.",
    standouts: ["Cinnamon: a classic taskbar-and-menu desktop", "Timeshift system snapshots configured on first boot", "Driver Manager for NVIDIA and Broadcom hardware", "MATE and Xfce editions for older machines"],
    pros: ["Probably the gentlest switch from Windows", "Conservative, well-tested updates", "Everything configurable from graphical tools", "Long support inherited from Ubuntu LTS"],
    cons: ["Kernel and desktop versions trail newer distros", "Cinnamon on Wayland is still experimental", "Not aimed at servers"],
    best_for: ["Windows switchers", "Beginners", "Family computers", "Everyday desktop use"],
    scores: { ease:10, gaming:5, dev:6, server:2, privacy:4, lightweight:6, customize:7, rolling:0, terminal:2, gnome_de:0, kde_de:0, lite_de:7, community:9, enterprise:2, creative:3 },
  },

  {
    id: "zorin", name: "Zorin OS", family: "debian", parent: "ubuntu", link: "repo",
    relation: "Ubuntu LTS with a reworked GNOME and Windows-style layouts",
    since: 2009, web: "https://zorin.com/os/",
    tagline: "Designed for people leaving Windows or macOS",
    desktop: "GNOME (customised)", desktops: ["GNOME (customised)", "Xfce (Lite)"],
    pkg: "APT + Flatpak + Snap", install: "sudo apt install vlc", update: "sudo apt update && sudo apt upgrade",
    release: "Point releases on each Ubuntu LTS", cycle: "fixed", init: "systemd",
    difficulty: 1,
    desc: "Zorin OS takes Ubuntu LTS and reshapes GNOME so it can look and behave like Windows or macOS through the Zorin Appearance app. When you open a Windows .exe it suggests a native alternative or offers to run it through Wine. Zorin OS Core is free. Pro is a paid edition with extra layouts and bundled apps, and Lite uses Xfce for older PCs.",
    standouts: ["Switchable desktop layouts, including Windows-style ones", "Windows app support that recognises hundreds of installers", "Zorin Connect for phone integration", "Lite edition for low-spec machines"],
    pros: ["Very little to relearn for Windows users", "Polished default theme", "Ubuntu LTS stability and software underneath", "Education edition for schools"],
    cons: ["Some layouts and apps require the paid Pro edition", "Major releases arrive slower than Ubuntu's", "Smaller community than Mint or Ubuntu"],
    best_for: ["Windows switchers", "Beginners", "Schools", "Office PCs"],
    scores: { ease:9, gaming:5, dev:5, server:1, privacy:3, lightweight:5, customize:5, rolling:0, terminal:2, gnome_de:8, kde_de:0, lite_de:4, community:6, enterprise:2, creative:2 },
  },

  {
    id: "elementary", name: "elementary OS", family: "debian", parent: "ubuntu", link: "repo",
    relation: "Ubuntu LTS with the Pantheon desktop",
    since: 2011, web: "https://elementary.io",
    tagline: "A calm, consistent desktop with a curated app store",
    desktop: "Pantheon", desktops: ["Pantheon"],
    pkg: "APT + Flatpak (AppCenter)", install: "flatpak install flathub org.videolan.VLC", update: "sudo apt update && sudo apt upgrade",
    release: "Point releases on each Ubuntu LTS", cycle: "fixed", init: "systemd",
    difficulty: 1,
    desc: "elementary OS pairs Ubuntu LTS with Pantheon, a desktop built in-house around a dock, a top panel and strict design guidelines that keep every first-party app consistent. AppCenter is a curated Flatpak store where developers can set a pay-what-you-want price. It is a good choice if you like how macOS feels and prefer fewer decisions.",
    standouts: ["Pantheon: a cohesive, macOS-inspired desktop", "AppCenter with pay-what-you-want indie apps", "Flatpak permissions shown before you install", "Strong focus on accessibility and privacy defaults"],
    pros: ["Clean and consistent everywhere", "Hard to break by accident", "Comfortable for macOS switchers", "Built on a long-term-support base"],
    cons: ["Deliberately limited customisation", "Curated AppCenter is small (Flathub can be added)", "Major releases are spaced far apart"],
    best_for: ["macOS switchers", "Casual users", "Design-minded users", "Laptops"],
    scores: { ease:8, gaming:3, dev:5, server:1, privacy:5, lightweight:3, customize:3, rolling:0, terminal:2, gnome_de:5, kde_de:0, lite_de:0, community:5, enterprise:2, creative:4 },
  },

  {
    id: "popos", name: "Pop!_OS", family: "debian", parent: "ubuntu", link: "repo",
    relation: "Ubuntu LTS with System76's COSMIC desktop",
    since: 2017, web: "https://system76.com/pop/",
    tagline: "System76's distro, now with its own Rust desktop",
    desktop: "COSMIC", desktops: ["COSMIC"],
    pkg: "APT + Flatpak (COSMIC Store)", install: "sudo apt install vlc", update: "sudo apt update && sudo apt full-upgrade",
    release: "Releases on each Ubuntu LTS", cycle: "fixed", init: "systemd",
    difficulty: 2,
    desc: "Pop!_OS is made by System76, a company that sells Linux PCs. Since the 24.04 release it ships COSMIC, a desktop System76 wrote from scratch in Rust with auto-tiling built in. A separate ISO comes with NVIDIA drivers preinstalled, which is why Pop is popular for gaming and GPU compute. Underneath it follows Ubuntu LTS.",
    standouts: ["COSMIC desktop with built-in tiling", "Dedicated NVIDIA ISO with drivers ready on first boot", "Recovery partition for reinstalling without losing data", "Full-disk encryption offered by default"],
    pros: ["Excellent out-of-the-box GPU support", "Keyboard-driven workflow without configuration", "Ubuntu software compatibility", "Backed by a hardware vendor"],
    cons: ["COSMIC is young and still filling feature gaps", "Fewer releases than Ubuntu: LTS only", "Some GNOME extensions and habits don't carry over"],
    best_for: ["Gamers", "Developers", "GPU and ML work", "Tiling-curious users"],
    scores: { ease:7, gaming:8, dev:9, server:2, privacy:4, lightweight:3, customize:6, rolling:0, terminal:4, gnome_de:4, kde_de:0, lite_de:0, community:7, enterprise:3, creative:5 },
  },

  {
    id: "kubuntu", name: "Kubuntu", family: "debian", parent: "ubuntu", link: "repo",
    relation: "Official Ubuntu flavour with KDE Plasma",
    since: 2005, web: "https://kubuntu.org",
    tagline: "Ubuntu with the KDE Plasma desktop",
    desktop: "KDE Plasma", desktops: ["KDE Plasma"],
    pkg: "APT", install: "sudo apt install vlc", update: "sudo apt update && sudo apt upgrade",
    release: "Follows Ubuntu (six-monthly + LTS)", cycle: "fixed", init: "systemd",
    difficulty: 1,
    desc: "Kubuntu is an official Ubuntu flavour that swaps GNOME for KDE Plasma. Plasma has a Windows-like taskbar layout by default and can be reshaped almost endlessly. You keep all of Ubuntu's repositories, hardware support and documentation, but without Snap-centred defaults on the desktop.",
    standouts: ["KDE Plasma with the full KDE Gear app suite", "Discover software centre", "Same repositories and LTS support as Ubuntu", "Backports PPA for newer Plasma releases"],
    pros: ["Familiar taskbar layout for Windows users", "Highly customisable", "Ubuntu's software and hardware support", "Lighter than people expect from KDE"],
    cons: ["LTS releases keep an older Plasma", "Smaller team than Ubuntu's main edition", "So many settings it can overwhelm"],
    best_for: ["KDE fans", "Windows switchers", "Customisers", "Everyday desktop use"],
    scores: { ease:7, gaming:6, dev:6, server:2, privacy:3, lightweight:3, customize:8, rolling:0, terminal:3, gnome_de:0, kde_de:10, lite_de:0, community:7, enterprise:2, creative:4 },
  },

  {
    id: "lubuntu", name: "Lubuntu", family: "debian", parent: "ubuntu", link: "repo",
    relation: "Official Ubuntu flavour with LXQt",
    since: 2008, web: "https://lubuntu.me",
    tagline: "Ubuntu on a light LXQt desktop",
    desktop: "LXQt", desktops: ["LXQt"],
    pkg: "APT", install: "sudo apt install vlc", update: "sudo apt update && sudo apt upgrade",
    release: "Follows Ubuntu (six-monthly + LTS)", cycle: "fixed", init: "systemd",
    difficulty: 1,
    desc: "Lubuntu is the official Ubuntu flavour built around LXQt, a desktop that uses very little memory while staying conventional and easy to use. It's a practical way to keep an older laptop useful without giving up Ubuntu's software and support.",
    standouts: ["LXQt desktop with a traditional layout", "Low memory use at idle", "Full Ubuntu repositories", "Calamares installer"],
    pros: ["Revives older hardware", "Simple and responsive", "Same support lifetime as Ubuntu", "Big Ubuntu knowledge base"],
    cons: ["Plain appearance", "Fewer bundled apps", "Modern browsers are still heavy on old machines"],
    best_for: ["Older PCs", "Low-RAM laptops", "Beginners", "Minimalists"],
    scores: { ease:7, gaming:3, dev:4, server:2, privacy:3, lightweight:9, customize:5, rolling:0, terminal:3, gnome_de:0, kde_de:0, lite_de:10, community:6, enterprise:1, creative:1 },
  },

  {
    id: "ubuntu_budgie", name: "Ubuntu Budgie", family: "debian", parent: "ubuntu", link: "repo",
    relation: "Official Ubuntu flavour with Budgie",
    since: 2016, web: "https://ubuntubudgie.org",
    tagline: "Ubuntu with the Budgie desktop",
    desktop: "Budgie", desktops: ["Budgie"],
    pkg: "APT", install: "sudo apt install vlc", update: "sudo apt update && sudo apt upgrade",
    release: "Follows Ubuntu (six-monthly + LTS)", cycle: "fixed", init: "systemd",
    difficulty: 2,
    desc: "Ubuntu Budgie is the official flavour built around Budgie, a desktop that started at Solus. It mixes a traditional panel with Raven, a slide-out sidebar for notifications and quick settings, and adds its own window-tiling and layout tools on top.",
    standouts: ["Budgie desktop with the Raven sidebar", "Budgie Welcome app for layouts and extras", "Applets for panels and docks", "Ubuntu's repositories and support"],
    pros: ["Modern but uncluttered", "Easy to rearrange", "Ubuntu software compatibility", "Moderate resource use"],
    cons: ["Smaller user base than other flavours", "Budgie is still moving to Wayland", "Fewer guides written specifically for it"],
    best_for: ["People who want something different from GNOME", "Everyday desktop use", "Customisers"],
    scores: { ease:7, gaming:4, dev:5, server:2, privacy:3, lightweight:5, customize:6, rolling:0, terminal:3, gnome_de:2, kde_de:0, lite_de:3, community:5, enterprise:2, creative:3 },
  },

  {
    id: "ubuntu_studio", name: "Ubuntu Studio", family: "debian", parent: "ubuntu", link: "repo",
    relation: "Official Ubuntu flavour for audio, video and graphics",
    since: 2007, web: "https://ubuntustudio.org",
    tagline: "Ubuntu set up for creative production",
    desktop: "KDE Plasma", desktops: ["KDE Plasma"],
    pkg: "APT", install: "sudo apt install ardour", update: "sudo apt update && sudo apt upgrade",
    release: "Follows Ubuntu (six-monthly + LTS)", cycle: "fixed", init: "systemd",
    difficulty: 2,
    desc: "Ubuntu Studio is the official flavour for creators. It ships KDE Plasma with a large set of audio, video, photo and 3D tools already installed and tunes the system for low-latency audio. The Ubuntu Studio Installer can also add those tools and tweaks to an existing Ubuntu flavour.",
    standouts: ["Ardour, Kdenlive, Krita, Blender, Darktable and OBS preinstalled", "Low-latency audio configured out of the box", "PipeWire with JACK compatibility", "Studio Controls for audio interfaces"],
    pros: ["Ready for production work on first boot", "No hunting for plugins and codecs", "Ubuntu's hardware support", "Good fit for home studios"],
    cons: ["Large install with many apps you may not use", "Low-latency tuning isn't useful for general use", "Overkill unless you create media"],
    best_for: ["Musicians and producers", "Video editors", "Illustrators", "Streamers"],
    scores: { ease:7, gaming:3, dev:5, server:1, privacy:2, lightweight:2, customize:6, rolling:0, terminal:3, gnome_de:0, kde_de:8, lite_de:0, community:6, enterprise:2, creative:10 },
  },

  {
    id: "linuxlite", name: "Linux Lite", family: "debian", parent: "ubuntu", link: "repo",
    relation: "Ubuntu LTS with a Windows-style Xfce desktop",
    since: 2012, web: "https://www.linuxliteos.com",
    tagline: "A friendly, lightweight first Linux",
    desktop: "Xfce", desktops: ["Xfce"],
    pkg: "APT", install: "sudo apt install vlc", update: "sudo apt update && sudo apt upgrade",
    release: "Point releases on each Ubuntu LTS", cycle: "fixed", init: "systemd",
    difficulty: 1,
    desc: "Linux Lite aims at people coming from Windows who have modest hardware. It wraps Ubuntu LTS in an Xfce desktop laid out like Windows 7, with its own Lite Tweaks, Lite Software and an offline help manual. It stays responsive on machines with little RAM.",
    standouts: ["Windows-style Xfce layout", "Lite Tweaks maintenance tool", "Bundled offline help manual", "Runs on low-spec hardware"],
    pros: ["Easy for Windows users", "Light on resources", "Ubuntu LTS underneath", "Helpful forums"],
    cons: ["Small development team", "Dated look out of the box", "Fewer apps preinstalled than Mint"],
    best_for: ["Older PCs", "Windows switchers", "Beginners"],
    scores: { ease:9, gaming:3, dev:4, server:1, privacy:3, lightweight:8, customize:4, rolling:0, terminal:2, gnome_de:0, kde_de:0, lite_de:10, community:5, enterprise:1, creative:1 },
  },

  {
    id: "lmde", name: "LMDE", family: "debian", parent: "debian", link: "repo",
    relation: "Linux Mint's desktop on plain Debian stable",
    since: 2010, web: "https://linuxmint.com/download_lmde.php",
    tagline: "Linux Mint without Ubuntu underneath",
    desktop: "Cinnamon", desktops: ["Cinnamon"],
    pkg: "APT + Flatpak", install: "sudo apt install vlc", update: "sudo apt update && sudo apt upgrade",
    release: "Releases on each Debian stable", cycle: "fixed", init: "systemd",
    difficulty: 2,
    desc: "Linux Mint Debian Edition gives you the same Cinnamon desktop and Mint tools, but built directly on Debian stable instead of Ubuntu. The Mint team maintains it as a fallback in case Ubuntu ever stops being a good base. It's a good fit for Mint fans who want a purely community-run foundation.",
    standouts: ["Mint's Cinnamon desktop and tools on Debian", "No Ubuntu or Canonical dependency", "Mint Update Manager and Timeshift", "Debian stable's long release cycle"],
    pros: ["Familiar Mint experience", "Purely community foundation", "Stable and predictable", "Codecs installable from the welcome screen"],
    cons: ["Cinnamon only", "Slightly less polished hardware support than Ubuntu-based Mint", "Fewer users and guides than mainline Mint"],
    best_for: ["Mint fans", "Debian fans who want a friendlier desktop", "Everyday desktop use"],
    scores: { ease:8, gaming:4, dev:6, server:2, privacy:5, lightweight:5, customize:6, rolling:0, terminal:3, gnome_de:0, kde_de:0, lite_de:6, community:6, enterprise:2, creative:2 },
  },

  {
    id: "trisquel", name: "Trisquel", family: "debian", parent: "ubuntu", link: "source",
    relation: "Ubuntu LTS rebuilt with only free software",
    since: 2007, web: "https://trisquel.info",
    tagline: "A fully free Ubuntu, endorsed by the FSF",
    desktop: "MATE", desktops: ["MATE", "KDE Plasma (Triskel)", "LXDE (Trisquel Mini)"],
    pkg: "APT", install: "sudo apt install vlc", update: "sudo apt update && sudo apt upgrade",
    release: "Releases on each Ubuntu LTS", cycle: "fixed", init: "systemd",
    difficulty: 2,
    desc: "Trisquel is a Free Software Foundation-endorsed distribution built from Ubuntu LTS with every non-free component removed, including firmware, and the Linux-libre kernel in place of the standard one. It ships a friendly MATE desktop and suits anyone for whom software freedom is a firm requirement. The trade-off is hardware: Wi-Fi chips and graphics cards that need proprietary firmware won't work.",
    standouts: ["Endorsed by the FSF as fully free", "Linux-libre kernel", "MATE desktop, plus KDE and LXDE editions", "Ubuntu LTS base and long support"],
    pros: ["Software freedom without compromise", "Familiar, stable desktop", "Long support inherited from Ubuntu LTS", "Privacy-friendly defaults"],
    cons: ["Some Wi-Fi chips and most NVIDIA GPUs won't work", "Releases trail Ubuntu's", "Small community"],
    best_for: ["Free-software advocates", "Hardware with free drivers", "Privacy-minded users"],
    scores: { ease:7, gaming:1, dev:5, server:3, privacy:7, lightweight:6, customize:5, rolling:0, terminal:3, gnome_de:0, kde_de:3, lite_de:8, community:3, enterprise:1, creative:2 },
  },

  {
    id: "antix", name: "antiX", family: "debian", parent: "debian", link: "repo",
    relation: "Debian stable without systemd, built for very old hardware",
    since: 2007, web: "https://antixlinux.com",
    tagline: "Tiny, systemd-free Debian for very old machines",
    desktop: "IceWM", desktops: ["IceWM", "JWM", "Fluxbox", "herbstluftwm"],
    pkg: "APT", install: "sudo apt install vlc", update: "sudo apt update && sudo apt upgrade",
    release: "Releases on Debian stable", cycle: "fixed", init: "sysvinit or runit",
    difficulty: 3,
    desc: "antiX is a very light Debian-stable derivative that uses sysvinit or runit instead of systemd and lightweight window managers instead of a full desktop. It still offers 32-bit builds and boots comfortably on machines with 256 MB of RAM. It also provides the core tools MX Linux is built on.",
    standouts: ["Runs on extremely old and low-memory PCs", "No systemd: sysvinit or runit", "Excellent live-USB persistence and remastering", "32-bit images still available"],
    pros: ["Breathes life into ancient hardware", "Fast even from a USB stick", "Debian stable packages", "Small, focused community"],
    cons: ["Window managers rather than a full desktop", "Interface looks dated", "Some systemd-dependent software needs workarounds"],
    best_for: ["Very old PCs", "Live USB use", "systemd-free setups"],
    scores: { ease:4, gaming:1, dev:4, server:3, privacy:5, lightweight:10, customize:7, rolling:0, terminal:5, gnome_de:0, kde_de:0, lite_de:10, community:4, enterprise:1, creative:0 },
  },

  {
    id: "mxlinux", name: "MX Linux", family: "debian", parent: "antix", link: "repo",
    relation: "Debian stable using antiX's core, with the MX tools",
    since: 2014, web: "https://mxlinux.org",
    tagline: "Debian stable, made comfortable",
    desktop: "Xfce", desktops: ["Xfce", "KDE Plasma", "Fluxbox"],
    pkg: "APT + MX Package Installer", install: "sudo apt install vlc", update: "sudo apt update && sudo apt upgrade",
    release: "Releases on Debian stable", cycle: "fixed", init: "sysvinit (systemd optional)",
    difficulty: 2,
    desc: "MX Linux is a joint project of the antiX and former MEPIS communities. It pairs Debian stable with antiX's core and a suite of graphical MX Tools for tasks that would otherwise need the terminal. It boots with sysvinit by default but ships systemd as a boot option. MX Snapshot can turn your installed system into a bootable ISO.",
    standouts: ["MX Tools: graphical utilities for almost every admin task", "MX Snapshot turns your setup into a live ISO", "sysvinit by default, systemd available at boot", "Xfce, KDE Plasma and Fluxbox editions"],
    pros: ["Fast on mid-range and older PCs", "Debian stable reliability", "Very good live-USB tools", "Helpful forum and video guides"],
    cons: ["Xfce default may look plain", "Mixed init setup can confuse guides written for systemd", "Not cutting-edge"],
    best_for: ["Older and mid-range PCs", "Debian users who want GUI tools", "Live USB setups"],
    scores: { ease:7, gaming:3, dev:5, server:3, privacy:5, lightweight:8, customize:7, rolling:0, terminal:4, gnome_de:0, kde_de:3, lite_de:10, community:7, enterprise:2, creative:1 },
  },

  {
    id: "devuan", name: "Devuan", family: "debian", parent: "debian", link: "source",
    relation: "Debian forked to remove systemd",
    since: 2017, web: "https://www.devuan.org",
    tagline: "Debian with init freedom",
    desktop: "Xfce", desktops: ["Xfce", "KDE Plasma", "Cinnamon", "MATE", "LXQt"],
    pkg: "APT", install: "sudo apt install vlc", update: "sudo apt update && sudo apt upgrade",
    release: "Releases tracking Debian stable", cycle: "fixed", init: "sysvinit, OpenRC or runit",
    difficulty: 3,
    desc: "Devuan forked Debian in 2014, when Debian adopted systemd as its default init. It tracks Debian stable closely, rebuilds or replaces the packages that depend on systemd, and lets you pick sysvinit, OpenRC or runit at install time. Everything else behaves just like Debian.",
    standouts: ["Choice of init system at install", "Stays close to Debian stable", "Releases named after minor planets", "Same APT workflow as Debian"],
    pros: ["Familiar Debian experience without systemd", "Stable and conservative", "Good for minimal servers", "Mature project"],
    cons: ["Some modern desktop software assumes systemd", "Smaller community than Debian", "Releases can trail Debian by weeks or months"],
    best_for: ["systemd-free servers", "Debian veterans", "Minimalists"],
    scores: { ease:3, gaming:2, dev:6, server:7, privacy:6, lightweight:6, customize:7, rolling:0, terminal:7, gnome_de:2, kde_de:4, lite_de:6, community:4, enterprise:3, creative:1 },
  },

  {
    id: "kali", name: "Kali Linux", family: "debian", parent: "debian", link: "source",
    relation: "Rolling repository built from Debian testing, plus security tools",
    since: 2013, web: "https://www.kali.org",
    tagline: "The penetration-testing toolkit",
    desktop: "Xfce", desktops: ["Xfce", "GNOME", "KDE Plasma"],
    pkg: "APT", install: "sudo apt install nmap", update: "sudo apt update && sudo apt full-upgrade",
    release: "Rolling, with quarterly snapshot images", cycle: "rolling", init: "systemd",
    difficulty: 4,
    desc: "Kali, from OffSec, is the standard toolkit for penetration testing and security research. It rolls on Debian testing and packages hundreds of offensive-security tools. It is meant to run in a VM, from a live USB, or as a container rather than as your everyday OS. Kali NetHunter brings the same tools to Android phones.",
    standouts: ["Hundreds of security tools packaged and maintained", "Images for VMs, ARM boards, WSL and cloud", "Kali NetHunter for Android", "Undercover mode that mimics a Windows desktop"],
    pros: ["Industry standard for security work and certifications", "Tools are kept current", "Excellent documentation", "Runs almost anywhere"],
    cons: ["Not designed as a daily driver", "Rolling testing base can break", "Running it doesn't make you private or anonymous"],
    best_for: ["Penetration testers", "Security students", "CTF players"],
    scores: { ease:2, gaming:1, dev:6, server:3, privacy:5, lightweight:4, customize:6, rolling:7, terminal:9, gnome_de:2, kde_de:2, lite_de:8, community:7, enterprise:3, creative:0 },
  },

  {
    id: "parrot", name: "Parrot OS", family: "debian", parent: "debian", link: "source",
    relation: "Own repositories built on Debian stable",
    since: 2013, web: "https://parrotsec.org",
    tagline: "Security research with a usable desktop",
    desktop: "KDE Plasma", desktops: ["KDE Plasma", "MATE"],
    pkg: "APT", install: "sudo apt install nmap", update: "sudo parrot-upgrade",
    release: "Point releases on Debian stable", cycle: "fixed", init: "systemd",
    difficulty: 3,
    desc: "Parrot is a Debian-stable-based distro with two main editions. Security ships a full pentesting and forensics toolkit, and Home is a privacy-minded everyday desktop. Recent releases moved to KDE Plasma on Wayland by default. It's lighter and more daily-usable than Kali, at the cost of a smaller tool set.",
    standouts: ["Security and Home editions", "Sandboxed apps and AnonSurf for routing traffic over Tor", "Forensics, crypto and development tools included", "Hack The Box integration"],
    pros: ["Usable as a daily driver", "Debian stable base", "Good privacy tooling", "Lighter than Kali"],
    cons: ["Smaller community than Kali", "Fewer certification courses target it", "Security tools add bulk if you only need Home"],
    best_for: ["Security students", "Privacy-minded users", "Pentesters who want one machine"],
    scores: { ease:4, gaming:2, dev:6, server:3, privacy:8, lightweight:5, customize:6, rolling:2, terminal:7, gnome_de:0, kde_de:8, lite_de:4, community:5, enterprise:2, creative:0 },
  },

  {
    id: "tails", name: "Tails", family: "debian", parent: "debian", link: "repo",
    relation: "Amnesic live system built from Debian stable",
    since: 2009, web: "https://tails.net",
    tagline: "A live USB that leaves no trace and routes everything through Tor",
    desktop: "GNOME", desktops: ["GNOME"],
    pkg: "APT (Additional Software)", install: "sudo apt install vlc  # then add it under Additional Software", update: "Automatic upgrades when you connect",
    release: "New release about every month", cycle: "fixed", init: "systemd",
    difficulty: 3,
    desc: "Tails is a portable OS that runs from a USB stick, forgets everything when you shut down, and forces all internet traffic through Tor. It's maintained together with the Tor Project and is used by journalists, activists and anyone who needs to leave no trace on the computer they borrow. An optional encrypted Persistent Storage keeps files between sessions.",
    standouts: ["Amnesic by design: nothing is written to the host computer", "All connections go through Tor; anything else is blocked", "Encrypted Persistent Storage", "Ships with Tor Browser, Thunderbird and KeePassXC"],
    pros: ["Strong anonymity with sane defaults", "Boots on almost any PC", "Frequent security releases", "Clear, well-maintained documentation"],
    cons: ["Not a general-purpose desktop", "Tor makes browsing slower", "Some hardware (like Wi-Fi chips) may not work"],
    best_for: ["Journalists and activists", "Anonymous browsing", "Using untrusted computers"],
    scores: { ease:4, gaming:0, dev:1, server:0, privacy:10, lightweight:6, customize:1, rolling:1, terminal:3, gnome_de:8, kde_de:0, lite_de:0, community:5, enterprise:1, creative:0 },
  },

  {
    id: "whonix", name: "Whonix", family: "debian", parent: "debian", link: "repo",
    relation: "Debian hardened via Kicksecure, split into two VMs",
    since: 2012, web: "https://www.whonix.org",
    tagline: "Tor isolation enforced by virtual machines",
    desktop: "Xfce / LXQt", desktops: ["Xfce", "LXQt"],
    pkg: "APT", install: "sudo apt install vlc", update: "upgrade-nonroot",
    release: "Point releases on Debian stable", cycle: "fixed", init: "systemd",
    difficulty: 4,
    desc: "Whonix runs as two virtual machines. A Gateway handles all Tor traffic, and a Workstation, where you run your apps, can only reach the network through it. Even malware with root on the Workstation can't discover your real IP address. It's built on Kicksecure, a hardened Debian, and runs in VirtualBox, KVM or inside Qubes OS.",
    standouts: ["Gateway/Workstation split prevents IP leaks", "Stream isolation per application", "Hardened Kicksecure base", "First-class Qubes OS integration"],
    pros: ["Much stronger leak protection than a single-machine setup", "Persistent, unlike Tails", "Works on any OS that runs VirtualBox or KVM", "Thorough documentation"],
    cons: ["Requires a capable host and virtualisation", "Slower than native", "Setup is more involved than Tails"],
    best_for: ["High-risk anonymity work", "Qubes OS users", "Persistent anonymous workspaces"],
    scores: { ease:2, gaming:0, dev:3, server:2, privacy:10, lightweight:2, customize:3, rolling:0, terminal:7, gnome_de:0, kde_de:0, lite_de:6, community:4, enterprise:1, creative:0 },
  },

  {
    id: "peppermint", name: "Peppermint OS", family: "debian", parent: "debian", link: "repo",
    relation: "Debian stable with Xfce and Peppermint's own tools",
    since: 2010, web: "https://peppermintos.com",
    tagline: "A light Debian desktop that turns websites into apps",
    desktop: "Xfce", desktops: ["Xfce"],
    pkg: "APT", install: "sudo apt install vlc", update: "sudo apt update && sudo apt upgrade",
    release: "Rolling ISO refreshes on Debian stable", cycle: "fixed", init: "systemd",
    difficulty: 2,
    desc: "Peppermint started out on Ubuntu and has been rebuilt by a community team on Debian stable, with a Devuan-based variant for those avoiding systemd. It ships a light Xfce desktop, a central Peppermint Hub for settings, and Kumo, a tool that turns any website into a standalone desktop app with its own launcher.",
    standouts: ["Kumo: site-specific browser apps for web services", "Peppermint Hub for system settings", "Debian and Devuan editions", "Minimal preinstalled software"],
    pros: ["Light and fast", "Clean Debian base", "Great for web-centric workflows", "Little bloat to remove"],
    cons: ["Small team and community", "Few apps preinstalled", "Less polished than Mint or Zorin"],
    best_for: ["Web-centric users", "Older laptops", "Minimalists"],
    scores: { ease:7, gaming:2, dev:4, server:1, privacy:4, lightweight:8, customize:5, rolling:0, terminal:3, gnome_de:0, kde_de:0, lite_de:10, community:4, enterprise:1, creative:1 },
  },

  {
    id: "deepin", name: "deepin", family: "debian", parent: "debian", link: "source",
    relation: "Began on Debian; now builds its own upstream repository",
    since: 2004, web: "https://www.deepin.org/en/",
    tagline: "A showpiece desktop from China",
    desktop: "DDE", desktops: ["DDE"],
    pkg: "APT + Linyaps", install: "sudo apt install vlc", update: "sudo apt update && sudo apt full-upgrade",
    release: "Major releases with frequent updates", cycle: "fixed", init: "systemd",
    difficulty: 2,
    desc: "deepin is developed in China by the deepin community and UnionTech, which sells the commercial UOS. Its own Deepin Desktop Environment is one of the most visually polished on Linux and comes with a matching suite of first-party apps. deepin originally derived from Debian. Since version 23 it has built its own upstream repository, and recent releases add an immutable system layer.",
    standouts: ["DDE: a polished desktop with smooth animations", "UOS AI assistant built into the desktop", "Immutable system option in recent releases", "Linyaps sandboxed app format"],
    pros: ["Striking design out of the box", "Beginner-friendly control center", "Consistent first-party apps", "Active development"],
    cons: ["Heavier than most desktops", "English documentation and community are thinner", "Some users avoid it over data-handling concerns, though no wrongdoing has been shown"],
    best_for: ["Design-focused users", "Chinese-language users", "People who want something different"],
    scores: { ease:8, gaming:3, dev:4, server:1, privacy:2, lightweight:2, customize:4, rolling:2, terminal:2, gnome_de:0, kde_de:0, lite_de:0, community:4, enterprise:2, creative:4 },
  },

  {
    id: "puppy", name: "Puppy Linux", family: "debian", parent: "debian", link: "source",
    relation: "Woof-CE builds from Debian binaries (Ubuntu builds exist too)",
    since: 2003, web: "https://puppylinux-woof-ce.github.io",
    tagline: "A whole desktop that runs from RAM",
    desktop: "JWM", desktops: ["JWM", "Openbox"],
    pkg: "Puppy Package Manager + APT", install: "Use the Puppy Package Manager (PPM)", update: "Download a newer release ISO",
    release: "Point releases", cycle: "fixed", init: "Puppy init scripts",
    difficulty: 2,
    desc: "Puppy is a family of tiny distributions built with the Woof-CE system from another distro's packages. Today the flagship builds come from Debian. It loads itself entirely into RAM, so it's fast even from a USB stick on old hardware, and it saves your changes to a save file or folder that you choose.",
    standouts: ["Runs entirely from RAM", "Under 500 MB download", "Save file/folder persistence on any drive", "Built from Debian or Ubuntu packages via Woof-CE"],
    pros: ["Extremely fast on old hardware", "Great rescue and portable system", "Many community 'puplets'", "Simple tools for everything"],
    cons: ["Runs as root by default", "Quirky compared to mainstream distros", "Not suited to multi-user or security-sensitive use"],
    best_for: ["Very old PCs", "Rescue USBs", "Portable desktops"],
    scores: { ease:6, gaming:1, dev:2, server:1, privacy:2, lightweight:10, customize:5, rolling:0, terminal:4, gnome_de:0, kde_de:0, lite_de:10, community:5, enterprise:0, creative:0 },
  },

  {
    id: "raspberrypi", name: "Raspberry Pi OS", family: "debian", parent: "debian", link: "repo",
    relation: "Debian for Raspberry Pi boards",
    since: 2012, web: "https://www.raspberrypi.com/software/",
    tagline: "The official OS for Raspberry Pi",
    desktop: "Raspberry Pi Desktop", desktops: ["Raspberry Pi Desktop (labwc)", "Lite (no desktop)"],
    pkg: "APT", install: "sudo apt install vlc", update: "sudo apt update && sudo apt full-upgrade",
    release: "Releases on Debian stable", cycle: "fixed", init: "systemd",
    difficulty: 2,
    desc: "Raspberry Pi OS, formerly Raspbian, is Raspberry Pi Ltd's Debian-based OS for its single-board computers. It adds Pi-specific firmware, kernels, a lightweight Wayland desktop and configuration tools, plus a Lite image with no desktop for headless projects. It only runs on Raspberry Pi hardware.",
    standouts: ["Tuned kernel and firmware for every Pi model", "Raspberry Pi Imager preconfigures Wi-Fi and SSH", "Lite image for headless servers", "Huge maker and education community"],
    pros: ["Just works on a Pi", "Debian packages", "Excellent beginner tutorials", "Hardware interfaces (GPIO, camera) supported"],
    cons: ["Raspberry Pi hardware only", "Desktop is basic", "SD cards wear out (use an SSD when you can)"],
    best_for: ["Raspberry Pi projects", "Home servers on a Pi", "Learning and education"],
    scores: { ease:7, gaming:1, dev:6, server:6, privacy:4, lightweight:8, customize:5, rolling:0, terminal:5, gnome_de:0, kde_de:0, lite_de:7, community:9, enterprise:1, creative:2 },
  },

  {
    id: "proxmox", name: "Proxmox VE", family: "debian", parent: "debian", link: "repo",
    relation: "Debian with KVM, LXC and a web management interface",
    since: 2008, web: "https://www.proxmox.com/en/products/proxmox-virtual-environment/overview",
    tagline: "A hypervisor for your homelab or data centre",
    desktop: "None (web interface)", desktops: ["None (web interface)"],
    pkg: "APT", install: "apt install htop", update: "apt update && apt full-upgrade",
    release: "Major releases on each Debian stable", cycle: "fixed", init: "systemd",
    difficulty: 3,
    desc: "Proxmox Virtual Environment turns a machine into a hypervisor you manage from a browser. Built on Debian, it runs KVM virtual machines and LXC containers side by side, with ZFS, Ceph, clustering, backups and high availability built in. It's free and open source. The company behind it sells optional support subscriptions; without one you use the free no-subscription update repository.",
    standouts: ["VMs and containers from one web interface", "ZFS and Ceph storage built in", "Clustering, live migration and backups", "Pairs with Proxmox Backup Server"],
    pros: ["The go-to homelab hypervisor", "Free, with optional paid support", "Debian underneath", "Huge community and guides"],
    cons: ["Not a desktop OS", "Web UI reminds you about the subscription", "Takes over the whole machine"],
    best_for: ["Homelabs", "Self-hosting", "Small business servers"],
    scores: { ease:5, gaming:0, dev:4, server:10, privacy:4, lightweight:4, customize:6, rolling:0, terminal:6, gnome_de:0, kde_de:0, lite_de:0, community:8, enterprise:8, creative:0 },
  },

  {
    id: "truenas", name: "TrueNAS", family: "debian", parent: "debian", link: "source",
    relation: "Storage appliance built on Debian and OpenZFS",
    since: 2022, web: "https://www.truenas.com/truenas-community-edition/",
    tagline: "A NAS operating system built on ZFS",
    desktop: "None (web interface)", desktops: ["None (web interface)"],
    pkg: "Apps catalog (containers)", install: "Install apps from the Apps catalog in the web interface", update: "Apply updates from the web interface",
    release: "Major release about once a year", cycle: "fixed", init: "systemd",
    difficulty: 3,
    desc: "TrueNAS Community Edition, formerly TrueNAS SCALE, is a free storage operating system from iXsystems built on Debian and OpenZFS. You manage it entirely from a web interface: pools and datasets, SMB and NFS shares, snapshots and replication, plus containerised apps and virtual machines. It's an appliance, so the base system is locked down rather than something you customise with APT.",
    standouts: ["OpenZFS with snapshots, replication and scrubs", "SMB, NFS and iSCSI sharing", "Apps catalog for Plex, Nextcloud and more", "Everything managed from the browser"],
    pros: ["Strong data-integrity guarantees from ZFS", "Polished web interface", "Free, with an enterprise lineage", "Good documentation and forums"],
    cons: ["Appliance: little control over the base OS", "ZFS wants plenty of RAM and planned disk layouts", "Not a general-purpose server"],
    best_for: ["Home NAS builds", "Media servers", "Backups"],
    scores: { ease:6, gaming:0, dev:2, server:10, privacy:4, lightweight:2, customize:3, rolling:0, terminal:3, gnome_de:0, kde_de:0, lite_de:0, community:7, enterprise:8, creative:0 },
  },

  {
    id: "dietpi", name: "DietPi", family: "debian", parent: "debian", link: "repo",
    relation: "Minimal Debian for single-board computers and small servers",
    since: 2014, web: "https://dietpi.com",
    tagline: "Debian slimmed down for tiny servers",
    desktop: "None (desktops optional)", desktops: ["None", "Xfce, LXQt and others optional"],
    pkg: "APT + dietpi-software", install: "sudo dietpi-software", update: "sudo dietpi-update",
    release: "Regular releases on Debian stable", cycle: "fixed", init: "systemd",
    difficulty: 2,
    desc: "DietPi is a stripped-down Debian image for Raspberry Pis and dozens of other single-board computers, as well as virtual machines and old PCs. Its menu-driven tools install and configure popular self-hosted software, such as Pi-hole, Home Assistant, Nextcloud and media servers, with sensible defaults and very little RAM or storage overhead.",
    standouts: ["Very low RAM and storage use", "dietpi-software: one menu for installing self-hosted apps", "Images for Raspberry Pi and many other boards", "Automated first-boot setup"],
    pros: ["The quickest route to a small home server", "Light enough for old boards", "Debian packages underneath", "Menus instead of config files"],
    cons: ["Headless first; desktops are an afterthought", "Small team", "Less general-purpose than Raspberry Pi OS"],
    best_for: ["Raspberry Pi servers", "Pi-hole and Home Assistant boxes", "Old hardware as a server"],
    scores: { ease:6, gaming:0, dev:4, server:8, privacy:4, lightweight:10, customize:6, rolling:0, terminal:6, gnome_de:0, kde_de:0, lite_de:5, community:6, enterprise:2, creative:0 },
  },

  // ══ Fedora family ═══════════════════════════════════════════════════════════

  {
    id: "fedora", name: "Fedora", family: "fedora", parent: null, link: null,
    relation: "The root of the family",
    since: 2003, web: "https://fedoraproject.org",
    tagline: "Leading-edge Linux, sponsored by Red Hat",
    desktop: "GNOME (Workstation)", desktops: ["GNOME", "KDE Plasma", "Xfce", "Cinnamon", "LXQt", "Budgie", "COSMIC", "Sway", "i3"],
    pkg: "DNF (.rpm) + Flatpak", install: "sudo dnf install vlc", update: "sudo dnf upgrade --refresh",
    release: "New release about every six months, each supported ~13 months", cycle: "fixed", init: "systemd",
    difficulty: 2,
    desc: "Fedora is a community project sponsored by Red Hat and the upstream that eventually becomes CentOS Stream and RHEL. It ships close to the latest upstream software on a fixed six-month cadence, and it was first to make Wayland, PipeWire and Btrfs the defaults. Workstation uses an unmodified GNOME, and a KDE Plasma edition sits alongside it.",
    standouts: ["Newest GNOME and KDE Plasma soon after release", "Workstation and KDE editions, plus Spins and Atomic variants", "SELinux enforcing by default", "Flathub available from the first-boot setup"],
    pros: ["Modern without being rolling", "Vanilla upstream desktops", "Great for developers and containers", "Strong security defaults"],
    cons: ["Each release needs an upgrade within about a year", "Some codecs and NVIDIA drivers come from RPM Fusion", "Fewer third-party .rpm downloads than .deb"],
    best_for: ["Developers", "People who want new software that's still tested", "Linux enthusiasts", "Laptops with recent hardware"],
    scores: { ease:7, gaming:6, dev:9, server:5, privacy:5, lightweight:3, customize:6, rolling:4, terminal:4, gnome_de:10, kde_de:7, lite_de:2, community:8, enterprise:6, creative:4 },
  },

  {
    id: "silverblue", name: "Fedora Silverblue", family: "fedora", parent: "fedora", link: "repo",
    relation: "Fedora's packages as an atomic, image-based system",
    since: 2018, web: "https://fedoraproject.org/atomic-desktops/silverblue/",
    tagline: "Fedora with an unbreakable core",
    desktop: "GNOME", desktops: ["GNOME (Silverblue)", "KDE Plasma (Kinoite)", "Sway", "Budgie", "COSMIC"],
    pkg: "rpm-ostree + Flatpak + Toolbx", install: "flatpak install flathub org.videolan.VLC", update: "rpm-ostree upgrade",
    release: "Follows Fedora; updates apply atomically", cycle: "atomic", init: "systemd",
    difficulty: 3,
    desc: "Silverblue is the GNOME variant of Fedora's Atomic Desktops. The base system is read-only and updated as a whole image, so an update either applies completely or not at all, and the previous version stays one reboot away. You install apps with Flatpak and do development inside Toolbx containers. Kinoite is the same idea with KDE Plasma.",
    standouts: ["Atomic updates with instant rollback", "Read-only base that can't drift or rot", "Toolbx containers for development", "KDE (Kinoite) and other Atomic variants"],
    pros: ["Very hard to break", "Clean separation of OS, apps and dev tools", "Same new software as Fedora", "Great for containers"],
    cons: ["Different workflow from traditional distros", "Layering RPMs slows updates", "Some tools expect a writable /usr"],
    best_for: ["Developers", "Reliability-minded users", "Container workflows"],
    scores: { ease:6, gaming:5, dev:9, server:4, privacy:5, lightweight:2, customize:4, rolling:4, terminal:5, gnome_de:10, kde_de:4, lite_de:0, community:6, enterprise:5, creative:3 },
  },

  {
    id: "bazzite", name: "Bazzite", family: "fedora", parent: "silverblue", link: "repo",
    relation: "Universal Blue gaming image on Fedora Atomic",
    since: 2023, web: "https://bazzite.gg",
    tagline: "A console-like gaming OS for PCs and handhelds",
    desktop: "KDE Plasma", desktops: ["KDE Plasma", "GNOME", "Steam Gaming Mode"],
    pkg: "Flatpak + Homebrew + rpm-ostree", install: "flatpak install flathub org.videolan.VLC", update: "ujust update",
    release: "Continuous image updates on Fedora stable", cycle: "atomic", init: "systemd",
    difficulty: 1,
    desc: "Bazzite is a Universal Blue image built on Fedora Atomic. It comes ready for gaming with Steam, Lutris-style launchers, GPU drivers and HDR. On handhelds and living-room PCs it can boot straight into Steam's Gaming Mode like a Steam Deck. Being atomic, a bad update is undone by picking the previous image at boot.",
    standouts: ["Steam Gaming Mode for handhelds and HTPCs", "NVIDIA images with drivers built in", "Atomic updates and rollback", "Tuned for ROG Ally, Legion Go and other handhelds"],
    pros: ["Easiest way to a working Linux gaming PC", "Hard to break", "Excellent handheld support", "Very active community"],
    cons: ["Atomic model is different from traditional Linux", "Installing system-level software takes extra steps", "Tuned for gaming, not servers or development"],
    best_for: ["PC gamers", "Handheld owners", "Living-room PCs", "Windows gamers switching over"],
    scores: { ease:8, gaming:10, dev:4, server:1, privacy:3, lightweight:2, customize:4, rolling:5, terminal:2, gnome_de:5, kde_de:9, lite_de:0, community:8, enterprise:1, creative:3 },
  },

  {
    id: "bluefin", name: "Bluefin", family: "fedora", parent: "silverblue", link: "repo",
    relation: "Universal Blue developer image on Fedora Atomic (GNOME)",
    since: 2023, web: "https://projectbluefin.io",
    tagline: "A developer workstation that maintains itself",
    desktop: "GNOME", desktops: ["GNOME"],
    pkg: "Flatpak + Homebrew + containers", install: "flatpak install flathub org.videolan.VLC", update: "ujust update",
    release: "Automatic image updates on Fedora stable", cycle: "atomic", init: "systemd",
    difficulty: 2,
    desc: "Bluefin is a Universal Blue image built on Fedora's atomic GNOME desktop. It updates itself in the background, keeps the previous image one reboot away, and expects you to install apps from Flathub and command-line tools with Homebrew. Its developer mode adds VS Code, Docker, devcontainers and other tooling, and its documentation covers running local AI models with Ollama. The aim is a workstation you never have to babysit.",
    standouts: ["Automatic background updates with rollback", "Developer mode with containers, devcontainers and VS Code", "Homebrew for command-line tools", "NVIDIA images available"],
    pros: ["Very hard to break", "Excellent for container-based development", "Almost no maintenance", "Clean, stock GNOME"],
    cons: ["The atomic workflow differs from traditional Linux", "Installing system packages takes extra steps", "Opinionated about how you should work"],
    best_for: ["Developers", "Cloud-native work", "People who want a no-maintenance desktop"],
    scores: { ease:8, gaming:4, dev:10, server:3, privacy:5, lightweight:2, customize:3, rolling:4, terminal:4, gnome_de:10, kde_de:0, lite_de:0, community:6, enterprise:4, creative:3 },
  },

  {
    id: "aurora", name: "Aurora", family: "fedora", parent: "silverblue", link: "repo",
    relation: "Universal Blue developer image on Fedora Atomic (KDE Plasma)",
    since: 2024, web: "https://getaurora.dev",
    tagline: "Bluefin's ideas on KDE Plasma",
    desktop: "KDE Plasma", desktops: ["KDE Plasma"],
    pkg: "Flatpak + Homebrew + containers", install: "flatpak install flathub org.videolan.VLC", update: "ujust update",
    release: "Automatic image updates on Fedora stable", cycle: "atomic", init: "systemd",
    difficulty: 2,
    desc: "Aurora is the KDE Plasma sibling of Bluefin, built by the Universal Blue community on Fedora's atomic KDE desktop. You get the same self-updating base with image rollback, Flathub and Homebrew for software, and an optional developer mode with containers and editors, all wrapped in a lightly customised Plasma desktop.",
    standouts: ["Automatic background updates with rollback", "KDE Plasma with sensible tweaks", "Optional developer mode", "NVIDIA images available"],
    pros: ["Very hard to break", "Familiar taskbar layout", "Almost no maintenance", "Great for containers"],
    cons: ["The atomic workflow differs from traditional Linux", "Installing system packages takes extra steps", "Younger project than Bluefin"],
    best_for: ["Developers who prefer KDE", "Windows switchers who want reliability", "Low-maintenance desktops"],
    scores: { ease:8, gaming:5, dev:9, server:2, privacy:5, lightweight:2, customize:6, rolling:4, terminal:4, gnome_de:0, kde_de:10, lite_de:0, community:6, enterprise:3, creative:4 },
  },

  {
    id: "nobara", name: "Nobara", family: "fedora", parent: "fedora", link: "repo",
    relation: "Fedora with gaming, streaming and codec patches",
    since: 2022, web: "https://nobaraproject.org",
    tagline: "Fedora tuned for gaming and streaming",
    desktop: "KDE Plasma", desktops: ["KDE Plasma", "GNOME", "Steam HTPC/handheld"],
    pkg: "DNF + Flatpak", install: "sudo dnf install vlc", update: "nobara-sync",
    release: "Follows Fedora, with frequent updates", cycle: "fixed", init: "systemd",
    difficulty: 2,
    desc: "Nobara is maintained by GloriousEggroll, the developer behind Proton-GE. It's a regular, non-atomic Fedora with fixes and packages for gaming, streaming and content creation already applied, including codecs, OBS, a performance-tuned kernel and an option to install NVIDIA drivers during setup.",
    standouts: ["Proton-GE author's own distro", "Codecs, OBS and gaming tools preinstalled", "NVIDIA drivers as an install option", "Steam HTPC and handheld editions"],
    pros: ["Fedora freshness with gaming fixes applied", "Great for streaming and recording", "Traditional package management", "Quick to set up"],
    cons: ["Small team, essentially one lead maintainer", "Diverges from upstream Fedora docs", "Custom kernel may complicate Secure Boot"],
    best_for: ["Gamers", "Streamers", "Content creators"],
    scores: { ease:7, gaming:10, dev:5, server:1, privacy:3, lightweight:2, customize:6, rolling:5, terminal:3, gnome_de:5, kde_de:9, lite_de:0, community:5, enterprise:1, creative:7 },
  },

  {
    id: "asahi", name: "Fedora Asahi Remix", family: "fedora", parent: "fedora", link: "repo",
    relation: "Fedora plus the drivers Apple Silicon Macs need",
    since: 2023, web: "https://asahilinux.org/fedora/",
    tagline: "Linux on Apple Silicon Macs",
    desktop: "KDE Plasma", desktops: ["KDE Plasma", "GNOME"],
    pkg: "DNF (.rpm) + Flatpak", install: "sudo dnf install vlc", update: "sudo dnf upgrade --refresh",
    release: "Follows Fedora", cycle: "fixed", init: "systemd",
    difficulty: 3,
    desc: "Fedora Asahi Remix is the flagship distro of the Asahi Linux project, which reverse-engineered Apple Silicon Macs so they can run Linux natively. It's Fedora with the drivers and tweaks those Macs need, installed alongside macOS with a single command, with KDE Plasma as the default desktop and conformant OpenGL and Vulkan graphics drivers. M1 and M2 Macs are well supported; newer chips are still being brought up, so check the support page for your exact model.",
    standouts: ["Runs natively on M1 and M2 Macs", "Installs alongside macOS", "Conformant OpenGL and Vulkan drivers", "Fedora's packages and release cadence"],
    pros: ["The best way to run Linux on an Apple Silicon Mac", "Fast and efficient on supported models", "Upstream Fedora underneath", "Skilled, active project"],
    cons: ["M3 support is only arriving now and M4 isn't supported", "Some hardware features are still missing", "x86 games run through emulation"],
    best_for: ["Apple Silicon Mac owners", "Developers on Mac hardware"],
    scores: { ease:6, gaming:3, dev:8, server:2, privacy:5, lightweight:3, customize:6, rolling:4, terminal:5, gnome_de:4, kde_de:9, lite_de:2, community:6, enterprise:3, creative:3 },
  },

  {
    id: "centos", name: "CentOS Stream", family: "fedora", parent: "fedora", link: "source",
    relation: "Branched from Fedora; the development preview of the next RHEL",
    since: 2019, web: "https://www.centos.org",
    tagline: "The upstream of Red Hat Enterprise Linux",
    desktop: "GNOME", desktops: ["GNOME", "None (server)"],
    pkg: "DNF (.rpm)", install: "sudo dnf install httpd", update: "sudo dnf upgrade",
    release: "Continuously delivered; ~5 years per major version", cycle: "fixed", init: "systemd",
    difficulty: 3,
    desc: "CentOS Stream sits between Fedora and RHEL. Each major version is branched from a Fedora release and then continuously updated with what will land in the next RHEL minor release. It replaced the old CentOS Linux rebuild, which ended in 2024, and it's where you can contribute changes to RHEL directly.",
    standouts: ["Preview of upcoming RHEL changes", "Upstream for RHEL, Rocky and AlmaLinux", "Free, with public contribution workflow", "Special Interest Groups for virtualisation, cloud and more"],
    pros: ["Enterprise-grade base for free", "Early look at RHEL changes", "Good for building and testing for RHEL", "Long lifetime per version"],
    cons: ["Slightly ahead of RHEL, so not identical to it", "Fewer desktop packages than Fedora", "Not a classic 'set and forget' rebuild"],
    best_for: ["RHEL developers", "Servers", "Testing ahead of RHEL"],
    scores: { ease:4, gaming:1, dev:7, server:8, privacy:5, lightweight:3, customize:4, rolling:3, terminal:6, gnome_de:6, kde_de:0, lite_de:0, community:5, enterprise:9, creative:0 },
  },

  {
    id: "rhel", name: "Red Hat Enterprise Linux", family: "fedora", parent: "centos", link: "source",
    relation: "Built from CentOS Stream",
    since: 2002, web: "https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux",
    tagline: "The commercial enterprise standard",
    desktop: "GNOME", desktops: ["GNOME", "None (server)"],
    pkg: "DNF (.rpm)", install: "sudo dnf install httpd", update: "sudo dnf upgrade",
    release: "Major release every ~3 years, supported 10 years", cycle: "fixed", init: "systemd",
    difficulty: 3,
    desc: "RHEL is Red Hat's subscription-based OS for servers, workstations and the cloud, with a ten-year lifecycle per major version and certification from most enterprise hardware and software vendors. Individuals can use it free through the Red Hat Developer subscription on up to 16 systems. Rocky Linux and AlmaLinux exist to provide compatible alternatives.",
    standouts: ["Ten-year lifecycle per major release", "Vendor certifications across the industry", "SELinux, FIPS and compliance tooling", "Image mode (bootc) for container-built systems"],
    pros: ["What most enterprises run", "Exceptional support and documentation", "Free for individual developers", "Predictable, long-lived releases"],
    cons: ["Subscription required beyond the developer program", "Conservative package versions", "Smaller desktop app selection"],
    best_for: ["Enterprise servers", "Sysadmin careers and certification", "Regulated environments"],
    scores: { ease:5, gaming:1, dev:7, server:10, privacy:5, lightweight:2, customize:3, rolling:0, terminal:6, gnome_de:6, kde_de:0, lite_de:0, community:6, enterprise:10, creative:1 },
  },

  {
    id: "rocky", name: "Rocky Linux", family: "fedora", parent: "rhel", link: "source",
    relation: "Rebuilt from RHEL sources to be bug-for-bug compatible",
    since: 2021, web: "https://rockylinux.org",
    tagline: "A community RHEL rebuild",
    desktop: "GNOME", desktops: ["GNOME", "KDE Plasma", "None (server)"],
    pkg: "DNF (.rpm)", install: "sudo dnf install httpd", update: "sudo dnf upgrade",
    release: "Tracks RHEL; 10-year lifecycle", cycle: "fixed", init: "systemd",
    difficulty: 3,
    desc: "Rocky Linux was founded by CentOS co-founder Gregory Kurtzer after CentOS Linux was refocused into CentOS Stream. It aims to be bug-for-bug compatible with RHEL, so software and procedures written for RHEL work unchanged, and it's governed by the Rocky Enterprise Software Foundation.",
    standouts: ["Bug-for-bug RHEL compatibility goal", "Ten-year support lifecycle", "Migration script from other EL distros", "Cloud images everywhere"],
    pros: ["Free drop-in for RHEL", "Huge EL knowledge base applies", "Stable for years", "Community governance"],
    cons: ["Conservative software versions", "Depends on access to RHEL sources", "Thin on desktop software"],
    best_for: ["Servers", "Homelabs", "Ex-CentOS users", "Learning RHEL administration"],
    scores: { ease:4, gaming:1, dev:6, server:10, privacy:5, lightweight:3, customize:4, rolling:0, terminal:7, gnome_de:5, kde_de:1, lite_de:0, community:6, enterprise:10, creative:0 },
  },

  {
    id: "almalinux", name: "AlmaLinux", family: "fedora", parent: "rhel", link: "source",
    relation: "Built from CentOS Stream and RHEL sources, ABI-compatible with RHEL",
    since: 2021, web: "https://almalinux.org",
    tagline: "A RHEL-compatible distro run by a foundation",
    desktop: "GNOME", desktops: ["GNOME", "KDE Plasma", "None (server)"],
    pkg: "DNF (.rpm)", install: "sudo dnf install httpd", update: "sudo dnf upgrade",
    release: "Tracks RHEL; 10-year lifecycle", cycle: "fixed", init: "systemd",
    difficulty: 3,
    desc: "AlmaLinux was launched by CloudLinux and is now run by the non-profit AlmaLinux OS Foundation. It aims for application compatibility with RHEL rather than bug-for-bug identity, which lets it ship fixes faster and keep supporting hardware that RHEL has dropped, such as older x86-64-v2 CPUs.",
    standouts: ["ABI compatibility with RHEL", "Builds for older x86-64-v2 CPUs", "Non-profit foundation governance", "AlmaLinux Kitten preview builds"],
    pros: ["Free, RHEL-compatible and long-lived", "Can patch issues faster than strict rebuilds", "Wide cloud and hosting support", "Open build process"],
    cons: ["Not byte-identical to RHEL", "Conservative package versions", "Limited desktop focus"],
    best_for: ["Servers", "Web hosting", "Homelabs", "Older server hardware"],
    scores: { ease:4, gaming:1, dev:6, server:10, privacy:5, lightweight:3, customize:4, rolling:0, terminal:7, gnome_de:5, kde_de:1, lite_de:0, community:6, enterprise:10, creative:0 },
  },

  {
    id: "qubes", name: "Qubes OS", family: "fedora", parent: "fedora", link: "repo",
    relation: "Xen-based; its admin domain (dom0) runs Fedora",
    since: 2012, web: "https://www.qubes-os.org",
    tagline: "Security through compartmentalisation",
    desktop: "Xfce", desktops: ["Xfce (dom0)"],
    pkg: "DNF in dom0; APT or DNF in templates", install: "sudo dnf install vlc  # inside a template qube", update: "Qubes Update tool",
    release: "Point releases", cycle: "fixed", init: "systemd",
    difficulty: 5,
    desc: "Qubes OS runs everything in separate Xen virtual machines called qubes, such as work, personal, banking and untrusted. A compromise in one doesn't spread to the others. Windows are colour-coded by trust level. The admin domain runs Fedora, and app qubes are built from Fedora, Debian or Whonix templates, including disposable ones that vanish after use.",
    standouts: ["Every task isolated in its own VM", "Disposable qubes for opening untrusted files", "Built-in Whonix qubes for Tor", "Colour-coded window borders by trust level"],
    pros: ["Among the strongest desktop security models available", "Contains damage from malware", "Flexible templates", "Endorsed by security researchers"],
    cons: ["Needs a powerful machine (16 GB+ RAM recommended)", "Strict hardware compatibility", "No GPU acceleration for apps, so it's unsuitable for gaming"],
    best_for: ["Security professionals", "Journalists and high-risk users", "Compartmentalised workflows"],
    scores: { ease:1, gaming:0, dev:5, server:2, privacy:10, lightweight:0, customize:4, rolling:0, terminal:7, gnome_de:0, kde_de:0, lite_de:5, community:4, enterprise:3, creative:0 },
  },

  // ══ Arch family ═════════════════════════════════════════════════════════════

  {
    id: "arch", name: "Arch Linux", family: "arch", parent: null, link: null,
    relation: "The root of the family",
    since: 2002, web: "https://archlinux.org",
    tagline: "A simple, rolling base you build yourself",
    desktop: "None (your choice)", desktops: ["Any"],
    pkg: "pacman + AUR", install: "sudo pacman -S vlc", update: "sudo pacman -Syu",
    release: "Rolling", cycle: "rolling", init: "systemd",
    difficulty: 4,
    desc: "Arch gives you a minimal, up-to-date base and expects you to choose and configure everything else yourself. The guided archinstall script helps, but understanding your system is the point. It rolls continuously, so you always have the latest software, and the Arch User Repository covers almost anything not in the official repos. The Arch Wiki is the best Linux documentation there is, whatever distro you use.",
    standouts: ["The Arch Wiki", "Arch User Repository (AUR)", "Latest stable upstream software", "archinstall guided installer"],
    pros: ["You know exactly what's installed and why", "Always current", "Huge package selection via the AUR", "Fast pacman"],
    cons: ["You maintain it, so read the news before updating", "AUR packages are user-submitted and need checking", "Not ideal if you need set-and-forget"],
    best_for: ["Tinkerers", "Experienced users", "Learning Linux deeply", "Minimal custom setups"],
    scores: { ease:1, gaming:7, dev:9, server:5, privacy:6, lightweight:7, customize:10, rolling:10, terminal:10, gnome_de:4, kde_de:4, lite_de:4, community:8, enterprise:1, creative:3 },
  },

  {
    id: "manjaro", name: "Manjaro", family: "arch", parent: "arch", link: "source",
    relation: "Own repositories, synced from Arch after extra testing",
    since: 2011, web: "https://manjaro.org",
    tagline: "Arch with a buffer and graphical tools",
    desktop: "KDE Plasma", desktops: ["KDE Plasma", "GNOME", "Xfce"],
    pkg: "pacman + Pamac (+ AUR, Flatpak)", install: "pamac install vlc", update: "pamac upgrade",
    release: "Rolling, held back from Arch for testing", cycle: "rolling", init: "systemd",
    difficulty: 2,
    desc: "Manjaro takes Arch packages into its own repositories and holds them for a few weeks of testing before releasing them to its stable branch. It adds a graphical installer, Pamac software manager, and kernel and hardware-detection tools. You get a rolling system with a little more caution than Arch itself.",
    standouts: ["Pamac GUI with optional AUR and Flatpak", "Hardware detection installs drivers for you", "Easy multiple-kernel management", "Stable, testing and unstable branches"],
    pros: ["Rolling without manual setup", "Driver setup is automatic", "Several polished editions", "Large community"],
    cons: ["Delay can clash with AUR packages built for current Arch", "Arch Wiki advice doesn't always apply", "Has had project-management missteps"],
    best_for: ["Arch-curious users", "Gamers", "Rolling-release fans who want a GUI"],
    scores: { ease:6, gaming:8, dev:7, server:2, privacy:4, lightweight:4, customize:8, rolling:8, terminal:4, gnome_de:5, kde_de:8, lite_de:5, community:7, enterprise:1, creative:3 },
  },

  {
    id: "endeavouros", name: "EndeavourOS", family: "arch", parent: "arch", link: "repo",
    relation: "Arch's own repositories plus a small helper repo",
    since: 2019, web: "https://endeavouros.com",
    tagline: "Arch with an installer and a welcoming community",
    desktop: "KDE Plasma", desktops: ["KDE Plasma", "GNOME", "Xfce", "Cinnamon", "i3", "Sway", "and more"],
    pkg: "pacman + yay (AUR)", install: "sudo pacman -S vlc", update: "sudo pacman -Syu",
    release: "Rolling", cycle: "rolling", init: "systemd",
    difficulty: 3,
    desc: "EndeavourOS is about as close to plain Arch as you can get with a graphical installer. It uses Arch's repositories directly, adds a tiny repo of helper tools, and gives you a choice of desktops at install time. Afterwards it's a terminal-friendly Arch system, and Arch documentation applies directly. Its forum is known for being friendly to newcomers.",
    standouts: ["Calamares installer with many desktop choices", "Pure Arch repositories", "yay AUR helper preinstalled", "Welcome app for common tasks"],
    pros: ["Arch without the manual install", "Arch Wiki applies fully", "Friendly forum", "Minimal extra software"],
    cons: ["You still maintain a rolling Arch system", "Expects some terminal use", "Fewer GUI tools than Manjaro"],
    best_for: ["Arch newcomers", "Developers", "Gamers", "Learning Arch"],
    scores: { ease:5, gaming:8, dev:9, server:3, privacy:5, lightweight:6, customize:10, rolling:10, terminal:7, gnome_de:3, kde_de:8, lite_de:4, community:7, enterprise:1, creative:3 },
  },

  {
    id: "garuda", name: "Garuda Linux", family: "arch", parent: "arch", link: "repo",
    relation: "Arch repositories plus Chaotic-AUR and Garuda tools",
    since: 2020, web: "https://garudalinux.org",
    tagline: "Arch with snapshots, eye candy and gaming defaults",
    desktop: "KDE Plasma (Dr460nized)", desktops: ["KDE Plasma", "GNOME", "Hyprland", "Sway", "i3"],
    pkg: "pacman + Chaotic-AUR", install: "sudo pacman -S vlc", update: "garuda-update",
    release: "Rolling", cycle: "rolling", init: "systemd",
    difficulty: 3,
    desc: "Garuda is an Arch derivative that installs on Btrfs with automatic snapshots before every update, so you can roll back from the boot menu. It ships the Chaotic-AUR, which provides prebuilt AUR packages, along with gaming tools and a heavily themed KDE Plasma called Dr460nized.",
    standouts: ["Btrfs snapshots before every update", "Chaotic-AUR prebuilt packages", "Garuda Gamer for one-click gaming tools", "Distinctive Dr460nized theme"],
    pros: ["Easy rollback makes rolling safer", "Gaming tools ready to go", "Polished look", "Up-to-date software"],
    cons: ["Heavier than most Arch derivatives", "Lots of extras you may not want", "Theme isn't everyone's taste"],
    best_for: ["Gamers", "Customisers", "Rolling-release fans"],
    scores: { ease:5, gaming:9, dev:7, server:1, privacy:3, lightweight:2, customize:8, rolling:10, terminal:5, gnome_de:4, kde_de:8, lite_de:0, community:6, enterprise:1, creative:3 },
  },

  {
    id: "cachyos", name: "CachyOS", family: "arch", parent: "arch", link: "source",
    relation: "Arch rebuilt with CPU-optimised packages",
    since: 2021, web: "https://cachyos.org",
    tagline: "Arch, compiled for speed",
    desktop: "KDE Plasma", desktops: ["KDE Plasma", "GNOME", "COSMIC", "Hyprland", "Niri", "Xfce", "i3", "and more"],
    pkg: "pacman + AUR (optimised repos)", install: "sudo pacman -S vlc", update: "sudo pacman -Syu",
    release: "Rolling", cycle: "rolling", init: "systemd",
    difficulty: 3,
    desc: "CachyOS rebuilds Arch packages for newer CPU instruction sets (x86-64-v3, v4 and Zen 4) and ships its own tuned kernels with alternative schedulers. The result is measurably snappier on modern hardware. It has graphical and terminal installers, a handheld edition, and gaming tools ready out of the box, which has made it one of the most popular Arch derivatives.",
    standouts: ["Packages optimised for your CPU generation", "Tuned kernels with BORE and other schedulers", "Wide choice of desktops at install", "Handheld edition with Steam Gaming Mode"],
    pros: ["Real performance gains on new hardware", "Gaming ready", "Friendly installer", "Very active development"],
    cons: ["Optimised repos mean a little less testing than Arch", "Best on recent CPUs", "Fast-moving, like any rolling distro"],
    best_for: ["Gamers", "Performance enthusiasts", "Modern hardware"],
    scores: { ease:5, gaming:10, dev:8, server:3, privacy:4, lightweight:5, customize:9, rolling:10, terminal:5, gnome_de:3, kde_de:8, lite_de:3, community:7, enterprise:1, creative:3 },
  },

  {
    id: "omarchy", name: "Omarchy", family: "arch", parent: "arch", link: "repo",
    relation: "Arch with DHH's opinionated Hyprland setup",
    since: 2025, web: "https://omarchy.org",
    tagline: "An opinionated, keyboard-driven Arch desktop",
    desktop: "Hyprland", desktops: ["Hyprland"],
    pkg: "pacman + AUR", install: "sudo pacman -S vlc", update: "omarchy-update",
    release: "Rolling", cycle: "rolling", init: "systemd",
    difficulty: 3,
    desc: "Omarchy is David Heinemeier Hansson's opinionated take on an Arch desktop. One ISO installs Arch with the Hyprland tiling window manager, a curated set of apps and themes, and keyboard shortcuts for nearly everything, so you get a fully configured system in minutes instead of days. It's aimed at developers first, with Neovim, language tooling and a set of AI coding-agent command-line tools ready to launch, and it sets up Steam and NVIDIA drivers during installation. A non-profit foundation backs the project.",
    standouts: ["A fully configured Hyprland tiling desktop from one ISO", "Keyboard shortcuts and menus for almost everything", "Developer tools and AI coding agents ready to launch", "Themes that switch across the whole system"],
    pros: ["Arch's freshness without days of setup", "Fast, keyboard-first workflow", "Cohesive, good-looking defaults", "Very active development"],
    cons: ["Tiling and keyboard-driven: a big shift from Windows or macOS", "Opinionated, so changing its choices means learning how it's built", "Young project that moves quickly"],
    best_for: ["Developers", "Keyboard-driven users", "Arch-curious users who want it configured for them"],
    scores: { ease:5, gaming:6, dev:9, server:1, privacy:5, lightweight:6, customize:8, rolling:9, terminal:8, gnome_de:0, kde_de:0, lite_de:4, community:6, enterprise:1, creative:3 },
  },

  {
    id: "artix", name: "Artix Linux", family: "arch", parent: "arch", link: "source",
    relation: "Arch rebuilt without systemd",
    since: 2017, web: "https://artixlinux.org",
    tagline: "Arch with your choice of init",
    desktop: "None (your choice)", desktops: ["KDE Plasma", "Xfce", "LXQt", "Cinnamon", "MATE", "or none"],
    pkg: "pacman + AUR", install: "sudo pacman -S vlc", update: "sudo pacman -Syu",
    release: "Rolling", cycle: "rolling", init: "OpenRC, runit, s6 or dinit",
    difficulty: 4,
    desc: "Artix is a rolling Arch derivative with no systemd. It offers OpenRC, runit, s6 or dinit, and keeps its own repositories for the packages that need changes. It can still pull most software from Arch's repositories. It suits people who want Arch's model but a simpler, more traditional init.",
    standouts: ["Four init systems to choose from", "Rolling release like Arch", "Arch repository support available", "Graphical or base install images"],
    pros: ["Lightweight boot and service management", "Arch's freshness and the AUR", "Good fit for minimal systems", "Clear documentation"],
    cons: ["Some software assumes systemd", "Smaller community", "Arch Wiki needs translating for non-systemd setups"],
    best_for: ["systemd-free setups", "Experienced Arch users", "Minimal systems"],
    scores: { ease:2, gaming:6, dev:8, server:5, privacy:6, lightweight:7, customize:10, rolling:10, terminal:9, gnome_de:2, kde_de:5, lite_de:6, community:4, enterprise:1, creative:1 },
  },

  {
    id: "blackarch", name: "BlackArch", family: "arch", parent: "arch", link: "repo",
    relation: "A security-tool repository and ISO on top of Arch",
    since: 2013, web: "https://blackarch.org",
    tagline: "Arch with thousands of security tools",
    desktop: "Window managers", desktops: ["Openbox", "Fluxbox", "i3", "Awesome"],
    pkg: "pacman + BlackArch repository", install: "sudo pacman -S blackarch-recon", update: "sudo pacman -Syu",
    release: "Rolling", cycle: "rolling", init: "systemd",
    difficulty: 5,
    desc: "BlackArch is a penetration-testing distribution built on Arch. Its repository holds over 2,800 security tools organised into groups such as recon, exploitation and forensics. You can add it to an existing Arch install or boot the full ISO. It assumes you're comfortable with Arch and window managers, so it suits experienced practitioners more than learners.",
    standouts: ["Over 2,800 packaged security tools", "Add the repository to an existing Arch install", "Tool groups like blackarch-recon and blackarch-forensic", "Rolling, like Arch"],
    pros: ["The largest packaged security-tool collection", "Arch's freshness and the AUR", "Install only the groups you need", "Lightweight window managers"],
    cons: ["Assumes strong Arch and Linux experience", "Less curated than Kali", "Few courses or tutorials target it"],
    best_for: ["Experienced pentesters", "Arch users doing security work", "CTF veterans"],
    scores: { ease:1, gaming:3, dev:7, server:3, privacy:6, lightweight:5, customize:9, rolling:10, terminal:10, gnome_de:0, kde_de:0, lite_de:6, community:4, enterprise:1, creative:0 },
  },

  {
    id: "steamos", name: "SteamOS", family: "arch", parent: "arch", link: "source",
    relation: "Valve's frozen snapshot of Arch for gaming devices",
    since: 2013, web: "https://store.steampowered.com/steamos",
    tagline: "The OS behind the Steam Deck",
    desktop: "Steam Gaming Mode + KDE Plasma", desktops: ["Steam Gaming Mode", "KDE Plasma (Desktop Mode)"],
    pkg: "Flatpak (Discover)", install: "flatpak install flathub org.videolan.VLC", update: "Automatic, via Steam settings",
    release: "Image-based updates from Valve", cycle: "atomic", init: "systemd",
    difficulty: 1,
    desc: "SteamOS 3 is Valve's operating system for the Steam Deck and selected third-party handhelds. It boots into Steam's controller-first Gaming Mode, includes a full KDE Plasma desktop mode, and updates as a read-only image with automatic fallback. Early SteamOS versions were Debian-based; the current one is built on Arch.",
    standouts: ["Steam Gaming Mode built around a controller", "Proton runs most Windows games", "Read-only A/B image updates", "KDE Plasma desktop when you need it"],
    pros: ["Console-like experience", "Tight integration with Steam", "Very hard to break", "Valve funds a lot of upstream Linux work"],
    cons: ["Officially supports only selected devices", "Read-only base limits system tweaks", "Not a general-purpose desktop distro"],
    best_for: ["Steam Deck and handheld owners"],
    scores: { ease:9, gaming:10, dev:2, server:0, privacy:3, lightweight:3, customize:2, rolling:5, terminal:1, gnome_de:0, kde_de:7, lite_de:0, community:8, enterprise:0, creative:1 },
  },

  // ══ Independent ═════════════════════════════════════════════════════════════

  {
    id: "opensuse", name: "openSUSE", family: "independent", parent: null, link: null,
    relation: "Independent; descends from SUSE Linux, which began as a Slackware remix in 1994",
    since: 2005, web: "https://www.opensuse.org",
    tagline: "Stable Leap or rolling Tumbleweed, built by SUSE's community",
    desktop: "KDE Plasma", desktops: ["KDE Plasma", "GNOME", "Xfce", "and more"],
    pkg: "zypper (.rpm)", install: "sudo zypper install vlc", update: "sudo zypper dup  # Tumbleweed",
    release: "Leap (fixed) or Tumbleweed (rolling)", cycle: "rolling", init: "systemd",
    difficulty: 3,
    desc: "openSUSE comes in two main forms. Tumbleweed is a rolling release that's automatically tested by openQA before every snapshot. Leap is a fixed release built from the same sources as SUSE Linux Enterprise. Both install on Btrfs with Snapper snapshots, so you can roll back from the boot menu. The Open Build Service, which builds packages for many distros, comes from here.",
    standouts: ["Tumbleweed: rolling, but tested with openQA", "Btrfs and Snapper rollback by default", "Open Build Service", "Leap shares code with SUSE Linux Enterprise"],
    pros: ["Rolling with real safety nets", "Strong KDE experience", "Enterprise lineage", "Excellent admin tooling"],
    cons: ["Codecs need the Packman repository", "Smaller English community than Fedora or Ubuntu", "Leap's admin tools are changing"],
    best_for: ["KDE fans", "Sysadmins", "Developers", "Rolling-release users who want safety"],
    scores: { ease:5, gaming:6, dev:8, server:7, privacy:5, lightweight:3, customize:8, rolling:6, terminal:5, gnome_de:5, kde_de:9, lite_de:2, community:6, enterprise:8, creative:3 },
  },

  {
    id: "nixos", name: "NixOS", family: "independent", parent: null, link: null,
    relation: "Independent; built on the Nix package manager",
    since: 2003, web: "https://nixos.org",
    tagline: "Your whole system, declared in one config",
    desktop: "GNOME / KDE Plasma", desktops: ["GNOME", "KDE Plasma", "any"],
    pkg: "Nix", install: "nix-shell -p vlc  # or add pkgs.vlc to configuration.nix", update: "sudo nixos-rebuild switch --upgrade",
    release: "Stable twice a year (May, November) + unstable", cycle: "fixed", init: "systemd",
    difficulty: 5,
    desc: "On NixOS your entire system, from packages and services to users and settings, is described in configuration files and built reproducibly by Nix. Every change creates a new generation you can boot back into, and the same config produces the same machine anywhere. Nixpkgs is the largest package collection of any distro. The cost is a steep, unusual learning curve.",
    standouts: ["Declarative, reproducible configuration", "Atomic upgrades and bootable rollbacks", "Nixpkgs: the largest package repository", "Flakes and Home Manager for full-environment control"],
    pros: ["Reproducible across machines", "Fearless experimentation", "Huge package selection", "Development shells per project"],
    cons: ["Steep learning curve with its own language", "Doesn't follow the usual Linux filesystem layout", "Binaries built for other distros need extra steps"],
    best_for: ["Developers", "DevOps and infrastructure-as-code", "Multi-machine setups", "Tinkerers"],
    scores: { ease:1, gaming:5, dev:10, server:8, privacy:7, lightweight:4, customize:10, rolling:6, terminal:9, gnome_de:5, kde_de:5, lite_de:2, community:6, enterprise:4, creative:2 },
  },

  {
    id: "guix", name: "GNU Guix System", family: "independent", parent: null, link: null,
    relation: "Independent; built on the GNU Guix package manager",
    since: 2013, web: "https://guix.gnu.org",
    tagline: "A declarative, fully free system configured in Scheme",
    desktop: "GNOME / Xfce", desktops: ["GNOME", "Xfce", "MATE", "Enlightenment", "any"],
    pkg: "Guix", install: "guix install vlc", update: "guix pull && sudo guix system reconfigure /etc/config.scm",
    release: "Rolling, with occasional versioned releases", cycle: "rolling", init: "GNU Shepherd",
    difficulty: 5,
    desc: "GNU Guix System is the GNU Project's own distribution. As on NixOS, the whole system is declared in a configuration file and built reproducibly, with transactional upgrades and rollbacks. Unlike NixOS, that configuration is written in Guile Scheme, and the official system contains only free software running on the Linux-libre kernel. Researchers who need reproducible software environments are fond of it.",
    standouts: ["The whole system declared in Scheme", "Transactional upgrades and rollbacks", "Reproducible builds and environments", "Fully free and FSF-endorsed"],
    pros: ["Reproducible down to the toolchain", "Per-user packages and environments", "Hackable all the way down", "Principled about software freedom"],
    cons: ["Steep learning curve", "No proprietary drivers or firmware in the official system", "Smaller package set and community than NixOS"],
    best_for: ["Free-software advocates", "Reproducible research", "Lisp and Scheme fans"],
    scores: { ease:1, gaming:1, dev:9, server:6, privacy:8, lightweight:4, customize:10, rolling:6, terminal:9, gnome_de:4, kde_de:2, lite_de:3, community:3, enterprise:1, creative:1 },
  },

  {
    id: "gentoo", name: "Gentoo", family: "independent", parent: null, link: null,
    relation: "Independent; source-based",
    since: 2002, web: "https://www.gentoo.org",
    tagline: "Compile everything, exactly how you want it",
    desktop: "None (your choice)", desktops: ["Any"],
    pkg: "Portage (emerge)", install: "sudo emerge --ask media-video/vlc", update: "sudo emerge --ask --update --deep --newuse @world",
    release: "Rolling", cycle: "rolling", init: "OpenRC or systemd",
    difficulty: 5,
    desc: "Gentoo builds software from source using Portage. USE flags let you enable or strip features from every package, so the system contains exactly what you choose. Official binary packages are now available to cut compile times, but customisation is still the point. Its Handbook is a superb guide to how a Linux system fits together.",
    standouts: ["USE flags for per-package feature control", "OpenRC or systemd", "Optional official binary packages", "The Gentoo Handbook"],
    pros: ["Ultimate control", "You learn how Linux really works", "Lean systems with only what you enable", "Excellent documentation"],
    cons: ["Long compile times on slower machines", "Lengthy manual install", "Updates need attention"],
    best_for: ["Experts", "Learning Linux internals", "Tuned or unusual systems"],
    scores: { ease:1, gaming:5, dev:9, server:6, privacy:7, lightweight:8, customize:10, rolling:10, terminal:10, gnome_de:2, kde_de:3, lite_de:3, community:5, enterprise:2, creative:2 },
  },

  {
    id: "void", name: "Void Linux", family: "independent", parent: null, link: null,
    relation: "Independent; built from scratch",
    since: 2008, web: "https://voidlinux.org",
    tagline: "Independent, rolling and runit-based",
    desktop: "Xfce", desktops: ["Xfce", "or any you install"],
    pkg: "xbps", install: "sudo xbps-install -S vlc", update: "sudo xbps-install -Su",
    release: "Rolling", cycle: "rolling", init: "runit",
    difficulty: 4,
    desc: "Void is a from-scratch, rolling distro with its own fast xbps package manager and the tiny runit init system instead of systemd. It offers both glibc and musl builds. Its rolling repository is curated conservatively, so it tends to be more stable than you'd expect.",
    standouts: ["runit init: simple, fast service management", "xbps: fast package manager", "glibc and musl variants", "xbps-src for building packages"],
    pros: ["Fast boot and light footprint", "Stable for a rolling distro", "Clean, understandable system", "Good documentation"],
    cons: ["Smaller package selection than Arch", "Little GUI tooling", "Some software assumes systemd"],
    best_for: ["Minimalists", "systemd-free setups", "Experienced users"],
    scores: { ease:2, gaming:4, dev:8, server:6, privacy:6, lightweight:8, customize:9, rolling:9, terminal:8, gnome_de:1, kde_de:2, lite_de:6, community:4, enterprise:2, creative:1 },
  },

  {
    id: "slackware", name: "Slackware", family: "independent", parent: null, link: null,
    relation: "Independent; the oldest distro still maintained",
    since: 1993, web: "http://www.slackware.com",
    tagline: "The oldest surviving Linux distribution",
    desktop: "KDE Plasma / Xfce", desktops: ["KDE Plasma", "Xfce", "Fluxbox", "and more"],
    pkg: "pkgtool + slackpkg", install: "sudo slackpkg install vlc  # or build from SlackBuilds.org", update: "sudo slackpkg update && sudo slackpkg upgrade-all",
    release: "Rare stable releases + -current branch", cycle: "fixed", init: "BSD-style sysvinit",
    difficulty: 5,
    desc: "Slackware, started by Patrick Volkerding in 1993, is the oldest Linux distribution still maintained. It keeps things Unix-like and unchanged: plain-text configuration, BSD-style init scripts, and a package manager that deliberately doesn't resolve dependencies for you. Stable releases are rare, and the -current branch carries newer software.",
    standouts: ["Unchanged Unix-like design philosophy", "Plain shell-script init", "SlackBuilds.org for extra software", "Very long-lived installs"],
    pros: ["Stable and predictable", "Teaches classic Unix administration", "Nothing hidden behind tools", "Loyal community"],
    cons: ["No automatic dependency resolution", "Stable releases are years apart", "Few modern conveniences"],
    best_for: ["Unix purists", "Experienced users", "Learning classic administration"],
    scores: { ease:1, gaming:2, dev:6, server:6, privacy:5, lightweight:6, customize:9, rolling:0, terminal:10, gnome_de:0, kde_de:4, lite_de:5, community:3, enterprise:2, creative:1 },
  },

  {
    id: "alpine", name: "Alpine Linux", family: "independent", parent: null, link: null,
    relation: "Independent; musl and BusyBox",
    since: 2005, web: "https://alpinelinux.org",
    tagline: "Tiny, security-minded and built for containers",
    desktop: "None (server)", desktops: ["None", "GNOME, KDE Plasma or Xfce if you want one"],
    pkg: "apk", install: "doas apk add vlc", update: "doas apk upgrade --update-cache",
    release: "Stable twice a year, each supported two years + edge", cycle: "fixed", init: "OpenRC",
    difficulty: 4,
    desc: "Alpine is built on musl libc and BusyBox, which makes its base container image only a few megabytes. That's why it's one of the most common Docker base images. It uses OpenRC and the fast apk package manager and is compiled with hardening flags. It can run a desktop, but servers, containers and appliances are its home.",
    standouts: ["Container base image of only a few MB", "musl libc and BusyBox", "apk: very fast package manager", "Diskless and run-from-RAM modes"],
    pros: ["Tiny attack surface", "Very fast to boot and deploy", "Simple, readable system", "Excellent for containers"],
    cons: ["musl breaks some glibc-only software", "Thin desktop experience", "Smaller documentation base"],
    best_for: ["Containers", "Servers and routers", "Embedded systems"],
    scores: { ease:2, gaming:0, dev:6, server:10, privacy:6, lightweight:10, customize:6, rolling:2, terminal:10, gnome_de:1, kde_de:1, lite_de:2, community:6, enterprise:6, creative:0 },
  },

  {
    id: "solus", name: "Solus", family: "independent", parent: null, link: null,
    relation: "Independent; built from scratch",
    since: 2015, web: "https://getsol.us",
    tagline: "An independent, curated rolling desktop",
    desktop: "Budgie", desktops: ["Budgie", "KDE Plasma", "GNOME", "Xfce"],
    pkg: "eopkg", install: "sudo eopkg install vlc", update: "sudo eopkg upgrade",
    release: "Curated rolling, weekly sync", cycle: "rolling", init: "systemd",
    difficulty: 2,
    desc: "Solus is built from scratch for home desktops. It's the birthplace of the Budgie desktop and also offers KDE Plasma, GNOME and Xfce editions. Updates land as a tested weekly batch, so the system stays current without the churn of a fully rolling distro.",
    standouts: ["Curated weekly update batches", "Budgie, Plasma, GNOME and Xfce editions", "Desktop-only focus", "Independent eopkg package system"],
    pros: ["Fresh but stable", "Friendly for newcomers", "Coherent, focused experience", "Fast"],
    cons: ["Smaller repository than big distros", "Small team", "Third-party .deb/.rpm installers don't apply"],
    best_for: ["Home desktops", "Budgie fans", "Users who want rolling without the risk"],
    scores: { ease:7, gaming:5, dev:6, server:0, privacy:4, lightweight:5, customize:6, rolling:6, terminal:3, gnome_de:4, kde_de:4, lite_de:3, community:4, enterprise:0, creative:3 },
  },
];

// ─── Quiz profile ────────────────────────────────────────────────────────────
//
// Extra scores (0–10) the quiz uses on top of each distro's `scores`, plus hard
// facts used as filters. Kept in one table so they're easy to audit side by side.
//
//   ai     AI/ML readiness: GPU compute stacks, CUDA/ROCm, AI tooling
//   sec    offensive-security tooling       anon  anonymity (Tor, amnesia, isolation)
//   hand   handheld / couch gaming          tile  tiling, keyboard-driven desktop
//   atom   atomic updates with rollback     long  support length / few big upgrades
//   win    Windows-like layout              mac   macOS-like feel
//   free   commitment to free software      nvid  ease of NVIDIA proprietary drivers
//
// Facts: sd = ships systemd by default, snap = Snap preinstalled, corp = run or
// steered by a company, fsf = FSF-endorsed fully free, ai = AI assistant built
// into the desktop, hw = supported hardware (x86, arm, rpi, apple, i686).

const QUIZ_PROFILE_COLUMNS = ["ai", "security", "anonymity", "handheld", "tiling", "atomic", "longevity", "windows_like", "mac_like", "freedom", "nvidia"];
const QUIZ_PROFILE = {
  //                ai sec anon hand tile atom long win mac free nvid
  debian:        { s: [5, 2, 2, 0, 4, 2, 8, 4, 3, 8, 5],  sd: 1, snap: 0, corp: 0, hw: "x86 arm i686" },
  ubuntu:        { s: [9, 2, 1, 0, 2, 2, 9, 3, 4, 4, 9],  sd: 1, snap: 1, corp: 1, hw: "x86 arm rpi" },
  mint:          { s: [6, 1, 1, 0, 2, 3, 8, 10, 3, 3, 8], sd: 1, snap: 0, corp: 0, hw: "x86" },
  zorin:         { s: [5, 1, 1, 0, 2, 2, 8, 10, 7, 3, 8], sd: 1, snap: 1, corp: 1, hw: "x86" },
  elementary:    { s: [3, 1, 1, 0, 2, 2, 7, 2, 10, 4, 6], sd: 1, snap: 0, corp: 1, hw: "x86" },
  popos:         { s: [9, 2, 1, 0, 7, 3, 7, 3, 5, 3, 10], sd: 1, snap: 0, corp: 1, hw: "x86" },
  kubuntu:       { s: [7, 1, 1, 0, 3, 2, 8, 8, 3, 4, 8],  sd: 1, snap: 1, corp: 0, hw: "x86" },
  lubuntu:       { s: [4, 1, 1, 0, 2, 2, 8, 7, 2, 4, 7],  sd: 1, snap: 1, corp: 0, hw: "x86" },
  ubuntu_budgie: { s: [4, 1, 1, 0, 4, 2, 8, 5, 6, 4, 7],  sd: 1, snap: 1, corp: 0, hw: "x86" },
  ubuntu_studio: { s: [6, 1, 1, 0, 2, 2, 8, 7, 3, 4, 8],  sd: 1, snap: 1, corp: 0, hw: "x86" },
  linuxlite:     { s: [4, 1, 1, 0, 1, 2, 8, 9, 2, 3, 7],  sd: 1, snap: 0, corp: 0, hw: "x86" },
  lmde:          { s: [4, 1, 1, 0, 2, 2, 7, 9, 3, 5, 6],  sd: 1, snap: 0, corp: 0, hw: "x86" },
  trisquel:      { s: [2, 1, 1, 0, 2, 2, 8, 6, 2, 10, 0], sd: 1, snap: 0, corp: 0, fsf: 1, hw: "x86" },
  antix:         { s: [1, 1, 2, 0, 5, 1, 6, 4, 1, 6, 3],  sd: 0, snap: 0, corp: 0, hw: "x86 i686" },
  mxlinux:       { s: [3, 1, 2, 0, 3, 2, 7, 7, 2, 5, 6],  sd: 0, snap: 0, corp: 0, hw: "x86 i686 rpi" },
  devuan:        { s: [2, 2, 2, 0, 4, 1, 7, 4, 2, 8, 4],  sd: 0, snap: 0, corp: 0, hw: "x86 arm i686" },
  kali:          { s: [5, 10, 4, 0, 3, 1, 2, 4, 2, 3, 6], sd: 1, snap: 0, corp: 1, hw: "x86 arm rpi" },
  parrot:        { s: [4, 9, 7, 0, 2, 1, 5, 6, 2, 4, 5],  sd: 1, snap: 0, corp: 1, hw: "x86 arm rpi" },
  tails:         { s: [0, 2, 10, 0, 1, 6, 2, 2, 4, 7, 0], sd: 1, snap: 0, corp: 0, hw: "x86" },
  whonix:        { s: [1, 3, 10, 0, 2, 2, 5, 3, 2, 6, 0], sd: 1, snap: 0, corp: 0, hw: "x86" },
  peppermint:    { s: [2, 1, 1, 0, 2, 1, 6, 6, 2, 5, 4],  sd: 1, snap: 0, corp: 0, hw: "x86" },
  deepin:        { s: [6, 1, 1, 0, 1, 5, 5, 6, 8, 3, 5],  sd: 1, snap: 0, corp: 1, ai: 1, hw: "x86 arm" },
  puppy:         { s: [0, 1, 1, 0, 1, 3, 4, 5, 1, 3, 2],  sd: 0, snap: 0, corp: 0, hw: "x86 i686" },
  raspberrypi:   { s: [3, 2, 1, 0, 2, 2, 6, 6, 2, 5, 0],  sd: 1, snap: 0, corp: 1, hw: "rpi arm" },
  proxmox:       { s: [4, 2, 1, 0, 0, 2, 8, 1, 1, 5, 4],  sd: 1, snap: 0, corp: 1, hw: "x86" },
  truenas:       { s: [3, 1, 1, 0, 0, 7, 6, 1, 1, 4, 5],  sd: 1, snap: 0, corp: 1, hw: "x86" },
  dietpi:        { s: [2, 1, 1, 0, 1, 1, 6, 1, 1, 4, 1],  sd: 1, snap: 0, corp: 0, hw: "x86 arm rpi" },
  fedora:        { s: [7, 3, 2, 0, 5, 3, 3, 4, 4, 7, 5],  sd: 1, snap: 0, corp: 1, hw: "x86 arm rpi" },
  silverblue:    { s: [6, 2, 2, 0, 4, 10, 3, 3, 5, 7, 4], sd: 1, snap: 0, corp: 1, hw: "x86 arm" },
  bazzite:       { s: [5, 1, 1, 10, 2, 10, 4, 7, 4, 2, 10], sd: 1, snap: 0, corp: 0, hw: "x86" },
  bluefin:       { s: [9, 2, 2, 0, 3, 10, 4, 3, 6, 4, 9], sd: 1, snap: 0, corp: 0, hw: "x86" },
  aurora:        { s: [8, 2, 2, 0, 3, 10, 4, 7, 3, 4, 9], sd: 1, snap: 0, corp: 0, hw: "x86" },
  nobara:        { s: [6, 1, 1, 7, 2, 1, 3, 7, 3, 2, 10], sd: 1, snap: 0, corp: 0, hw: "x86" },
  asahi:         { s: [5, 2, 2, 0, 4, 2, 3, 4, 5, 6, 0],  sd: 1, snap: 0, corp: 0, hw: "apple" },
  centos:        { s: [6, 3, 2, 0, 2, 1, 7, 3, 3, 6, 4],  sd: 1, snap: 0, corp: 1, hw: "x86 arm" },
  rhel:          { s: [8, 3, 2, 0, 2, 1, 10, 3, 3, 6, 5], sd: 1, snap: 0, corp: 1, hw: "x86 arm" },
  rocky:         { s: [6, 3, 2, 0, 2, 1, 10, 3, 3, 6, 5], sd: 1, snap: 0, corp: 0, hw: "x86 arm" },
  almalinux:     { s: [6, 3, 2, 0, 2, 1, 10, 3, 3, 6, 5], sd: 1, snap: 0, corp: 0, hw: "x86 arm" },
  qubes:         { s: [1, 5, 9, 0, 2, 4, 5, 3, 2, 5, 0],  sd: 1, snap: 0, corp: 0, hw: "x86" },
  arch:          { s: [8, 4, 2, 0, 7, 1, 3, 4, 3, 5, 8],  sd: 1, snap: 0, corp: 0, hw: "x86" },
  manjaro:       { s: [6, 2, 1, 1, 3, 2, 3, 7, 3, 4, 9],  sd: 1, snap: 0, corp: 1, hw: "x86 arm rpi" },
  endeavouros:   { s: [7, 3, 2, 1, 6, 1, 3, 7, 3, 5, 9],  sd: 1, snap: 0, corp: 0, hw: "x86" },
  garuda:        { s: [6, 2, 1, 3, 6, 6, 3, 6, 3, 3, 9],  sd: 1, snap: 0, corp: 0, hw: "x86" },
  cachyos:       { s: [8, 2, 1, 7, 6, 3, 3, 7, 3, 4, 10], sd: 1, snap: 0, corp: 0, hw: "x86" },
  omarchy:       { s: [8, 3, 1, 1, 10, 2, 3, 1, 4, 4, 9], sd: 1, snap: 0, corp: 0, agents: 1, hw: "x86" },
  artix:         { s: [4, 3, 2, 0, 6, 1, 3, 4, 2, 6, 6],  sd: 0, snap: 0, corp: 0, hw: "x86" },
  blackarch:     { s: [4, 10, 4, 0, 7, 1, 2, 2, 1, 4, 6], sd: 1, snap: 0, corp: 0, hw: "x86" },
  steamos:       { s: [3, 0, 0, 10, 0, 10, 4, 4, 3, 2, 0], sd: 1, snap: 0, corp: 1, hw: "x86" },
  opensuse:      { s: [6, 3, 2, 0, 4, 6, 6, 7, 3, 6, 7],  sd: 1, snap: 0, corp: 1, hw: "x86 arm rpi" },
  nixos:         { s: [7, 4, 3, 0, 7, 9, 4, 4, 3, 5, 7],  sd: 1, snap: 0, corp: 0, hw: "x86 arm" },
  guix:          { s: [3, 3, 2, 0, 5, 9, 4, 2, 2, 10, 0], sd: 0, snap: 0, corp: 0, fsf: 1, hw: "x86 arm" },
  gentoo:        { s: [5, 4, 3, 0, 6, 1, 4, 4, 2, 7, 7],  sd: 0, snap: 0, corp: 0, hw: "x86 arm i686" },
  void:          { s: [3, 3, 2, 0, 6, 1, 4, 4, 2, 6, 6],  sd: 0, snap: 0, corp: 0, hw: "x86 arm i686 rpi" },
  slackware:     { s: [2, 3, 2, 0, 3, 1, 7, 5, 2, 6, 4],  sd: 0, snap: 0, corp: 0, hw: "x86 arm i686" },
  alpine:        { s: [2, 3, 2, 0, 4, 3, 5, 2, 1, 6, 0],  sd: 0, snap: 0, corp: 0, hw: "x86 arm rpi" },
  solus:         { s: [4, 1, 1, 0, 2, 2, 4, 6, 4, 4, 7],  sd: 1, snap: 0, corp: 0, hw: "x86" },
};

for (const d of DISTROS) {
  const p = QUIZ_PROFILE[d.id];
  QUIZ_PROFILE_COLUMNS.forEach((attr, i) => { d.scores[attr] = p.s[i]; });
  d.facts = {
    systemd: !!p.sd, snap: !!p.snap, corporate: !!p.corp, fsf: !!p.fsf,
    aiDesktop: !!p.ai, aiAgents: !!p.agents, hardware: p.hw.split(" "),
  };
}

// Roles come from editions (editions.js): which quiz tracks a distro can serve.
for (const d of DISTROS) {
  const eds = EDITIONS[d.id] || [];
  d.editions = eds;
  d.roles = [...new Set(eds.flatMap(e => e.roles))];
}

const hasRole = (d, role) => d.roles.includes(role);
const hasEditionTag = (d, tag, role) => d.editions.some(e => e.tags.includes(tag) && (!role || e.roles.includes(role)));
const isOneOf = (...ids) => d => ids.includes(d.id);

// ─── Quiz tracks ─────────────────────────────────────────────────────────────
//
// The first answer picks a track. Each track has its own stages, and the pool
// of candidate distros starts as everything that can serve that role. Filter
// answers then narrow the pool, and the quiz pauses at a checkpoint whenever a
// stage has narrowed it, so you can see what's left before carrying on.

const QUIZ_TRACKS = {
  pc:       { label: "A desktop or laptop",             role: "desktop",  pool: d => hasRole(d, "desktop"),
              stages: ["Your computer", "How hands-on", "What you'll do", "Look and updates", "Must-haves"] },
  server:   { label: "A server or homelab",             role: "server",   pool: d => hasRole(d, "server"),
              stages: ["The job", "Where it runs", "How long it lasts", "Running it", "Must-haves"] },
  security: { label: "A security testing toolkit",      role: "security", pool: d => hasRole(d, "security"),
              stages: ["Your experience", "How you'll run it", "Your focus", "Preferences"] },
  privacy:  { label: "A private or anonymous system",   role: "privacy",  pool: d => hasRole(d, "privacy") || hasRole(d, "desktop"),
              stages: ["Your goal", "How you'll use it", "Your computer", "Daily life"] },
  gaming:   { label: "A gaming handheld or TV PC",      role: "gaming",   pool: d => hasRole(d, "gaming"),
              stages: ["The device", "How you'll play", "Upkeep"] },
  iot:      { label: "A Raspberry Pi or IoT device",    role: "iot",      pool: d => hasRole(d, "iot"),
              stages: ["The board", "The job", "Setup"] },
};

// ─── Quiz questions ──────────────────────────────────────────────────────────
//
// tracks    which tracks ask it; stage is an index into that track's stages
//           (a number, or { track: index } when tracks place it differently)
// type      "single" or "multi" (multi: choose all that apply; `exclusive` ids clear the rest)
// combine   for multi filters: "any" keeps distros matching any choice (default), "all" every choice
// quick     included in the short version of the quiz
// when      only asked if it returns true for the answers so far
// Options can carry:
//   keep      (distro) => boolean. A filter: distros that fail it leave the pool
//   weights   adds to the "want" vector (see scoring below)
//   requires  { attr: min } a soft minimum, penalised when missed
//   boost     [{ ids, by, reason }] direct nudges for specific distros, with the reason shown
//   tags      edition tags this answer points to (see editions.js)
//   note      key into QUIZ_NOTES, shown on the results page

const QUIZ_SECTIONS_START = "Start";

const PURPOSE_OPTIONS = [
  { id: "everyday", label: "Everyday computing",       desc: "Browsing, email, streaming, documents",            weights: { ease: 8, community: 2 } },
  { id: "work",     label: "Work and study",           desc: "Office apps, video calls, writing, school",        weights: { ease: 6, enterprise: 3, longevity: 4 } },
  { id: "gaming",   label: "Gaming",                   desc: "Steam, Proton, emulators",                         weights: { gaming: 20 } },
  { id: "creative", label: "Creative work",            desc: "Music, video, photography, design, 3D",            weights: { creative: 20, dev: 2 } },
  { id: "dev",      label: "Programming",              desc: "Writing code, containers, toolchains",             weights: { dev: 20, terminal: 3 }, tags: ["dev"] },
  { id: "ai",       label: "AI and machine learning",  desc: "Running or building models, GPU compute",          weights: { ai: 20, dev: 4 }, tags: ["ai"] },
  { id: "security", label: "Learning security",        desc: "Some pentesting practice on my main computer",     weights: { security: 14, terminal: 3 } },
  { id: "privacy",  label: "Privacy",                  desc: "Less tracking, more control",                      weights: { privacy: 14, freedom: 3 } },
  { id: "learning", label: "Learning how Linux works", desc: "Understanding it under the hood",                  weights: { customize: 10, terminal: 4, rolling: 3 } },
];

const SERVER_JOBS = {
  hypervisor: ["proxmox", "debian", "ubuntu", "fedora", "rhel", "rocky", "almalinux", "opensuse", "nixos"],
  nas:        ["truenas", "debian", "ubuntu", "fedora", "rocky", "almalinux", "opensuse", "nixos"],
  containers: ["fedora", "opensuse", "alpine", "ubuntu", "debian", "nixos", "rhel", "rocky", "almalinux", "centos"],
  web:        ["debian", "ubuntu", "rocky", "almalinux", "rhel", "centos", "fedora", "opensuse", "alpine", "nixos", "devuan", "gentoo", "slackware", "void", "arch", "artix", "guix", "asahi"],
  enterprise: ["rhel", "rocky", "almalinux", "centos", "ubuntu", "opensuse"],
  home:       ["dietpi", "debian", "ubuntu", "alpine", "fedora", "opensuse", "nixos", "proxmox", "raspberrypi", "devuan", "asahi"],
  learn:      ["debian", "ubuntu", "rocky", "almalinux", "rhel", "centos", "fedora", "opensuse", "arch", "gentoo", "nixos", "alpine", "slackware", "void"],
};

const QUIZ_QUESTIONS = [
  // ── Start: every track begins here ──
  {
    id: "track", quick: true,
    text: "What are you setting up?",
    hint: "This decides which distros are even in the running, and which questions come next.",
    options: Object.entries(QUIZ_TRACKS).map(([id, t]) => ({
      id, label: t.label,
      desc: {
        pc: "Your everyday computer: work, gaming, creating, coding",
        server: "Self-hosting, VMs, storage, websites, enterprise work",
        security: "Penetration testing, CTFs, forensics, security study",
        privacy: "Less tracking, strong isolation or full anonymity",
        gaming: "Steam Deck, ROG Ally, Legion Go or a living-room PC",
        iot: "Single-board computers, home automation, edge devices",
      }[id],
    })),
  },

  // ════ Desktop or laptop ════
  {
    id: "device", tracks: ["pc"], stage: 0, quick: true,
    text: "What kind of computer is it?",
    hint: "Some hardware only works with particular distros. For a Steam Deck or handheld, go back and pick the gaming handheld track.",
    options: [
      { id: "pc",       label: "A Windows PC or one I built", desc: "Desktop or laptop with an Intel or AMD processor", keep: d => d.facts.hardware.includes("x86") },
      { id: "apple",    label: "An Apple Silicon Mac",        desc: "M1 or newer", keep: d => d.facts.hardware.includes("apple"), note: "apple" },
      { id: "intelmac", label: "An older Intel Mac",          desc: "From before Apple Silicon", keep: d => d.facts.hardware.includes("x86"), note: "intelmac" },
    ],
  },
  {
    id: "hardware", tracks: ["pc"], stage: 0, quick: true,
    when: a => a.device !== "apple",
    text: "How old is it?",
    hint: "Older hardware does better with a lighter distro.",
    options: [
      { id: "old",    label: "More than 10 years", desc: "It struggles with modern browsers", weights: { lightweight: 14, gaming: -3 }, keep: d => d.scores.lightweight >= 5, tags: ["old", "light"] },
      { id: "medium", label: "4 to 10 years",      desc: "Fine, but not fast", weights: { lightweight: 4 } },
      { id: "new",    label: "Less than 4 years",  desc: "Fast, with plenty of RAM", weights: { gaming: 2 } },
    ],
  },
  {
    id: "ram", tracks: ["pc", "privacy"], stage: { pc: 0, privacy: 2 },
    when: a => a.device !== "apple",
    text: "How much memory (RAM) does it have?",
    hint: "On Windows it's under Settings › System › About. On a Mac, Apple menu › About This Mac.",
    options: [
      { id: "lt4",    label: "Less than 4 GB",  desc: "Common on older laptops", weights: { lightweight: 10 }, keep: d => d.scores.lightweight >= 7 && d.id !== "qubes", tags: ["light", "old"] },
      { id: "4to8",   label: "4 to 8 GB",       desc: "Enough for most distros", weights: { lightweight: 4 }, keep: d => d.id !== "qubes" },
      { id: "8to16",  label: "8 to 16 GB",      desc: "Comfortable for anything", weights: {} },
      { id: "gt16",   label: "More than 16 GB", desc: "Room for VMs and big projects", weights: {} },
      { id: "unsure", label: "Not sure",        desc: "", weights: {} },
    ],
  },
  {
    id: "gpu", tracks: ["pc", "gaming"], stage: { pc: 0, gaming: 0 },
    when: a => a.track === "pc" ? a.device === "pc" : a.game_device === "tv",
    text: "What graphics does it have?",
    hint: "This matters most for gaming, AI and video work.",
    options: [
      { id: "nvidia", label: "NVIDIA GeForce or RTX", desc: "A separate NVIDIA graphics card", weights: { nvidia: 10 }, tags: ["nvidia"], note: "nvidia" },
      { id: "amd",    label: "AMD Radeon",            desc: "Open-source drivers built in", weights: {} },
      { id: "intel",  label: "Intel or integrated",   desc: "Graphics built into the processor", weights: {} },
      { id: "unsure", label: "Not sure",              desc: "", weights: { nvidia: 3 } },
    ],
  },
  {
    id: "dualboot", tracks: ["pc"], stage: 0,
    when: a => a.device !== "apple",
    text: "Will you keep your current operating system?",
    hint: "Every distro here can sit alongside Windows. It just needs a little preparation.",
    options: [
      { id: "replace", label: "No, replace it",              desc: "Linux will be the only system", weights: {} },
      { id: "dual",    label: "Yes, keep both",              desc: "Choose which one to start each time", weights: { ease: 2 }, note: "dualboot" },
      { id: "spare",   label: "It's a spare or new machine", desc: "Nothing to keep", weights: {} },
    ],
  },
  {
    id: "experience", tracks: ["pc", "privacy"], stage: { pc: 1, privacy: 3 },
    text: "How comfortable are you with computers in general?",
    hint: "There's no wrong answer. This sets how much hand-holding you'll get.",
    options: [
      { id: "new",   label: "I'm a casual user",      desc: "Mostly web, email, video and documents", weights: { ease: 10, terminal: -6, customize: -3, community: 5 } },
      { id: "mid",   label: "I'm fairly comfortable", desc: "I can troubleshoot and install software on my own", weights: { ease: 4 } },
      { id: "power", label: "I'm a power user",       desc: "I script, use the command line or do technical work", weights: { dev: 3, customize: 4, terminal: 4 } },
    ],
  },
  {
    id: "linux_exp", tracks: ["pc"], stage: 1,
    text: "How much have you used Linux before?",
    hint: "Pick the one that describes you today.",
    options: [
      { id: "never",    label: "Never",                desc: "This would be my first Linux install", weights: { ease: 8, terminal: -6 } },
      { id: "tried",    label: "A little",             desc: "I've booted a live USB or used it briefly", weights: { ease: 3 } },
      { id: "regular",  label: "Now and then",         desc: "I know the basics and have installed a distro or two", weights: { customize: 3, terminal: 3, rolling: 2 } },
      { id: "advanced", label: "It's my daily driver", desc: "I'm at home in a terminal", weights: { terminal: 6, customize: 5, rolling: 4 } },
    ],
  },
  {
    id: "handson", tracks: ["pc"], stage: 1, quick: true,
    text: "How hands-on do you want to be?",
    hint: "This rules out distros that expect more work than you want to put in.",
    options: [
      { id: "forget",  label: "Install it and forget it",       desc: "Everything works with no setup", weights: { ease: 8, terminal: -6 }, keep: d => d.difficulty <= 2 },
      { id: "some",    label: "A little tinkering is fine",     desc: "I'll follow a guide when I need to", weights: { ease: 3, customize: 3 }, keep: d => d.difficulty <= 3 },
      { id: "learn",   label: "I'll learn the hard parts",      desc: "Happy to read docs and fix things", weights: { customize: 5, terminal: 3 }, keep: d => d.difficulty <= 4 },
      { id: "build",   label: "I want to build it myself",      desc: "From a minimal base, piece by piece", weights: { customize: 8, terminal: 5 } },
    ],
  },
  {
    id: "terminal", tracks: ["pc"], stage: 1,
    text: "How do you feel about the terminal?",
    hint: "Every distro has one. Some need it more than others.",
    options: [
      { id: "avoid",      label: "I'd rather avoid it", desc: "Give me graphical tools for everything", weights: { ease: 8, terminal: -8 } },
      { id: "occasional", label: "Fine now and then",   desc: "I can paste a command when I need to", weights: { ease: 3 } },
      { id: "love",       label: "It's my main tool",   desc: "Faster than any GUI", weights: { terminal: 8, customize: 5 } },
    ],
  },
  {
    id: "purposes", tracks: ["pc"], stage: 2, quick: true, type: "multi",
    text: "What will you use it for?",
    hint: "Choose everything that applies. You'll pick the most important one next.",
    options: PURPOSE_OPTIONS,
  },
  {
    id: "primary", tracks: ["pc"], stage: 2, quick: true,
    when: a => quizSelected(a, "purposes").length > 1,
    text: "Which of those matters most?",
    hint: "Your main use counts double. The rest still count.",
    options: PURPOSE_OPTIONS.map(o => ({ id: o.id, label: o.label, desc: o.desc })),
    visible: a => quizSelected(a, "purposes"),
  },
  {
    id: "who", tracks: ["pc"], stage: 2,
    when: a => quizHas(a, "purposes", "everyday") || quizHas(a, "purposes", "work"),
    text: "Who's going to use this computer?",
    hint: "A machine for someone else needs to be harder to break.",
    options: [
      { id: "me",      label: "Just me",                     desc: "I'll look after it myself", weights: {} },
      { id: "family",  label: "Me and my family",            desc: "Including kids or other people at home", weights: { ease: 4, longevity: 3, community: 2 } },
      { id: "nontech", label: "Someone who isn't technical", desc: "A parent or grandparent, for example", weights: { ease: 8, longevity: 6, terminal: -4, windows_like: 2 } },
      { id: "school",  label: "A school or classroom",       desc: "Shared machines for students", weights: { longevity: 6, enterprise: 3, atomic: 3 }, tags: ["education"] },
      { id: "fleet",   label: "Several work machines",       desc: "An office or lab", weights: { longevity: 6, enterprise: 5, atomic: 3 } },
    ],
  },
  {
    id: "gaming_kind", tracks: ["pc"], stage: 2, type: "multi", exclusive: ["plain"],
    when: a => quizHas(a, "purposes", "gaming"),
    text: "What kind of gaming?",
    hint: "Choose everything that applies.",
    options: [
      { id: "steam",     label: "Steam games",                  desc: "Native Linux games and Windows games through Proton", weights: { gaming: 4 } },
      { id: "launchers", label: "Other launchers",              desc: "Epic, GOG, Battle.net or EA through Heroic or Lutris", weights: { gaming: 3 }, boost: [{ ids: ["nobara", "bazzite", "cachyos"], by: 4, reason: "Gaming tools like Lutris and Heroic are easy to get going" }] },
      { id: "emulation", label: "Emulation and retro",          desc: "RetroArch, console emulators", weights: { gaming: 2 } },
      { id: "competitive", label: "Competitive online games",   desc: "Shooters and battle royales", weights: { gaming: 2 }, note: "anticheat" },
      { id: "vr",        label: "Virtual reality",              desc: "SteamVR or a standalone headset linked to the PC", weights: { gaming: 2, rolling: 2 }, note: "vr" },
      { id: "plain",     label: "Nothing specific",             desc: "A bit of everything", weights: {} },
    ],
  },
  {
    id: "creative_kind", tracks: ["pc"], stage: 2, type: "multi",
    when: a => quizHas(a, "purposes", "creative"),
    text: "What kind of creative work?",
    hint: "Choose everything that applies.",
    options: [
      { id: "audio",  label: "Music and audio production", desc: "Recording, mixing, DAWs, plugins", weights: { creative: 4 }, boost: [{ ids: ["ubuntu_studio"], by: 14, reason: "Low-latency audio set up out of the box" }] },
      { id: "video",  label: "Video editing",              desc: "Kdenlive, DaVinci Resolve, Blender's editor", weights: { creative: 3, nvidia: 2 } },
      { id: "photo",  label: "Photography and design",     desc: "Darktable, GIMP, Krita, Inkscape", weights: { creative: 3 } },
      { id: "3d",     label: "3D and animation",           desc: "Blender, game assets", weights: { creative: 3, nvidia: 3 } },
      { id: "stream", label: "Streaming and recording",    desc: "OBS, capture cards", weights: { creative: 2, gaming: 2 }, boost: [{ ids: ["nobara"], by: 10, reason: "OBS and streaming fixes are preinstalled" }] },
    ],
  },
  {
    id: "dev_kind", tracks: ["pc"], stage: 2, type: "multi",
    when: a => quizHas(a, "purposes", "dev"),
    text: "What kind of development?",
    hint: "Choose everything that applies.",
    options: [
      { id: "web",        label: "Web and app development",        desc: "JavaScript, Python, Ruby, mobile", weights: { dev: 3 } },
      { id: "containers", label: "Containers and cloud",           desc: "Docker, Podman, Kubernetes, devcontainers", weights: { atomic: 3, server: 2 }, tags: ["dev"], boost: [{ ids: ["bluefin"], by: 12, reason: "Built around containers and devcontainers" }, { ids: ["aurora"], by: 8, reason: "Built around containers and devcontainers" }, { ids: ["fedora", "silverblue"], by: 4, reason: "Podman and Toolbx are first-class" }] },
      { id: "systems",    label: "Systems and embedded",           desc: "C, C++, Rust, kernels, microcontrollers", weights: { customize: 3, terminal: 3, rolling: 2 } },
      { id: "repro",      label: "Reproducible environments",      desc: "The same setup on every machine, from code", weights: { atomic: 4 }, boost: [{ ids: ["nixos"], by: 16, reason: "Every machine is built from the same declarative config" }, { ids: ["guix"], by: 10, reason: "Every machine is built from the same declarative config" }] },
      { id: "gamedev",    label: "Game development",               desc: "Godot, Unity, Unreal", weights: { gaming: 3, nvidia: 2 } },
      { id: "keyboard",   label: "A keyboard-driven editor setup", desc: "Neovim, tmux, tiling windows", weights: { tiling: 6, terminal: 2 }, tags: ["tiling"], boost: [{ ids: ["omarchy"], by: 10, reason: "Neovim, tiling and keyboard shortcuts configured for you" }] },
    ],
  },
  {
    id: "ai_kind", tracks: ["pc"], stage: 2, type: "multi",
    when: a => quizHas(a, "purposes", "ai"),
    text: "What will you do with AI?",
    hint: "Choose everything that applies.",
    options: [
      { id: "local",  label: "Run models locally",        desc: "LLMs with Ollama or llama.cpp, image generation", weights: { ai: 6, nvidia: 3 }, tags: ["ai"] },
      { id: "train",  label: "Train or fine-tune models", desc: "PyTorch, CUDA or ROCm, notebooks", weights: { ai: 6, dev: 3, longevity: 2 }, tags: ["ai", "nvidia"], boost: [{ ids: ["ubuntu", "popos"], by: 5, reason: "The platform most CUDA and ML tooling targets first" }] },
      { id: "build",  label: "Build AI apps",             desc: "APIs, agents, RAG pipelines", weights: { dev: 4, ai: 3 }, tags: ["dev"] },
      { id: "agents", label: "Use AI coding agents",      desc: "Claude Code, Codex and similar in the terminal", weights: { terminal: 2, dev: 2 }, boost: [{ ids: ["omarchy"], by: 10, reason: "Ships with AI coding-agent tools ready to launch" }] },
    ],
  },
  {
    id: "learning_kind", tracks: ["pc"], stage: 2,
    when: a => quizHas(a, "purposes", "learning"),
    text: "How do you want to learn?",
    hint: "Different distros teach different things.",
    options: [
      { id: "build",       label: "Build it from the ground up",       desc: "Assemble the system piece by piece", weights: { customize: 4, terminal: 3 }, boost: [{ ids: ["arch", "gentoo"], by: 10, reason: "You assemble it yourself, so you learn how it fits together" }] },
      { id: "career",      label: "For a sysadmin career",             desc: "Skills employers ask for", weights: { enterprise: 6, server: 3 }, boost: [{ ids: ["rhel", "rocky", "debian"], by: 6, reason: "What most employers run in production" }] },
      { id: "declarative", label: "Declarative, reproducible systems", desc: "Configuration as code", weights: { atomic: 3 }, boost: [{ ids: ["nixos"], by: 12, reason: "Teaches configuration-as-code for the whole system" }, { ids: ["guix"], by: 8, reason: "Teaches configuration-as-code for the whole system" }] },
      { id: "comfortable", label: "Just get comfortable with Linux",   desc: "Learn the basics without breaking things", weights: { ease: 6, community: 3 } },
    ],
  },
  {
    id: "desktop_pref", tracks: ["pc", "security", "privacy"], stage: { pc: 3, security: 3, privacy: 3 }, quick: true,
    text: "What should the desktop feel like?",
    hint: "The desktop environment is the look and feel: panels, menus, windows.",
    options: [
      { id: "none",    label: "No preference",              desc: "Use whatever the distro recommends", weights: {} },
      { id: "windows", label: "Like Windows",               desc: "Taskbar, start menu, system tray", weights: { windows_like: 12 }, tags: ["windows", "cinnamon", "kde"] },
      { id: "mac",     label: "Like macOS",                 desc: "A dock and a clean top bar", weights: { mac_like: 20 }, tags: ["mac"] },
      { id: "gnome",   label: "GNOME",                      desc: "Minimal, with an activities overview", weights: { gnome_de: 10 }, tags: ["gnome"] },
      { id: "kde",     label: "KDE Plasma",                 desc: "Familiar layout, endlessly configurable", weights: { kde_de: 10 }, tags: ["kde"] },
      { id: "tiling",  label: "Tiling and keyboard-driven", desc: "Windows arrange themselves; shortcuts for everything", weights: { tiling: 12, terminal: 2 }, tags: ["tiling"] },
      { id: "light",   label: "Something light",            desc: "Xfce, LXQt, MATE or a window manager", weights: { lite_de: 10, lightweight: 4 }, tags: ["light"] },
    ],
  },
  {
    id: "updates", tracks: ["pc"], stage: 3, quick: true,
    text: "How should updates work?",
    hint: "Your answer rules out distros that update the other way.",
    options: [
      { id: "stable",   label: "Stable, supported for years", desc: "Few big upgrades; security fixes keep coming", weights: { rolling: -8, longevity: 8 }, keep: d => d.cycle !== "rolling", tags: ["lts"] },
      { id: "fresh",    label: "Fresh, but tested",           desc: "A new version once or twice a year", weights: { rolling: -2, longevity: -2, dev: 1 } },
      { id: "rolling",  label: "Always the latest",           desc: "Rolling release, updated constantly", weights: { rolling: 8, longevity: -4 }, keep: d => d.cycle === "rolling", tags: ["rolling"] },
      { id: "atomic",   label: "Unbreakable",                 desc: "Updates apply all at once and can be rolled back", weights: { atomic: 20 }, keep: d => d.scores.atomic >= 6 || hasEditionTag(d, "atomic", "desktop"), tags: ["atomic"] },
      { id: "dontcare", label: "No preference",               desc: "Whatever the distro does", weights: {} },
    ],
  },
  {
    id: "software", tracks: ["pc"], stage: 3,
    text: "How do you like to install software?",
    hint: "Every distro offers several ways. Which feels like yours?",
    options: [
      { id: "store",   label: "From an app store",      desc: "Search, click install", weights: { ease: 5, community: 4 } },
      { id: "repos",   label: "With a package manager", desc: "apt, dnf, pacman and friends", weights: { customize: 3, terminal: 3 } },
      { id: "compile", label: "From source or the AUR", desc: "I build things myself when I need to", weights: { customize: 8, terminal: 5, rolling: 2 } },
    ],
  },
  {
    id: "ai_stance", tracks: ["pc"], stage: 3, type: "multi", exclusive: ["neutral", "off"], combine: "all",
    text: "Where do you stand on AI on your computer?",
    hint: "Choose everything that applies. “Keep it off” rules out distros with AI built in.",
    options: [
      { id: "desktop", label: "Built into the desktop",        desc: "An assistant that can answer questions and change settings", weights: {}, boost: [{ ids: ["deepin"], by: 18, reason: "Has an AI assistant built into the desktop (UOS AI)" }], note: "ai_desktop" },
      { id: "agents",  label: "Coding agents in the terminal", desc: "Claude Code, Codex and similar", weights: { terminal: 2 }, boost: [{ ids: ["omarchy"], by: 8, reason: "Ships with AI coding-agent tools ready to launch" }] },
      { id: "local",   label: "Running models myself",         desc: "Local LLMs and image generation", weights: { ai: 6, nvidia: 2 }, tags: ["ai"] },
      { id: "neutral", label: "No strong feelings",            desc: "I'll add tools if I want them", weights: {} },
      { id: "off",     label: "Keep it off my system",         desc: "No built-in AI features", keep: d => !d.facts.aiDesktop },
    ],
  },
  {
    id: "apps", tracks: ["pc", "privacy"], stage: { pc: 4, privacy: 3 }, type: "multi", exclusive: ["none"],
    text: "Do you rely on any of these?",
    hint: "Choose everything that applies. Some software needs a plan before you switch.",
    options: [
      { id: "office",    label: "Microsoft Office",             desc: "Word, Excel, PowerPoint, Outlook", weights: {}, note: "office" },
      { id: "adobe",     label: "Adobe apps",                   desc: "Photoshop, Premiere, Lightroom, Illustrator", weights: {}, note: "adobe" },
      { id: "anticheat", label: "Online games with anti-cheat", desc: "Valorant, Call of Duty, Battlefield, Fortnite", weights: {}, note: "anticheat" },
      { id: "resolve",   label: "DaVinci Resolve",              desc: "Blackmagic's video editor", weights: { nvidia: 2 }, boost: [{ ids: ["rocky"], by: 8, reason: "The Linux platform DaVinci Resolve officially supports" }, { ids: ["almalinux"], by: 5, reason: "Compatible with DaVinci Resolve's supported platform" }], note: "resolve" },
      { id: "winapps",   label: "Other Windows-only programs",  desc: "Tax software, niche tools, older games", weights: {}, note: "winapps" },
      { id: "none",      label: "None of these",                desc: "", weights: {} },
    ],
  },
  {
    id: "avoid", tracks: ["pc", "server", "security", "privacy"], stage: { pc: 4, server: 4, security: 3, privacy: 3 }, quick: true, type: "multi", exclusive: ["none"], combine: "all",
    text: "Anything you want to avoid?",
    hint: "These are dealbreakers: distros that don't fit are ruled out.",
    options: [
      { id: "systemd",   label: "systemd",                  desc: "Prefer a different init system", keep: d => !d.facts.systemd, tags: ["nosystemd"] },
      { id: "snap",      label: "Snap packages",            desc: "Canonical's app format", keep: d => !d.facts.snap },
      { id: "corporate", label: "Distros run by a company", desc: "Community-run projects only", keep: d => !d.facts.corporate },
      { id: "nonfree",   label: "Any proprietary software", desc: "Only FSF-endorsed, fully free systems", keep: d => d.facts.fsf, note: "fsf" },
      { id: "niche",     label: "Small, niche projects",    desc: "I want something popular and well established", weights: { community: 10, longevity: 2 }, keep: d => d.scores.community >= 5 },
      { id: "none",      label: "Nothing in particular",    desc: "", weights: {} },
    ],
  },
  {
    id: "community", tracks: ["pc", "server"], stage: { pc: 4, server: 4 },
    text: "What kind of help do you prefer?",
    hint: "Communities differ a lot in size and style.",
    options: [
      { id: "large", label: "Big and beginner-friendly", desc: "Endless tutorials, videos and forum answers", weights: { community: 10, ease: 3 } },
      { id: "niche", label: "Small but expert",          desc: "Deep wikis and forums with serious answers", weights: { community: 3, customize: 2 } },
      { id: "self",  label: "I'll read the docs",        desc: "I'm self-reliant", weights: { terminal: 3, customize: 3 } },
    ],
  },

  // ════ Server or homelab ════
  {
    id: "server_job", tracks: ["server"], stage: 0, quick: true,
    text: "What's the server's main job?",
    hint: "Pick the one thing it most needs to do well. Each job has its own best distros.",
    options: [
      { id: "hypervisor", label: "Run virtual machines and containers", desc: "A hypervisor for a homelab or small business", weights: { server: 3 }, tags: ["hypervisor"], keep: d => SERVER_JOBS.hypervisor.includes(d.id), boost: [{ ids: ["proxmox"], by: 30, reason: "Built for running VMs and containers from a web interface" }] },
      { id: "nas",        label: "Store files and media",               desc: "A NAS, backups, Plex or Jellyfin", weights: { server: 2 }, tags: ["nas"], keep: d => SERVER_JOBS.nas.includes(d.id), boost: [{ ids: ["truenas"], by: 30, reason: "A purpose-built NAS on OpenZFS" }], note: "zfs" },
      { id: "containers", label: "Host containers",                     desc: "Docker or Podman workloads, Kubernetes nodes", weights: { atomic: 4, lightweight: 3 }, tags: ["container"], keep: d => SERVER_JOBS.containers.includes(d.id), boost: [{ ids: ["fedora"], by: 8, reason: "Fedora CoreOS exists purely to run containers and updates itself" }, { ids: ["opensuse"], by: 6, reason: "MicroOS and Leap Micro are transactional container hosts" }, { ids: ["alpine"], by: 4, reason: "Tiny and fast, the base of countless container images" }] },
      { id: "web",        label: "Host websites, apps and databases",   desc: "Web servers, APIs, a VPS", weights: { longevity: 5, enterprise: 3 }, tags: ["server"], keep: d => SERVER_JOBS.web.includes(d.id), boost: [{ ids: ["debian", "ubuntu", "rocky", "almalinux"], by: 6, reason: "A standard, long-supported base for hosting" }] },
      { id: "enterprise", label: "Run enterprise workloads",            desc: "Certified software, compliance, vendor support", weights: { enterprise: 10, longevity: 4 }, tags: ["lts"], keep: d => SERVER_JOBS.enterprise.includes(d.id), boost: [{ ids: ["rhel"], by: 8, reason: "The platform enterprise software is certified on" }, { ids: ["rocky", "almalinux"], by: 5, reason: "Free and compatible with RHEL" }] },
      { id: "home",       label: "Run small home services",             desc: "Pi-hole, Home Assistant, a VPN, an always-on box", weights: { lightweight: 6 }, tags: ["minimal"], keep: d => SERVER_JOBS.home.includes(d.id), boost: [{ ids: ["dietpi"], by: 12, reason: "One-menu installs for Pi-hole, Home Assistant and more" }], note: "homeassistant" },
      { id: "learn",      label: "Learn server administration",         desc: "For a sysadmin job or certification", weights: { enterprise: 5, community: 3 }, tags: ["server"], keep: d => SERVER_JOBS.learn.includes(d.id), boost: [{ ids: ["rhel"], by: 8, reason: "What RHCSA and RHCE exams are based on" }, { ids: ["rocky", "almalinux"], by: 5, reason: "Free and compatible with RHEL, the exam platform" }, { ids: ["debian", "ubuntu"], by: 4, reason: "What most tutorials and VPS providers use" }] },
    ],
  },
  {
    id: "server_extra", tracks: ["server"], stage: 0, type: "multi", exclusive: ["nothing"],
    text: "Will it also need to do any of these?",
    hint: "Choose everything that applies. These shift the ranking but don't rule anything out.",
    options: [
      { id: "docker",  label: "Run Docker apps",              desc: "Self-hosted apps from Docker Compose", weights: { server: 2 }, tags: ["container"] },
      { id: "gpu",     label: "Use a GPU",                    desc: "Transcoding, AI inference, passthrough to a VM", weights: { nvidia: 6, ai: 4 }, tags: ["nvidia", "ai"] },
      { id: "backups", label: "Take care of backups",         desc: "Snapshots, replication, off-site copies", weights: { atomic: 2 }, tags: ["backup"], boost: [{ ids: ["truenas", "proxmox"], by: 4, reason: "Snapshots and backups built into the web interface" }] },
      { id: "remote",  label: "Be reachable from anywhere",   desc: "A VPN or tunnel such as WireGuard or Tailscale", weights: { server: 1 } },
      { id: "nothing", label: "Nothing else",                 desc: "", weights: {} },
    ],
  },
  {
    id: "server_where", tracks: ["server"], stage: 1, quick: true,
    text: "Where will it run?",
    hint: "This rules out distros that don't support the hardware.",
    options: [
      { id: "x86",   label: "A PC, mini PC or rack server",  desc: "Intel or AMD, including old desktops", keep: d => d.facts.hardware.includes("x86") },
      { id: "pi",    label: "A Raspberry Pi",                desc: "Any model with a 64-bit processor", keep: d => d.facts.hardware.includes("rpi"), tags: ["rpi", "arm"] },
      { id: "arm",   label: "Another ARM board or server",   desc: "Ampere, Odroid, Rockchip boards and similar", keep: d => d.facts.hardware.includes("arm") || d.facts.hardware.includes("rpi"), tags: ["arm"] },
      { id: "cloud", label: "A VM or the cloud",             desc: "AWS, Azure, Hetzner, a VPS or a VM at home", keep: d => hasEditionTag(d, "cloud") || hasEditionTag(d, "vm"), tags: ["cloud", "vm"], note: "cloud" },
      { id: "mac",   label: "An Apple Silicon Mac",          desc: "A Mac mini or Mac Studio", keep: d => d.facts.hardware.includes("apple"), note: "apple" },
    ],
  },
  {
    id: "server_ram", tracks: ["server"], stage: 1,
    when: a => a.server_where !== "cloud",
    text: "How much memory does the machine have?",
    hint: "Storage and virtualisation are the hungriest jobs.",
    options: [
      { id: "lt4",  label: "Less than 4 GB", desc: "A small board or an old PC", weights: { lightweight: 10 }, keep: d => d.scores.lightweight >= 4 && !["truenas", "proxmox"].includes(d.id), tags: ["minimal"] },
      { id: "4to8", label: "4 to 8 GB",      desc: "Fine for most services", weights: { lightweight: 4 } },
      { id: "gt8",  label: "More than 8 GB", desc: "Room for VMs and ZFS", weights: {} },
    ],
  },
  {
    id: "server_life", tracks: ["server"], stage: 2, quick: true,
    text: "How long should one install last?",
    hint: "This is the biggest difference between server distros. Your answer rules out the ones that don't match.",
    options: [
      { id: "decade",  label: "Up to ten years",                  desc: "Install once, patch for a decade", weights: { longevity: 12, rolling: -8 }, keep: d => d.scores.longevity >= 9, tags: ["lts"] },
      { id: "five",    label: "About five years",                 desc: "A long-term release with years of fixes", weights: { longevity: 8, rolling: -6 }, keep: d => d.scores.longevity >= 7, tags: ["lts"] },
      { id: "upgrade", label: "I'll upgrade every year or two",   desc: "Newer software, regular upgrades", weights: { longevity: -2, rolling: -2 } },
      { id: "rolling", label: "Rolling is fine",                  desc: "Always current, no big upgrades", weights: { rolling: 8 }, keep: d => d.cycle === "rolling", tags: ["rolling"] },
      { id: "auto",    label: "It should update itself safely",   desc: "Immutable, automatic updates with rollback", weights: { atomic: 14 }, keep: d => hasEditionTag(d, "atomic", "server") || d.id === "truenas", tags: ["atomic"] },
    ],
  },
  {
    id: "server_skill", tracks: ["server", "iot"], stage: { server: 3, iot: 2 },
    text: "How comfortable are you running Linux machines?",
    hint: "Be honest: a server you can't maintain is a liability.",
    options: [
      { id: "new",    label: "I'm new to it",          desc: "I'll follow guides step by step", weights: { ease: 8, community: 6 }, keep: d => d.difficulty <= 3 },
      { id: "some",   label: "I've run a few",         desc: "Comfortable with SSH and config files", weights: { ease: 2 }, keep: d => d.difficulty <= 4 },
      { id: "expert", label: "It's my job",            desc: "I automate and debug these for a living", weights: { customize: 4, terminal: 4 } },
    ],
  },
  {
    id: "server_manage", tracks: ["server"], stage: 3, type: "multi",
    text: "How do you want to manage it?",
    hint: "Choose everything that applies.",
    options: [
      { id: "web",         label: "From a web interface",            desc: "Click through settings in a browser", weights: { ease: 3 }, boost: [{ ids: ["proxmox", "truenas"], by: 6, reason: "Managed entirely from a web interface" }, { ids: ["fedora", "rhel", "rocky", "almalinux", "centos"], by: 3, reason: "Comes with the Cockpit web console" }] },
      { id: "ssh",         label: "Over SSH with config files",      desc: "The traditional way", weights: { terminal: 4 } },
      { id: "declarative", label: "Declaratively, as code",          desc: "The whole machine described in a config", weights: { atomic: 4 }, boost: [{ ids: ["nixos"], by: 14, reason: "The whole server is declared in one config you can version" }, { ids: ["guix"], by: 8, reason: "The whole server is declared in one config you can version" }, { ids: ["fedora"], by: 4, reason: "Fedora CoreOS is provisioned from an Ignition config" }] },
      { id: "fleet",       label: "With automation across machines", desc: "Ansible, Terraform, many servers", weights: { enterprise: 5, longevity: 3 }, boost: [{ ids: ["rhel", "rocky", "almalinux", "ubuntu", "debian"], by: 4, reason: "First-class support in Ansible and Terraform tooling" }] },
    ],
  },
  {
    id: "server_support", tracks: ["server"], stage: 3,
    text: "Do you need paid support?",
    hint: "Someone to call when it breaks, with guaranteed response times.",
    options: [
      { id: "yes",   label: "Yes, it's for a business",  desc: "We need a vendor behind it", weights: { enterprise: 8 }, tags: ["paid"], boost: [{ ids: ["rhel"], by: 8, reason: "Red Hat's subscription includes support" }, { ids: ["ubuntu"], by: 6, reason: "Canonical sells support through Ubuntu Pro" }, { ids: ["proxmox", "truenas"], by: 4, reason: "The company behind it sells support subscriptions" }], note: "support" },
      { id: "maybe", label: "Nice to have later",        desc: "An option to buy support if needed", weights: { enterprise: 3 } },
      { id: "no",    label: "No, community help is fine", desc: "Forums, docs and wikis", weights: { community: 3 } },
    ],
  },

  // ════ Security toolkit ════
  {
    id: "sec_level", tracks: ["security"], stage: 0, quick: true,
    text: "How experienced are you in security?",
    hint: "Some toolkits assume you already know your way around.",
    options: [
      { id: "new",    label: "I'm just starting",         desc: "Courses, CTFs, my first pentest", weights: { ease: 6, community: 6 }, keep: d => d.difficulty <= 4 },
      { id: "some",   label: "I've done some real work",  desc: "Labs, bug bounties, a few engagements", weights: { security: 3 } },
      { id: "expert", label: "It's my profession",        desc: "I know the tools I want", weights: { customize: 5, terminal: 4 } },
    ],
  },
  {
    id: "sec_run", tracks: ["security"], stage: 1, quick: true, type: "multi",
    text: "How will you run it?",
    hint: "Choose everything that applies. Most security distros come in several forms.",
    options: [
      { id: "vm",      label: "In a virtual machine",       desc: "On my Windows, Mac or Linux computer", weights: {}, tags: ["vm"] },
      { id: "live",    label: "From a USB stick",           desc: "Boot it when I need it", weights: {}, tags: ["live"] },
      { id: "main",    label: "As my main operating system", desc: "One machine for everything", weights: { ease: 3 }, tags: ["daily"], boost: [{ ids: ["parrot"], by: 10, reason: "Its Home and Security editions are made for daily use" }], note: "kali_daily" },
      { id: "pi",      label: "On a Raspberry Pi",          desc: "A drop box or portable kit", weights: {}, tags: ["arm", "rpi"], keep: d => d.facts.hardware.includes("rpi") },
      { id: "android", label: "On an Android phone",        desc: "Mobile pentesting", weights: {}, tags: ["android"], boost: [{ ids: ["kali"], by: 14, reason: "Kali NetHunter runs on Android phones" }], note: "nethunter" },
      { id: "wsl",     label: "Inside Windows",             desc: "Through WSL", weights: {}, tags: ["wsl"], boost: [{ ids: ["kali"], by: 5, reason: "Available from the Microsoft Store for WSL" }, { ids: ["parrot"], by: 3, reason: "Offers a WSL build" }] },
      { id: "cloud",   label: "In the cloud or containers", desc: "A VPS, Docker or LXC", weights: {}, tags: ["cloud", "container"] },
    ],
  },
  {
    id: "security_kind", tracks: ["security"], stage: 2, type: "multi",
    text: "What kind of security work?",
    hint: "Choose everything that applies.",
    options: [
      { id: "pentest",   label: "Penetration testing and CTFs", desc: "Web, network and Active Directory", weights: { security: 4 }, tags: ["ctf"] },
      { id: "cert",      label: "Studying for a certification", desc: "OSCP, PNPT, eJPT and similar", weights: { security: 2, community: 3 }, boost: [{ ids: ["kali"], by: 14, reason: "The distro OffSec's courses and OSCP labs use" }] },
      { id: "htb",       label: "Hack The Box",                 desc: "HTB labs and seasons", weights: { security: 2 }, tags: ["ctf"], boost: [{ ids: ["parrot"], by: 10, reason: "Has an edition made with Hack The Box" }] },
      { id: "wireless",  label: "Wireless and radio",           desc: "Wi-Fi, Bluetooth, SDR", weights: { security: 2 }, boost: [{ ids: ["kali"], by: 4, reason: "Wireless tools and driver support are well documented" }] },
      { id: "forensics", label: "Digital forensics",            desc: "Disk images, memory analysis, recovery", weights: { security: 2 }, boost: [{ ids: ["kali", "parrot"], by: 5, reason: "Forensics tools packaged and ready" }] },
      { id: "blue",      label: "Defence and blue team",        desc: "Detection, SOC work, threat hunting", weights: { security: 1 }, tags: ["defensive"], boost: [{ ids: ["kali"], by: 8, reason: "Kali Purple is built for defensive security" }] },
      { id: "alltools",  label: "As many tools as possible",    desc: "I want everything available", weights: { security: 2, customize: 3 }, boost: [{ ids: ["blackarch"], by: 16, reason: "Over 2,800 security tools in its repository" }] },
    ],
  },

  // ════ Privacy and anonymity ════
  {
    id: "privacy_goal", tracks: ["privacy"], stage: 0, quick: true,
    text: "What's your main goal?",
    hint: "Different threats call for very different tools, so this narrows things a lot.",
    options: [
      { id: "tracking",  label: "Less tracking and telemetry", desc: "More privacy than Windows or macOS, for everyday use", weights: { privacy: 4, ease: 6, community: 3 }, keep: d => hasRole(d, "desktop") && d.scores.privacy >= 5 },
      { id: "malware",   label: "Strong protection from attacks", desc: "A system that's very hard to compromise", weights: { privacy: 8, atomic: 4 }, keep: isOneOf("qubes", "silverblue", "bluefin", "aurora", "fedora", "opensuse", "debian", "nixos"), boost: [{ ids: ["qubes"], by: 10, reason: "Contains compromises by isolating everything in VMs" }, { ids: ["silverblue", "bluefin", "aurora"], by: 4, reason: "Read-only core with SELinux enforcing" }] },
      { id: "anon",      label: "Anonymity online",            desc: "Routing everything through Tor", weights: { anonymity: 14, privacy: 6 }, keep: d => d.scores.anonymity >= 7 },
      { id: "traces",    label: "Leaving no trace",            desc: "Use any computer and leave nothing behind", weights: { anonymity: 8 }, keep: isOneOf("tails"), boost: [{ ids: ["tails"], by: 20, reason: "Runs from USB and forgets everything at shutdown" }] },
      { id: "isolation", label: "Keeping activities apart",    desc: "Work, banking and browsing that can't touch each other", weights: { anonymity: 4, privacy: 6 }, keep: isOneOf("qubes", "whonix"), boost: [{ ids: ["qubes"], by: 20, reason: "Each task runs in its own isolated VM" }] },
    ],
  },
  {
    id: "privacy_use", tracks: ["privacy"], stage: 1,
    text: "How will you use it?",
    hint: "This picks between systems with the same goal.",
    options: [
      { id: "usb",       label: "From a USB stick",            desc: "On my own or borrowed computers", weights: {}, tags: ["live"], boost: [{ ids: ["tails"], by: 10, reason: "Designed to run from a USB stick on any computer" }] },
      { id: "installed", label: "Installed as my main system", desc: "Every day, with my files and apps", weights: { ease: 3 }, tags: ["daily"], boost: [{ ids: ["qubes", "parrot"], by: 4, reason: "Meant to be installed and used every day" }] },
      { id: "vm",        label: "In virtual machines",         desc: "Alongside my current operating system", weights: {}, tags: ["vm"], boost: [{ ids: ["whonix"], by: 10, reason: "Runs as VMs on Windows, macOS or Linux" }] },
    ],
  },

  // ════ Gaming handheld or TV PC ════
  {
    id: "game_device", tracks: ["gaming"], stage: 0, quick: true,
    text: "What will it run on?",
    hint: "Device support is the deciding factor here.",
    options: [
      { id: "deck",     label: "A Steam Deck",                  desc: "LCD or OLED", weights: {}, tags: ["handheld"], keep: isOneOf("steamos", "bazzite", "cachyos", "nobara"), boost: [{ ids: ["steamos"], by: 12, reason: "Already installed and made for the Deck" }], note: "handheld" },
      { id: "legiongos", label: "A Lenovo Legion Go S",         desc: "The SteamOS version or the Windows one", weights: {}, tags: ["handheld"], keep: isOneOf("steamos", "bazzite", "cachyos", "nobara"), boost: [{ ids: ["steamos"], by: 10, reason: "Officially supported on the Legion Go S" }] },
      { id: "handheld", label: "Another gaming handheld",       desc: "ROG Ally, Legion Go, MSI Claw and similar", weights: {}, tags: ["handheld"], keep: isOneOf("bazzite", "cachyos", "nobara"), boost: [{ ids: ["bazzite"], by: 6, reason: "The widest support for third-party handhelds" }], note: "handheld" },
      { id: "machine",  label: "A Steam Machine",               desc: "Valve's living-room PC", weights: {}, tags: ["htpc"], keep: isOneOf("steamos", "bazzite", "cachyos"), boost: [{ ids: ["steamos"], by: 14, reason: "Ships with it and is made for it" }] },
      { id: "tv",       label: "A PC under the TV",             desc: "A living-room or couch gaming PC", weights: {}, tags: ["htpc"], keep: isOneOf("bazzite", "nobara", "cachyos"), boost: [{ ids: ["bazzite"], by: 6, reason: "Boots into Steam's Gaming Mode on a TV" }] },
    ],
  },
  {
    id: "game_style", tracks: ["gaming"], stage: 1, type: "multi",
    text: "How will you play?",
    hint: "Choose everything that applies.",
    options: [
      { id: "steam",    label: "Mostly Steam",                   desc: "My library is on Steam", weights: { gaming: 2 } },
      { id: "stores",   label: "Other stores too",               desc: "Epic, GOG, Battle.net, EA", weights: { gaming: 2 }, boost: [{ ids: ["bazzite", "nobara", "cachyos"], by: 3, reason: "Easy to add other launchers in desktop mode" }] },
      { id: "emu",      label: "Emulation",                      desc: "Retro and console emulators", weights: { gaming: 1 } },
      { id: "desktop",  label: "Desktop use as well",            desc: "Browsing, media and work in desktop mode", weights: { ease: 3 } },
      { id: "online",   label: "Competitive online games",       desc: "Shooters and battle royales", weights: {}, note: "anticheat" },
      { id: "dual",     label: "Keep Windows alongside",         desc: "Dual boot for games that need it", weights: {}, note: "dualboot" },
    ],
  },
  {
    id: "game_maint", tracks: ["gaming"], stage: 2, quick: true,
    text: "How much do you want to maintain it?",
    hint: "From console-like to tinkerer's playground.",
    options: [
      { id: "console", label: "Like a console",               desc: "Updates itself; I never think about it", weights: { atomic: 8, ease: 6 }, tags: ["atomic"], boost: [{ ids: ["steamos", "bazzite"], by: 6, reason: "Image-based updates you can roll back" }] },
      { id: "tinker",  label: "I'll tune it for performance", desc: "Kernels, schedulers, tweaks", weights: { customize: 6 }, boost: [{ ids: ["cachyos"], by: 10, reason: "Tuned kernels and CPU-optimised packages" }] },
      { id: "classic", label: "A normal distro I can change", desc: "Install anything, no image-based system", weights: { atomic: -6, customize: 3 }, boost: [{ ids: ["nobara", "cachyos"], by: 6, reason: "A traditional system you can change freely" }] },
    ],
  },

  // ════ Raspberry Pi or IoT ════
  {
    id: "board", tracks: ["iot"], stage: 0, quick: true,
    text: "Which board or device?",
    hint: "Board support decides almost everything for small devices.",
    options: [
      { id: "pi",    label: "A Raspberry Pi",                desc: "Pi 3, 4, 5, 400, 500 or a Compute Module", weights: {}, tags: ["rpi", "arm"], keep: d => d.facts.hardware.includes("rpi") },
      { id: "arm",   label: "Another ARM board",             desc: "Orange Pi, Radxa, Odroid, Pine64 and similar", weights: {}, tags: ["arm"], keep: d => d.facts.hardware.includes("arm") || d.facts.hardware.includes("rpi") },
      { id: "x86",   label: "A small x86 PC",                desc: "An Intel NUC, thin client or mini PC", weights: { lightweight: 3 }, keep: d => d.facts.hardware.includes("x86") },
      { id: "micro", label: "A microcontroller",             desc: "ESP32, Arduino, Raspberry Pi Pico", weights: {}, note: "micro" },
    ],
  },
  {
    id: "iot_job", tracks: ["iot"], stage: 1, quick: true,
    text: "What will it do?",
    hint: "Pick its main job.",
    options: [
      { id: "home",     label: "Home automation",                 desc: "Home Assistant, Zigbee, MQTT", weights: { lightweight: 3 }, tags: ["minimal"], keep: isOneOf("dietpi", "raspberrypi", "debian", "ubuntu", "alpine", "fedora"), boost: [{ ids: ["dietpi"], by: 8, reason: "One-menu installs for Home Assistant and friends" }], note: "homeassistant" },
      { id: "network",  label: "Network services",                desc: "Pi-hole, a VPN, a DNS or file server", weights: { lightweight: 5 }, tags: ["minimal"], keep: isOneOf("dietpi", "raspberrypi", "alpine", "debian", "ubuntu", "opensuse", "void"), boost: [{ ids: ["dietpi"], by: 10, reason: "Pi-hole, WireGuard and more in one menu" }] },
      { id: "media",    label: "A media player or kiosk",         desc: "A screen in the living room, a signage display", weights: {}, keep: isOneOf("raspberrypi", "ubuntu", "dietpi", "manjaro", "mxlinux"), note: "media" },
      { id: "desktop",  label: "A small desktop computer",        desc: "Learning, coding, browsing on the board", weights: { ease: 4 }, keep: isOneOf("raspberrypi", "ubuntu", "manjaro", "mxlinux", "fedora", "debian"), boost: [{ ids: ["raspberrypi"], by: 14, reason: "The best-supported desktop for Raspberry Pi" }] },
      { id: "fleet",    label: "A product or fleet of devices",   desc: "Many devices with safe over-the-air updates", weights: { atomic: 10, longevity: 4 }, tags: ["fleet", "atomic"], keep: isOneOf("fedora", "ubuntu", "opensuse", "rhel"), boost: [{ ids: ["fedora"], by: 6, reason: "Fedora IoT is an immutable base for edge devices" }, { ids: ["ubuntu"], by: 6, reason: "Ubuntu Core is built for appliances with transactional updates" }] },
      { id: "robotics", label: "Robotics",                        desc: "ROS 2, sensors, motors", weights: { dev: 4 }, keep: isOneOf("ubuntu", "debian", "fedora", "raspberrypi"), boost: [{ ids: ["ubuntu"], by: 10, reason: "ROS 2 targets Ubuntu LTS first" }], note: "ros" },
    ],
  },
  {
    id: "iot_headless", tracks: ["iot"], stage: 2,
    text: "Will it have a screen?",
    hint: "A headless device is managed over the network.",
    options: [
      { id: "headless", label: "No, headless",        desc: "Managed over SSH or a web page", weights: { lightweight: 4 }, tags: ["minimal"] },
      { id: "screen",   label: "Yes, with a desktop", desc: "A monitor, keyboard and mouse", weights: { ease: 3 } },
    ],
  },
];

// Things worth knowing before switching, triggered by answers rather than by a distro.
const QUIZ_NOTES = {
  apple:         "Fedora Asahi Remix supports M1 and M2 Macs well. Support for M3 is only now arriving and M4 isn't supported yet, so check asahilinux.org for your exact model before you start.",
  intelmac:      "Most distros run on Intel Macs. Models with Apple's T2 chip (roughly 2018 to 2020) need extra drivers for the keyboard, trackpad and audio; t2linux.org has guides.",
  handheld:      "If you have a Steam Deck, SteamOS is already installed and is usually the best choice. Bazzite is the popular option for other handhelds like the ROG Ally and Legion Go.",
  nvidia:        "NVIDIA cards work well on Linux today, but you'll save the most hassle with a distro or edition that installs the driver for you, such as Pop!_OS, Bazzite, CachyOS or Nobara.",
  dualboot:      "Back up first. If Windows uses BitLocker, have the recovery key ready, and turn off Fast Startup in Windows so the two systems can share disks safely.",
  vr:            "VR on Linux works but trails Windows. The Valve Index has the best support, and Quest headsets work through community tools like ALVR or WiVRn.",
  ai_desktop:    "Built-in AI assistants are rare on Linux; deepin is one of the few distros that ships one. On any distro you can add assistant apps or run local models with tools like Ollama.",
  office:        "Microsoft Office has no Linux desktop version. Office on the web works in any browser, and LibreOffice and OnlyOffice open Office files well.",
  adobe:         "Adobe Creative Cloud doesn't run on Linux. GIMP, Krita, Inkscape, Darktable and DaVinci Resolve cover a lot of the same ground, or you can keep Windows for those apps with a dual boot.",
  anticheat:     "Games that use kernel-level anti-cheat, such as Valorant, Call of Duty and recent Battlefield titles, won't run on any Linux distro. Check areweanticheatyet.com or ProtonDB for your games before switching.",
  resolve:       "DaVinci Resolve has a native Linux version, officially supported on Rocky Linux. The free edition on Linux can't decode H.264 or H.265 video, so you may need to convert footage or buy Resolve Studio.",
  winapps:       "Many Windows programs run through Wine; Bottles and Lutris make it easier. For ones that don't, a Windows virtual machine or a dual boot keeps them available.",
  fsf:           "Fully free distros use the Linux-libre kernel without proprietary firmware, so some Wi-Fi cards and most NVIDIA graphics won't work. Check your hardware before installing.",
  zfs:           "ZFS likes memory: plan on at least 8 GB for a NAS, more for large pools. ECC memory is recommended for data you can't afford to lose, though not required.",
  homeassistant: "If the box will only run Home Assistant, Home Assistant OS is a dedicated appliance image made for exactly that. The distros here suit a box that does more than one job.",
  cloud:         "Use the image your cloud provider publishes for the distro rather than installing from an ISO. For a VM at home, the distro's cloud or minimal image is usually the quickest start.",
  support:       "RHEL, Ubuntu Pro, Proxmox and TrueNAS Enterprise sell support directly. Rocky Linux and AlmaLinux support is available from third-party companies.",
  kali_daily:    "Kali's own documentation says it isn't meant as an everyday operating system. If you want one machine for everything, Parrot's Home or Security edition is the usual choice.",
  nethunter:     "Kali NetHunter Rootless works on most Android phones without changes. The full version needs a supported, rooted phone with a NetHunter kernel.",
  micro:         "Microcontrollers like the ESP32, Arduino boards and the Raspberry Pi Pico don't run Linux. Use MicroPython, the Arduino IDE or ESPHome instead; a Linux machine is still handy for programming them.",
  media:         "For a dedicated Kodi media centre, LibreELEC and OSMC are purpose-built systems for the Raspberry Pi. The distros here suit a player that also does other jobs.",
  ros:           "ROS 2 releases are built for specific Ubuntu LTS versions first, so match the ROS release to the Ubuntu version it targets.",
};

// ─── Quiz answer helpers ─────────────────────────────────────────────────────

function quizSelected(answers, qid) {
  const v = answers[qid];
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}
const quizHas = (answers, qid, oid) => quizSelected(answers, qid).includes(oid);

function quizPrimaryPurpose(answers) {
  const picked = quizSelected(answers, "purposes");
  if (picked.length === 1) return picked[0];
  return picked.includes(answers.primary) ? answers.primary : null;
}

// Which stage of the current track a question belongs to (-1 for the opening question).
function quizStage(q, track) {
  if (q.id === "track") return -1;
  return typeof q.stage === "number" ? q.stage : (q.stage?.[track] ?? 0);
}
function quizStageName(q, track) {
  const i = quizStage(q, track);
  return i < 0 ? QUIZ_SECTIONS_START : QUIZ_TRACKS[track].stages[i];
}

// Questions that apply to these answers, in stage order. Quick mode keeps the essentials.
function quizActiveQuestions(answers, mode = "full") {
  const track = answers.track;
  const list = QUIZ_QUESTIONS.filter(q =>
    (q.id === "track" || (track && q.tracks.includes(track))) &&
    (mode === "full" || q.quick) &&
    (!q.when || q.when(answers)));
  return list
    .map((q, i) => ({ q, i, s: quizStage(q, track) }))
    .sort((a, b) => a.s - b.s || a.i - b.i)
    .map(x => x.q);
}

// ─── Narrowing ───────────────────────────────────────────────────────────────
//
// The pool starts as every distro the chosen track can use, then each filter
// answer narrows it in question order. A filter that would leave nothing is
// skipped (and reported), so the quiz never paints you into a corner.

function quizPool(answers, mode = "full", upTo = null) {
  const track = QUIZ_TRACKS[answers.track];
  let pool = track ? DISTROS.filter(track.pool) : DISTROS.slice();
  const steps = [];
  if (track) steps.push({ qid: "track", labels: [track.label], before: DISTROS.length, after: pool.length, relaxed: false });
  for (const q of quizActiveQuestions(answers, mode)) {
    if (q.id === "track") continue;
    if (upTo && q.id === upTo) break;
    const chosen = quizSelected(answers, q.id).map(id => q.options.find(o => o.id === id)).filter(Boolean);
    const filters = chosen.filter(o => o.keep);
    if (!filters.length) continue;
    const pass = q.combine === "all"
      ? d => filters.every(o => o.keep(d))
      : d => filters.some(o => o.keep(d));
    const next = pool.filter(pass);
    const step = { qid: q.id, labels: filters.map(o => o.label), before: pool.length, after: next.length || pool.length, relaxed: next.length === 0 };
    if (next.length) pool = next;
    steps.push(step);
  }
  return { pool, steps };
}

// ─── Scoring ─────────────────────────────────────────────────────────────────
//
// Within the pool, each answer adds weights to a "want" vector; your main
// purpose counts in full and any others at half strength. Totals are
// square-rooted so an attribute that many questions touch (ease, mostly) can't
// drown out what you said you'll use Linux for. A distro's fit is the sum of
// want × (score − baseline): a positive want rewards high scores *and*
// penalises low ones. Niche attributes use a low baseline so ordinary distros
// aren't punished hard for lacking them. Liking the terminal is tolerance, not
// a demand, so positive terminal want counts for less. Direct boosts let
// specific answers point at specific distros, with the reason shown.

const SCORE_BASELINE = {
  gnome_de: 3, kde_de: 3, lite_de: 3, handheld: 2, tiling: 3, security: 3, anonymity: 3,
  windows_like: 4, mac_like: 4, atomic: 3,
};
const POSITIVE_DAMPING = { terminal: 0.35, customize: 0.6 };
const REQUIREMENT_PENALTY = 25;

// Specialised distros only make sense if you picked the job they're built for.
const DISTRO_FOCUS = {
  bazzite: "gaming", nobara: "gaming", steamos: "gaming", ubuntu_studio: "creative",
  parrot: ["security", "privacy"],
};
const FOCUS_PENALTY = 18;

function quizWants(answers, mode = "full") {
  const raw = {}, requires = {}, boosts = [], notes = [], tags = new Set();
  const primary = quizPrimaryPurpose(answers);
  for (const q of quizActiveQuestions(answers, mode)) {
    for (const oid of quizSelected(answers, q.id)) {
      const o = q.options.find(x => x.id === oid);
      if (!o) continue;
      const factor = q.id === "purposes" && primary ? (oid === primary ? 1 : 0.5) : 1;
      for (const [attr, w] of Object.entries(o.weights || {})) raw[attr] = (raw[attr] || 0) + w * factor;
      for (const [attr, min] of Object.entries(o.requires || {})) requires[attr] = Math.max(requires[attr] || 0, min);
      for (const b of o.boost || []) boosts.push(b);
      for (const t of o.tags || []) tags.add(t);
      if (o.note && !notes.includes(o.note)) notes.push(o.note);
    }
  }
  const want = {};
  for (const [attr, w] of Object.entries(raw)) {
    if (!w) continue;
    const damp = w > 0 ? (POSITIVE_DAMPING[attr] ?? 1) : 1;
    want[attr] = Math.sign(w) * Math.sqrt(Math.abs(w)) * damp;
  }
  return { want, requires, boosts, notes, tags };
}

function quizScoreOne(distro, w, answers) {
  let score = 0;
  const parts = [], boostReasons = [];
  for (const [attr, want] of Object.entries(w.want)) {
    const base = SCORE_BASELINE[attr] ?? 5;
    const val = distro.scores[attr] ?? 0;
    const contribution = want * (val - base);
    score += contribution;
    parts.push({ attr, w: want, val, contribution });
  }
  for (const [attr, min] of Object.entries(w.requires)) {
    const shortfall = min - (distro.scores[attr] ?? 0);
    if (shortfall > 0) score -= shortfall * REQUIREMENT_PENALTY;
  }
  for (const b of w.boosts) {
    if (b.ids.includes(distro.id)) { score += b.by; boostReasons.push(b.reason); }
  }
  // A small tie-breaker on the track's core strength, so early checkpoints rank sensibly.
  const coreAttr = { pc: "community", server: "server", security: "security", privacy: "privacy", gaming: "handheld", iot: "lightweight" }[answers.track];
  if (coreAttr) score += (distro.scores[coreAttr] ?? 0) * 0.5;
  if (answers.track === "pc") {
    const focus = [].concat(DISTRO_FOCUS[distro.id] || []);
    if (focus.length && !focus.some(f => quizHas(answers, "purposes", f))) score -= FOCUS_PENALTY;
  }
  return { distro, score, parts, boostReasons };
}

// Ranks the distros still in the pool. `upTo` scores using only the answers
// before that question, which is what a checkpoint shows.
function scoreDistros(answers, mode = "full", upTo = null) {
  const scoped = upTo ? quizAnswersBefore(answers, mode, upTo) : answers;
  const { pool, steps } = quizPool(scoped, mode);
  const w = quizWants(scoped, mode);
  const rank = d => {
    const r = quizScoreOne(d, w, scoped);
    r.edition = quizPickEdition(d, scoped, w.tags);
    // A distro with an edition made for exactly what you described ranks higher.
    if (r.edition) r.score += r.edition.tagScore;
    return r;
  };
  const ranked = pool.map(rank).sort((a, b) => b.score - a.score);

  // Fit is relative to every distro, not just the survivors, so a short list
  // isn't stretched from 0 to 100.
  const field = DISTROS.map(d => rank(d).score);
  const hi = ranked.length ? ranked[0].score : 0, lo = Math.min(...field, hi);
  for (const r of ranked) r.fit = hi === lo ? 100 : Math.max(0, Math.round(((r.score - lo) / (hi - lo)) * 100));
  return { ranked, pool, steps, notes: w.notes };
}

function quizAnswersBefore(answers, mode, qid) {
  const out = {};
  for (const q of quizActiveQuestions(answers, mode)) {
    if (q.id === qid) break;
    if (answers[q.id] != null) out[q.id] = answers[q.id];
  }
  return out;
}

// The edition of a distro that best matches the track and the tags your answers
// point to. Hardware and form-factor tags decide more than cosmetic ones.
const EDITION_TAG_WEIGHT = { nvidia: 5, handheld: 5, htpc: 5, rpi: 5, arm: 4, android: 6, wsl: 5, fleet: 5, hypervisor: 5, nas: 5, container: 4, atomic: 4, defensive: 5, ctf: 4, ai: 4 };
function quizPickEdition(distro, answers, tags) {
  const eds = distro.editions;
  const role = QUIZ_TRACKS[answers.track]?.role;
  let best = null;
  eds.forEach((e, i) => {
    const hits = e.tags.filter(t => tags.has(t));
    const tagScore = hits.reduce((sum, t) => sum + (EDITION_TAG_WEIGHT[t] ?? 2), 0);
    const score = (role && e.roles.includes(role) ? 10 : 0) + tagScore - i * 0.01;
    if (!best || score > best.score) best = { edition: e, hits, score, tagScore: role && !e.roles.includes(role) ? 0 : tagScore };
  });
  return eds.length < 2 ? { ...best, single: true } : best;
}

const ATTRIBUTE_REASONS = {
  ease:         ["Works out of the box with little setup", "Expects you to set things up yourself"],
  gaming:       ["Strong gaming support: Steam, Proton and GPU drivers", "Not tuned for gaming"],
  dev:          ["Great developer tooling and fresh toolchains", "Not geared toward development"],
  server:       ["Built for servers and long uptimes", "Not designed for servers"],
  privacy:      ["Privacy and security are core goals", "Doesn't go beyond normal privacy defaults"],
  lightweight:  ["Light enough for older or modest hardware", "Needs reasonably modern hardware"],
  customize:    ["Lets you shape the system however you like", "Deliberately limits customisation"],
  rolling:      ["Rolling updates keep software current", "Fixed releases keep things stable"],
  terminal:     ["Rewards terminal use", "Rarely needs the terminal"],
  gnome_de:     ["Ships GNOME", "Doesn't ship GNOME by default"],
  kde_de:       ["Ships KDE Plasma", "Doesn't ship KDE Plasma by default"],
  lite_de:      ["Uses a lightweight desktop", "Desktop isn't a lightweight one"],
  community:    ["Large community and plenty of tutorials", "Smaller community, so fewer tutorials"],
  enterprise:   ["Enterprise-grade support and lifecycle", "No enterprise support lifecycle"],
  creative:     ["Set up well for creative work", "Not set up for media production"],
  ai:           ["Well set up for AI and GPU compute", "Not geared toward AI work"],
  security:     ["Security tools ready to go", "No security tooling preinstalled"],
  anonymity:    ["Built for anonymity, with Tor at its core", "Not designed for anonymity"],
  handheld:     ["Made for handhelds and couch gaming", "Not made for handhelds"],
  tiling:       ["Tiling, keyboard-driven desktop", "Not built around tiling windows"],
  atomic:       ["Atomic updates you can roll back", "Traditional updates without image rollback"],
  longevity:    ["Long support, so few big upgrades", "Needs a major upgrade fairly often"],
  windows_like: ["Familiar layout for Windows users", "Layout differs from Windows"],
  mac_like:     ["Feels close to macOS", "Doesn't feel much like macOS"],
  freedom:      ["Strong commitment to free software", "Includes or encourages proprietary software"],
  nvidia:       ["Easy NVIDIA driver setup", "NVIDIA drivers take extra work"],
};

// Caveat wording when a distro is weak at something you asked for, where the
// usual "low" phrase would read as a plus.
const WEAK_CAVEATS = {
  rolling:  "Fixed releases, so software is a little older",
  terminal: "Leans on graphical tools more than the terminal",
};

// Caveat wording when you asked to *avoid* something the distro leans on.
const AVOID_CAVEATS = {
  terminal:  "Expects regular terminal use",
  rolling:   "Rolling updates mean frequent changes",
  privacy:   "Privacy tooling may get in the way of everyday use",
  gaming:    "Gaming-focused extras you may not need",
  security:  "Comes loaded with offensive-security tools you didn't ask for",
  longevity: "Expects you to stay on a long-term release",
  atomic:    "Image-based, so changing the base system takes extra steps",
};

// Human-readable reasons and caveats for one scored result.
function explainResult(result, max = 4) {
  // Only some avoided traits make sense as a selling point ("rarely needs the terminal").
  const AVOID_IS_REASON = new Set(["terminal", "rolling"]);
  const phrase = p => ATTRIBUTE_REASONS[p.attr][p.w > 0 ? 0 : 1];
  const fromScores = result.parts
    .filter(p => p.contribution > 6 && (p.w > 0 || AVOID_IS_REASON.has(p.attr)))
    .sort((a, b) => b.contribution - a.contribution)
    .map(phrase);
  const reasons = [...new Set([...result.boostReasons, ...fromScores])].slice(0, max);
  // Something you asked for that it's weak at, or something you wanted to avoid that it leans on.
  const caveats = result.parts
    .filter(p => p.contribution < -8)
    .sort((a, b) => a.contribution - b.contribution)
    .slice(0, 2)
    .map(p => p.w > 0 ? (WEAK_CAVEATS[p.attr] || ATTRIBUTE_REASONS[p.attr][1]) : (AVOID_CAVEATS[p.attr] || ATTRIBUTE_REASONS[p.attr][0]));
  return { reasons, caveats: [...new Set(caveats)] };
}

// ─── Labels ──────────────────────────────────────────────────────────────────

const DIFFICULTY_LABELS = {
  1: "Beginner",
  2: "Easy",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
};

const CYCLE_LABELS = { fixed: "Fixed releases", rolling: "Rolling", atomic: "Atomic / image-based" };

// ─── Helpers ─────────────────────────────────────────────────────────────────

const DISTRO_BY_ID = Object.fromEntries(DISTROS.map(d => [d.id, d]));

function lineageOf(id) {
  const chain = [];
  for (let d = DISTRO_BY_ID[id]; d; d = d.parent ? DISTRO_BY_ID[d.parent] : null) chain.unshift(d);
  return chain;
}

function childrenOf(id) {
  return DISTROS.filter(d => d.parent === id);
}
