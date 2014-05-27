class Api::UsersController < Api::ApiController
  def index
    @users = User.all
    render :index
  end

  def balances
    @user_balances = current_user.balances_with_other_users
    @users = User.where(id: @user_balances.keys)
    render :balances
  end
end
