<template>
    <div>
      <el-row class="contain row-bg" type="flex"  justify="center">
        <el-col>
          <div class="store-inner">
            <p class='break'>商家内邀</p>
            <ul class='touBoxs'>
              <li class='touList'><span class='touLabel'>商家手机号：</span><el-input v-model="phone"  class='danInps' size='small' ></el-input>
                <el-button  type='primary' size='small' >获取地址</el-button>
              </li>
              <li class='touList'><span class='touLabel'>链接地址：</span>http://www.bozhiyingxiao.com</li>
            </ul>
            <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%"   header-row-class-name="table-header" border >
              <el-table-column prop="num" label="手机号"  header-align="center">
              </el-table-column>
              <el-table-column  prop="money" label="链接地址" header-align="center">
              </el-table-column>
              <el-table-column prop="time" label="生成时间"  header-align="center">
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
      name: "stores",
      data() {
        return {
          lei:'',
          phone:'',
          tableData: [{
              num: '1',
              money: '男装',
              time:'2019-9-9'
            },{
              num: '1',
              money: '女装',
              time:'2019-9-9'
            }]
        }
      },
      methods:{
        // ===删除
        del(index, row){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
          console.log(index, row)
        }
      }
    }
</script>

<style scoped>
  .stores-title{
    font-size:16px;
    text-align: left;
    height:20px;
    line-height:20px;
    border-left:4px solid #4782ef;
    padding-left:6px;
    font-weight:bold;
    margin-bottom:20px;
  }
  .tips{
    font-size:14px;
    color:#f56c6c;
    text-align: left;
    padding-left:10px;
  }
  .bindbtn{
    margin-left:50px;
  }
  .store-inner{
    background:#fff;
    padding:20px;
    height:100%;
  }
  #app .first-box .el-table .table-header{
    background:#f5f7fa;
  }
  .el-table th, .el-table tr.table-header{
    background:#f5f7fa;
  }
  a{
    color:#fff;
  }
  .loading-tips{
    text-align:left;
    font-size:14px;
    line-height:30px;
  }
  .loading-tips .alert-label{
    margin-right:10px;
    font-weight:bold;
  }
  .loading-tipss{
    display:flex;
  }
  .loading-tipss .alert-label{
     display:block;
  }
  .up-img{
    width:300px;
    height:300px;
  }
  .mask{
    width:100%;
    height:100%;
    position: absolute;
    left:0;
    top:0;
    background:rgba(0,0,0,0.6);
    z-index:3000;
    overflow: hidden;
  }
  .bigimg{
    transform: scale(1);
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
  }
  .touBoxs{
    width:100%;
    margin-bottom:20px;
  }
  .touBoxs .touList{
    margin-bottom: 10px;
    text-align:left;
    font-size:14px;
    color:rgba(0,0,0,0.45);
     vertical-align:text-top;
  }
  .touLabel{
    color:#000;
    margin-right:10px;
  }
  .danInps{
    width:30%;
  }
</style>
