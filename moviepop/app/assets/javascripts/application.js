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
              $('#movies_results').append("<div id='" + favs[i]['id'] + "' class='favorites' >"
                                          + favs[i]["title"]
                                          + "<br><img src='"
                                          + favs[i]["poster"]
                                          + "'>"
                                          + "<br><div id='del_button'>"
                                          + "<button class='remove_fave' data-method='delete' data-id='"
                                          + favs[i]['id']
                                          + "'>Remove this movie</button>"
                                          + "</div>"
                                          + "</div>"
                                         );
            // end of loop 2
          } // end of loop 1
        }) //end of json func


        //delete
      $('#movies_results').on('click', 'button[data-method="delete"]', function(event){
        console.log("BOOM")
        // console.log($(this).parent())
        var id = $(this).attr("data-id")
        $.ajax({
          url: "/movies/"+id,
          method: "DELETE",
        }).done(function(){

          var item_id = "#" + id;
          console.log(item_id);
          $(item_id).remove();

        })
      }); //ends delete

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
          $("#movies_results").append("<li id=" + item[i]['imdbID'] + " class='movie'>" + item[i]["Title"] + "</li>");
        $('li').css('cursor', 'pointer');
        }
      });
    });

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
        var poster = "<img src=" + item["Poster"] + ">"
        var plot = item["Plot"]
      $('#movies_results').append("<button id='favorite'>Favorite This Movie</button> "
                                    + "<div class='poster'>"
                                    + poster
                                    + "</div>"
                                    + "<br>"
                                    + "<div id='plot'>"
                                    + plot
                                    + "</div>");

        $('#favorite').on('click', function(){
        // console.log(item);
        var favorites = $.ajax({
          url: "/movies",
          data: item,
          type: "POST",
        });
      })


      }) // ends the see favorites block

    }) // ends the single movie show

}) // ends main page



// check out codedrop for design
