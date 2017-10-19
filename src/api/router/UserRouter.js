var bodyparser = require("body-parser");
var db = require("../DBHelper.js");
var urlencode = bodyparser.urlencoded({extended: false});

module.exports = {
    Register: function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/register", function(request, response){
            db.select("user", {name:request.body.name}, function(result){
                if(!result.status){
                    response.send(result);
                } else if(result.data.length > 0){
                    response.send({status:false, message:"当前用户已存在"});
                } else {
                    db.insert("user", request.body, function(result){
                        response.send(result);
                    });
                }
            });
        });
        app.post("/login", function(requset, response){
        });
    }

}