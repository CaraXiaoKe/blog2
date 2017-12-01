const mongoose = require('./db')
const moment = require('moment')
const articleSchema = mongoose.Schema({
    title:{
    	type:String,
    	require:true
    },
    des:{
    	type:String,
    	require:true
    },
    image:{
      type:String
    },
    cate:{
    	type:Number,
    	require:true
    },
    sub_cate:{
    	type:Number,
    	require:true
    },
    tags:[{
    	type:String
    }],
    content:{
    	type:String,
    	require:true
    },
   	views:{
   		type:Number,
   		default:0
   	},
   	reviews:{
   		type:Number,
   		default:0
   	},
    count:{
      type:Number
    },
    user_name:{
      type:String,
      require:true
    },
    created_at:{
      type:String,
      default:moment().format('YYYY-MM-DD HH:mm')
    }
});
const ArticleModel = mongoose.model('Article', articleSchema);
module.exports = ArticleModel;