var express = require('express');
var fs = require('fs');
var moment = require('moment');

var app = express();

app.get('/', function (req, res) {
    res.send(fs.readFileSync('home.html', 'utf8'));
});

app.get('/:data', function (req, res) {
    var data = new Data();
    data.setDate(req.params.data);
    res.send(data);
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log('Timespan Microservice listening on {1}:{2}!'
        .replace('{1}', process.env.IP)
        .replace('{2}', process.env.PORT));
});

function Data() {
    this.unix = null;
    this.natural = null;
}

Data.NATURAL = "MMMM DD, YYYY";

Data.prototype.setDate = function (value) {
    var m = null;
    if (parseInt(value) == value) m = moment.unix(parseInt(value));
    if (!m || !m.isValid()) m = moment(value, Data.NATURAL);
    if (!m.isValid()) return;
    this.unix = m.unix();
    this.natural = m.format(Data.NATURAL);
}