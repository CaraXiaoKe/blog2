const articleModel = require('../models/articleModel');
const redis = require('../models/redis');
const moment = require('moment');
function pageGroupList(pageInfo,isMobile){ // 获取分页页码
	if(isMobile){
		return [];
	};
    var len = pageInfo.page , temp = [], list = [], count = Math.floor(pageInfo.pagegroup / 2) ,center = pageInfo.current;
    if( len <= pageInfo.pagegroup ){
        while(len--){ temp.push({text:pageInfo.page-len,val:pageInfo.page-len});};
        return temp;
    }
    while(len--){ temp.push(pageInfo.page - len);};
    var idx = temp.indexOf(center);                
    (idx < count) && ( center = center + count - idx); 
    (pageInfo.current > pageInfo.page - count) && ( center = pageInfo.page - count);
    temp = temp.splice(center - count -1, pageInfo.pagegroup);                
    do {
        var t = temp.shift();
        list.push({
            text: t,
            val: t
        });
    }while(temp.length);                
    if( pageInfo.page > pageInfo.pagegroup ){
        (pageInfo.current > count + 1) && list.unshift({ text:'...',val: list[0].val - 1 });
        (pageInfo.current < pageInfo.page - count) && list.push({ text:'...',val: list[list.length - 1].val + 1 });
    }
    return list;
}
exports.getAll = async ( ctx ) => {
	let {conditions={},limit=8,sortedBy={_id:-1},page=1} = ctx.request.query;
	let res = await new Promise((resolve,reject)=>{
	    let skipNum = (page-1) * limit;
		articleModel.where(conditions).count((err,count)=>{
			if(err){
				return reject(err);
			};
			articleModel.find(conditions).sort(sortedBy).limit(limit-0).skip(skipNum).select("des title views reviews created cate sub_cate user_name image created_at pinyin_title").exec((err,collections)=>{
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
	let pagination = {
		limit,
		count:res.count,
		current:page,
		pagegroup:5
	};
	pagination.page = Math.ceil(pagination.count / pagination.limit);
  	await ctx.render('index', {
    	title:"文章列表",
    	posts:res.data,
    	count:res.count,
    	current:page,
    	list:pageGroupList(pagination,ctx.state.isMobile),
    	page:pagination.page
  	})
}
exports.getPage = async ( ctx ) => {
	let page = isNaN(ctx.params.id) ? 1:(ctx.params.id-0);
	let {conditions={},limit=8,sortedBy={_id:-1}} = ctx.request.query;
	let res = await new Promise((resolve,reject)=>{
	    let skipNum = (page-1) * limit;
		articleModel.where(conditions).count((err,count)=>{
			if(err){
				return reject(err);
			};
			articleModel.find(conditions).sort(sortedBy).limit(limit-0).skip(skipNum).select("des title views reviews created cate sub_cate user_name image created_at pinyin_title").exec((err,collections)=>{
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
	let pagination = {
		limit,
		count:res.count,
		current:page,
		pagegroup:5
	};
	pagination.page = Math.ceil(pagination.count / pagination.limit);
  	await ctx.render('index', {
    	title:"文章列表",
    	posts:res.data,
    	count:res.count,
    	current:page,
    	list:pageGroupList(pagination,ctx.state.isMobile),
    	page:pagination.page
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
		articleModel.find(conditions).sort(sortedBy).select("des title views reviews created cate sub_cate user_name image created_at pinyin_title").exec((err,collections)=>{
			if(err){
				return reject(err);
			};
			return resolve(collections)
		});	
	});
	let pagination = {
		limit,
		count:res.length,
		current:1,
		pagegroup:5
	};
	pagination.page = Math.ceil(pagination.count / pagination.limit);
  	await ctx.render('index', {
    	title:"文章列表",
    	posts:res,
    	count:res.length,
    	limit,
    	current:1,
    	date:dateStart,
    	list:pageGroupList(pagination,ctx.state.isMobile),
    	page:pagination.page
  	})
}
exports.getCate = async ( ctx ) => {
	let page = isNaN(ctx.params.index) ? 1:(ctx.params.index-0);
	let {conditions={},limit=8,sortedBy={_id:-1}} = ctx.request.query;
	conditions.cate = ctx.params.id;
	let res = await new Promise((resolve,reject)=>{
	    let skipNum = (page-1) * limit;
		articleModel.where(conditions).count((err,count)=>{
			if(err){
				return reject(err);
			};
			articleModel.find(conditions).sort(sortedBy).limit(limit-0).skip(skipNum).select("des title views reviews created cate sub_cate user_name image created_at pinyin_title").exec((err,collections)=>{
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
	let pagination = {
		limit,
		count:res.count,
		current:page,
		pagegroup:5
	};
	pagination.page = Math.ceil(pagination.count / pagination.limit);
  	await ctx.render('index', {
    	title:"文章列表",
    	posts:res.data,
    	count:res.count,
    	current:page,
    	list:pageGroupList(pagination,ctx.state.isMobile),
    	page:pagination.page,
    	cate:conditions.cate
  	})
}
exports.getSub = async ( ctx ) => {
	let page = isNaN(ctx.params.index) ? 1:(ctx.params.index-0);
	let {conditions={},limit=8,sortedBy={_id:-1}} = ctx.request.query;
	conditions.sub_cate = ctx.params.id;
	let res = await new Promise((resolve,reject)=>{
	    let skipNum = (page-1) * limit;
		articleModel.where(conditions).count((err,count)=>{
			if(err){
				return reject(err);
			};
			articleModel.find(conditions).sort(sortedBy).limit(limit-0).skip(skipNum).select("des title views reviews created cate sub_cate user_name image created_at pinyin_title").exec((err,collections)=>{
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
	let pagination = {
		limit,
		count:res.count,
		current:page,
		pagegroup:5
	};
	pagination.page = Math.ceil(pagination.count / pagination.limit);
  	await ctx.render('index', {
    	title:"文章列表",
    	posts:res.data,
    	count:res.count,
    	current:pagination.count===0 ? 0:page,
    	list:pagination.count===0 ? []:pageGroupList(pagination,ctx.state.isMobile),
    	page:pagination.page,
    	sub:conditions.sub_cate
  	})
}
exports.getOne = async (ctx) => {
	let article = await redis._hgetall('articles',ctx.params.id);
	if(!ctx.cookies.get('isVisited')){
		await new Promise((resolve,reject)=>{
			articleModel.findOneAndUpdate({pinyin_title:ctx.params.id},{ $inc: { views: 1 }},{new: true}).exec((err,result)=>{
				if(err){
					return reject(err);
				};
				// ctx.cookies.set('isVisited', true, {
				// 	path:'/article/'+ctx.params.id,
				// 	maxAge:24*60*60*1000
				// });
				ctx.cookies.set('isVisited', true, {
					path:'/article/'+ctx.params.id+'.html',
					maxAge:24*60*60*1000
				});
				if(!!article){
					article.views++;
					redis._hmset('articles', ctx.params.id, article);
					redis._hmset('articles', result._id, article);
				};
				resolve();
			});		
		});

	};
	if(!article){
		article = await new Promise((resolve,reject)=>{
			articleModel.findOne({pinyin_title:ctx.params.id}).exec((err,collection)=>{
				if(err){
					return reject(err);
				};
				redis._hmset('articles', ctx.params.id, collection);
				redis._hmset('articles', collection._id, collection);
				resolve(collection)
			});		
		});
	};
	await ctx.render('article', {
    	post:article
  	})	
}
exports.getOneById = async (ctx) => {
	let article = await redis._hgetall('articles',ctx.params.id);
	if(!ctx.cookies.get('isVisited')){
		await new Promise((resolve,reject)=>{
			articleModel.findByIdAndUpdate(ctx.params.id,{ $inc: { views: 1 }},{new: true}).exec((err,result)=>{
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
					redis._hmset('articles', result.pinyin_title, article);
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
				redis._hmset('articles', collection.pinyin_title, collection);
				resolve(collection)
			});		
		});
	};
	await ctx.render('article', {
    	post:article
  	})	
}