class Payment < ActiveRecord::Base
  validates_presence_of :sender, :receiver, :amount
  validates :amount, numericality: { greater_than: 0 }

  belongs_to :sender, class_name: 'User'
  belongs_to :receiver, class_name: 'User'
end