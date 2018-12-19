<template>
  <div class='not'>
    <el-row class="row-bg" type="flex"  justify="center">
      <el-col>
        <div class="queryBoxs">
          <el-form ref="form" :model="form" class="queryBox" label-width="70px"  size="small" :inline="true">
             <el-form-item label="端口来源">
                <el-select v-model="form.state" placeholder="请选择" >
                  <el-option label="商家" value="1"></el-option>
                  <el-option label="刷手" value="2"></el-option>
                </el-select>
              </el-form-item>
            <el-form-item label="订单编号">
              <el-input v-model="form.num" ></el-input>
            </el-form-item>
            <el-form-item label="截止时间">
              <el-date-picker v-model="form.date" type="daterange"  :default-time="['00:00:00', '23:59:59']"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click='search'>查询</el-button>
            </el-form-item>
          </el-form>
          <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%"   header-row-class-name="table-header">
            <el-table-column type="selection"  width="55" header-align="center">
            </el-table-column>
            <el-table-column prop="idNum" label="订单编号"  header-align="center">
              <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
            </el-table-column>
            <el-table-column  prop="transferMoney" label="转账金额" header-align="center">
            </el-table-column>
            <el-table-column prop="bankName" label="提现人"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="bankCard" label="银行卡号"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="bankType" label="开户行"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="subBranchName" label="支行名称"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="closingAt" label="转账截止时间"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column   label="操作"  header-align="center"  width='200'>
              <template slot-scope="scope">
                <el-button type="success" plain  size="mini" @click="dialogVisible = true,Ids=scope.row.id">转账成功</el-button>
                <el-button type="danger"  plain size="mini" @click="chongdialog = true,Ids=scope.row.id">转账失败</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @current-change="CurrentChange" layout="prev, pager, next" :total="totalPages" v-if='totalPages!=0'>
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="上传凭证" :visible.sync="dialogVisible" width="30%">
      <el-upload class="avatar-uploader" :show-file-list="false" 
       action="http://www.rwgh66.com/sd-web/merchant/upload" :on-success="handleAvatarSuccess">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size='small'>取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false" size='small'>提交</el-button>
      </span>
    </el-dialog>
     <!--**转账失败**-->
    <el-dialog title='提示' width='30%' :visible.sync="chongdialog" >
      <p class='missTips'>即将进行转账失败操作请确认，确认后请在转账失败界面重新转账</p>
      <ul class='touBox'>
        <li class='touList'><span class='touLabel'>失败原因：</span><el-input v-model="way" type='text' class='danInp' size='small' ></el-input></li>
        <li class='touList'><span class='touLabel'>操作密码：</span><el-input v-model="password" type='password' class='danInp' size='small' ></el-input></li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button  type='primary' @click="errors" size='small'>确认</el-button>
        <el-button  @click="chongdialog = false" size='small'>取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {findAllTransfer,uploadImg,transferError,formatDate} from '../../../../api/api'
  export default {
    name: "not",
    data(){
      return{
        form:{
          num:'',
          state: '',
          date: '',
        },
        Ids:'',
        totalPages:0,
        currentPage:1,
        way:'',
        password:'',
        tableData:[],
        imageUrl: '',
        dialogVisible:false,
        chongdialog:false,
        url:''
      }
    },
    mounted(){
      findAllTransfer('',3,'','','',1,10).then(response=>{
        var data=response
        if(data.msg==3){
            this.tableData=[]
             this.totalPages=0
        }else if(data.msg==1){
          this.tableData=data.page.result
          this.totalPages=data.page.totalRow
        }
      }).catch(error=>{

      })
    },
     methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.url=res.picPath
      },
      CurrentChange(e){
          this.currentPage=e
            var date1 
            var date2
            if(this.form.date==null){
               date1=null
               date2=null
            }else{
              date1=formatDate(new Date(this.form.date[0]));
              date2=formatDate(new Date(this.form.date[1]));
            }
           findAllTransfer(this.form.state,3,this.form.num,date1,date2,e,10).then(response=>{
            var data=response
            if(data.msg==3){
                this.tableData=[]
                 this.totalPages=0
            }else if(data.msg==1){
              this.tableData=data.page.result
              this.totalPages=data.page.totalRow
            }
          }).catch(error=>{
          })
        },
      search(){
          var date1 
          var date2
          if(this.form.date==null){
             date1=null
             date2=null
          }else{
            date1=formatDate(new Date(this.form.date[0]));
            date2=formatDate(new Date(this.form.date[1]));
          }
         findAllTransfer(this.form.state,3,this.form.num,date1,date2,this.currentPage,10).then(response=>{
          var data=response
          if(data.msg==3){
              this.tableData=[]
               this.totalPages=0
          }else if(data.msg==1){
            this.tableData=data.page.result
            this.totalPages=data.page.totalRow
          }
        }).catch(error=>{

        })
      },
      errors(){
        var that=this;
        if(this.password==''){
          this.$message.warning('请输入操作密码')
        }else{
          transferError(this.Ids,this.way,this.password).then(response=>{
            this.chongdialog=false
            var data=response
            if(data.msg==1){
              this.$message.suceess('操作成功')
              setTimeout(function(){
                that.$router.go(0)
              },500)
            }else if(data.msg==3){
              this.$message.error('密码错误')
            }
          }).catch(error=>{

          })
        }
      }
    }
  }
</script>

<style>
  .btnBox{text-align: left;margin-bottom:20px;}
  .queryBox{
     display: block;
      text-align:left;
  }
  .not .recharge-info{
    margin-bottom:20px;
    background:#E6F7FF;
    border-radius:4px;
    border:1px solid #91D5FF;
  }
  .not .rechare-title{
    font-size:16px;
    color:#000;
    font-weight:bold;
    text-align: left;
  }
  .not .rechare-span{
    font-size:14px;
    color:rgba(0,0,0,0.45);
  }
  .not .info-box{
    padding:15px;
    font-size:14px;
    text-align: left;
    line-height:30px;
  }
  .not .info-fl{
    float:left;
    width:8%;
    position:relative;
    height:144px;
  }
  .not .icons{
    width:24px;
    height:24px;
    display:block;
    border:2px solid #1890FF;
    color:#1890FF;
    font-size:20px;
    text-align:center;
    line-height:24px;
    border-radius:50%;
    font-weight:bold;
    position:absolute;
    left:0;
    right:0;
    margin:auto;
    top:20px;
  }
  .info-box .high{
    color:#F5222D;
  }
  .row-bg .el-table .table-header{
    background:#f8f8f8;
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
  .missTips{
    margin-bottom:20px;
    text-align:left;
  }
</style>
