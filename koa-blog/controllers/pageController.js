const articleModel = require('../models/articleModel');
const redis = require('../models/redis');
const moment = require('moment');
exports.getAll = async ( ctx ) => {
	let {conditions={},limit=8,sortedBy={_id:-1},page=1} = ctx.request.query;
	let res = await new Promise((resolve,reject)=>{
	    let skipNum = (page-1) * limit;
		articleModel.where(conditions).count((err,count)=>{
			if(err){
				return reject(err);
			};
			articleModel.find(conditions).sort(sortedBy).limit(limit-0).skip(skipNum).select("des title views reviews created cate sub_cate user_name image created_at").exec((err,collections)=>{
				if(err){
					return reject(err);
				};
				return resolve({
					data:collections,
					count
				})
			});
		})	
	});
  	await ctx.render('index', {
    	title:"文章列表",
    	posts:res.data,
    	count:res.count,
    	current:page
  	})
}
exports.getPage = async ( ctx ) => {
	let page = ctx.params.id;
	let {conditions={},limit=8,sortedBy={_id:-1}} = ctx.request.query;
	let res = await new Promise((resolve,reject)=>{
	    let skipNum = (page-1) * limit;
		articleModel.where(conditions).count((err,count)=>{
			if(err){
				return reject(err);
			};
			articleModel.find(conditions).sort(sortedBy).limit(limit-0).skip(skipNum).select("des title views reviews created cate sub_cate user_name image created_at").exec((err,collections)=>{
				if(err){
					return reject(err);
				};
				return resolve({
					data:collections,
					count
				})
			});
		})	
	});
  	await ctx.render('index', {
    	title:"文章列表",
    	posts:res.data,
    	count:res.count,
    	current:page
  	})
}
exports.getDate = async ( ctx ) => {
	let dateStart = ctx.params.id;
	let dateEnd = moment(dateStart).add(1,'day').format('YYYY-MM-DD');
	let limit = 20;
	let {conditions={},sortedBy={_id:-1}} = ctx.request.query;
	conditions.created_at = {
		$gte: dateStart, 
		$lt: dateEnd
	};
	let res = await new Promise((resolve,reject)=>{
		articleModel.find(conditions).sort(sortedBy).select("des title views reviews created cate sub_cate user_name image created_at").exec((err,collections)=>{
			if(err){
				return reject(err);
			};
			return resolve(collections)
		});	
	});
  	await ctx.render('index', {
    	title:"文章列表",
    	posts:res,
    	count:res.length,
    	limit:limit,
    	current:1,
    	date:dateStart
  	})
}
exports.getOne = async (ctx) => {
	let article = await redis._hgetall('articles',ctx.params.id);
	if(!ctx.cookies.get('isVisited')){
		await new Promise((resolve,reject)=>{
			articleModel.where({_id:ctx.params.id}).update({ $inc: { views: 1 }}).exec((err,result)=>{
				if(err){
					return reject(err);
				};
				ctx.cookies.set('isVisited', true, {
					path:'/article/'+ctx.params.id,
					maxAge:24*60*60*1000
				});
				if(!!article){
					article.views++;
					redis._hmset('articles', ctx.params.id, article);
				};
				resolve();
			});		
		});

	};
	if(!article){
		article = await new Promise((resolve,reject)=>{
			articleModel.findById(ctx.params.id).exec((err,collection)=>{
				if(err){
					return reject(err);
				};
				redis._hmset('articles', ctx.params.id, collection);
				resolve(collection)
			});		
		});
	};
	await ctx.render('article', {
    	post:article
  	})	
}