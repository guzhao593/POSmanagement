var bodyparser = require("body-parser");
var urlencode = bodyparser.urlencoded({extended: false});
var newdb = require("../DB.js");

module.exports = {
    OrderOut:function(app){
        app.post('/orderout',function(request,response){
            newdb.select('order',{},function(result){
                response.send(result)
            })
        })
    },
    OrderDele:function(app){
        app.post('/orderdele',function(request,response){
            newdb.delete('order',request.body,function(result){
                response.send(result);
            })
        })
    },
    SupplierAdd:function(app){
        app.post('/supplieradd',function(req,res){
            newdb.insert('supplier',req.body,function(result){
                res.send(result);
            })
        })
    },
    SupplierShow:function(app){
        app.post("/supplierfind", function(request, response){
                    newdb.select("supplier", request.body, function(result){
                        response.send(result);
                    });
            });
    }
}