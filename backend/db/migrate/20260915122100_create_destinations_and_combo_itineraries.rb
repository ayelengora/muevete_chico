class CreateDestinationsAndComboItineraries < ActiveRecord::Migration[8.1]
  def change
    create_table :destinations do |t|
      t.string :name, null: false
      t.string :slug, null: false
      t.string :region
      t.string :country
      t.text :blurb
      t.text :description
      t.string :cover_url
      t.boolean :featured, default: false, null: false
      t.boolean :published, default: false, null: false
      t.timestamps
    end
    add_index :destinations, :slug, unique: true
    add_index :destinations, :published

    add_column :combos, :itinerary, :text
    add_column :combos, :places, :text
  end
end
