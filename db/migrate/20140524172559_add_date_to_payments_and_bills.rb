class AddDateToPaymentsAndBills < ActiveRecord::Migration
  def change
    add_column :payments, :date, :datetime
    add_column :bills, :date, :datetime
  end
end
