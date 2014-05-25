json.partial! 'api/users/user', user: @user

json.balances @user_balances.keys, partial: 'api/users/user_with_balance', as: :user