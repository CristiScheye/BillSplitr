class BillShare < ActiveRecord::Base
  validates_presence_of :bill, :debtor, :amount
  validates :amount, numericality: { greater_than: 0 }
  # should also validate that it doesn't exceed the total amount of the bill

  belongs_to :bill
  belongs_to :debtor, class_name: 'User'
end