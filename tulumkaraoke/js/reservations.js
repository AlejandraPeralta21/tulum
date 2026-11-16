/**
 * KARAOKE TULUM - Módulo del Sistema de Reservas
 * Flujo en 3 pasos, Temporizador de 60 segundos con setInterval, validaciones y persistencia auditada.
 */

class ReservationsManager {
    constructor() {
        this.storageKey = window.STORAGE_KEYS ? window.STORAGE_KEYS.RESERVATIONS : 'tulum_reservations';
        this.provisionalActual = null;
        this.timerInterval = null;
        this.segundosRestantes = 60;
        this.pasoActual = 1; // 1: Datos, 2: Confirmación, 3: Éxito
    }

    getAll() {
        if (window.storage) {
            return window.storage.get(this.storageKey, []);
        }
        try {
            return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        } catch {
            return [];
        }
    }

    saveAll(reservations) {
        if (window.storage) {
            return window.storage.set(this.storageKey, reservations);
        }
        localStorage.setItem(this.storageKey, JSON.stringify(reservations));
        return true;
    }

    getById(id) {
        const reservations = this.getAll();
        return reservations.find(r => r.id === id || r.codigo === id) || null;
    }

    generarCodigo() {
        const num = Math.floor(1000 + Math.random() * 9000);
        return `KT-${num}`;
    }

    /**
     * Paso 1: Crea reserva provisional e inicia temporizador de 60 segundos
     */
    crearProvisional(datos) {
        this.limpiarTemporizador();
        
        const codigo = this.generarCodigo();
        const telLimpio = String(datos.telefono || '').replace(/[^0-9]/g, '').slice(-8);

        this.provisionalActual = {
            id: `RES-${Date.now()}`,
            codigo: codigo,
            nombre: datos.nombre.trim(),
            telefono: telLimpio,
            telefonoPrefijo: '+591',
            telefonoFormateado: `+591 ${telLimpio}`,
            fecha: datos.fecha,
            hora: datos.hora,
            personas: parseInt(datos.personas, 10),
            sala: datos.sala,
            observaciones: datos.observaciones ? datos.observaciones.trim() : 'Sin observaciones',
            estado: 'Provisional',
            creadoEl: new Date().toISOString()
        };

        if (window.registrarBitacora) {
            window.registrarBitacora(
                "Crear Reserva Provisional",
                "Reservas",
                `Reserva provisional creada para ${this.provisionalActual.nombre} en ${this.provisionalActual.sala} (${this.provisionalActual.codigo}).`
            );
        }

        this.pasoActual = 2;
        this.iniciarTemporizador();
        return this.provisionalActual;
    }

    /**
     * Inicia la cuenta regresiva estricta de 60 segundos
     */
    iniciarTemporizador() {
        this.segundosRestantes = 60;
        this.actualizarUIContador(60);

        this.timerInterval = setInterval(() => {
            this.segundosRestantes--;
            this.actualizarUIContador(this.segundosRestantes);

            if (this.segundosRestantes <= 0) {
                this.expirarProvisional();
            }
        }, 1000);
    }

    actualizarUIContador(segundos) {
        const $timerNumber = $('#timerCountdownNumber');
        const $circleProgress = $('#timerProgressCircle');

        if ($timerNumber.length) {
            $timerNumber.text(`${segundos}s`);
        }

        if ($circleProgress.length) {
            // Perímetro del círculo SVG r=54 -> 2 * PI * 54 = ~339.29
            const circumference = 339.29;
            const offset = circumference - (segundos / 60) * circumference;
            $circleProgress.css('strokeDashoffset', offset);
        }
    }

    limpiarTemporizador() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    /**
     * Se ejecuta cuando el contador de 60s llega a cero
     */
    expirarProvisional() {
        this.limpiarTemporizador();

        if (this.provisionalActual) {
            const codigo = this.provisionalActual.codigo;
            if (window.registrarBitacora) {
                window.registrarBitacora(
                    "Expiración de Reserva",
                    "Reservas",
                    `El tiempo de 60 segundos expiró para la reserva provisional ${codigo}. Cancelada automáticamente.`,
                    "Sistema",
                    "Cancelado"
                );
            }
            this.provisionalActual = null;
        }

        this.pasoActual = 1;

        if (window.showToast) {
            window.showToast(
                "Tiempo agotado",
                "Han transcurrido los 60 segundos. La reserva provisional ha sido cancelada.",
                "warning",
                6000
            );
        }

        // Refrescar vista de reservas a paso 1
        if (window.router && window.router.currentRoute === 'reservas') {
            window.router.renderCurrent();
        }
    }

    /**
     * Paso 2 -> Confirmación exitosa
     */
    confirmarActual() {
        if (!this.provisionalActual) return null;

        this.limpiarTemporizador();
        
        const reservaConfirmada = {
            ...this.provisionalActual,
            estado: 'Confirmada',
            confirmadoEl: new Date().toISOString()
        };

        const reservas = this.getAll();
        reservas.unshift(reservaConfirmada);
        this.saveAll(reservas);

        if (window.registrarBitacora) {
            window.registrarBitacora(
                "Confirmar Reserva",
                "Reservas",
                `Reserva ${reservaConfirmada.codigo} confirmada exitosamente para ${reservaConfirmada.nombre} (${reservaConfirmada.sala}, ${reservaConfirmada.fecha} a las ${reservaConfirmada.hora}).`
            );
        }

        if (window.showToast) {
            window.showToast(
                "¡Reserva Exitosa!",
                `Tu sala ${reservaConfirmada.sala} ha sido confirmada con código ${reservaConfirmada.codigo}.`,
                "success",
                5000
            );
        }

        this.provisionalActual = reservaConfirmada;
        this.pasoActual = 3;
        window.dispatchEvent(new CustomEvent('tulum:reservations-updated'));
        return reservaConfirmada;
    }

    /**
     * Paso 2 -> Cancelar reserva en curso
     */
    cancelarActual() {
        this.limpiarTemporizador();
        if (this.provisionalActual) {
            if (window.registrarBitacora) {
                window.registrarBitacora(
                    "Cancelar Reserva Provisional",
                    "Reservas",
                    `Usuario canceló manualmente la reserva provisional ${this.provisionalActual.codigo}.`,
                    "Huésped",
                    "Cancelado"
                );
            }
            this.provisionalActual = null;
        }
        this.pasoActual = 1;

        if (window.showToast) {
            window.showToast("Reserva cancelada", "La reserva provisional fue descartada.", "info");
        }

        if (window.router && window.router.currentRoute === 'reservas') {
            window.router.renderCurrent();
        }
    }

    /**
     * Paso 2 -> Regresar a editar datos manteniendo lo ingresado
     */
    regresarAEditar() {
        this.limpiarTemporizador();
        this.pasoActual = 1;
        if (window.router && window.router.currentRoute === 'reservas') {
            window.router.renderCurrent();
        }
    }

    /**
     * Acciones administrativas sobre reservas existentes
     */
    cambiarEstado(id, nuevoEstado) {
        const reservas = this.getAll();
        const res = reservas.find(r => r.id === id || r.codigo === id);
        if (!res) return false;

        const estadoAnterior = res.estado;
        res.estado = nuevoEstado;
        res.actualizadoEl = new Date().toISOString();

        this.saveAll(reservas);

        if (window.registrarBitacora) {
            window.registrarBitacora(
                "Actualizar Estado Reserva",
                "Reservas",
                `Reserva ${res.codigo} cambió de "${estadoAnterior}" a "${nuevoEstado}".`
            );
        }

        window.dispatchEvent(new CustomEvent('tulum:reservations-updated'));
        return true;
    }

    eliminar(id) {
        const reservas = this.getAll();
        const res = reservas.find(r => r.id === id || r.codigo === id);
        if (!res) return false;

        const filtered = reservas.filter(r => r.id !== id && r.codigo !== id);
        this.saveAll(filtered);

        if (window.registrarBitacora) {
            window.registrarBitacora(
                "Eliminar Reserva",
                "Reservas",
                `Reserva ${res.codigo} eliminada del sistema.`
            );
        }

        window.dispatchEvent(new CustomEvent('tulum:reservations-updated'));
        return true;
    }
}

window.reservationsManager = new ReservationsManager();
