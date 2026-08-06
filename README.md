# LocalBoost

Sitio web estático y responsive para una agencia de marketing digital especializada en pequeños negocios.

## Incluye

- Landing page profesional y adaptable a móvil.
- Servicios, proceso, proyectos de muestra, planes, FAQ y formulario.
- Páginas legales de plantilla.
- Animaciones ligeras con JavaScript nativo.
- SEO y metadatos sociales básicos.
- Flujo automático de despliegue en GitHub Pages.
- Sin dependencias ni proceso de compilación.

## Personalización antes de publicar

Busca y reemplaza estos datos:

- `hola@localboost.es`
- `+34 600 000 000`
- `34600000000` en el enlace de WhatsApp
- Datos legales de `privacidad.html` y `aviso-legal.html`
- Precios, testimonios y proyectos de muestra

## Subir a GitHub

1. Crea un repositorio vacío llamado `localboost`.
2. Descomprime este proyecto.
3. Abre una terminal dentro de la carpeta y ejecuta:

```bash
git init
git add .
git commit -m "Publicar web de LocalBoost"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/localboost.git
git push -u origin main
```

## Activar GitHub Pages

1. En el repositorio, entra en **Settings → Pages**.
2. En **Build and deployment**, selecciona **GitHub Actions**.
3. El flujo de `.github/workflows/pages.yml` publicará la web automáticamente.
4. La dirección será similar a `https://TU-USUARIO.github.io/localboost/`.

## Formulario

El formulario actual funciona como demostración y no envía correos. Puedes conectarlo a Formspree, Netlify Forms, Basin o un backend propio.

## Desarrollo local

Puedes abrir `index.html` directamente o iniciar un servidor local:

```bash
python3 -m http.server 8000
```

Después visita `http://localhost:8000`.

## Licencia

MIT. Consulta `LICENSE`.
