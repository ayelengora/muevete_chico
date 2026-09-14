class Inquiry < ApplicationRecord
  TYPES = %w[asesoria_1a1 disenar_viaje guia_malaga otro].freeze
  STATUSES = %w[nueva leida respondida].freeze

  validates :name, presence: true
  validates :email, presence: true
  validates :inquiry_type, presence: true, inclusion: { in: TYPES }
  validates :status, inclusion: { in: STATUSES }

  scope :recent, -> { order(created_at: :desc) }

  def as_json(_options = nil)
    {
      id: id,
      name: name,
      email: email,
      whatsapp: whatsapp,
      inquiry_type: inquiry_type,
      destination: destination,
      travelers: travelers,
      travel_dates: travel_dates,
      message: message,
      status: status,
      created_at: created_at
    }
  end
end
