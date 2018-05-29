class CreateTeams < ActiveRecord::Migration[5.1]
  def change
    create_table :teams do |t|
      t.string :team_key
      t.string :name
      t.string :scoring_type
      t.string :team_logo
      t.string :yahoo_url
      t.string :strategy
      t.integer :user_id

      t.timestamps
    end
  end
end
