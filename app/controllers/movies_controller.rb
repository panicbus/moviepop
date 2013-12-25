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
    if @movies.save
       flash[:message] = "Movie saved to your DB"
    else
       flash[:message] = "Oops Something went wrong"
    end
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
