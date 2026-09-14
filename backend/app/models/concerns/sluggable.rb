module Sluggable
  extend ActiveSupport::Concern

  included do
    before_validation :generate_slug, if: -> { slug.blank? && title.present? }
  end

  private

  def generate_slug
    base = title.parameterize
    candidate = base
    n = 2
    while self.class.where.not(id: id).exists?(slug: candidate)
      candidate = "#{base}-#{n}"
      n += 1
    end
    self.slug = candidate
  end
end
