var bodyparser = require("body-parser");
var db = require("../DBHelper.js");
var urlencode = bodyparser.urlencoded({extended: false});
var newdb = require("../DB.js");
module.exports = {
    PutawayAdd: function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/PutawayAdd", function(request, response){
            newdb.select("putaway", {code:request.body.code},function(result){
                console.log({code:request.body.code});
                if(result.data.length == 0){
                    newdb.insert("putaway", request.body, function(result){
                        response.send(result);
                    });
                } else {
                    request.body.num = request.body.num*1 + result.data[0].num*1;
                    var condition = {origin:result.data[0],update:request.body}
                    newdb.Zupdate("putaway", condition, function(result){
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
                    db.select("putaway", request.body, function(result){
                        response.send(result);
                    });
            });
    },
    PutawayUpdate:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/PutawayUpdate", function(request, response){
                var condition = JSON.parse(request.body.update);
                    db.update("putaway", condition, function(result){
                        response.send(result);
                    });
            });
    },
    PutawayRomove: function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/PutawayRomove", function(request, response){
                    db.delete("putaway", request.body, function(result){
                        response.send(result);
                    });
            });
    }
}