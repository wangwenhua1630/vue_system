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
          </el-form>
          <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%"   header-row-class-name="table-header">
            <el-table-column prop="account" label="商家账号"  header-align="center">
            </el-table-column>
            <el-table-column  prop="createAt" label="发布时间" header-align="center">
            </el-table-column>
            <el-table-column prop="type" label="类型"  show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                提现
              </template>
            </el-table-column>
            <el-table-column prop="withdrawMoney" label="金额"  show-overflow-tooltip header-align="center">
            </el-table-column>
          </el-table>
          <el-pagination @current-change="CurrentChange" layout="prev, pager, next" :total="totalPages">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
     import {businessMuchList} from '../../../api/message'
    export default {
        name: "result",
        data(){
          return{
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
          businessMuchList('','','',1,10,3).then(response=>{
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
            businessMuchList(this.form.num,date1,date2,e,10,3).then(response=>{
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
            businessMuchList(this.form.num,date1,date2,this.currentPage,10,3).then(response=>{
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
</style>
