var userRouter = require("./UserRouter.js");

var productRouter = require("./ProductRouter.js");

var purchaseRouter = require('./PurchaseRouter.js');

var merberRouter = require("./MerberRouter.js");

var staffRouter = require("./StaffRouter.js");

var stockRouter = require("./StockRouter.js");

var putawayRouter = require("./PutawayRouter.js");

module.exports = {
    Register: function(app){
        // //跨域
        app.all('*', function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
            res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
            res.header("X-Powered-By",' 3.2.1');
            if(req.method=="OPTIONS") {
              res.send(200);/*让options请求快速返回*/
            } else{
              next();
            }
        });
        // app.use(express.static(__dirname + '/'));
        
        userRouter.Register(app);
        //产品管理
        productRouter.ProductIn(app);
        productRouter.ProductOut(app);
        productRouter.ProductRemove(app);
        productRouter.ProductUpdate(app);
        //采购管理

        //采购管理+进货
        purchaseRouter.GoodsIn(app);
        purchaseRouter.ListOut(app);
        purchaseRouter.TableDel(app);
        purchaseRouter.Receive(app);
        purchaseRouter.ChangeStatus(app);

        //会员管理
        merberRouter.MerberFind(app);
        merberRouter.MerberAdd(app);
        merberRouter.MerberUpdate(app);
        merberRouter.MerberRomove(app);

         //员工管理
        staffRouter.StaffFind(app);
        staffRouter.StaffAdd(app);
        staffRouter.StaffUpdate(app);
        staffRouter.StaffRomove(app);

         //库存管理
        stockRouter.StockFind(app);
        stockRouter.StockAdd(app);
        stockRouter.StockUpdate(app);
        stockRouter.StockRomove(app);

         //上架管理
        putawayRouter.PutawayFind(app);
        putawayRouter.PutawayAdd(app);
        putawayRouter.PutawayUpdate(app);
        putawayRouter.PutawayRomove(app);
    }

}