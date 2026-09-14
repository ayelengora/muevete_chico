class Api::V1::Admin::ReviewsController < Api::V1::Admin::BaseController
  def index
    render json: Review.recent
  end

  def update
    review = Review.find(params[:id])
    review.update!(review_params)
    render json: review
  end

  def destroy
    Review.find(params[:id]).destroy!
    head :no_content
  end

  private

  def review_params
    params.permit(:approved, :author_name, :author_location, :rating, :body, :trip)
  end
end
