class MoviesController < ApplicationController
  before_filter :authenticate_user!, except: [:index, :show]

  def index
    @movies = Movie.all
    @movie = Movie.new
  end

  def create
    userId = current_user.id
    @movie = Movie.create
    favorites = Favorite.create(
      user_id: userId,
      title: params[:title],
      year: params[:year],
      rated: params['mpaa_rating'],
      released: params['release_dates']['theater'],
      runtime: params[:runtime],
      genre: params[:Genre],
      director: params[:Director],
      writer: params[:Writer],
      actors: params[:Actors],
      plot: params['critics_consensus'],
      poster: params['posters']['original'],
      imdbRating: params[:rating],
      imdbVotes: params[:imdbVotes],
      imdbID: params['alternate_ids']['imdb'],
      response: params[:Response]
    )
    # redirect_to :action => 'contact'
  end

  def favorite
    #movies = current_user.favorites
    movies = Favorite.where(user_id: current_user.id)
    render json: movies
  end

  def destroy
    Favorite.delete(params[:id])
    render nothing: true, status: 200
  end

end
