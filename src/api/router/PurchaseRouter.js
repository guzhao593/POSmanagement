var bodyparser = require("body-parser");
var db = require("../DBHelper.js");
var urlencode = bodyparser.urlencoded({extended: false});
var Ndb = require("../DB.js")

module.exports = {
    GoodsIn:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({extended:false}));
        app.post("/addlist",urlencode,function(request,response){
            
            // request.body.status = 0;
            db.insert('addlist',request.body,function(result){
                response.send(result);
            });
        })

    },
    ListOut:function(app){
        app.get('/listOut',function(request,response){
            db.select('addlist',{},function(result){
                response.send(result)
            })
        })
    },
    TableDel:function(app){
        app.post('/tableDel',function(request,response){
            // console.log(request.body)
            db.delete('addlist',request.body,function(result){
                response.send(result);
            })
        })
    },
    Receive:function(app){
        app.post('/receive',function(request,response){
            var arr = JSON.parse(request.body.data);
            // console.log(arr)
                var Num;
                for(let i=0;i<arr.length;i++){
                    var object = {barc:arr[i].barc}
                    Ndb.select('product',object,function(result){
                        // console.log(arr[i]);
                        
                       if(result.data.length == 0){
                        Ndb.insert('product',arr[i],function(res){
                            // console.log(res)
                            response.send(res)
                        })
                       }else if(result.data.length > 0){
                            Num = arr[i].num*1 + result.data[0].num*1;
                            // console.log(num)
                           
                            Ndb.update('product',{origin:{barc:arr[i].barc},refresh:{num:Num}},function(res){
                                response.send(res)
                            })
                        }
                    })
                }
        })
    },
    ChangeStatus:function(app){
        app.post('/changestatus',function(req,res){
            Ndb.update('addlist',{origin:{listNum:req.body.listNum},refresh:{status:req.body.status}},function(res){
                // console.log(res)
                response.send(res)
            })
        })
    }

}