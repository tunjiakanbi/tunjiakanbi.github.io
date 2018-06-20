$("document").ready(function () {
    var topicsArray = ['dog', 'cat', 'rabbit', 'hamster', 'skunk', 'goldfish', 'bird', 'ferret'];

    function topicButtons() {
        console.log('topic buttons');
        $("#topics-appear-here").empty();
        for (var t = 0; t < topicsArray.length; t++) {
            var topicButton = $("<button>");
            topicButton.attr("data-topic", topicsArray[t]);
            topicButton.addClass("btn btn-info topic_Button");
            topicButton.text(topicsArray[t]);

            // topicButton.attr("class", "btn btn-info");
            // topicButton.attr("class", "topic_Button");

            $("#topics-appear-here").append(topicButton);

            // topicButton.attr("class", "topic_Button");
        }
    }

    $("#addTopic").on("click", function (event) {
        event.preventDefault();
        var topic = $("#topicInput").val().trim();
        topicsArray.push(topic);
        $("#topicInput").val("");
        topicButtons();
    });

    function getTopicImages() {
        var topicName = $(this).attr("data-topic");
        var topicString = topicName.split(" ").join("+");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topicString + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);
            var results = response.data;
            $("#imageSection").empty();
            for (var i = 0; i < results.length; i++) {
                var topicDiv = $('<div class="topicImgHolder">');
                // topicDiv.attr("class", "topicImg");
                // topicDiv.addClass("topicImg");
                // topicDiv.addClass("topicImgHolder");
                var rating = $("<h2>").html("Ratings: " + results[i].rating);
                topicDiv.append(rating);
                var topicImage = $("<img>");
                topicImage.attr("src", results[i].images.fixed_height_still.url);
                topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                topicImage.attr("data-animate", results[i].images.fixed_height.url);
                topicImage.attr("data-state", "still");
                topicImage.addClass("topic_Image");
                topicDiv.append(topicImage);
                $("#imageSection").append(topicDiv);
            }
        });
    }

    function animateTopic() {
        console.log('animate topic');
        console.log(this);
        var state = $(this).attr("data-state");
        if (state === "still") {
                $(this).attr('src', $(this).attr('data-animate'));
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state', 'still');
            }

        // var state = $(this).find("img").attr("data-state");
        // if (state === "still") {
        //     $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
        //     $(this).find("img").attr("data-state", "animate");
        // } else {
        //     $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
        //     $(this).find("img").attr("data-state", "still");
        // }
    }

    // $(document).ready(function () {
       
        topicButtons();
    // });

    $(document).on("click", ".topic_Button", getTopicImages);
    // $(document).on("click", ".topicImgHolder", animateTopic);
    // $(".topicImgHolder").click(function(e){
    //     console.log(e);
    // });
    $(document).on("click", ".topic_Image", animateTopic);






    // $("button").on("click", function () {
    //     var topic = $(this).attr("data-topic", topics[1]);
    //     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    //         topic + "&api_key=dc6zaTOxFJmzC&limit=10";

    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     }).then(function (response) {
    //         console.log(response);
    //         var results = response.data;
    //         for (var i = 0; i < results.length; i++) {

    //             var topicDiv = $("<div>");
    //             var p = $("<p>").text(text);
    //             var text = results[i].rating;
    //             var topicImage = $("<img>");
    //             topicImage.attr("src", results[i].images.fixed_height.url);
    //             topicDiv.prepend(p);
    //             topicDiv.append(topicImage);
    //             $("#topics-appear-here").prepend(topicDiv);
    //         }
    //     });
    // });
});