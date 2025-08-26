Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth',
      controllers: { registrations: 'api/v1/overrides/registrations' }

      resources :places, only: [:index, :create, :show]

      post 'autocomplete', to: 'autocomplete#create' 

      resources :likes, only: [ :index, :create, :destroy]

    end
  end
end
