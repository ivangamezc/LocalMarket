# 🛒 LocalMarket - Plataforma E-commerce

Plataforma de comercio electrónico moderna, ultrarrápida y escalable. Construida con una arquitectura *frontend* estática/dinámica híbrida y un *backend-as-a-service* robusto, diseñada para ofrecer la mejor experiencia de usuario y rendimiento SEO.

## 🚀 Tecnologías Principales

El proyecto hace uso de un stack tecnológico moderno enfocado en la velocidad y la experiencia de desarrollo (DX):

* **Frontend:** [Astro](https://astro.build/) (Framework principal para renderizado ultrarrápido).
* **Estilos:** Tailwind CSS (Framework de utilidades CSS).
* **Estado Global:** Nanostores (Gestión ligera del carrito de compras).
* **Backend & Base de Datos:** [Supabase](https://supabase.com/) (Autenticación y base de datos PostgreSQL).
* **Testing E2E:** [Playwright](https://playwright.dev/) (Pruebas de automatización web).
* **CI/CD:** GitHub Actions (Integración continua) + Vercel (Despliegue de producción).
* **Gestor de Paquetes:** `pnpm` (Rápido y eficiente en espacio).

---

## ⚙️ Requisitos Previos

Asegúrate de tener instalados los siguientes componentes en tu sistema local antes de empezar:

* **Node.js** (Versión 20 o superior / LTS recomendada).
* **pnpm** (Se puede instalar globalmente ejecutando `npm install -g pnpm`).
* **Git** para el control de versiones.

---

## 🛠️ Instalación y Configuración Local

Sigue estos pasos para arrancar el entorno de desarrollo en tu máquina:

1. **Clona el repositorio:**
   ```bash
   git clone [https://github.com/tu-usuario/LocalMarket.git](https://github.com/tu-usuario/LocalMarket.git)
   cd LocalMarket
Instala las dependencias:
Utilizamos pnpm para garantizar la consistencia y velocidad en la instalación.

Bash
pnpm install
Configuración de Variables de Entorno:
El proyecto requiere conexión a Supabase. Crea un archivo llamado .env en la raíz del proyecto y añade tus credenciales (solicítalas al administrador si no las tienes):

Fragmento de código
PUBLIC_SUPABASE_URL=tu_url_de_supabase_aqui
PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase_aqui
Levanta el servidor de desarrollo:

Bash
pnpm dev
La aplicación estará disponible de forma local en http://localhost:4321.

🧪 Testing y Control de Calidad (QA)
LocalMarket cuenta con una suite de pruebas End-to-End (E2E) para garantizar que los flujos críticos de negocio (búsqueda, filtros, carrito y checkout) funcionan sin errores.

Para ejecutar la suite completa de pruebas de forma local:

Bash
pnpm playwright test
Para abrir la interfaz gráfica de Playwright y visualizar los tests paso a paso:

Bash
pnpm playwright test --ui
Nota sobre Integración Continua (CI): > El proyecto incluye un pipeline automatizado en GitHub Actions (.github/workflows/playwright.yml). Cada push a la rama principal dispara las pruebas de forma remota contra el entorno de producción (Vercel), asegurando despliegues libres de fallos.

📂 Estructura del Proyecto
La arquitectura del código sigue los estándares de Astro, separando claramente los componentes UI, la lógica de estado y las rutas de páginas:

Plaintext
LocalMarket
├── README.md                 # Documentación del proyecto
├── astro.config.mjs          # Configuración del framework Astro
├── package.json              # Manifiesto del proyecto y scripts
├── playwright.config.ts      # Configuración de los tests automatizados E2E
├── public/                   # Archivos estáticos accesibles directamente (imágenes, favicons)
│   ├── Logo_LocalMarket.png
│   └── ...
├── src/                      # Código fuente de la aplicación principal
│   ├── assets/               # Recursos vectoriales y fondos
│   ├── components/           # Componentes UI reutilizables (Hero, Card, Footer, etc.)
│   ├── data/                 # Datos estáticos o mockups (products.json)
│   ├── layouts/              # Plantillas maestras de diseño de la web
│   ├── lib/                  # Lógica de conexión externa (supabaseClient.js)
│   ├── pages/                # Enrutamiento automático basado en archivos (Rutas y vistas)
│   │   ├── admin/            # Vistas del dashboard de administración
│   │   ├── productos/        # Vistas dinámicas de productos ([id].astro)
│   │   └── ...               # Páginas públicas (index, carrito, faq, login)
│   ├── store/                # Lógica de estado global (cartStore.js)
│   └── styles/               # Hojas de estilo globales (global.css)
└── tests/                    # Ecosistema de aseguramiento de calidad (QA)
    ├── crm-erp/              # Pruebas de integración del panel de administración
    ├── e2e/                  # Pruebas End-to-End de flujos de usuario (compra, búsqueda)
    ├── regression/           # Pruebas de regresión para evitar reintroducir bugs
    └── smoke/                # Pruebas de humo para validación rápida del entorno
    
