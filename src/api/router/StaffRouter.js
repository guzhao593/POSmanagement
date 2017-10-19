var bodyparser = require("body-parser");
var db = require("../DBHelper.js");
var urlencode = bodyparser.urlencoded({extended: false});

module.exports = {
    StaffAdd: function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/StaffAdd", function(request, response){
                    db.insert("staff", request.body, function(result){
                        response.send(result);
                    });
            });
    },
    StaffFind:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/StaffFind", function(request, response){
                    db.select("staff", request.body, function(result){
                        response.send(result);
                    });
            });
    },
    StaffUpdate:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/StaffUpdate", function(request, response){
                var condition = JSON.parse(request.body.update);
                    db.update("staff", condition, function(result){
                        response.send(result);
                    });
            });
    },
    StaffRomove: function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/StaffRomove", function(request, response){
                    db.delete("staff", request.body, function(result){
                        response.send(result);
                    });
            });
    }
}