/* 
Función para convertir un precio a número
@param {string} precio - Precio a convertir
@returns {number} Precio convertido
*/
export function parsePrecio(precio) {
    const valor = typeof precio === 'number'
        ? precio
        : Number(String(precio).replace(/[^\d]/g, ''));

    return Number.isFinite(valor) ? valor : 0;
}

/* 
Función para formatear un precio
@param {number} valor - Valor a formatear
@returns {string} Precio formateado en formato de moneda chileno
*/
export function formatearPrecio(valor) {
    return '$' + valor.toLocaleString('es-CL');
}
