    $(document).ready(function () {
        var beginGame;
        var newGame;
        var myCount = 30;
        var questionCount = 0;
        var selectAnswer
        var timeLeft;
        var correct = 0;
        var inCorrect = 0;
        var noGuess = 0;
        /* var questionAsked = [{
                 question: "What is the capital of California?",
                 answers: ["Los Angeles", "Sacramento", "San Diego", "San Fransisco"],
                 rightAns: 2
             },
             {
                 question: "What is the capital of Minnesota?",
                 answers: ["Rochester", "Duluth", "Minneapolis", "St Paul"],
                 rightAns: 4
             },
             {
                 question: "What is the capital of Texas?",
                 answers: ["Austin", "Houston", "Dallas", "Arlington"],
                 rightAns: 1
             },
             {
                 question: "What is the capital of Illinois?",
                 answers: ["Rockford", "Naperville", "Springfield", "Chicago"],
                 rightAns: 3
             }
         ];*/

        var questionAsked = ["What is the capital of California?", "What is the capital of Minnesota?", "What is the capital of Texas?", "What is the capital of Illinois?"];

        var questionAnswer = [
            ["Los Angeles", "Sacramento", "San Diego", "San Fransisco"],
            ["Rochester", "Duluth", "Minneapolis", "St Paul"],
            ["Austin", "Houston", "Dallas", "Arlington"],
            ["Rockford", "Naperville", "Springfield", "Chicago"]
        ];

        var answers =["B: Sacramento", "D: St Paul", "A: Austin", "C: Springfield"];
        var images = ["assets/images/sacramento.jpeg", "assets/images/stpaul.jpeg", "assets/images/austin.jpeg", "assets/images/sacramento.jpeg"];

        function startScreen() { 
            beginGame = '<section id="main"><a id="startScreen" class="btn btn-primary" href="#" role="button">Start the Game!</a></section>';
            $("#trivia").html(beginGame);
        }
        startScreen();

        $("#trivia").on("click", "#startScreen", function (event) {
            newContent();
            timeClock();
        });

        $("#trivia").on("click", ".answer", function (event) {
            selectAnswer = $(this).text();
            if (selectAnswer === answers[questionCount]) {
                clearInterval(timeLeft);
                gameWin();
            } else {
                clearInterval(timeLeft);
                gameLoss();
            }
        });
        $("#trivia").on("click", ".resetButton", function (event) {
            resetGame();
        });

        function newContent() {
            newGame = '<div class="questions"><section class="line1">Time Left: <span class="time">30</span></section><section class="line2">' + questionAsked[questionCount] + '</section><section class="answer btn btn-primary">A: ' + questionAnswer[questionCount][0] + '</section>' + '<section class="answer btn btn-primary">B: ' + questionAnswer[questionCount][1] + '</section>' + '<section class="answer btn btn-primary">C: ' + questionAnswer[questionCount][2] + '</section>' + '<section class="answer btn btn-primary">D: ' + questionAnswer[questionCount][3] + '</section></div>';            
            $("#trivia").html(newGame);
        }

        function resetGame() {
            correct = 0;
            inCorrect = 0;
            noGuess = 0;
            myCount = 30;
            questionCount = 0;
            newContent();
            timeClock();
        }

        function hold() {
            if (questionCount < 3) {
                questionCount++;
                newContent();
                myCount = 30;
                timeClock();
            } else {
                endScreen();
            }
        }

        function timeClock() {
            timeLeft = setInterval(transition, 1000);
            function transition() {
                if (myCount === 0) {
                    clearInterval(timeLeft);
                    gameTimeOut();
                }
                if (myCount > 0) {
                    myCount--;
                }
                $(".time").html(myCount);
            }
        }

        function endScreen() {
            newGame = '<div class="questions"><section class="line1>Time Left: <span class="time">' + myCount + '</span></section>' + '<section>Correct Answer: ' + correct + '</section>' + '<section>Wrong Answers: ' + inCorrect + '</section>' + '<section>Unanswered: ' + noGuess + '</section>' + '<section id="main"><a id="startScreen" class="btn btn-primary" href="#" role="button">Reset the Game!</a></section></div>';
            $("#trivia").html(newGame);
        }

        function gameWin() {
            correct++;
            newGame = '<div class="questions"><section class="line1>Time Left: <span class="time">' + myCount + '</span></section>' + '<section>Correct Answer, the right answer is: ' + answers[questionCount] + '</section></div>'+'<section class="imgHolder"><img src="'+images[questionCount]+'" /></section>';
            $("#trivia").html(newGame);
            setTimeout(hold, 4000);
        }

        function gameLoss() {
            inCorrect++;
            newGame = '<div class="questions"><section class="line1>Time Left: <span class="time">' + myCount + '</span></section>' + '<section>Wrong Answer, the right answer is: ' + answers[questionCount] + '</section></div>'+'<section class="imgHolder"><img src="'+images[questionCount]+'" /></section>';
            $("#trivia").html(newGame);
            setTimeout(hold, 4000);
        }

        function gameTimeOut() {
            noGuess++;
            newGame = '<div class="questions"><section class="line1>Time Left: <span class="time">' + myCount + '</span></section>' + '<section>No more time left</section>' + '<section>The right answer is: ' + answers[questionCount] + '</section></div>'+'<section class="imgHolder"><img src="'+images[questionCount]+'" /></section>';
            $("#trivia").html(newGame);
            setTimeout(hold, 4000);
        }




    });