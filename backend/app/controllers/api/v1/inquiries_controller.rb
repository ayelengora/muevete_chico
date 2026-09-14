class Api::V1::InquiriesController < ApplicationController
  def create
    inquiry = Inquiry.new(inquiry_params.merge(status: "nueva"))
    inquiry.save!
    render json: {
      inquiry: inquiry,
      message: "Listo, te escribo lo antes posible :)"
    }, status: :created
  end

  private

  def inquiry_params
    params.permit(
      :name, :email, :whatsapp, :inquiry_type, :destination,
      :travelers, :travel_dates, :message
    )
  end
end
