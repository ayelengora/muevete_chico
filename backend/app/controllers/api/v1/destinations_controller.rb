class Api::V1::DestinationsController < ApplicationController
  def index
    render json: Destination.published.recent.map(&:as_json)
  end

  def show
    destination = Destination.published.find_by!(slug: params[:id])
    render json: destination.as_json(full: true, with_combos: true)
  end
end
