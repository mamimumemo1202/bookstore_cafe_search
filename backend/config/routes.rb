Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :places, only: %w[index show]
      post 'autocomplete', to: 'autocomplete#create' 
    end
  end
end
