<template>
  <div>
    <el-row class="row-bg" type="flex"  justify="center">
      <el-col>
        <div class="queryBoxs">
          <el-form ref="form" :model="form" class="queryBox" label-width="70px"  size="mini" :inline="true">
            <el-form-item label="商家账号">
              <el-input v-model="form.num" ></el-input>
            </el-form-item>
            <el-form-item label="投诉类型">
              <el-select v-model="form.state" placeholder="请选择" >
                <el-option label="淘宝客" value="1"></el-option>
                <el-option label="要挟" value="2"></el-option>
                <el-option label="要求返现，否则差评" value="3"></el-option>
                <el-option label="刷错商品" value="5"></el-option>
                <el-option label="其他违规操作" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布时间">
              <el-date-picker v-model="form.date" type="daterange"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click='search'>查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="danger"  size="small" @click="zhuanjie" >任务转接</el-button>
            </el-form-item>
          </el-form>
          <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%"  @selection-change='selection' header-row-class-name="table-header">
            <el-table-column type="selection"  width="55" header-align="center">
            </el-table-column>
            <el-table-column prop="account" label="商家账号"  header-align="center">
            </el-table-column>
            <el-table-column  prop="createAt" label="投诉时间" header-align="center">
            </el-table-column>
            <el-table-column prop="type" label="投诉类型"  show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <p v-if='scope.row.identifying==1'>淘宝客</p>
                <p v-if='scope.row.identifying==2'>要挟</p>
                <p v-if='scope.row.identifying==3'>要求返现，否则差评</p>
                <p v-if='scope.row.identifying==4'>其他违规操作</p>
                <p v-if='scope.row.identifying==5'>刷错商品</p>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="问题详情"  show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <el-button type="success" plain  size="mini" @click="missdialog = true">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @current-change="CurrentChange" layout="prev, pager, next" :total="totalPages">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
     <!--**商家投诉详情**-->
    <el-dialog title='商家投诉详情' width='40%' :visible.sync="missdialog" >
      <ul class='touBox'>
        <li class='touList'><span class='touLabel'>商家账号：</span>{{info.account}}</li>
        <li class='touList'><span class='touLabel'>发布时间：</span>{{info.createAt}}</li>
        <li class='touList'><span class='touLabel'>订单编号：</span>{{info.idNum}}</li>
        <li class='touList'><span class='touLabel'>刷手账号：</span>{{info.handAccount}}</li>
        <li class='touList'><span class='touLabel'>投诉类型：</span>{{info.conditions}}</li>
        <li class='touList'><span class='touLabel' v-if='info.illegalContent!=""'>投诉内容：</span>{{info.illegalContent}}</li>
        <li class='touList'><span class='touLabel'>图片展示：</span><img :src="info.merchantPic" alt="" class='tou-img' @click="bigImg" ></li>
        <li class='touList' style='display:flex;'><span class='touLabel' style='width:80px;'>操作密码：</span><el-input v-model="password" type='password' ></el-input></li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button  type='primary' @click="resoves(1,info.id)" size='small'>同意</el-button>
        <el-button @click="resoves(2,info.id)" size='small'>驳回</el-button>
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
    <!--**图片放大**-->
    <div class="mask" v-show="show" @click="small">
      <img :src="bigsrc" alt="" class="bigimg">
    </div>
  </div>
</template>

<script>
  import {businessTou,businessZhuans,businessResove} from '../../../api/message'
  import { businessadmins} from '../../../api/userConller'
    export default {
        name: "result",
        data(){
          return{
            missdialog:false,
            bigsrc:'',
            show:false,
            taskdialog:false,
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
            password:''
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
          businessTou('','','','',1,10).then(response=>{
            var data=response
            if(data.msg==1){
              this.tableData=data.page.result
              this.totalPages=data.page.totalRow
              this.info=data.page.result[0]
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
            businessTou(this.form.num,this.form.state,date1,date2,e,10).then(response=>{
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
          // 条件搜索
          search(){
            var date1 
            var date2
            if(this.form.date==null){
               date1=null
               date2=null
            }else{
              date1=this.form.date[0]
              date2=this.form.date[1]
            }
            businessTou(this.form.num,this.form.state,date1,date2,this.currentPage,10).then(response=>{
              var data=response
              if(data.msg==1){
                this.tableData=[]
                this.totalPages=0
              }else if(data.msg==5){
                this.tableData=[]
                this.totalPages=0
              }
            }).catch(error=>{})
          },
          selection(val) {
            this.check = val;
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
          // 处理投诉意见
          resoves(type,id){
            var that=this;
            if(this.password==''){
              this.$message.warning("请输入投诉密码")
            }else{
              businessResove(id,type,this.password).then(response=>{
                this.missdialog=false
                var data=response
                if(data.msg==1){
                  this.$message.success('操作成功')
                  setTimeout(function(){
                    that.$router.go(0)
                  },500)
                }else if(data.msg==6){
                  this.$message.error('密码错误')
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
</style>
