import { parsePrecio, formatearPrecio } from '../../utils/precios';

/* 
Componente para mostrar el carrito de compras
@param {Object[]} items - Lista de productos en el carrito
@param {Function} onAgregar - Función para agregar un producto al carrito
@param {Function} onQuitarUno - Función para quitar una unidad de un producto
@param {Function} onEliminar - Función para eliminar un producto del carrito
@param {Function} onVaciar - Función para vaciar el carrito
*/

function Cart({ items, onAgregar, onQuitarUno, onEliminar, onVaciar }) {
    const total = items.reduce(
        (suma, item) => suma + parsePrecio(item.producto.precio) * item.cantidad,
        0
    );

    return (
        <section className="section section-cart" id="carrito">
            <h2>Carrito</h2>

            {items.length === 0 ? (
                <p className="carrito-vacio">Tu carrito está vacío.</p>
            ) : (
                <>
                    <ul className="carrito-lista">
                        {items.map(({ producto, cantidad }) => (
                            <li key={producto.titulo} className="carrito-item">
                                <img className="carrito-item-img" src={`/${producto.imagen}`} alt="" width="48" height="60" />

                                <div className="carrito-item-info">
                                    <p className="carrito-item-titulo">{producto.titulo}</p>
                                    <p className="carrito-item-precio">{formatearPrecio(parsePrecio(producto.precio))} c/u</p>
                                </div>

                                <div className="carrito-cantidad">
                                    <button type="button" className="carrito-btn carrito-btn--icono" onClick={() => onQuitarUno(producto.titulo)} aria-label={`Quitar una unidad de ${producto.titulo}`}>
                                        −
                                    </button>
                                    <span>{cantidad}</span>
                                    <button type="button" className="carrito-btn carrito-btn--icono" onClick={() => onAgregar(producto)} aria-label={`Agregar una unidad de ${producto.titulo}`}>
                                        +
                                    </button>
                                </div>

                                <button type="button" className="carrito-btn carrito-btn--secundario" onClick={() => onEliminar(producto.titulo)}>
                                    Quitar
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="carrito-total">
                        <span>Total</span>
                        <strong>{formatearPrecio(total)}</strong>
                    </div>

                    <div className="carrito-acciones">
                        <button type="button" className="carrito-btn carrito-btn--secundario" onClick={onVaciar}>
                            Vaciar carrito
                        </button>
                    </div>
                </>
            )}
        </section>
    );
}

export default Cart;
