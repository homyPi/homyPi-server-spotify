var moduleManager = require(__base + "modules/ModuleManager");
var routes = require("./spotifyRoutes");
var Spotify = require("./Spotify");
module.exports = {
	link: function() {
		moduleManager.get("homyPi-server-music").addSource(Spotify);
	},
	routes: routes,
	config: require("./config")
}
