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
    }
}