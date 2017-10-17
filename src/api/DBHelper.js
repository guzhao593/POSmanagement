var mongodb = require("mongodb");
var dbServer = new mongodb.Server('localhost', 27017);
var db = mongodb.Db("bb", dbServer);

module.exports = {
    insert: function(_collection, _data, _callback){
        db.open(function(error, db){
            if(error){
                _callback({status:false, message: error});
            } else {
                db.collection(_collection, function(error, collection){
                    if(error){
                _callback({status:false, message: error});
            } else {
                collection.insert(_data);
                _callback({status:true});
            }
        });
            db.close();
            }
        });
    },
    select: function(_collection, _condition, _callback){
        db.open(function(error, db){
            if(error){
                _callback({status: false, message:error});
            } else {
                db.collection(_collection,function(error, collection){
                    if(error){
                        _callback({status: false, message:error})
                    } else {
                        collection.find(_condition || {}).toArray(function(error,dataset){
                            if(error){
                                _callback({status: false, message:error});
                            } else {
                                _callback({status: true, data: dataset});
                            }
                        });
                        
                    }
                });
            }
             db.close();
        });
    },
    update: function(){},
    delete: function(_collection,_condition,_callback){
        db.open(function(error,db){
            if(error){
                _callback({status:false,message:error});
            }else{
                db.collection(_collection,function(error,collection){
                    if(error){
                        _callback({status:false,message:error})
                    } else {
                        collection.remove(_condition)
                         _callback({status:true})
                    }
                })
            }
            db.close();
        })
    }
}
