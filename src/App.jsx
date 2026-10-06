import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/layout/Header'
import Menu from './components/layout/Menu'
import Footer from './components/layout/Footer'
import Categories from './components/sections/Categories'
import ProductCarousel from './components/products/ProductCarousel'
import Cart from './components/cart/Cart'
import CartToast from './components/cart/CartToast'

const PRODUCTOS_URL = `${import.meta.env.BASE_URL}assets/data/productos.json`

function App() {
  const [productos, setProductos] = useState([])
  const [estado, setEstado] = useState('cargando')
  const [carrito, setCarrito] = useState([])
  const [toast, setToast] = useState({ id: 0, nombre: '', visible: false })

  /* 
  Efecto para cargar los productos desde el archivo JSON
  */
  useEffect(() => {
    fetch(PRODUCTOS_URL)
      .then((response) => {
        if (!response.ok) throw new Error('Error HTTP ' + response.status)
        return response.json()
      })
      .then((data) => {
        setProductos(data.productos)
        setEstado('listo')
      })
      .catch((error) => {
        console.error('No se pudieron cargar los productos:', error)
        setEstado('error')
      })
  }, [])

  /* 
  Efecto para mostrar el toast del carrito de compras
  */
  useEffect(() => {
    if (!toast.visible) return

    const timer = setTimeout(() => {
      setToast((actual) => ({ ...actual, visible: false }))
    }, 2000)

    return () => clearTimeout(timer)
  }, [toast.id, toast.visible])

  /* 
  Función para agregar un producto al carrito
  @param {Object} producto - Producto a agregar
  */
  function agregarAlCarrito(producto) {
    setCarrito((actual) => {
      const existe = actual.some((item) => item.producto.titulo === producto.titulo)

      if (existe) {
        return actual.map((item) =>
          item.producto.titulo === producto.titulo
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }

      return [...actual, { producto, cantidad: 1 }]
    })

    setToast({ id: Date.now(), nombre: producto.titulo, visible: true })
  }

  /* 
  Función para quitar una unidad de un producto del carrito
  @param {string} titulo - Título del producto a quitar
  */
  function quitarUno(titulo) {
    setCarrito((actual) =>
      actual
        .map((item) =>
          item.producto.titulo === titulo ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    )
  }

  /* 
  Función para eliminar un producto del carrito
  @param {string} titulo - Título del producto a eliminar
  */
  function eliminarDelCarrito(titulo) {
    setCarrito((actual) => actual.filter((item) => item.producto.titulo !== titulo))
  }

  /* 
  Función para vaciar el carrito
  */
  function vaciarCarrito() {
    setCarrito([])
  }

  const cantidadCarrito = carrito.reduce((suma, item) => suma + item.cantidad, 0)

  return (
    <>
      <Header />
      <Menu cantidadCarrito={cantidadCarrito} />

      <main className="content">
        {/* Sección para mostrar los productos destacados */}
        <section className="section section-products" id="productos">
          <h2>Productos Destacados</h2>

          {estado === 'cargando' && <p className="productos-estado">Cargando productos...</p>}
          {estado === 'error' && (
            <p className="productos-estado">No se pudieron cargar los productos. Intenta recargar la página.</p>
          )}
          {estado === 'listo' && (
            <ProductCarousel
              productos={productos}
              onAdd={agregarAlCarrito}
              titulosEnCarrito={carrito.map((item) => item.producto.titulo)}
            />
          )}
        </section>

        {/* Sección para mostrar las categorías de productos y el carrito */}
        <div className="columna-lateral">
          <Categories />
          <Cart
            items={carrito}
            onAgregar={agregarAlCarrito}
            onQuitarUno={quitarUno}
            onEliminar={eliminarDelCarrito}
            onVaciar={vaciarCarrito}
          />
        </div>
      </main>

      <Footer />
      <CartToast nombre={toast.nombre} visible={toast.visible} />
    </>
  )
}

export default App
