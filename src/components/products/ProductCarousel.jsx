import { useEffect, useRef, useState } from 'react';
import { Carousel } from 'bootstrap';
import ProductCard from './ProductCard';

const CAROUSEL_ID = 'productosCarousel';

const COLUMNAS = { 1: 'col-12', 2: 'col-6', 4: 'col-3' };

/* 
Función para obtener el número de productos por slide en función del ancho de la pantalla
@returns {number} Número de productos por slide
*/
function obtenerPorSlide() {
    if (window.matchMedia('(min-width: 1024px)').matches) return 4;
    if (window.matchMedia('(min-width: 768px)').matches) return 2;
    return 1;
}

/* 
Función para dividir un array en grupos de tamaño específico
@param {Array} array - Array a dividir
@param {number} size - Tamaño de los grupos
@returns {Array} Array de grupos
*/
function chunk(array, size) {
    const grupos = [];

    for (let i = 0; i < array.length; i += size) {
        grupos.push(array.slice(i, i + size));
    }

    return grupos;
}

/* 
Componente para mostrar el carrusel de productos
@param {Object[]} productos - Lista de productos a mostrar
@param {number} porSlide - Número de productos por slide
@param {Function} onAdd - Función para agregar un producto al carrito
@param {string[]} titulosEnCarrito - Lista de títulos de productos en el carrito
*/
function CarouselSlides({ productos, porSlide, onAdd, titulosEnCarrito }) {
    const carouselRef = useRef(null);
    const grupos = chunk(productos, porSlide);

    useEffect(() => {
        const instancia = Carousel.getOrCreateInstance(carouselRef.current, {
            ride: 'carousel',
            wrap: true,
            interval: 4000,
        });

        return () => instancia.dispose();
    }, []);

    return (
        <div id={CAROUSEL_ID} ref={carouselRef} className={`carousel slide productos-carousel productos-carousel--${porSlide}`}>
            <div className="carousel-indicators">
                {grupos.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target={`#${CAROUSEL_ID}`}
                        data-bs-slide-to={index}
                        className={index === 0 ? 'active' : undefined}
                        aria-current={index === 0 ? 'true' : undefined}
                        aria-label={`Slide ${index + 1}`}
                    />
                ))}
            </div>

            <div className="carousel-inner">
                {grupos.map((grupo, index) => (
                    <div key={index} className={`carousel-item${index === 0 ? ' active' : ''}`}>
                        <div className={`row g-3 productos-fila${porSlide === 1 ? ' justify-content-center' : ''}`}>
                            {grupo.map((producto) => (
                                <div key={producto.titulo} className={COLUMNAS[porSlide]}>
                                    <ProductCard
                                        producto={producto}
                                        onAdd={onAdd}
                                        enCarrito={titulosEnCarrito.includes(producto.titulo)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target={`#${CAROUSEL_ID}`} data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={`#${CAROUSEL_ID}`} data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Siguiente</span>
            </button>
        </div>
    );
}

function ProductCarousel({ productos, onAdd, titulosEnCarrito }) {
    const [porSlide, setPorSlide] = useState(obtenerPorSlide);

    useEffect(() => {
        const actualizar = () => setPorSlide(obtenerPorSlide());

        window.addEventListener('resize', actualizar);
        return () => window.removeEventListener('resize', actualizar);
    }, []);

    return (
        <CarouselSlides
            key={porSlide}
            productos={productos}
            porSlide={porSlide}
            onAdd={onAdd}
            titulosEnCarrito={titulosEnCarrito}
        />
    );
}

export default ProductCarousel;
