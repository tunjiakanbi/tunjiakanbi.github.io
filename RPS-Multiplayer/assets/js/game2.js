$(document).ready(function () {

    var player1 = null;
    var player2 = null;
    var player1Name = "";
    var player2Name = "";
    var yourPlayerName = "";
    var player1Choice = "";
    var player2Choice = "";
    var turnNumber = 1;

    var config = {
        apiKey: "AIzaSyBeEBf_EtXCs59922zKZekpjgkcqQsTMVw",
        authDomain: "rockpaperscissors-3ba7d.firebaseapp.com",
        databaseURL: "https://rockpaperscissors-3ba7d.firebaseio.com",
        projectId: "rockpaperscissors-3ba7d",
        storageBucket: "",
        messagingSenderId: "109825123263"
    };

    firebase.initializeApp(config);


    var database = firebase.database();

    database.ref("/players/").on("value", function (snapshot) {
        if (snapshot.child("player1").exists()) {
        
            player1 = snapshot.val().player1;
            player1Name = player1.name;

            $("#playerOneName").text(player1Name);
            $("playerData1").html("Win: " + player1.win + ", Loss: " + player1.loss + ", Tie: " + player1.tie);
        } else {

            player1 = null;
            player1Name = "";

            $("#playerOneName").text("Waiting for Player 1");
            $("#playerDiv1").removeClass("playerTurn");
            $("#playerDiv2").removeClass("playerTurn");

            database.ref("/outcome/").remove();

            $("#gameResults").html("");
            $("#waitNotice").html("");
            $("#playerData1").html("Win: 0, Loss: 0, Tie: 0");
        }

        if (snapshot.child("player2").exists()) {
          
            player2 = snapshot.val().player2;
            player2Name = player2.name;

            $("#playerTwoName").text(player2Name);
            $("#playerData2").html("Win: " + player2.win + ", Loss: " + player2.loss + ", Tie: " + player2.tie);
        } else {

            player2 = null;
            player2Name = "";

            $("#playerTwoName").text("Waiting for Player 2");
            $("#playerDiv1").removeClass("playerTurn");
            $("#playerDiv2").removeClass("playerTurn");

            database.ref("/outcome/").remove();

            $("#gameResults").html("");
            $("#waitNotice").html("");
            $("#playerData2").html("Win: 0, Loss: 0, Tie: 0");
        }

        if (player1 && player2) {
            $("#playerDiv1").addClass("playerTurn");
            $("#waitNotice").html("Waiting on " + player1Name + " to choose.");
        }

        if (!player1 && !player2) {
            database.ref("/chat/").remove();
            database.ref("/turn/").remove();
            database.ref("/outcome/").remove();

            $("#chatDisplay").empty();

            $("#playerDiv1").removeClass("playerTurn");
            $("#playerDiv2").removeClass("playerTurn");

            $("#gameResults").html("");
            $("#waitNotice").html("");
        }
    });

    database.ref("/players/").on("child_removed", function (snapshot) {
        var msg = snapshot.val().name + " has disconnected!";
        var chatKey = database.ref().child("/chat/").push().key;
        database.ref("/chat/" + chatKey).set(msg);
    });

    database.ref("/chat/").on("child_added", function (snapshot) {
        var chatMsg = snapshot.val();
        var chatEntry = $("<div>").html(chatMsg);

        if (chatMsg.includes("disconnected")) {
            chatEntry.addClass("chatColorDisconnected");
        } else if (chatMsg.includes("joined")) {
            chatEntry.addClass("chatColorJoined");
        } else if (chatMsg.startsWith(yourPlayerName)) {
            chatEntry.addClass("chatColor1");
        } else {
            chatEntry.addClass("chatColor2");
        }

        $("#chatDisplay").append(chatEntry);
        $("#chatDisplay").scrollTop($("#chatDisplay")[0].scrollHeight);
    });

    database.ref("/turn/").on("value", function (snapshot) {
        if (snapshot.val() === 1) {

            turnNumber  = 1;
            if (player1 && player2) {
                $("#playerDiv1").addClass("playerTurn");
                $("#playerDiv2").removeClass("playerTurn");
                $("#waitNotice").html("Waiting on " + player1Name + " to choose.");
            }
        } else if (snapshot.val() === 2) {
      
            turnNumber  = 2;

            if (player1 && player2) {
                $("#playerDiv1").removeClass("playerTurn");
                $("#playerDiv2").addClass("playerTurn");
                $("#waitNotice").html("Waiting on " + player2Name + " to choose.");
            }
        }
    });

    database.ref("/outcome/").on("value", function (snapshot) {
        $("#gameResults").html(snapshot.val());
    });

    $("#add-name").on("click", function (event) {
        event.preventDefault();

        if (($("#playernameinput").val().trim() !== "") && !(player1 && player2)) {
            if (player1 === null) {

                yourPlayerName = $("#playernameinput").val().trim();
                player1 = {
                    name: yourPlayerName,
                    win: 0,
                    loss: 0,
                    tie: 0,
                    choice: ""
                };

                database.ref().child("/players/player1").set(player1);

                database.ref().child("/turn").set(1);

                database.ref("/players/player1").onDisconnect().remove();

            } else if ((player1 !== null) && (player2 === null)) {

                yourPlayerName = $("#playernameinput").val().trim();
                player2 = {
                    name: yourPlayerName,
                    win: 0,
                    loss: 0,
                    tie: 0,
                    choice: ""
                };

                database.ref().child("/players/player2").set(player2);

                database.ref("/players/player2").onDisconnect().remove();
            }

            var msg = yourPlayerName + " has joined!";

            var chatKey = database.ref().child("/chat/").push().key;

            database.ref("/chat/" + chatKey).set(msg);

            $("#playernameinput").val("");
        }
    });

    $("#chat-send").on("click", function (event) {
        event.preventDefault();

        if ((yourPlayerName !== "") && ($("#playertextarea").val().trim() !== "")) {
            var message = yourPlayerName + ": " + $("#playertextarea").val().trim();
            $("#playertextarea").val("");

            var chatKey = database.ref().child("/chat/").push().key;

            database.ref("/chat/" + chatKey).set(message);
        }
    });

    $("#playerDiv1").on("click", "img", function (event) {
        event.preventDefault();

        if (player1 && player2 && (yourPlayerName === player1.name) && (turnNumber === 1)) {

            var choice = $(this).attr("alt").trim();
            
            player1Choice = choice;
            database.ref().child("/players/player1/choice").set(choice);
            turnNumber = 2;
            database.ref().child("/turn").set(2);
        }
    });

    $("#playerDiv2").on("click", "img", function (event) {
        event.preventDefault();

        if (player1 && player2 && (yourPlayerName === player2.name) && (turnNumber === 2)) {

            var choice = $(this).attr("alt").trim();
    
            player2Choice = choice;
            database.ref().child("/players/player1/choice").set(choice);

            gameCompare();
        }
    });

    function gameCompare() {
        if (player1.choice === "Rock") {
            if (player2.choice === "Rock") {

                database.ref().child("/outcome/").set("Tie game!");
                database.ref().child("/players/player1/tie").set(player1.tie + 1);
                database.ref().child("/players/player2/tie").set(player2.tie + 1);
            } else if (player2.choice === "Paper") {

                database.ref().child("/outcome/").set("Paper wins!");
                database.ref().child("/players/player1/loss").set(player1.loss + 1);
                database.ref().child("/players/player2/win").set(player2.win + 1);
            } else { 

                database.ref().child("/outcome/").set("Rock wins!");
                database.ref().child("/players/player1/win").set(player1.win + 1);
                database.ref().child("/players/player2/loss").set(player2.loss + 1);
            }

        } else if (player1.choice === "Paper") {
            if (player2.choice === "Rock") {

                database.ref().child("/outcome/").set("Paper wins!");
                database.ref().child("/players/player1/win").set(player1.win + 1);
                database.ref().child("/players/player2/loss").set(player2.loss + 1);
            } else if (player2.choice === "Paper") {

                database.ref().child("/outcome/").set("Tie game!");
                database.ref().child("/players/player1/tie").set(player1.tie + 1);
                database.ref().child("/players/player2/tie").set(player2.tie + 1);
            } else { 

                database.ref().child("/outcome/").set("Scissors win!");
                database.ref().child("/players/player1/loss").set(player1.loss + 1);
                database.ref().child("/players/player2/win").set(player2.win + 1);
            }

        } else if (player1.choice === "Scissors") {
            if (player2.choice === "Rock") {

                database.ref().child("/outcome/").set("Rock wins!");
                database.ref().child("/players/player1/loss").set(player1.loss + 1);
                database.ref().child("/players/player2/win").set(player2.win + 1);
            } else if (player2.choice === "Paper") {

                database.ref().child("/outcome/").set("Scissors win!");
                database.ref().child("/players/player1/win").set(player1.win + 1);
                database.ref().child("/players/player2/loss").set(player2.loss + 1);
            } else {

                database.ref().child("/outcome/").set("Tie game!");
                database.ref().child("/players/player1/tie").set(player1.tie + 1);
                database.ref().child("/players/player2/tie").set(player2.tie + 1);
            }

        }

        turnNumber = 1;
        database.ref().child("/turn").set(1);
    }
});