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
│       ├── layout/           ← Header, Menu, Footer (+ CSS propios)
│       ├── products/         ← ProductCard, ProductCarousel
│       ├── cart/             ← Cart, CartToast
│       └── sections/         ← Categories
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
| `--color-superficie-alta` | `#334155` | Tarjetas y categorías |
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
Sticky. **Móvil (&lt;768px):** barra con hamburguesa + icono de carrito (enlace a `#carrito` con badge de cantidad); Collapse (`#menuCollapse`) se cierra al pulsar un enlace. **≥768px:** enlaces en fila, sin barra móvil.

### Secciones (`.content`, `.section`)
Contenedor flex con max-width 1200px. En desktop: productos (~65%) + columna lateral (~35%) con Categorías y Carrito.

### Productos (`.productos-carousel`)
Un solo carrusel React (`#productosCarousel`) que se remonta al cambiar el breakpoint (`key={porSlide}`):

| Viewport | Productos/slide |
|---|---|
| &lt; 768px | 1 |
| 768–1023px | 2 |
| ≥ 1024px | 4 |

Opciones: `ride: 'carousel'`, `wrap: true` (bucle), `interval: 4000`. Datos desde `public/assets/data/productos.json` con `fetch` + `useEffect` / `useState` (`estado`: `cargando` \| `listo` \| `error`).

Clases: `.producto-card`, `.producto-img`, `.producto-titulo`, `.producto-precio`, `.producto-desc`, `.producto-btn-carrito`.

**`:nth-child`:** pares → fondo alterno; primero → borde acento; último → título acento.

**Botón de producto:**
| Estado | Texto | Estilo |
|---|---|---|
| No está en el carrito | Añadir al carrito | Violeta (`.producto-btn-carrito`) |
| Ya está en el carrito | En Carrito | Teal (`.producto-btn-carrito--en-carrito`), `disabled` |

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

### Categorías (`.lista-categorias`)
Etiquetas tipo píldora con hover violeta.

### Footer (`.footer`, `#contacto`)
Contacto (`.direccion`) y redes (`.rrss-lista`). Instagram/YouTube con colores de marca en hover (`:nth-child`).

---

## Diseño responsivo

| Breakpoint | Menú | Productos | Layout |
|---|---|---|---|
| &lt; 768px | Hamburguesa + icono carrito | 1/slide | Columna |
| ≥ 768px | Fila | 2/slide | Columna; footer en fila |
| ≥ 1024px | Fila | 4/slide | Productos 65% + lateral 35%; carrito con scroll |

Media queries: `768px`, `1024px` (`index.css`, `App.css`, `Menu.css`, `Header.css`).

---

## Hover y accesibilidad

Hover en logo, menú, icono de carrito, secciones, tarjetas, botones, categorías y RRSS. `:focus-visible` en menú, RRSS y botones. Toast con `aria-live`. También: `scroll-behavior: smooth`, `alt` en imágenes, `aria-label` en nav, carrusel e icono de carrito.

---

## Referencia rápida de clases

| Clase / ID | Descripción |
|---|---|
| `.header`, `.logo`, `.subtitulo`, `.header-bienvenida` | Cabecera |
| `.menu`, `.menu-bar`, `.menu-acciones`, `.menu-carrito-icono`, `.menu-toggle`, `.menu-lista` | Navegación |
| `.content`, `.section`, `.columna-lateral` | Contenido |
| `#productosCarousel`, `.productos-carousel` | Carrusel |
| `.producto-card`, `.producto-*`, `.producto-btn-carrito--en-carrito` | Productos |
| `#carrito`, `.carrito-lista`, `.carrito-item`, `.carrito-btn` | Carrito |
| `.carrito-toast`, `.carrito-toast-*` | Toast |
| `.lista-categorias` | Categorías |
| `.footer`, `.direccion`, `.rrss-lista` | Pie de página |
