# Documentación de estilos — Alien Store

Este documento describe la hoja de estilos `styles.css`, utilizada en la página principal (`index.html`) de **Alien Store**.

---

## Estructura del proyecto

```
dsr-fe-I-2026/
├── index.html          # Página principal
├── css/
│   ├── styles.css      # Estilos globales y componentes
│   └── README.md       # Este archivo
└── img/                # Imágenes (logo, productos)
```

La hoja de estilos se enlaza desde el `<head>` de `index.html`:

```html
<link rel="stylesheet" href="css/styles.css">
```

Las fuentes **Inter** (texto) y **Rajdhani** (títulos) se cargan desde [Google Fonts](https://fonts.google.com/).

---

## Variables CSS (`:root`)

Todas las decisiones de diseño se centralizan en variables CSS para facilitar cambios globales.

### Colores

| Variable | Valor | Uso |
|---|---|---|
| `--color-fondo` | `#0f172a` | Fondo general de la página |
| `--color-superficie` | `#1e293b` | Header, nav, secciones, footer |
| `--color-superficie-alta` | `#334155` | Tarjetas de producto y etiquetas de categoría |
| `--color-texto` | `#f1f5f9` | Texto principal |
| `--color-texto-suave` | `#cbd5e1` | Párrafos secundarios y descripciones |
| `--color-acento` | `#a78bfa` | Acentos y bordes en hover |
| `--color-acento-oscuro` | `#7c3aed` | Bordes destacados y fondos en hover |
| `--color-acento-claro` | `#c4b5fd` | Subtítulos, enlaces y títulos de sección |
| `--color-borde` | `#475569` | Bordes de tarjetas, menú y footer |

La paleta usa **texto claro sobre fondo oscuro**, lo que mejora la legibilidad y cumple con un contraste adecuado según las pautas **WCAG AA**.

### Tipografía

| Variable | Valor |
|---|---|
| `--fuente-titulos` | `"Rajdhani", "Segoe UI", sans-serif` |
| `--fuente-texto` | `"Inter", "Segoe UI", sans-serif` |

- **Rajdhani**: encabezados (`h1`, `h2`, `h3`), menú, categorías y redes sociales.
- **Inter**: cuerpo de texto, párrafos y descripciones.

### Espaciado y medidas

| Variable | Valor | Uso |
|---|---|---|
| `--espacio` | `1rem` | Espaciado base |
| `--espacio-grande` | `2rem` | Márgenes y padding amplios |
| `--radio` | `12px` | Bordes redondeados |
| `--ancho-maximo` | `1200px` | Ancho máximo del contenido |

### Efectos

| Variable | Valor | Uso |
|---|---|---|
| `--sombra` | `0 4px 12px rgba(0,0,0,0.25)` | Sombra por defecto |
| `--sombra-hover` | `0 8px 24px rgba(124,58,237,0.35)` | Sombra al pasar el cursor |
| `--transicion` | `0.25s ease` | Duración de animaciones |

---

## Componentes y clases

### Header (`.header`)

- Contenedor flex en columna, centrado.
- Muestra el logo (`.logo`), el título (`h1`) y el subtítulo (`.subtitulo`).
- El logo crece ligeramente con un brillo al hacer hover sobre el header.
- El título usa `clamp()` para adaptar su tamaño entre móvil y escritorio.

### Navegación (`.menu`, `.menu-lista`)

- Barra **sticky** (permanece visible al hacer scroll).
- En móvil: enlaces apilados en columna.
- En tablet y superior: enlaces en fila horizontal.
- Hover y `:focus-visible`: fondo violeta, borde claro, elevación y sombra.

### Contenido principal (`.content`, `.section`)

- `.content` es el contenedor flex principal con ancho máximo de 1200px.
- Cada `.section` es una tarjeta con fondo, borde, sombra y padding.
- Al hacer hover, la sección resalta su borde y sombra.
- Los `h2` de sección tienen borde inferior y color de acento.

| Clase | Sección HTML |
|---|---|
| `.section-intro` | Bienvenida (`#inicio`) |
| `.section-products` | Productos destacados (`#productos`) |
| `.section-categories` | Categorías (`#categorias`) |

### Productos (`.grid-productos`, `.card`)

- `.grid-productos`: lista flex que organiza las tarjetas.
- `.card`: tarjeta individual con imagen (`.card-img`), título (`.card-titulo`) y descripción (`.card-desc`).
- Hover: la tarjeta se eleva (`translateY(-6px)`) y muestra borde y sombra de acento.

#### Selectores `:nth-child` en productos

| Selector | Efecto |
|---|---|
| `.grid-productos > li:nth-child(even) .card` | Fondo alterno en tarjetas pares (2.ª y 4.ª) |
| `.grid-productos > li:first-child .card` | Borde claro en la primera tarjeta (producto destacado) |
| `.grid-productos > li:last-child .card-titulo` | Título en color acento en la última tarjeta |

Estos selectores estilan por **posición en la lista**, sin clases extra en el HTML. Si se agregan o reordenan productos, los estilos se aplican automáticamente según el nuevo orden.

### Categorías (`.lista-categorias`)

- Etiquetas en forma de píldora (`border-radius: 999px`).
- Hover: cambio de color de fondo, elevación y sombra.

### Footer (`.footer`, `.footer-bloque`)

- Dos bloques: contacto (`.direccion`) y redes sociales (`.rrss-lista`).
- Enlaces externos (`https`) muestran el icono ↗ automáticamente.
- Enlaces de correo y teléfono tienen subrayado punteado.

#### Selectores `:nth-child` en redes sociales

| Selector | Efecto |
|---|---|
| `.rrss-lista li:nth-child(1) a:hover` | Fondo y borde rosa Instagram (`#e1306c`) |
| `.rrss-lista li:nth-child(2) a:hover` | Fondo y borde rojo YouTube (`#ff0000`) |

Los mismos colores se aplican con `:focus-visible` para mantener la accesibilidad con teclado. Estos estilos tienen mayor especificidad que el hover genérico de `.rrss-lista a`, por lo que sobrescriben el violeta por defecto.

---

## Diseño responsivo

El layout usa **Flexbox** y **media queries** con tres puntos de quiebre:

### Móvil (por defecto, < 768px)

- Menú en columna.
- Productos en una sola columna.
- Footer apilado verticalmente.

### Tablet (`min-width: 768px`)

- Menú en fila horizontal.
- Grid de productos en **2 columnas**.
- Footer en fila con bloques lado a lado.

### Escritorio (`min-width: 1024px`)

- Intro ocupa el ancho completo.
- Productos (65%) y categorías (35%) comparten la misma fila.
- Logo más grande (120px).

### Escritorio grande (`min-width: 1200px`)

- Grid de productos en **4 columnas**.

```
Móvil          Tablet           Escritorio              Escritorio grande
─────────      ──────────       ──────────────────      ──────────────────
[ Nav col ]    [ Nav row  ]     [ Nav row         ]     [ Nav row         ]
[ Intro   ]    [ Intro    ]     [ Intro           ]     [ Intro           ]
[ Prod 1  ]    [ P1 ] [ P2 ]    [ P1 ] [ P2 ]       [P1][P2][P3][P4]
[ Prod 2  ]    [ P3 ] [ P4 ]    [ P3 ] [ P4 ]  [Cat] [P1][P2][P3][P4]
[ Categ   ]    [ Footer   ]     [ Footer          ]     [ Footer          ]
[ Footer  ]
```

---

## Efectos hover y accesibilidad

| Elemento | Efecto al hover |
|---|---|
| Logo (dentro del header) | Escala 1.05 + brillo violeta |
| Enlaces del menú | Fondo, borde, elevación y sombra |
| Secciones | Borde y sombra de acento |
| Tarjetas de producto | Elevación y sombra |
| Tarjetas pares (2.ª, 4.ª) | Fondo alterno (vía `:nth-child(even)`) |
| Instagram (1.er enlace RRSS) | Fondo y borde rosa de marca |
| YouTube (2.º enlace RRSS) | Fondo y borde rojo de marca |
| Etiquetas de categoría | Fondo violeta y elevación |
| Enlaces mail/tel/https | Color más claro (`#ede9fe`) |

Además del hover, se usan estados **`:focus-visible`** en enlaces del menú y redes sociales para que la navegación con teclado sea visible (contorno violeta claro).

Otras consideraciones de accesibilidad:

- `scroll-behavior: smooth` para desplazamiento suave entre secciones.
- Imágenes con atributos `alt` descriptivos en el HTML.
- Nav con `aria-label="Menú"`.
- Contraste de color adecuado entre texto y fondo.

---

## Resumen de clases HTML ↔ CSS

| Clase en HTML | Descripción |
|---|---|
| `.header` | Cabecera con logo y título |
| `.logo` | Imagen del logo |
| `.subtitulo` | Texto "Gaming & más" |
| `.menu` / `.menu-lista` | Barra de navegación |
| `.content` | Contenedor principal |
| `.section` | Bloque de contenido genérico |
| `.grid-productos` | Lista de productos |
| `.card` / `.card-img` / `.card-titulo` / `.card-desc` | Tarjeta de producto |
| `.lista-categorias` | Etiquetas de categorías |
| `.footer` / `.footer-bloque` | Pie de página |
| `.direccion` | Datos de contacto |
| `.rrss-lista` | Enlaces a redes sociales |
