class Api::V1::Admin::InquiriesController < Api::V1::Admin::BaseController
  def index
    render json: Inquiry.recent
  end

  def update
    inquiry = Inquiry.find(params[:id])
    inquiry.update!(params.permit(:status))
    render json: inquiry
  end

  def destroy
    Inquiry.find(params[:id]).destroy!
    head :no_content
  end
end
