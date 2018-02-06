const articleModel = require('../models/articleModel');
const redis = require('../models/redis');
const moment = require('moment');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
exports.create = async (ctx) => {
	let article = ctx.request.body; 
	await ctx.Promise((resolve,reject)=>{
		articleModel.where({}).count((err,count)=>{
			if(err){
				return reject(err);
			};
			article.user_name = ctx.token.user_name;
			article.count = count+1;
			article.index_title = "dd";
			article.created_at = moment().format('YYYY-MM-DD HH:mm');
			new articleModel(article).save(function(err,collection){
				if(err){
					return reject(err);
				};
				redis._hmset('articles', collection._id, collection);
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
			articleModel.find(conditions).sort(sortedBy).select("des title views reviews created cate sub_cate user_name image created_at").exec((err,collections)=>{
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
				articleModel.find(conditions).sort(sortedBy).limit(limit-0).skip(skipNum).select("des title views reviews created cate sub_cate user_name image created_at").exec((err,collections)=>{
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
	articleModel.findOne({count:1}).exec((err,collection)=>{
			console.log(collection)
		});
	let article = await redis._hgetall('articles',ctx.params.id);
	await ctx.Promise((resolve,reject)=>{
		if(article){
			return resolve({
				msg:"ok",
				data:article
			})
		};
		
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
			// var str = fs.readFileSync(path.resolve(__dirname ,'../views/article.ejs'), 'utf8');
			// var ret = ejs.render(str, {
			//   	post: collection
			// });
			// fs.writeFileSync(path.resolve(__dirname ,'../posts/'+collection._id+'.html'), ret, {
			//     flag: 'w'
			// }, function(err){
			//     if(err) throw err;
			// });
			redis._hmset('articles', ctx.params.id, collection);
			return resolve({
				msg:"ok",
				data:collection
			})
		});		
	})	
}