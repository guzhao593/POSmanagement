var bodyparser = require("body-parser");
var db = require("../DBHelper.js");
var urlencode = bodyparser.urlencoded({extended: false});
var cookie = require('cookie-parser');
var session = require('express-session');
var url = require('url');
var jwt = require('jsonwebtoken');
var ws = 
module.exports = {
    Register: function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.use(cookie());
        app.use(session({
            secret: '12345',//用来对session数据进行加密的字符串.这个属性值为必须指定的属性
            name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
            cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
            resave: false,
            saveUninitialized: true,    
        }))
        //过滤器
        // app.use(function(req, res, next){
        //     console.log(req.session);
        //  if(!req.session.name && url.parse(req.url).pathname != "/login"){
        //      res.send('{state: false, message: "当前没有权限访问"}');
        //      next();
        //      // next('{state: false, message: "当前没有权限访问"}');
        //  } else {
        //      next();
        //  }
        //  //你可以执行下一步操作
            
        // })
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
        app.post("/login", function(request, response){
            db.select("staff", request.body, function(result){
                if(!result.status){
                    response.send(result);
                } else if(result.data.length > 0){
                    console.log(request.body);
                    var token = jwt.sign(request.body, "secret",  {
                        'expiresIn': 1440 // 设置过期时间
                    })
                    console.log(token);
                    response.send({status: true, token: token});
                } else {
                    response.send({status:false});
                }
            });
        });
        app.get("/login", function(request, response){
            request.session.name = request.query;
            console.log(request.session);
            response.send(true);
        });
        app.post("/index", function(req, res){
            var token = req.headers['authorization'];
            jwt.verify(token, 'secret', function(error, result){
                if(error){
                    res.send({status: false, message: error});
                } else {
                    res.send({status: true});
                }
            })        
        })

    }

}