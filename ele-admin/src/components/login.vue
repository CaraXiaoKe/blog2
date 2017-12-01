<template>
    <el-row type="flex" align="middle" justify="center" class="login-box">
        <canvas id="canvas"></canvas>
        <el-form>
            <el-form-item>
                <el-input placeholder="请输入用户名或手机号" v-model="admin_name">
                    <template slot="prepend">账号</template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="请输入密码" v-model="admin_password">
                    <template slot="prepend">密码</template>
                </el-input>
            </el-form-item>
            <el-button @click="logIn">登录</el-button>
        </el-form>
    </el-row>
</template>
<script>
    import StarrySky from '../scripts/StarrySky'
    import Magic3D from '../scripts/Magic3D'
    export default {
        data(){
            return {
                admin_name:'',
                admin_password:''
            }
        },
        mounted(){
            if((~~(Math.random()*10))%2===1){
                StarrySky()
            }else{
                Magic3D.cancel = false;
                Magic3D();
            };
        },
        methods:{
            logIn(){
                this.$axios().post('/api/v1/login',{
                    admin_name:this.admin_name,
                    admin_password:this.admin_password
                }).then(res=>{
                    store.set('user',res.data);
                    store.set('token',res.token);
                    this.$router.push({name:'article'})
                })
            },
            logIn1(){
                this.$axios().post('/api/v1/register',{
                    admin_name:'dpd',
                    amind_mobile:'18910847416',
                    admin_password:'4164110dpd'
                }).then(res=>{
                    store.set('user',res.data);
                    store.set('token',res.token);
                    this.$router.push({name:'article'})
                })
            }
        },
        beforeDestroy(){
            Magic3D.cancel = true;
        }
    }
</script>
<style lang="scss">
    .baniframe {
        position:absolute;
        width:100%;
        height:100%;
    }
    #canvas {
        position:absolute;
        width:100%;
        height:100%;
    }
    .login-box {
        height:100%;
        background:#000;
        .el-input__inner {
            width:300px;
            background:transparent;
            color:#fff;
        }
        .el-input__inner:focus {
            border:1px solid #fff;
        }
        .el-input-group__prepend,.el-button {
            background:transparent;
            color:#fff;
        }
        .el-form {
            position:relative;
            z-index:1000;
        }
    }
</style>
