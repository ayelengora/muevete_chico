class Combo < ApplicationRecord
  include Coverable
  include Sluggable

  validates :title, presence: true
  validates :slug, presence: true, uniqueness: true
  validates :description, presence: true

  scope :published, -> { where(published: true) }
  scope :featured, -> { where(featured: true) }
  scope :recent, -> { order(created_at: :desc) }

  def includes_list
    return [] if includes.blank?

    includes.split(/\r?\n/).map(&:strip).reject(&:blank?)
  end

  def itinerary_list
    return [] if itinerary.blank?

    itinerary.split(/\r?\n/).map(&:strip).reject(&:blank?)
  end

  def places_list
    return [] if places.blank?

    places.split(/[\n,]/).map(&:strip).reject(&:blank?)
  end

  def covers_place?(slug)
    places_list.include?(slug.to_s)
  end

  def related_destinations
    slugs = places_list
    return Destination.none if slugs.empty?

    Destination.published.where(slug: slugs).sort_by { |place| slugs.index(place.slug) || 99 }
  end

  def closed_trip?
    destination != "A donde quieras ir"
  end

  def as_json(options = {})
    {
      id: id,
      title: title,
      slug: slug,
      destination: destination,
      duration: duration,
      price_from: price_from,
      currency: currency,
      excerpt: excerpt,
      description: options[:full] ? description : nil,
      includes: includes_list,
      itinerary: itinerary_list,
      places: places_list,
      destinations: related_destinations.map { |place|
        {
          id: place.id,
          name: place.name,
          slug: place.slug,
          cover_url: place.resolved_cover_url,
          region: place.region,
          country: place.country
        }
      },
      cover_url: resolved_cover_url,
      published: published,
      featured: featured,
      created_at: created_at,
      updated_at: updated_at
    }.reject { |_, value| value.nil? }
  end
end
