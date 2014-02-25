// 1. AFTER DOM LOADS
$(document).ready(function(){

  // 2. APPEND SPLASH IMAGE
  $('.splash').append('<img src="/assets/img.png" id="splash">');

  // 3. EVENT HANDLER TO LOOK FOR CLICK EVENT FOR SEARCH
  $('#ackbarsearches').on('click', function(){
    $('.splash').hide();
    $('#hello').hide();
  });

  // 4. WHEN USER SEARCHES OR LOOKS @ FAVORITES THE SPLASH IMAGE HIDES
  $('#see_favorites').on('click', function(){
    $('.splash').hide();
    $('#hello').hide();
  })
})
