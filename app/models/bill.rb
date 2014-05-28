class Bill < ActiveRecord::Base
  validates_presence_of :lender, :amount, :description, :date
  validates :amount, numericality: { greater_than: 0 }

  belongs_to :lender, class_name: 'User'

  has_many :bill_shares, inverse_of: :bill
  has_many :debtors, through: :bill_shares, as: :debtor

  accepts_nested_attributes_for :bill_shares

  def self.by_or_shared_with(user)
    uid = user.id
    Bill.includes(:bill_shares)
        .where("bill_shares.debtor_id = ? OR bills.lender_id = ?", uid, uid)
  end

  def amount_not_charged
    amount_charged = bill_shares.sum(:amount)
    self.amount - amount_charged
  end
end
