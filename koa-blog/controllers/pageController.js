const articleModel = require('../models/articleModel');
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
    	count:res.count
  	})
}
exports.getOne = async (ctx) => {
	let res = await new Promise((resolve,reject)=>{
		articleModel.findById(ctx.params.id).exec((err,collection)=>{
			if(err){
				return reject(err);
			};
			return resolve({
				msg:"ok",
				data:collection
			})
		});		
	})
	await ctx.render('article', {
    	post:res.data
  	})	
}