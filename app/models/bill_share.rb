class BillShare < ActiveRecord::Base
  validates_presence_of :bill, :debtor, :amount
  validates :amount, numericality: { greater_than: 0 }
  # TODO: should also validate that it doesn't exceed the total amount of the bill
  # TODO: should also validate that it isn't assigned to current user

  belongs_to :bill, inverse_of: :bill_shares
  belongs_to :debtor, class_name: 'User'
end