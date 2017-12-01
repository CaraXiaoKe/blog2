function session(){
	return async (ctx, next) => {
		return next();
	}
}

module.exports = session;