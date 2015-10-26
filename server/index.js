var moduleManager = require(__base + "modules/ModuleManager");
var routes = require("./spotifyRoutes");
var Spotify = require("./Spotify");
var PlaylistGenerator = require("./PlaylistGenerator");

module.exports = {
	link: function() {
		var music = moduleManager.get("homyPi-server-music");
		music.addMusicSource(Spotify, "spotify");
		music.addPlaylistSource(PlaylistGenerator, "spotify");
	},
	routes: routes,
	config: require("./config")
}
