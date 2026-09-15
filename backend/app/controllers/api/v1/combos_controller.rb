class Api::V1::CombosController < ApplicationController
  def index
    combos = Combo.published.select(&:closed_trip?).sort_by(&:created_at).reverse
    render json: combos.map { |combo| combo.as_json }
  end

  def show
    combo = Combo.published.find_by!(slug: params[:id])
    render json: combo.as_json(full: true)
  end
end
