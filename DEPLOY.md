# 🚀 Guía de Despliegue en GitHub

## Paso 1: Crear Repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `advency-landing` (o el que prefieras)
3. Descripción: "Landing page profesional para Advency - Sistema de ventas automatizado"
4. Selecciona **Público** o **Privado**
5. NO inicialices con README (ya lo tenemos)
6. Click en **Create repository**

## Paso 2: Subir Archivos al Repositorio

### Opción A: Usando Git desde la terminal

```bash
# 1. Navega a la carpeta donde están los archivos
cd /ruta/a/tus/archivos

# 2. Inicializa Git
git init

# 3. Agrega todos los archivos
git add .

# 4. Haz el primer commit
git commit -m "Initial commit: Advency landing page"

# 5. Conecta con tu repositorio de GitHub
git remote add origin https://github.com/TU-USUARIO/advency-landing.git

# 6. Cambia el nombre de la rama a main (si es necesario)
git branch -M main

# 7. Sube los archivos
git push -u origin main
```

### Opción B: Usando GitHub Desktop

1. Abre GitHub Desktop
2. File → Add Local Repository
3. Selecciona la carpeta con tus archivos
4. Click en "Publish repository"
5. Elige nombre y privacidad
6. Click en "Publish"

### Opción C: Subida Manual (Más Simple)

1. Ve a tu repositorio en GitHub
2. Click en "uploading an existing file"
3. Arrastra los 4 archivos:
   - `index.html`
   - `README.md`
   - `LICENSE`
   - `.gitignore`
4. Escribe un mensaje de commit
5. Click en "Commit changes"

## Paso 3: Activar GitHub Pages (Hosting Gratis)

1. En tu repositorio, ve a **Settings**
2. En el menú lateral, click en **Pages**
3. En "Source", selecciona **main** branch
4. Click en **Save**
5. Espera 1-2 minutos

✅ Tu sitio estará disponible en:
```
https://TU-USUARIO.github.io/advency-landing/
```

## Paso 4: Configurar Dominio Personalizado (Opcional)

### Si tienes un dominio (ej: www.advency.com):

1. En GitHub Pages settings, agrega tu dominio en "Custom domain"
2. En tu proveedor de dominio (GoDaddy, Namecheap, etc.), agrega estos registros DNS:

**Para dominio raíz (advency.com):**
```
Tipo: A
Host: @
Valor: 185.199.108.153
Valor: 185.199.109.153
Valor: 185.199.110.153
Valor: 185.199.111.153
```

**Para subdominio (www.advency.com):**
```
Tipo: CNAME
Host: www
Valor: TU-USUARIO.github.io
```

3. Espera 24-48 horas para propagación DNS
4. En GitHub Pages, marca "Enforce HTTPS"

## Paso 5: Verificar Funcionamiento

1. Visita tu URL de GitHub Pages
2. Verifica que todo se vea correctamente
3. Prueba en móvil y desktop
4. Verifica que los botones funcionen

## 📝 Comandos Git Útiles

### Actualizar el sitio después de hacer cambios:

```bash
# 1. Verifica qué archivos cambiaron
git status

# 2. Agrega los cambios
git add .

# 3. Haz commit con mensaje descriptivo
git commit -m "Actualizar textos de la sección hero"

# 4. Sube los cambios
git push
```

### Ver historial de cambios:
```bash
git log --oneline
```

### Deshacer último commit (sin perder cambios):
```bash
git reset --soft HEAD~1
```

## 🔧 Solución de Problemas

### Problema: "Git no reconocido"
**Solución:** Instala Git desde https://git-scm.com/downloads

### Problema: "Permission denied"
**Solución:** Configura SSH keys o usa HTTPS con token personal

### Problema: "El sitio no se actualiza"
**Solución:** 
- Espera 5-10 minutos
- Limpia caché del navegador (Ctrl + Shift + R)
- Verifica que hiciste push correctamente

### Problema: "404 Not Found en GitHub Pages"
**Solución:**
- Verifica que el archivo se llame `index.html` (no `Index.html`)
- Asegúrate de seleccionar la rama correcta en Settings → Pages

## 📊 Analítica y Tracking (Siguiente Paso)

Para agregar Google Analytics o Meta Pixel, edita `index.html` y agrega el código antes de `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## ✅ Checklist Final

- [ ] Repositorio creado en GitHub
- [ ] Archivos subidos correctamente
- [ ] GitHub Pages activado
- [ ] Sitio accesible y funcionando
- [ ] Probado en móvil y desktop
- [ ] CTAs apuntan a tus formularios/calendarios
- [ ] Analytics configurado (opcional)
- [ ] Dominio personalizado configurado (opcional)

## 🎉 ¡Listo!

Tu landing page está ahora en producción. Comparte el link y empieza a generar leads.

---

**¿Necesitas ayuda?** Abre un Issue en el repositorio.
