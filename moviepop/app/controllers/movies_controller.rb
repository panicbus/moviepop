class MoviesController < ApplicationController
  before_filter :authenticate_user, except: [:index, :show]

  def index
    @movies = Movie.all
    @movie = Movie.new
  end

end
