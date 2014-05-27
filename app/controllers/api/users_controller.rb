class Api::UsersController < Api::ApiController
  def index
    @users = User.all
    render :index
  end

  def show
    @user = User.find(params[:id])
    render partial: 'api/users/user', locals: { user: @user }
  end

  def balances
    @user_balances = current_user.balances_with_other_users
    @users = User.where(id: @user_balances.keys)
    render :balances
  end
end
