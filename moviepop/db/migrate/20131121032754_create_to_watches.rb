class CreateToWatches < ActiveRecord::Migration
  def change
    create_table :to_watches do |t|
      t.integer :user_id
      t.string :title
      t.string :year
      t.string :genre
      t.string :poster
      t.float :imdbRating
      t.integer :imdbVotes
      t.string :director
      t.string :writer
      t.string :actors

      t.timestamps
    end
  end
end
