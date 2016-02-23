module.exports = function(router) {
	var SpotifyMiddleware = require("./spotifyMiddleware");
	var User =  require("../link").getShared().User;
/*
	router.get("/", function(req, res) {
		res.json({"name": "Spotify", "status": "up"});
	});
	
	router.get("/me", User.isLoggedIn, SpotifyMiddleware.getApi, SpotifyMiddleware.getMe);
	//router.get("/login", userMiddleware.isLoggedIn, SpotifyMiddleware.login);
	router.get("/me/artists", User.isLoggedIn, SpotifyMiddleware.getApi, SpotifyMiddleware.getMyArtists);
	router.get("/me/artists/reload", User.isLoggedIn, SpotifyMiddleware.getApi, SpotifyMiddleware.reloadMyArtists);
	
	router.get("/search", User.isLoggedIn, SpotifyMiddleware.getApi, SpotifyMiddleware.search);
	router.get("/artists/:id", User.isLoggedIn, SpotifyMiddleware.getApi, SpotifyMiddleware.getArtist);
	
	router.post("/:type/search", User.isLoggedIn, SpotifyMiddleware.getApi, SpotifyMiddleware.search);

*/
	//router.get('/oauth2callback', SpotifyMiddleware.oauth2callback);

	return router;
};