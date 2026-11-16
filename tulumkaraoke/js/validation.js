/**
 * KARAOKE TULUM - Módulo de Validaciones Profesionales
 * Validación en tiempo real, expresiones regulares, control de estados de error/éxito sin alertas nativas.
 */

class ValidationManager {
    constructor() {
        // Expresión regular para nombres válidos (al menos 3 caracteres, letras, espacios y acentos)
        this.regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{3,50}$/;
        // Expresión regular para teléfono boliviano: exactamente 8 dígitos numéricos
        this.regexTelefonoBolivia = /^[0-9]{8}$/;
    }

    /**
     * Valida el campo Nombre Completo
     */
    validarNombre(nombre) {
        if (!nombre || typeof nombre !== 'string') {
            return { valido: false, mensaje: 'El nombre completo es obligatorio.' };
        }
        const limpio = nombre.trim();
        if (limpio.length < 3) {
            return { valido: false, mensaje: 'El nombre debe tener al menos 3 caracteres.' };
        }
        if (!this.regexNombre.test(limpio)) {
            return { valido: false, mensaje: 'Solo se permiten letras y espacios.' };
        }
        return { valido: true, mensaje: '' };
    }

    /**
     * Valida el campo Teléfono boliviano (+591 | 8 dígitos exactos)
     * No cuenta el prefijo fijo dentro de los 8 dígitos requeridos.
     */
    validarTelefono(telefono) {
        if (!telefono) {
            return { valido: false, mensaje: 'El número de teléfono es obligatorio.' };
        }
        let limpio = String(telefono).trim();
        // Quitar prefijo +591 o 591 si viene adjunto
        if (limpio.startsWith('+591')) {
            limpio = limpio.slice(4).trim();
        } else if (limpio.startsWith('591') && limpio.length > 8) {
            limpio = limpio.slice(3).trim();
        }
        // Conservar exclusivamente dígitos
        limpio = limpio.replace(/[^0-9]/g, '');

        if (limpio.length === 0) {
            return { valido: false, mensaje: 'Ingresa un número telefónico (Bolivia).' };
        }
        if (limpio.length < 8) {
            return { valido: false, mensaje: `Faltan dígitos: tienes ${limpio.length} de 8 requeridos.` };
        }
        if (limpio.length > 8) {
            return { valido: false, mensaje: 'Demasiados dígitos: máximo 8 dígitos para Bolivia.' };
        }
        if (!this.regexTelefonoBolivia.test(limpio)) {
            return { valido: false, mensaje: 'El teléfono boliviano debe tener exactamente 8 dígitos.' };
        }
        return { valido: true, mensaje: '', numeroLimpio: limpio };
    }

    /**
     * Valida el campo Fecha (evitar fechas pasadas)
     */
    validarFecha(fechaStr) {
        if (!fechaStr) {
            return { valido: false, mensaje: 'La fecha de reserva es obligatoria.' };
        }

        const fechaSeleccionada = new Date(fechaStr + 'T00:00:00');
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        if (isNaN(fechaSeleccionada.getTime())) {
            return { valido: false, mensaje: 'Formato de fecha inválido.' };
        }

        if (fechaSeleccionada < hoy) {
            return { valido: false, mensaje: 'No puedes reservar en una fecha anterior a hoy.' };
        }

        return { valido: true, mensaje: '' };
    }

    /**
     * Valida el campo Hora
     */
    validarHora(horaStr) {
        if (!horaStr) {
            return { valido: false, mensaje: 'La hora de reserva es obligatoria.' };
        }

        const partes = horaStr.split(':');
        if (partes.length < 2) {
            return { valido: false, mensaje: 'Hora en formato HH:MM obligatoria.' };
        }

        const hora = parseInt(partes[0], 10);
        const minutos = parseInt(partes[1], 10);

        if (isNaN(hora) || isNaN(minutos) || hora < 0 || hora > 23 || minutos < 0 || minutos > 59) {
            return { valido: false, mensaje: 'Hora no válida.' };
        }

        // Horario de Karaoke Tulum: 17:00 a 04:00
        const horaValida = (hora >= 17 && hora <= 23) || (hora >= 0 && hora <= 4);
        if (!horaValida) {
            return { valido: false, mensaje: 'Horario de servicio: 17:00 a 04:00 hrs.' };
        }

        return { valido: true, mensaje: '' };
    }

    /**
     * Valida el número de personas (1 a 30)
     */
    validarPersonas(cantidad) {
        const num = parseInt(cantidad, 10);
        if (isNaN(num)) {
            return { valido: false, mensaje: 'Indica la cantidad de personas.' };
        }
        if (num < 1) {
            return { valido: false, mensaje: 'Mínimo 1 persona para reservar.' };
        }
        if (num > 30) {
            return { valido: false, mensaje: 'Para grupos mayores a 30 personas, contactar a Eventos VIP.' };
        }
        return { valido: true, mensaje: '' };
    }

    /**
     * Valida la sala o ambiente seleccionado
     */
    validarSala(sala) {
        if (!sala || !sala.trim()) {
            return { valido: false, mensaje: 'Debes seleccionar una sala o ambiente.' };
        }
        return { valido: true, mensaje: '' };
    }

    /**
     * Valida el formulario completo de reserva
     */
    validarFormularioReserva(datos) {
        const errores = {};
        
        const resNombre = this.validarNombre(datos.nombre);
        if (!resNombre.valido) errores.nombre = resNombre.mensaje;

        const resTelefono = this.validarTelefono(datos.telefono);
        if (!resTelefono.valido) errores.telefono = resTelefono.mensaje;

        const resFecha = this.validarFecha(datos.fecha);
        if (!resFecha.valido) errores.fecha = resFecha.mensaje;

        const resHora = this.validarHora(datos.hora);
        if (!resHora.valido) errores.hora = resHora.mensaje;

        const resPersonas = this.validarPersonas(datos.personas);
        if (!resPersonas.valido) errores.personas = resPersonas.mensaje;

        const resSala = this.validarSala(datos.sala);
        if (!resSala.valido) errores.sala = resSala.mensaje;

        return {
            esValido: Object.keys(errores).length === 0,
            errores: errores
        };
    }

    /**
     * Aplica estilos visuales de error/éxito en el DOM con jQuery
     */
    aplicarEstadoCampo($input, resultado) {
        if (!$input || !$input.length) return;

        const $group = $input.closest('.form-group');
        let $errorSpan = $group.find('.field-error-msg');

        if (!$errorSpan.length) {
            $errorSpan = $('<span class="field-error-msg"></span>');
            $group.append($errorSpan);
        }

        const $phoneWrapper = $group.find('.phone-input-bolivia');

        if (!resultado.valido) {
            $input.addClass('is-invalid').removeClass('is-valid');
            if ($phoneWrapper.length) {
                $phoneWrapper.addClass('is-invalid').removeClass('is-valid');
            }
            $errorSpan.text(resultado.mensaje).fadeIn(150);
        } else {
            $input.removeClass('is-invalid').addClass('is-valid');
            if ($phoneWrapper.length) {
                $phoneWrapper.removeClass('is-invalid').addClass('is-valid');
            }
            $errorSpan.text('').hide();
        }
    }
}

window.validationManager = new ValidationManager();

/**
 * Controlador de entrada en tiempo real para el teléfono boliviano (+591 | 8 dígitos)
 * Restringe caracteres no numéricos, actualiza contador de caracteres 0/8 y aplica validaciones.
 */
window.handlePhoneInput = function(inputEl) {
    if (!inputEl) return;
    
    // Permitir exclusivamente caracteres numéricos y truncar a 8 dígitos
    let val = String(inputEl.value || '').replace(/[^0-9]/g, '').slice(0, 8);
    inputEl.value = val;

    // Actualizar contador visual 0/8
    const counter = document.getElementById('phoneCharCounter');
    if (counter) {
        counter.textContent = `${val.length}/8`;
        if (val.length === 8) {
            counter.classList.add('is-complete');
        } else {
            counter.classList.remove('is-complete');
        }
    }

    // Validar en tiempo real si el usuario ya empezó a escribir
    if (window.validationManager) {
        const res = window.validationManager.validarTelefono(val);
        window.validationManager.aplicarEstadoCampo($(inputEl), res);
    }
};
