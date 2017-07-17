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
    var songid = req.query.songid;
    var md5 = req.query.md5;
    var size = req.query.size;
    var bitrate = req.query.bitrate;
    var locate = req.query.locate;
    var inuse = req.query.inuse;
    
    var Song = new Object();
    Song.songID = songid;
    Song.size = size;
    Song.md5 = md5;
    Song.bitrate = bitrate;
    Song.inUse = inuse;
    Song.locate = locate;
    songCollection.updateSongmd5(Song, function(err, Song) {
        if (err) {
            throw err;
        }
    })
    res.send(songid + "," + md5 + "," + bitrate + " is done!");

})
module.exports = router