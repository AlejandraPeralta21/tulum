/**
 * KARAOKE TULUM - Enrutador SPA (Single Page Application)
 * Rutas internas sin recarga de página, sincronización con el historial del navegador
 * y renderizado dinámico de vistas optimizadas para CERO SCROLL.
 */

class TulumRouter {
    constructor() {
        this.currentRoute = 'inicio';
        this.currentParams = {};
        this.routes = [
            'inicio',
            'catalogo',
            'categorias',
            'artistas',
            'favoritos',
            'reservas',
            'historial',
            'admin',
            'configuracion'
        ];

        // Estado para vista de catálogo
        this.catalogoState = {
            pagina: 1,
            porPagina: 6,
            query: '',
            categoria: 'Todas',
            subcategoria: 'Todas',
            artista: 'Todos',
            orden: 'popularidad',
            soloDuetos: false
        };

        this.init();
    }

    init() {
        // Escuchar cambios de hash en la URL
        window.addEventListener('hashchange', () => {
            this.handleHashChange();
        });

        // Escuchar navegación por flechas adelante/atrás
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.route) {
                this.navigate(e.state.route, e.state.params || {}, false);
            } else {
                this.handleHashChange();
            }
        });
    }

    handleHashChange() {
        const hash = window.location.hash.replace('#', '') || 'inicio';
        const [route, queryString] = hash.split('?');
        const params = {};

        if (queryString) {
            const pairs = queryString.split('&');
            pairs.forEach(p => {
                const [k, v] = p.split('=');
                if (k) params[decodeURIComponent(k)] = decodeURIComponent(v || '');
            });
        }

        this.navigate(route || 'inicio', params, false);
    }

    navigate(route, params = {}, updateHash = true) {
        if (!this.routes.includes(route)) {
            route = 'inicio';
        }

        this.currentRoute = route;
        this.currentParams = params;

        // Actualizar URL hash si corresponde
        if (updateHash) {
            let hashStr = '#' + route;
            const paramKeys = Object.keys(params);
            if (paramKeys.length > 0) {
                const qs = paramKeys.map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
                hashStr += '?' + qs;
            }
            window.location.hash = hashStr;
        }

        // Cerrar menú hamburguesa automáticamente
        this.closeSidebar();

        // Actualizar estados visuales de menús activos
        this.updateActiveNavs(route);

        // Limpiar temporizador provisional si se navega fuera de reservas
        if (route !== 'reservas' && window.reservationsManager) {
            window.reservationsManager.limpiarTemporizador();
        }

        // Renderizar la vista correspondiente
        this.renderCurrent();

        // Bitácora de navegación
        if (window.registrarBitacora) {
            window.registrarBitacora("Navegación SPA", "Router", `Navegación a vista: "${route.toUpperCase()}".`);
        }
    }

    updateActiveNavs(route) {
        // Sidebar drawer
        $('.sidebar-nav-item').removeClass('active');
        $(`.sidebar-nav-item[data-route="${route}"]`).addClass('active');

        // Bottom nav
        $('.bottom-nav-item').removeClass('active');
        $(`.bottom-nav-item[data-route="${route}"]`).addClass('active');

        // Header brand indicator
        $('#headerCurrentRoute').text(route.toUpperCase());
    }

    closeSidebar() {
        $('#sidebarDrawer').removeClass('open');
        $('#drawerOverlay').removeClass('active');
    }

    openSidebar() {
        $('#sidebarDrawer').addClass('open');
        $('#drawerOverlay').addClass('active');
    }

    renderCurrent() {
        const $content = $('#appContentArea');
        if (!$content.length) return;

        let html = '';

        switch (this.currentRoute) {
            case 'inicio':
                html = this.viewInicio();
                break;
            case 'catalogo':
                html = this.viewCatalogo();
                break;
            case 'categorias':
                html = this.viewCategorias();
                break;
            case 'artistas':
                html = this.viewArtistas();
                break;
            case 'favoritos':
                html = this.viewFavoritos();
                break;
            case 'reservas':
                html = this.viewReservas();
                break;
            case 'historial':
                html = this.viewHistorial();
                break;
            case 'admin':
                html = this.viewAdmin();
                break;
            case 'configuracion':
                html = this.viewConfiguracion();
                break;
            default:
                html = this.viewInicio();
        }

        $content.html(html);

        // Si es la vista de admin, renderizar contenido del panel
        if (this.currentRoute === 'admin' && window.adminPanel) {
            window.adminPanel.render();
        }

        // Hidratar componentes dinámicos en la nueva vista
        if (window.hydrationManager) {
            window.hydrationManager.hydrateDynamicContent($content[0]);
        }

        // Disparar Lazy Loading para imágenes visibles
        if (window.lazyLoadManager) {
            window.lazyLoadManager.observeAll($content[0]);
        }
    }

    /* ==========================================================
       VISTA 1: INICIO (DASHBOARD PRINCIPAL - KARAOKE LOUNGE VIP)
       ========================================================== */
    viewInicio() {
        const topSongs = window.songsManager ? window.songsManager.getFeatured(6) : [];
        const topArtists = window.songsManager ? window.songsManager.getArtistsList().slice(0, 8) : [];
        const topCategories = window.categoriesManager ? window.categoriesManager.getAll().slice(0, 6) : [];

        const songsCardsHtml = topSongs.map(s => Components.songCard(s)).join('');
        const artistsCardsHtml = topArtists.map(a => Components.artistCard(a)).join('');
        const catCardsHtml = topCategories.map(c => Components.categoryCard(c)).join('');

        return `
            <div class="view-inicio-container" data-component="view-inicio">
                <!-- Zona Superior / Hero Presentation: KARAOKE TULUM -->
                <div class="inicio-hero-banner tulum-glass-card">
                    <div class="hero-left-content">
                        <div class="hero-ai-badge-row">
                            <span class="hero-badge-vip">KARAOKE LOUNGE VIP</span>
                            <span class="hero-badge-gold"><span class="vip-pulse-dot"></span> SALAS PRIVADAS · ACÚSTICA HI-FI</span>
                        </div>
                        <h1 class="hero-title">KARAOKE TULUM</h1>
                        <p class="hero-subtitle">Canta, disfruta y vive una noche inolvidable</p>
                        <p class="hero-desc-lounge">Salas privadas insonorizadas, mixología de autor y más de 90 temas masterizados de las leyendas más grandes de la música en español.</p>
                        <div class="hero-actions-row">
                            <button class="btn-gold" onclick="window.router.navigate('catalogo');">
                                ${Components.icons.music()} Explorar Catálogo
                            </button>
                            <button class="btn-gold-outline" onclick="window.router.navigate('reservas');">
                                ${Components.icons.calendar()} Reservar Sala VIP
                            </button>
                            <button class="btn-dark-pill" onclick="window.router.navigate('favoritos');">
                                ${Components.icons.heart(true)} Mis Favoritos
                            </button>
                        </div>
                    </div>
                    
                    <!-- Micrófono Central Shure Dorado Vintage con Luces Sutiles -->
                    <div class="hero-right-illustration">
                        <div class="hero-holo-stage">
                            ${Components.icons.holoMic(115)}
                            <div class="vintage-mic-glow"></div>
                            <div class="holo-reflection-shadow"></div>
                        </div>
                    </div>
                </div>

                <!-- Zona Central 1: Visualizador Acústico de Frecuencias & Buscador VIP -->
                <div class="inicio-visualizer-bar-card tulum-glass-card" data-component="music-visualizer">
                    <div class="visualizer-header-row">
                        <div class="vis-status-tag">
                            <span class="status-live-dot"></span>
                            <span>FRECUENCIA ACÚSTICA EN VIVO · SONIDO SURROUND 360°</span>
                        </div>
                        <!-- Chips de Acceso Rápido por Género -->
                        <div class="vis-ai-chips">
                            <button class="chip-sm" onclick="window.router.navigate('catalogo', { categoria: 'Baladas' });">❤️ Baladas</button>
                            <button class="chip-sm" onclick="window.router.navigate('catalogo', { categoria: 'Románticas' });">🌹 Románticas</button>
                            <button class="chip-sm" onclick="window.router.navigate('catalogo', { categoria: 'Rancheras' });">🎺 Rancheras</button>
                            <button class="chip-sm" onclick="window.router.navigate('catalogo', { categoria: 'Pop latino' });">🔥 Pop Latino</button>
                            <button class="chip-sm" onclick="window.router.navigate('catalogo', { orden: 'popularidad' });">👑 Más Cantadas</button>
                        </div>
                    </div>

                    <div class="vis-center-waves-row">
                        <div class="visualizer-frequencies">
                            <span class="freq-bar" style="--initial-h: 30%; animation-delay: 0.1s;"></span>
                            <span class="freq-bar" style="--initial-h: 75%; animation-delay: 0.25s;"></span>
                            <span class="freq-bar" style="--initial-h: 45%; animation-delay: 0.15s;"></span>
                            <span class="freq-bar" style="--initial-h: 90%; animation-delay: 0.35s;"></span>
                            <span class="freq-bar" style="--initial-h: 60%; animation-delay: 0.05s;"></span>
                            <span class="freq-bar" style="--initial-h: 85%; animation-delay: 0.2s;"></span>
                            <span class="freq-bar" style="--initial-h: 40%; animation-delay: 0.4s;"></span>
                            <span class="freq-bar" style="--initial-h: 100%; animation-delay: 0.3s;"></span>
                            <span class="freq-bar" style="--initial-h: 55%; animation-delay: 0.18s;"></span>
                            <span class="freq-bar" style="--initial-h: 80%; animation-delay: 0.22s;"></span>
                            <span class="freq-bar" style="--initial-h: 35%; animation-delay: 0.12s;"></span>
                            <span class="freq-bar" style="--initial-h: 70%; animation-delay: 0.38s;"></span>
                            <span class="freq-bar" style="--initial-h: 50%; animation-delay: 0.28s;"></span>
                            <span class="freq-bar" style="--initial-h: 95%; animation-delay: 0.08s;"></span>
                            <span class="freq-bar" style="--initial-h: 65%; animation-delay: 0.32s;"></span>
                            <span class="freq-bar" style="--initial-h: 85%; animation-delay: 0.14s;"></span>
                        </div>

                        <!-- Buscador Rápido con Autocompletado Dinámico -->
                        <div class="inicio-quick-search-box flex-grow">
                            <div class="quick-search-inner">
                                ${Components.icons.search()}
                                <input type="text" id="inicioSearchInput" placeholder="Busca canción, artista o estilo (ej: Luis Miguel, Rancheras, Duetos)..." onkeydown="if(event.key==='Enter') window.router.navigate('catalogo', { query: this.value });" />
                                <button class="btn-sm-gold" onclick="window.router.navigate('catalogo', { query: $('#inicioSearchInput').val() });">
                                    Buscar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- SECCIÓN 1: LAS MÁS CANTADAS -->
                <div class="inicio-subpanel inicio-panel-highlight">
                    <div class="section-title-row">
                        <div>
                            <span class="section-kicker">TOP FAVORITAS EN SALAS VIP</span>
                            <h2 class="section-heading-gold">LAS MÁS CANTADAS</h2>
                        </div>
                        <button class="btn-link-gold" onclick="window.router.navigate('catalogo', { orden: 'popularidad' });">
                            Ver catálogo completo (${window.songsManager ? window.songsManager.getAll().length : 0} temas) &rarr;
                        </button>
                    </div>
                    <div class="inicio-songs-grid">
                        ${songsCardsHtml}
                    </div>
                </div>

                <!-- SECCIÓN 2: ARTISTAS DESTACADOS -->
                <div class="inicio-subpanel">
                    <div class="section-title-row">
                        <div>
                            <span class="section-kicker">VOCES INOLVIDABLES</span>
                            <h2 class="section-heading-gold">ARTISTAS DESTACADOS</h2>
                        </div>
                        <button class="btn-link-gold" onclick="window.router.navigate('artistas');">
                            Ver todos los artistas &rarr;
                        </button>
                    </div>
                    <div class="inicio-artists-scroll">
                        ${artistsCardsHtml}
                    </div>
                </div>

                <!-- SECCIÓN 3: CATEGORÍAS DESTACADAS -->
                <div class="inicio-subpanel">
                    <div class="section-title-row">
                        <div>
                            <span class="section-kicker">GÉNEROS MUSICALES</span>
                            <h2 class="section-heading-gold">CATEGORÍAS DESTACADAS</h2>
                        </div>
                        <button class="btn-link-gold" onclick="window.router.navigate('categorias');">
                            Ver las 14 categorías &rarr;
                        </button>
                    </div>
                    <div class="inicio-categories-grid">
                        ${catCardsHtml}
                    </div>
                </div>

                <!-- Zona Inferior: Redes Sociales Oficiales y Barra de Métricas -->
                <div class="inicio-footer-metrics-bar">
                    <div class="footer-social-box">
                        <span class="footer-social-invite">Síguenos y descubre todo lo que sucede en KARAOKE TULUM:</span>
                        <div class="footer-social-links">
                            <a href="${window.TULUM_SOCIAL_CONFIG.instagram}" target="_blank" rel="noopener noreferrer" class="social-btn instagram" title="Instagram oficial">
                                ${Components.icons.instagram(18)} Instagram
                            </a>
                            <a href="${window.TULUM_SOCIAL_CONFIG.facebook}" target="_blank" rel="noopener noreferrer" class="social-btn facebook" title="Facebook oficial">
                                ${Components.icons.facebook(18)} Facebook
                            </a>
                            <a href="${window.TULUM_SOCIAL_CONFIG.tiktok}" target="_blank" rel="noopener noreferrer" class="social-btn tiktok" title="TikTok oficial">
                                ${Components.icons.tiktok(18)} TikTok
                            </a>
                            <a href="${window.TULUM_SOCIAL_CONFIG.whatsapp}" target="_blank" rel="noopener noreferrer" class="social-btn whatsapp" title="WhatsApp Reservas VIP (+591)">
                                ${Components.icons.whatsapp(18)} WhatsApp VIP
                            </a>
                        </div>
                    </div>

                    <div class="footer-metrics-pills">
                        <span class="metric-tag">${Components.icons.music()} ${window.songsManager ? window.songsManager.getAll().length : 0} Pistas Masterizadas</span>
                        <span class="metric-divider">·</span>
                        <span class="metric-tag">${Components.icons.calendar()} 8 Salas VIP Exclusivas</span>
                        <span class="metric-divider">·</span>
                        <span class="metric-tag">${Components.icons.crown()} Experiencia Acústica Lounge</span>
                    </div>
                </div>
            </div>
        `;
    }

    /* ==========================================================
       VISTA 2: CATÁLOGO DE CANCIONES (PAGINADO, CERO SCROLL)
       ========================================================== */
    viewCatalogo() {
        if (this.currentParams.categoria) {
            this.catalogoState.categoria = this.currentParams.categoria;
        }
        if (this.currentParams.artista) {
            this.catalogoState.artista = this.currentParams.artista;
        }
        if (this.currentParams.query !== undefined) {
            this.catalogoState.query = this.currentParams.query;
        }
        if (this.currentParams.orden) {
            this.catalogoState.orden = this.currentParams.orden;
        }

        const cats = window.categoriesManager ? window.categoriesManager.getAll() : [];
        const result = window.songsManager ? window.songsManager.filter(this.catalogoState) : { items: [], totalPaginas: 1, paginaActual: 1 };

        const categoryPills = ['Todas', ...cats.map(c => c.nombre)].map(catName => `
            <button class="filter-pill ${this.catalogoState.categoria === catName ? 'active' : ''}" onclick="window.router.setCatalogoCategoria('${catName}');">
                ${catName}
            </button>
        `).join('');

        const cardsHtml = result.items.length > 0 ? 
            result.items.map(s => Components.songCard(s)).join('') :
            `<div class="empty-state-card">
                ${Components.icons.music()}
                <h3>No se encontraron canciones</h3>
                <p>Prueba con otros términos de búsqueda o cambia la categoría seleccionada.</p>
                <button class="btn-gold-outline" onclick="window.router.limpiarFiltrosCatalogo();">Limpiar Filtros</button>
            </div>`;

        return `
            <div class="view-catalogo-container">
                <!-- Barra de búsqueda y filtros superiores -->
                <div class="catalogo-toolbar">
                    <div class="search-input-wrap flex-grow">
                        ${Components.icons.search()}
                        <input type="text" id="catalogoSearchInput" class="tulum-input" placeholder="Buscar por título, artista, género o descripción..." value="${this.catalogoState.query}" oninput="window.router.debounceSearch(this.value);" />
                        ${this.catalogoState.query ? `
                            <button class="btn-clear-search" onclick="window.router.debounceSearch(''); $('#catalogoSearchInput').val('');">
                                ${Components.icons.close()}
                            </button>
                        ` : ''}
                    </div>

                    <div class="toolbar-controls-group">
                        <select class="tulum-select" onchange="window.router.setCatalogoOrden(this.value);">
                            <option value="popularidad" ${this.catalogoState.orden === 'popularidad' ? 'selected' : ''}>Más populares</option>
                            <option value="az" ${this.catalogoState.orden === 'az' ? 'selected' : ''}>A - Z (Título)</option>
                            <option value="za" ${this.catalogoState.orden === 'za' ? 'selected' : ''}>Z - A (Título)</option>
                            <option value="recientes" ${this.catalogoState.orden === 'recientes' ? 'selected' : ''}>Más recientes</option>
                            <option value="anio" ${this.catalogoState.orden === 'anio' ? 'selected' : ''}>Año de lanzamiento</option>
                        </select>

                        <label class="toggle-pill-duetos ${this.catalogoState.soloDuetos ? 'active' : ''}">
                            <input type="checkbox" ${this.catalogoState.soloDuetos ? 'checked' : ''} onchange="window.router.setCatalogoDuetos(this.checked);" />
                            <span>Solo Duetos</span>
                        </label>
                    </div>
                </div>

                <!-- Carrusel / Barra Horizontal de Categorías -->
                <div class="catalogo-categories-scroll">
                    ${categoryPills}
                </div>

                <!-- Grilla de Tarjetas Adaptada al Viewport -->
                <div class="catalogo-songs-grid">
                    ${cardsHtml}
                </div>

                <!-- Paginador Integrado sin Scroll -->
                <div class="catalogo-footer-pagination">
                    ${Components.pagination({
                        paginaActual: result.paginaActual,
                        totalPaginas: result.totalPaginas,
                        onPageCallName: 'window.router.cambiarPaginaCatalogo'
                    })}
                </div>
            </div>
        `;
    }

    /* ==========================================================
       MODALES DE INFORMACIÓN DETALLADA (CANCIÓN Y ARTISTA)
       ========================================================== */
    mostrarDetallesCancion(songId) {
        if (!window.songsManager) return;
        const song = window.songsManager.getById(songId);
        if (!song) return;

        window.showModal({
            titulo: "Detalles de la Canción",
            contenidoHtml: Components.songDetailsModal(song),
            textoConfirmar: "Cantar Ahora",
            textoCancelar: "Cerrar",
            onConfirm: () => {
                window.karaokePlayer.playSong(song.id);
            }
        });

        if (window.registrarBitacora) {
            window.registrarBitacora("Ficha Canción", "Catálogo", `Consulta de detalles de la canción "${song.titulo}".`);
        }
    }

    mostrarFichaArtista(artistaName) {
        if (!window.songsManager) return;
        const songs = window.songsManager.getByArtist(artistaName);
        const seedInfo = (window.SEED_ARTISTS && window.SEED_ARTISTS[artistaName]) || {};
        
        const artistData = {
            artista: artistaName,
            imagen: seedInfo.imagen || (songs[0] ? songs[0].imagen : 'assets/images/default-artist.jpg'),
            genero: seedInfo.genero || (songs[0] ? songs[0].genero : 'Música en Español'),
            nacionalidad: seedInfo.nacionalidad || 'Internacional',
            bio: seedInfo.bio || `Ícono indiscutible de la música en español con ${songs.length} temas masterizados en Karaoke Tulum.`,
            cancionesCount: songs.length
        };

        window.showModal({
            titulo: `Perfil Artístico: ${artistaName}`,
            contenidoHtml: Components.artistDetailsModal(artistData, songs),
            textoConfirmar: "Ver en Catálogo",
            textoCancelar: "Cerrar",
            onConfirm: () => {
                this.navigate('catalogo', { query: artistaName });
            }
        });

        if (window.registrarBitacora) {
            window.registrarBitacora("Perfil Artista", "Artistas", `Apertura de ficha del artista "${artistaName}".`);
        }
    }

    setCatalogoCategoria(cat) {
        this.catalogoState.categoria = cat;
        this.catalogoState.pagina = 1;
        this.renderCurrent();
    }

    setCatalogoOrden(ord) {
        this.catalogoState.orden = ord;
        this.catalogoState.pagina = 1;
        this.renderCurrent();
    }

    setCatalogoDuetos(val) {
        this.catalogoState.soloDuetos = val;
        this.catalogoState.pagina = 1;
        this.renderCurrent();
    }

    cambiarPaginaCatalogo(p) {
        this.catalogoState.pagina = p;
        this.renderCurrent();
    }

    limpiarFiltrosCatalogo() {
        this.catalogoState.query = '';
        this.catalogoState.categoria = 'Todas';
        this.catalogoState.subcategoria = 'Todas';
        this.catalogoState.soloDuetos = false;
        this.catalogoState.pagina = 1;
        this.renderCurrent();
    }

    debounceSearch(val) {
        clearTimeout(this._searchTimer);
        this._searchTimer = setTimeout(() => {
            const queryLimpia = val.trim();
            this.catalogoState.query = queryLimpia;
            this.catalogoState.pagina = 1;
            this.renderCurrent();
            if (window.registrarBitacora && queryLimpia.length >= 2) {
                window.registrarBitacora("Búsqueda", "Canciones", `Búsqueda en catálogo: "${queryLimpia}".`);
            }
        }, 250);
    }

    /* ==========================================================
       VISTA 3: CATEGORÍAS Y SUBCATEGORÍAS
       ========================================================== */
    viewCategorias() {
        const cats = window.categoriesManager ? window.categoriesManager.getAll() : [];
        const cardsHtml = cats.map(c => Components.categoryCard(c)).join('');

        return `
            <div class="view-categorias-container">
                <div class="view-header-row">
                    <div>
                        <h1 class="view-main-title">Categorías Musicales</h1>
                        <p class="view-main-sub">Explora géneros de todo el mundo seleccionados para cantar en Tulum</p>
                    </div>
                </div>

                <div class="categorias-grid-layout">
                    ${cardsHtml}
                </div>
            </div>
        `;
    }

    /* ==========================================================
       VISTA 4: ARTISTAS (GRANDES LEYENDAS & PERFILES VIP)
       ========================================================== */
    viewArtistas() {
        const artists = window.songsManager ? window.songsManager.getArtistsList() : [];
        const artistsHtml = artists.map(a => Components.artistCard(a)).join('');

        return `
            <div class="view-artistas-container">
                <div class="view-header-row">
                    <div>
                        <h1 class="view-main-title">Artistas Destacados</h1>
                        <p class="view-main-sub">Selecciona un artista para consultar su trayectoria y todas sus canciones disponibles en Karaoke Tulum</p>
                    </div>
                </div>
                <div class="artistas-grid-layout">
                    ${artistsHtml}
                </div>
            </div>
        `;
    }

    /* ==========================================================
       VISTA 5: FAVORITOS
       ========================================================== */
    viewFavoritos() {
        const favSongs = window.favoritesManager ? window.favoritesManager.getFavoriteSongs() : [];
        const cardsHtml = favSongs.length > 0 ? 
            favSongs.map(s => Components.songCard(s)).join('') :
            `<div class="empty-state-card">
                ${Components.icons.heart(true)}
                <h3>Aún no tienes canciones favoritas</h3>
                <p>Explora el catálogo y presiona el ícono del corazón en cualquier tema para guardarlo aquí.</p>
                <button class="btn-gold" onclick="window.router.navigate('catalogo');">Explorar Canciones</button>
            </div>`;

        return `
            <div class="view-favoritos-container">
                <div class="view-header-row">
                    <div>
                        <h1 class="view-main-title">Mis Favoritos</h1>
                        <p class="view-main-sub">${favSongs.length} canciones guardadas en tu lista personal</p>
                    </div>
                    ${favSongs.length > 0 ? `
                        <button class="btn-gold" onclick="window.karaokePlayer.playSong(${favSongs[0].id});">
                            ${Components.icons.play()} Reproducir Todo
                        </button>
                    ` : ''}
                </div>
                <div class="catalogo-songs-grid">
                    ${cardsHtml}
                </div>
            </div>
        `;
    }

    /* ==========================================================
       VISTA 6: SISTEMA DE RESERVAS (3 PASOS + TEMPORIZADOR 60s)
       ========================================================== */
    viewReservas() {
        const mgr = window.reservationsManager;
        const paso = mgr.pasoActual;
        const prov = mgr.provisionalActual;

        // Fecha mínima de hoy en formato YYYY-MM-DD
        const hoyStr = new Date().toISOString().split('T')[0];

        // Formateador de fecha amigable (ej: 15 Dic 2025)
        const formatFecha = (fStr) => {
            if (!fStr) return '';
            try {
                const parts = fStr.split('-');
                if (parts.length === 3) {
                    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                    const dia = parseInt(parts[2], 10);
                    const mes = meses[parseInt(parts[1], 10) - 1] || parts[1];
                    return `${dia} ${mes} ${parts[0]}`;
                }
            } catch (e) {}
            return fStr;
        };

        // Indicador de tres pasos (1: Datos, 2: Confirmación, 3: ¡Listo!)
        const stepperHtml = `
            <div class="reservation-stepper" role="progressbar" aria-label="Progreso de la reserva">
                <div class="step-item ${paso >= 1 ? 'active' : ''} ${paso > 1 ? 'completed' : ''}">
                    <div class="step-circle">${paso > 1 ? '✓' : '1'}</div>
                    <span class="step-label">Datos</span>
                </div>
                <div class="step-line ${paso >= 2 ? 'active' : ''}"></div>
                <div class="step-item ${paso >= 2 ? 'active' : ''} ${paso > 2 ? 'completed' : ''}">
                    <div class="step-circle">${paso > 2 ? '✓' : '2'}</div>
                    <span class="step-label">Confirmación</span>
                </div>
                <div class="step-line ${paso >= 3 ? 'active' : ''}"></div>
                <div class="step-item ${paso >= 3 ? 'active' : ''} ${paso === 3 ? 'completed' : ''}">
                    <div class="step-circle">${paso === 3 ? '✓' : '3'}</div>
                    <span class="step-label">¡Listo!</span>
                </div>
            </div>
        `;

        // Configuración de redes sociales
        const socialCfg = window.TULUM_SOCIAL_CONFIG || {
            instagram: "https://instagram.com/karaoketulum",
            facebook: "https://facebook.com/karaoketulum",
            tiktok: "https://tiktok.com/@karaoketulum",
            whatsapp: "https://wa.me/59170000000?text=Hola%20Karaoke%20Tulum%2C%20deseo%20m%C3%A1s%20informaci%C3%B3n"
        };

        const socialFooterHtml = `
            <div class="reserva-social-footer">
                <p class="social-footer-text">«Síguenos en nuestras redes sociales y vive la experiencia TULUM»</p>
                <div class="social-icons-row">
                    <a href="${socialCfg.instagram}" target="_blank" rel="noopener noreferrer" class="social-link-btn" title="Instagram Karaoke Tulum" aria-label="Instagram">
                        ${Components.icons.instagram ? Components.icons.instagram(18) : ''}
                        <span>Instagram</span>
                    </a>
                    <a href="${socialCfg.facebook}" target="_blank" rel="noopener noreferrer" class="social-link-btn" title="Facebook Karaoke Tulum" aria-label="Facebook">
                        ${Components.icons.facebook ? Components.icons.facebook(18) : ''}
                        <span>Facebook</span>
                    </a>
                    <a href="${socialCfg.tiktok}" target="_blank" rel="noopener noreferrer" class="social-link-btn" title="TikTok Karaoke Tulum" aria-label="TikTok">
                        ${Components.icons.tiktok ? Components.icons.tiktok(18) : ''}
                        <span>TikTok</span>
                    </a>
                    <a href="${socialCfg.whatsapp}" target="_blank" rel="noopener noreferrer" class="social-link-btn social-link-whatsapp" title="WhatsApp Reservas Tulum (+591)" aria-label="WhatsApp">
                        ${Components.icons.whatsapp ? Components.icons.whatsapp(18) : ''}
                        <span>WhatsApp</span>
                    </a>
                </div>
            </div>
        `;

        let stepContent = '';

        if (paso === 1) {
            // Teléfono provisional si se regresa a editar
            const telVal = prov ? (prov.telefono || '') : '';
            const telLen = telVal.length;

            stepContent = `
                <form id="reservaFormPaso1" class="reserva-unified-form" onsubmit="event.preventDefault(); window.router.enviarPaso1Reserva();">
                    <div class="form-sections-grid-layout">
                        <!-- SECCIÓN 1: DATOS PERSONALES -->
                        <div class="form-sub-section-card">
                            <div class="sub-section-header">
                                <div class="sub-section-badge-icon">${Components.icons.user()}</div>
                                <div class="sub-section-titles-wrap">
                                    <h3 class="sub-section-title">Sección 1: Datos personales</h3>
                                    <p class="sub-section-desc">Identificación del titular de la reserva</p>
                                </div>
                            </div>
                            
                            <div class="sub-section-fields">
                                <!-- 1. Nombre Completo -->
                                <div class="form-group">
                                    <label for="resNombre">Nombre completo *</label>
                                    <div class="input-with-icon">
                                        ${Components.icons.user()}
                                        <input type="text" id="resNombre" class="tulum-input" placeholder="Ej. Alejandra Peralta" value="${prov ? prov.nombre : ''}" required autocomplete="name" oninput="window.validationManager.aplicarEstadoCampo($(this), window.validationManager.validarNombre(this.value));" />
                                    </div>
                                </div>

                                <!-- 2. Teléfono Boliviano con Prefijo +591 fijo y Contador 0/8 -->
                                <div class="form-group phone-group">
                                    <div class="field-label-row">
                                        <label for="resTelefono">Número de teléfono *</label>
                                        <span id="phoneCharCounter" class="phone-char-counter ${telLen === 8 ? 'is-complete' : ''}">${telLen}/8</span>
                                    </div>
                                    <div class="phone-input-bolivia">
                                        <div class="phone-prefix-wrap">
                                            ${Components.icons.phone ? Components.icons.phone(16) : ''}
                                            <span class="phone-country-code">+591</span>
                                            <span class="phone-divider">|</span>
                                        </div>
                                        <input 
                                            type="tel" 
                                            id="resTelefono" 
                                            class="tulum-input phone-number-input" 
                                            placeholder="71234567" 
                                            maxlength="8" 
                                            inputmode="numeric" 
                                            pattern="[0-9]{8}" 
                                            value="${telVal}" 
                                            required 
                                            autocomplete="tel-national" 
                                            oninput="window.handlePhoneInput(this);" 
                                        />
                                    </div>
                                </div>

                                <!-- 3. Fecha de Reserva -->
                                <div class="form-group">
                                    <label for="resFecha">Fecha de reserva *</label>
                                    <div class="input-with-icon">
                                        ${Components.icons.calendar()}
                                        <input type="date" id="resFecha" class="tulum-input" min="${hoyStr}" value="${prov ? prov.fecha : hoyStr}" required onchange="window.validationManager.aplicarEstadoCampo($(this), window.validationManager.validarFecha(this.value));" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- SECCIÓN 2: DETALLES DE LA RESERVA -->
                        <div class="form-sub-section-card">
                            <div class="sub-section-header">
                                <div class="sub-section-badge-icon">${Components.icons.mic()}</div>
                                <div class="sub-section-titles-wrap">
                                    <h3 class="sub-section-title">Sección 2: Detalles de la reserva</h3>
                                    <p class="sub-section-desc">Horario, aforo y selección de sala VIP</p>
                                </div>
                            </div>

                            <div class="sub-section-fields">
                                <div class="form-fields-dual-row">
                                    <!-- 4. Hora de Reserva -->
                                    <div class="form-group">
                                        <label for="resHora">Hora *</label>
                                        <div class="input-with-icon">
                                            ${Components.icons.clock()}
                                            <input type="time" id="resHora" class="tulum-input" value="${prov ? prov.hora : '21:00'}" required onchange="window.validationManager.aplicarEstadoCampo($(this), window.validationManager.validarHora(this.value));" />
                                        </div>
                                    </div>

                                    <!-- 5. Número de Personas -->
                                    <div class="form-group">
                                        <label for="resPersonas">N° de personas *</label>
                                        <div class="input-with-icon">
                                            ${Components.icons.users()}
                                            <input type="number" id="resPersonas" class="tulum-input" min="1" max="30" value="${prov ? prov.personas : '6'}" required oninput="window.validationManager.aplicarEstadoCampo($(this), window.validationManager.validarPersonas(this.value));" />
                                        </div>
                                    </div>
                                </div>

                                <!-- 6. Selección de Sala VIP -->
                                <div class="form-group">
                                    <label for="resSala">Selección de sala VIP *</label>
                                    <div class="input-with-icon">
                                        ${Components.icons.mic()}
                                        <select id="resSala" class="tulum-select" required>
                                            <option value="VIP 3 - Lounge Tulum" ${(!prov || prov.sala === 'VIP 3 - Lounge Tulum' || prov.sala === 'VIP Lounge Tulum') ? 'selected' : ''}>VIP 3 - Lounge Tulum (6-12 pers.)</option>
                                            <option value="VIP 1 - Cenote Cristal" ${prov && (prov.sala === 'VIP 1 - Cenote Cristal' || prov.sala === 'Terraza Neón Cenote') ? 'selected' : ''}>VIP 1 - Cenote Cristal (8-20 pers.)</option>
                                            <option value="VIP 2 - Penthouse Acústico" ${prov && (prov.sala === 'VIP 2 - Penthouse Acústico' || prov.sala === 'Penthouse Acústico') ? 'selected' : ''}>VIP 2 - Penthouse Acústico (2-8 pers.)</option>
                                            <option value="Sala Jade Privada" ${prov && prov.sala === 'Sala Jade Privada' ? 'selected' : ''}>Sala Jade Privada (4-10 pers.)</option>
                                            <option value="Suite Imperial Tulum" ${prov && prov.sala === 'Suite Imperial Tulum' ? 'selected' : ''}>Suite Imperial Tulum (15-30 pers.)</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- 7. Observaciones opcionales -->
                                <div class="form-group">
                                    <label for="resObservaciones">Observaciones o peticiones especiales</label>
                                    <div class="input-with-icon">
                                        ${Components.icons.music ? Components.icons.music() : Components.icons.star()}
                                        <input type="text" id="resObservaciones" class="tulum-input" placeholder="Ej. Cumpleaños, playlist especial, bebidas..." value="${prov ? (prov.observaciones === 'Sin observaciones' ? '' : prov.observaciones) : ''}" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Botones Inferiores: VOLVER a la izquierda, CONTINUAR a la derecha -->
                    <div class="form-actions-split-bar">
                        <button type="button" class="btn-reserva-back" onclick="window.router.navigate('inicio');">
                            ${Components.icons.arrowLeft ? Components.icons.arrowLeft() : '←'} VOLVER
                        </button>
                        <button type="submit" class="btn-reserva-continue">
                            CONTINUAR ${Components.icons.arrowRight()}
                        </button>
                    </div>

                    <!-- Sección de Redes Sociales -->
                    ${socialFooterHtml}
                </form>
            `;
        } else if (paso === 2) {
            // Paso 2: Confirmación con Temporizador de 60 segundos
            const telMostrado = prov.telefonoFormateado || `+591 ${prov.telefono}`;
            const fechaLegible = formatFecha(prov.fecha);

            stepContent = `
                <div class="reserva-step2-countdown-box">
                    <!-- Encabezado Sección 3: Confirmación -->
                    <div class="sub-section-header confirm-card-top-header">
                        <div class="sub-section-badge-icon">${Components.icons.check()}</div>
                        <div class="sub-section-titles-wrap">
                            <h2 class="sub-section-title">Sección 3: Confirmación</h2>
                            <p class="sub-section-desc">Revisa los datos de tu velada antes de confirmar</p>
                        </div>
                    </div>

                    <div class="timer-circular-wrap">
                        <svg class="timer-svg" width="110" height="110" viewBox="0 0 120 120">
                            <circle class="timer-circle-bg" cx="60" cy="60" r="54" />
                            <circle id="timerProgressCircle" class="timer-circle-progress" cx="60" cy="60" r="54" />
                        </svg>
                        <div class="timer-center-text">
                            <span id="timerCountdownNumber" class="timer-countdown-num">${mgr.segundosRestantes}s</span>
                            <span class="timer-label-sub">Tiempo para confirmar</span>
                        </div>
                    </div>

                    <p class="confirm-desc">Revisa tu reserva y confirma en 60 segundos para garantizar la exclusividad de tu sala VIP.</p>

                    <!-- Resumen de datos tipo Voucher VIP -->
                    <div class="voucher-preview-card">
                        <div class="voucher-header">
                            <span class="voucher-title">Resumen de tu reserva</span>
                            <span class="voucher-code-badge">${prov.codigo}</span>
                        </div>
                        <div class="voucher-grid">
                            <div class="voucher-row">
                                <span class="v-label">${Components.icons.user()} Huésped:</span>
                                <span class="v-val">${prov.nombre}</span>
                            </div>
                            <div class="voucher-row">
                                <span class="v-label">${Components.icons.phone ? Components.icons.phone(16) : '📞'} Teléfono:</span>
                                <span class="v-val">${telMostrado}</span>
                            </div>
                            <div class="voucher-row">
                                <span class="v-label">${Components.icons.mic()} Sala VIP:</span>
                                <span class="v-val highlight-gold">${prov.sala}</span>
                            </div>
                            <div class="voucher-row">
                                <span class="v-label">${Components.icons.calendar()} Fecha:</span>
                                <span class="v-val">${fechaLegible}</span>
                            </div>
                            <div class="voucher-row">
                                <span class="v-label">${Components.icons.clock()} Hora:</span>
                                <span class="v-val">${prov.hora} hrs</span>
                            </div>
                            <div class="voucher-row">
                                <span class="v-label">${Components.icons.users()} Personas:</span>
                                <span class="v-val">${prov.personas} invitados</span>
                            </div>
                        </div>
                        ${prov.observaciones && prov.observaciones !== 'Sin observaciones' ? `
                            <div class="voucher-notes-row">
                                <span class="v-label">Petición especial:</span>
                                <span class="v-val notes">${prov.observaciones}</span>
                            </div>
                        ` : ''}
                    </div>

                    <!-- Botones de Acción: EDITAR RESERVA izquierda, CONFIRMAR RESERVA derecha -->
                    <div class="form-actions-split-bar confirmation-actions-bar">
                        <button type="button" class="btn-reserva-edit" onclick="window.reservationsManager.regresarAEditar();">
                            ${Components.icons.edit ? Components.icons.edit(16) : '✎'} EDITAR RESERVA
                        </button>
                        <button type="button" class="btn-reserva-confirm" onclick="window.reservationsManager.confirmarActual(); window.router.renderCurrent();">
                            ${Components.icons.check()} CONFIRMAR RESERVA
                        </button>
                    </div>

                    <!-- Botón CANCELAR discreto con confirmación previa -->
                    <div class="cancel-reserva-row">
                        <button type="button" class="btn-reserva-cancel" onclick="window.router.mostrarModalCancelarReserva();">
                            ${Components.icons.trash ? Components.icons.trash(14) : '✕'} CANCELAR
                        </button>
                    </div>

                    <!-- Sección de Redes Sociales -->
                    ${socialFooterHtml}
                </div>
            `;
        } else if (paso === 3) {
            // Paso 3: ¡Listo! Confirmación Exitosa
            const telMostrado = prov.telefonoFormateado || `+591 ${prov.telefono}`;
            const fechaLegible = formatFecha(prov.fecha);

            stepContent = `
                <div class="reserva-success-card">
                    <div class="success-gold-crest">
                        <div class="gold-ring">
                            ${Components.icons.check()}
                        </div>
                    </div>

                    <h1 class="success-title">¡RESERVA CONFIRMADA!</h1>
                    <p class="success-subtitle">Tu sala ha sido reservada con éxito en Karaoke Tulum Lounge VIP.</p>

                    <div class="voucher-final-card">
                        <div class="voucher-decor-top"></div>
                        <div class="final-voucher-body">
                            <div class="voucher-item"><span class="k">${Components.icons.mic()} Sala VIP:</span> <span class="v">${prov.sala}</span></div>
                            <div class="voucher-item"><span class="k">${Components.icons.user()} Huésped:</span> <span class="v">${prov.nombre}</span></div>
                            <div class="voucher-item"><span class="k">${Components.icons.phone ? Components.icons.phone(16) : '📞'} Teléfono:</span> <span class="v">${telMostrado}</span></div>
                            <div class="voucher-item"><span class="k">${Components.icons.calendar()} Fecha:</span> <span class="v">${fechaLegible}</span></div>
                            <div class="voucher-item"><span class="k">${Components.icons.clock()} Hora:</span> <span class="v">${prov.hora} hrs</span></div>
                            <div class="voucher-item"><span class="k">${Components.icons.users()} Personas:</span> <span class="v">${prov.personas} invitados</span></div>
                            <div class="voucher-divider"></div>
                            <div class="voucher-code-highlight">
                                <span class="lbl">Código de reserva:</span>
                                <span class="code">${prov.codigo}</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-actions-split-bar confirmation-actions-bar">
                        <button type="button" class="btn-reserva-back" onclick="window.router.reiniciarReservas();">
                            ${Components.icons.arrowLeft ? Components.icons.arrowLeft() : '←'} VOLVER AL INICIO
                        </button>
                        <button type="button" class="btn-reserva-continue" onclick="window.router.navigate('historial');">
                            VER MIS RESERVAS ${Components.icons.arrowRight()}
                        </button>
                    </div>

                    <!-- Sección de Redes Sociales -->
                    ${socialFooterHtml}
                </div>
            `;
        }

        return `
            <div class="view-reservas-container">
                <div class="reserva-header-section">
                    <h1 class="reservas-page-title">RESERVA TU EXPERIENCIA</h1>
                    <p class="reservas-page-subtitle">Karaoke Lounge VIP · Exclusividad, Confort Acústico & Coctelería de Autor</p>
                </div>
                ${stepperHtml}
                <div class="step-body-container">
                    ${stepContent}
                </div>
            </div>
        `;
    }

    mostrarModalCancelarReserva() {
        if (window.showModal) {
            window.showModal({
                titulo: "¿Deseas cancelar tu reserva?",
                contenidoHtml: `
                    <p style="color: rgba(248, 247, 255, 0.85); font-size: 0.95rem; line-height: 1.5; margin-bottom: 0.8rem;">
                        Si cancelas ahora, se liberará el turno de la sala y los datos ingresados no se guardarán.
                    </p>
                    <p style="color: #D8B978; font-size: 0.9rem; font-weight: 500;">
                        ¿Estás seguro de que deseas cancelar la reserva actual?
                    </p>
                `,
                textoConfirmar: "Sí, cancelar",
                textoCancelar: "No, continuar",
                esPeligroso: true,
                onConfirm: () => {
                    window.reservationsManager.cancelarActual();
                }
            });
        } else {
            if (confirm("¿Estás seguro de que deseas cancelar la reserva actual?")) {
                window.reservationsManager.cancelarActual();
            }
        }
    }

    enviarPaso1Reserva() {
        const telefonoRaw = $('#resTelefono').val() || '';
        
        // Validación estricta del teléfono boliviano
        const validacionTel = window.validationManager.validarTelefono(telefonoRaw);
        if (!validacionTel.valido) {
            window.validationManager.aplicarEstadoCampo($('#resTelefono'), validacionTel);
            if (window.showToast) {
                window.showToast("Teléfono incompleto", validacionTel.mensaje, "error");
            }
            $('#resTelefono').focus();
            return;
        }

        const datos = {
            nombre: $('#resNombre').val(),
            telefono: validacionTel.numeroLimpio || telefonoRaw.trim(),
            fecha: $('#resFecha').val(),
            hora: $('#resHora').val(),
            personas: $('#resPersonas').val(),
            sala: $('#resSala').val(),
            observaciones: $('#resObservaciones').val()
        };

        const resValidacion = window.validationManager.validarFormularioReserva(datos);
        if (!resValidacion.esValido) {
            // Aplicar errores visuales a los campos
            if (resValidacion.errores.nombre) window.validationManager.aplicarEstadoCampo($('#resNombre'), { valido: false, mensaje: resValidacion.errores.nombre });
            if (resValidacion.errores.telefono) window.validationManager.aplicarEstadoCampo($('#resTelefono'), { valido: false, mensaje: resValidacion.errores.telefono });
            if (resValidacion.errores.fecha) window.validationManager.aplicarEstadoCampo($('#resFecha'), { valido: false, mensaje: resValidacion.errores.fecha });
            if (resValidacion.errores.hora) window.validationManager.aplicarEstadoCampo($('#resHora'), { valido: false, mensaje: resValidacion.errores.hora });
            if (resValidacion.errores.personas) window.validationManager.aplicarEstadoCampo($('#resPersonas'), { valido: false, mensaje: resValidacion.errores.personas });
            if (resValidacion.errores.sala) window.validationManager.aplicarEstadoCampo($('#resSala'), { valido: false, mensaje: resValidacion.errores.sala });

            if (window.showToast) {
                window.showToast("Datos incompletos", "Por favor revisa los campos señalados en rojo.", "error");
            }
            return;
        }

        // Crear provisional e iniciar temporizador de 60s
        window.reservationsManager.crearProvisional(datos);
        this.renderCurrent();
    }

    reiniciarReservas() {
        window.reservationsManager.pasoActual = 1;
        window.reservationsManager.provisionalActual = null;
        window.reservationsManager.limpiarTemporizador();
        this.navigate('inicio');
    }

    /* ==========================================================
       VISTA 7: HISTORIAL DE RESERVAS
       ========================================================== */
    viewHistorial() {
        const reservas = window.reservationsManager ? window.reservationsManager.getAll() : [];
        const itemsHtml = reservas.length > 0 ? reservas.map(r => `
            <div class="reserva-history-card">
                <div class="history-card-header">
                    <span class="badge-code">${r.codigo}</span>
                    <span class="badge-status ${r.estado.toLowerCase()}">${r.estado}</span>
                </div>
                <div class="history-card-body">
                    <h3 class="res-sala-name">${r.sala}</h3>
                    <p class="res-guest-name">${Components.icons.user()} ${r.nombre} (${r.personas} personas)</p>
                    <p class="res-datetime">${Components.icons.calendar()} ${r.fecha} a las ${r.hora} hrs</p>
                </div>
                <div class="history-card-actions">
                    <button class="btn-sm-gold-outline" onclick="window.adminPanel.verDetalleReserva('${r.id}');">
                        Detalles
                    </button>
                    ${r.estado === 'Confirmada' ? `
                        <button class="btn-sm-danger-outline" onclick="window.reservationsManager.cambiarEstado('${r.id}', 'Cancelada'); window.router.renderCurrent();">
                            Cancelar
                        </button>
                    ` : ''}
                </div>
            </div>
        `).join('') : `
            <div class="empty-state-card">
                ${Components.icons.calendar()}
                <h3>No hay reservas registradas</h3>
                <p>Reserva una sala para vivir la experiencia Karaoke Tulum con tus amigos.</p>
                <button class="btn-gold" onclick="window.router.navigate('reservas');">Reservar Sala</button>
            </div>
        `;

        return `
            <div class="view-historial-container">
                <div class="view-header-row">
                    <div>
                        <h1 class="view-main-title">Mis Reservas</h1>
                        <p class="view-main-sub">Historial de salas reservadas y estado de confirmación</p>
                    </div>
                    <button class="btn-gold" onclick="window.router.navigate('reservas');">
                        ${Components.icons.plus()} Nueva Reserva
                    </button>
                </div>
                <div class="historial-cards-grid">
                    ${itemsHtml}
                </div>
            </div>
        `;
    }

    /* ==========================================================
       VISTA 8: PANEL DE ADMINISTRACIÓN
       ========================================================== */
    viewAdmin() {
        return `
            <div class="view-admin-container" id="adminViewContainer">
                <!-- Se inyecta dinámicamente mediante AdminPanel.render() -->
            </div>
        `;
    }

    /* ==========================================================
       VISTA 9: CONFIGURACIÓN
       ========================================================== */
    viewConfiguracion() {
        const settings = window.storage ? window.storage.get(window.STORAGE_KEYS.SETTINGS, {}) : {};
        const user = window.storage ? window.storage.get(window.STORAGE_KEYS.USER, {}) : {};

        return `
            <div class="view-config-container">
                <div class="view-header-row">
                    <div>
                        <h1 class="view-main-title">Configuración del Sistema</h1>
                        <p class="view-main-sub">Preferencias de sonido, ambiente y opciones del usuario demo</p>
                    </div>
                </div>

                <div class="config-sections-grid">
                    <!-- Perfil Demo -->
                    <div class="config-card">
                        <h3>Perfil de Huésped / Administrador</h3>
                        <div class="user-meta-preview">
                            <div class="user-avatar-badge">${Components.icons.logoCrest(44)}</div>
                            <div>
                                <h4>${user.nombre || 'Huésped VIP Tulum'}</h4>
                                <p>${user.email || 'vip@karaoketulum.mx'}</p>
                                <span class="badge-mini badge-gold">${user.rol || 'Administrador Demo'}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Ajustes de Audio y Karaoke -->
                    <div class="config-card">
                        <h3>Audio y Micrófonos</h3>
                        <div class="config-setting-row">
                            <span>Efectos de sonido en interfaz</span>
                            <label class="switch">
                                <input type="checkbox" checked onchange="window.showToast('Configuración', 'Efectos de sonido actualizados.', 'info');">
                                <span class="slider round"></span>
                            </label>
                        </div>
                        <div class="config-setting-row">
                            <span>Modo Eco Sala Acústica</span>
                            <label class="switch">
                                <input type="checkbox" checked onchange="window.showToast('Audio Acústico', 'Efecto Reverb Tulum activado.', 'info');">
                                <span class="slider round"></span>
                            </label>
                        </div>
                    </div>

                    <!-- Restaurar Valores de Fábrica -->
                    <div class="config-card full-width">
                        <h3>Mantenimiento y Datos Locales</h3>
                        <p>Si deseas restablecer todas las canciones, reservas y bitácoras a su estado original de fábrica:</p>
                        <button class="btn-sm-danger-outline" onclick="window.router.restablecerFabrica();">
                            ${Components.icons.trash()} Restablecer Datos de Demostración
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    restablecerFabrica() {
        window.showModal({
            titulo: "Restablecer a Valores de Fábrica",
            contenidoHtml: "<p>Se reiniciarán todas las canciones, categorías, favoritos, reservas y bitácoras a los valores iniciales. ¿Deseas continuar?</p>",
            textoConfirmar: "Restablecer Todo",
            esPeligroso: true,
            onConfirm: () => {
                if (window.storage) {
                    window.storage.resetAll();
                }
                window.showToast("Sistema Reiniciado", "Datos restablecidos con éxito.", "success");
                this.navigate('inicio');
            }
        });
    }
}

window.router = new TulumRouter();
