const Redis = require('ioredis')
const config = require('../config/setting')
const redis = new Redis(config.redis)
redis.on('connect', function () {
  	console.info('连接redis缓存数据库成功！');
});
redis.on('error', function (err) {
  	console.error('Redis Error' + err);
});
redis._get = async function(key){
	let value = await redis.get(key);
	try{
		value = JSON.parse(value);
	}catch(err){}
	return value;
}
redis._set = function(...arguments){
	if(typeof arguments[1] === "object"){
		arguments[1] = JSON.stringify(arguments[1]);
	};
	redis.set.apply(this,arguments);
}
redis._hgetall = async function(key,index){
	let o = await redis.hgetall(key);
	if(!index){
		return o;
	};
	let value = o[index];
	try{
		value = JSON.parse(value);
	}catch(err){}
	return value;
}
redis._hmset = function(...arguments){
	if(typeof arguments[2] === "object"){
		arguments[2] = JSON.stringify(arguments[2]);
	};
	redis.hmset.apply(this,arguments);
}
redis.emptyHash = async function(key){
	let keys = await redis.hkeys(key);
	return await new Promise((resolve,reject)=>{
		redis.pipeline(keys.map(item=>{
			return ['hmset',key,item,''];
		})).exec((err,results)=>{
			if(!err){
				resolve(results);
			}else{
				reject('清空'+key+"失败！")
			}
		});
	});
}
module.exports = redis;