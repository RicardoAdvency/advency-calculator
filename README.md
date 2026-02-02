# Advency - Landing Page

Landing page moderna y profesional para Advency, un sistema de ventas y seguimiento automatizado orientado a generar leads B2B.

## 🎯 Objetivo

Convertir visitantes en leads calificados (consultores solares, vendedores B2B, realtors, coaches y dueños de agencias) interesados en el sistema de ventas automatizado.

## ✨ Características

- **Diseño minimalista y moderno** estilo SaaS
- **Totalmente responsive** (mobile-first)
- **Animaciones suaves** al scroll y hover
- **Sin dependencias externas** - HTML, CSS y JavaScript vanilla
- **Optimizado para conversión** con CTAs estratégicos
- **Código limpio y comentado**

## 🎨 Paleta de Colores

- **Azul oscuro**: `#0A1F44` - Color principal
- **Celeste**: `#00B4D8` - Acentos y CTAs
- **Blanco**: `#FFFFFF` - Fondos
- **Gris claro**: `#F1F3F5` - Fondos alternativos

## 📋 Estructura de Secciones

1. **Hero Section** - Propuesta de valor principal con CTAs
2. **Problema** - Puntos de dolor del público objetivo
3. **Solución** - Beneficios del sistema todo-en-uno
4. **Features** - 6 características principales
5. **Cómo Funciona** - Proceso en 4 pasos
6. **Para Quién Es** - Segmentos objetivo
7. **CTA Final** - Llamado a la acción con urgencia

## 🚀 Instalación y Uso

### Opción 1: Uso Directo

Simplemente abre el archivo `index.html` en tu navegador:

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/advency-landing.git

# Navega al directorio
cd advency-landing

# Abre en el navegador
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

### Opción 2: Servidor Local

Si prefieres usar un servidor local:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (npx)
npx serve

# Con PHP
php -S localhost:8000
```

Luego visita `http://localhost:8000` en tu navegador.

## 📁 Estructura del Proyecto

```
advency-landing/
│
├── index.html          # Landing page completa
├── README.md           # Este archivo
├── LICENSE             # Licencia del proyecto
└── .gitignore         # Archivos ignorados por Git
```

## 🎯 Puntos de Conversión

### CTAs Principales:
- **"Solicitar demo"** - Header y Hero section
- **"Ver cómo funciona"** - Hero section (scroll suave)
- **"Activar Advency ahora"** - CTA final

### Próximos Pasos de Integración:
Los botones CTA están preparados para conectarse con:
- Formulario de captura de leads
- Sistema de agendamiento de demos
- CRM o herramienta de marketing automation
- Pixel de tracking (Facebook, Google Ads)

## 🛠️ Personalización

### Cambiar Textos
Edita directamente el contenido HTML en `index.html`

### Modificar Colores
Actualiza las variables CSS en la sección `:root`:

```css
:root {
    --color-dark-blue: #0A1F44;
    --color-light-blue: #00B4D8;
    --color-white: #FFFFFF;
    --color-light-gray: #F1F3F5;
}
```

### Agregar Analytics
Inserta tu código de tracking antes del cierre de `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=TU-ID"></script>
<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)...
</script>
```

## 📱 Compatibilidad

- ✅ Chrome (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari (últimas 2 versiones)
- ✅ Edge (últimas 2 versiones)
- ✅ Dispositivos móviles (iOS y Android)

## 🔧 Próximas Mejoras Sugeridas

- [ ] Integración con formulario de captura (Typeform, Calendly, etc.)
- [ ] Sistema de A/B testing para optimizar conversión
- [ ] Chat en vivo o chatbot
- [ ] Video demo del producto
- [ ] Testimonios de clientes
- [ ] Sección de preguntas frecuentes (FAQ)
- [ ] Calculadora ROI interactiva
- [ ] Prueba social (número de usuarios, empresas)

## 📊 Optimización SEO

### Pendiente de agregar:
- Meta tags (description, keywords, Open Graph)
- Schema.org markup
- Sitemap.xml
- Robots.txt
- Optimización de velocidad de carga
- Lazy loading de imágenes

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

Para consultas sobre el proyecto o Advency:
- Website: [Agrega tu URL]
- Email: [Agrega tu email]

---

**Desarrollado con 💙 para convertir más leads en clientes**
