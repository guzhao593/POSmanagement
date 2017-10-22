var bodyparser = require("body-parser");
var db = require("../DBHelper.js");
var urlencode = bodyparser.urlencoded({extended: false});
var newdb = require("../DB.js");
module.exports = {
    ProductIn:function(app){
            app.use(bodyparser.json());
            app.use(bodyparser.urlencoded({ extended: false }));
            app.post("/productIn", function(request, response){
            newdb.select("product", {barc:request.body.barc}, function(result){
                console.log(result);
                if(result.status == false){
                    response.send(result);
                }else{
                    if(result.data.length == 0){
                        newdb.insert("product", request.body, function(result){
                            response.send(result);
                        });
                    }else{
                        response.send({status: false, msg: "产品已存在"});
                    }
                } 
            });
        });
    },
    ProductOut:function(app){
        app.post("/productOut", function(request, response){
            newdb.select("product", request.body, function(result){
                if(!result.status){
                    response.send(result);
                } 
                else {
                    response.send(result);
                }
            });
        });
    },
    ProductRemove:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/productRemove", function(request, response){
                    newdb.delete("product", request.body, function(result)
                    {
                        response.send(result);
                    });
            });
    },
    ProductUpdate:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/productUpdate", function(request, response){
                var condition = JSON.parse(request.body.update);
                    newdb.dataUpdate("product", condition, function(result){
                        response.send(result);
                    });
            });
    },
    OrderForm:function(app){
        app.post("/billIn", function(request, response){
                    newdb.insert("order", request.body, function(result){
                        response.send(result);
                    });
            }); 
    }
}