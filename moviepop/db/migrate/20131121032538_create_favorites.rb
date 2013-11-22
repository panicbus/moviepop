class CreateFavorites < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.integer :user_id
      t.string :title
      t.string :year
      t.string :rated
      t.string :released
      t.string :runtime
      t.string :genre
      t.string :director
      t.string :writer
      t.string :actors
      t.string :plot
      t.string :poster
      t.string :imdbRating
      t.string :imdbVotes
      t.string :imdbID
      t.string :response

      t.timestamps
    end
  end
end
