// ─── PickYourLinux · Editions and variants ───────────────────────────────────
//
// What you can actually download for each distro. `roles` says which quiz
// track an edition serves (desktop, server, security, privacy, gaming, iot), and
// `tags` are matched against quiz answers to recommend a specific edition.
// A distro's roles are the union of its editions' roles.
//
// Tags: gnome kde light cinnamon tiling windows mac old atomic nvidia handheld htpc
//   server minimal cloud vm container live arm rpi android wsl lts rolling paid
//   education dev ai fleet defensive ctf daily hypervisor nas backup nosystemd

const EDITIONS = {
  debian: [
    { name: "Live desktop images", desc: "Try and install with GNOME, KDE Plasma, Xfce, Cinnamon, MATE or LXQt", roles: ["desktop"], tags: ["gnome", "kde", "light", "cinnamon", "live"] },
    { name: "Netinst", desc: "A small network installer: pick a desktop, or none for a server", roles: ["desktop", "server"], tags: ["server", "minimal", "lts"] },
    { name: "Cloud images", desc: "Ready-made images for AWS, Azure, Google Cloud, OpenStack and local VMs", roles: ["server"], tags: ["cloud", "vm", "container"] },
    { name: "ARM and other architectures", desc: "arm64, armhf and more, including Raspberry Pi images maintained by Debian developers", roles: ["server", "iot"], tags: ["arm"] },
  ],
  ubuntu: [
    { name: "Ubuntu Desktop", desc: "The standard GNOME desktop, as an LTS or six-monthly release", roles: ["desktop"], tags: ["gnome", "lts"] },
    { name: "Ubuntu Server", desc: "Headless server install for x86 and ARM, with optional Ubuntu Pro", roles: ["server"], tags: ["server", "minimal", "lts", "arm"] },
    { name: "Ubuntu for Raspberry Pi", desc: "Official desktop and server images for Raspberry Pi boards", roles: ["iot", "desktop", "server"], tags: ["rpi", "arm"] },
    { name: "Ubuntu Core", desc: "A minimal, Snap-based, transactional OS for IoT devices and appliances", roles: ["iot"], tags: ["atomic", "fleet", "minimal"] },
    { name: "Cloud images", desc: "Official images on every major cloud and for local VMs", roles: ["server"], tags: ["cloud", "vm", "container"] },
    { name: "Official flavours", desc: "Kubuntu, Xubuntu, Lubuntu, Ubuntu MATE, Ubuntu Budgie, Ubuntu Studio, Ubuntu Cinnamon, Ubuntu Unity, Edubuntu and Ubuntu Kylin", roles: ["desktop"], tags: ["kde", "light", "cinnamon", "education"] },
  ],
  mint: [
    { name: "Cinnamon", desc: "The flagship edition with Mint's own desktop", roles: ["desktop"], tags: ["cinnamon", "windows"] },
    { name: "MATE", desc: "A classic, lighter desktop", roles: ["desktop"], tags: ["light"] },
    { name: "Xfce", desc: "The lightest edition, for older hardware", roles: ["desktop"], tags: ["light", "old"] },
  ],
  zorin: [
    { name: "Core", desc: "The free edition with Windows-style layouts", roles: ["desktop"], tags: ["gnome", "windows"] },
    { name: "Pro", desc: "Paid edition with extra layouts (including macOS-like) and bundled apps", roles: ["desktop"], tags: ["paid", "mac", "windows"] },
    { name: "Education", desc: "Free edition with learning apps for schools", roles: ["desktop"], tags: ["education"] },
    { name: "Lite", desc: "Xfce-based edition for older and low-spec computers", roles: ["desktop"], tags: ["light", "old"] },
  ],
  elementary:    [{ name: "elementary OS", desc: "A single edition with the Pantheon desktop", roles: ["desktop"], tags: ["mac"] }],
  popos: [
    { name: "Intel/AMD ISO", desc: "For computers with Intel or AMD graphics", roles: ["desktop"], tags: [] },
    { name: "NVIDIA ISO", desc: "Ships with NVIDIA's driver ready on first boot", roles: ["desktop"], tags: ["nvidia", "ai"] },
  ],
  kubuntu:       [{ name: "Kubuntu", desc: "KDE Plasma on Ubuntu", roles: ["desktop"], tags: ["kde", "windows"] }],
  lubuntu:       [{ name: "Lubuntu", desc: "LXQt on Ubuntu", roles: ["desktop"], tags: ["light", "old"] }],
  ubuntu_budgie: [{ name: "Ubuntu Budgie", desc: "Budgie on Ubuntu", roles: ["desktop"], tags: [] }],
  ubuntu_studio: [{ name: "Ubuntu Studio", desc: "KDE Plasma with creative apps and low-latency audio", roles: ["desktop"], tags: ["kde"] }],
  linuxlite:     [{ name: "Linux Lite", desc: "Xfce on Ubuntu LTS", roles: ["desktop"], tags: ["light", "old", "windows"] }],
  lmde:          [{ name: "LMDE", desc: "Cinnamon on Debian stable", roles: ["desktop"], tags: ["cinnamon", "windows"] }],
  trisquel: [
    { name: "Trisquel", desc: "The main edition with the MATE desktop", roles: ["desktop"], tags: ["light"] },
    { name: "Triskel", desc: "KDE Plasma edition", roles: ["desktop"], tags: ["kde"] },
    { name: "Trisquel Mini", desc: "LXDE edition for older computers", roles: ["desktop"], tags: ["light", "old"] },
    { name: "Trisquel Sugar TOAST", desc: "The Sugar learning platform for children", roles: ["desktop"], tags: ["education"] },
  ],
  antix: [
    { name: "Full", desc: "Window managers plus a full set of everyday apps", roles: ["desktop"], tags: ["light", "old", "live", "nosystemd"] },
    { name: "Base", desc: "Window managers with fewer apps", roles: ["desktop"], tags: ["light", "old", "nosystemd"] },
    { name: "Core and Net", desc: "Minimal command-line images to build up from", roles: ["desktop"], tags: ["minimal", "nosystemd"] },
  ],
  mxlinux: [
    { name: "Xfce", desc: "The flagship edition", roles: ["desktop"], tags: ["light"] },
    { name: "KDE Plasma", desc: "For newer, more capable machines", roles: ["desktop"], tags: ["kde"] },
    { name: "Fluxbox", desc: "A very light window manager for old hardware", roles: ["desktop"], tags: ["light", "old"] },
    { name: "AHS (Advanced Hardware Support)", desc: "Newer kernel and graphics stack for recent hardware", roles: ["desktop"], tags: [] },
    { name: "Raspberry Pi respin", desc: "MX's tools on Raspberry Pi boards", roles: ["iot", "desktop"], tags: ["rpi", "arm"] },
  ],
  devuan: [
    { name: "Desktop live images", desc: "Try it live with a lightweight desktop", roles: ["desktop"], tags: ["light", "live", "nosystemd"] },
    { name: "Netinstall and server images", desc: "Minimal installs for servers", roles: ["server"], tags: ["server", "minimal", "nosystemd"] },
  ],
  kali: [
    { name: "Installer images", desc: "Install Kali on a computer's disk", roles: ["security"], tags: [] },
    { name: "Live images", desc: "Boot from USB, with optional encrypted persistence", roles: ["security"], tags: ["live"] },
    { name: "Virtual machines", desc: "Prebuilt images for VMware, VirtualBox, QEMU and Hyper-V", roles: ["security"], tags: ["vm"] },
    { name: "ARM images", desc: "Raspberry Pi and other single-board computers", roles: ["security"], tags: ["arm", "rpi"] },
    { name: "Kali NetHunter", desc: "Kali on Android phones, from rootless to full custom kernels", roles: ["security"], tags: ["android"] },
    { name: "WSL", desc: "Kali inside Windows through the Windows Subsystem for Linux", roles: ["security"], tags: ["wsl"] },
    { name: "Cloud and containers", desc: "Images for cloud providers, Docker and LXC", roles: ["security"], tags: ["cloud", "container"] },
    { name: "Kali Purple", desc: "Defensive-security edition for blue teams and SOC work", roles: ["security"], tags: ["defensive"] },
  ],
  parrot: [
    { name: "Security", desc: "The full penetration-testing and forensics toolkit", roles: ["security"], tags: ["kde"] },
    { name: "Home", desc: "A privacy-minded everyday desktop; add tools as you need them", roles: ["desktop", "privacy"], tags: ["daily", "kde"] },
    { name: "HTB", desc: "Preconfigured for Hack The Box and CTF players", roles: ["security"], tags: ["ctf"] },
    { name: "Raspberry Pi", desc: "ARM64 images for Pi 3, 4, 400 and 5", roles: ["security", "iot"], tags: ["arm", "rpi"] },
    { name: "Docker and WSL", desc: "Parrot tools in a container or inside Windows", roles: ["security"], tags: ["container", "wsl"] },
  ],
  tails:         [{ name: "Tails", desc: "One edition, written to a USB stick", roles: ["privacy"], tags: ["live"] }],
  whonix: [
    { name: "Whonix for VirtualBox", desc: "Gateway and Workstation VMs for Windows, macOS or Linux hosts", roles: ["privacy"], tags: ["vm"] },
    { name: "Whonix for KVM", desc: "The same VMs for Linux hosts using KVM", roles: ["privacy"], tags: ["vm"] },
    { name: "Qubes-Whonix", desc: "Whonix templates built into Qubes OS", roles: ["privacy"], tags: [] },
  ],
  peppermint: [
    { name: "Debian-based", desc: "Peppermint on Debian stable", roles: ["desktop"], tags: ["light"] },
    { name: "Devuan-based", desc: "Peppermint without systemd", roles: ["desktop"], tags: ["light", "nosystemd"] },
  ],
  deepin:        [{ name: "deepin", desc: "A single desktop edition", roles: ["desktop"], tags: ["mac"] }],
  puppy: [
    { name: "Debian-based builds", desc: "The current flagship Puppies, such as BookwormPup64 and TrixiePup64", roles: ["desktop"], tags: ["old", "live", "light"] },
    { name: "Ubuntu-based builds", desc: "Puppies built from Ubuntu LTS packages", roles: ["desktop"], tags: ["old", "live", "light"] },
    { name: "Slackware-based builds", desc: "Puppies built from Slackware, such as S15Pup", roles: ["desktop"], tags: ["old", "live", "light"] },
  ],
  raspberrypi: [
    { name: "Raspberry Pi OS with desktop", desc: "The standard image with the Raspberry Pi desktop", roles: ["iot", "desktop"], tags: ["rpi"] },
    { name: "With desktop and recommended software", desc: "Adds office, programming and education apps", roles: ["iot", "desktop"], tags: ["rpi", "education"] },
    { name: "Raspberry Pi OS Lite", desc: "No desktop, for headless projects and servers", roles: ["iot", "server"], tags: ["rpi", "minimal", "server"] },
  ],
  proxmox: [
    { name: "Proxmox Virtual Environment", desc: "The hypervisor for VMs and containers", roles: ["server"], tags: ["hypervisor", "server"] },
    { name: "Proxmox Backup Server", desc: "Deduplicated backups for VMs, containers and hosts", roles: ["server"], tags: ["backup"] },
    { name: "Proxmox Mail Gateway", desc: "An email security gateway", roles: ["server"], tags: [] },
  ],
  truenas: [
    { name: "TrueNAS Community Edition", desc: "Free, for your own hardware", roles: ["server"], tags: ["nas", "server"] },
    { name: "TrueNAS Enterprise", desc: "Supported edition on iXsystems hardware", roles: ["server"], tags: ["nas", "paid"] },
  ],
  dietpi: [
    { name: "Raspberry Pi images", desc: "For every Raspberry Pi model", roles: ["iot", "server"], tags: ["rpi", "arm", "minimal"] },
    { name: "Other single-board computers", desc: "Odroid, Orange Pi, Radxa, Pine64 and many more", roles: ["iot", "server"], tags: ["arm", "minimal"] },
    { name: "PCs and virtual machines", desc: "x86 images for old PCs, mini PCs and VMs", roles: ["server"], tags: ["vm", "minimal"] },
  ],
  fedora: [
    { name: "Workstation", desc: "The flagship desktop with the latest GNOME", roles: ["desktop"], tags: ["gnome", "dev"] },
    { name: "KDE Plasma Desktop", desc: "The KDE edition, on equal footing with Workstation", roles: ["desktop"], tags: ["kde", "windows"] },
    { name: "Server", desc: "For bare metal or VMs, managed with the Cockpit web console", roles: ["server"], tags: ["server", "minimal"] },
    { name: "Cloud", desc: "Images tuned for cloud infrastructure", roles: ["server"], tags: ["cloud", "vm"] },
    { name: "CoreOS", desc: "A minimal, automatically updating OS for running containers", roles: ["server"], tags: ["container", "atomic", "minimal"] },
    { name: "IoT", desc: "An immutable base for edge devices and appliances, including Raspberry Pi", roles: ["iot"], tags: ["fleet", "atomic", "arm", "rpi"] },
    { name: "Spins", desc: "Other desktops: Xfce, Cinnamon, MATE, i3, LXQt, LXDE and more", roles: ["desktop"], tags: ["light", "cinnamon", "tiling"] },
    { name: "Labs", desc: "Curated bundles such as Games, Jam (audio), Astronomy, Python Classroom and Security Lab", roles: ["desktop", "security"], tags: ["education"] },
    { name: "Atomic Desktops", desc: "Image-based variants like Silverblue and Kinoite (see Fedora Silverblue)", roles: ["desktop"], tags: ["atomic"] },
  ],
  silverblue: [
    { name: "Silverblue", desc: "GNOME", roles: ["desktop"], tags: ["gnome", "atomic"] },
    { name: "Kinoite", desc: "KDE Plasma", roles: ["desktop"], tags: ["kde", "atomic", "windows"] },
    { name: "Sway Atomic", desc: "The Sway tiling compositor", roles: ["desktop"], tags: ["tiling", "atomic"] },
    { name: "Budgie Atomic", desc: "The Budgie desktop", roles: ["desktop"], tags: ["atomic"] },
    { name: "COSMIC Atomic", desc: "System76's COSMIC desktop", roles: ["desktop"], tags: ["atomic", "tiling"] },
  ],
  bazzite: [
    { name: "Desktop", desc: "KDE Plasma or GNOME, for gaming PCs and laptops", roles: ["desktop", "gaming"], tags: ["kde", "gnome", "atomic"] },
    { name: "Handheld and HTPC", desc: "Boots into Steam's Gaming Mode, for handhelds and TVs", roles: ["gaming"], tags: ["handheld", "htpc", "atomic"] },
    { name: "NVIDIA images", desc: "Desktop and HTPC images with NVIDIA's driver built in", roles: ["desktop", "gaming"], tags: ["nvidia"] },
  ],
  bluefin: [
    { name: "Bluefin", desc: "The standard image on the current Fedora", roles: ["desktop"], tags: ["gnome", "atomic"] },
    { name: "Bluefin DX", desc: "Developer mode: VS Code, Docker, devcontainers and more", roles: ["desktop"], tags: ["dev", "atomic", "gnome"] },
    { name: "Bluefin GTS", desc: "Stays on the previous Fedora release for extra stability", roles: ["desktop"], tags: ["atomic", "lts"] },
    { name: "Bluefin LTS", desc: "Built on CentOS Stream 10, supported for years per release", roles: ["desktop"], tags: ["atomic", "lts"] },
    { name: "Bluefin GDX", desc: "LTS base with NVIDIA CUDA, drivers and AI tooling", roles: ["desktop"], tags: ["ai", "nvidia", "atomic", "dev"] },
  ],
  aurora: [
    { name: "Aurora", desc: "The standard KDE Plasma image", roles: ["desktop"], tags: ["kde", "atomic", "windows"] },
    { name: "Aurora DX", desc: "Developer mode with containers, editors and tooling", roles: ["desktop"], tags: ["dev", "kde", "atomic"] },
  ],
  nobara: [
    { name: "Official", desc: "Nobara's customised KDE Plasma", roles: ["desktop", "gaming"], tags: ["kde", "nvidia"] },
    { name: "KDE", desc: "Stock KDE Plasma", roles: ["desktop"], tags: ["kde"] },
    { name: "GNOME", desc: "Stock GNOME", roles: ["desktop"], tags: ["gnome"] },
    { name: "Steam HTPC", desc: "Boots into Steam's Gaming Mode on a TV", roles: ["gaming"], tags: ["htpc"] },
    { name: "Steam Handheld", desc: "Gaming Mode for handheld PCs", roles: ["gaming"], tags: ["handheld"] },
  ],
  asahi: [
    { name: "KDE Plasma", desc: "The flagship desktop", roles: ["desktop"], tags: ["kde"] },
    { name: "GNOME", desc: "The GNOME desktop", roles: ["desktop"], tags: ["gnome"] },
    { name: "Server", desc: "No desktop, for a Mac mini or Mac Studio as a server", roles: ["server"], tags: ["server", "minimal"] },
    { name: "Minimal", desc: "A bare system to build on", roles: ["server"], tags: ["minimal"] },
  ],
  centos: [
    { name: "Installer images", desc: "DVD and boot ISOs for servers and workstations", roles: ["server"], tags: ["server"] },
    { name: "Cloud and container images", desc: "For clouds, VMs and container builds", roles: ["server"], tags: ["cloud", "vm", "container"] },
  ],
  rhel: [
    { name: "RHEL (server)", desc: "The standard subscription, ten-year lifecycle", roles: ["server"], tags: ["server", "lts", "paid"] },
    { name: "RHEL Workstation", desc: "The desktop subscription for developers and engineers", roles: ["desktop"], tags: ["gnome", "dev", "paid"] },
    { name: "Image mode (bootc)", desc: "Build and update RHEL as container images", roles: ["server"], tags: ["container", "atomic"] },
    { name: "RHEL for Edge", desc: "Immutable images for edge and IoT devices", roles: ["iot"], tags: ["fleet", "atomic"] },
    { name: "RHEL AI", desc: "A bootable image for running and tuning AI models", roles: ["server"], tags: ["ai", "nvidia"] },
  ],
  rocky: [
    { name: "Server installs", desc: "DVD, minimal and boot ISOs", roles: ["server"], tags: ["server", "minimal", "lts"] },
    { name: "Live desktops", desc: "Workstation (GNOME), KDE Plasma, Xfce and MATE live images", roles: ["desktop"], tags: ["gnome", "kde", "light", "live"] },
    { name: "Cloud and container images", desc: "For clouds, VMs and container builds", roles: ["server"], tags: ["cloud", "vm", "container"] },
  ],
  almalinux: [
    { name: "Server installs", desc: "DVD, minimal and boot ISOs", roles: ["server"], tags: ["server", "minimal", "lts"] },
    { name: "Live desktops", desc: "GNOME, KDE Plasma, Xfce and MATE live images", roles: ["desktop"], tags: ["gnome", "kde", "light", "live"] },
    { name: "Cloud and container images", desc: "For clouds, VMs and container builds", roles: ["server"], tags: ["cloud", "vm", "container"] },
    { name: "AlmaLinux Kitten", desc: "A preview of the next major release", roles: ["server"], tags: [] },
  ],
  qubes:         [{ name: "Qubes OS", desc: "A single edition, installed on the computer itself", roles: ["privacy"], tags: [] }],
  arch:          [{ name: "Arch Linux", desc: "One ISO; you choose everything else", roles: ["desktop", "server"], tags: ["minimal", "rolling"] }],
  manjaro: [
    { name: "KDE Plasma", desc: "The most popular edition", roles: ["desktop"], tags: ["kde", "windows"] },
    { name: "GNOME", desc: "GNOME with Manjaro's layout switcher", roles: ["desktop"], tags: ["gnome"] },
    { name: "Xfce", desc: "Lighter and traditional", roles: ["desktop"], tags: ["light"] },
    { name: "Community editions", desc: "Cinnamon, i3, Sway and others maintained by the community", roles: ["desktop"], tags: ["cinnamon", "tiling"] },
    { name: "Manjaro ARM", desc: "For Raspberry Pi, Pinebook and other ARM devices", roles: ["iot", "desktop"], tags: ["arm", "rpi"] },
  ],
  endeavouros: [
    { name: "Offline install", desc: "Installs KDE Plasma without an internet connection", roles: ["desktop"], tags: ["kde"] },
    { name: "Online install", desc: "Choose GNOME, Xfce, Cinnamon, i3, Sway and others during setup", roles: ["desktop"], tags: ["gnome", "light", "tiling", "cinnamon"] },
  ],
  garuda: [
    { name: "Dr460nized", desc: "The flagship, heavily themed KDE Plasma", roles: ["desktop"], tags: ["kde"] },
    { name: "Dr460nized Gaming", desc: "Dr460nized with gaming tools preinstalled", roles: ["desktop"], tags: ["kde"] },
    { name: "Mokka", desc: "A calmer KDE Plasma theme", roles: ["desktop"], tags: ["kde", "mac"] },
    { name: "KDE Lite", desc: "Plain KDE Plasma with fewer extras", roles: ["desktop"], tags: ["kde", "light"] },
    { name: "GNOME", desc: "The GNOME desktop", roles: ["desktop"], tags: ["gnome"] },
    { name: "Hyprland", desc: "A tiling Wayland compositor", roles: ["desktop"], tags: ["tiling"] },
    { name: "Sway", desc: "An i3-style tiling Wayland compositor", roles: ["desktop"], tags: ["tiling"] },
    { name: "i3", desc: "The i3 tiling window manager", roles: ["desktop"], tags: ["tiling"] },
    { name: "Xfce", desc: "A light, traditional desktop", roles: ["desktop"], tags: ["light"] },
    { name: "Cinnamon", desc: "A Windows-style desktop", roles: ["desktop"], tags: ["cinnamon", "windows"] },
  ],
  cachyos: [
    { name: "Desktop edition", desc: "Choose KDE Plasma, GNOME, COSMIC, Hyprland, Niri and others at install", roles: ["desktop"], tags: ["kde", "gnome", "tiling", "light"] },
    { name: "Handheld edition", desc: "Steam Gaming Mode for the Steam Deck, ROG Ally, Legion Go and others", roles: ["gaming"], tags: ["handheld", "htpc"] },
  ],
  omarchy:       [{ name: "Omarchy", desc: "One ISO with the full setup", roles: ["desktop"], tags: ["tiling", "dev"] }],
  artix: [
    { name: "Base images", desc: "Command-line installs with OpenRC, runit, s6 or dinit", roles: ["desktop", "server"], tags: ["minimal", "nosystemd"] },
    { name: "Desktop images", desc: "KDE Plasma, Xfce, LXQt, Cinnamon, MATE or LXDE, each with your choice of init", roles: ["desktop"], tags: ["kde", "light", "cinnamon", "nosystemd"] },
  ],
  blackarch: [
    { name: "Netinstall ISO", desc: "Recommended: a minimal base so you install only the tools you need", roles: ["security"], tags: ["minimal"] },
    { name: "Slim ISO", desc: "A live system with a set of common tools", roles: ["security"], tags: ["live"] },
    { name: "Full ISO", desc: "Every tool in the repository at build time (very large)", roles: ["security"], tags: [] },
  ],
  steamos: [
    { name: "Steam Deck", desc: "Preinstalled, with a recovery image if you need it", roles: ["gaming"], tags: ["handheld"] },
    { name: "Licensed third-party handhelds", desc: "Officially supported on the Lenovo Legion Go S", roles: ["gaming"], tags: ["handheld"] },
    { name: "Steam Machine", desc: "Valve's living-room PC ships with SteamOS", roles: ["gaming"], tags: ["htpc"] },
  ],
  opensuse: [
    { name: "Tumbleweed", desc: "Rolling release, tested with openQA", roles: ["desktop", "server"], tags: ["rolling", "kde", "gnome"] },
    { name: "Leap", desc: "Fixed releases built from SUSE Linux Enterprise sources", roles: ["desktop", "server"], tags: ["lts", "server"] },
    { name: "Slowroll", desc: "Rolling, but with updates batched more slowly than Tumbleweed", roles: ["desktop"], tags: ["rolling"] },
    { name: "MicroOS", desc: "A minimal, transactional, rolling OS for container hosts", roles: ["server"], tags: ["atomic", "container", "minimal"] },
    { name: "Leap Micro", desc: "A stable, immutable OS for containers and edge devices", roles: ["server", "iot"], tags: ["atomic", "container", "fleet", "minimal"] },
    { name: "Aeon", desc: "An immutable GNOME desktop", roles: ["desktop"], tags: ["atomic", "gnome"] },
    { name: "Kalpa", desc: "An immutable KDE Plasma desktop (experimental)", roles: ["desktop"], tags: ["atomic", "kde"] },
    { name: "Raspberry Pi and ARM", desc: "Tumbleweed and Leap images for ARM boards", roles: ["iot"], tags: ["arm", "rpi"] },
  ],
  nixos: [
    { name: "Graphical ISO", desc: "Installer with GNOME or KDE Plasma", roles: ["desktop"], tags: ["gnome", "kde"] },
    { name: "Minimal ISO", desc: "Command-line installer for servers and custom setups", roles: ["server"], tags: ["minimal", "server", "atomic"] },
  ],
  guix: [
    { name: "Guix System", desc: "The full declarative operating system", roles: ["desktop", "server"], tags: ["atomic"] },
    { name: "Guix on another distro", desc: "Just the package manager, on top of your current Linux", roles: ["desktop"], tags: [] },
  ],
  gentoo: [
    { name: "Minimal install + stage 3", desc: "The classic Handbook install, with OpenRC or systemd", roles: ["desktop", "server"], tags: ["minimal"] },
    { name: "LiveGUI", desc: "A KDE Plasma live system for trying it or installing", roles: ["desktop"], tags: ["kde", "live"] },
  ],
  void: [
    { name: "glibc", desc: "Base or Xfce images, the most compatible choice", roles: ["desktop", "server"], tags: ["light", "minimal", "nosystemd"] },
    { name: "musl", desc: "Lighter C library; some proprietary software won't run", roles: ["server"], tags: ["minimal", "nosystemd"] },
    { name: "ARM images", desc: "Raspberry Pi and other ARM boards", roles: ["iot"], tags: ["arm", "rpi", "nosystemd"] },
  ],
  slackware: [
    { name: "Stable", desc: "The current stable release", roles: ["desktop", "server"], tags: ["lts", "kde", "nosystemd"] },
    { name: "-current", desc: "The development branch with newer software", roles: ["desktop"], tags: ["rolling", "nosystemd"] },
    { name: "Slackware ARM", desc: "For 64-bit ARM machines", roles: ["iot"], tags: ["arm", "nosystemd"] },
  ],
  alpine: [
    { name: "Standard", desc: "Everything needed to install on a machine", roles: ["server"], tags: ["minimal", "server", "nosystemd"] },
    { name: "Extended", desc: "Standard plus the most common packages", roles: ["server"], tags: ["server"] },
    { name: "Virtual", desc: "Slimmed down for virtual machines", roles: ["server"], tags: ["vm", "cloud", "minimal"] },
    { name: "Raspberry Pi", desc: "Images for Raspberry Pi boards", roles: ["iot", "server"], tags: ["rpi", "arm"] },
    { name: "Generic ARM", desc: "Other ARM boards", roles: ["iot"], tags: ["arm"] },
    { name: "Mini root filesystem", desc: "For containers; the basis of the alpine Docker image", roles: ["server"], tags: ["container", "minimal"] },
    { name: "Xen", desc: "Built-in support for the Xen hypervisor", roles: ["server"], tags: ["hypervisor"] },
  ],
  solus: [
    { name: "Budgie", desc: "The flagship desktop", roles: ["desktop"], tags: [] },
    { name: "KDE Plasma", desc: "KDE Plasma", roles: ["desktop"], tags: ["kde", "windows"] },
    { name: "GNOME", desc: "GNOME", roles: ["desktop"], tags: ["gnome"] },
    { name: "Xfce", desc: "A lighter, traditional desktop", roles: ["desktop"], tags: ["light"] },
  ],
};
