Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      get "home", to: "home#show"
      get "settings", to: "settings#show"
      resources :posts, only: %i[index show]
      resources :destinations, only: %i[index show]
      resources :combos, only: %i[index show]
      resources :reviews, only: %i[index create]
      resources :inquiries, only: %i[create]
      post "login", to: "sessions#create"
      delete "logout", to: "sessions#destroy"

      namespace :admin do
        resources :posts
        resources :destinations
        resources :combos
        resources :reviews, only: %i[index update destroy]
        resources :inquiries, only: %i[index update destroy]
        get "settings", to: "settings#show"
        put "settings", to: "settings#update"
        patch "settings", to: "settings#update"
      end
    end
  end
end
