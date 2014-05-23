class CreatePayments < ActiveRecord::Migration
  def change
    create_table :payments do |t|
      t.integer :sender_id, null: false
      t.integer :receiver_id, null: false
      t.float :amount, null: false

      t.timestamps
    end

    add_index :payments, :sender_id
    add_index :payments, :receiver_id
  end
end
