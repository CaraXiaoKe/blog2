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
  	filename = toRandomName(file.originalname);
    cb(null,filename);  
  }  
})  
//加载配置  
var upload = multer({ storage });
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
	await ctx.Promise((resolve,reject)=>{
    	resolve({  
    		msg:"上传成功",
    		key:filename,
    		url:settings.ROOTPATH + filename 
		})      
	})   
};

module.exports = [upload.single('file'),putFile];