class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by_credentials( {
      email: params[:email],
      password: params[:password]
      })

    if @user
      login_user!(@user)
      redirect_to user_url(@user)
    else
      flash.now[:errors] = ["Wrong email and/or password"]
      render :new
    end
  end

  def destroy
    session[:token] = nil
    redirect_to root_url
  end
end