module Authenticable
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_admin!
  end

  private

  def authenticate_admin!
    token = request.headers["Authorization"].to_s.sub(/\ABearer\s+/i, "")
    @current_admin = AdminUser.find_by(auth_token: token) if token.present?
    render json: { error: "Necesitás iniciar sesión" }, status: :unauthorized unless @current_admin
  end

  attr_reader :current_admin
end
