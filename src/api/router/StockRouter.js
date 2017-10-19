var bodyparser = require("body-parser");
var db = require("../DBHelper.js");
var urlencode = bodyparser.urlencoded({extended: false});
var newdb = require("../DB.js");
module.exports = {
    StockAdd: function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/StockAdd", function(request, response){
            newdb.select("product", {productCode:request.body.productCode},function(result){
                if(result.data.length == 0){
                    newdb.insert("product", request.body, function(result){
                        response.send(result);
                    });
                } else {
                    request.body.quantity = request.body.quantity*1 + result.data[0].quantity*1;
                    var condition = {origin:result.data[0],update:request.body}
                    newdb.update("product", condition, function(result){
                        console.log(result);
                        response.send(result);
                    });
                }
                })
            });
    },
    StockFind:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/StockFind", function(request, response){
                    db.select("product", request.body, function(result){
                        response.send(result);
                    });
            });
    },
    StockUpdate:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/StockUpdate", function(request, response){
                var condition = JSON.parse(request.body.update);
                    db.update("product", condition, function(result){
                        response.send(result);
                    });
            });
    },
    StockRomove: function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/StockRomove", function(request, response){
                    db.delete("product", request.body, function(result){
                        response.send(result);
                    });
            });
    }
}