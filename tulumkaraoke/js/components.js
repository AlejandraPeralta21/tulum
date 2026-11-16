/**
 * KARAOKE TULUM - Componentes Reutilizables de Interfaz (Karaoke Lounge VIP)
 * Sistema de iconos SVG vectoriales, Visualizadores de Audio Hi-Fi,
 * Reproductor Holográfico de Karaoke, Toasts y Modales con Glassmorphism.
 */

const TulumIcons = {
    // Logotipo icónico de Tulum: Micrófono vintage dorado + Palmeras + Corona circular
    logoCrest: (size = 48) => `
        <svg class="tulum-icon-crest" width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" stroke="url(#goldGradient)" stroke-width="2" stroke-dasharray="2 2" opacity="0.6"/>
            <circle cx="50" cy="50" r="42" stroke="url(#goldGradient)" stroke-width="1.8"/>
            <circle cx="50" cy="50" r="39" stroke="url(#goldGradient)" stroke-width="0.8" opacity="0.5"/>
            <!-- Palmera Izquierda -->
            <path d="M30 52 C28 42 22 36 18 38 C22 42 24 48 26 53" stroke="url(#goldGradient)" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M30 50 C26 44 20 45 19 49 C24 50 27 52 29 55" stroke="url(#goldGradient)" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M30 54 C30 65 29 70 28 74" stroke="url(#goldGradient)" stroke-width="1.5" stroke-linecap="round"/>
            <!-- Palmera Derecha -->
            <path d="M70 52 C72 42 78 36 82 38 C78 42 76 48 74 53" stroke="url(#goldGradient)" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M70 50 C74 44 80 45 81 49 C76 50 73 52 71 55" stroke="url(#goldGradient)" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M70 54 C70 65 71 70 72 74" stroke="url(#goldGradient)" stroke-width="1.5" stroke-linecap="round"/>
            <!-- Micrófono Central Shure Vintage con Acabado 3D -->
            <rect x="42" y="27" width="16" height="26" rx="8" fill="url(#goldGradient)" stroke="#07070B" stroke-width="1"/>
            <line x1="42" y1="34" x2="58" y2="34" stroke="#07070B" stroke-width="1.2"/>
            <line x1="42" y1="40" x2="58" y2="40" stroke="#07070B" stroke-width="1.2"/>
            <line x1="42" y1="46" x2="58" y2="46" stroke="#07070B" stroke-width="1.2"/>
            <line x1="50" y1="27" x2="50" y2="53" stroke="#07070B" stroke-width="1.2"/>
            <!-- Horquilla del micrófono -->
            <path d="M38 43 C38 57 62 57 62 43" stroke="url(#goldGradient)" stroke-width="2" stroke-linecap="round"/>
            <line x1="50" y1="56" x2="50" y2="67" stroke="url(#goldGradient)" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M42 67 H58" stroke="url(#goldGradient)" stroke-width="2.5" stroke-linecap="round"/>
            <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#F8F7FF" />
                    <stop offset="25%" stop-color="#F0D9A0" />
                    <stop offset="65%" stop-color="#D8B978" />
                    <stop offset="100%" stop-color="#9E7D3B" />
                </linearGradient>
            </defs>
        </svg>
    `,

    // Micrófono Holográfico Tridimensional Central
    holoMic: (size = 110) => `
        <div class="holo-mic-3d-wrap" style="width:${size}px; height:${size}px;">
            <div class="holo-energy-ring ring-1"></div>
            <div class="holo-energy-ring ring-2"></div>
            <div class="holo-energy-ring ring-3"></div>
            <svg class="holo-mic-svg" width="${size}" height="${size}" viewBox="0 0 100 100" fill="none">
                <!-- Aurea Dorada Central -->
                <circle cx="50" cy="50" r="34" fill="url(#aiGlowRadial)" opacity="0.5"/>
                <!-- Rejilla del micrófono -->
                <rect x="40" y="20" width="20" height="34" rx="10" fill="url(#holoSilverGold)" stroke="url(#goldGradient)" stroke-width="1.5"/>
                <line x1="40" y1="28" x2="60" y2="28" stroke="#07070B" stroke-width="1.5"/>
                <line x1="40" y1="36" x2="60" y2="36" stroke="#07070B" stroke-width="1.5"/>
                <line x1="40" y1="44" x2="60" y2="44" stroke="#07070B" stroke-width="1.5"/>
                <line x1="50" y1="20" x2="50" y2="54" stroke="#07070B" stroke-width="1.2"/>
                <!-- Horquilla con luces violeta -->
                <path d="M34 40 C34 60 66 60 66 40" stroke="url(#goldGradient)" stroke-width="3" stroke-linecap="round"/>
                <line x1="50" y1="58" x2="50" y2="76" stroke="url(#goldGradient)" stroke-width="3.5" stroke-linecap="round"/>
                <path d="M38 76 H62" stroke="url(#goldGradient)" stroke-width="3.5" stroke-linecap="round"/>
                <!-- Destello de Luz -->
                <circle cx="50" cy="36" r="3" fill="#E5D2A8" filter="drop-shadow(0 0 4px rgba(198,161,91,.8))"/>
                <defs>
                    <radialGradient id="aiGlowRadial" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#C6A15B" stop-opacity="0.55"/>
                        <stop offset="55%" stop-color="#8C7038" stop-opacity="0.2"/>
                        <stop offset="100%" stop-color="#0A0A0B" stop-opacity="0"/>
                    </radialGradient>
                    <linearGradient id="holoSilverGold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#F2ECE2"/>
                        <stop offset="40%" stop-color="#C6A15B"/>
                        <stop offset="100%" stop-color="#5E4C28"/>
                    </linearGradient>
                </defs>
            </svg>
        </div>
    `,

    aiBrain: () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0-4 4 4 4 0 0 0 4 4v1a4 4 0 0 0 4 4 4 4 0 0 0 4-4v-1a4 4 0 0 0 4-4 4 4 0 0 0-4-4V6a4 4 0 0 0-4-4z"/><path d="M9 12h6"/><circle cx="12" cy="12" r="2"/></svg>`,
    sparkles: () => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z"/></svg>`,
    home: () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
    music: () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`,
    calendar: () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
    user: () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
    heart: (filled = false) => filled ? 
        `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>` : 
        `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
    search: () => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
    close: () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    menu: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,
    play: () => `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`,
    pause: () => `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`,
    settings: () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
    shield: () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
    clock: () => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    users: () => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    check: () => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D8B978" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    arrowRight: () => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
    arrowLeft: () => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`,
    filter: () => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>`,
    mic: () => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`,
    guitar: () => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 3l2 2-9 9-2-2 9-9z"/><circle cx="7" cy="17" r="4"/><path d="M9.8 14.2L6 18"/></svg>`,
    crown: () => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="2 4 5 20 19 20 22 4 15 10 12 2 9 10 2 4"/></svg>`,
    sombrero: () => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="16" rx="10" ry="4"/><path d="M8 15 C8 9 10 7 12 7 C14 7 16 9 16 15"/></svg>`,
    congas: () => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="8" cy="6" rx="4" ry="2"/><path d="M4 6 L6 20 L10 20 L12 6"/><ellipse cx="16" cy="6" rx="4" ry="2"/><path d="M12 6 L14 20 L18 20 L20 6"/></svg>`,
    cassette: () => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><circle cx="8" cy="11" r="2"/><circle cx="16" cy="11" r="2"/><path d="M6 17h12"/></svg>`,
    flame: () => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
    globe: () => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    notes: () => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/><path d="M9 18V4l12-2v14"/></svg>`,
    help: () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    moon: () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
    logout: () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
    edit: () => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    trash: () => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
    plus: () => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    // Teléfono y Redes Sociales Oficiales Tulum
    phone: (size = 18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
    instagram: (size = 18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`,
    facebook: (size = 18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`,
    tiktok: (size = 18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.87 2.89 2.89 0 0 1-2.89-2.87 2.89 2.89 0 0 1 2.89-2.88c.28 0 .54.04.79.1v-3.52a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.32V8.92a8.3 8.3 0 0 0 4.91 1.62V7.08a4.85 4.85 0 0 1-1-.39z"/></svg>`,
    whatsapp: (size = 18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`
};

/**
 * CONFIGURACIÓN DE REDES SOCIALES - KARAOKE TULUM
 * Enlaces editables para sincronizar con los canales oficiales y WhatsApp de reservas.
 */
window.TULUM_SOCIAL_CONFIG = {
    instagram: "https://instagram.com/karaoketulum",
    facebook: "https://facebook.com/karaoketulum",
    tiktok: "https://tiktok.com/@karaoketulum",
    // Enlace configurable de WhatsApp hacia el establecimiento (+591 Bolivia)
    whatsapp: "https://wa.me/59170000000?text=Hola%20Karaoke%20Tulum%2C%20deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20mi%20reserva"
};

/**
 * Soporte Seguro sin Asistentes de IA (Identidad Karaoke Lounge VIP)
 */
window.tulumAiAssistant = {
    isOpen: false,
    init: () => {},
    open: () => {},
    close: () => {},
    ask: () => {},
    searchCustom: () => {}
};

/**
 * Toast Notification System
 */
window.showToast = function(titulo, mensaje, tipo = 'info', duracion = 4000) {
    const $container = $('#toastContainer');
    if (!$container.length) return;

    const id = 'toast-' + Date.now();
    let borderClass = 'toast-info';
    let iconSvg = TulumIcons.sparkles();

    if (tipo === 'success') {
        borderClass = 'toast-success';
        iconSvg = TulumIcons.check();
    } else if (tipo === 'error') {
        borderClass = 'toast-error';
        iconSvg = TulumIcons.close();
    } else if (tipo === 'warning') {
        borderClass = 'toast-warning';
        iconSvg = TulumIcons.help();
    }

    const html = `
        <div id="${id}" class="toast-item ${borderClass}">
            <div class="toast-icon-wrap">${iconSvg}</div>
            <div class="toast-body">
                <div class="toast-title">${titulo}</div>
                <div class="toast-msg">${mensaje}</div>
            </div>
            <button class="toast-close" onclick="$('#${id}').fadeOut(200, function(){ $(this).remove(); });">
                ${TulumIcons.close()}
            </button>
        </div>
    `;

    const $toast = $(html);
    $container.append($toast);
    $toast.hide().fadeIn(250);

    setTimeout(() => {
        $toast.fadeOut(300, function() {
            $(this).remove();
        });
    }, duracion);
};

/**
 * Modal System
 */
window.showModal = function({ titulo, contenidoHtml, textoConfirmar = 'Aceptar', textoCancelar = 'Cancelar', onConfirm = null, esPeligroso = false }) {
    $('#modalTitulo').text(titulo);
    $('#modalBody').html(contenidoHtml);
    
    const $btnConfirmar = $('#modalBtnConfirmar');
    $btnConfirmar.text(textoConfirmar);
    
    if (esPeligroso) {
        $btnConfirmar.addClass('btn-danger').removeClass('btn-gold');
    } else {
        $btnConfirmar.addClass('btn-gold').removeClass('btn-danger');
    }

    $btnConfirmar.off('click').on('click', () => {
        if (typeof onConfirm === 'function') {
            onConfirm();
        }
        window.closeModal();
    });

    $('#modalOverlay').addClass('active');
};

window.closeModal = function() {
    $('#modalOverlay').removeClass('active');
};

/**
 * Karaoke Audio Player & Holographic Visualizer Simulator
 */
class KaraokePlayer {
    constructor() {
        this.currentSong = null;
        this.isPlaying = false;
        this.currentTime = 0;
        this.totalDurationSeconds = 240;
        this.interval = null;
        this.currentLyricIndex = 0;
    }

    playSong(songId) {
        if (!window.songsManager) return;
        const song = window.songsManager.getById(songId);
        if (!song) return;

        this.currentSong = song;
        this.isPlaying = true;
        this.currentTime = 0;
        this.currentLyricIndex = 0;

        const parts = song.duracion.split(':');
        this.totalDurationSeconds = (parseInt(parts[0], 10) * 60) + parseInt(parts[1], 10) || 240;

        this.renderPlayerModal();
        this.startTimer();

        if (window.registrarBitacora) {
            window.registrarBitacora(
                "Reproducir Canción",
                "Reproductor",
                `Canción iniciada en Karaoke: "${song.titulo}" de ${song.artista}.`
            );
        }
    }

    togglePlay() {
        if (!this.currentSong) return;
        this.isPlaying = !this.isPlaying;
        
        const $playBtn = $('#playerTogglePlayBtn');
        if (this.isPlaying) {
            $playBtn.html(TulumIcons.pause());
            this.startTimer();
            $('.karaoke-waves-bar').removeClass('paused');
        } else {
            $playBtn.html(TulumIcons.play());
            clearInterval(this.interval);
            $('.karaoke-waves-bar').addClass('paused');
        }
    }

    startTimer() {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            if (!this.isPlaying) return;
            this.currentTime++;

            if (this.currentTime >= this.totalDurationSeconds) {
                this.currentTime = 0;
                this.playNext();
                return;
            }

            this.updatePlayerUI();
        }, 1000);
    }

    playNext() {
        if (!this.currentSong || !window.songsManager) return;
        const songs = window.songsManager.getAll();
        const currentIndex = songs.findIndex(s => s.id === this.currentSong.id);
        const nextIndex = (currentIndex + 1) % songs.length;
        this.playSong(songs[nextIndex].id);
    }

    playPrev() {
        if (!this.currentSong || !window.songsManager) return;
        const songs = window.songsManager.getAll();
        const currentIndex = songs.findIndex(s => s.id === this.currentSong.id);
        const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
        this.playSong(songs[prevIndex].id);
    }

    seek(percent) {
        this.currentTime = Math.floor(this.totalDurationSeconds * percent);
        this.updatePlayerUI();
    }

    formatTime(sec) {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    updatePlayerUI() {
        const $curTime = $('#playerCurrentTime');
        const $progressFill = $('#playerProgressBarFill');
        
        if ($curTime.length) {
            $curTime.text(this.formatTime(this.currentTime));
        }

        if ($progressFill.length) {
            const pct = (this.currentTime / this.totalDurationSeconds) * 100;
            $progressFill.css('width', `${pct}%`);
        }

        if (this.currentSong && this.currentSong.letra && this.currentSong.letra.length) {
            const step = Math.floor(this.totalDurationSeconds / this.currentSong.letra.length) || 10;
            const newIndex = Math.min(Math.floor(this.currentTime / step), this.currentSong.letra.length - 1);
            if (newIndex !== this.currentLyricIndex) {
                this.currentLyricIndex = newIndex;
                $('.lyric-line').removeClass('active past');
                $(`.lyric-line:lt(${newIndex})`).addClass('past');
                $(`.lyric-line:eq(${newIndex})`).addClass('active');
            }
        }
    }

    renderPlayerModal() {
        if (!this.currentSong) return;
        const s = this.currentSong;
        const isFav = window.favoritesManager ? window.favoritesManager.isFavorite(s.id) : false;

        const lyricsHtml = (s.letra || []).map((line, idx) => `
            <div class="lyric-line ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
                ${line}
            </div>
        `).join('');

        const html = `
            <div class="karaoke-player-container">
                <div class="karaoke-player-header">
                    <button class="btn-icon" aria-label="Cerrar reproductor" title="Cerrar reproductor" onclick="$('#playerModalOverlay').removeClass('active');">
                        ${TulumIcons.arrowLeft()}
                    </button>
                    <div class="player-top-title">EN VIVO · AUDIO HI-FI SURROUND VIP</div>
                    <button class="btn-icon" id="playerFavHeaderBtn" aria-label="Alternar favorito" title="Alternar favorito" onclick="window.karaokePlayer.toggleCurrentFavorite();">
                        ${TulumIcons.heart(isFav)}
                    </button>
                </div>

                <div class="player-artwork-section">
                    <div class="player-vinyl-disc ${this.isPlaying ? 'spinning' : ''}">
                        <img src="${s.imagen}" alt="${s.titulo}" class="player-art-img" onerror="this.src=window.lazyLoadManager.fallbackSvg;">
                        <div class="vinyl-center-hole"></div>
                    </div>
                    
                    <div class="player-info-meta">
                        <h2 class="player-song-title">${s.titulo}</h2>
                        <p class="player-artist-name">${s.artista}</p>
                        <span class="badge-genre">${s.genero} · ${s.categoria}</span>
                    </div>

                    <div class="karaoke-visualizer-bars">
                        <span class="karaoke-waves-bar bar-1"></span>
                        <span class="karaoke-waves-bar bar-2"></span>
                        <span class="karaoke-waves-bar bar-3"></span>
                        <span class="karaoke-waves-bar bar-4"></span>
                        <span class="karaoke-waves-bar bar-5"></span>
                        <span class="karaoke-waves-bar bar-4"></span>
                        <span class="karaoke-waves-bar bar-3"></span>
                        <span class="karaoke-waves-bar bar-2"></span>
                        <span class="karaoke-waves-bar bar-1"></span>
                    </div>
                </div>

                <div class="karaoke-lyrics-box" id="karaokeLyricsBox">
                    <div class="lyrics-scroll-inner">
                        ${lyricsHtml}
                    </div>
                </div>

                <div class="player-scrubber-row">
                    <span id="playerCurrentTime" class="player-time-label">0:00</span>
                    <div class="player-progress-bar-bg" onclick="window.karaokePlayer.handleScrubClick(event, this);">
                        <div id="playerProgressBarFill" class="player-progress-bar-fill" style="width: 0%;"></div>
                    </div>
                    <span class="player-time-label">${s.duracion}</span>
                </div>

                <div class="player-controls-row">
                    <button class="btn-player-action" aria-label="Modo aleatorio" title="Modo aleatorio" onclick="window.showToast('Modo Aleatorio', 'Reproducción aleatoria activada.', 'info');">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>
                    </button>
                    <button class="btn-player-action" aria-label="Canción anterior" title="Canción anterior" onclick="window.karaokePlayer.playPrev();">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" stroke-width="3"></line></svg>
                    </button>
                    <button id="playerTogglePlayBtn" class="btn-player-play-gold" aria-label="Reproducir o pausar" title="Reproducir o pausar" onclick="window.karaokePlayer.togglePlay();">
                        ${TulumIcons.pause()}
                    </button>
                    <button class="btn-player-action" aria-label="Canción siguiente" title="Canción siguiente" onclick="window.karaokePlayer.playNext();">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" stroke-width="3"></line></svg>
                    </button>
                    <button class="btn-player-action" aria-label="Efecto reverb" title="Efecto reverb" onclick="window.showToast('Efecto Reverb', 'Modo acústica Tulum optimizado.', 'info');">
                        ${TulumIcons.sparkles()}
                    </button>
                </div>

                <div class="player-footer-actions">
                    <button class="btn-gold-outline" onclick="window.karaokePlayer.toggleCurrentFavorite();">
                        <span id="playerFavText">${isFav ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}</span>
                    </button>
                    <button class="btn-gold" onclick="$('#karaokeLyricsBox').toggleClass('fullscreen-mode');">
                        Letra en Pantalla Completa
                    </button>
                </div>
            </div>
        `;

        $('#playerModalContent').html(html);
        $('#playerModalOverlay').addClass('active');
    }

    handleScrubClick(event, element) {
        const rect = element.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const width = rect.width;
        const pct = Math.max(0, Math.min(1, clickX / width));
        this.seek(pct);
    }

    toggleCurrentFavorite() {
        if (!this.currentSong || !window.favoritesManager) return;
        const isNowFav = window.favoritesManager.toggle(this.currentSong.id);
        
        $('#playerFavHeaderBtn').html(TulumIcons.heart(isNowFav));
        $('#playerFavText').text(isNowFav ? 'Quitar de Favoritos' : 'Agregar a Favoritos');
    }
}

window.karaokePlayer = new KaraokePlayer();

/**
 * Generadores de Componentes HTML (Rediseño Futurista & Karaoke Lounge VIP)
 */
window.Components = {
    icons: TulumIcons,

    // Tarjeta de Canción Rediseñada con Glassmorphism, Descripción Musical, Badges y Acciones Directas
    songCard: (song) => {
        const isFav = window.favoritesManager ? window.favoritesManager.isFavorite(song.id) : false;
        const escapeArtist = (song.artista || '').replace(/'/g, "\\'");

        return `
            <div class="song-card tulum-glass-card" data-song-id="${song.id}" onclick="window.router.mostrarDetallesCancion(${song.id});">
                <div class="song-card-img-wrap img-placeholder-wrapper">
                    <img class="lazy-img" data-src="${song.imagen}" alt="${song.titulo}" loading="lazy" />
                    <button class="song-play-overlay-btn" onclick="event.stopPropagation(); window.karaokePlayer.playSong(${song.id});" title="Cantar en Karaoke">
                        ${TulumIcons.play()}
                    </button>
                    <span class="match-badge-float">${song.popularidad}%</span>
                </div>
                <div class="song-card-info">
                    <div class="song-card-title-row">
                        <h3 class="song-card-title" title="${song.titulo}">${song.titulo}</h3>
                        <button class="btn-fav-toggle ${isFav ? 'is-fav' : ''}" onclick="event.stopPropagation(); window.favoritesManager.toggle(${song.id}); $(this).toggleClass('is-fav');" title="Favorito">
                            ${TulumIcons.heart(isFav)}
                        </button>
                    </div>
                    <p class="song-card-artist" onclick="event.stopPropagation(); window.router.mostrarFichaArtista('${escapeArtist}');" title="Ver perfil de ${song.artista}">
                        ${song.artista}
                    </p>
                    ${song.descripcion ? `<p class="song-card-desc" title="${song.descripcion}">${song.descripcion}</p>` : ''}
                    <div class="song-card-meta-row">
                        <div class="song-card-meta">
                            <span class="meta-genre">${song.genero}</span>
                            ${song.anio ? `<span class="meta-year">${song.anio}</span>` : ''}
                            <span class="meta-duration">${song.duracion}</span>
                        </div>
                        <button class="btn-sing-compact" onclick="event.stopPropagation(); window.karaokePlayer.playSong(${song.id});" title="Cantar en Karaoke">
                            ${TulumIcons.mic()} <span>Cantar</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    // Tarjeta de Artista Destacado con Avatar Circular, Anillo Dorado y Conteo de Canciones
    artistCard: (artist) => {
        const escapeArtist = (artist.artista || '').replace(/'/g, "\\'");
        const count = artist.cancionesCount || (window.songsManager ? window.songsManager.getByArtist(artist.artista).length : 0);

        return `
            <div class="artist-card tulum-glass-card" onclick="window.router.mostrarFichaArtista('${escapeArtist}');">
                <div class="artist-avatar-wrap img-placeholder-wrapper">
                    <img class="lazy-img" data-src="${artist.imagen}" alt="${artist.artista}" loading="lazy" />
                    <div class="artist-avatar-ring"></div>
                </div>
                <h3 class="artist-name">${artist.artista}</h3>
                <span class="artist-genre">${artist.genero || 'Intérprete VIP'}</span>
                <span class="badge-mini badge-gold">${count} canciones</span>
            </div>
        `;
    },

    // Tarjeta de Categoría con Fondo e Iluminación Neón
    categoryCard: (cat) => {
        const count = window.categoriesManager ? window.categoriesManager.getSongCount(cat.nombre) : 0;
        const iconFn = TulumIcons[cat.icono] || TulumIcons.music;

        return `
            <div class="category-card" onclick="window.router.navigate('catalogo', { categoria: '${cat.nombre}' });" style="--cat-color: ${cat.color};">
                <div class="cat-card-bg img-placeholder-wrapper">
                    <img class="lazy-img" data-src="${cat.imagen}" alt="${cat.nombre}" loading="lazy" />
                    <div class="cat-card-overlay"></div>
                </div>
                <div class="cat-card-content">
                    <div class="cat-icon-pill">${iconFn()}</div>
                    <h3 class="cat-title">${cat.nombre}</h3>
                    <p class="cat-subtitle">${cat.descripcion}</p>
                    <span class="cat-count-badge">${count} canciones</span>
                </div>
            </div>
        `;
    },

    // Modal de Detalles Completos de una Canción
    songDetailsModal: (song) => {
        const isFav = window.favoritesManager ? window.favoritesManager.isFavorite(song.id) : false;
        const escapeArtist = (song.artista || '').replace(/'/g, "\\'");

        return `
            <div class="song-details-modal-content">
                <div class="song-details-header">
                    <div class="song-details-cover-wrap">
                        <img src="${song.imagen}" alt="${song.titulo}" class="song-details-cover" onerror="this.src=window.lazyLoadManager.fallbackSvg;">
                        <span class="song-details-score-badge">${song.popularidad}% Popularidad</span>
                    </div>
                    <div class="song-details-header-info">
                        <span class="badge-genre">${song.categoria} · ${song.genero}</span>
                        <h2 class="song-details-title">${song.titulo}</h2>
                        <h3 class="song-details-artist" onclick="window.closeModal(); window.router.mostrarFichaArtista('${escapeArtist}');" title="Ver perfil de ${song.artista}">${song.artista} &rarr;</h3>
                        <div class="song-details-specs">
                            <span><strong>Año:</strong> ${song.anio || 'Clásico'}</span>
                            <span>·</span>
                            <span><strong>Duración:</strong> ${song.duracion}</span>
                            <span>·</span>
                            <span><strong>Modo:</strong> ${song.esDueto ? 'Dueto VIP' : 'Solista'}</span>
                        </div>
                        <div class="song-details-popularity-bar">
                            <div class="pop-bar-label">Índice en Karaoke Lounge:</div>
                            <div class="pop-progress-bg">
                                <div class="pop-progress-fill" style="width: ${song.popularidad}%;"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="song-details-desc-box">
                    <h4>Sobre este tema</h4>
                    <p>${song.descripcion || 'Una pieza musical imprescindible para cantar en las exclusivas salas acústicas de Karaoke Tulum.'}</p>
                </div>

                <div class="song-details-actions">
                    <button class="btn-gold" onclick="window.closeModal(); window.karaokePlayer.playSong(${song.id});">
                        ${TulumIcons.mic()} Cantar en Karaoke VIP
                    </button>
                    <button class="btn-gold-outline" onclick="window.favoritesManager.toggle(${song.id}); const isNowFav = window.favoritesManager.isFavorite(${song.id}); $(this).find('span').text(isNowFav ? 'Quitar de Favoritos' : 'Guardar en Favoritos');">
                        ${TulumIcons.heart(isFav)} <span>${isFav ? 'Quitar de Favoritos' : 'Guardar en Favoritos'}</span>
                    </button>
                    <button class="btn-link-gold" onclick="window.closeModal(); window.router.mostrarFichaArtista('${escapeArtist}');">
                        Ver más canciones de ${song.artista} &rarr;
                    </button>
                </div>
            </div>
        `;
    },

    // Modal de Ficha o Perfil de Artista
    artistDetailsModal: (artist, songs) => {
        return `
            <div class="artist-details-modal-content">
                <div class="artist-details-hero">
                    <div class="artist-details-avatar-wrap">
                        <img src="${artist.imagen}" alt="${artist.artista}" class="artist-details-avatar" onerror="this.src=window.lazyLoadManager.fallbackSvg;">
                    </div>
                    <div class="artist-details-hero-info">
                        <span class="badge-mini badge-gold">${artist.nacionalidad || 'Internacional'} · ${artist.genero}</span>
                        <h2 class="artist-details-name">${artist.artista}</h2>
                        <p class="artist-details-bio">${artist.bio || 'Destacado intérprete en el catálogo exclusivo de Karaoke Tulum.'}</p>
                        <span class="artist-details-count">${songs.length} pistas masterizadas disponibles</span>
                    </div>
                </div>

                <div class="artist-songs-catalogue-heading">
                    <h4>Canciones disponibles en el Lounge</h4>
                </div>

                <div class="artist-songs-modal-list">
                    ${songs.map((s, idx) => `
                        <div class="artist-song-item">
                            <div class="artist-song-num">${idx + 1}</div>
                            <div class="artist-song-thumb">
                                <img src="${s.imagen}" alt="${s.titulo}" onerror="this.src=window.lazyLoadManager.fallbackSvg;">
                            </div>
                            <div class="artist-song-text">
                                <div class="artist-song-title-row">
                                    <span class="artist-song-title">${s.titulo}</span>
                                    <span class="artist-song-dur">${s.duracion}</span>
                                </div>
                                <span class="artist-song-meta">${s.genero} · ${s.anio || ''}</span>
                            </div>
                            <div class="artist-song-actions">
                                <button class="btn-fav-toggle ${window.favoritesManager && window.favoritesManager.isFavorite(s.id) ? 'is-fav' : ''}" onclick="window.favoritesManager.toggle(${s.id}); $(this).toggleClass('is-fav');" title="Favorito">
                                    ${TulumIcons.heart(window.favoritesManager && window.favoritesManager.isFavorite(s.id))}
                                </button>
                                <button class="btn-sm-gold" onclick="window.closeModal(); window.karaokePlayer.playSong(${s.id});" title="Cantar">
                                    ${TulumIcons.play()} Cantar
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    // Paginador para CERO SCROLL
    pagination: ({ paginaActual, totalPaginas, onPageCallName = 'cambiarPagina' }) => {
        if (totalPaginas <= 1) return '';

        return `
            <div class="tulum-pagination-bar">
                <button class="btn-pagination-nav" ${paginaActual <= 1 ? 'disabled' : ''} onclick="${onPageCallName}(${paginaActual - 1});">
                    ${TulumIcons.arrowLeft()} Anterior
                </button>
                <span class="pagination-info">Página <strong>${paginaActual}</strong> de <strong>${totalPaginas}</strong></span>
                <button class="btn-pagination-nav" ${paginaActual >= totalPaginas ? 'disabled' : ''} onclick="${onPageCallName}(${paginaActual + 1});">
                    Siguiente ${TulumIcons.arrowRight()}
                </button>
            </div>
        `;
    }
};
