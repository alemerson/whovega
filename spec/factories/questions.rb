# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :question do
    user_id 1
    question "MyString"
    location "MyString"
    tags "MyText"
  end
end
