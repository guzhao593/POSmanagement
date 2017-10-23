var bodyparser = require("body-parser");
// var db = require("../DBHelper.js");
var urlencode = bodyparser.urlencoded({extended: false});
var newdb = require("../DB.js")

module.exports = {
    GoodsIn:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({extended:false}));
        app.post("/addlist",urlencode,function(request,response){
            newdb.insert('addlist',request.body,function(result){
                response.send(result);
            });
        })

    },
    ListOut:function(app){
        app.get('/listOut',function(request,response){
            newdb.select('addlist',{},function(result){
                response.send(result)
            })
        })
    },
    TableDel:function(app){
        app.post('/tableDel',function(request,response){
            newdb.delete('addlist',request.body,function(result){
                response.send(result);
            })
        })
    },
    Receive:function(app){
        app.post('/receive',function(request,response){
            var arr = JSON.parse(request.body.data);
                var Num;
                for(let i=0;i<arr.length;i++){
                    var object = {barc:arr[i].barc}
                    newdb.select('product',object,function(result){
                        
                       if(result.data.length == 0){
                        newdb.insert('product',arr[i],function(res){
                            response.send(res)
                        })
                       }else if(result.data.length > 0){
                            Num = arr[i].num*1 + result.data[0].num*1;
                           
                            newdb.update('product',{origin:{barc:arr[i].barc},refresh:{num:Num}},function(res){
                                response.send(res)
                            })
                        }
                    })
                }
        })
    },
    ChangeStatus:function(app){
        app.post('/changestatus',function(req,res){
            newdb.update('addlist',{origin:{listNum:req.body.listNum},refresh:{status:req.body.status}},function(result){
                res.send(result)
            })
        })
    }

}