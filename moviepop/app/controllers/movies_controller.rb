class MoviesController < ApplicationController
  before_filter :authenticate_user, except: [:index, :show]

  def index
    @movies = Movie.all
    @movie = Movie.new
    @search = params[:smith]
    respond_to do |format|
      format.html
      format.json { render :json => @movies }
    end
  end


  def search
    @search = params[:smith]
    @movie = Typhoeus.get(
      "http://www.omdbapi.com",
      :params => { :s => params[:smith] }
      )
    @mapped_movies = @movie.map do |mov|
      {
        :movie => movie
        # :name => mov[:user][:name],
        # :screename => mov[:user][:screen_name],
        # # :timezone => mov[:user][:time_zone],
        # :text => mov[:text]
      }
    end
    render :json => @mapped_movies
  end

  def create
    @movie = Movie.create(params[:movie])
     respond_to do |format|
         format.js
         # This will create the new item via a post request but it will respond with JavaScript
     end
  end

end
