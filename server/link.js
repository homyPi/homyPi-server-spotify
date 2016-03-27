var Shared;

module.exports = {
    load: function (AppShared) {
        "use strict";
        Shared = AppShared;

        var Spotify = require("./module/Spotify");
        var PlaylistGenerator = require("./module/PlaylistGenerator");

        var music = Shared.modules["homyPi-server-music"];
        music.addMusicSource(Spotify, "spotify");
        music.addPlaylistSource(PlaylistGenerator, "spotify");
    },
    getShared: function () {
        return Shared;
    }
};
