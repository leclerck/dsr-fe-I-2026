import { useMemo, useState } from 'react'
import ProductCard from '../products/ProductCard'

const FILTRO_TODAS = 'Todas'

function IconoExpandir({ abierto }) {
    return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {abierto ? <path d="M6 15l6-6 6 6" /> : <path d="M6 9l6 6 6-6" />}
        </svg>
    )
}

/*
Componente para listar todos los productos con filtro por categoría.
Colapsado por defecto; se expande desde el menú o el título de la sección.
@param {Object[]} productos - Productos a mostrar
@param {Function} onAdd - Función para agregar un producto al carrito
@param {string[]} titulosEnCarrito - Títulos de productos ya en el carrito
@param {boolean} abierto - Si el catálogo está expandido
@param {Function} onToggle - Expande o contrae el catálogo
*/
function ProductCatalog({ productos, onAdd, titulosEnCarrito, abierto, onToggle }) {
    const [filtro, setFiltro] = useState(FILTRO_TODAS)

    const categorias = useMemo(() => {
        const unicas = [...new Set(productos.map((producto) => producto.categoria).filter(Boolean))]
        unicas.sort((a, b) => a.localeCompare(b, 'es'))
        return [FILTRO_TODAS, ...unicas]
    }, [productos])

    const visibles = filtro === FILTRO_TODAS
        ? productos
        : productos.filter((producto) => producto.categoria === filtro)

    return (
        <section className="section section-catalogo" id="productos">
            <div className="catalogo-encabezado">
                <h2>
                    <button
                        type="button"
                        className="catalogo-titulo"
                        aria-expanded={abierto}
                        aria-controls="catalogo-contenido"
                        onClick={onToggle}
                    >
                        Todos los productos
                    </button>
                </h2>
                <button
                    type="button"
                    className="catalogo-toggle"
                    aria-expanded={abierto}
                    aria-controls="catalogo-contenido"
                    aria-label={abierto ? 'Contraer catálogo' : 'Expandir catálogo'}
                    onClick={onToggle}
                >
                    <IconoExpandir abierto={abierto} />
                </button>
            </div>

            {abierto && (
                <div id="catalogo-contenido">
                    <ul className="lista-categorias" aria-label="Filtrar por categoría">
                        {categorias.map((categoria) => {
                            const activa = filtro === categoria
                            return (
                                <li key={categoria}>
                                    <button
                                        type="button"
                                        className={`lista-categorias-filtro${activa ? ' lista-categorias-filtro--activo' : ''}`}
                                        aria-pressed={activa}
                                        onClick={() => setFiltro(categoria)}
                                    >
                                        {categoria}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>

                    {visibles.length === 0 ? (
                        <p className="productos-estado">No hay productos en esta categoría.</p>
                    ) : (
                        <div className="catalogo-grid">
                            {visibles.map((producto) => (
                                <ProductCard
                                    key={producto.titulo}
                                    producto={producto}
                                    onAdd={onAdd}
                                    enCarrito={titulosEnCarrito.includes(producto.titulo)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}

export default ProductCatalog
