
require.config({
    paths:{
        'jquery':'../lib/jquery-3.2.1',
        'bootstrap':"../lib/bootstrap-3.3.7-dist/js/bootstrap.min"
        // 'qrcod':'lib/jeromeetienne-jquery/jquery.qrcode.min.js'

    },
    shim:{
        'bootstrap':["jquery"]
        // 'qrcod':["jquery"]

    }
})