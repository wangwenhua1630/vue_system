<template>
  <div class='shua_bao'>
    <el-row class="row-bg" type="flex"  justify="center">
      <el-col>
        <div class="queryBoxs">
          <el-form ref="form" :model="form" class="queryBox" label-width="70px"  size="mini" :inline="true">
            <el-form-item label="刷手账号">
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
              <el-button type="danger"  size="small" @click="zhuanjie" >任务转接</el-button>
            </el-form-item>
          </el-form>
          <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%"  @selection-change='selection' header-row-class-name="table-header">
            <el-table-column type="selection"  width="55" header-align="center">
            </el-table-column>
            <el-table-column prop="account" label="刷手账号"  header-align="center">
            </el-table-column>
            <el-table-column  prop="createAt" label="发布时间" header-align="center">
            </el-table-column>
            <el-table-column prop="type" label="类型"  show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <p>退保证金</p>
              </template>
            </el-table-column>
            <el-table-column label="操作"  show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <el-button type="success" plain  size="mini" @click="missdialog = true,Ids=scope.row.id">退款</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @current-change="CurrentChange" layout="prev, pager, next" :total="totalPages">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <!--**退款**-->
    <el-dialog title='退款' width='30%' :visible.sync="missdialog" >
      <p class='bao-tips'>通过代表已经线下给刷手转了保证金</p>
      <ul class='touBox'>
        <li class='touList'><span class='touLabel'>操作密码：</span><el-input v-model="password" type='password' class='danInp' size='small' ></el-input></li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button  type='primary' @click="tuis(1)" size='small'>通过</el-button>
        <el-button @click="tuis(2)" size='small'>驳回</el-button>
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
    import {handBaolist,handBaoTui,handBaoJie} from '../../../api/message'
    import { businessadmins} from '../../../api/userConller'
    export default {
        name: "result",
        data(){
          return{
            missdialog:false,
            taskdialog:false,
            bigsrc:'',
            show:false,
            password:'',
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
            Ids:''
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
          handBaolist('',2,'','',1,10).then(response=>{
            var data=response
            if(data.msg==1){
              this.tableData=data.page.result
              this.totalPages=data.page.totalRow
              this.info=data.page.result[0].list
            }else if(data.msg==4){
              this.tableData=[]
              this.totalPages=0
            }
          }).catch(error=>{

          })
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
            handBaolist(this.form.num,2,date1,date2,e,10).then(response=>{
              var data=response
              if(data.msg==1){
                this.tableData=data.page.result
                this.totalPages=data.page.totalRow
              }else if(data.msg==4){
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
            handBaolist(this.form.num,2,date1,date2,this.currentPage,10).then(response=>{
              var data=response
              if(data.msg==1){
                this.tableData=data.page.result
                this.totalPages=data.page.totalRow
              }else if(data.msg==4){
                this.tableData=[]
                this.totalPages=0
                console.log(this.tableData)
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
            handBaoJie(this.jie,idList).then(response=>{
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
          // 推保证金
          tuis(types){
            var that=this;
            if(this.password==''){
              this.$message.warning('请填写操作密码')
            }else{
              handBaoTui(2,types,this.Ids,this.password).then(response=>{
                this.missdialog=false
                var data=response
                if(data.msg==1){
                  this.$message.success('操作成功')
                  setTimeout(function(){
                    that.$router.go(0)
                  },500)
                }else if(data.msg==4){
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
  .danInp{
    width:60%;
  }
  .bao-tips{
    margin-bottom:20px;
    text-align:left;
    color:#1890FF;
  }
</style>
