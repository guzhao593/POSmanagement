var mongodb = require("mongodb");
var dbServer = new mongodb.Server('localhost', 27017);
var db = mongodb.Db("bb", dbServer);

module.exports = {
    insert: function(_collection, _data, _callback){
        // console.log(_data);
        db.open(function(error, db){
            if(error){
                _callback({status:false, message: error});
            } else {
                db.collection(_collection, function(error, collection){
                    if(error){
                _callback({status:false, message: error});
                } else {
                    collection.insert(_data);
                    _callback({status:true,data:_data});
                    db.close();
                }
                });
            }
            db.close();
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
                        if(_condition.find =="count()"){
                            collection.find().count(function(err, dataset){
                                if(error){
                                    _callback({status: false, message:error});
                                } else {
                                    db.close();
                                    db.open(function(error, db){
                                        if(error){
                                            _callback({status: false, message:error});
                                        } else {
                                            db.collection(_collection, function(error,collection){
                                                if(error){
                                                    _callback({status: false, message:error})
                                                } else {
                                                    collection.find().skip(dataset-1).toArray(function(err,_data){
                                                        if(err){
                                                                _callback({status: false, message:error});
                                                            } else {
                                                                _callback({status: true, data: _data, count:dataset});
                                                            }
                                                        db.close();
                                                    });
                                                }
                                            })
                                        }
                                    })
                                }
                            });
                        } else if(_condition.class){
                            var findData;
                            switch(true){
                                case _condition.class == '包含':
                                var reg = new RegExp(_condition.findval,'ig');
                                console.log(reg);
                                findData = {[_condition.condition]:reg};
                                break;
                                case _condition.class == '等于':
                                findData = {[_condition.condition]:_condition.findval};
                                break;
                                case _condition.class == '不等于':
                                findData = {[_condition.condition]:{$ne:_condition.findval}};
                                break;
                                case _condition.class == '大于':
                                findData = {[_condition.condition]:{$gt:_condition.findval}};
                                break;
                                case _condition.class == '小于':
                                findData = {[_condition.condition]:{$lt:_condition.findval}};
                                break;
                            }
                            collection.find(findData || {}).toArray(function(error,dataset){
                                if(error){
                                    _callback({status: false, message:error});
                                } else {
                                    _callback({status: true, data: dataset});
                                    db.close();
                                }
                            });
                        }else{
                            collection.find(_condition || {}).toArray(function(error,dataset){
                                // console.log(_condition)

                                if(error){
                                    _callback({status: false, message:error});
                                } else {
                                    _callback({status: true, data: dataset});
                                    db.close();
                                    // console.log(dataset)
                                }
                            });
                        }
                        db.close();
                    }
                });
            }
            db.close();
        });
    },
    update: function(_collection, _condition, _callback){
        db.open(function(error, db){
            if(error){
                _callback({status:false, message: error});
            } else {
                db.collection(_collection, function(error, collection){
                    if(error){
                _callback({status:false, message: error});
                } else {
                    collection.update(_condition.origin,_condition.update);
                    _callback({status:true,data:_condition});
                    db.close();
                }
                db.close();
            });
                db.close();
            }
            db.close();
        });
    },
    delete: function(_collection, _condition, _callback){
        db.open(function(error, db){
            if(error){
                _callback({status:false, message: error});
            } else {
                db.collection(_collection, function(error, collection){
                    if(error){
                _callback({status:false, message: error});
                } else {
                    collection.remove(_condition);
                    _callback({status:true,data:_condition});
                    db.close();
                }
                });
            }
            db.close();
        });
    }
}
