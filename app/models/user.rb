class User < ActiveRecord::Base
  validates_presence_of :f_name, :l_name, :email, :password_digest, :session_token
  validates_uniqueness_of :email
  validates :password, length: {minimum: 6}, allow_nil: true
  before_validation :set_session_token

  has_many :bills, foreign_key: 'lender_id'
  has_many :bill_share_loans, through: :bills, source: :bill_shares

  has_many :bill_share_debts, class_name: 'BillShare', foreign_key: 'debtor_id'
  has_many :bill_debts, through: :bill_share_debts, source: :bill

  has_many :recieved_friendships, class_name: 'Friendship', foreign_key: :friend_id

  has_many :friendships, foreign_key: :user_id
  has_many :friends, through: :friendships, source: :friend

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
    balances = Hash.new(0)
    self.loan_subtotals.each do |uid, amount|
      balances[uid] += amount
    end

    self.debt_subtotals.each do |uid, amount|
      balances[uid] -= amount
    end

    balances
  end

  protected

  def loan_subtotals
    self.bill_share_loans.where(status: 'active').group(:debtor_id).sum(:amount)
  end

  def debt_subtotals
    self.bill_share_debts.where(status: 'active').joins(:bill).group(:lender_id).sum(:amount)
  end
end
