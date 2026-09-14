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
      cover_url: resolved_cover_url,
      published: published,
      featured: featured,
      created_at: created_at,
      updated_at: updated_at
    }.reject { |_, value| value.nil? }
  end
end
