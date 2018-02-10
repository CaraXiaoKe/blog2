var settings = require('../config/setting');
var qiniu = require("qiniu");
var fs = require('fs');

const multer = require('koa-multer');//加载koa-multer模块

//文件上传  
//配置  
const storage = multer.diskStorage({  
  //文件保存路径  
  destination: function (req, file, cb) {  
    cb(null, 'public/uploads/')  
  },  
  //修改文件名称  
  filename: function (req, file, cb) {   
    cb(null,toRandomName(file.originalname));  
  }  
})  
//加载配置  
var upload = multer({ storage });


qiniu.conf.ACCESS_KEY = settings.ACCESS_KEY;
qiniu.conf.SECRET_KEY = settings.SECRET_KEY;

var bucket = settings.BUCKET;

function uptoken(bucket, key) {
	var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
	return putPolicy.token();
}
function toRandomName(filename){
    var arr = filename.split('.');
    var suffix = '.'+arr[arr.length-1];
    var randomStr= +new Date();
    var str = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for(var n=0;n<5;n++){
        var num = Math.floor(Math.random()*36);
        randomStr += str[num];
    };
    return randomStr+suffix;
}
var putFile = async (ctx) => {
	var filePath = ctx.req.file.path;//获取文件本地路径
	var filename = ctx.req.file.filename;//获取文件原名
	var token = uptoken(bucket, filename);//转化token
	var extra = new qiniu.io.PutExtra();
	await ctx.Promise((resolve,reject)=>{
		qiniu.io.putFile(token, filename, filePath, extra, function(err, ret) {
	        fs.unlinkSync(filePath);
	      	if(!err) {
	        	resolve({  
	        		msg:"上传成功",
	        		hash:ret.hash,
	        		key:ret.key,
	        		url:settings.ROOTPATH + ret.key 
				})      
	     	} else {
	 			reject({
	 				msg:"上传失败",
        			errmsg:err  
	 			})
	      	}
		});
	})   
};

module.exports = [upload.single('file'),putFile];