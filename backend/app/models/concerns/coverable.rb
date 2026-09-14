module Coverable
  extend ActiveSupport::Concern

  included do
    has_one_attached :cover
  end

  def resolved_cover_url
    if cover.attached?
      Rails.application.routes.url_helpers.rails_blob_url(cover, only_path: false)
    else
      cover_url.presence
    end
  end
end
