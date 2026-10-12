# Alien Store (React + Vite)

Tienda de videojuegos migrada a **React 19** + **Vite 8**, con **Bootstrap 5.3.8** (Carousel y Collapse).

## Cómo arrancar

```bash
npm install
npm run dev
```

| Script | Uso |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Vista previa del build |
| `npm run lint` | Oxlint |

---

## Estructura

```
alien-store/
├── public/assets/
│   ├── data/productos.json   ← Fetch en runtime
│   └── img/                  ← Imágenes de productos
├── src/
│   ├── assets/img/logo.png   ← Importado por Vite
│   ├── index.css             ← Variables globales, reset, tipografía
│   ├── App.jsx / App.css     ← Estado, layout, carrito, productos
│   ├── main.jsx              ← Bootstrap CSS → bootstrap → index.css
│   ├── utils/precios.js      ← parsePrecio / formatearPrecio
│   └── components/
│       ├── layout/           ← Header, Menu, Footer, ContactForm
│       ├── products/         ← ProductCard, ProductCarousel
│       ├── cart/             ← Cart, CartToast
│       └── sections/         ← ProductCatalog
```

**Carga de estilos:** Bootstrap CSS → `index.css` → CSS de componentes / `App.css` (el orden en `main.jsx` evita que Bootstrap pise los estilos propios).

**Assets:** lo que se `import`a va en `src/assets/`; lo que se referencia por URL (`fetch`, `src` desde JSON) va en `public/`.

**Bootstrap usado:** Carousel (productos), Collapse (menú móvil), Grid (`.row`, `.col-*`). Las tarjetas usan `.producto-card` (no `.card` de Bootstrap).

---

## Variables CSS (`:root` en `index.css`)

Paleta oscura con contraste **WCAG AA**. Cambios globales se hacen editando `:root`.

| Variable | Valor | Uso |
|---|---|---|
| `--color-fondo` | `#0f172a` | Fondo de página |
| `--color-superficie` | `#1e293b` | Header, nav, secciones, footer |
| `--color-superficie-alta` | `#334155` | Tarjetas y filtros |
| `--color-texto` / `--color-texto-suave` | `#f1f5f9` / `#cbd5e1` | Texto principal y secundario |
| `--color-acento` / `-oscuro` / `-claro` | `#a78bfa` / `#7c3aed` / `#c4b5fd` | Acentos, hover, precios |
| `--color-borde` | `#475569` | Bordes |
| `--fuente-titulos` / `--fuente-texto` | Rajdhani / Inter | Títulos y cuerpo |
| `--espacio` / `--espacio-grande` | `1rem` / `2rem` | Espaciado |
| `--ancho-maximo` | `1200px` | Ancho del contenido |
| `--sombra` / `--sombra-hover` | — | Sombras normal y hover |
| `--transicion` | `0.25s ease` | Animaciones |

---

## Componentes

### Header (`.header`)
Logo, título, subtítulo y mensaje de bienvenida (`.header-bienvenida`) en un solo bloque. `id="inicio"` para el enlace del menú. Hover: escala + brillo del logo.

### Navegación (`.menu`)
Sticky. Enlaces: **Inicio**, **Productos** (`#productos`, abre el catálogo), **Contacto**, **Carrito**. **Móvil (&lt;768px):** barra con hamburguesa + icono de carrito (enlace a `#carrito` con badge de cantidad); Collapse (`#menuCollapse`) se cierra al pulsar un enlace. **≥768px:** enlaces en fila, sin barra móvil.

### Secciones (`.content`, `.section`)
Contenedor flex con max-width 1200px. En desktop: destacados (`#destacados`, ~65%) + columna lateral (~35%) solo con el carrito. El catálogo (`.section-catalogo`) va debajo, a ancho completo (`flex: 1 1 100%`).

### Productos destacados (`.productos-carousel`, `#destacados`)
Un solo carrusel React (`#productosCarousel`) que se remonta al cambiar el breakpoint (`key={porSlide}`):

| Viewport | Productos/slide |
|---|---|
| &lt; 768px | 1 |
| 768–1023px | 2 |
| ≥ 1024px | 4 |

Opciones: `ride: 'carousel'`, `wrap: true` (bucle), `interval: 4000`. Datos desde `public/assets/data/productos.json` con `fetch` + `useEffect` / `useState` (`estado`: `cargando` \| `listo` \| `error`).

`ProductCard` recibe `compacto` en el carrusel:

| | Carrusel (`compacto`) | Catálogo |
|---|---|---|
| Descripción | Oculta | Visible (`.producto-desc`) |
| Botón | Icono carrito + (`.producto-btn-carrito--icono`) | Texto «Añadir al carrito» |
| Precio | Hueco fijo sobre el botón (el título absorbe la altura) | Debajo del título |

Imágenes (`.producto-img`): alto fijo **200px**, `object-fit: cover`.

**`:nth-child`:** pares → fondo alterno; primero → borde acento; último → título acento.

**Botón de producto:**
| Estado | Catálogo | Carrusel | Estilo |
|---|---|---|---|
| No está en el carrito | Añadir al carrito | Icono carrito + | Violeta (`.producto-btn-carrito`) |
| Ya está en el carrito | En Carrito | Icono carrito (sin +) | Teal (`.producto-btn-carrito--en-carrito`), `disabled` |

### Carrito (`.section-cart`, `#carrito`)

Estado en `App.jsx` con `useState`: lista de `{ producto, cantidad }`.

| Acción | Función |
|---|---|
| Añadir (desde producto o `+`) | `agregarAlCarrito` |
| Restar una unidad (`−`) | `quitarUno` (elimina el ítem si llega a 0) |
| Quitar del todo | `eliminarDelCarrito` |
| Vaciar | `vaciarCarrito` |

Layout de cada ítem (grid): imagen + info arriba; controles `−` / cantidad / `+` y **Quitar** abajo (evita solapamiento con el precio). En **≥1024px**, `.carrito-lista` tiene `max-height: 24rem` y scroll vertical.

### Precios (`src/utils/precios.js`)

En `productos.json`, `precio` es un número en string sin símbolo (ej. `"5900"`, `"129000"`). Este módulo lo convierte y formatea para la UI; lo usan `ProductCard` y `Cart`.

| Función | Entrada | Salida | Uso |
|---|---|---|---|
| `parsePrecio` | string o number | número (`0` si es inválido) | Totales y cálculos; acepta dígitos o valores ya numéricos |
| `formatearPrecio` | número | string `es-CL` con `$` | Mostrar precios (ej. `5900` → `$5.900`) |

### Toast (`.carrito-toast`)

Confirmación tipo ticket al añadir. Misma idea que la versión estática:

| Elemento | Clase | Función |
|---|---|---|
| Contenedor | `.carrito-toast` | Fijo (`z-index: 9999`) |
| Visible | `.carrito-toast--visible` | `opacity`, `visibility`, animación |
| Ticket | `.carrito-toast-ticket` | Fondo claro, borde punteado, muescas |
| Título | `.carrito-toast-titulo` | **Listo** |
| Nombre | `.carrito-toast-nombre` | Producto añadido |

Duración: **2 s**. Transición CSS: **0.3 s**. Visibilidad por clase (no `hidden`). `aria-live="polite"`.

### Catálogo (`.section-catalogo`, `#productos`)
Colapsado inicialmente al cargar (`catalogoAbierto` en `App.jsx`). Se abre con el enlace **Productos** del menú o con el título **Todos los productos** / el botón chevron (`.catalogo-toggle`). El mismo control lo cierra.

Filtros (`.lista-categorias`): píldoras `Todas` + `categoria` única de `productos.json`, ordenadas. La activa usa `.lista-categorias-filtro--activo`. El grid (`.catalogo-grid`) reutiliza `ProductCard` y tiene `max-height: 60vh` con scroll.

### Footer (`.footer`, `#contacto`)
Dirección (`.direccion`), redes (`.rrss-lista`) y formulario (`ContactForm`). Instagram/YouTube con colores de marca en hover (`:nth-child`).

**Formulario** (validación en el cliente, formato antes que longitud):

| Campo | Regla |
|---|---|
| Nombre | Solo letras (admite espacio, guion y apóstrofo). 2–30 caracteres |
| Correo | Formato `usuario@dominio.ext`, sin espacios. Máximo 80 |
| Mensaje | 10–400 caracteres |

Campo inválido: borde rojo (`.contacto-campo--invalido`) y alerta (`.contacto-alerta`, `role="alert"`). Si el envío es válido, se limpia el formulario y se muestra «Mensaje enviado. Gracias por escribirnos.» No hay backend.

---

## Diseño responsivo

| Breakpoint | Menú | Productos | Layout |
|---|---|---|---|
| &lt; 768px | Hamburguesa + icono carrito | 1/slide | Columna |
| ≥ 768px | Fila | 2/slide | Columna; footer en fila |
| ≥ 1024px | Fila | 4/slide | Destacados 65% + carrito 35%; catálogo al 100% debajo; carrito con scroll |

Media queries: `768px`, `1024px` (`index.css`, `App.css`, `Menu.css`, `Header.css`).

---

## Hover y accesibilidad

Hover en logo, menú, icono de carrito, secciones, tarjetas, botones, filtros y RRSS. `:focus-visible` en menú, RRSS, botones y campos del formulario. Toast con `aria-live`. Catálogo: `aria-expanded` en el título y el chevron. Formulario: `aria-invalid` y `aria-describedby` en cada campo. También: `scroll-behavior: smooth`, `alt` en imágenes, `aria-label` en nav, carrusel e icono de carrito.

---

## Referencia rápida de clases

| Clase / ID | Descripción |
|---|---|
| `.header`, `.logo`, `.subtitulo`, `.header-bienvenida` | Cabecera |
| `.menu`, `.menu-bar`, `.menu-acciones`, `.menu-carrito-icono`, `.menu-toggle`, `.menu-lista` | Navegación |
| `.content`, `.section`, `.columna-lateral` | Contenido |
| `#destacados`, `#productosCarousel`, `.productos-carousel` | Carrusel de destacados |
| `.producto-card`, `.producto-card--compacto`, `.producto-*`, `.producto-btn-carrito--icono`, `.producto-btn-carrito--en-carrito` | Productos |
| `#productos`, `.section-catalogo`, `.catalogo-titulo`, `.catalogo-toggle`, `.catalogo-grid` | Catálogo |
| `.lista-categorias`, `.lista-categorias-filtro--activo` | Filtros del catálogo |
| `#carrito`, `.carrito-lista`, `.carrito-item`, `.carrito-btn` | Carrito |
| `.carrito-toast`, `.carrito-toast-*` | Toast |
| `.footer`, `.direccion`, `.rrss-lista`, `.contacto-form`, `.contacto-alerta` | Pie de página y formulario |
