var albumCollection = require('../models/album')
var songCollection = require('../models/song')

module.exports.genResult = function(Song) {
    //console.log(Song);
    var i = 0;
    var node = new Array();
    var songresult;

    /*for (var s = 0; s < Song.length; s++) {
        albumCollection.findAlbum(Song[s], function(err, Album) {
            if (err) {
                throw err;
            } else {
                var date = new Date(Album[0].publishTime.replace(/-/g, '/'));
                var time = date.getTime();
                var duration;
                var dArr = Song[s].duration.split(':');
                if (dArr.length === 3) {
                    duration = parseInt(dArr[0]) * 3600 + parseInt(dArr[1]) * 60 + parseInt(dArr[2]);
                }
                if (dArr.length === 2) {
                    duration = parseInt(dArr[0]) * 60 + parseInt(dArr[1]);
                }
                if (dArr.length === 1) {
                    duration = parseInt(dArr[0]);
                }
                var songString = {
                    "icon": "http://a.com/a.png",
                    "status": "0",
                    "fileSymble": "",
                    "tag": Album[0].albumName,
                    "refcount": 32,
                    "userid": "",
                    "appid": "aa3ee8fc-0364-45fd-80f7-85f8ff9e8738",
                    "typetag": Album[0].albumName,
                    "wordcount": "1098",
                    "type": Album[0].albumName,
                    "ctime": time,
                    "version": "1",
                    "content": "<?xml version='1.0' ?><root><node t='A' serverid='5253d2b70ef116f7c5b142e8'>" + Song[s].songName + "-" + Song[s].artist + "</node><node t='D' serverid='5253d2b70ef116f7c5b142e8'>" + "专辑：" + Album[0].albumName + "</node><node t='P' serverid='5253d2b70ef116f7c5b142e7'>专辑封面</node></root>",
                    "id": Song[s].songID,
                    "author": Song[s].artist,
                    "lastupdate": "1381141280611",
                    "filesize": "19390445",
                    "title": Song[s].songName + "-" + Song[s].artist,
                    "category": "40",
                    "source": "音乐库",
                    "describe": "音乐库上线啦",
                    "channel": "1",
                    "materials": [{
                        "infoid": '5253d2b70ef116f7c5b142e8',
                        "title": Song[s].songName + "-" + Song[s].artist,
                        "createtime": "1381225147140",
                        "type": "1",
                        "fileid": '5253d2b70ef116f7c5b142e8',
                        "details": {
                            "_id": '5253d2b70ef116f7c5b142e8',
                            "url": "http://" + Song[s].locate + ".a-radio.cn:81/" + Song[s].md5 + ".mp3",
                            "playurl": "http://" + Song[s].locate + ".a-radio.cn:81/" + Song[s].md5 + ".mp3",
                            //"ineturl": "http://sh.a-radio.cn:3000/100/" + song.md5 + ".mp3",
                            //"localurl": "http://sh.a-radio.cn:3000/100/" + song.md5 + ".mp3",
                            "duration": duration,
                            "words": "文字内容",
                            "prewords": "串词",
                            "encoder": "aac",
                            "bitrate": "128000",
                            "samplerate": "44100"
                        }
                    }, {
                        "infoid": '5253d2b70ef116f7c5b142e7',
                        "title": "专辑封面",
                        "createtime": "1381225147140",
                        "type": "0",
                        "fileid": '5253d2b70ef116f7c5b142e7',
                        "details": {
                            "_id": '5253d2b70ef116f7c5b142e7',
                            "url": Album[0].picUrl,
                            "playurl": Album[0].picUrl
                                //"ineturl": Album[0].picUrl,
                                //"localurl": Album[0].picUrl
                        }
                    }]
                };
                node.push(songString);
            }
        });
    }

    var nodeString = JSON.stringify(node);
    var nodeContent = nodeString.substring(0, nodeString.length);
    var preString = JSON.stringify({ "ret": 0, "result": 0 });
    //console.log(preString.substring(0, 18) + nodeContent + "}");
    nodeContent = nodeContent.replace(/&/g, "and");
    var result = preString.substring(0, 18) + nodeContent + "}";
    //console.log(result);
    return result;*/

    Song.forEach(function(song) {
        //console.log(song);
        albumCollection.findAlbum(song.albumID, function(err, Album) {
            if (err) {
                throw err;
            } else {
                i += 1;
                var date = new Date(Album[0].publishTime.replace(/-/g, '/'));
                var time = date.getTime();
                var duration;
                var dArr = song.duration.split(':');
                if (dArr.length === 3) {
                    duration = parseInt(dArr[0]) * 3600 + parseInt(dArr[1]) * 60 + parseInt(dArr[2]);
                }
                if (dArr.length === 2) {
                    duration = parseInt(dArr[0]) * 60 + parseInt(dArr[1]);
                }
                if (dArr.length === 1) {
                    duration = parseInt(dArr[0]);
                }

                var songString = {
                    "icon": "http://a.com/a.png",
                    "status": "0",
                    "fileSymble": "",
                    "tag": Album[0].albumName,
                    "refcount": 32,
                    "userid": "",
                    "appid": "aa3ee8fc-0364-45fd-80f7-85f8ff9e8738",
                    "typetag": Album[0].albumName,
                    "wordcount": "1098",
                    "type": Album[0].albumName,
                    "ctime": time,
                    "version": "1",
                    "content": "<?xml version='1.0' ?><root><node t='A' serverid='5253d2b70ef116f7c5b142e8'>" + song.songName + "-" + song.artist + "</node><node t='D' serverid='5253d2b70ef116f7c5b142e8'>" + "专辑：" + Album[0].albumName + "</node><node t='P' serverid='5253d2b70ef116f7c5b142e7'>专辑封面</node></root>",
                    "id": song.songID,
                    "author": song.artist,
                    "lastupdate": "1381141280611",
                    "filesize": "19390445",
                    "title": song.songName + "-" + song.artist,
                    "category": "40",
                    "source": "音乐库",
                    "describe": "音乐库上线啦",
                    "channel": "1",
                    "materials": [{
                        "infoid": '5253d2b70ef116f7c5b142e8',
                        "title": song.songName + "-" + song.artist,
                        "createtime": "1381225147140",
                        "type": "1",
                        "fileid": '5253d2b70ef116f7c5b142e8',
                        "details": {
                            "_id": '5253d2b70ef116f7c5b142e8',
                            "url": "http://" + song.locate + ".a-radio.cn:81/" + song.md5 + ".mp3",
                            "playurl": "http://" + song.locate + ".a-radio.cn:81/" + song.md5 + ".mp3",
                            //"ineturl": "http://sh.a-radio.cn:3000/100/" + song.md5 + ".mp3",
                            //"localurl": "http://sh.a-radio.cn:3000/100/" + song.md5 + ".mp3",
                            "duration": duration,
                            "words": "文字内容",
                            "prewords": "串词",
                            "encoder": "aac",
                            "bitrate": "128000",
                            "samplerate": "44100"
                        }
                    }, {
                        "infoid": '5253d2b70ef116f7c5b142e7',
                        "title": "专辑封面",
                        "createtime": "1381225147140",
                        "type": "0",
                        "fileid": '5253d2b70ef116f7c5b142e7',
                        "details": {
                            "_id": '5253d2b70ef116f7c5b142e7',
                            "url": Album[0].picUrl,
                            "playurl": Album[0].picUrl
                                //"ineturl": Album[0].picUrl,
                                //"localurl": Album[0].picUrl
                        }
                    }]
                };
                //console.log(songString);
                node.push(songString);
                if (i == Song.length) {
                    var nodeString = JSON.stringify(node);
                    var nodeContent = nodeString.substring(0, nodeString.length);
                    var preString = JSON.stringify({ "ret": 0, "result": 0 });
                    //console.log(preString.substring(0, 18) + nodeContent + "}");
                    nodeContent = nodeContent.replace(/&/g, "and");
                    var result = preString.substring(0, 18) + nodeContent + "}";
                    //console.log(result);
                    this.songresult = result;
                }
            }
        });
    });

	return songresult;
}
