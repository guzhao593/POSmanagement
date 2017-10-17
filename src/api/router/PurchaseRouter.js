var bodyparser = require("body-parser");
var db = require("../DBHelper.js");
var urlencode = bodyparser.urlencoded({extended: false});

module.exports = {
    GoodsIn:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({extended:false}));
        app.post("/addlist",urlencode,function(request,response){
            // console.log(JSON.parse(request.body.data))
            // request.body.data='['+request.body.data+']'
            // var obj = {listNum:request.body.listNum,data:(request.body.data).split()}
            // var aa = JSON.parse(request.body.data)
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
            console.log(request.body)
            db.delete('addlist',request.body,function(result){
                response.send(result);
            })
        })
    }

}