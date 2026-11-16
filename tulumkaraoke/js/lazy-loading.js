/**
 * KARAOKE TULUM - Sistema de Lazy Loading Profesional
 * Utiliza IntersectionObserver nativo, placeholders elegantes y gestión de errores de carga.
 */

class LazyLoadManager {
    constructor() {
        this.observer = null;
        this.fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="100%" height="100%" fill="%2311111A"/><circle cx="150" cy="150" r="70" fill="%239B5CFF" opacity="0.2"/><path d="M150 100 v60 M140 140 h20" stroke="%23D8B978" stroke-width="4" stroke-linecap="round"/><text x="150" y="210" fill="%23D8B978" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">KARAOKE TULUM</text></svg>`;
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.cargarImagen(entry.target);
                        obs.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                rootMargin: '40px 0px 40px 0px',
                threshold: 0.05
            });
        }
    }

    /**
     * Observa todas las imágenes con el atributo data-src o clase lazy-img
     */
    observeAll(container = document) {
        const images = container.querySelectorAll('img[data-src], .lazy-img');
        
        images.forEach(img => {
            if (this.observer) {
                this.observer.observe(img);
            } else {
                // Fallback directo si no hay IntersectionObserver
                this.cargarImagen(img);
            }
        });
    }

    cargarImagen(imgElement) {
        const src = imgElement.getAttribute('data-src');
        if (!src) return;

        // Crear una imagen en memoria para precargar suavemente
        const tempImg = new Image();
        tempImg.src = src;

        tempImg.onload = () => {
            imgElement.src = src;
            imgElement.classList.add('loaded');
            imgElement.removeAttribute('data-src');
            // Remover skeleton placeholder si existe contenedor padre
            const placeholder = imgElement.closest('.img-placeholder-wrapper');
            if (placeholder) {
                placeholder.classList.add('ready');
            }
        };

        tempImg.onerror = () => {
            console.warn(`[KARAOKE TULUM] Error cargando imagen: ${src}, aplicando respaldo.`);
            imgElement.src = this.fallbackSvg;
            imgElement.classList.add('loaded', 'fallback-applied');
            imgElement.removeAttribute('data-src');
        };
    }

    /**
     * Limpia observadores activos
     */
    disconnect() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

window.lazyLoadManager = new LazyLoadManager();
