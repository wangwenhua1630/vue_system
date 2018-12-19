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
              <el-date-picker v-model="form.date" type="daterange"  :default-time="['00:00:00', '23:59:59']" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click='search'>查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="danger"  size="small"  @click="zhuanjie">任务转介</el-button>
            </el-form-item>
          </el-form>
          <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%"   @selection-change='selection'  header-row-class-name="table-header">
            <el-table-column type="selection"  width="55" header-align="center">
            </el-table-column>
            <el-table-column prop="account" label="商家账号"  header-align="center">
            </el-table-column>
            <el-table-column  prop="time" label="店铺资料" header-align="center">
              <template slot-scope="scope">
                <p @click="lookInfo(scope.row.content)" class='shen-info' >查看详情</p>
              </template>
            </el-table-column>
             <el-table-column  prop="createAt" label="发布时间" header-align="center">
            </el-table-column>
            <el-table-column prop="type" label="类型"  show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                店铺审核
              </template>
            </el-table-column>
            <el-table-column label="操作"  show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <el-button type="primary" plain  size="mini" @click="dongdialog = true,heTypes=1,Ids=scope.row.id">审核通过</el-button>
                <el-button type="warning" plain  size="mini" @click="dongdialog = true,heTypes=2,Ids=scope.row.id">审核失败</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @current-change="CurrentChange" layout="prev, pager, next" :total="totalPages">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
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
     <!-- **查看店铺资料** -->
    <el-dialog  title="店铺详情" :visible.sync="diandialog" width="50%" class='taskInfos'>
      <newStore :info='storeMessage'></newStore>
      <span slot="footer" class="dialog-footer">
        <el-button @click="diandialog = false" size='small'>关闭</el-button>
      </span>
    </el-dialog>
    <!-- **审核通过，失败** -->
    <el-dialog  title="提示" :visible.sync="dongdialog" width="30%" >
      <p class='hidde-title' style="text-align:left;margin-bottom:20px;">确认店铺资料没有问题了吗？</p>
      <el-input  type='text' v-model="pass" placeholder="请输入不通过原因" class='hes' v-if='heTypes==2' ></el-input>
      <el-input  type='password' v-model="input" placeholder="请输入操作密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary' @click="confirm" size='small' >确定</el-button>
        <el-button  @click="dongdialog = false" size='small' >取消</el-button>
      </span>
    </el-dialog>
    <!--**图片放大**-->
    <div class="mask" v-show="show" @click="small">
      <img :src="bigsrc" alt="" class="bigimg">
    </div>

  </div>
</template>

<script>
    import newStore from '../../vip/newStore'
    import {businessMuchList,businessZhuans,businessStorehe,businessStoreInfo} from '../../../api/message'
    import { businessadmins} from '../../../api/userConller'
    export default {
        name: "result",
        data(){
          return{
            bigsrc:'',
            show:false,
            taskdialog:false,
            diandialog:false,
            dongdialog:false,
            heTypes:'',
            input:'',
            pass:'',
            storeMessage:'',
            form:{
              num:'',
              state: '',
              date: '',
            },
            check:[],
            tableData:[],
            info:'',
            totalPages:0,
            currentPage:1,
            jies:'',
            options:[],
            jie:'',
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
          businessMuchList('','','',1,10,2).then(response=>{
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
          //查看原图
          bigImg(e){
            this.show=true;
            this.bigsrc=e.target.currentSrc;
          },
          //隐藏原图
          small(){
            this.show=false;
          },
          // 审核店铺
          confirm(){
            this.dongdialog=false;
            var that=this;
            if(this.input==''){
              this.$message.warning('请输入操作密码')
            }else{
              businessStorehe(this.Ids,this.input,this.heTypes,this.pass).then(response=>{
                var data=response
                if(data.msg==1){
                  this.$message.success('操作成功')
                  setTimeout(function(){
                    that.$router.go(0)
                  },500)
                }else if(data.msg==3){
                  this.$message.erro('密码错误')
                }
              }).catch(error=>{})
            }
            // 1 通过 2不通过 刷新表格
          },
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
            businessMuchList(this.form.num,date1,date2,e,10,2).then(response=>{
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
            businessMuchList(this.form.num,date1,date2,this.currentPage,10,2).then(response=>{
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
          lookInfo(id){
            businessStoreInfo(id).then(response=>{
              var data=response
              if(data.msg==1){
                this.storeMessage=data.store
                this.diandialog=true
              }else if(data.msg==3){
                this.$message.warning('没有店铺信息')
              }
            }).catch(error=>{})
          }
        },
        components:{
          newStore
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
  .shen-info{
    cursor:pointer;
    color:#1890FF;
  }
  .hes{
    margin-bottom:20px;
  }
</style>
