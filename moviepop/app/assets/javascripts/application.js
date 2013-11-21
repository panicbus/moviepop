//= require jquery
//= require jquery_ujs
//= require_tree .

  $(function() {
    // alert("test");

    // 1. prevent default action of the form (prevent it from going to the search method in the controller)
    $('form').on('submit', function(event) {
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

      get_request.done(function(data) {
        var item = data["Search"]
        // var poster = data["Poster"]
        for (var i = 0; i < item.length ; i++) {
          // console.log(item[i])
          idNumber = item[i]['imdbID']
          $("#movies_results").append("<li id=" + item[i]['imdbID'] + ">" + item[i]["Title"] + " (" + item[i]["imdbID"] + ")</li>");
          $('li').css('cursor', 'pointer');
          $('li[id]').on("click", function(){
            $('#movies_results').empty();
            $('#movies_results').append(idNumber)


            // var get_request = $.ajax({
            //   url: "http://www.omdbapi.com/?i=" + "Star",
            //   dataType: "json",
            //   type: "get",
            // }).done(function(){
            //   alert("test")
            // });

          })
        }
      });
    });
  });


        // $("#movies_results").append(
        //   '<li><a href="/movies/">'+ item[i]["Title"] +
        //   ' - ' + item[i]["Year"] +
        //   ' (' + item[i]["imdbID"] + ')</a></li>');

