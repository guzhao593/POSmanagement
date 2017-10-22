var bodyparser = require("body-parser");
var newdb = require("../DB.js");
var urlencode = bodyparser.urlencoded({extended: false});

module.exports = {
    MerberAdd: function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/merberAdd", function(request, response){
                    newdb.insert("merber", request.body, function(result){
                        response.send(result);
                    });
            });
    },
    MerberFind:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/merberFind", function(request, response){
                    newdb.select("merber", request.body, function(result){
                        response.send(result);
                    });
            });
    },
    MerberConFind:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/merberConFind", function(request, response){
                    newdb.conSelect("merber", request.body, function(result){
                        response.send(result);
                    });
            });
    },
    MerberUpdate:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/merberUpdate", function(request, response){
                var condition = JSON.parse(request.body.update);
                    newdb.dataUpdate("merber", condition, function(result){
                        response.send(result);
                    });
            });
    },
    MerberMax:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/merberMax", function(request, response){
                    for( var key in request.body){
                        request.body[key] = request.body[key]*1;
                    }
                    newdb.maxSelect("merber", request.body, function(result){
                        response.send(result);
                    });
            });
    },
    MerberRomove: function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/merberRomove", function(request, response){
                    newdb.delete("merber", request.body, function(result)
                    {
                        response.send(result);
                    });
            });
    }
}