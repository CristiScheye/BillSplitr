class User < ActiveRecord::Base
  validates_presence_of :f_name, :l_name, :email, :password_digest, :session_token
  validates_uniqueness_of :email
  validates :password, length: {minimum: 6}, allow_nil: true
  before_validation :set_session_token

  has_many :bills, foreign_key: 'lender_id'

  has_many :payments_made, class_name: 'Payment', foreign_key: :sender_id
  has_many :payments_received, class_name: 'Payment', foreign_key: :receiver_id

  def password=(unencrypted_password)
    @password = unencrypted_password
    self.password_digest = BCrypt::Password.create(unencrypted_password)
  end

  def password
    @password
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  def set_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

  def self.find_by_credentials(creds = {})
    user = User.find_by_email(creds[:email])
    if user.present? && BCrypt::Password.new(
      user.password_digest).is_password?(creds[:password])
      return user
    end
    nil
  end

  def balances_with_other_users
    # should return an array of user objects with amount on them
    # pos amount if they owe the user (self)
    # neg amount if the user (self) owes them

    #TODO find payment subtotals

    # get array of all self.loan_subtotals
    # get array of all self.debt_subtotals
    # get array of all self.payments_sent
    # get array of all self.payments_received

    # create an empty hash
    # iterate thru each of the above arrays,
    # for the id of the thing returned, update the val of the hash

    balances = Hash.new(0)
    self.loan_subtotals.each do |sub|
      balances[sub] += sub.amt_loaned
    end

    self.debt_subtotals.each do |sub|
      balances[sub] -= sub.amt_owed
    end

    self.sent_payment_subtotals.each do |sub|
      balances[sub] += sub.sum_amount
    end

    self.received_payment_subtotals.each do |sub|
      balance[sub] -= sub.sum_amount
    end

    balances
  end

  protected

  def loan_subtotals
    # returns an array of user objects with attribute "amt_loaned" that represents
    # $ owed *to* user
    # [ <user1>, <user2> ]
    # user1.amt_loaned


    User.find_by_sql([<<-SQL, user_id: self.id])
      SELECT users.*, SUM(bill_shares.amount) AS amt_loaned
      FROM bills
      LEFT JOIN bill_shares ON bills.id = bill_shares.bill_id
      LEFT JOIN users ON users.id = bill_shares.debtor_id
      WHERE bills.lender_id = :user_id
      GROUP BY users.id
    SQL

  end

  def debt_subtotals
    # returns an array of user objects with attribute "amt_owed" that represents
    # $ owed *by* user *to* the users returned, grouped by lender
    # [ <user1>, <user2> ]
    # user1.amt_owed


    User.find_by_sql([<<-SQL, user_id: self.id])
      SELECT users.*, SUM(bill_shares.amount) AS amt_owed
      FROM bills
      LEFT JOIN bill_shares ON bills.id = bill_shares.bill_id
      LEFT JOIN users ON users.id = bills.lender_id
      WHERE bill_shares.debtor_id = :user_id
      GROUP BY users.id
    SQL
  end

  def received_payment_subtotals
    # returns an array of user objects with attribute "sum_amount" that represents
    # $ received *by* user *from* others, grouped by user
    # [ <user1>, <user2> ]
    # user1.amt_received
    self.payments_received.group(:sender_id).sum(:amount)
  end

  def sent_payment_subtotals
    # returns an array of user objects with attribute "sum_amount" that represents
    # $ sent *by* user *to* others, grouped by user
    # [ <user1>, <user2> ]
    # user1.amt_sent
    self.payments_made.group(:sender_id).sum(:amount)
  end
end
