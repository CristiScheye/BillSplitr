class Api::FriendshipsController < Api::ApiController
  def create
    friend = User.find_or_create_by(email: friend_params[:email])
    unless friend.persisted?
      friend.f_name, friend.l_name = 'NAME', 'NAME'
      friend.password = SecureRandom.urlsafe_base64
      friend.save
    end
    friendship = current_user.friendships.build(friend: friend)

    if friendship.save
      redirect_to api_user_url(friend)
    else
      render json: {
        errors: friendship.errors.full_messages,
        status: :unprocessable_entity
      }
    end
  end

  private
  def friend_params
    params.require(:friend).permit(:email)
  end
end