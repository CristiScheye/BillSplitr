# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140605041132) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bill_shares", force: true do |t|
    t.integer  "bill_id",                       null: false
    t.integer  "debtor_id",                     null: false
    t.float    "amount",                        null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "status",     default: "active"
  end

  add_index "bill_shares", ["bill_id", "debtor_id"], name: "index_bill_shares_on_bill_id_and_debtor_id", unique: true, using: :btree
  add_index "bill_shares", ["bill_id"], name: "index_bill_shares_on_bill_id", using: :btree
  add_index "bill_shares", ["debtor_id"], name: "index_bill_shares_on_debtor_id", using: :btree

  create_table "bills", force: true do |t|
    t.integer  "lender_id",   null: false
    t.float    "amount",      null: false
    t.text     "description", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "date"
  end

  add_index "bills", ["lender_id"], name: "index_bills_on_lender_id", using: :btree

  create_table "friendships", force: true do |t|
    t.integer  "user_id",    null: false
    t.integer  "friend_id",  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "friendships", ["friend_id"], name: "index_friendships_on_friend_id", using: :btree
  add_index "friendships", ["user_id", "friend_id"], name: "index_friendships_on_user_id_and_friend_id", unique: true, using: :btree
  add_index "friendships", ["user_id"], name: "index_friendships_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "f_name",          null: false
    t.string   "l_name",          null: false
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

end
