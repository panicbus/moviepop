class CreateFavorites < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.integer :user_id
      t.string :title
      t.string :year
      t.string :genre
      t.string :poster
      t.string :imdbRating
      t.string :imdbVotes
      t.string :director
      t.string :writer
      t.string :actors
      t.string :imdbID

      t.timestamps
    end
  end
end
