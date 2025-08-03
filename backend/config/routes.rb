Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth'

      resources :places, only: %w[index show]
      post 'autocomplete', to: 'autocomplete#create' 
    end
  end
end
