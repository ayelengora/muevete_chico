# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_09_14_121105) do
  create_table "active_storage_attachments", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.bigint "record_id", null: false
    t.string "record_type", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.string "content_type"
    t.datetime "created_at", null: false
    t.string "filename", null: false
    t.string "key", null: false
    t.text "metadata"
    t.string "service_name", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "auth_token"
    t.datetime "created_at", null: false
    t.string "email"
    t.string "name"
    t.string "password_digest"
    t.datetime "updated_at", null: false
    t.index ["auth_token"], name: "index_admin_users_on_auth_token", unique: true
    t.index ["email"], name: "index_admin_users_on_email", unique: true
  end

  create_table "combos", force: :cascade do |t|
    t.string "cover_url"
    t.datetime "created_at", null: false
    t.string "currency", default: "EUR"
    t.text "description"
    t.string "destination"
    t.string "duration"
    t.text "excerpt"
    t.boolean "featured", default: false, null: false
    t.text "includes"
    t.integer "price_from"
    t.boolean "published", default: false, null: false
    t.string "slug", null: false
    t.string "title", null: false
    t.datetime "updated_at", null: false
    t.index ["published"], name: "index_combos_on_published"
    t.index ["slug"], name: "index_combos_on_slug", unique: true
  end

  create_table "inquiries", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "destination"
    t.string "email", null: false
    t.string "inquiry_type", null: false
    t.text "message"
    t.string "name", null: false
    t.string "status", default: "nueva", null: false
    t.string "travel_dates"
    t.integer "travelers"
    t.datetime "updated_at", null: false
    t.string "whatsapp"
    t.index ["status"], name: "index_inquiries_on_status"
  end

  create_table "posts", force: :cascade do |t|
    t.text "body"
    t.string "cover_url"
    t.datetime "created_at", null: false
    t.string "destination"
    t.text "excerpt"
    t.boolean "featured", default: false, null: false
    t.boolean "published", default: false, null: false
    t.datetime "published_at"
    t.string "slug", null: false
    t.string "title", null: false
    t.datetime "updated_at", null: false
    t.index ["published"], name: "index_posts_on_published"
    t.index ["slug"], name: "index_posts_on_slug", unique: true
  end

  create_table "reviews", force: :cascade do |t|
    t.boolean "approved", default: false, null: false
    t.string "author_location"
    t.string "author_name", null: false
    t.text "body", null: false
    t.datetime "created_at", null: false
    t.integer "rating", null: false
    t.string "trip"
    t.datetime "updated_at", null: false
    t.index ["approved"], name: "index_reviews_on_approved"
  end

  create_table "site_settings", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "key"
    t.datetime "updated_at", null: false
    t.text "value"
    t.index ["key"], name: "index_site_settings_on_key", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
end
