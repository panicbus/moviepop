Moviepop::Application.routes.draw do
  devise_for :users, path_names: {sign_in: "login", sign_out: "logout"}

  root to: "movies#index"
  resources :movies

  post "index", to: "movies#create"
  match "search", to: "movies#search"
  match 'favorite', to: 'movies#favorite'
end