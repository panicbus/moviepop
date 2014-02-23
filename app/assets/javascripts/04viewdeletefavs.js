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
                        + "<br><div data-index='"+i+"' data-method='zed' data-id='" + favs[i]['imdbID'] + "' class='what'><img src='" + favs[i]["poster"] + "'></div>"
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
      $('#movies_results').on('click', '#del_button', function(){
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
    $('#movies_results').on('click', 'div[data-method="zed"]', function(){
      var movieIndex = $(this).data('index');
      $.getJSON("/favorite").done(function(favs){
          // console.log("Index: "+movieIndex);
          // console.log(favs[movieIndex]["title"]);
          // console.log("Corresponding Hash:");
          // console.log(favs[movieIndex]);
          $('#movies_results').empty();
          // $("<div>PUT STUFF HERE!!</div>").hide().appendTo('#movies_results').fadeIn(500)
          $("<div class='poster'>"
              + "<img data-method='img' src=" + favs[movieIndex]["poster"] + ">"
              + "</div>"
              + "<div class='plot'>"
              + "<span class='searchedTitle'>" + favs[movieIndex]["title"] + "</span>"
              + "<p>" + favs[movieIndex]["year"] + "&nbsp;&nbsp;|&nbsp;&nbsp;"
              + "Rated: " + favs[movieIndex]["rated"] + "&nbsp;&nbsp;|&nbsp;&nbsp;"
              + favs[movieIndex]["genre"] + "</p>"
              + "<p>Director: " + favs[movieIndex]["director"] + "</p>"
              + "<p>Starring: " + favs[movieIndex]["actors"] + "</p>"
              + "<p>IMDB Rating: " + favs[movieIndex]["imdbRating"] + "</p>"
              + "<p>" + favs[movieIndex]["plot"] + "</p>"
              + "</div>"
          ).hide().appendTo('#movies_results').fadeIn(1000); // end of append template
      }) //end of getJSON func
    })
  }) // end of see_favorite onclick event handler
}); // end of document.ready