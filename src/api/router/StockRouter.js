var bodyparser = require("body-parser");
var urlencode = bodyparser.urlencoded({extended: false});
var newdb = require("../DB.js");
module.exports = {
    StockAdd: function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/StockAdd", function(request, response){
            newdb.numUpdate("product", JSON.parse(request.body.stockData), function(result){
                response.send(result);
                });
            });
    },
    StockFind:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/StockFind", function(request, response){
                    newdb.select("product", request.body, function(result){
                        response.send(result);
                    });
            });
    },
    StockConFind:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/StockConFind", function(request, response){
                    newdb.conSelect("product", request.body, function(result){
                        response.send(result);
                    });
            });
    },
    StockUpdate:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/StockUpdate", function(request, response){
                newdb.numUpdate("product", JSON.parse(request.body.stockData), function(result){
                    response.send(result);
                    });
                });
    },
    StockRomove: function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/StockRomove", function(request, response){
                    newdb.delete("product", request.body, function(result){
                        response.send(result);
                    });
            });
    }
}