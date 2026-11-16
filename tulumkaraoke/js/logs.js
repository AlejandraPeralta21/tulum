/**
 * KARAOKE TULUM - Sistema de Bitácoras de Auditoría y Eventos
 * Registra todas las actividades clave en LocalStorage para supervisión administrativa.
 */

class LogsManager {
    constructor() {
        this.storageKey = window.STORAGE_KEYS ? window.STORAGE_KEYS.LOGS : 'tulum_bitacoras';
    }

    /**
     * Registra un nuevo evento en la bitácora
     * @param {string} accion - Acción realizada (p. ej. "Navegación", "Reserva Creada", "Favorito Agregado")
     * @param {string} modulo - Módulo afectado ("Reservas", "Canciones", "Favoritos", "Admin", "Config")
     * @param {string} descripcion - Detalle explícito de la acción
     * @param {string} [usuario="Huésped"] - Usuario que ejecutó la acción
     * @param {string} [resultado="Exitoso"] - "Exitoso", "Pendiente", "Cancelado", "Error"
     */
    registrar(accion, modulo, descripcion, usuario = "Huésped Tulum", resultado = "Exitoso") {
        try {
            const logs = this.obtenerTodos();
            const now = new Date();
            
            const nuevoRegistro = {
                id: 'LOG-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
                fecha: now.toLocaleDateString('es-MX', { year: 'numeric', month: '2-digit', day: '2-digit' }),
                hora: now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                timestamp: now.getTime(),
                usuario: usuario,
                accion: accion,
                modulo: modulo,
                descripcion: descripcion,
                resultado: resultado
            };

            logs.unshift(nuevoRegistro);

            // Mantener un límite saludable en memoria local (máx 300 logs)
            if (logs.length > 300) {
                logs.pop();
            }

            if (window.storage) {
                window.storage.set(this.storageKey, logs);
            } else {
                localStorage.setItem(this.storageKey, JSON.stringify(logs));
            }

            // Disparar evento personalizado para actualizar vistas activas si el admin está abierto
            window.dispatchEvent(new CustomEvent('tulum:log-added', { detail: nuevoRegistro }));

            return nuevoRegistro;
        } catch (error) {
            console.error('[KARAOKE TULUM] Error al registrar bitácora:', error);
            return null;
        }
    }

    /**
     * Obtiene todos los logs ordenados por fecha descendente
     */
    obtenerTodos() {
        if (window.storage) {
            return window.storage.get(this.storageKey, []);
        }
        try {
            return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        } catch {
            return [];
        }
    }

    /**
     * Filtra los registros según criterios
     */
    filtrar({ fecha = '', usuario = '', modulo = '', accion = '', busqueda = '' } = {}) {
        let logs = this.obtenerTodos();

        if (fecha) {
            logs = logs.filter(l => l.fecha.includes(fecha));
        }

        if (usuario && usuario !== 'TODOS') {
            logs = logs.filter(l => l.usuario.toLowerCase().includes(usuario.toLowerCase()));
        }

        if (modulo && modulo !== 'TODOS') {
            logs = logs.filter(l => l.modulo.toLowerCase() === modulo.toLowerCase());
        }

        if (accion && accion !== 'TODOS') {
            logs = logs.filter(l => l.accion.toLowerCase().includes(accion.toLowerCase()));
        }

        if (busqueda) {
            const q = busqueda.toLowerCase().trim();
            logs = logs.filter(l => 
                l.descripcion.toLowerCase().includes(q) ||
                l.accion.toLowerCase().includes(q) ||
                l.modulo.toLowerCase().includes(q) ||
                l.usuario.toLowerCase().includes(q)
            );
        }

        return logs;
    }

    /**
     * Limpia la bitácora conservando un registro de auditoría del vaciado
     */
    vaciar() {
        const resetLog = [{
            id: 'LOG-' + Date.now(),
            fecha: new Date().toLocaleDateString('es-MX'),
            hora: new Date().toLocaleTimeString('es-MX'),
            timestamp: Date.now(),
            usuario: "Administrador",
            accion: "Limpieza",
            modulo: "Bitácoras",
            descripcion: "Historial de bitácoras reiniciado por el administrador.",
            resultado: "Exitoso"
        }];

        if (window.storage) {
            window.storage.set(this.storageKey, resetLog);
        } else {
            localStorage.setItem(this.storageKey, JSON.stringify(resetLog));
        }
    }
}

// Instancia global
window.logsManager = new LogsManager();

// Función utilitaria solicitada explícitamente en las instrucciones
window.registrarBitacora = function(accion, modulo, descripcion, usuario = "Administrador", resultado = "Exitoso") {
    return window.logsManager.registrar(accion, modulo, descripcion, usuario, resultado);
};
