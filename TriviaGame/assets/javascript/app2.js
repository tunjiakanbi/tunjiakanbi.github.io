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
    var questionAsked = [{
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
    ];
    for (var q = 0; q < questionAsked.length; q++) {
        var _question = questionAsked[q]
        console.log(_question.question);
        console.log(_question.answers[0]);
    }
    // var questionAsked = ["What is the capital of California?", "What is the capital of Minnesota?", "What is the capital of Texas?", "What is the capital of Illinois?"];

    // var questionAnswer = [
    //     ["Los Angeles", "Sacramento", "San Diego", "San Fransisco"],
    //     ["Rochester", "Duluth", "Minneapolis", "St Paul"],
    //     ["Austin", "Houston", "Dallas", "Arlington"],
    //     ["Rockford", "Naperville", "Springfield", "Chicago"]
    // ];

    // var answers =["B: Sacramento", "D: St Paul", "A: Austin", "C: Springfield"];

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
        // if (selectAnswer === answers[questionCount]) {
        if (selectAnswer === questionAsked[questionCount].rightAns) {
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

    // function newContent() {
    //     newGame = '<div class="questions"><section class="line1">Time Left: <span class="time">30</span></section>' + questionAsked[questionCount] + '<section class="answer btn btn-primary">A: ' + questionAnswer[questionCount][0] + '</section>' + '<section class="answer btn btn-primary">B: ' + questionAnswer[questionCount][1] + '</section>' + '<section class="answer btn btn-primary">C: ' + questionAnswer[questionCount][2] + '</section>' + '<section class="answer btn btn-primary">D: ' + questionAnswer[questionCount][3] + '</section></div>';            
    //     $("#trivia").html(newGame);
    // }

    function newContent(key) {
        var item = questionAsked[key];

        newGame = '<div class="questions">';
        newGame += '<section class="line1">Time Left: <span class="time">30</span></section>';
        newGame += item.question;

        var letters = ["A", "B", "C", "D"];
        for (var a = 0; a < item.answers.length; a++) {
            newGame += '<section class="answer btn btn-primary"> ';
            newGame += item.answers[a];
            newGame += ' </section>'
        }



        // newGame = '<div class="questions"><section class="line1">Time Left: <span class="time">30</span></section>' + questionAsked[questionCount].question + '<section class="answer btn btn-primary">A: ' + questionAsked[questionCount].answers[questionCount] + '</section>' + '<section class="answer btn btn-primary">B: ' + questionAsked[questionCount++].asnwers[questionCount++] + '</section>' + '<section class="answer btn btn-primary">C: ' + questionAsked[questionCount+2].answers[questionCount++] + '</section>' + '<section class="answer btn btn-primary">D: ' + questionAsked[questionCount+3].answers[questionCount++] + '</section></div>';            
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
        newGame = '<div class="questions"><section class="line1>Time Left: <span class="time">' + myCount + '</span></section>' + '<section>Correct Answer, the right answer is: ' + questionAsked[questionCount].rightAns[questionCount] + '</section></div>';
        $("#trivia").html(newGame);
        setTimeout(hold, 4000);
    }

    function gameLoss() {
        inCorrect++;
        newGame = '<div class="questions"><section class="line1>Time Left: <span class="time">' + myCount + '</span></section>' + '<section>Wrong Answer, the right answer is: ' + questionAsked[questionCount].rightAns[questionCount] + '</section></div>';
        $("#trivia").html(newGame);
        setTimeout(hold, 4000);
    }

    function gameTimeOut() {
        noGuess++;
        newGame = '<div class="questions"><section class="line1>Time Left: <span class="time">' + myCount + '</span></section>' + '<section>No more time left</section>' + '<section>The right answer is: ' + questionAsked[questionCount].rightAns[questionCount] + '</section></div>';
        $("#trivia").html(newGame);
        setTimeout(hold, 4000);
    }

});