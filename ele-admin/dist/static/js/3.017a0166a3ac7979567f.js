webpackJsonp([3],{"8SYN":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-row",{attrs:{type:"flex",align:"middle",justify:"center"}},[a("el-form",[a("el-form-item",[a("el-input",{attrs:{placeholder:"请输入用户名"},model:{value:e.form.admin_name,callback:function(t){e.$set(e.form,"admin_name",t)},expression:"form.admin_name"}},[a("template",{slot:"prepend"},[e._v("用户名")])],2)],1),e._v(" "),a("el-form-item",[a("el-input",{attrs:{placeholder:"请输入用户名"},model:{value:e.form.admin_mobile,callback:function(t){e.$set(e.form,"admin_mobile",t)},expression:"form.admin_mobile"}},[a("template",{slot:"prepend"},[e._v("手机号")])],2)],1),e._v(" "),a("el-form-item",[a("el-input",{attrs:{placeholder:"请输入密码"},model:{value:e.form.admin_password,callback:function(t){e.$set(e.form,"admin_password",t)},expression:"form.admin_password"}},[a("template",{slot:"prepend"},[e._v("密码")])],2)],1),e._v(" "),a("el-button",{on:{click:e.register}},[e._v("注册")])],1)],1)},r=[],o={render:n,staticRenderFns:r};t.a=o},dwBY:function(e,t,a){"use strict";t.a={data:function(){return{form:{admin_name:"",admin_mobile:"",admin_password:""}}},methods:{register:function(){this.$axios({L:!0,M:!0}).post("/api/v1/register",this.form)}}}},q3Wa:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("dwBY"),r=a("8SYN"),o=a("vSla"),l=o(n.a,r.a,!1,null,null,null);t.default=l.exports}});
//# sourceMappingURL=3.017a0166a3ac7979567f.js.map