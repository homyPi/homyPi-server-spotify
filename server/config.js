var mongoose = require("mongoose");
var Schema = mongoose.Schema;
module.exports = {
	"path": "music/spotify",
	"require": [{module: "homyPi-server-music", version: "0.1"}],
	"setSchemaDescriptions": function (schemaDescriptions) {
		if (!schemaDescriptions.user.token) {
			schemaDescriptions.user.token = {};
		}
		schemaDescriptions.user.token.spotify= {
			access_token: String,
			scope: String,
			expires_date: Number,
			refresh_token: String,
			request_id: Schema.ObjectId
		}
		schemaDescriptions.artist.spotifyId = String;
	},
	"getServices": function() {
		var spotifyMiddleware = require("./spotifyMiddleware");
		var Spotify = require("./Spotify");
		return [{
			name: "spotify",
			auth: {
				type: "oauth",
				login: spotifyMiddleware.login,
				loginCallback: spotifyMiddleware.loginCallback,
				isLoggedIn : Spotify.isLoggedIn
			}
		}];
	}
};