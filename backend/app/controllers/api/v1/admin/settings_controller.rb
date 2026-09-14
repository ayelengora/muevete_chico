class Api::V1::Admin::SettingsController < Api::V1::Admin::BaseController
  def show
    render json: SiteSetting.fetch_all
  end

  def update
    raw = params[:settings]
    attrs =
      if raw.respond_to?(:permit)
        raw.permit(*SiteSetting::DEFAULTS.keys).to_h
      else
        params.permit(*SiteSetting::DEFAULTS.keys).to_h
      end
    render json: SiteSetting.upsert_many!(attrs)
  end
end
