class CreateBillShares < ActiveRecord::Migration
  def change
    create_table :bill_shares do |t|
      t.integer :bill_id, null: false
      t.integer :debtor_id, null: false
      t.float :amount, null: false

      t.timestamps
    end

    add_index :bill_shares, :bill_id
    add_index :bill_shares, :debtor_id
    add_index :bill_shares, [:bill_id, :debtor_id], unique: true
  end
end
