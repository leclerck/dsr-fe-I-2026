import { Collapse } from 'bootstrap';
import './Menu.css';

/* 
Función para cerrar el menú
*/
function cerrarMenu() {
    const menu = document.getElementById('menuCollapse');

    if (menu && menu.classList.contains('show')) {
        Collapse.getOrCreateInstance(menu).hide();
    }
}

/* 
Componente para mostrar el menú de la página
@param {number} cantidadCarrito - Cantidad de productos en el carrito
*/
function Menu({ cantidadCarrito }) {
    return (
        <nav className="menu" aria-label="Menú">
            <div className="menu-bar">
                <span className="menu-label">Menú</span>
                <div className="menu-acciones">
                    <a className="menu-carrito-icono" href="#carrito" onClick={cerrarMenu} aria-label={`Ir al carrito, ${cantidadCarrito} productos`}>
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <circle cx="9" cy="20" r="1.5" />
                            <circle cx="18" cy="20" r="1.5" />
                            <path d="M2 3h3l2.7 12.2a1.5 1.5 0 0 0 1.5 1.3h8.6a1.5 1.5 0 0 0 1.5-1.2L21 7H6" />
                        </svg>
                        <span className="menu-carrito-icono-contador" aria-hidden="true">{cantidadCarrito}</span>
                    </a>
                    <button className="menu-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#menuCollapse" aria-controls="menuCollapse" aria-expanded="false" aria-label="Abrir o cerrar menú">
                        <span className="menu-toggle-icon" aria-hidden="true"></span>
                    </button>
                </div>
            </div>
            <div className="collapse menu-collapse" id="menuCollapse">
                <ul className="menu-lista" onClick={cerrarMenu}>
                    <li><a href="#inicio">Inicio</a></li>
                    <li><a href="#categorias">Categorías</a></li>
                    <li><a href="#productos">Productos</a></li>
                    <li><a href="#contacto">Contacto</a></li>
                    <li>
                        <a href="#carrito">
                            Carrito
                            <span className="menu-carrito-contador" aria-label={`${cantidadCarrito} productos en el carrito`}>
                                {cantidadCarrito}
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Menu;
