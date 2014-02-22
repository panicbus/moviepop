// 1. AFTER DOM LOADS
$(document).ready(function() {

  // 2. EVENT HANDLER FOR WHEN USER CLICKS ON 'SEE FAVS' BUTTON
  $('#see_favorites').on('click', function(){

    // 3. CLEAR OUT THE INFO OF PREVIOUSLY EXPANDED MOVIES OR LIST OF SEARCHED MOVIES
    $('#movies_results').empty();

    // 4. GETJSON FROM OUR CREATED JSON
    // JSON WAS CREATED VIA RUBY IN 'movies_controller' - 'favorites' METHOD
    $.getJSON("/favorite").done(function(favs){
      if (favs.length > 0) {
        $('#see_favorites').hide().css({"background": "#CCC"}).html("View All Your Favorites").fadeIn('slow');
        for (var i = 0; i < favs.length; i++) {
          var imdbId = favs[i]['imdbID'];
          var id = favs[i]['id'];
          var posterImg = favs[i]["poster"];
          $("<div data-method='img' data-id='" + imdbId + "' id='" + id + "' class='favorites' >"
                                        + "<br><img src='"+ posterImg +"'>" + "<br><div id='del_button'>"
                                        + "<button class='remove_fave' data-method='delete' data-id='"+ id+ "'>Unfavorite</button>"
                                        + "</div>"
                                       ).hide().appendTo('#movies_results').fadeIn(1000); // end of append template
        } // end of loop
      } else {
        $('#see_favorites').hide().css({"background": "orange"}).html("No Movies In Your Favorites!").fadeIn('slow');
      };
    }) //end of getJSON

    // 5. ALLOW USERS TO SEE MORE INFO BY CLICKING ON MOVIES IN THEIR FAVS LIST
    $('#movies_results').on('click', 'div[data-method="img"]', function(event){
      var id = $(this).attr("data-id")
      $.ajax({
        url: "http://www.omdbapi.com/?i=" + id,
        dataType: "json",
        type: "get",
        success: function(item) {
          var posterImg = item["Poster"];
          var title = item["Title"];
          var year = item["Year"];
          var rating = item["Rated"];
          var genre = item["Genre"];
          var director = item["Director"];
          var actors = item["Actors"];
          var imdbRating = item["imdbRating"];
          var plot = item["Plot"];
          $('#movies_results').empty();
          $('#movies_results').append("<div class='poster'>"
                                    + "<img data-method='img' src=" + posterImg + "></div>"
                                    + "<div class='plot'>"
                                    + "<span class='searchedTitle'>" + title + "</span>"
                                    + "<p>" + year + "&nbsp;&nbsp;|&nbsp;&nbsp;"
                                    + "Rated: " + rating + "&nbsp;&nbsp;|&nbsp;&nbsp;"
                                    + genre + "</p>"
                                    + "<p>Director: " + director + "</p>"
                                    + "<p>Starring: " + actors + "</p>"
                                    + "<p>IMDB Rating: " + imdbRating + "</p>"
                                    + "<p>" + plot + "</p>"
                                    + "</div>");
        }
      }); //end of AJAX request

      // 6. ALLOW USERS TO REMOVE MOVIES FROM THEIR FAVORITES
      $('#movies_results').on('click', '#del_button', function(event){
       event.stopPropagation();
        var id = $(this).attr("data-id")
        $.ajax({
          url: "/movies/"+id,
          method: "DELETE",
          success: function(){
            var item_id = "#" + id;
            $(item_id).fadeOut('fast', function(){
              $(this).remove();
            });
          }
        })
      }); //end of event handler for delete action

    }); //ends of click event for user to see more info of movies saved in their favs list
  }) // end of click event to see user's favs
 }) // end of the document.ready