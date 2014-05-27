BillSplit::Application.routes.draw do
  root to: 'sessions#new'

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index]
    resources :bills, only: [:index, :create]
    resources :payments, only: [:index, :create]

    get '/dashboard', to: 'users#balances'

    resources :bills, except: [:index, :create] do
      resources :bill_shares, only: [:index, :create]
    end

    resources :bill_shares, only: [:destroy]
  end
end
