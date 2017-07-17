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
    var idx = req.query.idx;
    var rp = require('request-promise');
    var options = {
        method: 'get',
        uri: 'http://localhost:8888/top_list',
        qs: { idx: idx },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };
    rp(options).then(function(data) {

        var songArr = data.result.tracks;

        //当榜单中是有歌的情况下，删除旧榜单
        if (songArr.length > 0) {
            listCollection.removeList(idx, function(err, List) {
                if (err) {
                    throw err;
                }
            });
        }

        //写入新榜单
        var i = 0;
        songArr.forEach(function(song) {
            i += 1;
            //console.log(i + "_" + song.id + "_" + song.name + "_" + song.artists[0].name);
            var List = new Object();
            List.listIdx = idx;
            List.songID = song.id;
            List.songIndex = i;
            listCollection.addList(List, function(err, List) {
                if (err) {
                    throw err;
                }
            });
            //构造专辑歌手
            var albumArtist = "";
            for (var a = 0; a < song.album.artists.length; a++) {
                albumArtist += song.album.artists[a].name;
                if (a != song.album.artists.length - 1) { albumArtist += "|" }
            }
            //定义专辑对象并赋值，写入专辑表
            var Album = new Object();
            Album.albumID = song.album.id;
            Album.albumName = song.album.name;
            Album.publishTime = datestring.toDateString(song.album.publishTime).substr(0, 10);
            Album.songCount = song.album.size;
            Album.picUrl = song.album.picUrl;
            Album.company = song.album.company;
            Album.copyrightID = song.album.copyrightId;
            Album.artist = albumArtist;
            //console.log(i + "_" + song.album.id + song.album.name + albumArtist + song.album.picUrl + song.album.company + song.album.size + song.album.copyrightId);
            albumCollection.updateAlbum(Album, function(err, Album) {
                if (err) {
                    throw err;
                }
            });
            //构造专辑歌手
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
            Song.score = "list";
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
    res.send("list idx " + idx + " done!");
})

module.exports = router