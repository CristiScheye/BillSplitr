class Api::UsersController < Api::ApiController
  def index
    @users = User.all
    render :index
  end

  def dashboard
    @user = current_user
    @user_balances = current_user.balances_with_other_users
    render :dashboard
  end
end
