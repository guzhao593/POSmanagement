var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var db;

MongoClient.connect("mongodb://localhost:27017/bb", function(err, database) {
  if(err) throw err;
  db = database;
});

module.exports = {
	insert: function(_collection, _data, _callback){
		var i = db.collection(_collection).insert(_data).then(function(result){
			_callback({status:true});
		});
	},
	//普通数据查找
	select: function(_collection, _condition, _callback){
		var i = db.collection(_collection).find(_condition || {}).toArray(function(error, dataset){
			if(error){
				_callback({status: false});
			}else{
				_callback({status: true, data: dataset});
			}
		})
	},
	//分页查找
	turnPage: function(_collection, _condition, _callback){
		var i = db.collection(_collection).find(_condition.find).skip(_condition.skip).limit(_condition.limit).toArray(function(error,dataset){
			_callback({status:true,data:dataset});
		});
	},
	//查找最大值 用于自动编码
	maxSelect:function(_collection, _condition, _callback){
		//_condition = {staffcode:-1}
		var i = db.collection(_collection).find({}).sort(_condition).limit(1).toArray(function(error, dataset){
			_callback({status: true, data: dataset});
		})
	},
	//条件查找
	conSelect: function(_collection, _condition, _callback){
		//_condition = {condition:condition,findval:findval,classify:findClass}
		var condition = _condition.condition;
		var findval = _condition.findval;
		var classify = _condition.classify;
		var classFind = {
			'包含':{[condition]:new RegExp(findval,"ig")},
			'等于':{[condition]:findval},
			"不等于":{[condition]:{$ne:findval}},
			"大于":{[condition]:{$gt:findval}},
			"小于":{[condition]:{$lt:findval}}
		};
		var i = db.collection(_collection).find(classFind[classify] || {}).toArray(function(error, dataset){
			_callback({status: true, data: dataset});
		})
	},
	//整条信息修改
	dataUpdate: function(_collection, _condition, _callback){
		var i = db.collection(_collection).update(_condition.origin,_condition.update).then(function(result){
			_callback(result);
		});
	},
	delete: function(_collection, _condition, _callback){
		var i = db.collection(_collection).remove(_condition).then(function(result){
			_callback(result);
		});
	},
	update: function(_collection,_condition,_callback){
		var i = db.collection(_collection).update(_condition.origin,{$set:_condition.refresh}).then(function(result){
			_callback({status:true,data:_condition});
		})
	},
	//数量信息修改
	numUpdate:function(_collection, _condition, _callback){
		var i = db.collection(_collection).update(_condition.find,{$inc:_condition.num}).then(function(result){
			_callback({status:true,data:_condition})
		})
	}
}