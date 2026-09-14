class CreateInquiries < ActiveRecord::Migration[8.1]
  def change
    create_table :inquiries do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :whatsapp
      t.string :inquiry_type, null: false
      t.string :destination
      t.integer :travelers
      t.string :travel_dates
      t.text :message
      t.string :status, default: "nueva", null: false

      t.timestamps
    end
    add_index :inquiries, :status
  end
end
