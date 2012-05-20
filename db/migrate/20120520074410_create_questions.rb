class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.integer :user_id
      t.string :question
      t.string :location
      t.text :tags

      t.timestamps
    end
  end
end
