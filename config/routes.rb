Inspired::Application.routes.draw do |map|
  resources :boards do
    resources :shots
  end
  root :to => "boards#index"
end
