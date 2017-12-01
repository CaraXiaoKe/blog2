<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="文章名字" prop="title">
                <el-col :lg="12" :sm="18">
                    <el-input v-model="form.title"/>
                </el-col>
            </el-form-item>
            <el-form-item label="文章简述" prop="des">
                <el-col :lg="12" :sm="18">
                    <el-input type="textarea" v-model="form.des"/>
                </el-col>
            </el-form-item>
            <div class="inline cf">
                <el-form-item label="文章分类" prop="cate">
                    <el-select v-model="form.cate" placeholder="请选择分类">
                        <el-option
                            v-for="(item,key) in cates"
                            :key="key"
                            :label="item.name"
                            :value="key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="sub_cate">
                    <el-select v-model="form.sub_cate" placeholder="请选择二级分类">
                        <el-option
                            v-for="(item,key) in cate_subs"
                            :key="key"
                            :label="item"
                            :value="key">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <el-form-item label="标签" prop="tags">
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
            <el-form-item label="文章内容" prop="content">
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
            <el-button type="primary" @click="submit">创建文章</el-button>
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
                cate_subs:{},
                token:store.get('token'),
                rules:{
                    title:[
                        {required:true,trigger:'blur',message:"请输入标题"}
                    ],
                    cate:[
                        {required:true,trigger:'change',message:"请选择分类"}
                    ],
                    des:[
                        {required:true,trigger:'blur',message:"描述不能为空"}
                    ],
                    sub_cate:[
                        {required:true,trigger:'change',message:"请选择二级分类"}
                    ],
                    tags:[
                        {type:"array",required:true,trigger:'blur',message:"请填写至少一个标签"}
                    ],
                    content:[
                        {required:true,message:"请填写文章内容"}
                    ]
                }

            }
        },
        watch:{
            "form.cate"(cate){
                this.form.sub_cate = "";
                this.cate_subs = this.cates[cate].sub;
            }
        },
        mounted(){
            this.$axios().get('/api/v1/dict/cate').then(res=>{
                this.cates = Object.freeze(res);
            });
            this.$refs.editor.insertHTML('<h1>ddd</h1>')
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
                this.$refs.form.validate((valid)=>{
                    if(valid){
                        this.$axios({L:true}).post('/api/v1/articles',this.form).then(res=>{
                            this.$router.push('/')
                        })
                    }
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
    .inline {
        .el-form-item {
            float:left;
        }
        .el-form-item:nth-child(2){
            margin-left:-70px;
        }
    }
</style>
