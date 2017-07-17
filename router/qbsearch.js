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

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", (req, res) => {
    var key = req.body.key;

    log.addLog(req.connection.remoteAddress, key, new Date());

    songCollection.findSongs(key, function(err, Song) {
        var nodeArr = new Array();
        var i = 0;
        if (err) {
            throw err;
        } else {
            Song.forEach(function(song) {
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
})
module.exports = router