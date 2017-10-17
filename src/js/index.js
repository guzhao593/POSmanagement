require(['config'],function(){
    require(['jquery','common','bootstrap'],function($,com){
        var baseUrl = com.baseUrl;
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
    });
});