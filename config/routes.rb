Rails.application.routes.draw do
  resources :states, only: [:index, :show]
  root 'states#index'
  get "/is-weed-fucking-legal-here-yet", to: 'states#findme', as: 'findme'
  get "/correction", to: redirect("https://github.com/blairanderson/states/edit/master/db/states.json")


  get "/:id", to: "states#show"
end
