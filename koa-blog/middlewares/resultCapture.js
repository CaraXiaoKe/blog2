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
				// if(err.code==11000){
				// 	return ctx.body = {
				// 		stack:err.stack,
				// 		errmsg:err.message
				// 	};
				// }
				ctx.body = {
					stack:err.stack,
					errmsg:err.message
				};
				return;
			};
			ctx.status = 422;
			ctx.body = err;
		})
	}
	return next();
}