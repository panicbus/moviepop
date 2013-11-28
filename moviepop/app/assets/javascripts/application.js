//= require jquery
//= require jquery_ujs
//= require_tree .

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

 }) // ends the see favorites on click function

    // 1. prevent default action of the form (prevent it from going to the search method in the controller)
    $('#ackbarsearches').on('click', function(event) {
      event.preventDefault();

      // 2. capture the params of the form
      var query = $('#search_movies').val();

      // 3. do a "GET" request to sent the params to get info
      var get_request = $.ajax({
        url: "http://www.omdbapi.com/?s=" + query,
        dataType: "json",
        type: "get",
      }); //end of AJAX request

      // 4. clear the div and the search box
      $('#movies_results').empty();
      $('#search_movies').val("");

      // 5. loop to get movie title and id#
      get_request.done(function(data) {
        var item = data["Search"]
        for (var i = 0; i < item.length ; i++) {
          // console.log(item[i])
          var idNumber = item[i]['imdbID']
          $("#movies_results").append("<li id=" + item[i]['imdbID'] + " class='movie'>" + item[i]["Title"] + " - " + item[i]["Year"] + "</li>");
        $('li').css('cursor', 'pointer');
        } // ends loop
      }); // ends get_request data
    }); // ends ackbarsearches

    $("#movies_results").on("click",'li.movie', function() {
      var id = $(this).attr('id');

    // 6. second ajax request to
      var get_request_two = $.ajax({
        url: "http://www.omdbapi.com/?i=" + id,
        dataType: "json",
        type: "get",
      });

      $('#movies_results').empty();
      // 6.5. this empties and appends the movie id to the div
      // $('#movies_results').append(id)

      // 7. this is DELEGATION
      get_request_two.done(function(dataTwo) {
        var item = dataTwo

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
                                    + "<p><button id='put_favorite'>Add to Your Favorites!</button></p>"
                                    + "</div>");

        $('#put_favorite').on('click', function(){
        event.stopPropagation();
        // console.log("bang");
        var favorites = $.ajax({
          url: "/movies",
          data: item,
          type: "POST",
          // success: showSuccessMessage
        }); // ends this ajax
        // >>>>>>>>
            // console.log('boom!')
            // $('.flash_success').

        }); //ends put_favorite block


      }); // ends the delegate block

    }); // ends the single movie show

}); // ends main page


// check out codedrop for design
