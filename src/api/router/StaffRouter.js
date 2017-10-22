var bodyparser = require("body-parser");
var newdb = require("../DB.js");
var urlencode = bodyparser.urlencoded({extended: false});

module.exports = {
    StaffAdd: function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/StaffAdd", function(request, response){
                    newdb.insert("staff", request.body, function(result){
                        response.send(result);
                    });
            });
    },
    StaffFind:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/StaffFind", function(request, response){
                    newdb.select("staff", request.body, function(result){
                        response.send(result);
                    });
            });
    },
    StaffConFind:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/staffConFind", function(request, response){
                    newdb.conSelect("staff", request.body, function(result){
                        response.send(result);
                    });
            });
    },
    StaffMax:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/StaffMax", function(request, response){
                    for( var key in request.body){
                        request.body[key] = request.body[key]*1;
                    }
                    newdb.maxSelect("staff", request.body, function(result){
                        response.send(result);
                    });
            });
    },
    StaffUpdate:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/StaffUpdate", function(request, response){
                var condition = JSON.parse(request.body.update);
                    newdb.dataUpdate("staff", condition, function(result){
                        response.send(result);
                    });
            });
    },
    StaffRomove: function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/StaffRomove", function(request, response){
                    newdb.delete("staff", request.body, function(result){
                        response.send(result);
                    });
            });
    }
}