var bodyparser = require("body-parser");
var db = require("../DBHelper.js");
var urlencode = bodyparser.urlencoded({extended: false});
var Ndb = require("../DB.js")

module.exports = {
    OrderOut:function(app){
        app.post('/orderout',function(request,response){
            db.select('orderform',{},function(result){
                console.log(result)
                response.send(result)
            })
        })
    },
    OrderDele:function(app){
        app.post('/orderdele',function(request,response){
            // console.log(request.body)
            db.delete('orderform',request.body,function(result){
                response.send(result);
            })
        })
    }
}