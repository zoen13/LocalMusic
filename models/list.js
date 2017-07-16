var mongoose = require('mongoose');

var listSchema = mongoose.Schema({

    listIdx: String,

    songID: String,

    songIndex: Number

});

var list = module.exports = mongoose.model('list', listSchema);


//create Album
module.exports.addList = function(List, callback) {
    list.create(List, callback);
};

module.exports.findList = function(listIdx, callback) {
    //var result = album.find({ 'albumID': albumID });
    //console.log(result.albumName);
    list.find({ 'listIdx': listIdx }, callback);
};

module.exports.removeList = function(listIdx, callback) {
    list.remove({ 'listIdx': listIdx }, callback);
};
