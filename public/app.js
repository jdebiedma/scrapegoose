$.getJSON("/stories", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#stories").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});

$(document).on("click", "p", function() {
  // Empty the comments from the comment section
  $("#comments").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Story
  $.ajax({
    method: "GET",
    url: "/stories/" + thisId
  })
    // With that done, add the comment to the page
    .done(function(data) {
      console.log(data);
      // The title of the story
      $("#comments").append("<h2>" + data.title + "</h2>");
      // An input to enter a new name
      $("#comments").append("<input id='nameinput' name='my_name' >");
      // A textarea to add a new comment body
      $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new comment, with the id of the story saved to it
      $("#comments").append("<button data-id='" + data._id + "' id='submitComment'>Submit Comment</button>");

      // If there's a note in the article
      if (data.comment) {

      	
        // Place the title of the note in the title input
        $("#nameinput").val(data.comment.my_name);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.comment.body);
      }
    });
});

$(document).on("click", "#submitComment", function() {
  // Grab the id associated with the story from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the comment, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/stories/" + thisId,
    data: {
      // Value taken from name input
      my_name: $("#nameinput").val(),
      // Value taken from comment textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the comments section
      $("#comments").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#nameinput").val("");
  $("#bodyinput").val("");
});