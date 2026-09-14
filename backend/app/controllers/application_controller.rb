class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActiveRecord::RecordInvalid, with: :unprocessable

  private

  def not_found
    render json: { error: "No encontramos eso" }, status: :not_found
  end

  def unprocessable(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
end
