$(document).ready(function() {

    // var showFavorites = function(){
    $('#see_favorites').on('click', function(){
      $('#movies_results').empty();

      // showFavorites();
        $.getJSON("/favorite").done(function(favs){
          if (favs.length > 0) {
            $('#see_favorites').hide().css({"background": "#CCC"}).html("View All Your Favorites").fadeIn('slow');
            for (var i = 0; i < favs.length; i++) {
            $("<div id='" + favs[i]['id'] + "' class='favorites' >"
                        + "<br><div data-method='zed' data-id='" + favs[i]['imdbID'] + "' class='what'><img src='" + favs[i]["poster"] + "'></div>"
                        + "<div id='del_button' data-id='" + favs[i]['id'] + "'>"
                        + "<button class='remove_fave' data-method='delete'>Unfavorite</button>"
                        + "</div>"
                        + "</div>"
                       ).hide().appendTo('#movies_results').fadeIn(1000); // end of append template
            } // end of loop
          } else {
            $('#see_favorites').hide().css({"background": "orange"}).html("No Movies In Your Favorites!").fadeIn('slow');
          }
        }) //end of getJSON func

        //////DELETE BUTTON//////
      $('#movies_results').on('click', '#del_button', function(event){
       // event.stopPropagation();
        var id = $(this).attr("data-id");
        $.ajax({
          url: "/movies/"+id,
          method: "DELETE",
        }).done(function(){
          var item_id = "#" + id;
          $("*[id=" + id + "]").fadeOut(1000, function(){
            $(this).remove();
          });
        })
      }); //ends delete


    // click movie poster in faves to see details +++++++++++
    $('#movies_results').on('click', 'div[data-method="zed"]', function(event){
      $('#movies_results').empty();
      $.getJSON("/favorite").done(function(favs){
        if (favs.length > 0) {
          $('#see_favorites').hide().css({"background": "#CCC"}).html("View All Your Favorites").fadeIn('slow');
          $("<div class='poster'>"
              + "<img data-method='img' src=" + favs["Poster"] + ">"
              + "</div>"
              + "<div class='plot'>"
              + "<span class='searchedTitle'>" + favs["Title"] + "</span>"
              + "<p>" + favs["Year"] + "&nbsp;&nbsp;|&nbsp;&nbsp;"
              + "Rated: " + favs["Rated"] + "&nbsp;&nbsp;|&nbsp;&nbsp;"
              + favs["Genre"] + "</p>"
              + "<p>Director: " + favs["Director"] + "</p>"
              + "<p>Starring: " + favs["Actors"] + "</p>"
              + "<p>IMDB Rating: " + favs["imdbRating"] + "</p>"
              + "<p>" + favs["Plot"] + "</p>"
              + "</div>"
                     ).hide().appendTo('#movies_results').fadeIn(1000); // end of append template
        } // end of loop
      }) //end of getJSON func
    })
  }) // end of see_favorite onclick event handler
}); // end of document.ready