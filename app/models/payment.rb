class Payment < ActiveRecord::Base
  validates_presence_of :sender, :receiver, :amount, :date
  validates :amount, numericality: { greater_than: 0 }

  belongs_to :sender, class_name: 'User'
  belongs_to :receiver, class_name: 'User'

  def self.sent_or_received_by(user)
    uid = user.id
    Payment.where("sender_id = ? OR receiver_id = ?", uid, uid)
  end
end