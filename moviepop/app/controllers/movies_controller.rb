class MoviesController < ApplicationController
  before_filter :authenticate_user, except: [:index, :show]

  def index
    movie_title = params[:movie_title]

    movies = Typhoeus.get(
      "http://www.omdbapi.com",
      :params => { :s => params[:movie_title] }
    )
    @result = JSON.parse(movies.body)["Search"]
    # if @results == nil
    #   redirect_to not_found_path
    # end
  end

end
