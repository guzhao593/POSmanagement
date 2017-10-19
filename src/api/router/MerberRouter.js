var bodyparser = require("body-parser");
var db = require("../DBHelper.js");
var urlencode = bodyparser.urlencoded({extended: false});

module.exports = {
    MerberAdd: function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/merberAdd", function(request, response){
                    db.insert("merber", request.body, function(result){
                        response.send(result);
                    });
            });
    },
    MerberFind:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/merberFind", function(request, response){
                    db.select("merber", request.body, function(result){
                        response.send(result);
                    });
            });
    },
    MerberUpdate:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/merberUpdate", function(request, response){
                var condition = JSON.parse(request.body.update);
                    db.update("merber", condition, function(result){
                        response.send(result);
                    });
            });
    },
    MerberRomove: function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/merberRomove", function(request, response){
                    db.delete("merber", request.body, function(result)
                    {
                        console.log(request.body);
                        response.send(result);
                    });
            });
    }
}