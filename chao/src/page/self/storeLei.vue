<template>
    <div>
      <el-row class="contain row-bg" type="flex"  justify="center">
        <el-col>
          <div class="store-inner">
            <p class='break'>行业类目设置
             <el-button type="primary"  size="mini" class="bindbtn" @click='leidialog=true'> 新增 </el-button>
            </p>
            <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%"   header-row-class-name="table-header" border >
              <el-table-column prop="id" label="编号"  header-align="center">
              </el-table-column>
              <el-table-column  prop="name" label="行业类目" header-align="center">
              </el-table-column>
              <el-table-column prop="cardTime" label="操作"  header-align="center">
                <template slot-scope="scope">
                  <el-button type="danger"  plain round size="mini" @click='deldialog=true,Ids=scope.row.id'>删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <!-- 行业类目设置 -->
      <el-dialog title="行业类目设置" :visible.sync="leidialog" width='30%' >
          <ul class='touBox'>
            <li class='touList'><span class='touLabel'>行业类目：</span><el-input v-model="lei"  class='danInp' size='small' ></el-input></li>
          </ul>
          <span slot="footer" class="dialog-footer">
            <el-button  type='primary' @click="leis" size='small'>确定</el-button>
            <el-button @click="leidialog = false" size='small'>取消</el-button>
          </span>
      </el-dialog>
      <!-- 单量删除 -->
      <el-dialog title="单量删除" :visible.sync="deldialog" width='30%' >
          <ul class='touBox'>
            <li class='touList'><span class='touLabel'>操作密码：</span><el-input v-model="passwords" type='password'  class='danInp' size='small' ></el-input></li>
          </ul>
          <span slot="footer" class="dialog-footer">
            <el-button  type='primary' @click="del" size='small'>确定</el-button>
            <el-button @click="deldialog = false" size='small'>取消</el-button>
          </span>
      </el-dialog>
    </div>
</template>

<script>
    import {storeType,storeDel,storeAdd} from '../../api/self'
    export default {
      name: "stores",
      data() {
        return {
          leidialog:false,
          deldialog:false,
          passwords:'',
          lei:'',
          Ids:'',
          tableData: []
        }
      },
      mounted(){
        storeType().then(response=>{
          var data=response
          this.tableData=data.list
        }).catch(error=>{

        })
      },
      methods:{
        // ===删除
        del(){
          var that=this
          if(this.passwords==''){
            this.$message.warning('请输入操作密码')
          }else{
            storeDel(this.Ids,this.passwords).then(response=>{
              var data=response
              this.deldialog=false
              if(data.msg==1){
                this.$message.success('删除成功')
                setTimeout(function(){
                  that.$router.go(0)
                },500)
              }else if(data.msg==3){
                this.$message.error('密码错误')
              }
            }).catch(error=>{})
          }
        },
        leis(){
          var that=this
          if(this.lei==1){
            this.$message.warning('请输入类目名称')
          }else{
            storeAdd(this.lei).then(response=>{
              var data=response
              this.leidialog=false
              if(data.msg==1){
                this.$message.success('添加成功')
                setTimeout(function(){
                  that.$router.go(0)
                },500)
              }
            }).catch(error=>{})
          }
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
  .touBox{
    width:100%;
  }
  .touBox .touList{
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
  .danInp{
    width:60%;
  }
</style>
