class Api::V1::HomeController < ApplicationController
  def show
    render json: {
      settings: SiteSetting.fetch_all,
      featured_destinations: Destination.published.featured.recent.limit(8).map(&:as_json),
      destinations: Destination.published.recent.map(&:as_json),
      featured_combos: Combo.published.featured.select(&:closed_trip?).first(6).map(&:as_json),
      featured_posts: Post.published.featured.recent.limit(3).map(&:as_json),
      latest_posts: Post.published.recent.limit(3).map(&:as_json),
      reviews: Review.approved.recent.limit(6),
      stats: {
        combos: Combo.published.count,
        posts: Post.published.count,
        reviews: Review.approved.count,
        average_rating: Review.approved.average(:rating)&.round(1)
      }
    }
  end
end
