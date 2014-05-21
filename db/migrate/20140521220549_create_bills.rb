class CreateBills < ActiveRecord::Migration
  def change
    create_table :bills do |t|
      t.integer :lender_id, null: false
      t.float :amount, null: false
      t.text :description, null: false

      t.timestamps
    end

    add_index :bills, :lender_id
  end
end
