const express = require("express")
const router = express()
var albumCollection = require('../models/album')
var songCollection = require('../models/song')
var listCollection = require('../models/list')
var logCollection = require('../models/log')
var log = require('../functions/log')
var QBResult = require('../functions/QBResult')
var datestring = require('../functions/DateString')
const bodyParser = require('body-parser')

router.get("/", (req, res) => {
    var type = req.query.type;
    //console.log(req.query.type);

    log.addLog(req.connection.remoteAddress, req.query.type, new Date());

    if (typeof(type) != "undefined") {
        var idx = 0;
        switch (type) {
            case "新歌榜":
                idx = 0;
                break;
            case "热歌榜":
                idx = 1;
                break;
            case "原创歌曲榜":
                idx = 2;
                break;
            case "飙升榜":
                idx = 3;
                break;
            case "电音榜":
                idx = 4;
                break;
            case "UK排行榜周榜":
                idx = 5;
                break;
            case "美国Billboard周榜":
                idx = 6;
                break;
            case "KTV嗨榜":
                idx = 7;
                break;
            case "iTunes榜":
                idx = 8;
                break;
            case "Hit FM Top榜":
                idx = 9;
                break;
            case "日本Oricon周榜":
                idx = 10;
                break;
            case "韩国Melon排行榜周榜":
                idx = 11;
                break;
            case "韩国Mnet排行榜周榜":
                idx = 12;
                break;
            case "韩国Melon原声周榜":
                idx = 13;
                break;
            case "港台TOP排行榜":
                idx = 14;
                break;
            case "内地TOP排行榜":
                idx = 15;
                break;
            case "香港电台中文歌曲龙虎榜":
                idx = 16;
                break;
            case "华语金曲榜":
                idx = 17;
                break;
            case "中国嘻哈榜":
                idx = 18;
                break;
            case "法国 NRJ EuroHot 30周榜":
                idx = 19;
                break;
            case "台湾Hito排行榜":
                idx = 20;
                break;
            case "Beatport全球电子舞曲榜":
                idx = 21;
                break;
            default:
                idx = 0;
        }
        listCollection.findList(idx, function(err, ListSong) {
            var nodeArr = new Array();
            var l = 0;
            if (err) {
                throw err;
            } else {
                ListSong.forEach(function(listsong) {
                    //console.log(listsong.songID);
                    songCollection.findSongByID(listsong.songID, function(err, Song) {
                        albumCollection.findAlbum(Song[0].albumID, function(err, Album) {
                            l += 1;		
                            var infoString = QBResult.genInfo(Song[0], Album[0]);
                            nodeArr.push(infoString);
                            if (l == ListSong.length) {
                            	res.send(QBResult.genResult(nodeArr));
                            }
                        })
                    })
                });
            }
        })
    } else {
        var i = Math.floor(Math.random() * 155000); //随机生成一个0-155000之间的整数
        songCollection.randomSongs(i, function(err, Song) {
            var nodeArr = new Array();
            var i = 0;
            if (err) {
                throw err;
            } else {
                Song.forEach(function(song) {
                    //console.log(song);
                    albumCollection.findAlbum(song.albumID, function(err, Album) {
                        if (err) {
                            throw err;
                        } else {
                            i += 1;
                            var infoString = QBResult.genInfo(song, Album[0]);
                            //console.log(songString);
                            nodeArr.push(infoString);
                            if (i == Song.length) {
                                res.send(QBResult.genResult(nodeArr));
                            }
                        }
                    });
                });
            }
        })
    }
})
module.exports = router