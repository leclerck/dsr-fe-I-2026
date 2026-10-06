/* 
Componente para mostrar el footer de la página
*/
function Footer() {
    return (
        <footer className="footer" id="contacto">
            <div className="footer-bloque">
                <h2>Visítanos</h2>
                <address className="direccion">
                    Av. Los Libertadores 1234, Santiago, Chile<br />
                    Teléfono: <a href="tel:+56221234567">+56 2 2123 4567</a><br />
                    Correo: <a href="mailto:contacto@alienstore.com">contacto@alienstore.com</a>
                </address>
            </div>

            <div className="footer-bloque">
                <h2>Síguenos</h2>
                <ul className="rrss-lista">
                    <li><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                    <li><a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">YouTube</a></li>
                </ul>
            </div>

            <p>Copyright &copy; 2026 Alien Store.</p>
        </footer>
    );
}

export default Footer;
