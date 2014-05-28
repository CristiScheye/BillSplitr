class AddStatusToBillShare < ActiveRecord::Migration
  def change
    add_column :bill_shares, :status, :string, default: 'active'
  end
end
