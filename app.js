const express = require('express')
const path = require('path');
const http = require('http')
const app = express()


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:30000/musiconline_test');
var db = mongoose.connection;

app.use(express.static(path.join(__dirname, './public')));

app.use('/api/qblist.do', require("./router/qblist"));

app.use("/api/qbsearch.do",require("./router/qbsearch"));

app.use("/getlist", require("./router/getlist"));

app.use("/getalbum", require("./router/getalbum"));


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server running @${port}`)
})

module.exports = app