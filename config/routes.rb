Moviepop::Application.routes.draw do
  devise_for :users, path_names: {sign_in: "login", sign_out: "logout"}

  resources :movies
  root to: "movies#index"
  get "search", to: "movies#search"
  get "movies", to: "movies#index"
  get 'favorite', to: 'movies#favorite'
end
