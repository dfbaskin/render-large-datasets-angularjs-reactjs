
var portNum = process.env.PORT || 5001;

var express = require('express');
var app = express();

app.all("*", function(req, res, next) {
    console.log('--> ' + req.path);
    next();
});

app.use("/angular2", express.static("node_modules/angular2"));
app.use("/zone", express.static("node_modules/angular2/node_modules/zone.js/lib"));
app.use("/es6-shim", express.static("node_modules/es6-shim"));
app.use("/reflect-metadata", express.static("node_modules/reflect-metadata"));
app.use("/systemjs", express.static("node_modules/systemjs/dist"));
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
