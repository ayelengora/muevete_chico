class Destination < ApplicationRecord
  include Coverable
  include Sluggable

  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true
  validates :description, presence: true

  scope :published, -> { where(published: true) }
  scope :featured, -> { where(featured: true) }
  scope :recent, -> { order(:name) }

  def title
    name
  end

  def combos
    Combo.published.select { |combo| combo.covers_place?(slug) }
  end

  def as_json(options = {})
    payload = {
      id: id,
      name: name,
      slug: slug,
      region: region,
      country: country,
      blurb: blurb,
      description: options[:full] ? description : nil,
      cover_url: resolved_cover_url,
      published: published,
      featured: featured,
      created_at: created_at,
      updated_at: updated_at
    }
    if options[:with_combos]
      payload[:combos] = combos.map(&:as_json)
    end
    payload.reject { |_, value| value.nil? }
  end
end
