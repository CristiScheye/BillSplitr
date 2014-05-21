class Bill < ActiveRecord::Base
  validates_presence_of :lender, :amount, :description
  validates :amount, numericality: { greater_than: 0 }

  belongs_to :lender, class_name: 'User'

  has_many :bill_shares
  has_many :debtors, through: :bill_shares, as: :debtor
end