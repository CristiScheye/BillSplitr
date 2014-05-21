class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  include SessionsHelper

  def require_login!
    flash[:errors] = ["Please log in first!"]
    redirect_to new_session_path unless logged_in?
  end
end
