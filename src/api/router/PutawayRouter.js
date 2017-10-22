var bodyparser = require("body-parser");
var urlencode = bodyparser.urlencoded({extended: false});
var newdb = require("../DB.js");
module.exports = {
    PutawayAdd: function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/PutawayAdd", function(request, response){
            newdb.select("putaway", {code:request.body.code},function(result){
                if(result.data.length == 0){
                    request.body.num = request.body.num * 1;
                    newdb.insert("putaway", request.body, function(result){
                        response.send(result);
                    });
                } else {
                    var condition = {find:{code:request.body.code},num:{num:request.body.num*1}}
                    newdb.numUpdate("putaway", condition, function(result){
                        response.send(result);
                    });
                }
                })
            });
    },
    PutawayFind:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/PutawayFind", function(request, response){
                    newdb.select("putaway", request.body, function(result){
                        response.send(result);
                    });
            });
    },
    PutawayConFind:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/PutawayConFind", function(request, response){
                console.log(request.body);
                    newdb.conSelect("putaway", request.body, function(result){
                        response.send(result);
                    });
            });
    },
    PutawayUpdate:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/PutawayUpdate", function(request, response){
                newdb.numUpdate("putaway", JSON.parse(request.body.putawayData), function(result){
                    response.send(result);
                });
            });
    },
    PutawayRomove: function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/PutawayRomove", function(request, response){
                    newdb.delete("putaway", request.body, function(result){
                        response.send(result);
                    });
            });
    }
}