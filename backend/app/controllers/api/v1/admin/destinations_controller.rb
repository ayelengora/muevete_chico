class Api::V1::Admin::DestinationsController < Api::V1::Admin::BaseController
  include CoverUpload

  def index
    render json: Destination.recent.map { |item| item.as_json(full: true) }
  end

  def show
    render json: Destination.find(params[:id]).as_json(full: true)
  end

  def create
    destination = Destination.new(destination_params)
    attach_cover(destination)
    destination.save!
    render json: destination.as_json(full: true), status: :created
  end

  def update
    destination = Destination.find(params[:id])
    destination.assign_attributes(destination_params)
    attach_cover(destination)
    destination.save!
    render json: destination.as_json(full: true)
  end

  def destroy
    Destination.find(params[:id]).destroy!
    head :no_content
  end

  private

  def destination_params
    params.permit(
      :name, :slug, :region, :country, :blurb, :description,
      :cover_url, :published, :featured
    )
  end
end
