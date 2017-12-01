<template>
    <el-container>
        <el-aside class="aside-full" width="auto">
            <el-menu
                menu-trigger="click"
                class="nav-bar"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                :default-active="active"
                :collapse="isCollapse"
                router>
                <el-menu-item index="/">
                    <i class="el-icon-tickets"></i>
                    <span slot="title">文章列表</span>
                </el-menu-item>
                <el-menu-item index="/article/create">
                    <i class="el-icon-plus"></i>
                    <span slot="title">文章创建</span>
                </el-menu-item>
            </el-menu>

        </el-aside>
        <el-container>
            <el-header class="top-header">
                <a @click="isCollapse=!isCollapse" class="collapse-icon" href="javascript:;">
                    <i class="el-icon-menu"></i>
                </a>
                {{title}}
            </el-header>
            <el-main>
                <slot></slot>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    export default {
        data(){
            return {
                isCollapse:false,
                title:"文章列表"
            }
        },
        computed:{
            active(){
                if(this.$route.path.match(/^\/article\/create/)){
                    this.title = "文章创建";
                    return "/article/create";
                };
                if(this.$route.path.match(/^\//)){
                    this.title = "文章列表";
                    return "/";
                };
                return this.$route.path;
            }
        }
    }
</script>
<style lang="scss">
    .aside-full {
        padding-top:60px;
        min-height:100vh;
        background-color: rgb(84, 92, 100);
        overflow:visible;
        border-right:1px solid rgba(0,0,0,0.1);
    }
    .nav-bar {
        &:not(.el-menu--collapse) {
            width:150px;
            overflow:hidden;
        }
        &.el-menu {
            border-right:0;
        }
    }
    .top-header {
        position:relative;
        line-height:60px;
        background:#545c64;
        color:#fff;
        text-align:center;
        .collapse-icon {
            position:absolute;
            left:0;
            top:0;
            padding-left:15px;
            padding-right:15px;
            width:60px;
            height:100%;
            display:block;
        }
        .el-icon-menu {
            font-size:30px;
            color:#fff;
            cursor:pointer;
        }
    }
</style>
