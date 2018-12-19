<template>
  <div class='not'>
    <el-row class="row-bg" type="flex"  justify="center">
      <el-col>
        <div class="queryBoxs">
          <div class="recharge-info">
            <div class='info-fl'>
              <p class='icons '>i</p>
            </div>
            <ul class="info-box">
              <p class="rechare-title">下方表格记录的是买家提交的提现未到账反馈，请复制订单编号到网银核实该笔订单的转账情况：</p>
                <li>1、若经核实，该笔订单显示为“转账成功”，请在上传凭证窗口 <span class="high">提交</span> 该笔订单的 <span class="high">成功转账凭证</span>;</li>
                <li>2、若经核实，实际上<span class="high">未对该订单进行转账</span>或<span class="high">实际转账失败</span>了，请在上传凭证窗口点击<span class="high">【转账失败】</span>按钮，将该笔订单的状态变更为转账失败；</li>
                <li><span class="high">温馨提示</span>：请务必在<span class="high">每日15点前</span>对需要上传凭证的订单进行操作，否则<span class="high">任务将被隐藏</span>。</li>
            </ul>
          </div>
          <el-form ref="form" :model="form" class="queryBox" label-width="70px"  size="small" :inline="true">
            <!-- <el-form-item label="转账状态">
              <el-select v-model="form.state" placeholder="请选择" >
                <el-option label="等待转账" value="1"></el-option>
                <el-option label="已导出" value="2"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="订单编号">
              <el-input v-model="form.num" ></el-input>
            </el-form-item>
            <el-form-item label="截止时间">
              <el-date-picker type="daterange"  v-model='form.date'  default-time="['00:00:00', '23:59:59']" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
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
            <el-table-column prop="cardState" label="转账状态"  show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                 未到账
              </template>
            </el-table-column>
            <el-table-column prop="cardTime" label="转账截止时间"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column   label="操作"  header-align="center" width='200' >
              <template slot-scope="scope">
                <el-button type="success" plain  size="mini" @click="zhuanSuccess(scope.row.id)">转账成功</el-button>
                <el-button type="danger"  plain size="mini" @click="zhuanMiss(scope.row.id)">转账失败</el-button>
              </template>
            </el-table-column>
          </el-table>
           <el-pagination
              @current-change="CurrentChange"
              layout="prev, pager, next"
              :total="totalPages">
            </el-pagination>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="上传凭证" :visible.sync="dialogVisible" width="30%">
      <el-upload class="avatar-uploader" :show-file-list="false" action="http://www.rwgh66.com/sd-web/merchant/upload" 
      :on-success="handleAvatarSuccess">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </span>
    </el-dialog>
    <el-dialog  title="提示" :visible.sync="zhuandialog" width="40%" >
        <div class="recharge-info">
          <div class='info-fl'><p class='icons'>i</p></div>
          <div class="infos-box">您将进行转账失败操作，是否确认</div>
        </div>
        <el-input type='text' placeholder='请在此处输入失败原因' v-model='miss' ></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button type='primary'  @click="missSubmit" size='small' >确定</el-button>
          <el-button @click="zhuandialog = false" size='small' >取消</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
  import {zhuan,transferNotarize,zhuanStatus} from '../../../../api/money';
  export default {
    name: "not",
    data(){
      return{
        form:{
          num:'',
          state: '',
          date: '',
        },
        miss:'',
        zhengId:'',
        missId:'',
        totalPages:0,
        tableData:[],
        imageUrl: '',
        imgs:'',
        zhuandialog:false,
        dialogVisible:false
      }
    },
    mounted(){
      zhuan(1,10,3).then(response => {
        const data = response;
         if(data.msg==1){
            this.tableData=data.page.result
            this.totalPages=data.page.totalRow
         }
      }).catch(error => {
        reject(error);
      }); 
    },
    methods: {
      handleAvatarSuccess(res, file) {
        console.log(file.raw)
        this.imageUrl = URL.createObjectURL(file.raw);
        this.imgs=res.src
      },
      // 条件查询
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
        zhuan(1,10,3,this.form.num,date1,date2).then(response => {
          const data = response;
           if(data.msg==1){
              this.tableData=data.page.result
              this.totalPages=data.page.totalPages
           }else if(data.msg==3){
             this.tableData=[]
              this.totalPages=0
           }
        }).catch(error => {
          reject(error);
        }); 
      },
      // 分页查询
      CurrentChange(e){
        zhuan(e,10,3).then(response => {
          const data = response;
           if(data.msg==1){
              this.tableData=data.page.result
              this.totalPages=data.page.totalRow
           }
        }).catch(error => {
          reject(error);
        }); 
      },
      // 转账成功
      zhuanSuccess(id){
        this.zhengId=id;
        this.dialogVisible=true
      },
      submit(){
        this.dialogVisible=false
        transferNotarize(this.zhengId,this.imgs).then(response => {
          const data = response;
           if(data.msg==1){
              this.$message.success('提交成功')
              this.$router.go(0)
           }else if(data.msg==3){
              this.$message.error('当前状态不是未到账反馈,请重新选择')
           }
        }).catch(error => {
          reject(error);
        }); 
      },
      // 转账失败
      zhuanMiss(id){
        this.missId=id;
        this.zhuandialog=true
      },
      missSubmit(){
        var ids=[];
        if(this.miss==''){
          this.$message.warning('请输入失败原因')
        }else{
          this.zhuandialog=false
          ids.push(this.missId)
          zhuanStatus(3,3,ids,'',this.miss).then(response => {
            const data = response;
             if(data.msg==1){
                this.$message.success('提交成功')
                this.$router.go(0)
             }else if(data.msg==3){
                this.$message.error('当前状态不是未到账反馈,请重新选择')
             }
          }).catch(error => {
            reject(error);
          }); 
        }
      }
    }
  }
</script>

<style>
  .btnBox{text-align: left;margin-bottom:20px;}
  .queryBox{
    display:block;
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
    color:rgba(0,0,0,0.85);
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
    .not .recharge-info{
    border:1px solid #91D5FF;
    background:#E6F7FF;
    border-radius:4px;
    width:100%;
    margin-bottom:30px;
  }
  .not .info-fl{
    float:left;
    width:6%;
    position:relative;
    height:40px;
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
    top:0;
    bottom:0;
    margin:auto;
  }
  .not .infos-box{
    padding:0;
    font-size:14px;
    text-align: left;
    line-height:40px;
  }
</style>
