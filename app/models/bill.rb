class Bill < ActiveRecord::Base
  validates_presence_of :lender, :amount, :description
  validates :amount, numericality: { greater_than: 0 }

  belongs_to :lender, class_name: 'User'

  has_many :bill_shares, inverse_of: :bill
  has_many :debtors, through: :bill_shares, as: :debtor

  accepts_nested_attributes_for :bill_shares

  def amount_not_charged
    amount_charged = bill_shares.sum(:amount)
    self.amount - amount_charged
  end
end