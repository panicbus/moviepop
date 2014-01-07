class MoviesController < ApplicationController
  before_filter :authenticate_user!, except: [:index, :show]

  def index
    @movies = Movie.all
    @movie = Movie.new
  end

  def create
    # binding.pry
    userId = current_user.id
    @movie = Movie.new
    favorites = Favorite.create(
      user_id: userId,
      title: params[:title],
      year: params[:year],
      rated: params[:rated],
      runtime: params[:runtime],
      genre: params[:genres],
      director: params[:directors],
      writer: params[:writers],
      actors: params[:actors],
      plot: params[:plot_simple],
      poster: params[:poster][:cover],
      # rating: params[:rating],
      imdbID: params[:imdb_id],
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
