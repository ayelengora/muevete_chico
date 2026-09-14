class SiteSetting < ApplicationRecord
  validates :key, presence: true, uniqueness: true

  DEFAULTS = {
    "brand_name" => "muevetechico",
    "tagline" => "Rutas y experiencias reales :)",
    "hero_title" => "¿Te querés ir? charlemos",
    "hero_subtitle" => "Asesorías 1:1 y viajes a medida, con la misma onda de las historias: destinos reales, tips que sirven y cero relleno.",
    "about" => "muevetechico nació en Instagram para contar viajes como se viven: con sol, playa, pueblos y también con el quilombo de armar un itinerario. Hoy es una agencia chica para diseñar tu próximo viaje y acompañarte antes de salir.",
    "email" => "hola@muevetechico.com",
    "instagram_url" => "https://www.instagram.com/muevetechico/",
    "whatsapp" => "+34 600 000 000",
    "esim_url" => "https://www.airalo.com/",
    "esim_label" => "Descuento eSIM",
    "rental_code" => "MUEVETECHICO",
    "rental_label" => "Renntentials 10% off",
    "malaga_guide_title" => "Guía gratis +4k | Málaga con style",
    "malaga_guide_blurb" => "La guía que armé para moverte por Málaga como local: barrios, playas, tapeo y planes que no salen en el folleto."
  }.freeze

  def self.fetch_all
    stored = all.each_with_object({}) { |row, acc| acc[row.key] = row.value }
    DEFAULTS.merge(stored)
  end

  def self.upsert_many!(attrs)
    attrs.each do |key, value|
      next if key.blank?

      record = find_or_initialize_by(key: key.to_s)
      record.value = value.to_s
      record.save!
    end
    fetch_all
  end
end
