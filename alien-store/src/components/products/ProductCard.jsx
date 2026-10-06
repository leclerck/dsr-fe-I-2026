import { parsePrecio, formatearPrecio } from '../../utils/precios';

/* 
Componente para mostrar un producto en la tarjeta de producto
@param {Object} producto - Producto a mostrar
@param {Function} onAdd - Función para agregar el producto al carrito
@param {boolean} enCarrito - Indica si el producto está en el carrito
*/
function ProductCard({ producto, onAdd, enCarrito }) {
    return (
        <article className="producto-card">
            <img className="producto-img" src={`/${producto.imagen}`} alt={producto.alt} width="160" height="200" />
            <h3 className="producto-titulo">{producto.titulo}</h3>
            <span className="producto-precio">{formatearPrecio(parsePrecio(producto.precio))}</span>
            <p className="producto-desc">{producto.descripcion}</p>
            <button
                type="button"
                className={`producto-btn-carrito${enCarrito ? ' producto-btn-carrito--en-carrito' : ''}`}
                onClick={() => { if (!enCarrito) onAdd(producto) }}
                disabled={enCarrito}
                aria-disabled={enCarrito}
            >
                {enCarrito ? 'En Carrito' : 'Añadir al carrito'}
            </button>
        </article>
    );
}

export default ProductCard;
