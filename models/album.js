var mongoose = require('mongoose');

var albumSchema = mongoose.Schema({

    albumID: {
        type: String,
        unique: true,
        required: true
    },

    albumName: String,

    publishTime: String,

    songCount: String,

    picUrl: String,

    likedCount: String,

    shareCount: String,

    commentCount: String,

    company: String,

    copyrightID: String,

    artist: String

});

var album = module.exports = mongoose.model('album', albumSchema);


//create Album
module.exports.addAlbum = function(Album, callback) {
    album.create(Album, callback);
};

module.exports.findAlbum = function(albumID, callback) {
    //var result = album.find({ 'albumID': albumID });
    //console.log(result.albumName);
    album.find({ 'albumID': albumID }, callback);
};

module.exports.updateAlbum = function(Album, callback) {
    //var result = album.find({ 'albumID': albumID });
    //console.log(result.albumName);
    album.update({ 'albumID': Album.albumID }, Album, { upsert: true }, callback);
};
