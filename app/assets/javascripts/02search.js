// 1. AFTER DOM LOADS
$(document).ready(function() {

  // 2. EVENT HANDLER TO LOOK FOR CLICK EVENT FOR SEARCH
  $('#ackbarsearches').on('click', function(event) {

    // 3. PREVENT DEFAULT OF FULL PAGE REFRESH
    event.preventDefault();

    // 4. AJAX REQUEST TO SEARCH FOR LIST OF MOVIES
    // GRAB THE VALUE IN THE SEARCH BOX FOR THE DATA
    $.ajax({
      url: "http://www.omdbapi.com/",
      data: { s: $('#search_movies').val() },
      dataType: "json",
      type: "get",
      // 5. AFTER A SUCCESSFUL AJAX REQUEST, APPEND THE INFO
      success: function(data) {
        // 6. PARSE THRU THE JSON
        var item = data["Search"];
        for (var i = 0; i < item.length ; i++) {
          var idNumber = item[i]['imdbID'];
          var title = item[i]["Title"];
          var year = item[i]["Year"];
          $("#movies_results").append("<li id="+idNumber+" class='movie'>"+title+" ("+year+")</li>").hide().fadeIn('fast');
        } // end of for loop
      } // end of success
    }) // end of ajax request

    // 7. CLEAR OUT THE SEARCH BOX
    $('#search_movies').val("");

    // 8. CLEAR OUT THE LIST OF PREVIOUSLY SEARCHED MOVIES
    $('#movies_results').empty();
  }); // end of ackbarsearches onclick/search event handler
}); //  end of document.ready

