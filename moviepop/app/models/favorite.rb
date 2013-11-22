class Favorite < ActiveRecord::Base
  attr_accessible :title, :year, :rated, :released, :runtime, :genre, :director, :writer, :actors, :plot, :poster, :imdbRating, :imdbVotes, :imdbID, :response, :user_id

  belongs_to :user
end
