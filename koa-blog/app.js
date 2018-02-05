const Koa = require('koa');
const app = new Koa();

const sass = require('node-sass');
const path = require('path');
const fs = require('fs'); 
const helmet = require('koa-helmet');

const setting = require('./config/setting.js');
const router = require('./routers/index.js');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const views = require('koa-views');
const PORT = process.env.PORT||setting.PORT||3000;
const {cate} = require('./config/dict');

const ResponseHandle = require('./middlewares/resultCapture');

//服务器异常 捕获
app.use(async(ctx,next)=>{
	ctx.state.isMobile = /(iPhone|iPod|Android|ios)/i.test(ctx.headers["user-agent"]);
	try {
		await next()
		if (ctx.status === 404) 
			ctx.redirect('/404');
  	} catch (err) {
		ctx.status = err.status || 500;
		ctx.body = err.body || err.message;
		console.error(ctx.url);
		console.error(err.toString());
		console.error(err.stack+"\n");
  	}
})
app.use(helmet());
app.use(static(
  	path.join( __dirname,  './public')
))
app.use(static(
  	path.join( __dirname,  './post')
))
app.use(static(
  	path.join( __dirname,  '/')
))
app.use(views(path.join(__dirname, './views'), {
  	extension: 'ejs',
  	options:{
  		config_cate:cate,
  		__URL:process.env.NODE_ENV === 'development' ? 'http://localhost:3000':'http://92node.com' 
  	}
}))

app.use(bodyParser());
if(process.env.NODE_ENV === 'development'){
	app.use(( ctx, next ) => {
		if(ctx.request.url === '/'){
			console.log("正在编译scss文件...");
			const result = sass.renderSync({
			  	file: path.resolve(__dirname,'./public/styles/layout.scss'),
			  	outputStyle: 'compressed',
			});
			fs.writeFileSync(path.resolve(__dirname,'./public/styles/layout.css'),result.css);
			console.log("编译scss完成");
		}
		return next();	
	});
};

//数据库查询结果及错误统一处理
app.use(ResponseHandle);

//页面路由
app.use(require('./routers/index.js').routes());
app.use(require('./routers/v1.js').routes());
app.listen(PORT,()=>{
	console.log(`listening on port ${PORT}`);
});
