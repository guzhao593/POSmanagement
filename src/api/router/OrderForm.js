var bodyparser = require("body-parser");
var db = require("../DBHelper.js");
var urlencode = bodyparser.urlencoded({extended: false});
var Ndb = require("../DB.js")

module.exports = {
    OrderOut:function(app){
        app.post('/orderout',function(request,response){
            db.select('order',{},function(result){
                response.send(result)
            })
        })
    },
    OrderDele:function(app){
        app.post('/orderdele',function(request,response){
            // console.log(request.body)
            db.delete('order',request.body,function(result){
                response.send(result);
            })
        })
    },
    SupplierAdd:function(app){
        app.post('/supplieradd',function(req,res){
            console.log(req.body)
            db.insert('supplier',req.body,function(result){
                res.send(result);
            })
        })
    },
    SupplierShow:function(app){
        app.post("/supplierfind", function(request, response){
                    db.select("supplier", request.body, function(result){
                        response.send(result);
                    });
            });
    }
}