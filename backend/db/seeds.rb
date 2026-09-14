AdminUser.find_or_create_by!(email: "hola@muevetechico.com") do |admin|
  admin.name = "Camila"
  admin.password = "muevetechico"
end

SiteSetting.upsert_many!(SiteSetting::DEFAULTS)

combos = [
  {
    title: "Málaga con style",
    destination: "Málaga, España",
    duration: "4 días",
    price_from: 390,
    currency: "EUR",
    featured: true,
    excerpt: "La ciudad que más me pide la gente: playa, tapeo, arte y barrios para perderse sin apuro.",
    cover_url: "https://images.unsplash.com/photo-1558642084-fd07fae5282e?auto=format&fit=crop&w=1600&q=80",
    includes: "Itinerario día por día\nBarrios y miradores locales\nReservas de tapeo y planes al atardecer\nWhatsApp durante el viaje",
    description: <<~TEXT
      Málaga no es solo el aeropuerto de la Costa del Sol. Es alcazaba al atardecer, playa urbana, museos que no aburren y un casco antiguo para caminar con un helado.

      Este combo es para quien quiere **llegar y ya saber qué hacer**, sin copiar el top 10 de Google. Armamos juntos:

      - Dónde dormir según tu estilo (centro, Soho o cerca del mar)
      - Un ritmo realista: no 12 atracciones por día
      - Comida rica, no trampa para turistas
      - Un día de playa o pueblo (Rincón, El Palo o Nerja) si te cabe

      Ideal si es tu primera vez o si ya fuiste y querés verla con otra onda.
    TEXT
  },
  {
    title: "Andalucía real: pueblos + Caminito",
    destination: "Málaga y pueblos blancos",
    duration: "6 días",
    price_from: 680,
    currency: "EUR",
    featured: true,
    excerpt: "Caminito del Rey, un pueblo blanco y Málaga: el combo que más pido cuando me dicen 'quiero Andalucía de verdad'.",
    cover_url: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1600&q=80",
    includes: "Logística del Caminito (entradas y traslados)\nPueblo blanco con tapeo\nBase en Málaga\nAsesoría previa y seguimiento",
    description: <<~TEXT
      Andalucía se siente distinto cuando salís de la costa un rato. Este combo junta tres cosas que funcionan muy bien juntas:

      1. Málaga como base (comer, dormir, moverte fácil)
      2. Un pueblo blanco con callejones, miradores y brunch de tapas
      3. El Caminito del Rey con la logística resuelta, que es lo que más estrés genera

      No es un tour grupal cerrado: es un itinerario a tu medida, con horarios que cierran y plan B si se llena o si hace mal tiempo.
    TEXT
  },
  {
    title: "Nerja y Costa Tropical",
    destination: "Nerja, Málaga",
    duration: "3 días",
    price_from: 320,
    currency: "EUR",
    featured: false,
    excerpt: "Balcón de Europa, calas y pueblo: la escapada de playa que más recomiendo desde Málaga.",
    cover_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    includes: "Cómo llegar en bus o auto\nPlayas y calas según la época\nCuevas de Nerja (si te copa)\nMapa de restaurantes",
    description: <<~TEXT
      Nerja es de esas villas que parecen de postal y, si vas un domingo de agosto sin plan, también de cola. Por eso este combo es corto y preciso: **cuándo ir, cómo llegar desde María Zambrano y dónde meterte al agua**.

      Incluye alternativas si preferís menos gente (calas al este, atardecer en el Balcón, un paseo por el casco lejos del paseo principal).
    TEXT
  },
  {
    title: "Viaje a medida — Diseñemos el próximo",
    destination: "A donde quieras ir",
    duration: "A medida",
    price_from: 90,
    currency: "EUR",
    featured: true,
    excerpt: "Asesoría 1:1 para armar el viaje que tenés en la cabeza. Vos contame el sueño, yo te armo el camino.",
    cover_url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80",
    includes: "Call de 45–60 min\nItinerario o presupuesto inicial\nLista de reservas prioritarias\nSeguimiento por WhatsApp",
    description: <<~TEXT
      Este no es un paquete cerrado. Es el servicio de **diseñar tu próximo viaje**: fechas, presupuesto, ritmo, si viajás sola, en pareja o con amigas.

      En la call vemos:
      - A dónde y cuántos días
      - Qué no negociás (playa, trekking, comida, foto, descanso)
      - Qué te da paja gestionar
      - Cómo ahorrar sin viajar mal

      Después te dejo todo ordenado para que reserves vos o te ayudo a cerrar lo importante.
    TEXT
  }
]

combos.each do |attrs|
  combo = Combo.find_or_initialize_by(title: attrs[:title])
  combo.assign_attributes(attrs.merge(published: true))
  combo.save!
end

posts = [
  {
    title: "Málaga con style: cómo moverte como local",
    destination: "Málaga",
    featured: true,
    excerpt: "Barrios, playa urbana, tapeo y planes al atardecer. La guía que armé después de volver mil veces.",
    cover_url: "https://images.unsplash.com/photo-1562883676-8c4f66749446?auto=format&fit=crop&w=1600&q=80",
    body: <<~TEXT
      Málaga tiene fama de "ciudad de paso" y eso la deja más linda para quien se queda. Acá va cómo la armo yo.

      ## El ritmo
      Un día de casco + Alcazaba, un día de mar (La Malagueta o Pedregalejo) y un día de barrio (Soho o El Palo). Si metés más, terminás corriendo.

      ## Comer
      Tapeo lejos de la calle Larios a la hora pico. Pedí espeto si estás cerca del mar y dejá espacio para un atardecer sin checklist.

      ## Moverte
      El centro se camina. Para la costa, bus o cercanías. No hace falta auto si no vas a pueblos.

      Si querés la versión descargable, pedime la guía gratis desde la web. Y si preferís que te lo arme 1:1, charlemos.
    TEXT
  },
  {
    title: "Nerja en un día (sin morir en el intento)",
    destination: "Nerja",
    featured: true,
    excerpt: "Bus desde María Zambrano, Balcón de Europa, una cala y vuelta a Málaga. El plan corto que más piden.",
    cover_url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1600&q=80",
    body: <<~TEXT
      Nerja queda a una hora en bus desde la estación de tren María Zambrano. Es una de las villas más turísticas de la provincia, así que el truco es el horario.

      ## Cómo llegar
      Bus de mañana. En una hora estás. Llevá efectivo por las dudas y una botella de agua.

      ## Qué hacer
      Casco antiguo, Balcón de Europa y playa. Las Cuevas de Nerja si te copa lo subterráneo y tenés tiempo. Si hace calor, priorizá el agua.

      ## Volver
      No te quedes para el último bus si viajás cansada. El pueblo se disfruta más cuando no estás mirando el reloj cada cinco minutos.

      Si querés sumar Caminito u otro pueblo, mejor pensarlo en un combo de varios días.
    TEXT
  },
  {
    title: "Cómo armar un viaje sin volverte loca",
    destination: "Tips",
    featured: false,
    excerpt: "Orden, presupuesto y tres decisiones que te ahorran semanas de pestañas abiertas a las 2 de la mañana.",
    cover_url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
    body: <<~TEXT
      La gente no se traba por falta de inspiración. Se traba porque abre 40 pestañas y no decide.

      ## Tres decisiones primero
      1. Fechas (aunque sean flexibles)
      2. Presupuesto techo
      3. Ritmo: descanso vs checklist

      Con eso ya se puede armar un esqueleto. El resto son capas: vuelos, barrio para dormir, dos o tres anclas por ciudad.

      ## Lo que no hace falta
      Tener todo reservado el día uno. Sí hace falta saber qué es imposible de conseguir last minute (Caminito, ciertos restoranes, trenes en temporada).

      Si esto te suena a "lo sé pero no lo hago", para eso están las asesorías 1:1.
    TEXT
  },
  {
    title: "eSIM, alquileres y los códigos que uso",
    destination: "Recursos",
    featured: false,
    excerpt: "Datos en el celu, auto o depto, y el código MUEVETECHICO para ahorrar de verdad.",
    cover_url: "https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1600&q=80",
    body: <<~TEXT
      Viajar más barato no es solo el vuelo. Es el chip, el auto y a veces el depto.

      ## eSIM
      Olvidate de cazar un kiosco en el aeropuerto. Una eSIM la activás antes de aterrizar. En la home dejo el link con descuento.

      ## Alquileres
      Si vas con amigas o te quedás más de unos días, un depto rinde. El código **MUEVETECHICO** en Renntentials te deja 10% off.

      ## El combo mental
      Datos + dónde dormir + un plan flexible. El resto se resuelve en el lugar, que es parte de la gracia.
    TEXT
  }
]

posts.each do |attrs|
  post = Post.find_or_initialize_by(title: attrs[:title])
  post.assign_attributes(attrs.merge(published: true, published_at: Time.current))
  post.save!
end

reviews = [
  {
    author_name: "Sofi G.",
    author_location: "Buenos Aires",
    rating: 5,
    trip: "Málaga con style",
    approved: true,
    body: "Le escribí porque no sabía ni por dónde empezar y en una call me ordenó todo. Málaga se sintió fácil, rica y nada de correr. Volví con ganas de armar el próximo."
  },
  {
    author_name: "Martina P.",
    author_location: "Córdoba",
    rating: 5,
    trip: "Andalucía real",
    approved: true,
    body: "El Caminito me daba mil vueltas en la cabeza. Me resolvió entradas, pueblo y tapeo. Fue el viaje más lindo que hice en años, de verdad."
  },
  {
    author_name: "Lucas R.",
    author_location: "Madrid",
    rating: 5,
    trip: "Nerja",
    approved: true,
    body: "Un día en Nerja redondito. Sin esa guía habríamos perdido el bus y comido en una trampa. Se nota que lo recorrió."
  },
  {
    author_name: "Valen M.",
    author_location: "Rosario",
    rating: 4,
    trip: "Asesoría 1:1",
    approved: true,
    body: "Me armó un itinerario para viajar sola y no me sentí perdida. Muy humana, nada de agencia fría. Ya le pedí ideas para el año que viene."
  }
]

reviews.each do |attrs|
  Review.find_or_create_by!(author_name: attrs[:author_name], trip: attrs[:trip]) do |review|
    review.assign_attributes(attrs)
  end
end

puts "Listo: #{AdminUser.count} admin, #{Combo.count} combos, #{Post.count} blogs, #{Review.count} reviews."
