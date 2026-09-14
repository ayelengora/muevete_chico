class Api::V1::Admin::CombosController < Api::V1::Admin::BaseController
  include CoverUpload

  def index
    render json: Combo.recent.map { |combo| combo.as_json(full: true) }
  end

  def show
    render json: Combo.find(params[:id]).as_json(full: true)
  end

  def create
    combo = Combo.new(combo_params)
    attach_cover(combo)
    combo.save!
    render json: combo.as_json(full: true), status: :created
  end

  def update
    combo = Combo.find(params[:id])
    combo.assign_attributes(combo_params)
    attach_cover(combo)
    combo.save!
    render json: combo.as_json(full: true)
  end

  def destroy
    Combo.find(params[:id]).destroy!
    head :no_content
  end

  private

  def combo_params
    params.permit(
      :title, :slug, :destination, :duration, :price_from, :currency,
      :excerpt, :description, :includes, :cover_url, :published, :featured
    )
  end
end
