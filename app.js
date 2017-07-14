const express = require('express')
const path = require('path');
const http = require('http')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')
    //const morgan = require('morgan')
    //const YLogger = require('yog-log')

var mongoose = require('mongoose');

var log = require('./functions/log')
var QBResult = require('./functions/QBResult')

mongoose.connect('mongodb://localhost:30000/musiconline');
var db = mongoose.connection;

app.use(express.static(path.join(__dirname, './public')));

//var accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags: 'a'});

//app.use(morgan('combined',{stream: accessLogStream}));

//var yogconf = {
//  app:'LocalMusic',
//  log_path:path.join(__dirname,'log'),
//  intLevel:16
//}
//app.use(YLogger(yogconf));

//以下两句是为了能让程序解析出post上来的数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var albumCollection = require('./models/album')
var songCollection = require('./models/song')

app.post('/api/qbsearch.do', function(req, res) {

    var key = req.body.key;

    log.addLog(req.connection.remoteAddress, key, new Date());

    songCollection.findSongs(key, function(err, Song) {
        if (err) {
            throw err;
        } else {
            var result = QBResult.genResult(Song);
            console.log(result);
            res.send(result);
        }

    })
})

app.get('/api/qblist.do', function(req, res) {

    var type = req.query.type;

    log.addLog(req.connection.remoteAddress, req.query.type, new Date());

    var i = Math.floor(Math.random() * 111000); //随机生成一个0-111000之间的整数
    songCollection.randomSongs(i, function(err, Song) {
        if (err) {
            throw err;
        } else {
            res.send(genResult(Song));
        }

    })

});

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server running @${port}`)
})

module.exports = app
