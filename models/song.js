var mongoose = require('mongoose');

var songSchema = mongoose.Schema({

    albumID: String,

    songID: {
        type: String,
        unique: true,
        required: true
    },

    songName: String,

    duration: String,

    popularity: Number,

    score: String,

    artist: String,

    position: String,

    mvID: String,

    copyrightID: String,

    commentCount: String,

    lyric: String,

    size: String,

    md5: String,

    inUse: String,

    locate: String

});

var song = module.exports = mongoose.model('song', songSchema);


//create Song
module.exports.addSong = function(Song, callback) {
    song.create(Song, callback);
};

module.exports.updateSongmd5 = function(Song, callback) {
    song.findOneAndUpdate({ 'songID': Song.songID }, { 'size': Song.size, 'md5': Song.md5 }, callback);
};

module.exports.findSongs = function(key, callback) {
    //song.find({ 'popularity': { $in: [100] },'md5':{$gt:'0'}, $text: { $search: key } }, { searchScore: { $meta: "textScore" } }, callback).sort({ searchScore: { $meta: "textScore" }, popularity: -1 }).limit(200);
    song.find({ 'inUse' : '1', '$or': [{ 'songName': { $regex: key, $options: 'i' } }, { 'artist': { $regex: key, $options: 'i' } }] }, callback).limit(200)
        //db.getCollection('songs').find({"popularity":{$in:[100]},"$or":[{'songName':/多恼河/},{'artist':/张信哲/}]})
};

module.exports.randomSongs = function(i, callback) {
    song.find({ 'inUse' : '1' }, callback).skip(i).limit(100);
}
