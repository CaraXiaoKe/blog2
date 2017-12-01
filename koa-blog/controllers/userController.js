const AdminUserModel = require('../models/adminModel');
const newToken = require('../middlewares/newToken');
const crypto = require('crypto');
exports.getUserInfo = async (ctx) => {
	await ctx.Promise((resolve,reject)=>{
		AdminUserModel.findById(ctx.params.id,{admin_password:0,__v:0,created_at:0,_id:0}).exec(function(err,collection){
			if(err){
				return reject(err);
			};
			return resolve({
				msg:"ok",
				data:collection
			})
		})
	})	
}
exports.register = async (ctx) => {
	let user = ctx.request.body;
	await ctx.Promise((resolve,reject) => {
		if(user.admin_password.length<2){
			return reject({
				errmsg:"用户名过短",
				status:422
			})
		};
		AdminUserModel.findOne({admin_name:user.admin_name}).exec(function(err,collection){
			if(err){
				return reject(err);
			};
			if(collection){
				return reject({
					errmsg:"用户名已存在",
					status:422
				})
			};
			user.admin_password = crypto.createHash('md5').update(user.admin_password).digest('hex');
			new AdminUserModel(user).save(function(err,collection){
				if(err){
					return reject(err);
				};
				return resolve({
					msg:"注册成功!",
					token:newToken({
						user_id:collection._id,
						user_name:collection.admin_name
					}).id,
					data:{
						_id:collection._id,
						admin_email:collection.admin_email,
						admin_mobile:collection.admin_mobile,
						admin_name:collection.admin_name,
						admin_rank:collection.admin_rank,
						admin_type:collection.admin_type,
						admin_rank_des:'超级管理员',
						admin_type_des:'前端开发工程师',
					}
				})

			})
		})
	})
}
exports.login = async (ctx) => {
	let condition = ctx.request.body;
	await ctx.Promise((resolve,reject) => {
		AdminUserModel.findOne({$or:[{admin_name:condition.admin_name},{admin_mobile:condition.admin_name}]},{
			__v:0,
			created_at:0
		}).exec(function(err,collection){
			if(err){
				reject(err);
				return ;
			};
			if(!collection){
				reject({
					errmsg:"用户不存在!!",
					status:422,
				});
				return ;
			};

			let md5 = crypto.createHash('md5').update(condition.admin_password).digest('hex');
			if(collection.admin_password === md5){
				resolve({
					msg:"登陆成功",
					token:newToken({
						user_id:collection._id,
						user_name:collection.admin_name
					}).id,
					data:{
						_id:collection._id,
						admin_email:collection.admin_email,
						admin_mobile:collection.admin_mobile,
						admin_name:collection.admin_name,
						admin_rank:collection.admin_rank,
						admin_type:collection.admin_type,
						admin_rank_des:'超级管理员',
						admin_type_des:'前端开发工程师',
					}
				})
			}else{
				reject({
					errmsg:"密码错误!!",
					status:422
				})
			}		
		})
	})
}