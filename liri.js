require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var searchType = process.argv[2];
var searchTerm = process.argv[3];

switch (searchType){
    case "concert-this":
        console.log("concert");
        break;
    case "spotify-this-song":
        console.log("spotify");
        break;
    case "movie-this":
        console.log("movie");
        break;
    case "do-what-it-says":
        console.log("Oh LAWD!!! Do What he Say!!!");
        break;
}

