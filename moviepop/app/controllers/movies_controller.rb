class MoviesController < ApplicationController
  before_filter :authenticate_user!, except: [:index, :show]

  def index
    @movies = Movie.all
    @movie = Movie.new
  end

  def create
    userId = current_user.id
    @movie = Movie.new
    favorites = Favorite.create(
      user_id: userId,
      title: params[:Title],
      year: params[:Year],
      rated: params[:Rated],
      released: params[:Released],
      runtime: params[:Runtime],
      genre: params[:Genre],
      director: params[:Director],
      writer: params[:Writer],
      actors: params[:Actors],
      plot: params[:Plot],
      poster: params[:Poster],
      imdbRating: params[:imdbRating],
      imdbVotes: params[:imdbVotes],
      imdbID: params[:imdbID],
      response: params[:Response]
    )
  end

  def favorite
    movies = Favorite.all
    current_fave_movie = []
    current_fave_poster = []
    movies.each do |movie|
      if movie["user_id"] == current_user.id
        current_fave_movie << movie["title"]
        current_fave_poster << movie["poster"]
      end
    end
    hash = { current_fave_movie: current_fave_movie, current_fave_poster: current_fave_poster}
    render json: hash
  end

end
