function generate(op={}){
	let session = {};
	let maxAge = op.maxAge||60*60*1000;
	let expires = (new Date()).getTime() + maxAge;
	session.id = expires + Math.random().toString(28).slice(2);
	session.cookie = {
        maxAge, // cookie有效时长
        expires,  // cookie失效时间
	};
	return session;
}

module.exports = generate;