var mongoose = require('./db')
var adminUserSchema = mongoose.Schema({
    admin_name: {
    	type:String,
    	trim:true,
    	unique: true,
    	require: true
    },
    admin_mobile: {
    	type:String,
    	trim:true,
        unique: true,
        require: true
    },
    admin_email: {
    	type:String,
    	trim:true
    },
    admin_password:{
    	type:String,
    	trim:true,
    	require: true
    },
    created_at:{
    	type:Date,
    	default:Date.now
    },
    admin_rank:{
    	type:Number,
    	default:0
    },
    admin_type:{
    	type:Number,
    	default:0
    }
});
const AdminUserModel = mongoose.model('Admin_user', adminUserSchema);

module.exports = AdminUserModel;