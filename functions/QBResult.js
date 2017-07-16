//var albumCollection = require('../models/album')
//var songCollection = require('../models/song')

module.exports.genInfo = function(song, album) {

    var date = new Date(album.publishTime.replace(/-/g, '/'));

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

    var infoString = {
        //"icon": "http://a.com/a.png",
        //"status": "0",
        //"fileSymble": "",
        "tag": album.albumName,
        "refcount": 8,
        //"userid": "",
        "appid": "aa3ee8fc-0364-45fd-80f7-85f8ff9e8738",
        "typetag": album.albumName,
        //"wordcount": "1098",
        "type": album.albumName,
        "ctime": time,
        //"version": "1",
        "content": "<?xml version='1.0' ?><root><node t='A' serverid='5253d2b70ef116f7c5b142e8'>" + song.songName + "-" + song.artist + "</node><node t='D' serverid='5253d2b70ef116f7c5b142e8'>" + "专辑：" + album.albumName + "</node><node t='P' serverid='5253d2b70ef116f7c5b142e7'>专辑封面</node></root>",
        "id": song.songID,
        "author": song.artist,
        //"lastupdate": "1381141280611",
        "filesize": song.size,
        "title": song.songName + "-" + song.artist,
        //"category": "40",
        "source": "云音乐",
        //"describe": "云音乐",
        //"channel": "1",
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
                //"words": "文字内容",
                //"prewords": "串词",
                //"encoder": "aac",
                //"bitrate": "128000",
                //"samplerate": "44100"
            }
        }, {
            "infoid": '5253d2b70ef116f7c5b142e7',
            "title": "专辑封面",
            "createtime": "1381225147140",
            "type": "0",
            "fileid": '5253d2b70ef116f7c5b142e7',
            "details": {
                "_id": '5253d2b70ef116f7c5b142e7',
                "url": album.picUrl,
                //"playurl": album.picUrl
                    //"ineturl": Album[0].picUrl,
                    //"localurl": Album[0].picUrl
            }
        }]
    };

    return infoString;

}

module.exports.genResult = function(nodeArr) {

    var nodeString = JSON.stringify(nodeArr);

    var nodeContent = nodeString.substring(0, nodeString.length);

    var preString = JSON.stringify({ "ret": 0, "result": 0 });
    //console.log(preString.substring(0, 18) + nodeContent + "}");

    nodeContent = nodeContent.replace(/&/g, "and");

    return preString.substring(0, 18) + nodeContent + "}";

}
