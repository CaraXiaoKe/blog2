<template>
    <div>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="title"
            label="标题">
          </el-table-column>
          <el-table-column
            prop="user_name"
            label="作者">
          </el-table-column>
          <el-table-column
            prop="cate"
            label="分类">
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="发表日期">
          </el-table-column>
          <el-table-column
            prop="reviews"
            label="评论">
          </el-table-column>
          <el-table-column
            prop="views"
            label="阅读量">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <router-link :to="{name:'article/edit',params:{id:scope.row._id}}" target="_blank">
                    <el-button type="text" size="small">编辑</el-button>
                </router-link>
              </template>
            </el-table-column>
        </el-table>
        <br/>
        <div class="text-center">
            <el-pagination
                @current-change="getData"
                :current-page.sync="query.page"
                layout="prev, pager, next"
                :page-size="query.limit"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                tableData: [],
                total:0,
                query:{
                    limit:10,
                    page:1
                }
            }
        },
        created(){
            this.getData();
        },
        methods:{
            getData(){
                this.$axios().get('/api/v1/articles',{params:this.query}).then(res=>{
                    this.tableData = res.data;
                    this.total = res.count;
                })
            }
        }
    }
</script>
