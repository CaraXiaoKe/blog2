const redis = require('../models/redis');
const {LOGIN_EXPIRES} = require('../config/setting');
function newToken(op={}){
	let expires = (new Date()).getTime() + LOGIN_EXPIRES*1000;
	let id = expires + Math.random().toString(28).slice(2);
	let token = {
		id,
		expires,
		user_id:op.user_id,
		user_name:op.user_name
	};
	redis._set(id, token, 'EX', LOGIN_EXPIRES);//第三四个参数设置过期时间 单位秒
	return token;
}
module.exports = newToken;