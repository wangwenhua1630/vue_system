<template>
  <div>
    <el-row class="row-bg" type="flex"  justify="center">
      <el-col>
        <div class="queryBoxs">
          <el-form ref="form" :model="form" class="queryBox" label-width="70px"  size="small" :inline="true">
           <!--  <el-form-item label="转账状态">
              <el-select v-model="form.state" placeholder="请选择" >
                <el-option label="等待转账" value="1"></el-option>
                <el-option label="已导出" value="2"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="订单编号">
              <el-input v-model="form.num" ></el-input>
            </el-form-item>
            <el-form-item label="截止时间">
              <el-date-picker type="daterange"  v-model='form.date':default-time="['00:00:00', '23:59:59']"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click='search'>查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="danger"  size="small" @click="excel_down()">导出</el-button>
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
            <el-table-column prop="bankCard" label="提现人银行卡号"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="cardState" label="转账状态"  show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                  <p v-if='scope.row.transferStatus==2'>转账成功</p>
              </template>
            </el-table-column>
            <el-table-column prop="closingAt" label="转账截止时间"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column   label="操作"  header-align="center" width='200' >
              <template slot-scope="scope">
               <!--  <el-button type="success" plain  size="mini" @click="kandialog = true">转账凭证</el-button> -->
                <el-button type="danger"  plain size="mini" @click="kedialogs(scope.row.id)" v-if='scope.row.serviceStatus!=1' >客服介入</el-button>
                <el-button type="danger"  plain size="mini"  v-if='scope.row.serviceStatus==1'>客服介入中</el-button>
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

     <!--**客服介入工单**-->
    <el-dialog title='客服介入工单' width='30%' :visible.sync="kedialog" >
      <ul class="loading-tips">
        <li><label class='alert-label' >任务编号：</label>c4545454</li>
        <li style='margin-bottom:10px;'>
          <label class='alert-label'>问题条件：</label>
          刷手已退款
        </li>
        <li><label class='alert-label' >温馨提示：</label>可上传1张的图片，图片的像素大小请控制在3M以内。</li>
        <div class="loading-tips loading-tipss">
          <label class='alert-label'>图片凭证：</label>
          <el-upload action="http://www.rwgh66.com/sd-web/merchant/upload" list-type="picture-card"  :limit="1" :on-exceed="handleExceeds" :on-success="bannerUps" >
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button  type='primary' @click="kefu"  size='small'>确认</el-button>
        <el-button @click="kedialog = false"  size='small'>取消</el-button>
      </span>
    </el-dialog>
     <!--**凭证截图**-->
    <el-dialog title='凭证截图' width='40%' :visible.sync="kandialog" >
       <ul class='touBox'>
        <li class='touList'><span class='touLabel'>任务编号：</span>v54545454</li>
        <li class='touList'><span class='touLabel'>图片展示：</span><img src="../../../../assets/banner1.png" alt="" class='tou-img' @click="bigImg" ></li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary' @click="kandialog = false"  size='small'>关闭</el-button>
      </span>
    </el-dialog>
    <!--**图片放大**-->
    <div class="mask" v-show="show" @click="small">
      <img :src="bigsrc" alt="" class="bigimg">
    </div>
  </div>
</template>

<script>
    import {zhuan,customerServiceIn} from '../../../../api/money';
    export default {
        name: "result",
        data(){
          return{
            kedialog:false,
            kandialog:false,
            bigsrc:'',
            keId:'',
            show:false,
            totalPages:0,
            imgs:'',
            form:{
              num:'',
              state: '',
              date: '',
            },
            tableData:[]
          }
        },
        mounted(){
          zhuan(1,10,2).then(response => {
            const data = response;
             if(data.msg==1){
                this.tableData=data.page.result
                this.totalPages=data.page.totalRow
             }
          }).catch(error => {
            reject(error);
          }); 
        },
        methods:{
           // 导出为表格
          excel_down(){
            var that=this;
            zhuan(1,10000,2).then(response => {
              const data = response;
              // console.log(data);
              var datas=data.page.result
               if(data.msg==1){
                  require.ensure([], () => {
                    const { export_json_to_excel } = require('@/vendor/Export2Excel')
                    const tHeader = ['收款账户列','收款户名列','转账金额列','备注列','收款银行列','收款银行支行列','收款省/直辖市列','收款市县列','转出账号/卡','转账模式','淘宝ID(转账前请删除此列信息)','订单编号(转账前请删除此列信息)','刷手电话(转账前请删除此列信息)']
                    const filterVal = ['bankCard','bankName','transferMoney','','bankType','subBranchName','','','formBankCard','','taoAccount','taoOrderNum','handPhone']
                    const list = datas
                    const data = that.formatJson(filterVal, list)
                    export_json_to_excel(tHeader, data, '转账结果导出文本', '压缩文本')
                  })
               }
            }).catch(error => {
              reject(error);
            }); 
            
          },
          formatJson(filterVal, jsonData){
            return jsonData.map(v => filterVal.map(j => v[j]))
          },
          handleExceeds(){
            this.$alert('只能上传1张图片',  {
              confirmButtonText: '确定',
              callback: action => {

              }
            });
          },
          bannerUps(response, file, fileList){
            this.imgs=response.src
          },
          //查看原图
          bigImg(e){
            this.show=true;
            this.bigsrc=e.target.currentSrc;
          },
          //隐藏原图
          small(){
            this.show=false;
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
            zhuan(1,10,2,this.form.num,date1,date2).then(response => {
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
            zhuan(e,10,2).then(response => {
              const data = response;
               if(data.msg==1){
                  this.tableData=data.page.result
                  this.totalPages=data.page.totalRow
               }
            }).catch(error => {
              reject(error);
            }); 
          },
          // 客服介入
          kedialogs(id){
            this.keId=id;
            this.kedialog=true
          },
          kefu(){
            var that=this;
            this.kedialog=false
            if(this.imgs==''){
              this.$message.warning('请上传图片')
            }else{
              customerServiceIn(this.keId,'刷手已退款',this.imgs).then(response => {
                const data = response;
                 if(data.msg==1){
                  this.$message.success('提交成功')
                  setTimeout(function(){
                    that.$router.go(0)
                  },500)
                 }else if(data.msg==3){
                  this.$message.error('当前状态不是已转账状态，不能进行客服介入')
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
  .row-bg .el-table .table-header{
    background:#f8f8f8;
  }
  .queryBox{
    display:block;
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
  .touBox .touLists{
    border-bottom:1px dashed #e8e8e8;
    margin:10px 0;
    padding:10px 0;
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
  .loading-tips{
    text-align:left;
    font-size:14px;
    line-height:30px;
    overflow:hidden;
  }
  .loading-tipss{
    display:flex;
  }
  .loading-tipss .alert-label{
     display:block;
  }
  .loading-ge{
    border-bottom:1px dashed rgba(0,0,0,0.09);
    padding:10px 0;
  }
  .loading-tips .loading-list{
    width:50%;
    float:left;
    color:rgba(0,0,0,0.45);
  }
  .task .loading-tips .alert-label{
    margin-right:10px;
    color:rgba(0,0,0,0.85);
    font-weight:100;
  }
</style>
