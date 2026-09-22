# Documentación de estilos — Alien Store

Documentación de `styles.css` e integración con **Bootstrap 5.3.8** en `index.html`.

## Estructura

```
dsr-fe-I-2026/
├── index.html
└── assets/
    ├── css/styles.css
    ├── js/app.js
    ├── data/productos.json
    └── img/
```

**Carga de recursos:** Google Fonts → Bootstrap CSS → `assets/css/styles.css` → Bootstrap JS → `assets/js/app.js`.

| Atributo CDN | Función |
|---|---|
| `integrity` | Verifica que el archivo del CDN no fue alterado (SRI) |
| `crossorigin="anonymous"` | Petición cross-origin sin credenciales; requerido para SRI |

**Bootstrap usado:** Carousel (productos), Collapse (menú móvil), Grid (`.row`, `.col-*`), utilidades (`d-md-none`, etc.).

Los productos usan `.producto-card` (no `.card` de Bootstrap) para evitar conflictos.

---

## Variables CSS (`:root`)

Paleta oscura con contraste **WCAG AA**. Cambios globales se hacen editando `:root` en `styles.css`.

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
Logo, título y subtítulo centrados. Hover en header: escala + brillo del logo.

### Navegación (`.menu`)
Sticky. **Móvil:** hamburguesa + Collapse (`#menuCollapse`); se cierra al pulsar un enlace. **≥768px:** enlaces en fila, sin hamburguesa.

### Secciones (`.content`, `.section`)
Contenedor flex con max-width 1200px. Secciones: `.section-intro`, `.section-products`, `.section-categories`.

### Productos (`.productos-carousel`)
Tres carruseles (Bootstrap muestra un slide a la vez, una fila por slide):

| Viewport | ID | Productos/slide | Slides |
|---|---|---|---|
| < 768px | `#productosCarouselMobile` | 1 | 8 |
| 768–1023px | `#productosCarouselTablet` | 2 | 4 |
| ≥ 1024px | `#productosCarouselDesktop` | 4 | 2 |

Atributos: `data-bs-ride`, `data-bs-wrap="true"` (bucle infinito), `data-bs-interval="4000"`.

Clases de tarjeta: `.producto-card`, `.producto-img`, `.producto-titulo`, `.producto-precio`, `.producto-desc`, `.producto-btn-carrito`.

Los productos se cargan desde `assets/data/productos.json` con Fetch API (`assets/js/app.js`).

**`:nth-child` en productos:** pares → fondo alterno; primero → borde acento; último → título acento.

### Carrito y toast (`.producto-btn-carrito`, `#carrito-toast`)

Cada tarjeta incluye el botón **Añadir al carrito**. Al pulsarlo, `initCarrito()` en `app.js` muestra un toast tipo ticket en la esquina inferior derecha.

| Elemento | Clase / ID | Función |
|---|---|---|
| Botón | `.producto-btn-carrito` | Dispara la confirmación; guarda el nombre en `data-producto` |
| Contenedor | `#carrito-toast` | Toast fijo (`z-index: 9999`) |
| Ticket | `.carrito-toast-ticket` | Fondo claro, borde punteado, muescas circulares |
| Visible | `.carrito-toast--visible` | Activa `opacity`, `visibility` y animación de entrada |
| Texto | `.carrito-toast-titulo` | Muestra **Listo** |
| Producto | `#carrito-toast-nombre` | Nombre del producto añadido |

**Comportamiento (JS):**
- Delegación de eventos en `document` (funciona con tarjetas generadas dinámicamente).
- Duración visible: **2 segundos** (`setTimeout` en `mostrarToastCarrito()`).
- Transición CSS: **0.3s** (`opacity`, `transform`, `visibility`).
- Visibilidad controlada por clase CSS (no usa el atributo HTML `hidden`).
- `aria-live="polite"` y `aria-hidden` para lectores de pantalla.

**Personalizar:** cambia la duración en `app.js` (valor `2000`) o la posición/estilo en `.carrito-toast` dentro de `styles.css`.

### Categorías (`.lista-categorias`)
Etiquetas tipo píldora con hover violeta.

### Footer (`.footer`, `#contacto`)
Contacto (`.direccion`) y redes (`.rrss-lista`). Instagram/YouTube con colores de marca en hover (`:nth-child(1)` rosa, `:nth-child(2)` rojo).

---

## Diseño responsivo

| Breakpoint | Menú | Productos | Layout |
|---|---|---|---|
| < 768px | Hamburguesa | 1/slide | Columna |
| ≥ 768px | Fila | 2/slide | Columna; footer en fila |
| ≥ 1024px | Fila | 4/slide | Productos 65% + categorías 35% |

Media queries en `styles.css`: `768px`, `1024px`.

---

## Hover y accesibilidad

Hover en logo, menú, secciones, tarjetas, botón de carrito, categorías y RRSS (elevación, sombra, colores). `:focus-visible` en menú, RRSS y botón de carrito. Toast con `aria-live` para anunciar **Listo**. También: `scroll-behavior: smooth`, `alt` en imágenes, `aria-label` en nav y carrusel.

---

## Referencia rápida de clases

| Clase / ID | Descripción |
|---|---|
| `.header`, `.logo`, `.subtitulo` | Cabecera |
| `.menu`, `.menu-bar`, `.menu-toggle`, `.menu-lista` | Navegación |
| `.content`, `.section` | Contenido |
| `#productosCarouselMobile/Tablet/Desktop` | Carruseles |
| `.producto-card`, `.producto-*` | Tarjetas de producto |
| `.producto-btn-carrito` | Botón añadir al carrito |
| `#carrito-toast`, `.carrito-toast-*` | Toast de confirmación |
| `.lista-categorias` | Categorías |
| `.footer`, `.direccion`, `.rrss-lista` | Pie de página |

