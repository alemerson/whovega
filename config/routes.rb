Rails3BootstrapDeviseCancan::Application.routes.draw do

  resources :messages

  authenticated :user do
    root :to => 'home#index'
  end
  
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  devise_scope :user do
    get 'sign_in', :to => 'users/sessions#new', :as => :new_user_session
    delete 'sign_out', :to => 'users/sessions#destroy', :as => :destroy_user_session
  end
  
  root :to => "home#index"
  resources :users do
    resources :questions
  end
  
  match 'proxy' => 'home#proxy'
  get :customer, :controller => 'knodes', :action => 'customer'
  
end
