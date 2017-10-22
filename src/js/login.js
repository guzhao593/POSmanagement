require(['config'],function(){
    require(['jquery','common','bootstrap'],function($,com){
        var baseUrl = com.baseUrl;
        com.login();
    });
});