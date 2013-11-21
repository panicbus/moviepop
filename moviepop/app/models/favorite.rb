class Favorite < ActiveRecord::Base
  attr_accessible :actors, :director, :genre, :imdbRating, :imdbVotes, :poster, :title, :user_id, :writer, :year, :imdbID

  belongs_to :user
end
