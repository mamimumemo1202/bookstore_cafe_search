Rails.application.routes.draw do

  root "health#index"
  get  "/healthz", to: "health#index"

  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for "User", at: "auth",
      controllers: { registrations: "api/v1/overrides/registrations" }

      resources :places, only: [ :index, :create, :show ] do
        collection do
          get :get_details_bulk
        end

        member do
          get :geometry
        end
      end

      post "autocomplete", to: "autocomplete#create"

      resources :likes, only: [ :index, :create, :destroy ]

      get "/photos", to: "photos#show"
    end
  end
end
