/* 
Componente para mostrar el toast del carrito de compras
@param {string} nombre - Nombre del producto agregado
@param {boolean} visible - Indica si el toast debe ser visible
*/
function CartToast({ nombre, visible }) {
    return (
        <div
            className={`carrito-toast${visible ? ' carrito-toast--visible' : ''}`}
            role="status"
            aria-live="polite"
            aria-hidden={!visible}
        >
            <div className="carrito-toast-ticket">
                <span className="carrito-toast-icon" aria-hidden="true">🎟</span>
                <p className="carrito-toast-titulo">Listo</p>
                <p className="carrito-toast-nombre">{nombre}</p>
            </div>
        </div>
    );
}

export default CartToast;
