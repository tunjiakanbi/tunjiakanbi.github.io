    $(document).ready(function () {
        var randNum = 0;
        var wins = 0;
        var losses = 0;
        var usersScores = 0;

        newGame();


        $("div#test img.crystal").on("click", function () {
            var crystalNum = $(this).attr('crystalNum');
            usersScores += parseInt(crystalNum);
            console.log("Our score: " + usersScores);
            $("#message span").text(usersScores);

            if (usersScores === randNumGuess) {
                wins++;
                $("#winnings").html("wins: " + wins);
                // $("#results").text("You win!");
                newGame();
                $("#results").text("You win!");
            } else if (usersScores >= randNumGuess) {
                losses++;
                $("#losses").html("loss: " + losses);
                newGame();
                $("#results").text("You lose!");
                // $("#results").text("You lose!").delay(5000).fadeOut(5000);
                // newGame();
            }
        });

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function newGame() {
            randNumGuess = getRandomInt(19, 120);
            usersScores = 0;
            $("#random").text(randNumGuess);
            $("#message span").text(usersScores);
            
            $("#results").empty();

            $("div#test img.crystal").each(function () {
                randNum = getRandomInt(1, 12);
                $(this).attr('crystalNum', randNum);
            });
        }
    });