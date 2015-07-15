
var portNum = process.env.PORT || 5001;

var express = require('express');
var app = express();

app.use("/", express.static("src"));

var server = app.listen(portNum, function () {
    var addr = server.address().address;
    var host = isLocalHost(addr) ? "localhost" : addr;
    var port = server.address().port;
    console.log('Web application listening at http://%s:%s', host, port);
});

function isLocalHost(addr) {
    return addr === "::";
}
