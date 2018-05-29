class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :email
      t.string :nickname
      t.string :image_url
      t.string :guid
      t.string :current_team_key

      t.timestamps
    end
  end
end