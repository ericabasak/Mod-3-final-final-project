Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :pairings
    end
  end
  namespace :api do
    namespace :v1 do
      resources :chocolates
    end
  end
  namespace :api do
    namespace :v1 do
      resources :wines
    end
  end
end
