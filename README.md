# muevetechico

Web de la agencia de viajes **muevetechico**: rutas y experiencias reales, combos, blog, reviews y un estudio para editar todo.

El frontend es **Next.js**. El API es **Ruby on Rails**.

## Qué incluye

- Home con la misma onda del link de contacto (sol, tortuga, olas, botones de asesoría, guía de Málaga, eSIM y código de descuento)
- Combos de viaje y blogs, editables desde `/admin`
- Reviews que deja la gente (quedan pendientes hasta que las apruebes)
- Formularios de asesoría 1:1, diseño de viaje y guía de Málaga
- Textos, Instagram, mail y promos editables en **La web**

Instagram: [instagram.com/muevetechico](https://www.instagram.com/muevetechico/)

## Cómo correrla

Necesitás Ruby 3.2+, Bundler, Node 20+ y npm.

```bash
# API
cd backend
bundle config set --local path vendor/bundle
bundle install
bin/rails db:prepare
bin/rails db:seed
PORT=43124 bundle exec rails server -b 0.0.0.0 -p 43124
```

En otra terminal:

```bash
cd frontend
npm install
API_URL=http://127.0.0.1:43124 npm run dev -- -H 0.0.0.0 -p 43123
```

O las dos juntas:

```bash
chmod +x scripts/dev.sh
./scripts/dev.sh
```

- Sitio: [http://127.0.0.1:43123](http://127.0.0.1:43123)
- API: [http://127.0.0.1:43124](http://127.0.0.1:43124)
- Estudio: [http://127.0.0.1:43123/admin/login](http://127.0.0.1:43123/admin/login)

Usuario inicial del estudio:

- email: `hola@muevetechico.com`
- contraseña: `muevetechico`

Cambiá esos datos después del primer ingreso. El mail de contacto de la web se edita en **Estudio → La web**.

## Stack

| Parte | Carpeta | Rol |
| --- | --- | --- |
| Next.js + Tailwind + shadcn/ui | `frontend/` | Sitio público y panel |
| Rails 8 API + SQLite + Active Storage | `backend/` | Contenido, consultas, reviews |

Next proxea `/api/*` y `/rails/*` hacia Rails para no pelearse con CORS ni con las fotos subidas.
