class AdminUser < ApplicationRecord
  has_secure_password

  before_create :assign_auth_token

  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :name, presence: true

  def regenerate_token!
    update!(auth_token: SecureRandom.hex(32))
  end

  def as_json(_options = nil)
    { id: id, email: email, name: name }
  end

  private

  def assign_auth_token
    self.auth_token ||= SecureRandom.hex(32)
  end
end
