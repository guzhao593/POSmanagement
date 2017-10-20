
require.config({
    paths:{
        'jquery':'../lib/jquery-3.2.1',
        'bootstrap':"../lib/bootstrap-3.3.7-dist/js/bootstrap.min"
    },
    shim:{
        'bootstrap':["jquery"]
    }
})