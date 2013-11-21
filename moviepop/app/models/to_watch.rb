class ToWatch < ActiveRecord::Base
  attr_accessible :actors, :director, :genre, :imdbRating, :imdbVotes, :poster, :title, :user_id, :writer, :year
end
