require("dotenv").config();
var keys = require('./keys.js');

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// console.log(spotify);
// console.log(client);
var request = require("request");
var fs = require("fs");
var liriToDo = process.argv[2];

if (liriToDo === "my-Tweets") {
    liriTwitter();
} else if (liriToDo === "spotify-this-song") {
    liriSpotify();
} else if (liriToDo === "movie-this") {
    liriMovie();
} else if (liriToDo === "do-what-it-says") {
    liriDoWhatItSays();
}

function liriTwitter() {
    var params = {
        screen_name: 'tunjiakanbi'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {

        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("Tunji Akanbi Tweets: " + tweets[i].text + "Created at: " + tweets[i].created_at);
            }
        }
    });
};

function liriSpotify() {
    // var song = process.argv.splice[3].join("+");
    var nodeArgs = process.argv;
    var song = "";

    if (nodeArgs.length === 3) {
        song = "Bad and Boujee";
        // song = "The Sign";
    }

    for (i = 3; i < nodeArgs.length; i++) {
        song = song + " " + nodeArgs[i];
    }
    spotify.search({
        type: 'track',
        query: song
    }, function (error, data) {

        if (error) {
            console.log("Error occurred: " + error);
            return;
        } else {
            console.log("Artist Name: " + data["tracks"].items[0].artists[0].name);
            console.log("Song Title: " + data["tracks"].items[0].name);
            console.log("Preview Link: " + data["tracks"].items[0].preview_url);
            console.log("Album Name: " + data["tracks"].items[0].album.name);
        }
    });
};

function liriMovie() {
    var nodeArgs = process.argv;
    var movie = "";

    console.log(nodeArgs.length);

    if (nodeArgs.length > 3) {
        console.log(process.argv[3])

        movie = process.argv[3]
    } else {
        movie = "Mr. Nobody.";
    }

    console.log(movie);
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    //console.log(queryURL)


    request(queryURL, function (error, response, body) {
        if (error) {
            console.log("Error occurred: " + error);
            return;
        } else if

        (!error && response.statusCode === 200) {
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("Rating: " + JSON.parse(body).Ratings[0].Source + " / " + JSON.parse(body).Ratings[0].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
}


function liriDoWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {


        if (error) {
            return console.log(error);
        }

        console.log(data);

        var dataArr = data.split(",");

        console.log(dataArr);
        var song = dataArr[1]
        spotify.search({
            type: 'track',
            query: song
        }, function (error, data) {

            if (error) {
                console.log("Error occurred: " + error);
                return;
            } else {
                console.log("Artist Name: " + data["tracks"].items[0].artists[0].name);
                console.log("Song Title: " + data["tracks"].items[0].name);
                console.log("Preview Link: " + data["tracks"].items[0].preview_url);
                console.log("Album Name: " + data["tracks"].items[0].album.name);
            }
        });

    });

}