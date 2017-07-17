var datestring = require('../functions/DateString')
var log = require('../models/log')
module.exports.addLog = function(ip, keyword, createtime) {

    var logObject = new Object();
    logObject.ip = ip;
    logObject.keyword = keyword;
    logObject.createtime = datestring.toDateString(createtime);
    log.addLog(logObject, function(err, logObject) {
        if (err) {
            throw err;
        }
    });
}