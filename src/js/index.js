require(['config'],function(){
    require(['jquery','common','bootstrap','datagird'],function($,com){
        // var ws = new WebSocket("ws://localhost:888");
        // ws.onmessage = function(_msg){
        //   console.log(_msg);
        // }
         //点击员工管理按纽加载员工管理页面
        $('.content-right').load('html/staff.html',function(){
            //执行员工管理函数
            com.staff();
        }); 
       //是否登录
       com.issign();
        //产品管理
        com.Product();
        //收银管理
        com.Money();
        //进货单 入库
        com.addlist();
        //点击菜单按纽
        $('.navlist').on('click','li',function(){
          $(this).addClass('hover').siblings().removeClass('hover');
          //点击会员管理按纽
          if($(this).hasClass('merber')){
               //点击会员管理按纽加载会员管理页面
              $('.content-right').load('html/merber.html',function(){
                  //执行会员管理函数
                  com.merber();
              }); 
          }
          //点击员工管理按纽
          if($(this).hasClass('staff')){
               //点击员工管理按纽加载员工管理页面
              $('.content-right').load('html/staff.html',function(){
                  //执行员工管理函数
                  com.staff();
              }); 
          }
          //点击库存管理按纽
          if($(this).hasClass('stock')){
               //点击库存管理按纽加载库存管理页面
              $('.content-right').load('html/stock.html',function(){
                  //执行库存管理函数
                  com.stock();
              }); 
          }
          //点击上架管理按纽
          if($(this).hasClass('putawaygoods')){
               //点击上架管理按纽加载上架管理页面
              $('.content-right').load('html/putaway.html',function(){
                  //执行上架管理函数
                  com.putaway();
              }); 
          }
        })
        //订单
        $('.order').click(function(){
            $('.content-right').load('html/order.html',function(){
                 com.order();
            })
        })
        //供应商
        $('.provider').click(function(){
          $('.content-right').load('html/provider.html',function(){
            com.supplier();
          })
        })

    });
});