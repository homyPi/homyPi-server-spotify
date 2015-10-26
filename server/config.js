var mongoose = require("mongoose");
var Schema = mongoose.Schema;
module.exports = {
	"path": "music/spotify",
	"require": [{module: "homyPi-server-music", version: "0.1"}],
	"externals": [
		{
			baseSchema: "user",
			name: "spotify",
			schema: {
				access_token: String,
				scope: String,
				expires_date: Number,
				refresh_token: String,
				request_id: Schema.ObjectId
			}
		},
		{
			baseSchema: "artist",
			name: "spotify",
			schema: {
				id: String,
				uri: String
			}
		}
	],
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