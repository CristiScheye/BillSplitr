BillSplit::Application.routes.draw do
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show] do
      resources :bills, only: [:create]
    end

    resources :bills, except: [:index, :create] do
      resources :bill_shares, only: [:index, :create]
    end

    resources :bill_shares, only: [:update, :destroy]
  end

  root to: 'static_pages#home'
end
