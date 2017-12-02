<template>
    <el-row type="flex" align="middle" justify="center">
        <el-form>
            <el-form-item>
                <el-input placeholder="请输入用户名" v-model="form.admin_name">
                    <template slot="prepend">用户名</template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="请输入用户名" v-model="form.admin_mobile">
                    <template slot="prepend">手机号</template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="请输入密码" v-model="form.admin_password">
                    <template slot="prepend">密码</template>
                </el-input>
            </el-form-item>
            <el-button @click="register">注册</el-button>
        </el-form>
    </el-row>
</template>
<script>
    export default {
        data(){
            return {
                form:{
                    admin_name:'',
                    admin_mobile:'',
                    admin_password:''
                }
            }
        },
        methods:{
            register(){
                this.$axios({L:true,M:true}).post('/api/v1/register',this.form);
            }
        }
    }
</script>
