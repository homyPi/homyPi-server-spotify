var routes = require("./module/spotifyRoutes");
var Link = require("./Link");

module.exports = {
	routes: routes,
	config: require("./config"),
	link: function(moduleManager, Raspberry, MongooseModels, UserMiddleware, config) {
		"use strict";
		Link.Raspberry = Raspberry;
		Link.MongooseModels = MongooseModels;
		Link.User = {
			middleware: UserMiddleware
		}
		Link.config = config;

		var Spotify = require("./module/Spotify");
		var PlaylistGenerator = require("./module/PlaylistGenerator");
		
		var music = moduleManager.get("homyPi-server-music");
		music.addMusicSource(Spotify, "spotify");
		music.addPlaylistSource(PlaylistGenerator, "spotify");
	}
}
