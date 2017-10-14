var express = require("express");
var app = express();

var router = require("./api/router/MainRouter.js");
router.Register(app);

app.listen(8848);