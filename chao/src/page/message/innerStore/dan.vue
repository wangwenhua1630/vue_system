<template>
  <div>
    <el-row class="row-bg" type="flex"  justify="center">
      <el-col>
        <div class="queryBoxs">
          <el-form ref="form" :model="form" class="queryBox" label-width="70px"  size="mini" :inline="true">
            <el-form-item label="商家账号">
              <el-input v-model="form.num" ></el-input>
            </el-form-item>
            <el-form-item label="发布时间">
              <el-date-picker v-model="form.date" type="daterange" :default-time="['00:00:00', '23:59:59']" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click='search'>查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="danger"  size="small" @click="zhuanjie" >任务转介</el-button>
            </el-form-item>
          </el-form>
          <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%"   @selection-change='selection' header-row-class-name="table-header">
            <el-table-column type="selection"  width="55" header-align="center">
            </el-table-column>
            <el-table-column prop="account" label="商家账号"  header-align="center">
            </el-table-column>
            <el-table-column prop="storeName" label="店铺名称"  header-align="center">
            </el-table-column>
            <el-table-column  prop="createAt" label="发布时间" header-align="center">
            </el-table-column>
            <el-table-column prop="num" label="加单量"  header-align="center">
            </el-table-column>
            <el-table-column prop="info" label="说明"  header-align="center">
              <template slot-scope="scope">
                <p>商家已支付{{scope.row.money}}点，需进行{{scope.row.num}}单量的新增，请尽快处理。</p>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="操作"  show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <el-button type="success" plain  size="mini" @click="missdialog = true,Ids=scope.row.id">调整单量</el-button>
                <el-button type="danger" plain  size="mini" @click="xiaodialog = true,Ids=scope.row.id">取消调整</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @current-change="CurrentChange" layout="prev, pager, next" :total="totalPages">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
     <!--**单量调整**-->
    <el-dialog title='单量调整' width='30%' :visible.sync="missdialog" >
      <ul class='touBox'>
        <li class='touList'><span class='touLabel'>操作密码：</span><el-input v-model="passwords" type='password' class='danInp' size='small' ></el-input></li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button  type='primary' @click="danChange" size='small'>确定</el-button>
        <el-button @click="missdialog = false" size='small'>取消</el-button>
      </span>
    </el-dialog>
     <!--**取消调整**-->
    <el-dialog title='取消调整' width='30%' :visible.sync="xiaodialog" >
      <ul class='touBox'>
        <li class='touList'><span class='touLabel'>取消原因：</span><el-input v-model="yin" type='text' class='danInp' size='small' ></el-input></li>
        <li class='touList'><span class='touLabel'>操作密码：</span><el-input v-model="password" type='password' class='danInp' size='small' ></el-input></li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button  type='primary' @click="xiao" size='small'>确定</el-button>
        <el-button @click="xiaodialog = false" size='small'>取消</el-button>
      </span>
    </el-dialog>
    <!--**任务转介**-->
    <el-dialog title='任务转介' width='30%' :visible.sync="taskdialog" >
      <ul class='touBox'>
        <li class='touList'><span class='touLabel'>转接职位：</span>上级</li>
        <li class='touList' v-if='jies!=1'><span class='touLabel'>转接人：</span>
        <el-select v-model="jie" placeholder="请选择" class='danInp' size='small' >
          <el-option :label="item.realName" :value="item.id" v-for='item in options' :key='item.id' ></el-option>
        </el-select></li>
        <li v-else>暂无转接人</li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button  type='primary' @click="taskZhuan" size='small' >确定</el-button>
        <el-button @click="taskdialog = false" size='small'>取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import {businessMuchList,businessZhuans,businessDanchange} from '../../../api/message'
    import { businessadmins} from '../../../api/userConller'
    export default {
        name: "result",
        data(){
          return{
            missdialog:false,
            taskdialog:false,
            xiaodialog:false,
            yin:'',
            password:'',
            form:{
              num:'',
              date: '',
            },
            passwords:'',
            password:'',
            check:[],
            tableData:[],
            info:'',
            totalPages:0,
            currentPage:1,
            jies:'',
            options:[],
            jie:'',
            Id:''
          }
        },
        mounted(){
          businessadmins().then(response=>{
            var data=response
            if(data.msg==3){
              this.jies=1
            }else if(data.msg==1){
              this.options=data.list
            }
          }).catch(error=>{})
          businessMuchList('','','',1,10,5).then(response=>{
            var data=response
            if(data.msg==1){
              this.tableData=data.page.result
              this.totalPages=data.page.totalRow
            }else if(data.msg==5){
              this.tableData=[]
              this.totalPages=0
            }
          }).catch(error=>{})
        },
        methods:{
          selection(val) {
            this.check = val;
          },
          // 分页查询
          CurrentChange(e){
            this.currentPage=e
            var date1 
            var date2
            if(this.form.date==null){
               date1=null
               date2=null
            }else{
              date1=this.form.date[0]
              date2=this.form.date[1]
            }
            businessMuchList(this.form.num,date1,date2,e,10,5).then(response=>{
              var data=response
              if(data.msg==1){
                this.tableData=data.page.result
                this.totalPages=data.page.totalRow
              }else if(data.msg==5){
                this.tableData=[]
                this.totalPages=0
              }
            }).catch(error=>{})
          },
          // 条件查询
          search(){
            var date1='' 
            var date2=''
            if(this.form.date==null){
               date1=null
               date2=null
            }else{
              date1=this.form.date[0]
              date2=this.form.date[1]
            }
            businessMuchList(this.form.num,date1,date2,this.currentPage,10,5).then(response=>{
              var data=response
              if(data.msg==1){
                this.tableData=data.page.result
                this.totalPages=data.page.totalRow
              }else if(data.msg==5){
                this.tableData=[]
                this.totalPages=0
              }
            }).catch(error=>{})
          },
          // 任务转接
          zhuanjie(){
            if(this.check==''){
              this.$message.warning('请至少选择一条数据')
            }else{
              this.taskdialog=true
            }
          },
          taskZhuan(){
            var idList=[];
            var that=this;
            for(var i=0;i<this.check.length;i++){
              idList.push(this.check[i].id)
            }
            businessZhuans(idList,this.jie).then(response=>{
              this.taskdialog=false
              var data=response
              if(data.msg==1){
                this.$message.success('操作成功')
                setTimeout(function(){
                  that.$router.go(0)
                },500)
              }
            }).catch(error=>{

            })
          },
          // 调整单量
          danChange(){
            var that=this;
            if(this.passwords==''){
              this.$message.warning('请输入操作密码')
            }else{
              businessDanchange(this.Ids,this.passwords,1,'').then(response=>{
                var data=response
                this.missdialog=false
                if(data.msg==1){
                  this.$message.success('操作成功')
                  setTimeout(function(){
                    that.$router.go(0)
                  },500)
                }else if(data.msg==3){
                  this.$message.error('密码错误')
                }else if(data.msg==4){
                  this.$message.error('发布点不足')
                }
              }).catch(error=>{})
            }
          },
          // 取消调整
          xiao(){
            var that=this;
            if(this.password==''){
              this.$message.warning('请输入操作密码')
            }else if(this.yin==''){
              this.$message.warning('请输入驳回原因')
            }else{
              businessDanchange(this.Ids,this.password,2,this.yin).then(response=>{
                this.xiaodialog=false
                var data=response
                if(data.msg==1){
                  this.$message.success('操作成功')
                  setTimeout(function(){
                    that.$router.go(0)
                  },500)
                }else if(data.msg==3){
                  this.$message.error('密码错误')
                }else if(data.msg==4){
                  this.$message.error('发布点不足')
                }
              }).catch(error=>{})
            }
          }
        }
    }
</script>

<style>
  .btnBox{text-align: left;margin-bottom:20px;}
  .row-bg .el-table .table-header{
    background:#f8f8f8;
  }
  .queryBox{
    text-align:left;
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
  .tou-img{
    width:100px;
    height:160px;
    cursor: pointer;
     vertical-align:text-top;
  }
  .danInp{
    width:60%;
  }
</style>
