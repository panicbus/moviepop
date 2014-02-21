$(function() {
    $('#see_favorites').on('click', function(){
    $('#movies_results').empty();

        $.getJSON("/favorite").done(function(favs){
          // console.log(favs["current_fave_movie"][1])
          // => favs = {[],[]}
          // but we want => favs = {[{title:, poster: },...]}
          console.log(favs)
          for (var i = 0; i < favs.length; i++) {

          $("<div data-method='img' data-id='" + favs[i]['imdbID'] + "' id='" + favs[i]['id'] + "' class='favorites' >"
                                          + "<br><img src='"
                                          + favs[i]["poster"]
                                          + "'>"
                                          + "<br><div id='del_button'>"
                                          + "<button class='remove_fave' data-method='delete' data-id='"
                                          + favs[i]['id']
                                          + "'>Unfavorite</button>"
                                          + "</div>"
                                          + "</div>"
                                         ).hide().appendTo('#movies_results').fadeIn(1000); // end of append template
          } // end of loop
        }) //end of getJSON func

        // click Favorite to see details +++++++++++
        $('#movies_results').on('click', 'div[data-method="img"]', function(event){
        // $('#movies_results').empty();

          var id = $(this).attr("data-id")
          console.log(id)
          var get_request_dataz = $.ajax({
            url: "http://www.omdbapi.com/?i=" + id,
            dataType: "json",
            type: "get",
          }); //end of AJAX request

          get_request_dataz.done(function(dataz) {
            var item = dataz
            $('#movies_results').empty();
          $('#movies_results').append("<div class='poster'>"
                                        + "<img data-method='img' src=" + item["Poster"] + ">"
                                        + "</div>"
                                        + "<div class='plot'>"
                                        + "<span class='searchedTitle'>" + item["Title"] + "</span>"
                                        + "<p>" + item["Year"] + "&nbsp;&nbsp;|&nbsp;&nbsp;"
                                        + "Rated: " + item["Rated"] + "&nbsp;&nbsp;|&nbsp;&nbsp;"
                                        + item["Genre"] + "</p>"
                                        + "<p>Director: " + item["Director"] + "</p>"
                                        + "<p>Starring: " + item["Actors"] + "</p>"
                                        + "<p>IMDB Rating: " + item["imdbRating"] + "</p>"
                                        + "<p>" + item["Plot"] + "</p>"
                                        + "</div>");
          }); // ends dataz


        //delete
      $('#movies_results').on('click', 'button[data-method="delete"]', function(event){
       event.stopPropagation();
        var id = $(this).attr("data-id")
        $.ajax({
          url: "/movies/"+id,
          method: "DELETE",
        }).done(function(){

          var item_id = "#" + id;
          // console.log(item_id);
          $(item_id).fadeOut(1000, function(){
            $(this).remove();
          });
        })

      }); //ends delete
    }); //ends ++++++++++++
  })
 }) // ends the see favorites on click function