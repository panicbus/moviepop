//= require jquery
//= require jquery_ujs
//= require_tree .

$(function() {

    // var showFavorites = function(){
    $('#see_favorites').on('click', function(){
    $('#movies_results').empty();
      // showFavorites();

        $.getJSON("/favorite").done(function(favs){
          for (var i = 0; i < favs.length; i++) {
          $("<div id='" + favs[i]['id'] + "' class='favorites' >"
                        + "<br><div data-method='zed' data-id='" + favs[i]['imdbID'] + "' class='what'><img src='" + favs[i]["poster"] + "'></div>"
                        + "<div id='del_button' data-id='" + favs[i]['id'] + "'>"
                        + "<button class='remove_fave' data-method='delete'>Unfavorite</button>"
                        + "</div>"
                        + "</div>"
                       ).hide().appendTo('#movies_results').fadeIn(1000); // end of append template
          } // end of loop
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
          var id = $(this).attr("data-id");
          console.log(id);
          console.log(this);
          var get_request_dataz = $.ajax({
            url: "http://mymovieapi.com/?type=json&id=" + id,
            dataType: "json",
            type: "get",
          }); //end of AJAX request

          get_request_dataz.done(function(dataz) {
            var item = dataz;
          $('#movies_results').empty();
          $('#movies_results').append("<div class='poster'>"
                                    + "<img data-method='img' src=" + item["poster"]["cover"] + ">"
                                    + "</div>"
                                    + "<div class='plot'>"
                                    + "<span class='searchedTitle'>" + item["title"] + "</span>"
                                    + "<p>" + item["year"] + "&nbsp;&nbsp;|&nbsp;&nbsp;"
                                    + "Rated: " + item["rated"] + "&nbsp;&nbsp;|&nbsp;&nbsp;"
                                    + item["genres"] + "</p>"
                                    + "<p>Director: " + item["directors"] + "</p>"
                                    + "<p>Starring: " + item["actors"] + "</p>"
                                    + "<p>IMDB Rating: " + item["rating"] + "</p>"
                                    + "<p>" + item["plot_simple"] + "</p>"
                                    + "</div>");
          }); // ends dataz.done
    }); //ends ++++++++++++

 }); // ends the see favorites on click function
// }; // showFavorites wrapper


    // 1. prevent default action of the form (prevent it from going to the search method in the controller)
    $('#ackbarsearches').on('click', function(event) {
      event.preventDefault();

      // 2. capture the params of the form
      var query = $('#search_movies').val();

      // 3. do a "GET" request to sent the params to get info
      var get_request = $.ajax({
        // url: "http://mymovieapi.com/?type=json&q=" + query,
        url: "http://mymovieapi.com/?title=" + query + "&type=json&plot=simple&limit=8",
        dataType: "json",
        type: "get",
      }); //end of AJAX request

      // 4. clear the div and the search box
      $('#movies_results').empty();
      $('#search_movies').val("");

      // 5. loop to get movie title and id#
      get_request.done(function(data) {
        var item = data
        var poster = data[0]["poster"]["cover"]
        var rating = data[0]["rating"]

        for (var i = 0; i < item.length; i++) {
          // console.log(item[i])
          var id = item[i]['imdb_id']

          $("#movies_results").append("<li id=" + item[i]['imdb_id'] + " class='movie'>" + item[i]["title"] + " - " + item[i]["year"] + "</li>");
        $('li').css('cursor', 'pointer');
        } // ends loop
      }); // ends get_request data
    }); // ends ackbarsearches

    $("#movies_results").on("click",'li.movie', function() {
      var id = $(this).attr('id');

    // 6. second ajax request to
      var get_request_two = $.ajax({
        url: "http://mymovieapi.com/?type=json&id=" + id,
        dataType: "json",
        type: "get",
      });

      $('#movies_results').empty();

      // 7. this is DELEGATION
      get_request_two.done(function(dataTwo) {
        var item = dataTwo

      $('#movies_results').append("<div class='poster'>"
                                    + "<img data-method='img' src=" + item["poster"]["cover"] + ">"
                                    + "</div>"
                                    + "<div class='plot'>"
                                    + "<span class='searchedTitle'>" + item["title"] + "</span>"
                                    + "<p>" + item["year"] + "&nbsp;&nbsp;|&nbsp;&nbsp;"
                                    + "Rated: " + item["rated"] + "&nbsp;&nbsp;|&nbsp;&nbsp;"
                                    + item["genres"] + "</p>"
                                    + "<p>Director: " + item["directors"] + "</p>"
                                    + "<p>Starring: " + item["actors"] + "</p>"
                                    + "<p>IMDB Rating: " + item["rating"] + "</p>"
                                    + "<p>" + item["plot_simple"] + "</p>"
                                    + "<p><button id='put_favorite'>Add to Your Favorites!</button></p>"
                                    + "</div>");

        $('#put_favorite').on('click', function(){
        event.stopPropagation();
        var favorites = $.ajax({
          url: "/movies",
          data: item,
          type: "POST",
          // success: showSuccessMessage
        }); //ends ajax

        }); //ends put_favorite block

      }); // ends the delegate block

    }); // ends the single movie show

}); // ends main page
