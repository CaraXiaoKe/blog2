<template>
    <div>
        <a target="_blank" href="https://www.kancloud.cn/wangfupeng/wangeditor3/335772">https://www.kancloud.cn/wangfupeng/wangeditor3/335772</a>
        <div id="editor">
        </div>
    </div>
</template>
<script>
    import E from 'wangeditor'
    export default {
        props:{
            value:{
                type:String
            }
        },
        mounted(){
            let editor = new E('#editor');
            editor.customConfig.onchange = (html) => {
                clearTimeout(this.timeout);
                this.timeout = null;
                this.timeout = setTimeout(()=>{
                    this.$emit('input',html);
                },500);
            };
            editor.customConfig.menus = [
                'head',  // 标题
                'bold',  // 粗体
                'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'foreColor',  // 文字颜色
                'backColor',  // 背景颜色
                'link',  // 插入链接
                'list',  // 列表
                'justify',  // 对齐方式
                'quote',  // 引用
                'emoticon',  // 表情
                'image',  // 插入图片
                'table',  // 表格
                'video',  // 插入视频
                'code',  // 插入代码
            ];
            editor.customConfig.uploadImgServer = '/api/v1/upload';
            editor.customConfig.pasteFilterStyle = false;
            editor.customConfig.uploadFileName = "file";
            editor.customConfig.uploadImgHeaders = {
                'Authorization': store.get('token')
            };
            editor.customConfig.customAlert = (info) => {
                alert('自定义提示：')
            };
            editor.customConfig.uploadImgHooks = {
                customInsert: function (insertImg, result, editor) {
                    insertImg(result.url)
                }
            };
            editor.create();
            this.editor = editor;
        },
        methods: {
            insertHTML(html){
                this.editor.txt.html(html)
            }
        }
    }
</script>
<style lang="scss">
    .w-e-toolbar {
        // display:block;
        background:#545c64 !important;
        .w-e-menu {
            // float:left;
            // padding-top:0;
            // padding-bottom:0;
            i {
                color:#fff;
            }
            &:hover i {
                color:rgb(255, 208, 75);
            }
        }

        &::after {
            content:"";
            display:table;
            clear:both;
            height:0;
        }
    }
    .w-e-text-container {
        height:600px !important;
    }
</style>
