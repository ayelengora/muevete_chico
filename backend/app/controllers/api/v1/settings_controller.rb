class Api::V1::SettingsController < ApplicationController
  def show
    render json: SiteSetting.fetch_all
  end
end
