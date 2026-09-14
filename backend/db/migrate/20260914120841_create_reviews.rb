class CreateReviews < ActiveRecord::Migration[8.1]
  def change
    create_table :reviews do |t|
      t.string :author_name, null: false
      t.string :author_location
      t.integer :rating, null: false
      t.text :body, null: false
      t.string :trip
      t.boolean :approved, default: false, null: false

      t.timestamps
    end
    add_index :reviews, :approved
  end
end
