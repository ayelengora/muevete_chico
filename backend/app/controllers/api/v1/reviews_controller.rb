class Api::V1::ReviewsController < ApplicationController
  def index
    reviews = Review.approved.recent
    render json: reviews
  end

  def create
    review = Review.new(review_params.merge(approved: false))
    review.save!
    render json: {
      review: review,
      message: "¡Gracias! Tu review queda pendiente de aprobación."
    }, status: :created
  end

  private

  def review_params
    params.permit(:author_name, :author_location, :rating, :body, :trip)
  end
end
