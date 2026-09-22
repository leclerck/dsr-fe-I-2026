const PRODUCTOS_URL = 'assets/data/productos.json';

const CARRUSELES = [
    { id: 'productosCarouselMobile', perSlide: 1, colClass: 'col-12', centered: true },
    { id: 'productosCarouselTablet', perSlide: 2, colClass: 'col-6', centered: false },
    { id: 'productosCarouselDesktop', perSlide: 4, colClass: 'col-3', centered: false }
];

function chunk(array, size) {
    const groups = [];

    for (let i = 0; i < array.length; i += size) {
        groups.push(array.slice(i, i + size));
    }

    return groups;
}

function crearTarjetaProducto(producto) {
    return `
        <article class="producto-card">
            <img class="producto-img" src="${producto.imagen}" alt="${producto.alt}" width="160" height="200">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <span class="producto-precio">${producto.precio}</span>
            <p class="producto-desc">${producto.descripcion}</p>
            <button type="button" class="producto-btn-carrito" data-producto="${producto.titulo}">
                Añadir al carrito
            </button>
        </article>
    `;
}

function renderCarousel({ id, perSlide, colClass, centered }, productos) {
    const carousel = document.getElementById(id);
    if (!carousel) return;

    const indicators = carousel.querySelector('.carousel-indicators');
    const inner = carousel.querySelector('.carousel-inner');
    const groups = chunk(productos, perSlide);
    const rowClass = centered
        ? 'row g-3 productos-fila justify-content-center'
        : 'row g-3 productos-fila';

    indicators.innerHTML = '';
    inner.innerHTML = '';

    groups.forEach(function (group, index) {
        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.dataset.bsTarget = '#' + id;
        indicator.dataset.bsSlideTo = String(index);
        indicator.setAttribute('aria-label', 'Slide ' + (index + 1));

        if (index === 0) {
            indicator.classList.add('active');
            indicator.setAttribute('aria-current', 'true');
        }

        indicators.appendChild(indicator);

        const cols = group.map(function (producto) {
            return '<div class="' + colClass + '">' + crearTarjetaProducto(producto) + '</div>';
        }).join('');

        const item = document.createElement('div');
        item.className = 'carousel-item' + (index === 0 ? ' active' : '');
        item.innerHTML = '<div class="' + rowClass + '">' + cols + '</div>';
        inner.appendChild(item);
    });

    bootstrap.Carousel.getOrCreateInstance(carousel, {
        ride: 'carousel',
        wrap: true,
        interval: 4000
    });
}

function mostrarErrorProductos(mensaje) {
    const error = document.getElementById('productos-error');
    if (error) {
        error.textContent = mensaje;
        error.hidden = false;
    }
}

async function cargarProductos() {
    try {
        const response = await fetch(PRODUCTOS_URL);

        if (!response.ok) {
            throw new Error('Error HTTP ' + response.status);
        }

        const data = await response.json();
        const productos = data.productos;

        if (!Array.isArray(productos) || productos.length === 0) {
            throw new Error('No hay productos disponibles');
        }

        CARRUSELES.forEach(function (config) {
            renderCarousel(config, productos);
        });
    } catch (error) {
        console.error('No se pudieron cargar los productos:', error);
        mostrarErrorProductos('No se pudieron cargar los productos. Intenta recargar la página.');
    }
}

function initMenuMobile() {
    document.querySelectorAll('.menu-lista a').forEach(function (link) {
        link.addEventListener('click', function () {
            const menu = document.getElementById('menuCollapse');

            if (menu && menu.classList.contains('show')) {
                bootstrap.Collapse.getOrCreateInstance(menu).hide();
            }
        });
    });
}

let toastTimeout;

function mostrarToastCarrito(nombreProducto) {
    const toast = document.getElementById('carrito-toast');
    const nombre = document.getElementById('carrito-toast-nombre');

    if (!toast) return;

    if (nombre) {
        nombre.textContent = nombreProducto;
    }

    clearTimeout(toastTimeout);

    toast.classList.remove('carrito-toast--visible');
    toast.setAttribute('aria-hidden', 'true');

    requestAnimationFrame(function () {
        toast.classList.add('carrito-toast--visible');
        toast.setAttribute('aria-hidden', 'false');
    });

    toastTimeout = setTimeout(function () {
        toast.classList.remove('carrito-toast--visible');
        toast.setAttribute('aria-hidden', 'true');
    }, 2000);
}

function initCarrito() {
    document.addEventListener('click', function (event) {
        const boton = event.target.closest('.producto-btn-carrito');

        if (!boton) return;

        event.preventDefault();
        event.stopPropagation();

        mostrarToastCarrito(boton.dataset.producto || 'Producto');
    });
}

document.addEventListener('DOMContentLoaded', function () {
    initMenuMobile();
    initCarrito();
    cargarProductos();
});
