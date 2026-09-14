# muevetechico

Web de la agencia de viajes **muevetechico**: rutas y experiencias reales, combos, blog, reviews y un estudio para editar todo.

El frontend es **Next.js**. El API es **Ruby on Rails**.

## Qué incluye

- Home de destinos, con el sello una sola vez en el menú
- Combos de viaje y blogs, editables desde `/admin`
- Reviews que deja la gente (quedan pendientes hasta que las apruebes)
- Formularios de asesoría 1:1, diseño de viaje y guía de Málaga
- Textos, Instagram, mail y promos editables en **Estudio → La web**

Instagram: [instagram.com/muevetechico](https://www.instagram.com/muevetechico/)

## Cómo correrla en tu compu

Necesitás Node 20+ y Ruby 3.2 (con rbenv, RVM o el Ruby del sistema).

```bash
cd muevete-travel
chmod +x scripts/setup.sh scripts/dev.sh
./scripts/setup.sh
./scripts/dev.sh
```

`setup.sh` instala gems, `npm install`, crea la base y, si usás rbenv, Ruby 3.2.3.

Si rbenv se queja de la versión, a mano:

```bash
rbenv install 3.2.3
rbenv local 3.2.3
```

Después abrí [http://127.0.0.1:43123](http://127.0.0.1:43123) en Chrome.

- Estudio: [http://127.0.0.1:43123/admin/login](http://127.0.0.1:43123/admin/login)
- email: `hola@muevetechico.com`
- contraseña: `muevetechico`

## A mano (si no usás los scripts)

```bash
cd backend
bundle install
bin/rails db:prepare db:seed
PORT=43124 bundle exec rails server -b 127.0.0.1 -p 43124
```

```bash
cd frontend
npm install
API_URL=http://127.0.0.1:43124 npm run dev -- -H 127.0.0.1 -p 43123
```

## Stack

| Parte | Carpeta | Rol |
| --- | --- | --- |
| Next.js + Tailwind + shadcn/ui | `frontend/` | Sitio público y panel |
| Rails 8 API + SQLite + Active Storage | `backend/` | Contenido, consultas, reviews |

Next proxea `/api/*` y `/rails/*` hacia Rails.
