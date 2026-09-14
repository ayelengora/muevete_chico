class CreateCombos < ActiveRecord::Migration[8.1]
  def change
    create_table :combos do |t|
      t.string :title, null: false
      t.string :slug, null: false
      t.string :destination
      t.string :duration
      t.integer :price_from
      t.string :currency, default: "EUR"
      t.text :excerpt
      t.text :description
      t.text :includes
      t.string :cover_url
      t.boolean :published, default: false, null: false
      t.boolean :featured, default: false, null: false

      t.timestamps
    end
    add_index :combos, :slug, unique: true
    add_index :combos, :published
  end
end
