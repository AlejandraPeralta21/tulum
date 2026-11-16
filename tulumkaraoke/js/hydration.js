/**
 * KARAOKE TULUM - Sistema de Hidratación Progresiva del HTML (hydration.js)
 * Transforma la estructura HTML inicial en componentes completamente interactivos,
 * conectando eventos, restaurando estados desde LocalStorage y asegurando idempotencia.
 */

class HydrationManager {
    constructor() {
        this.hydratedComponents = new Set();
        this.hydrationPhase = 0; // 0: Inicial, 1: Shell, 2: Nav, 3: Active View, 4: Lazy/Dynamic
        this.listenersAttached = new Set();
        this.statusIndicator = null;
    }

    /**
     * Inicializa el proceso global de hidratación progresiva
     */
    init() {
        console.log('[KARAOKE TULUM] Protocolo de hidratación progresiva activo...');
        this.statusIndicator = document.getElementById('hydrationStatusBadge');
        this.updateStatus('Cargando Karaoke Tulum...', 15);

        // Fase 1: Hidratación del Shell Principal
        this.hydrateShell();

        // Fase 2: Header y Navegación
        setTimeout(() => {
            this.updateStatus('Conectando navegación y controles...', 45);
            this.hydrateNavigation();
        }, 120);

        // Fase 3: Vista Activa y Componentes Dinámicos
        setTimeout(() => {
            this.updateStatus('Sincronizando catálogo y salas VIP...', 85);
            this.hydrateActiveView();
            
            // Fase 4: Finalización y estado en línea
            setTimeout(() => {
                this.updateStatus('Karaoke Lounge en línea', 100);
                this.markAppReady();
            }, 200);
        }, 300);
    }

    updateStatus(message, percentage) {
        if (!this.statusIndicator) {
            this.statusIndicator = document.getElementById('hydrationStatusBadge');
        }
        if (this.statusIndicator) {
            const label = this.statusIndicator.querySelector('.status-text');
            const bar = this.statusIndicator.querySelector('.status-progress-fill');
            if (label) label.textContent = message;
            if (bar) bar.style.width = `${percentage}%`;
        }
    }

    markAppReady() {
        const app = document.querySelector('.app-container');
        if (app) {
            app.setAttribute('data-hydration', 'ready');
            app.classList.add('hydrated-ready');
        }
        setTimeout(() => {
            if (this.statusIndicator) {
                this.statusIndicator.classList.add('fade-out');
            }
        }, 800);
    }

    /**
     * Hidrata un componente específico si no ha sido hidratado previamente
     */
    hydrateComponent(element) {
        if (!element) return false;
        
        const componentName = element.dataset.component || element.id || 'anonymous';
        if (element.dataset.hydrated === 'true') {
            return false; // Idempotencia garantizada
        }

        try {
            switch (componentName) {
                case 'app-header':
                    this.bindHeaderEvents(element);
                    break;
                case 'sidebar-drawer':
                    this.bindSidebarEvents(element);
                    break;
                case 'bottom-nav':
                    this.bindBottomNavEvents(element);
                    break;
                case 'tulum-ai-assistant':
                    this.bindAssistantEvents(element);
                    break;
                case 'music-visualizer':
                    this.initMusicVisualizer(element);
                    break;
                case 'karaoke-player':
                    this.bindPlayerEvents(element);
                    break;
                case 'app-content':
                    this.hydrateDynamicContent(element);
                    break;
                default:
                    // Inicialización genérica
                    break;
            }

            element.dataset.hydrated = 'true';
            element.removeAttribute('data-hydration');
            this.hydratedComponents.add(componentName);
            return true;
        } catch (error) {
            console.error(`[TULUM HYDRATION] Error al hidratar componente "${componentName}":`, error);
            if (window.showToast) {
                window.showToast("Alerta del Sistema", `Componente ${componentName} inicializado en modo seguro.`, "warning", 3000);
            }
            return false;
        }
    }

    /**
     * Hidrata contenidos inyectados dinámicamente (por ejemplo al cambiar de vista)
     */
    hydrateDynamicContent(container = document.getElementById('appContentArea')) {
        if (!container) return;

        // Hidratar elementos con data-component pendientes
        const pendingElements = container.querySelectorAll('[data-hydration="pending"], [data-component]:not([data-hydrated="true"])');
        pendingElements.forEach(el => this.hydrateComponent(el));

        // Activar observadores de Lazy Loading en imágenes nuevas
        if (window.lazyLoadManager) {
            window.lazyLoadManager.observeAll(container);
        }

        // Inicializar visualizadores de sonido si existen en la vista
        const visualizer = container.querySelector('#centralMusicVisualizer');
        if (visualizer && visualizer.dataset.hydrated !== 'true') {
            this.initMusicVisualizer(visualizer);
        }

        // Inicializar sliders y controles especiales
        container.dataset.hydrated = 'true';
    }

    hydrateShell() {
        const shell = document.querySelector('.app-container');
        if (shell) {
            this.hydrateComponent(shell);
        }
    }

    hydrateNavigation() {
        const header = document.querySelector('[data-component="app-header"]');
        const sidebar = document.querySelector('[data-component="sidebar-drawer"]');
        const bottomNav = document.querySelector('[data-component="bottom-nav"]');

        if (header) this.hydrateComponent(header);
        if (sidebar) this.hydrateComponent(sidebar);
        if (bottomNav) this.hydrateComponent(bottomNav);
    }

    hydrateAssistant() {
        const assistant = document.querySelector('[data-component="tulum-ai-assistant"]');
        if (assistant) {
            this.hydrateComponent(assistant);
        }
    }

    hydrateActiveView() {
        if (window.router) {
            window.router.handleHashChange();
        }
        const content = document.getElementById('appContentArea');
        if (content) {
            this.hydrateDynamicContent(content);
        }
    }

    /* ==========================================================
       CONEXIÓN DE EVENTOS SEGURA E IDEMPOTENTE
       ========================================================== */
    bindHeaderEvents(header) {
        if (this.listenersAttached.has('header')) return;
        this.listenersAttached.add('header');

        const $h = $(header);
        $h.on('click', '#btnHamburgerMenu', (e) => {
            e.stopPropagation();
            if (window.router) window.router.openSidebar();
        });
    }

    bindSidebarEvents(sidebar) {
        if (this.listenersAttached.has('sidebar')) return;
        this.listenersAttached.add('sidebar');

        const $sb = $(sidebar);
        $sb.on('click', '#btnSidebarClose, #drawerOverlay', () => {
            if (window.router) window.router.closeSidebar();
        });

        $sb.on('click', '.sidebar-nav-item', function(e) {
            e.preventDefault();
            const route = $(this).attr('data-route');
            if (route && window.router) {
                window.router.navigate(route);
            }
        });
    }

    bindBottomNavEvents(bottomNav) {
        if (this.listenersAttached.has('bottomNav')) return;
        this.listenersAttached.add('bottomNav');

        $(bottomNav).on('click', '.bottom-nav-item', function(e) {
            e.preventDefault();
            const route = $(this).attr('data-route');
            if (route && window.router) {
                window.router.navigate(route);
            }
        });
    }

    bindAssistantEvents(assistantEl) {
        // Soporte de compatibilidad segura
        if (window.tulumAiAssistant) {
            window.tulumAiAssistant.init(assistantEl);
        }
    }

    toggleAiAssistantModal(open = true) {
        if (window.tulumAiAssistant) {
            if (open) window.tulumAiAssistant.open();
            else window.tulumAiAssistant.close();
        }
    }

    initMusicVisualizer(container) {
        if (!container) return;
        container.dataset.hydrated = 'true';

        // Generar barras dinámicas de frecuencia si no están generadas
        let $barsWrap = $(container).find('.visualizer-frequencies');
        if (!$barsWrap.length) {
            $barsWrap = $('<div class="visualizer-frequencies"></div>');
            $(container).append($barsWrap);
        }

        if ($barsWrap.children().length === 0) {
            const barCount = 28;
            for (let i = 0; i < barCount; i++) {
                const height = Math.floor(15 + Math.random() * 85);
                const delay = (i * 0.05).toFixed(2);
                const $bar = $(`<span class="freq-bar" style="--initial-h: ${height}%; animation-delay: ${delay}s;"></span>`);
                $barsWrap.append($bar);
            }
        }
    }

    bindPlayerEvents(playerModal) {
        // Enlazar eventos del reproductor si son necesarios
    }

    destroyComponent(element) {
        if (!element) return;
        element.dataset.hydrated = 'false';
        const componentName = element.dataset.component;
        if (componentName) {
            this.hydratedComponents.delete(componentName);
        }
    }
}

// Instancia global del Gestor de Hidratación
window.hydrationManager = new HydrationManager();
window.hydrateApp = () => window.hydrationManager.init();
window.hydrateComponent = (el) => window.hydrationManager.hydrateComponent(el);
window.hydrateDynamicContent = (c) => window.hydrationManager.hydrateDynamicContent(c);
