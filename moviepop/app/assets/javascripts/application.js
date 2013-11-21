// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .


  // start of the jQuery ready function and makes sure page is loaded and ready

  $(function() {
    // alert("test");

    // 1. prevent default action of the form (prevent it from going to the search method in the controller)
    $('form').on('submit', function(event) {
      event.preventDefault();
      // 2. capture the params of the form
      var query = $('#search_movies').val();
      // 3. do a "GET" request to sent the params to get info
      var get_request = $.ajax({
        url: "http://www.omdbapi.com/?r=JSON&s=" + query,
        dataType: "json",
        type: "get",
      }); //end of AJAX request

      $('#movies_results').empty();

      get_request.done(function(data) {
          // for (var i = 0; i < data.length; i++) {
          // console.log(data["Search"])
          // }
          var item = data
          // debugger
          console.log(item["Search"][0])
          $("#movies_results").append(item["Search"][0]["Title"]);
      });

      $('#search_movies').empty();
    });

  });