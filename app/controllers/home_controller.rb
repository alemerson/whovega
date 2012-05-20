class HomeController < ApplicationController

  
  def index
    @users = User.all
  end
  
  def proxy
	puts "test"
  end
end
