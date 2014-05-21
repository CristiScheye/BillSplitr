module SessionsHelper
  def login_user!(user)
    session[:token] = user.reset_session_token!
    @current_user = user
  end

  def current_user
    @current_user || User.find_by_session_token(session[:token])
  end

  def logged_in?
    !!current_user
  end
end