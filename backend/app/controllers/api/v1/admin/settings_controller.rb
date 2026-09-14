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
    attrs.delete("logo")
    SiteSetting.upsert_many!(attrs) if attrs.present?

    file = params[:logo]
    if file.respond_to?(:tempfile) || file.is_a?(ActionDispatch::Http::UploadedFile)
      SiteSetting.attach_logo!(file)
    end

    render json: SiteSetting.fetch_all
  end
end
