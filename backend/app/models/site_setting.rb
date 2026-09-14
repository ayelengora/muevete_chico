class SiteSetting < ApplicationRecord
  validates :key, presence: true, uniqueness: true

  DEFAULTS = {
    "brand_name" => "muevetechico",
    "tagline" => "Rutas y experiencias reales :)",
    "hero_title" => "A dónde te vas",
    "hero_subtitle" => "Destinos reales, itinerarios a medida y cero relleno. Elegí un lugar o armamos el tuyo.",
    "about" => "muevetechico nació en Instagram para contar viajes como se viven: con sol, playa, pueblos y también con el quilombo de armar un itinerario. Hoy es una agencia chica para diseñar tu próximo viaje y acompañarte antes de salir.",
    "email" => "hola@muevetechico.com",
    "instagram_url" => "https://www.instagram.com/muevetechico/",
    "whatsapp" => "+34 600 000 000",
    "esim_url" => "https://www.airalo.com/",
    "esim_label" => "Descuento eSIM",
    "rental_code" => "MUEVETECHICO",
    "rental_label" => "Renntentials 10% off",
    "malaga_guide_title" => "Guía gratis +4k | Málaga con style",
    "malaga_guide_blurb" => "La guía que armé para moverte por Málaga como local: barrios, playas, tapeo y planes que no salen en el folleto.",
    "logo_url" => "/brand/logo.jpg"
  }.freeze

  has_one_attached :asset

  def self.fetch_all
    stored = all.each_with_object({}) { |row, acc| acc[row.key] = row.value }
    DEFAULTS.merge(stored).merge("logo_url" => resolved_logo_url)
  end

  def self.resolved_logo_url
    record = find_by(key: "logo_url")
    if record&.asset&.attached?
      Rails.application.routes.url_helpers.rails_blob_url(record.asset, only_path: false)
    else
      record&.value.presence || DEFAULTS["logo_url"]
    end
  end

  def self.attach_logo!(file)
    record = find_or_initialize_by(key: "logo_url")
    record.value = DEFAULTS["logo_url"] if record.value.blank?
    record.save!
    record.asset.attach(file)
    record.update!(value: resolved_logo_url)
  end

  def self.upsert_many!(attrs)
    attrs.each do |key, value|
      next if key.blank?
      next if key.to_s == "logo"

      record = find_or_initialize_by(key: key.to_s)
      record.value = value.to_s
      record.save!
    end
    fetch_all
  end
end
