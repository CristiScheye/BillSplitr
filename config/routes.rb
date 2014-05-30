BillSplit::Application.routes.draw do
  root to: 'static_pages#home'

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show]
    resources :bills, only: [:index, :create, :show]
    resources :bill_shares, only: [:index, :create, :update]

    get '/dashboard', to: 'users#balances'
    post '/update_balance', to: 'bill_shares#batch_update'

  end
end
