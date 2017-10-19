var bodyparser = require("body-parser");
var db = require("../DBHelper.js");
var urlencode = bodyparser.urlencoded({extended: false});
module.exports = {
    ProductIn:function(app){
            app.use(bodyparser.json());
            app.use(bodyparser.urlencoded({ extended: false }));
            app.post("/productIn", function(request, response){
            db.select("user", {barCode:request.body.barCode}, function(result){
                if(!result.status){
                    response.send(result);
                }else if(result.data.barCode == request.body.barCode){
                        response.send({status:false, message:"当前用户已存在"})
                    }else{
                    db.insert("user", request.body, function(result){
                        response.send(result);
                    });
                } 

                // if(result.data.barCode != request.body.barCode){
                //     db.insert("user", request.body, function(result){
                //         response.send(result);
                //     });
                // } 
                
            });
        });
    },
    ProductOut:function(app){
        app.post("/productOut", function(request, response){
            // console.log(request);
            db.select("user", request.body, function(result){
                if(!result.status){
                    response.send(result);
                } 
                else {
                        response.send(result);
                }
            });
        });
    }
}