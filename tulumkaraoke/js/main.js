/**
 * KARAOKE TULUM - Archivo Principal de Inicialización (main.js)
 * Manejo del Splash Screen Cinematográfico ("ENTRAR A TULUM"),
 * Coordinación de Hidratación Progresiva del DOM y Atajos de Teclado.
 */

$(document).ready(function() {
    console.log('[KARAOKE TULUM VIP] Inicializando sistema...');

    // 1. Registro de Sesión en Bitácoras
    if (window.registrarBitacora) {
        window.registrarBitacora("Inicio de Sesión", "Sistema", "Huésped ingresó a KARAOKE TULUM VIP Lounge.");
    }

    // 2. Control del Splash Screen Cinematográfico
    const $splashScreen = $('#splashScreen');
    let splashDismissed = false;

    function ejecutarTransicionCinematografica() {
        if (splashDismissed) return;
        splashDismissed = true;

        $splashScreen.addClass('splash-cinematic-exit');
        
        // Iniciar protocolo de hidratación progresiva
        if (window.hydrateApp) {
            window.hydrateApp();
        }

        setTimeout(() => {
            $splashScreen.remove();
        }, 750);
    }

    // Transición automática de 3.2 segundos o clic en "ENTRAR A TULUM"
    const splashTimer = setTimeout(() => {
        ejecutarTransicionCinematografica();
    }, 3500);

    $('#splashBtnComenzar').on('click', function() {
        clearTimeout(splashTimer);
        ejecutarTransicionCinematografica();
    });

    // 3. Toggle de Modo Oscuro Espacial
    $('#darkModeToggle').on('change', function() {
        const isDark = $(this).is(':checked');
        $('body').toggleClass('light-theme', !isDark);
        if (window.showToast) {
            window.showToast("Ambiente Visual", isDark ? "Modo oscuro espacial activado." : "Modo luminoso activado.", "info");
        }
        if (window.registrarBitacora) {
            window.registrarBitacora("Configuración Visual", "Config", `Tema cambiado a ${isDark ? 'Oscuro' : 'Claro'}.`);
        }
    });

    // 4. Cierre de Modales
    $('#modalCloseBtn, #modalBtnCancelar').on('click', function() {
        window.closeModal();
    });

    $('#modalOverlay').on('click', function(e) {
        if ($(e.target).is('#modalOverlay')) {
            window.closeModal();
        }
    });

    // 5. Atajos de Teclado
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            window.closeModal();
            $('#playerModalOverlay').removeClass('active');
            if (window.tulumAiAssistant) window.tulumAiAssistant.close();
            if (window.router) window.router.closeSidebar();
        }
        if (e.code === 'Space' && $('#playerModalOverlay').hasClass('active') && !$(e.target).is('input, textarea')) {
            e.preventDefault();
            if (window.karaokePlayer) {
                window.karaokePlayer.togglePlay();
            }
        }
    });

    // 6. Botón de Cerrar Sesión Demostrativo
    $('#sidebarLogoutBtn').on('click', function(e) {
        e.preventDefault();
        if (window.registrarBitacora) {
            window.registrarBitacora("Cierre de Sesión", "Sistema", "Huésped cerró su sesión demo.");
        }
        window.showToast("Sesión Finalizada", "Has salido del perfil VIP. ¡Te esperamos pronto en Tulum!", "info");
        if (window.router) window.router.navigate('inicio');
    });

    // 7. Sincronización Global de Favoritos en el DOM
    window.addEventListener('tulum:favorites-updated', function(e) {
        const detail = e.detail;
        if (!detail) return;
        
        $(`.song-card[data-song-id="${detail.songId}"] .btn-fav-toggle`).each(function() {
            const $btn = $(this);
            $btn.toggleClass('is-fav', detail.isFavorite);
            $btn.html(window.Components.icons.heart(detail.isFavorite));
        });

        if (window.router && window.router.currentRoute === 'favoritos') {
            window.router.renderCurrent();
        }
    });

    // 8. Rehidratación en Redimensionamiento
    window.addEventListener('resize', () => {
        // Asegurar que las vistas recalculen tamaños sin scrollbars
    });
});
