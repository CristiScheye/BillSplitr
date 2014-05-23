class Api::UsersController < Api::ApiController
  def index
    @users = User.all
    render :index
  end
end