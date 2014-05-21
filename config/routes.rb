BillSplit::Application.routes.draw do
  resources :users
  resource :session, only: [:new, :create, :destroy]

  root to: 'static_pages#home'
end
