class User < ActiveRecord::Base
  validates_presence_of :f_name, :l_name, :email, :password_digest, :session_token
  validates_uniqueness_of :email
  validates :password, length: {minimum: 6}, allow_nil: true
  before_validation :set_session_token

  has_many :bills_owned, class_name: 'Bill', foreign_key: 'lender_id'

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

  def loan_subtotals
    # returns an array of user objects with attribute "amt_loaned" that represents
    # $ owed *to* user
    # [ <user1>, <user2> ]
    # user1.amt_loaned

    find_by_sql([<<-SQL, user_id: self.id])
      SELECT users.*, SUM(bill_shares.amount) AS amt_loaned
      FROM bills
      LEFT JOIN bill_shares ON bills.id = bill_shares.bill_id
      LEFT JOIN users ON users.id = bill_shares.debtor_id
      WHERE bills.lender_id = :user_id
      GROUP BY users.id
    SQL

  end

  def debt_subtotals
    # returns an array of user objects with attribute "amt_debited" that represents
    # $ owed *by* user *to* the users returned, grouped by lender
    # [ <user1>, <user2> ]
    # user1.amt_owed

    find_by_sql([<<-SQL, user_id: self.id])
      SELECT users.*, SUM(bill_shares.amount) AS amt_owed
      FROM bills
      LEFT JOIN bill_shares ON bills.id = bill_shares.bill_id
      LEFT JOIN users ON users.id = bills.lender_id
      WHERE bill_shares.debtor_id = :user_id
      GROUP BY users.id
    SQL
  end
end
