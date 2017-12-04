const articleModel = require('../models/articleModel');
exports.create = async (ctx) => {
	let article = ctx.request.body; 
	await ctx.Promise((resolve,reject)=>{
		articleModel.where({}).count((err,count)=>{
			if(err){
				return reject(err);
			};
			article.user_name = ctx.token.user_name;
			article.count = count+1;
			new articleModel(article).save(function(err,collection){
				if(err){
					return reject(err);
				};
				return resolve({
					msg:"ok",
					data:collection
				})
			})
		});
		
	})	
}
exports.getAll = async (ctx) => {
	let {conditions={},limit,filterBy,sortedBy={_id:-1},page,start_time_at,end_time_at} = ctx.request.query;
	if(start_time_at||end_time_at){
		conditions.created_at = {};
		if(start_time_at){
			conditions.created_at.$gte = start_time_at;
		};
		if(end_time_at){
			conditions.created_at.$lt = end_time_at;
		};
	};
	await ctx.Promise((resolve,reject)=>{
		if(!limit||!page){
			articleModel.find(conditions).sort(sortedBy).select(filterBy).exec((err,collections)=>{
				if(err){
					return reject(err);
				};
				return resolve({
					msg:"ok",
					data:collections
				})
			});
		}else{
	        let skipNum = (page-1) * limit;
			articleModel.where(conditions).count((err,count)=>{
				if(err){
					return reject(err);
				};
				articleModel.find(conditions).sort(sortedBy).limit(limit-0).skip(skipNum).select(filterBy).exec((err,collections)=>{
					if(err){
						return reject(err);
					};
					return resolve({
						msg:"ok",
						data:collections,
						count
					})
				});
			})
		}
			
	})	
}
exports.getOne = async (ctx) => {
	await ctx.Promise((resolve,reject)=>{
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
}
exports.updateOne = async (ctx) => {
	await ctx.Promise((resolve,reject)=>{
		articleModel.findByIdAndUpdate(ctx.params.id, ctx.request.body, {new: true}).exec((err,collection)=>{
			if(err){
				return reject(err);
			};
			return resolve({
				msg:"ok",
				data:collection
			})
		});		
	})	
}