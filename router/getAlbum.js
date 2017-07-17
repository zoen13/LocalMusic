const express = require("express")
const router = express()
var albumCollection = require('../models/album')
var songCollection = require('../models/song')
var listCollection = require('../models/list')
var logCollection = require('../models/log')
var log = require('../functions/log')
var QBResult = require('../functions/QBResult')
var datestring = require('../functions/DateString')

router.get("/", (req, res) => {
    var albumid = req.query.albumid;
    var rp = require('request-promise');
    var options = {
        method: 'get',
        uri: 'http://localhost:8888/album',
        qs: { id: albumid },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };
    rp(options).then(function(data) {

        var album = data.album;
        var songArr = data.album.songs;

        //构造专辑歌手
        var albumArtist = "";
        for (var a = 0; a < album.artists.length; a++) {
            albumArtist += album.artists[a].name;
            if (a != album.artists.length - 1) { albumArtist += "|" }
        }
        //定义专辑对象并赋值，写入专辑表
        var Album = new Object();
        Album.albumID = album.id;
        Album.albumName = album.name;
        Album.publishTime = datestring.toDateString(album.publishTime).substr(0, 10);
        Album.songCount = album.size;
        Album.picUrl = album.picUrl;
        Album.company = album.company;
        Album.copyrightID = album.copyrightId;
        Album.artist = albumArtist;
        //console.log(i + "_" + song.album.id + song.album.name + albumArtist + song.album.picUrl + song.album.company + song.album.size + song.album.copyrightId);
        albumCollection.updateAlbum(Album, function(err, Album) {
            if (err) {
                throw err;
            }
        });

        //处理每首歌曲
        var i = 0;
        songArr.forEach(function(song) {
            i += 1;

            //构造歌曲歌手
            var songArtist = "";
            for (var a = 0; a < song.artists.length; a++) {
                songArtist += song.artists[a].name;
                if (a != song.artists.length - 1) { songArtist += "|" }
            }
            //定义歌曲对象，写入歌曲表
            var Song = new Object();
            Song.albumID = song.album.id;
            Song.songID = song.id;
            Song.songName = song.name;
            Song.duration = datestring.toDuration(song.duration);
            Song.popularity = song.popularity;
            Song.score = "Album";
            Song.artist = songArtist;
            Song.position = song.position;
            Song.mvID = song.mvid;
            Song.copyrightID = song.copyrightId;
            songCollection.updateSonginfo(Song, function(err, Song) {
                if (err) {
                    throw err;
                }
            });
        });
    });
    res.send("Album " + albumid + " done!");
})

module.exports = router