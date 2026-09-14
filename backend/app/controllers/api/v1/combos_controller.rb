class Api::V1::CombosController < ApplicationController
  def index
    combos = Combo.published.recent
    render json: combos.map { |combo| combo.as_json }
  end

  def show
    combo = Combo.published.find_by!(slug: params[:id])
    render json: combo.as_json(full: true)
  end
end
