class BillShare < ActiveRecord::Base
  validates_presence_of :bill, :debtor, :amount
  validates :amount, numericality: { greater_than: 0 }
  validates :status, inclusion: {in: ['active', 'paid', 'void'] }
  validates_uniqueness_of :bill, scope: [:debtor]
  # TODO: should also validate that it doesn't exceed the total amount of the bill
  # TODO: should also validate that it isn't assigned to current user

  belongs_to :bill, inverse_of: :bill_shares
  belongs_to :debtor, class_name: 'User'

  def self.between_users(user_id1, user_id2)
    BillShare.includes(:bill)
        .where("(bills.lender_id = ? AND debtor_id = ?)
        OR (bills.lender_id = ? AND bill_shares.debtor_id = ?)",
        user_id1, user_id2, user_id2, user_id1)
        .references(:bill)
  end


end
