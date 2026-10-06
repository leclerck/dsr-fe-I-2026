const CATEGORIAS = ['Videojuegos', 'Consolas', 'Accesorios'];

/* 
Componente para mostrar las categorías de productos
*/
function Categories() {
    return (
        <section className="section section-categories" id="categorias">
            <h2>Categorías</h2>
            <p>Revisa nuestro catálogo:</p>
            <ul className="lista-categorias">
                {CATEGORIAS.map((categoria) => (
                    <li key={categoria}>{categoria}</li>
                ))}
            </ul>
        </section>
    );
}

export default Categories;
