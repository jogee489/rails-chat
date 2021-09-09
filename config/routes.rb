Rails.application.routes.draw do
  resources :rooms
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  mount ActionCable.server => '/cable'
  root controller: :rooms, action: :index
end
