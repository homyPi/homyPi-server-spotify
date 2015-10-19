var express = require("express");
var moduleManager = require(__base + "modules/ModuleManager");
var routes = require("./spotifyRoutes");

module.exports = {
	link: function() {
		moduleManager.get("homyPi-server-music").addSource({
			name: "Spotify",
			module: this
		});
	},
	routes: routes,
	config: require("./config")
}
