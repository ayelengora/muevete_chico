AdminUser.find_or_create_by!(email: "hola@muevetechico.com") do |admin|
  admin.name = "Camila"
  admin.password = "muevetechico"
end

SiteSetting.upsert_many!(SiteSetting::DEFAULTS)

destinations = [
  {
    name: "Málaga",
    region: "Costa del Sol",
    country: "España",
    featured: true,
    blurb: "Playa urbana, tapeo y barrios para perderse sin apuro.",
    cover_url: "/covers/malaga.jpg",
    description: <<~TEXT
      Málaga no es solo el aeropuerto de la Costa del Sol. Es alcazaba al atardecer, playa urbana, museos que no aburren y un casco antiguo para caminar con un helado.

      Ideal para una primera vez en Andalucía o para volver y verla con otra onda: Soho, El Palo, Pedregalejo y un ritmo que no copia el top 10.
    TEXT
  },
  {
    name: "Nerja",
    region: "Costa Tropical",
    country: "España",
    featured: true,
    blurb: "Balcón de Europa, calas y pueblo frente al mar.",
    cover_url: "/covers/nerja.jpg",
    description: <<~TEXT
      Nerja es villa de postal: Balcón de Europa, casco blanco y calas. Si vas un domingo de agosto sin plan, también de cola.

      Queda a una hora de Málaga. Se arma lindo como escapada o como parte de un combo más largo por la costa.
    TEXT
  },
  {
    name: "Andalucía",
    region: "Pueblos blancos y Caminito",
    country: "España",
    featured: true,
    blurb: "Pueblos blancos, miradores y el Caminito del Rey.",
    cover_url: "/covers/andalucia.jpg",
    description: <<~TEXT
      Andalucía se siente distinto cuando salís de la costa un rato: callejones, miradores, brunch de tapas y el Caminito del Rey con la logística resuelta.

      Málaga suele ser la base. Desde ahí se arman pueblos y día de montaña sin vivir en el auto.
    TEXT
  },
  {
    name: "Lisboa",
    region: "Estuario del Tajo",
    country: "Portugal",
    featured: true,
    blurb: "Miradores, tranvía y un ritmo para no terminar hecha bolsa.",
    cover_url: "/covers/lisboa.jpg",
    description: <<~TEXT
      Lisboa se disfruta despacio: subidas, luces y un atardecer que pide vino, no checklist.

      Un barrio para volver a dormir, dos o tres anclas por día y, si el tiempo ayuda, un escape a Sintra o Cascais.
    TEXT
  },
  {
    name: "Puglia",
    region: "El sur que pega",
    country: "Italia",
    featured: true,
    blurb: "Pueblos blancos, mar adriático y comida de verdad.",
    cover_url: "/covers/puglia.jpg",
    description: <<~TEXT
      Puglia es mar, trulli y pueblos para perderse. Ostuni, Polignano, Lecce: el sur de Italia sin el circo del norte.

      Se arma mejor con una base, no con un hotel distinto cada noche.
    TEXT
  },
  {
    name: "Marrakech",
    region: "Medina y Atlas",
    country: "Marruecos",
    featured: true,
    blurb: "Riads, zocos y un día en las montañas.",
    cover_url: "/covers/marrakech.jpg",
    description: <<~TEXT
      Marrakech pide un riad lindo y un plan para no marearte en la medina. Después, Atlas o Essaouira.

      Ciudad, un día afuera y tiempo para no hacer nada en la terraza.
    TEXT
  }
]

destinations.each do |attrs|
  item = Destination.find_or_initialize_by(name: attrs[:name])
  item.assign_attributes(attrs.merge(published: true))
  item.save!
end

combos = [
  {
    title: "Málaga con style",
    destination: "Málaga, España",
    duration: "4 días",
    price_from: 390,
    currency: "EUR",
    featured: true,
    excerpt: "La ciudad que más me pide la gente: playa, tapeo, arte y barrios para perderse sin apuro.",
    cover_url: "/covers/malaga.jpg",
    places: "malaga",
    itinerary: <<~TEXT,
      Día 1 — Llegada, check-in y tapeo en el centro (sin Larios a las 14 hs)
      Día 2 — Alcazaba, casco y atardecer en La Malagueta
      Día 3 — Barrio (Soho o El Palo) y playa urbana
      Día 4 — Mañana libre o pueblo cercano y vuelo
    TEXT
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
    cover_url: "/covers/andalucia.jpg",
    places: "malaga\nandalucia",
    itinerary: <<~TEXT,
      Día 1 — Málaga: aterrizaje, barrio y primera noche de tapeo
      Día 2 — Casco, Alcazaba y ritmo de ciudad
      Día 3 — Pueblo blanco (callejones, mirador, brunch)
      Día 4 — Caminito del Rey: entradas, traslado y plan B por clima
      Día 5 — Playa o El Palo, sin checklist
      Día 6 — Cierre en Málaga y vuelo
    TEXT
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
    featured: true,
    excerpt: "Balcón de Europa, calas y pueblo: la escapada de playa que más recomiendo desde Málaga.",
    cover_url: "/covers/nerja.jpg",
    places: "nerja\nmalaga",
    itinerary: <<~TEXT,
      Día 1 — Málaga de mañana, bus a Nerja, casco y Balcón de Europa
      Día 2 — Cala (según época y gente) o Cuevas, pueblo al atardecer
      Día 3 — Último baño y vuelta a Málaga sin el último bus
    TEXT
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
    featured: false,
    excerpt: "Asesoría 1:1 para armar el viaje que tenés en la cabeza. Vos contame el sueño, yo te armo el camino.",
    cover_url: "/covers/a-medida.jpg",
    places: "",
    itinerary: "",
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
  },
  {
    title: "Lisboa con calma",
    destination: "Lisboa, Portugal",
    duration: "5 días",
    price_from: 520,
    currency: "EUR",
    featured: true,
    excerpt: "Miradores, tranvía, pastel de nata y un ritmo para caminar la ciudad sin terminar hecha bolsa.",
    cover_url: "/covers/lisboa.jpg",
    places: "lisboa",
    itinerary: <<~TEXT,
      Día 1 — Barrio (Alfama o Graça), mirador y cena sin prisa
      Día 2 — Centro, tranvía y un atardecer con vino
      Día 3 — Príncipe Real / Chiado, restaurantes que cierran
      Día 4 — Sintra o Cascais, según el clima
      Día 5 — Mañana lenta y vuelo
    TEXT
    includes: "Barrios para dormir (Alfama, Graça o Príncipe Real)\nItinerario de miradores\nDía a Sintra o cascais según el clima\nReservas de restaurantes",
    description: <<~TEXT
      Lisboa se disfruta despacio: subidas, luces y un atardecer que pide vino, no checklist.

      Este destino es para armar cinco días con sentido: un barrio para volver a dormir, dos o tres anclas por día y un escape a Sintra si el tiempo ayuda.
    TEXT
  },
  {
    title: "Puglia, el sur que pega",
    destination: "Puglia, Italia",
    duration: "7 días",
    price_from: 890,
    currency: "EUR",
    featured: true,
    excerpt: "Pueblos blancos, mar adriático y comida de verdad. El sur de Italia sin el circo del norte.",
    cover_url: "/covers/puglia.jpg",
    places: "puglia",
    itinerary: <<~TEXT,
      Día 1 — Llegada y base (no hotel distinto cada noche)
      Día 2 — Pueblo blanco y mar
      Día 3 — Polignano o costa, según el calor
      Día 4 — Lecce y comida de verdad
      Día 5 — Playa / masseria
      Día 6 — Un pueblo extra sin matar el auto
      Día 7 — Cierre y salida
    TEXT
    includes: "Ruta Ostuni–Polignano–Lecce\nDónde dormir (base, no hotel distinto cada noche)\nPlayas y masseria\nTraslados realistas",
    description: <<~TEXT
      Puglia es mar, trulli y pueblos para perderse. Este combo ordena una semana para no estar todo el día en el auto.

      Una base, tres pueblos, playa cuando pega el calor y cenas que valen el viaje.
    TEXT
  },
  {
    title: "Marrakech y el Atlas",
    destination: "Marrakech, Marruecos",
    duration: "6 días",
    price_from: 640,
    currency: "EUR",
    featured: true,
    excerpt: "Medina, riads y un día en las montañas. Marruecos de cerca, sin tour de 40 personas.",
    cover_url: "/covers/marrakech.jpg",
    places: "marrakech",
    itinerary: <<~TEXT,
      Día 1 — Riad en la medina, rooftop y primer zoco con mapa
      Día 2 — Medina con ritmo, no 40 plazas
      Día 3 — Jardines y terraza
      Día 4 — Atlas o Essaouira
      Día 5 — Vuelta a la ciudad, compras justas
      Día 6 — Mañana lenta y salida
    TEXT
    includes: "Riad en la medina\nMapa de zocos y rooftops\nExcursión al Atlas o Essaouira\nTips de plata, vestimenta y ritmos",
    description: <<~TEXT
      Marrakech pide un riad lindo y un plan para no marearte en la medina. Después, montaña o costa.

      Armamos el equilibrio: ciudad, un día afuera y tiempo para no hacer nada en la terraza.
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
    cover_url: "/covers/blog-malaga.jpg",
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
    cover_url: "/covers/blog-nerja.jpg",
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
    cover_url: "/covers/blog-tips.jpg",
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
    cover_url: "/covers/blog-recursos.jpg",
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

puts "Listo: #{AdminUser.count} admin, #{Destination.count} destinos, #{Combo.count} combos, #{Post.count} blogs, #{Review.count} reviews."
