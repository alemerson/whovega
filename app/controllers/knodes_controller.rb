class KnodesController < ApplicationController
  include Knodes
  
  def customer
    @customer = HTTParty.get('https://api.knod.es/customers.json?customer_id=4fb7e55a8e6396c715000009&customer_secret=09e7b248685712add0a71142177e3c31bcf824cc167e2266b2fca2c3a7df8db0')
  end
  
end
