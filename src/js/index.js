require(['config'],function(){
    require(['jquery','common','bootstrap'],function($,com){
        var baseUrl = com.baseUrl;
        var cookies = document.cookie.split('; ');
        var token = '';
        cookies.forEach(function(item){
          var temp = item.split('=');
          if(temp[0] == 'token'){
            token = temp[1];
          }
        });
        $.ajax({
          type: 'post',
          url: `${baseUrl}/index`,
          headers: {'Authorization': token},
          success: function(response){
            if(response.status ==false || response == undefined ){
              location.href = '../login.html'
            }
          }
        })
        //产品管理
        com.Product($);
        //进货单
        com.addlist();
        //点击会员管理按纽
        $('.navlist').on('click','li',function(){
          //点击会员管理按纽
          if($(this).hasClass('merber')){
               //点击会员管理按纽加载会员管理页面
              $('.content-right').load('html/merber.html',function(){
                  //执行会员管理函数
                  com.merber();
              }); 
          }
        })
        //点击员工管理按纽
        $('.navlist').on('click','li',function(){
          //点击员工管理按纽
          if($(this).hasClass('staff')){
               //点击员工管理按纽加载员工管理页面
              $('.content-right').load('html/staff.html',function(){
                  //执行员工管理函数
                  com.staff();
              }); 
          }
        })
        //点击库存管理按纽
        $('.navlist').on('click','li',function(){
          //点击库存管理按纽
          if($(this).hasClass('stock')){
               //点击库存管理按纽加载库存管理页面
              $('.content-right').load('html/stock.html',function(){
                  //执行库存管理函数
                  com.stock();
              }); 
          }
        })
        //点击上架管理按纽
        $('.navlist').on('click','li',function(){
          //点击上架管理按纽
          if($(this).hasClass('putawaygoods')){
               //点击上架管理按纽加载上架管理页面
              $('.content-right').load('html/putaway.html',function(){
                  //执行上架管理函数
                  com.putaway();
              }); 
          }
        })
    });
});