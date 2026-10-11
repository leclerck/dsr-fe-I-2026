import { parsePrecio, formatearPrecio } from '../../utils/precios';

function IconoCarrito({ conMas = false }) {
    return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="8" cy="21" r="1.3" />
            <circle cx="16.5" cy="21" r="1.3" />
            <path d="M1 4h2.6l2.3 10.6a1.3 1.3 0 0 0 1.3 1.1h7.4a1.3 1.3 0 0 0 1.3-1L18.6 8H5.1" />
            {conMas && <path d="M18 2.5v6M15 5.5h6" />}
        </svg>
    );
}

/* 
Componente para mostrar un producto en la tarjeta de producto
@param {Object} producto - Producto a mostrar
@param {Function} onAdd - Función para agregar el producto al carrito
@param {boolean} enCarrito - Indica si el producto está en el carrito
@param {boolean} compacto - Oculta la descripción y usa un icono de carrito (usado en carrusel)
*/
function ProductCard({ producto, onAdd, enCarrito, compacto = false }) {
    const etiqueta = enCarrito ? 'En Carrito' : 'Añadir al carrito';

    return (
        <article className={`producto-card${compacto ? ' producto-card--compacto' : ''}`}>
            <img className="producto-img" src={`${import.meta.env.BASE_URL}${producto.imagen}`} alt={producto.alt} width="160" height="200" />
            <h3 className="producto-titulo">{producto.titulo}</h3>
            <span className="producto-precio">{formatearPrecio(parsePrecio(producto.precio))}</span>
            {!compacto && <p className="producto-desc">{producto.descripcion}</p>}
            <button
                type="button"
                className={`producto-btn-carrito${enCarrito ? ' producto-btn-carrito--en-carrito' : ''}${compacto ? ' producto-btn-carrito--icono' : ''}`}
                onClick={() => { if (!enCarrito) onAdd(producto) }}
                disabled={enCarrito}
                aria-disabled={enCarrito}
                aria-label={etiqueta}
            >
                {compacto ? <IconoCarrito conMas={!enCarrito} /> : etiqueta}
            </button>
        </article>
    );
}

export default ProductCard;
