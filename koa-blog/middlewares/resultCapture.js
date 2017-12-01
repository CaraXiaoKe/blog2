module.exports =  (ctx, next) => {
	ctx.Promise = (callback,custom) => {
		if(!!custom){
			return new Promise(callback);
		};
		return new Promise(callback).then(res => {
			ctx.body = res;
		}).catch(err => {
			if(err.stack){
				ctx.status = 500;
				console.log(err.stack);
				ctx.body = {
					stack:err.stack,
					errmsg:"服务器异常"
				};
				return;
			};
			ctx.status = 422;
			ctx.body = err;
		})
	}
	return next();
}