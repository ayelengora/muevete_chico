class Post < ApplicationRecord
  include Coverable
  include Sluggable

  validates :title, presence: true
  validates :slug, presence: true, uniqueness: true
  validates :body, presence: true

  scope :published, -> { where(published: true) }
  scope :featured, -> { where(featured: true) }
  scope :recent, -> { order(Arel.sql("COALESCE(published_at, created_at) DESC")) }

  def as_json(options = {})
    {
      id: id,
      title: title,
      slug: slug,
      excerpt: excerpt,
      body: options[:full] ? body : nil,
      destination: destination,
      cover_url: resolved_cover_url,
      published: published,
      featured: featured,
      published_at: published_at,
      created_at: created_at,
      updated_at: updated_at
    }.reject { |_, value| value.nil? }
  end
end
