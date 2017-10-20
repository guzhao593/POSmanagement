
require.config({
    paths:{
        'jquery':'../lib/jquery-3.2.1',
        'bootstrap':"../lib/bootstrap-3.3.7-dist/js/bootstrap.min",
        'jq':'../lib/jeromeetienne-jquery/jquery-1.10.2.min',
        'qrcode':'../lib/jeromeetienne-jquery/jquery.qrcode.min',
        
    },
    shim:{
        'bootstrap':["jquery"],
        'qrcode':["jq"]
    }
})