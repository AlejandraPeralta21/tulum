/**
 * KARAOKE TULUM - Panel de Administración y Auditoría
 * Subpestañas: Dashboard KPIs, Canciones, Categorías, Reservas, Bitácoras.
 * Cero scroll con paginación integrada y modales para CRUD.
 */

class AdminPanel {
    constructor() {
        this.tabActiva = 'dashboard'; // 'dashboard', 'canciones', 'categorias', 'reservas', 'bitacoras'
        this.paginaCanciones = 1;
        this.porPaginaCanciones = 5;
        this.filtroCanciones = '';
        
        this.paginaReservas = 1;
        this.porPaginaReservas = 5;
        this.filtroEstadoReservas = 'TODOS';

        this.paginaBitacoras = 1;
        this.porPaginaBitacoras = 7;
        this.filtroBitacoras = { modulo: 'TODOS', accion: 'TODOS', busqueda: '' };
    }

    setTab(tab) {
        this.tabActiva = tab;
        if (window.registrarBitacora) {
            window.registrarBitacora("Navegación Admin", "Admin", `Se accedió a la pestaña "${tab}".`);
        }
        this.render();
    }

    render() {
        const $container = $('#adminViewContainer');
        if (!$container.length) return;

        let contentHtml = '';

        if (this.tabActiva === 'dashboard') {
            contentHtml = this.renderDashboard();
        } else if (this.tabActiva === 'canciones') {
            contentHtml = this.renderCanciones();
        } else if (this.tabActiva === 'categorias') {
            contentHtml = this.renderCategorias();
        } else if (this.tabActiva === 'reservas') {
            contentHtml = this.renderReservas();
        } else if (this.tabActiva === 'bitacoras') {
            contentHtml = this.renderBitacoras();
        }

        const html = `
            <div class="admin-wrapper">
                <!-- Barra de pestañas secundarias -->
                <div class="admin-tabs-nav">
                    <button class="admin-tab-btn ${this.tabActiva === 'dashboard' ? 'active' : ''}" onclick="window.adminPanel.setTab('dashboard');">
                        Dashboard KPIs
                    </button>
                    <button class="admin-tab-btn ${this.tabActiva === 'canciones' ? 'active' : ''}" onclick="window.adminPanel.setTab('canciones');">
                        Canciones (${window.songsManager ? window.songsManager.getAll().length : 0})
                    </button>
                    <button class="admin-tab-btn ${this.tabActiva === 'categorias' ? 'active' : ''}" onclick="window.adminPanel.setTab('categorias');">
                        Categorías (${window.categoriesManager ? window.categoriesManager.getAll().length : 0})
                    </button>
                    <button class="admin-tab-btn ${this.tabActiva === 'reservas' ? 'active' : ''}" onclick="window.adminPanel.setTab('reservas');">
                        Reservas (${window.reservationsManager ? window.reservationsManager.getAll().length : 0})
                    </button>
                    <button class="admin-tab-btn ${this.tabActiva === 'bitacoras' ? 'active' : ''}" onclick="window.adminPanel.setTab('bitacoras');">
                        Bitácoras de Actividad
                    </button>
                </div>

                <!-- Contenido de la pestaña activa -->
                <div class="admin-tab-content-area">
                    ${contentHtml}
                </div>
            </div>
        `;

        $container.html(html);
        if (window.lazyLoadManager) {
            window.lazyLoadManager.observeAll($container[0]);
        }
    }

    /* ==========================================================
       1. DASHBOARD KPIS
       ========================================================== */
    renderDashboard() {
        const totalCanciones = window.songsManager ? window.songsManager.getAll().length : 0;
        const reservas = window.reservationsManager ? window.reservationsManager.getAll() : [];
        const confirmadas = reservas.filter(r => r.estado === 'Confirmada').length;
        const canceladas = reservas.filter(r => r.estado === 'Cancelada').length;
        const tasaExito = reservas.length > 0 ? Math.round((confirmadas / reservas.length) * 100) : 100;
        const totalFavoritos = window.favoritesManager ? window.favoritesManager.getAllIds().length : 0;
        const logs = window.logsManager ? window.logsManager.obtenerTodos().slice(0, 5) : [];

        // Circunferencia r=28 -> 2 * PI * 28 = ~175.9
        const strokeDashOffset = 175.9 - (tasaExito / 100) * 175.9;

        const recentLogsRows = logs.map(l => `
            <div class="admin-recent-log-row">
                <span class="log-time">${l.fecha} ${l.hora}</span>
                <span class="badge-mini badge-${l.resultado.toLowerCase()}">${l.resultado}</span>
                <strong class="log-acc">${l.accion}</strong>
                <span class="log-desc">${l.descripcion}</span>
            </div>
        `).join('') || '<p class="empty-state-p">Sin actividad reciente registrada.</p>';

        return `
            <div class="admin-dashboard-grid">
                <!-- Métricas KPIs con Estilo de Telemetría AI -->
                <div class="kpi-card gold-border tulum-glass-card">
                    <div class="kpi-icon-wrap">${Components.icons.music()}</div>
                    <div class="kpi-data">
                        <span class="kpi-label">Pistas Masterizadas</span>
                        <h2 class="kpi-value">${totalCanciones}</h2>
                        <span class="kpi-sub-trend">↑ 100% Disponibles</span>
                    </div>
                </div>

                <div class="kpi-card blue-border tulum-glass-card">
                    <div class="kpi-icon-wrap">${Components.icons.calendar()}</div>
                    <div class="kpi-data">
                        <span class="kpi-label">Reservas Totales</span>
                        <h2 class="kpi-value">${reservas.length}</h2>
                        <span class="kpi-sub-trend">Salas Lounge Tulum</span>
                    </div>
                </div>

                <!-- KPI Circular SVG: Tasa de Confirmación -->
                <div class="kpi-card green-border tulum-glass-card kpi-card-circular">
                    <div class="kpi-circular-chart">
                        <svg width="68" height="68" viewBox="0 0 70 70">
                            <circle class="circle-bg" cx="35" cy="35" r="28" />
                            <circle class="circle-progress green-stroke" cx="35" cy="35" r="28" style="stroke-dashoffset: ${strokeDashOffset};" />
                        </svg>
                        <span class="chart-center-pct">${tasaExito}%</span>
                    </div>
                    <div class="kpi-data">
                        <span class="kpi-label">Efectividad Reservas</span>
                        <h2 class="kpi-value">${confirmadas} / ${reservas.length}</h2>
                        <span class="kpi-sub-trend text-green">${confirmadas} confirmadas</span>
                    </div>
                </div>

                <div class="kpi-card pink-border tulum-glass-card">
                    <div class="kpi-icon-wrap">${Components.icons.heart(true)}</div>
                    <div class="kpi-data">
                        <span class="kpi-label">Favoritos Guardados</span>
                        <h2 class="kpi-value">${totalFavoritos}</h2>
                        <span class="kpi-sub-trend">Índice de Popularidad</span>
                    </div>
                </div>

                <!-- Telemetría & Gráfico SVG de Actividad -->
                <div class="admin-telemetry-panel tulum-glass-card">
                    <div class="telemetry-header">
                        <div class="telem-title">
                            <span class="status-live-dot"></span>
                            <span>MONITOREO DE SISTEMA & ACTIVIDAD DEL LOUNGE VIP</span>
                        </div>
                        <div class="telem-chips">
                            <span class="telem-badge">NÚCLEO 2026 ONLINE</span>
                            <span class="telem-badge">LATENCIA: 0.1ms</span>
                        </div>
                    </div>
                    <!-- Mini Gráfico de Onda SVG -->
                    <div class="telem-sparkline-wrap">
                        <svg class="telem-sparkline" width="100%" height="45" viewBox="0 0 500 50" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="sparklineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stop-color="#C6A15B" stop-opacity="0.35"/>
                                    <stop offset="100%" stop-color="#07070B" stop-opacity="0"/>
                                </linearGradient>
                            </defs>
                            <path d="M0 35 Q50 15, 100 28 T200 12 T300 24 T400 8 T500 20 L500 50 L0 50 Z" fill="url(#sparklineGrad)"/>
                            <path d="M0 35 Q50 15, 100 28 T200 12 T300 24 T400 8 T500 20" fill="none" stroke="#C6A15B" stroke-width="2"/>
                        </svg>
                    </div>
                </div>

                <!-- Actividad Reciente -->
                <div class="admin-card-panel full-width tulum-glass-card">
                    <div class="panel-header-row">
                        <h3>Flujo de Auditoría en Tiempo Real (Bitácoras)</h3>
                        <button class="btn-sm-gold-outline" onclick="window.adminPanel.setTab('bitacoras');">
                            Ver Auditoría Completa
                        </button>
                    </div>
                    <div class="recent-logs-list">
                        ${recentLogsRows}
                    </div>
                </div>
            </div>
        `;
    }

    /* ==========================================================
       2. GESTIÓN DE CANCIONES
       ========================================================== */
    renderCanciones() {
        const songs = window.songsManager ? window.songsManager.getAll() : [];
        let filtered = songs;

        if (this.filtroCanciones) {
            const q = this.filtroCanciones.toLowerCase();
            filtered = songs.filter(s => s.titulo.toLowerCase().includes(q) || s.artista.toLowerCase().includes(q) || s.categoria.toLowerCase().includes(q));
        }

        const totalItems = filtered.length;
        const totalPaginas = Math.max(1, Math.ceil(totalItems / this.porPaginaCanciones));
        this.paginaCanciones = Math.min(Math.max(1, this.paginaCanciones), totalPaginas);
        const inicio = (this.paginaCanciones - 1) * this.porPaginaCanciones;
        const paginados = filtered.slice(inicio, inicio + this.porPaginaCanciones);

        const rows = paginados.map(s => `
            <tr>
                <td>
                    <img src="${s.imagen}" class="admin-table-thumb" alt="${s.titulo}" onerror="this.src=window.lazyLoadManager.fallbackSvg;">
                </td>
                <td><strong>${s.titulo}</strong></td>
                <td>${s.artista}</td>
                <td><span class="badge-genre">${s.categoria}</span></td>
                <td>${s.duracion}</td>
                <td>${s.popularidad}%</td>
                <td>
                    <div class="table-actions-cell">
                        <button class="btn-tbl-action" onclick="window.adminPanel.abrirModalEditarCancion(${s.id});" title="Editar">
                            ${Components.icons.edit()}
                        </button>
                        <button class="btn-tbl-action danger" onclick="window.adminPanel.eliminarCancion(${s.id});" title="Eliminar">
                            ${Components.icons.trash()}
                        </button>
                    </div>
                </td>
            </tr>
        `).join('') || `<tr><td colspan="7" class="text-center p-3">No se encontraron canciones.</td></tr>`;

        return `
            <div class="admin-crud-container">
                <div class="crud-toolbar">
                    <div class="search-input-wrap">
                        ${Components.icons.search()}
                        <input type="text" class="tulum-input" placeholder="Buscar canción, artista o género..." value="${this.filtroCanciones}" oninput="window.adminPanel.filtrarCanciones(this.value);" />
                    </div>
                    <button class="btn-gold" onclick="window.adminPanel.abrirModalNuevaCancion();">
                        ${Components.icons.plus()} Agregar Canción
                    </button>
                </div>

                <div class="admin-table-responsive">
                    <table class="tulum-table">
                        <thead>
                            <tr>
                                <th>Portada</th>
                                <th>Título</th>
                                <th>Artista</th>
                                <th>Categoría</th>
                                <th>Duración</th>
                                <th>Popularidad</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rows}
                        </tbody>
                    </table>
                </div>

                ${Components.pagination({
                    paginaActual: this.paginaCanciones,
                    totalPaginas: totalPaginas,
                    onPageCallName: 'window.adminPanel.cambiarPaginaCanciones'
                })}
            </div>
        `;
    }

    filtrarCanciones(valor) {
        this.filtroCanciones = valor;
        this.paginaCanciones = 1;
        this.render();
    }

    cambiarPaginaCanciones(p) {
        this.paginaCanciones = p;
        this.render();
    }

    abrirModalNuevaCancion() {
        const cats = window.categoriesManager ? window.categoriesManager.getAll() : [];
        const catOptions = cats.map(c => `<option value="${c.nombre}">${c.nombre}</option>`).join('');

        const formHtml = `
            <form id="formNuevaCancion" class="admin-form-grid" onsubmit="event.preventDefault(); window.adminPanel.guardarNuevaCancion();">
                <div class="form-group">
                    <label>Título de la Canción *</label>
                    <input type="text" id="addSongTitulo" class="tulum-input" required placeholder="Ej. La Bikina" />
                </div>
                <div class="form-group">
                    <label>Artista *</label>
                    <input type="text" id="addSongArtista" class="tulum-input" required placeholder="Ej. Luis Miguel" />
                </div>
                <div class="form-group">
                    <label>Género / Estilo *</label>
                    <input type="text" id="addSongGenero" class="tulum-input" required placeholder="Ej. Mariachi / Pop" />
                </div>
                <div class="form-group">
                    <label>Categoría *</label>
                    <select id="addSongCategoria" class="tulum-select" required>
                        ${catOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label>Año de Lanzamiento</label>
                    <input type="number" id="addSongAnio" class="tulum-input" placeholder="Ej. 1999" value="2000" />
                </div>
                <div class="form-group">
                    <label>Duración (mm:ss) *</label>
                    <input type="text" id="addSongDuracion" class="tulum-input" required placeholder="3:45" value="3:45" />
                </div>
                <div class="form-group">
                    <label>Popularidad (1 - 100)</label>
                    <input type="number" id="addSongPopularidad" class="tulum-input" min="1" max="100" value="90" />
                </div>
                <div class="form-group">
                    <label>Modalidad</label>
                    <div style="display:flex; align-items:center; gap:8px; margin-top:10px;">
                        <input type="checkbox" id="addSongEsDueto" style="width:18px; height:18px; accent-color: var(--color-gold-champagne);" />
                        <label for="addSongEsDueto" style="margin:0; cursor:pointer;">¿Es Dueto?</label>
                    </div>
                </div>
                <div class="form-group full-width">
                    <label>Descripción Original del Tema (Estilo, emoción, ambiente para cantar) *</label>
                    <textarea id="addSongDescripcion" class="tulum-textarea" rows="2" placeholder="Describe el estilo musical y el sentimiento que transmite al interpretarla..." required></textarea>
                </div>
                <div class="form-group full-width">
                    <label>URL de Imagen Individual *</label>
                    <input type="url" id="addSongImagen" class="tulum-input" required value="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80" oninput="$('#addSongImgPreview').attr('src', this.value);" />
                    <div class="img-preview-box">
                        <img id="addSongImgPreview" src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80" alt="Vista previa">
                    </div>
                </div>
                <div class="form-group full-width">
                    <label>Letra para Karaoke (1 línea por estrofa)</label>
                    <textarea id="addSongLetra" class="tulum-textarea" rows="3" placeholder="Ingresa los versos de la canción..."></textarea>
                </div>
            </form>
        `;

        window.showModal({
            titulo: "Agregar Nueva Canción al Catálogo",
            contenidoHtml: formHtml,
            textoConfirmar: "Guardar Canción",
            onConfirm: () => {
                this.guardarNuevaCancion();
            }
        });
    }

    guardarNuevaCancion() {
        const titulo = $('#addSongTitulo').val();
        const artista = $('#addSongArtista').val();
        const genero = $('#addSongGenero').val();
        const categoria = $('#addSongCategoria').val();
        const anio = parseInt($('#addSongAnio').val(), 10) || new Date().getFullYear();
        const duracion = $('#addSongDuracion').val();
        const popularidad = parseInt($('#addSongPopularidad').val(), 10) || 85;
        const esDueto = $('#addSongEsDueto').is(':checked');
        const descripcion = $('#addSongDescripcion').val();
        const imagen = $('#addSongImagen').val();
        const letra = $('#addSongLetra').val();

        if (!titulo || !artista) {
            window.showToast("Error", "Título y Artista son obligatorios.", "error");
            return;
        }

        window.songsManager.add({
            titulo,
            artista,
            genero,
            categoria,
            anio,
            duracion,
            popularidad,
            esDueto,
            descripcion: descripcion || `Interpretación icónica de ${artista} para disfrutar en Karaoke Tulum.`,
            imagen,
            letra
        });

        window.showToast("Éxito", `Canción "${titulo}" guardada correctamente.`, "success");
        this.render();
    }

    abrirModalEditarCancion(id) {
        const song = window.songsManager.getById(id);
        if (!song) return;

        const cats = window.categoriesManager ? window.categoriesManager.getAll() : [];
        const catOptions = cats.map(c => `
            <option value="${c.nombre}" ${c.nombre === song.categoria ? 'selected' : ''}>${c.nombre}</option>
        `).join('');

        const lyricsText = Array.isArray(song.letra) ? song.letra.join('\n') : (song.letra || '');

        const formHtml = `
            <form id="formEditarCancion" class="admin-form-grid">
                <div class="form-group">
                    <label>Título de la Canción *</label>
                    <input type="text" id="editSongTitulo" class="tulum-input" value="${song.titulo}" required />
                </div>
                <div class="form-group">
                    <label>Artista *</label>
                    <input type="text" id="editSongArtista" class="tulum-input" value="${song.artista}" required />
                </div>
                <div class="form-group">
                    <label>Género *</label>
                    <input type="text" id="editSongGenero" class="tulum-input" value="${song.genero}" required />
                </div>
                <div class="form-group">
                    <label>Categoría *</label>
                    <select id="editSongCategoria" class="tulum-select" required>
                        ${catOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label>Año de Lanzamiento</label>
                    <input type="number" id="editSongAnio" class="tulum-input" value="${song.anio || 2000}" />
                </div>
                <div class="form-group">
                    <label>Duración *</label>
                    <input type="text" id="editSongDuracion" class="tulum-input" value="${song.duracion}" required />
                </div>
                <div class="form-group">
                    <label>Popularidad (1 - 100)</label>
                    <input type="number" id="editSongPopularidad" class="tulum-input" min="1" max="100" value="${song.popularidad}" />
                </div>
                <div class="form-group">
                    <label>Modalidad</label>
                    <div style="display:flex; align-items:center; gap:8px; margin-top:10px;">
                        <input type="checkbox" id="editSongEsDueto" ${song.esDueto ? 'checked' : ''} style="width:18px; height:18px; accent-color: var(--color-gold-champagne);" />
                        <label for="editSongEsDueto" style="margin:0; cursor:pointer;">¿Es Dueto?</label>
                    </div>
                </div>
                <div class="form-group full-width">
                    <label>Descripción Original del Tema *</label>
                    <textarea id="editSongDescripcion" class="tulum-textarea" rows="2" required>${song.descripcion || ''}</textarea>
                </div>
                <div class="form-group full-width">
                    <label>URL de Imagen *</label>
                    <input type="url" id="editSongImagen" class="tulum-input" value="${song.imagen}" required oninput="$('#editSongImgPreview').attr('src', this.value);" />
                    <div class="img-preview-box">
                        <img id="editSongImgPreview" src="${song.imagen}" alt="Vista previa">
                    </div>
                </div>
                <div class="form-group full-width">
                    <label>Letra para Karaoke (1 línea por estrofa)</label>
                    <textarea id="editSongLetra" class="tulum-textarea" rows="3">${lyricsText}</textarea>
                </div>
            </form>
        `;

        window.showModal({
            titulo: `Editar Canción #${song.id}`,
            contenidoHtml: formHtml,
            textoConfirmar: "Actualizar Canción",
            onConfirm: () => {
                const updated = {
                    titulo: $('#editSongTitulo').val(),
                    artista: $('#editSongArtista').val(),
                    genero: $('#editSongGenero').val(),
                    categoria: $('#editSongCategoria').val(),
                    anio: parseInt($('#editSongAnio').val(), 10) || song.anio || 2000,
                    duracion: $('#editSongDuracion').val(),
                    popularidad: Number($('#editSongPopularidad').val()),
                    esDueto: $('#editSongEsDueto').is(':checked'),
                    descripcion: $('#editSongDescripcion').val(),
                    imagen: $('#editSongImagen').val(),
                    letra: $('#editSongLetra').val().split('\n')
                };
                window.songsManager.update(id, updated);
                window.showToast("Actualizada", `Canción "${updated.titulo}" actualizada.`, "success");
                this.render();
            }
        });
    }

    eliminarCancion(id) {
        const song = window.songsManager.getById(id);
        if (!song) return;

        window.showModal({
            titulo: "Confirmar Eliminación",
            contenidoHtml: `<p>¿Estás seguro de eliminar la canción <strong>"${song.titulo}"</strong> de ${song.artista}? Esta acción no se puede deshacer.</p>`,
            textoConfirmar: "Eliminar definitivamente",
            esPeligroso: true,
            onConfirm: () => {
                window.songsManager.delete(id);
                window.showToast("Eliminada", "Canción eliminada del catálogo.", "info");
                this.render();
            }
        });
    }

    /* ==========================================================
       3. GESTIÓN DE CATEGORÍAS
       ========================================================== */
    renderCategorias() {
        const cats = window.categoriesManager ? window.categoriesManager.getAll() : [];

        const rows = cats.map(c => `
            <tr>
                <td>
                    <img src="${c.imagen}" class="admin-table-thumb" alt="${c.nombre}" onerror="this.src=window.lazyLoadManager.fallbackSvg;">
                </td>
                <td><strong>${c.nombre}</strong></td>
                <td>${c.descripcion}</td>
                <td><span class="badge-mini" style="background:${c.color}; color:#fff;">${c.color}</span></td>
                <td><small>${(c.subcategorias || []).join(', ')}</small></td>
                <td>
                    <div class="table-actions-cell">
                        <button class="btn-tbl-action" onclick="window.adminPanel.abrirModalEditarCategoria('${c.id}');" title="Editar">
                            ${Components.icons.edit()}
                        </button>
                        <button class="btn-tbl-action danger" onclick="window.adminPanel.eliminarCategoria('${c.id}');" title="Eliminar">
                            ${Components.icons.trash()}
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        return `
            <div class="admin-crud-container">
                <div class="crud-toolbar">
                    <h3>Categorías y Subcategorías del Karaoke</h3>
                    <button class="btn-gold" onclick="window.adminPanel.abrirModalNuevaCategoria();">
                        ${Components.icons.plus()} Crear Categoría
                    </button>
                </div>

                <div class="admin-table-responsive">
                    <table class="tulum-table">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Color Neón</th>
                                <th>Subcategorías</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rows}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    abrirModalNuevaCategoria() {
        const formHtml = `
            <form id="formNuevaCat" class="admin-form-grid">
                <div class="form-group">
                    <label>Nombre de la Categoría *</label>
                    <input type="text" id="addCatNombre" class="tulum-input" required placeholder="Ej. Regional Mexicano" />
                </div>
                <div class="form-group">
                    <label>Color Neón (Hex) *</label>
                    <input type="color" id="addCatColor" class="tulum-input" value="#D8B978" />
                </div>
                <div class="form-group full-width">
                    <label>Descripción *</label>
                    <input type="text" id="addCatDesc" class="tulum-input" required placeholder="Ej. Los grandes clásicos norteños y rancheros" />
                </div>
                <div class="form-group full-width">
                    <label>Subcategorías (separadas por comas) *</label>
                    <input type="text" id="addCatSubs" class="tulum-input" required placeholder="Banda, Mariachi, Norteño, Corridos" />
                </div>
                <div class="form-group full-width">
                    <label>URL de Imagen *</label>
                    <input type="url" id="addCatImagen" class="tulum-input" required value="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80" />
                </div>
            </form>
        `;

        window.showModal({
            titulo: "Crear Nueva Categoría Musical",
            contenidoHtml: formHtml,
            textoConfirmar: "Crear Categoría",
            onConfirm: () => {
                const nombre = $('#addCatNombre').val();
                if (!nombre) return;
                window.categoriesManager.add({
                    nombre,
                    color: $('#addCatColor').val(),
                    descripcion: $('#addCatDesc').val(),
                    subcategorias: $('#addCatSubs').val(),
                    imagen: $('#addCatImagen').val()
                });
                window.showToast("Categoría Creada", `Categoría "${nombre}" agregada.`, "success");
                this.render();
            }
        });
    }

    abrirModalEditarCategoria(id) {
        const cat = window.categoriesManager.getById(id);
        if (!cat) return;

        const subs = (cat.subcategorias || []).join(', ');

        const formHtml = `
            <form id="formEditCat" class="admin-form-grid">
                <div class="form-group">
                    <label>Nombre de la Categoría *</label>
                    <input type="text" id="editCatNombre" class="tulum-input" value="${cat.nombre}" required />
                </div>
                <div class="form-group">
                    <label>Color Neón (Hex) *</label>
                    <input type="color" id="editCatColor" class="tulum-input" value="${cat.color}" />
                </div>
                <div class="form-group full-width">
                    <label>Descripción *</label>
                    <input type="text" id="editCatDesc" class="tulum-input" value="${cat.descripcion}" required />
                </div>
                <div class="form-group full-width">
                    <label>Subcategorías (separadas por comas) *</label>
                    <input type="text" id="editCatSubs" class="tulum-input" value="${subs}" required />
                </div>
                <div class="form-group full-width">
                    <label>URL de Imagen *</label>
                    <input type="url" id="editCatImagen" class="tulum-input" value="${cat.imagen}" required />
                </div>
            </form>
        `;

        window.showModal({
            titulo: `Editar Categoría: ${cat.nombre}`,
            contenidoHtml: formHtml,
            textoConfirmar: "Actualizar",
            onConfirm: () => {
                window.categoriesManager.update(id, {
                    nombre: $('#editCatNombre').val(),
                    color: $('#editCatColor').val(),
                    descripcion: $('#editCatDesc').val(),
                    subcategorias: $('#editCatSubs').val().split(',').map(s => s.trim()),
                    imagen: $('#editCatImagen').val()
                });
                window.showToast("Categoría Actualizada", "Cambios guardados con éxito.", "success");
                this.render();
            }
        });
    }

    eliminarCategoria(id) {
        const cat = window.categoriesManager.getById(id);
        if (!cat) return;

        window.showModal({
            titulo: "Eliminar Categoría",
            contenidoHtml: `<p>¿Deseas eliminar la categoría <strong>"${cat.nombre}"</strong>?</p>`,
            textoConfirmar: "Eliminar",
            esPeligroso: true,
            onConfirm: () => {
                window.categoriesManager.delete(id);
                window.showToast("Eliminada", "Categoría eliminada.", "info");
                this.render();
            }
        });
    }

    /* ==========================================================
       4. GESTIÓN DE RESERVAS
       ========================================================== */
    renderReservas() {
        const reservas = window.reservationsManager ? window.reservationsManager.getAll() : [];
        let filtered = reservas;

        if (this.filtroEstadoReservas !== 'TODOS') {
            filtered = reservas.filter(r => r.estado === this.filtroEstadoReservas);
        }

        const totalItems = filtered.length;
        const totalPaginas = Math.max(1, Math.ceil(totalItems / this.porPaginaReservas));
        this.paginaReservas = Math.min(Math.max(1, this.paginaReservas), totalPaginas);
        const inicio = (this.paginaReservas - 1) * this.porPaginaReservas;
        const paginados = filtered.slice(inicio, inicio + this.porPaginaReservas);

        const rows = paginados.map(r => `
            <tr>
                <td><strong>${r.codigo}</strong></td>
                <td>${r.nombre}</td>
                <td>${r.telefono}</td>
                <td>${r.fecha} · ${r.hora}</td>
                <td><span class="badge-genre">${r.sala}</span></td>
                <td>${r.personas} pers.</td>
                <td>
                    <span class="badge-status ${r.estado.toLowerCase()}">${r.estado}</span>
                </td>
                <td>
                    <div class="table-actions-cell">
                        <button class="btn-tbl-action" onclick="window.adminPanel.verDetalleReserva('${r.id}');" title="Ver Detalle">
                            ${Components.icons.search()}
                        </button>
                        ${r.estado !== 'Confirmada' ? `
                            <button class="btn-tbl-action check-btn" onclick="window.reservationsManager.cambiarEstado('${r.id}', 'Confirmada'); window.adminPanel.render();" title="Confirmar">
                                ${Components.icons.check()}
                            </button>
                        ` : ''}
                        ${r.estado !== 'Cancelada' ? `
                            <button class="btn-tbl-action danger" onclick="window.reservationsManager.cambiarEstado('${r.id}', 'Cancelada'); window.adminPanel.render();" title="Cancelar">
                                ${Components.icons.close()}
                            </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `).join('') || `<tr><td colspan="8" class="text-center p-3">No hay reservas en este estado.</td></tr>`;

        return `
            <div class="admin-crud-container">
                <div class="crud-toolbar">
                    <div class="filter-pills-row">
                        <button class="pill-btn ${this.filtroEstadoReservas === 'TODOS' ? 'active' : ''}" onclick="window.adminPanel.filtrarEstadoReservas('TODOS');">
                            Todas (${reservas.length})
                        </button>
                        <button class="pill-btn ${this.filtroEstadoReservas === 'Confirmada' ? 'active' : ''}" onclick="window.adminPanel.filtrarEstadoReservas('Confirmada');">
                            Confirmadas
                        </button>
                        <button class="pill-btn ${this.filtroEstadoReservas === 'Cancelada' ? 'active' : ''}" onclick="window.adminPanel.filtrarEstadoReservas('Cancelada');">
                            Canceladas
                        </button>
                    </div>
                </div>

                <div class="admin-table-responsive">
                    <table class="tulum-table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Cliente</th>
                                <th>Teléfono</th>
                                <th>Fecha & Hora</th>
                                <th>Ambiente/Sala</th>
                                <th>Personas</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rows}
                        </tbody>
                    </table>
                </div>

                ${Components.pagination({
                    paginaActual: this.paginaReservas,
                    totalPaginas: totalPaginas,
                    onPageCallName: 'window.adminPanel.cambiarPaginaReservas'
                })}
            </div>
        `;
    }

    filtrarEstadoReservas(st) {
        this.filtroEstadoReservas = st;
        this.paginaReservas = 1;
        this.render();
    }

    cambiarPaginaReservas(p) {
        this.paginaReservas = p;
        this.render();
    }

    verDetalleReserva(id) {
        const res = window.reservationsManager.getById(id);
        if (!res) return;

        const content = `
            <div class="reserva-detail-modal-box">
                <div class="detail-row"><strong>Código:</strong> <span>${res.codigo}</span></div>
                <div class="detail-row"><strong>Huésped:</strong> <span>${res.nombre}</span></div>
                <div class="detail-row"><strong>Teléfono:</strong> <span>${res.telefono}</span></div>
                <div class="detail-row"><strong>Fecha:</strong> <span>${res.fecha}</span></div>
                <div class="detail-row"><strong>Hora:</strong> <span>${res.hora} hrs</span></div>
                <div class="detail-row"><strong>Sala / Ambiente:</strong> <span>${res.sala}</span></div>
                <div class="detail-row"><strong>Invitados:</strong> <span>${res.personas} personas</span></div>
                <div class="detail-row"><strong>Estado Actual:</strong> <span class="badge-status ${res.estado.toLowerCase()}">${res.estado}</span></div>
                <div class="detail-row full"><strong>Observaciones:</strong> <span>${res.observaciones || 'Ninguna'}</span></div>
            </div>
        `;

        window.showModal({
            titulo: `Detalle de Reserva ${res.codigo}`,
            contenidoHtml: content,
            textoConfirmar: "Cerrar"
        });
    }

    /* ==========================================================
       5. GESTIÓN DE BITÁCORAS DE AUDITORÍA
       ========================================================== */
    renderBitacoras() {
        const allLogs = window.logsManager ? window.logsManager.filtrar(this.filtroBitacoras) : [];
        const totalItems = allLogs.length;
        const totalPaginas = Math.max(1, Math.ceil(totalItems / this.porPaginaBitacoras));
        this.paginaBitacoras = Math.min(Math.max(1, this.paginaBitacoras), totalPaginas);
        const inicio = (this.paginaBitacoras - 1) * this.porPaginaBitacoras;
        const paginados = allLogs.slice(inicio, inicio + this.porPaginaBitacoras);

        const rows = paginados.map(l => `
            <tr>
                <td><small>${l.fecha} ${l.hora}</small></td>
                <td><strong>${l.usuario}</strong></td>
                <td><span class="badge-genre">${l.modulo}</span></td>
                <td><strong>${l.accion}</strong></td>
                <td><span class="log-desc-text" title="${l.descripcion}">${l.descripcion}</span></td>
                <td><span class="badge-mini badge-${l.resultado.toLowerCase()}">${l.resultado}</span></td>
            </tr>
        `).join('') || `<tr><td colspan="6" class="text-center p-3">No hay registros de bitácoras.</td></tr>`;

        return `
            <div class="admin-crud-container">
                <div class="crud-toolbar audit-toolbar">
                    <div class="search-input-wrap">
                        ${Components.icons.search()}
                        <input type="text" class="tulum-input" placeholder="Buscar en bitácoras..." value="${this.filtroBitacoras.busqueda}" oninput="window.adminPanel.filtrarBitacorasTexto(this.value);" />
                    </div>
                    <select class="tulum-select" onchange="window.adminPanel.filtrarBitacorasModulo(this.value);">
                        <option value="TODOS" ${this.filtroBitacoras.modulo === 'TODOS' ? 'selected' : ''}>Todos los Módulos</option>
                        <option value="Reservas" ${this.filtroBitacoras.modulo === 'Reservas' ? 'selected' : ''}>Reservas</option>
                        <option value="Canciones" ${this.filtroBitacoras.modulo === 'Canciones' ? 'selected' : ''}>Canciones</option>
                        <option value="Favoritos" ${this.filtroBitacoras.modulo === 'Favoritos' ? 'selected' : ''}>Favoritos</option>
                        <option value="Admin" ${this.filtroBitacoras.modulo === 'Admin' ? 'selected' : ''}>Admin</option>
                        <option value="Sistema" ${this.filtroBitacoras.modulo === 'Sistema' ? 'selected' : ''}>Sistema</option>
                    </select>
                    <button class="btn-sm-danger-outline" onclick="window.adminPanel.vaciarBitacoras();">
                        ${Components.icons.trash()} Vaciar Bitácora
                    </button>
                </div>

                <div class="admin-table-responsive">
                    <table class="tulum-table">
                        <thead>
                            <tr>
                                <th>Fecha & Hora</th>
                                <th>Usuario</th>
                                <th>Módulo</th>
                                <th>Acción</th>
                                <th>Descripción</th>
                                <th>Resultado</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rows}
                        </tbody>
                    </table>
                </div>

                ${Components.pagination({
                    paginaActual: this.paginaBitacoras,
                    totalPaginas: totalPaginas,
                    onPageCallName: 'window.adminPanel.cambiarPaginaBitacoras'
                })}
            </div>
        `;
    }

    filtrarBitacorasTexto(val) {
        this.filtroBitacoras.busqueda = val;
        this.paginaBitacoras = 1;
        this.render();
    }

    filtrarBitacorasModulo(mod) {
        this.filtroBitacoras.modulo = mod;
        this.paginaBitacoras = 1;
        this.render();
    }

    cambiarPaginaBitacoras(p) {
        this.paginaBitacoras = p;
        this.render();
    }

    vaciarBitacoras() {
        window.showModal({
            titulo: "Vaciar Bitácoras de Auditoría",
            contenidoHtml: "<p>¿Estás seguro de restablecer el registro de bitácoras? Se mantendrá únicamente una entrada de reinicio.</p>",
            textoConfirmar: "Vaciar Todo",
            esPeligroso: true,
            onConfirm: () => {
                window.logsManager.vaciar();
                window.showToast("Bitácora Limpia", "El registro de eventos ha sido reiniciado.", "info");
                this.render();
            }
        });
    }
}

window.adminPanel = new AdminPanel();
