class HomeController < ApplicationController
  include Knodes
  
  def index
    @users = User.all
  end
  
  def proxy
  	response = HTTParty.get(params[:url])
	render :text => response.body
  end
end
