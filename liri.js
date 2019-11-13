require("dotenv").config();
var fs = require("fs");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var searchType = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");

function liri (searchType, searchTerm) {
    switch (searchType){
        case "concert-this":
            searchTerm = searchTerm.replace(" ", "-");
            getConcert(searchTerm);
            break;
        case "spotify-this-song":
            getSpotty(searchTerm);
            break;
        case "movie-this":
            getMovie(searchTerm);
            break;
        case "do-what-it-says":
            console.log("Oh LAWD!!! Do What He Say!!!");
            doStuff();
            break;
    }
}

function getConcert(searchTerm) {
    axios.get("https://api.seatgeek.com/2/events?client_id=OTA1MzgzM3wxNTcyNTMzMTQ3Ljk3&performers.slug=" + searchTerm)
    .then(function(response){
        for(i=0; i < response.data.events.length; i++){
            console.log("Venue: " + response.data.events[i].venue.name);
            console.log("Located in: " + response.data.events[i].venue.display_location);
            console.log("Date: " + moment(response.data.events[i].datetime_local).format("MM/DD/YYYY"));
            console.log("--------------------");
        }
        
    })
}

function getMovie(searchTerm) {
    searchTerm = searchTerm || 'Mr. Nobody';
    axios.get("http://www.omdbapi.com/?i=tt3896198&apikey=2e52b219&t=" + searchTerm)
    .then(function(response){
            console.log("Title: " + response.data.Title);
            console.log("Released: " + response.data.Year);
            console.log("IMDB out of 10: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Score: " + response.data.Ratings[1].Value);
            console.log("Country Produced in: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("------------------------");
    })
}

function getSpotty(searchTerm){
    spotify.search({ type: "track", query: searchTerm, limit: 5 }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
        }
        for (i=0; i < data.tracks.items.length; i++){
        console.log("Artist: " + data.tracks.items[i].artists[0].name);
        console.log("Song Title: " + data.tracks.items[i].name);
        console.log("Spotify Preview: " + data.tracks.items[i].preview_url);
        console.log("Album: " + data.tracks.items[i].album.name);
        console.log("----------------------");
        }
      });
}

function doStuff(){
    fs.readFile("random.txt", "utf8", function(err, data){
        if (err){
            console.log(err);
        }
        const dataArr = data.split(',');
        liri(dataArr[0], dataArr[1]);
    })
};

liri (searchType, searchTerm);