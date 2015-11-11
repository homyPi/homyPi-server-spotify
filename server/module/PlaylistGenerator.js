var _ = require("lodash");
var Promise = require("bluebird");
var Spotify = require("./Spotify");

PlaylistGenerator = function(myArtists, options) {
	"use strict";
	this.api = null;;
	this.myArtists = myArtists;
	this.options = options;
	this.similarTo = [];

	this.ignoreIds = [];

	this.init = function(user) {
		var self = this;
		return new Promise(function(resolve, reject) {
			Spotify.getApi(user)
				.then(function(api) {
					self.api = api;
					resolve();
				}).catch(function(err) {
					reject(err);
				});
		}.bind(this));
	}

	this.getInitialArtists = function() {
		var self = this;
		return new Promise(function(resolve, reject) {
			var promises = [];
			for (var i = 0; i < options.nbItems; i++) {
				promises.push(self.getArtist());
			}
			Promise.all(promises)
				.then(function(artists) {
					self.similarTo = artists;
					resolve();	
				}).catch(reject);
		});
	}

	this.getArtist = function() {
		var self = this;
		return new Promise(function(resolve, reject) {
			var i = -1;
			while (i === -1 || self.ignoreIds.indexOf(i) !== -1) {
				i = Math.floor((Math.random() * self.myArtists.length));
			}
			var artist = self.myArtists[i];
			if (! artist.externals || !artist.externals.spotify || !artist.externals.spotify.id) {
				self.api.searchArtists(artist.name, { limit : 1})
					.then(function(response) {
						console.log("got response");
						if (!response.body || !response.body.artists || response.body.artists.total < 1) {
							console.log(JSON.stringify(response.body, null, 4));
							self.ignoreIds.push(i);
							self.getArtist().then(resolve).catch(reject);
						} else {
							if (!artist.externals) {
								artist.externals = {};
							}
							artist.externals.spotify = {
								id: response.body.artists.items[0].id,
								uri: response.body.artists.items[0].uri
							};
							console.log("got artists");
							resolve(artist);
						}
					});
			} else {
				resolve(artist);
			}
		});
	}

	this.getSimilarTrack = function(artist) {
		var self = this;
		return new Promise(function(resolve, reject) {
			self.api.getArtistRelatedArtists(artist.externals.spotify.id)
			.then(function(response) {
				var i = Math.floor((Math.random() * response.body.artists.length));
				self.api.getArtistTopTracks(response.body.artists[i].id, 'GB')
					.then(function(data) {
						var i = Math.floor((Math.random() * data.body.tracks.length));
						resolve({track: Spotify.trackToSchema(data.body.tracks[i]), similarTo: artist});
					}).catch(reject);
			}).catch(reject);
		});
	};

	this.generate = function() {
		var self = this;
		return new Promise(function(resolve, reject) {
					console.log("generate");
			self.getInitialArtists()
				.then(function() {
					console.log("getInitialArtists");
					var promises = [];
					_.forEach(self.similarTo, function(artist) {
						promises.push(self.getSimilarTrack(artist));
					});
					Promise.all(promises)
						.then(function(res) {
							self.playlist = res;
							resolve(res);
						}).catch(function(err) {
							reject(err);
						});	
			}).catch(function(err) {
				reject(err);
			});
		});
	};
};



module.exports = PlaylistGenerator;

