import { useState } from 'react'

const NOMBRE_MIN = 2
const NOMBRE_MAX = 30
const EMAIL_MAX = 80
const MENSAJE_MIN = 10
const MENSAJE_MAX = 400
const VACIO = { nombre: '', email: '', mensaje: '' }

function esLetra(caracter) {
    return caracter.toLowerCase() !== caracter.toUpperCase()
}

function nombreValido(valor) {
    return valor.split(/[ '-]/).every((parte) => parte.length > 0 && [...parte].every(esLetra))
}

function emailValido(valor) {
    if (valor.includes(' ')) return false
    const partes = valor.split('@')
    if (partes.length !== 2 || partes.some((parte) => parte.length === 0)) return false
    return partes[1].split('.').every((parte) => parte.length > 0) && partes[1].includes('.')
}

/*
Valida formato antes que la longitud.
@returns {Object} Mensajes de error por campo
*/
function validarContacto({ nombre, email, mensaje }) {
    const errores = {}
    const nombreLimpio = nombre.trim()
    const emailLimpio = email.trim()
    const mensajeLimpio = mensaje.trim()

    if (!nombreLimpio) {
        errores.nombre = 'Ingresa tu nombre.'
    } else if (!nombreValido(nombreLimpio)) {
        errores.nombre = 'El nombre solo puede tener letras.'
    } else if (nombreLimpio.length < NOMBRE_MIN) {
        errores.nombre = `El nombre debe tener al menos ${NOMBRE_MIN} caracteres.`
    } else if (nombreLimpio.length > NOMBRE_MAX) {
        errores.nombre = `¡No más de ${NOMBRE_MAX} caracteres!`
    }

    if (!emailLimpio) {
        errores.email = 'Ingresa tu correo.'
    } else if (!emailValido(emailLimpio)) {
        errores.email = 'Hmm, este no es un correo válido.'
    } else if (emailLimpio.length > EMAIL_MAX) {
        errores.email = `El correo no puede superar los ${EMAIL_MAX} caracteres.`
    }

    if (!mensajeLimpio) {
        errores.mensaje = 'Escribe tu mensaje.'
    } else if (mensajeLimpio.length < MENSAJE_MIN) {
        errores.mensaje = `¡Al menos ${MENSAJE_MIN} caracteres por favor!`
    } else if (mensajeLimpio.length > MENSAJE_MAX) {
        errores.mensaje = `¡No más de ${MENSAJE_MAX} caracteres!`
    }

    return errores
}

function Campo({ id, label, error, children }) {
    return (
        <div className={`contacto-campo${error ? ' contacto-campo--invalido' : ''}`}>
            <label htmlFor={id}>{label}</label>
            {children}
            {error && (
                <p id={`${id}-error`} className="contacto-alerta" role="alert">{error}</p>
            )}
        </div>
    )
}

/*
Formulario de contacto del footer. Valida en el cliente antes de aceptar el envío.
*/
function ContactForm() {
    const [valores, setValores] = useState(VACIO)
    const [errores, setErrores] = useState({})
    const [enviado, setEnviado] = useState(false)

    function cambiar(evento) {
        const siguientes = { ...valores, [evento.target.name]: evento.target.value }
        setValores(siguientes)
        setEnviado(false)
        if (Object.keys(errores).length > 0) {
            setErrores(validarContacto(siguientes))
        }
    }

    function enviar(evento) {
        evento.preventDefault()
        const nuevos = validarContacto(valores)
        setErrores(nuevos)
        if (Object.keys(nuevos).length > 0) {
            setEnviado(false)
            return
        }
        setValores(VACIO)
        setEnviado(true)
    }

    return (
        <form className="contacto-form" onSubmit={enviar} noValidate>
            <Campo id="contacto-nombre" label="Nombre" error={errores.nombre}>
                <input
                    id="contacto-nombre"
                    name="nombre"
                    type="text"
                    autoComplete="name"
                    value={valores.nombre}
                    onChange={cambiar}
                    aria-invalid={Boolean(errores.nombre)}
                    aria-describedby={errores.nombre ? 'contacto-nombre-error' : undefined}
                />
            </Campo>
            <Campo id="contacto-email" label="Correo" error={errores.email}>
                <input
                    id="contacto-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={valores.email}
                    onChange={cambiar}
                    aria-invalid={Boolean(errores.email)}
                    aria-describedby={errores.email ? 'contacto-email-error' : undefined}
                />
            </Campo>
            <Campo id="contacto-mensaje" label="Mensaje" error={errores.mensaje}>
                <textarea
                    id="contacto-mensaje"
                    name="mensaje"
                    rows="4"
                    value={valores.mensaje}
                    onChange={cambiar}
                    aria-invalid={Boolean(errores.mensaje)}
                    aria-describedby={errores.mensaje ? 'contacto-mensaje-error' : undefined}
                />
            </Campo>
            {enviado && (
                <output className="contacto-alerta contacto-alerta--ok">
                    Mensaje enviado. Gracias por escribirnos.
                </output>
            )}
            <button type="submit" className="contacto-enviar">Enviar</button>
        </form>
    )
}

export default ContactForm
