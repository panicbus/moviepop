class Favorite < ActiveRecord::Base
  attr_accessible :user_id, :title, :year, :genre, :poster, :imdbRating, :imdbVotes, :director, :writer, :actors, :imdbID

  belongs_to :user
end
