const redis = require('../models/redis');
const newToken = require('./newToken')
function can(type){
	return async (ctx, next) => {
		let authorization = ctx.headers.authorization;
		if(!authorization){
			ctx.status = 401;
			ctx.body = {
				status:401,
				errmsg:"访问需要Authorization",
				msg:"验证失败，请重新登录"
			}
			return;
		};
		let token = await redis._get(authorization);
		if(!token){
			ctx.status = 401;
			ctx.body = {
				status:401,
				errmsg:"Authorization过期",
				msg:"账号过期，请重新登录"
			};
			return;
		};
		if(token.expires < new Date().getTime()){
			redis.del(authorization);
			ctx.status = 401;
			ctx.body = {
				status:401,
				errmsg:"Authorization过期",
				msg:"登录过期，请重新登录"
			}
			return;
		};
		if(type === 'update'){
			redis.del(authorization);
			ctx.token = newToken({
				user_id:token.user_id,
				user_name:token.user_name
			});
		}else{
			ctx.token = token;
		}
		await next();	
	}
}
module.exports = can;