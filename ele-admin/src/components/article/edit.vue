<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="文章名字">
                <el-col :lg="12" :sm="18">
                    <el-input v-model="form.title"/>
                </el-col>
            </el-form-item>
            <el-form-item label="文章简述">
                <el-col :lg="12" :sm="18">
                    <el-input type="textarea" v-model="form.des"/>
                </el-col>
            </el-form-item>
            <el-form-item label="文章分类">
                <el-select v-model="form.cate" placeholder="请选择分类">
                    <el-option
                        v-for="(item,key) in cates"
                        :key="key-0"
                        :label="item.name"
                        :value="key-0">
                    </el-option>
                </el-select>
                <el-select v-model="form.sub_cate" placeholder="请选择二级分类">
                    <el-option
                        v-for="(item,key) in cate_sub"
                        :key="key-0"
                        :label="item"
                        :value="key-0">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标签">
                <el-tag
                  class="mr10"
                  :key="tag"
                  v-for="tag in form.tags"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)">
                  {{tag}}
                </el-tag>
                <el-input class="input-new-tag" v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else
                    size="small"
                    @click="showInput">+ New Tag
                </el-button>
            </el-form-item>
            <el-form-item label="文章内容">
                <editor-component ref="editor" v-model="form.content"></editor-component>
            </el-form-item>
            <el-form-item label="封面图">
                <el-upload
                    class="avatar-uploader"
                    :show-file-list="false"
                    action="/api/v1/upload"
                    :headers="{'Authorization':token}"
                    :on-success="handleImageSuccess">
                        <img v-if="form.image" :src="form.image" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="submit">创建文章</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import editorComponent from '../partials/editor.vue'
    export default {
        components: {
            editorComponent
        },
        data(){
            return {
                inputValue:"",
                inputVisible:false,
                content:'',
                editorOption: {
                    modules: {
                        toolbar: '#toolbar'
                    }
                },
                form:{
                    title:"",
                    cate:"",
                    des:"",
                    sub_cate:"",
                    tags:[],
                    content:"",
                    image:''
                },
                cates:{},
                cate_sub:{},
                token:store.get('token'),
                isInt:false

            }
        },
        watch:{
            "form.cate"(cate){
                if(this.isInt) this.form.sub_cate = "";//解决初始化问题
                this.cate_sub = this.cates[cate].sub;
            }
        },
        mounted(){
            this.$axios().get('/api/v1/dict/cate').then(res=>{
                this.cates = Object.freeze(res);
            });
            this._id = this.$route.params.id;
            this.$axios().get('/api/v1/articles/'+this._id).then(res=>{
                this.form = res.data;
                this.$refs.editor.insertHTML(res.data.content);
                this.$nextTick(()=>{
                    this.isInt = true;
                });
            });
        },
        methods: {
            handleClose(tag){
               this.form.tags.splice(this.form.tags.indexOf(tag), 1);
            },
            handleInputConfirm(){
                if(!!this.inputValue){
                     this.form.tags.push(this.inputValue);
                };
                this.inputVisible = false;
                this.inputValue = "";
            },
            showInput(){
                this.inputVisible = true;
                this.$nextTick(()=>{
                    this.$refs.saveTagInput.focus();
                })
            },
            handleImageSuccess(res,file){
                this.form.image = res.url;
            },
            submit(){
                this.$axios({L:true}).post('/api/v1/articles/'+this._id,this.form).then(res=>{
                    // this.$router.push('/')
                })
            }
        },
    }
</script>
<style lang="scss">
    .input-new-tag {
        width:75px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
