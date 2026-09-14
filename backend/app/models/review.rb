class Review < ApplicationRecord
  validates :author_name, presence: true
  validates :body, presence: true, length: { minimum: 10, maximum: 1200 }
  validates :rating, presence: true, inclusion: { in: 1..5 }

  scope :approved, -> { where(approved: true) }
  scope :pending, -> { where(approved: false) }
  scope :recent, -> { order(created_at: :desc) }

  def as_json(_options = nil)
    {
      id: id,
      author_name: author_name,
      author_location: author_location,
      rating: rating,
      body: body,
      trip: trip,
      approved: approved,
      created_at: created_at
    }
  end
end
