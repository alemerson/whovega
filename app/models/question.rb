class Question < ActiveRecord::Base
  belongs_to :user
  attr_accessible :question, :user_id, :location, :tags
end
