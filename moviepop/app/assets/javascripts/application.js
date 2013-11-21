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
        for (var i = 0; i < item.length ; i++) {
          console.log(item[i])
          $("#movies_results").append("<li>" + item[i]["Title"] + " (" + item[i]["imdbID"] + ")</li>");
          $('li').on("click", function(){
            $('#movies_results').empty();
            $('#movies_results').append("test")
          })
        }
      });
    });
  });