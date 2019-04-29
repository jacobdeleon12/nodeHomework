// DEPENDENCIES
require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
// var inquirer = require("inquirer"); I want to add this in later
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);





// function for imdb
var userMovie = function (movieName) {
    if (movieName === undefined) {
        movieName = "speed";
    }
    
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
    if (artist === undefined) {
        artist = "tool";
    }

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
            console.log("\n-----------------------------------\n");
            
        }
    });
}

var userSong = function (song) {

    // * If no song is provided then your program will default to "The Sign" by Ace of Base.
    if (song === undefined) {
        song = "The Sign";
    }

    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //   console.log(data.tracks); 
        songs = data.tracks.items;

        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            // * Artist(s)
            console.log("artist(s): " + songs[i].artists.name)
            // * The song's name
            console.log("The song's name: " + songs[i].name);
            // * A preview link of the song from Spotify
            console.log("A preview link of the song from Spotify: " + songs[i].preview_url);
            // * The album that the song is from
            console.log("The album that the song is from: " + songs[i].album.name);
            console.log("\n-----------------------------------\n");
        }
    });
}

var doWhatItSays = function () {
    fs.readFile("random.txt", "utf8", function (error, data) {
        console.log(data);
        var dataArr = data.split(",");

        if (error) {
            return console.log('Error occurred: ' + error);
        }

        else if (dataArr.length === 2) {
            chooseArg(dataArr[0], dataArr[1]);
        } 
        else if(dataArr.length === 1) {
            chooseArg(dataArr[0]);
        }

    });
};

var chooseArg = function(arg1, arg2){
    switch (arg1) {
        case "concert-this":
        userBand(arg2);
          break;
        case "spotify-this-song":
        userSong(arg2);
          break;
        case "movie-this":
        userMovie(arg2);
          break;
        case "do-what-it-says":
        doWhatItSays();
          break;
        default:
        console.log("liri does not know what to do. Try again");
        }
      };

var runApp = function (argOne,arg2) {
    chooseArg(argOne,arg2);
}
runApp(process.argv[2], process.argv.slice(3).join(" "));
