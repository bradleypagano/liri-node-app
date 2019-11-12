//require("dotenv").config();
//var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);
var axios = require("axios");
//var moment = require("moment");
var searchType = process.argv[2];

switch (searchType){
    case "concert-this":
        searchTerm = process.argv.slice(3).join("-");
        console.log("concert");
        getConcert();
        break;
    case "spotify-this-song":
        console.log("spotify");
        break;
    case "movie-this":
        console.log("movie");
        break;
    case "do-what-it-says":
        console.log("Oh LAWD!!! Do What He Say!!!");
        break;
}

function getConcert() {
    axios.get("https://api.seatgeek.com/2/events?client_id=OTA1MzgzM3wxNTcyNTMzMTQ3Ljk3&performers.slug=" + searchTerm)
    .then(function(response){
        for(i=0; i < response.data.events.length; i++){
            console.log(response.data.events[i].venue.name);
            console.log(response.data.events[i].venue.display_location);
            console.log(response.data.events[i].datetime_local);
            console.log("--------------------");
        }
        
    })
}