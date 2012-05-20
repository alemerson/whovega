class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.text :message
      t.text :request_sent
      t.text :request_response
       
      t.timestamps
    end
  end
end
