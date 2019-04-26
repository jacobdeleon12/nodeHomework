// DEPENDENCIES
require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
// var inquirer = require("inquirer");
var moment = require("moment");





// function for imdb
var userMovie = function (movieName) {

    var movieName = process.argv.slice(3).join(" ");
    var url = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(url).then(function (response) {
        // console.log(JSON.stringify(response.data));
        var urlData = response.data

        console.log("\r\n");
        // * Title of the movie.
        console.log("Title: " + urlData.Title);
        // * Year the movie came out.
        console.log("Year: " + urlData.Year);
        // * IMDB Rating of the movie.
        console.log("IMDB: " + urlData.Ratings[0].Value);
        // * Rotten Tomatoes Rating of the movie.
        console.log("Rotten Tomatoes: " + urlData.Ratings[1].Value);
        // * Country where the movie was produced.
        console.log("Country: " + urlData.Country);
        // * Language of the movie.
        console.log("Language: " + urlData.Language);
        // * Plot of the movie.
        console.log("Plot: " + urlData.Plot);
        // * Actors in the movie.
        console.log("Actors: " + urlData.Actors);
    });
}


var userBand = function (artist) {

    var artist = process.argv.slice(3).join(" ");
    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(url).then(function (response) {
        // console.log(response.data);

        var urlData = response.data;
        console.log("\r\n");
        // console.log(urlData + venue);
        for (var i = 0; i < urlData.length; i++) {
            var data = urlData[i]
            //      * Name of the venue
            console.log(data.venue.name);
            //      * Venue location
            console.log(data.venue.country);
            //      * Date of the Event (use moment to format this as "MM/DD/YYYY")
            console.log(moment(data.datetime).format("MM/DD/YYYY"));
            console.log("\r\n");
        }
    });
}

var userSong = function(song){
    var spotify = new Spotify(keys.spotify);
    var song = process.argv.slice(3).join(" ");
    spotify.search({ type: 'track', query: song }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
     
    console.log(response); 
    });
}

// * This will show the following information about the song in your terminal/bash window

// * Artist(s)

// * The song's name

// * A preview link of the song from Spotify

// * The album that the song is from

// * If no song is provided then your program will default to "The Sign" by Ace of Base.



var runApp = function () {
    if (process.argv[2] === "movie-this") {
        userMovie();
    } else if (process.argv[2] === "concert-this") {
        userBand();
    } else if (process.argv[2] === "spotify-this-song") {
        userSong();
    }
}
runApp();