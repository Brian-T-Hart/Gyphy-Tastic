var giphyArray = ["cat","dog","hampster","horse","pig","goat","cow","wombat","tiger","elephant"];
  
  var animate = "animate";
  var still = "still";

  function displayGiphy() {
    $("#giphyColumn").empty();
    var newGiph = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + newGiph + "&api_key=125d9ce30bb54c32980055afd7cfc236&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
        var stillArray = [];
        var animateArray = [];
      for (var i = 0; i < 10; i++) {
        var stillUrl = response.data[i].images.original_still.url;
        stillArray.push(stillUrl);
        var animateUrl = response.data[i].images.original.url;
        animateArray.push(animateUrl);
        var s = $('<span>').html('<img id="' + i + '" data-state="still" src="' + stillUrl + '">');
        $('#giphyColumn').append(s);
      }
        $("img").on("click", function() {
          var n = $(this).attr("id");
          console.log(n);
          var animsrc = animateArray[n];
          console.log(animsrc);
          var stillsrc = stillArray[n];
          console.log(stillsrc);
          var state = $(this).attr("data-state");
            if (state === "still") {
              $(this).attr("data-state", animate);
              $(this).attr("src", animsrc);
            }
            else {
              $(this).attr("src", stillsrc);
              $(this).attr("data-state", still)
            }
      });
    });
  }

  function renderButtons() {
        $("#buttonRow").empty();
        for (var i = 0; i < giphyArray.length; i++) {
          var a = $("<button>");
          a.addClass("giphyButton btn btn-default");
          a.attr("data-name", giphyArray[i]);
          a.text(giphyArray[i]);
          $("#buttonRow").append(a);
        }
  }

  $("#addGiphy").on("click", function(event) {
        event.preventDefault();
        var newGiph = $("#giphyInput").val().trim();
        giphyArray.push(newGiph);
        $("#giphyInput").val("");
        renderButtons();
      });

  $(document).on("click", ".giphyButton", displayGiphy);
  renderButtons();