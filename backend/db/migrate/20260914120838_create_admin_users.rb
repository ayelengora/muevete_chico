class CreateAdminUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :admin_users do |t|
      t.string :email
      t.string :password_digest
      t.string :auth_token
      t.string :name

      t.timestamps
    end
    add_index :admin_users, :email, unique: true
    add_index :admin_users, :auth_token, unique: true
  end
end
