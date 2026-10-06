import logo from '../../assets/img/logo.png';
import './Header.css';

/* 
Componente para mostrar el header de la página
*/
function Header() {
    return (
        <header className="header" id="inicio">
            <img className="logo" src={logo} alt="Logo de Alien Store: un alien de videojuegos" width="120" height="120" />
            <h1>Alien Store</h1>
            <p className="subtitulo">Gaming & más</p>
            <p className="header-bienvenida">
                Bienvenido a la tienda: encuentra videojuegos para todas las
                plataformas y accesorios para tus dispositivos.
            </p>
        </header>
    );
}

export default Header;
