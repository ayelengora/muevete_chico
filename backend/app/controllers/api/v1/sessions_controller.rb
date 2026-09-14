class Api::V1::SessionsController < ApplicationController
  def create
    admin = AdminUser.find_by(email: params[:email].to_s.downcase)
    if admin&.authenticate(params[:password])
      admin.regenerate_token!
      render json: { token: admin.auth_token, admin: admin }
    else
      render json: { error: "Email o contraseña incorrectos" }, status: :unauthorized
    end
  end

  def destroy
    token = request.headers["Authorization"].to_s.sub(/\ABearer\s+/i, "")
    AdminUser.find_by(auth_token: token)&.regenerate_token!
    head :no_content
  end
end
