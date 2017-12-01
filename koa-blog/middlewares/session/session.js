const redis = require('./../models/redis');
function isLogin(){
	let session = {};
	let maxAge = 60*60*1000;
	let expires = (new Date()).getTime() + maxAge;
	session.id = expires + Math.random().toString(28).slice(2);
	session.cookie = {
        path: '/',       // cookie所在的路径
        maxAge, // cookie有效时长
        expires,  // cookie失效时间
        httpOnly:true,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
	};
	redis.set(session.id, JSON.stringify(session));
	ctx.cookies.set('session_id',session.id,session.cookie);
	ctx.session = session;
}
module.exports = isLogin;