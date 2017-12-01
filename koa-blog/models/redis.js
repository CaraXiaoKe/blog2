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
module.exports = redis;