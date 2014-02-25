// 1. AFTER DOM LOADS
$(document).ready(function() {

  // 2. EVENT HANDLER TO LOOK FOR CLICK EVENT FOR SEARCH
  $("#movies_results").on("click",'li.movie', function(event) {

    // 3. PREVENT DEFAULT OF FULL PAGE REFRESH
    event.preventDefault();

    // 4. AJAX REQUEST TO SEARCH THE MOVIE THAT THE USER CLICKED IN THE LIST OF MOVIES SEARCHED
    // GRAB THE ID FOR THE DATA
    var movieid = $(this).attr('id');
    $.ajax({
      url: "http://api.rottentomatoes.com/api/public/v1.0/movies/"+movieid+".json?apikey=nr9twk2r8vfgq5hkm6je8vmh",
      // data: { q: $(this).attr('id') },
      content: 'application/jsonp',
      dataType: "jsonp",
      type: "get",
      // 5. AFTER A SUCCESSFUL AJAX REQUEST, APPEND THE INFO
      // ALSO ALLOW USERS TO SAVE THIS INFO TO THEIR 'FAVORITES'
      success: function(dataTwo) {
        // 6. PARSE THRU THE JSON
        var poster = dataTwo['posters']['original'];
        var title = dataTwo['title'];
        var year = dataTwo['year'];
        var rating = dataTwo['mpaa_rating'];
        var criticScore = dataTwo['ratings']['critics_score'];
        var plot = dataTwo['critics_consensus'];
        $('#movies_results').append("<div class='poster'>"
            + "<img data-method='img' src=" + poster + "></div>"
            + "<div class='plot'><span class='searchedTitle'>" + title + "</span>"
            + "<p>" + year + "&nbsp;&nbsp;|&nbsp;&nbsp;"
            + "Rated: " + rating + "</p>"
            + "<p>IMDB Rating: " + criticScore + "</p>"
            + "<p>" + plot + "</p>"
            + "<p><button id='put_favorite'>Add to Your Favorites!</button></p>"
            + "</div>").hide().fadeIn('fast');
        // 7. AJAX REQUEST TO LET USERS SAVE THIS INFO TO THEIR 'FAVORITES'
        // WE INCLUDE THIS BECAUSE WE APPENED A "ADD TO FAVS" BUTTON ABOVE
        $('#put_favorite').on('click', function(){
          debugger
          $.ajax({
            url: "/index",
            data: dataTwo,
            type: "POST",
            success: function(element) {
              $('#put_favorite').css('background', '#e67e22').html('Movie Saved!').fadeOut('fast');
            },
            error: function() {
              alert("error");
              $('#put_favorite').css('background', '##e67e22').html('Sign in to Save!').click(function(){document.location.href='users/login';});
            }
          }); // end of ajax request
        }); // end of put_favorite onclick event handler
      }, // end of success
      error: function() {
        alert("Error");
      }
    }); // end of ajax request

    // 8. CLEAR OUT THE INFO OF PREVIOUSLY EXPANDED MOVIES
    $('#movies_results').empty();
  }); // end of the movies_results onclick/search event handler
}); // end of document.ready