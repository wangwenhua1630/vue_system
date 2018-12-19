<template>
  <div>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="store-inner">
          <el-tabs @tab-click="tabs">
            <el-tab-pane label="任务处罚列表" ></el-tab-pane>
            <el-tab-pane label="多退少补列表" ></el-tab-pane>
          </el-tabs>
          <el-form ref="form" :model="form" class="queryBox" label-width="70px"  size="small" :inline="true">
            <el-form-item label="问题条件" v-if='tabIndex==0' >
              <el-select v-model="form.state" placeholder="请选择" >
                <el-option label="淘宝客" value="1"></el-option>
                <el-option label="要挟" value="2"></el-option>
                <el-option label="要求返现，否则差评" value="3"></el-option>
                <el-option label="刷错商品" value="5"></el-option>
                <el-option label="买家已退款" value="6"></el-option>
                <el-option label="其他违规操作" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工单状态" v-if='tabIndex==0'  >
              <el-select v-model="form.gong_state" placeholder="请选择" >
                <el-option label="待处理" value="1"></el-option>
                <el-option label="待执行" value="2"></el-option>
                <el-option label="已撤销" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工单状态" v-if='tabIndex==1'  >
              <el-select v-model="form.states" placeholder="请选择" >
                <el-option label="补交待处理" value="4"></el-option>
                <el-option label="补交已处理" value="5"></el-option>
                <el-option label="拒绝处理" value="6"></el-option>
                <el-option label="处理中" value="7"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单编号">
              <el-input v-model="form.order_num" ></el-input>
            </el-form-item>
            <el-form-item label="任务编号">
              <el-input v-model="form.task_num" ></el-input>
            </el-form-item>
            <el-form-item label="时间" v-if='tabIndex==1'>
              <el-date-picker type="daterange"  v-model='form.date' range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click='search' >查询</el-button>
            </el-form-item>
          </el-form>
          <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%"  v-if='tabIndex==0'  header-row-class-name="table-header" border >
            <el-table-column prop="idNum" label="任务编号"  header-align="center">
            </el-table-column>
            <el-table-column  prop="orderId" label="订单编号" header-align="center">
            </el-table-column>
            <el-table-column prop="problemCondition" label="问题分类"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="punishMoney" label="处罚金额"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="cardHang" label="工单状态"  show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <p v-if='scope.row.workOtherStatus==1' >待处理</p>
                <p v-if='scope.row.workOtherStatus==2' >待执行</p>
                <p v-if='scope.row.workOtherStatus==3' >已撤销</p>
              </template>
            </el-table-column>
            <el-table-column prop="createAt" label="创建时间"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="cardTime" label="操作"  show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <el-button type="primary"  size="small" round plain @click='message(scope.row.id)'>查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table  ref="multipleTable" :data="tableDatas" tooltip-effect="dark"  style="width: 100%"   v-if='tabIndex==1' header-row-class-name="table-header" border >
            <el-table-column prop="idNum" label="任务编号"  header-align="center">
            </el-table-column>
            <el-table-column  prop="orderId" label="订单编号" header-align="center">
            </el-table-column>
            <el-table-column prop="guaranteeMoney" label="商品价格"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="payMoney" label="支付差价"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="cardHang" label="工单状态"  show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <p v-if='scope.row.workOtherStatus==4' >补交待处理</p>
                <p v-if='scope.row.workOtherStatus==5' >补交已处理</p>
                <p v-if='scope.row.workOtherStatus==6' >拒绝处理</p>
                <p v-if='scope.row.workOtherStatus==7' >处理中</p>
              </template>
            </el-table-column>
            <el-table-column prop="createAt" label="创建时间"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="cardTime" label="操作"  show-overflow-tooltip header-align="center" width='260' >
              <template slot-scope="scope">
                <el-button type="primary"  size="mini" round plain v-if='scope.row.workOtherStatus!=4&&scope.row.workOtherStatus!=7' @click='buLook(scope.row.workOtherStatus,scope.$index)' >查看</el-button>
                <el-button type="primary"  size="mini" round plain v-if='scope.row.workOtherStatus==7' @click='buUp(scope.row.id)' >上传凭证</el-button>
                <el-button type="primary"  size="mini" round plain v-if='scope.row.workOtherStatus==4' @click='messageLook(scope.$index)' >查看</el-button>
                <el-button type="primary"  size="mini" round plain v-if='scope.row.workOtherStatus==4' @click='buYes(scope.$index)' >同意处理</el-button>
                <el-button type="primary"  size="mini" round plain v-if='scope.row.workOtherStatus==4' @click='buNo(scope.$index)' >拒绝处理</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="CurrentChange"
            layout="prev, pager, next"
            :total="totalPages"
            :page-size='3'>
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <!-- 查看详情 -->
    <el-dialog  title="查看详情" :visible.sync="messagedialog" width='60%' >
        <el-row class="contain row-bg taskInfos" type="flex"  justify="center">
          <el-col>
            <ul class="loading-tips loading-ge">
              <li class='loading-list'><label class='alert-label' >申诉类型：</label>{{messageInfo.appealType}}</li>
              <li class='loading-list'><label class='alert-label'>差价金额:</label>{{messageInfo.payMoney}}</li>
              <li class='loading-list'><label class='alert-label'>任务编号：</label>{{messageInfo.idNum}}</li>
              <li class='loading-list'><label class='alert-label'>发起时间：</label>{{messageInfo.createAt}}</li>
            </ul>
            <div class="loading-tips loading-ge loading-tipss">
              <label class='alert-label'>申诉图：</label>
              <img :src="messageInfo.handPic"  alt="" class='up-imgs' @click="bigImg" >
            </div>
          </el-col>
        </el-row>
    </el-dialog>
    <!-- **拒绝处理查看详情** -->
    <el-dialog  title="查看详情" :visible.sync="lookdialog" width='60%' >
        <el-row class="contain row-bg taskInfos" type="flex"  justify="center">
          <el-col>
            <ul class="loading-tips loading-ge">
              <li class='loading-list'><label class='alert-label' >申诉类型：</label>{{messageInfo.appealType}}</li>
              <li class='loading-list'><label class='alert-label'>差价金额:</label>{{messageInfo.payMoney}}</li>
              <li class='loading-list'><label class='alert-label'>任务编号：</label>{{messageInfo.idNum}}</li>
              <li class='loading-list'><label class='alert-label'>发起时间：</label>{{messageInfo.createAt}}</li>
            </ul>
            <div class="loading-tips loading-ge loading-tipss">
              <label class='alert-label'>申诉图：</label>
              <img :src="messageInfo.handPic" alt="" class='up-imgs' @click="bigImg" >
            </div>
            <div class="loading-tips loading-ge loading-tipss">
              <label class='alert-label'>拒绝处理原因：</label>
              {{messageInfo.refuseDispose}}
            </div>
            <div class="loading-tips loading-ge loading-tipss">
              <label class='alert-label'>拒绝处理图：</label>
              <div class='tipBox'>
                <img :src="messageInfo.merchantPic" alt="" class='up-imgs' @click="bigImg" >
              </div>
            </div>
          </el-col>
        </el-row>
    </el-dialog>
    <!-- **已处理查看详情** -->
    <el-dialog  title="查看详情" :visible.sync="looksdialog" width='60%' >
        <el-row class="contain row-bg taskInfos" type="flex"  justify="center">
          <el-col>
            <ul class="loading-tips loading-ge">
              <li class='loading-list'><label class='alert-label' >申诉类型：</label>{{messageInfo.appealType}}</li>
              <li class='loading-list'><label class='alert-label'>差价金额:</label>{{messageInfo.payMoney}}</li>
              <li class='loading-list'><label class='alert-label'>任务编号：</label>{{messageInfo.idNum}}</li>
              <li class='loading-list'><label class='alert-label'>发起时间：</label>{{messageInfo.createAt}}</li>
            </ul>
            <div class="loading-tips loading-ge loading-tipss">
              <label class='alert-label'>刷手提交问题凭证：</label>
              <img :src="messageInfo.handPic" alt="" class='up-imgs' @click="bigImg" >
            </div>
            <div class="loading-tips loading-ge loading-tipss">
              <label class='alert-label'>商家处理凭证：</label>
              <div class='tipBox'>
                <img :src="messageInfo.merchantPic" alt="" class='up-imgs' @click="bigImg" >
              </div>
            </div>
          </el-col>
        </el-row>
    </el-dialog>
    <!--**图片放大**-->
    <div class="mask" v-show="show" @click="small">
      <img :src="bigsrc" alt="" class="bigimg">
    </div>
    <!-- **已处理上传凭证** -->
    <el-dialog  title="上传凭证" :visible.sync="overupdialog" width='60%' >
        <el-row class="contain row-bg taskInfos" type="flex"  justify="center">
          <el-col>
            <ul class="loading-tips loading-ge">
              <li class='loading-list'><label class='alert-label' >申诉类型：</label>{{messageInfo.appealType}}</li>
              <li class='loading-list'><label class='alert-label'>差价金额:</label>{{messageInfo.payMoney}}</li>
              <li class='loading-list'><label class='alert-label'>任务编号：</label>{{messageInfo.idNum}}</li>
              <li class='loading-list'><label class='alert-label'>发起时间：</label>{{messageInfo.createAt}}</li>
            </ul>
            <div class="loading-tips loading-ge loading-tipss">
              <label class='alert-label'>刷手提交问题凭证：</label>
              <img :src="messageInfo.handPic" alt="" class='up-imgs' @click="bigImg" >
            </div>
            <div class="loading-tips loading-ge loading-tipss">
              <label class='alert-label'>商家处理凭证上传：</label>
              <div class='tipBox'>
                <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
                          :on-remove="handleRemoves"
                           :on-success="bannerUp" :limit="4" :on-exceed="handleExceeds" class="up_load">
                  <i class="el-icon-plus"></i>
                </el-upload>
              </div>
            </div>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="overupdialog = false" size='small'>取消</el-button>
          <el-button type="primary" @click="overconfirm" size='small'>确定</el-button>
        </span>
    </el-dialog>
    <!-- **未处理上传凭证** -->
     <el-dialog  title="上传凭证" :visible.sync="noupdialog" width='60%' >
        <el-row class="contain row-bg taskInfos" type="flex"  justify="center">
          <el-col>
            <ul class="loading-tips loading-ge">
              <li class='loading-list'><label class='alert-label' >申诉类型：</label>{{messageInfo.appealType}}</li>
              <li class='loading-list'><label class='alert-label'>差价金额:</label>{{messageInfo.payMoney}}</li>
              <li class='loading-list'><label class='alert-label'>任务编号：</label>{{messageInfo.idNum}}</li>
              <li class='loading-list'><label class='alert-label'>发起时间：</label>{{messageInfo.createAt}}</li>
            </ul>
            <div class="loading-tips loading-ge loading-tipss">
              <label class='alert-label'>申诉图：</label>
              <img :src="messageInfo.handPic" alt="" class='up-imgs' @click="bigImg" >
            </div>
            <div class="loading-tips loading-ge loading-tipss">
              <label class='alert-label'>拒绝处理原因：</label>
              <el-input v-model="why" size='small' class='noInp' ></el-input>
            </div>
            <div class="loading-tips loading-ge loading-tipss">
              <label class='alert-label'>拒绝处理图：</label>
              <div class='tipBox'>
                  <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
                          :on-remove="handleRemoves"
                           :on-success="bannerUp" :limit="4" :on-exceed="handleExceeds" class="up_load">
                    <i class="el-icon-plus"></i>
                  </el-upload>
              </div>
            </div>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="noupdialog = false" size='small'>取消</el-button>
          <el-button type="primary" @click="noconfirm" size='small'>确定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
    import {fa,tuiBu,consentOrRefusal,uploadMerchantPic} from '../../api/custom';
    export default {
        name: "index",
        data(){
          return{
            form:{
              order_num:'',
              task_num:'',
              state: '',
              date:''
            },
            why:'',
            lookdialog:false,
            looksdialog:false,
            updialog:false,
            overupdialog:false,
            noupdialog:false,
            messagedialog:false,
            bigsrc:'',//放大图片的地址
            show:false,  //放大图片的遮造层
            tableData:[],
            tableDatas:[],
            banner:[],
            overUpId:'',
            noUpId:'',
            messageInfo:'',
            tabIndex:0,
            totalPages:0
          }
        },
        mounted(){
          fa(1,3).then(response => {
            const data = response;
             if(data.msg==1){
                if(data.page==null){
                  this.tableData=[]
                  this.totalPages=0
                }else{
                   this.tableData=data.page.result
                   this.totalPages=data.page.totalRow
                }
             }
          }).catch(error => {
            reject(error);
          }); 
        },
        methods:{
          //===查看原图
          bigImg(e){
            console.log(e);
            this.show=true;
            this.bigsrc=e.target.currentSrc;
          },
          //===隐藏原图
          small(){
            this.show=false;
          },
          // =====截图上传
          bannerUp(response, file, fileList){
            this.banner.push(file.url);
          },
          handleRemoves(file){
            let that=this;
            this.banner.forEach(function(item,index){
              if(file.url==item){
                that.banner.splice(index,1)
              }
            });
          },
          handleExceeds(){
            this.$alert('只能上传4张图片',  {
              confirmButtonText: '确定',
              callback: action => {

              }
            });
          },
          // 查看详情
          messageLook(index){
            this.messagedialog=true
          },
          // 跳转详情
          message(ids){
            var tabIndex=this.tabIndex
            this.$router.push({
              name:'customMessage',
              params: {
                id:ids
              }
            })
          },
          // tab切换
          tabs(tab, event){
            this.tabIndex=tab.index
            if(tab.index==0){
              fa(1,3).then(response => {
                const data = response;
                 if(data.msg==1){
                    if(data.page==null){
                      this.tableData=[]
                      this.totalPages=0
                    }else{
                       this.tableData=data.page.result
                       this.totalPages=data.page.totalRow
                    }
                 }
              }).catch(error => {
                reject(error);
              }); 
            }else{
              tuiBu(1,3).then(response => {
                const data = response;
                 if(data.msg==1){
                    if(data.page==null){
                      this.tableDatas=[]
                      this.totalPages=0
                    }else{
                       this.tableDatas=data.page.result
                       this.totalPages=data.page.totalRow
                    }
                 }
              }).catch(error => {
                reject(error);
              }); 
            }
          },
           // 分页查询
          CurrentChange(e){
            if(this.tabIndex==0){
              fa(e,3,this.form.state,this.form.task_num,this.form.order_num,this.form.gong_state).then(response => {
                const data = response;
                 if(data.msg==1){
                    if(data.page==null){
                      this.tableData=[]
                      this.totalPages=0
                    }else{
                       this.tableData=data.page.result
                       this.totalPages=data.page.totalRow
                    }
                 }
              }).catch(error => {
                reject(error);
              }); 
            }else{
              tuiBu(e,3).then(response => {
                const data = response;
                 if(data.msg==1){
                    if(data.page==null){
                      this.tableDatas=[]
                      this.totalPages=0
                    }else{
                       this.tableDatas=data.page.result
                       this.totalPages=data.page.totalRow
                    }
                 }
              }).catch(error => {
                reject(error);
              }); 
            }
          },
          // 条件查询
          search(){

            if(this.tabIndex==0){
              fa(1,3,this.form.state,this.form.task_num,this.form.order_num,this.form.gong_state).then(response => {
                const data = response;
                 if(data.msg==1){
                    if(data.page==null){
                      this.tableData=[]
                      this.totalPages=0
                    }else{
                       this.tableData=data.page.result
                       this.totalPages=data.page.totalRow
                    }
                 }
              }).catch(error => {
                reject(error);
              }); 
            }else{
              var date1 
              var date2
              if(this.form.date==null){
                 date1=null
                 date2=null
              }else{
                date1=this.form.date[0]
                date2=this.form.date[1]
              }
              tuiBu(1,3,this.form.task_num,this.form.order_num,this.form.states,date1,date2).then(response => {
                const data = response;
                 if(data.msg==1){
                    if(data.page==null){
                      this.tableDatas=[]
                      this.totalPages=0
                    }else{
                       this.tableDatas=data.page.result
                       this.totalPages=data.page.totalRow
                    }
                 }
              }).catch(error => {
                reject(error);
              }); 
            }
          },
          // 多退少补查看
          buLook(type,index){
            console.log(index)
            this.messageInfo=this.tableDatas[index]
            if(type==5){
              this.looksdialog=true
            }else{
              this.lookdialog=true
            }
          },
          // 已处理上传
          buUp(id){
            this.overupdialog=true
            this.overUpId=id
          },
          overconfirm(){
           uploadMerchantPic(this.overUpId,'123456.pic').then(response => {
              const data = response;
               if(data.msg==1){
                  this.$router.go(0)
               }
            }).catch(error => {
              reject(error);
            });
          },
          // 拒绝处理上传
          buNo(index){
            this.noupdialog=true
            this.noUpId=index
          },
          noconfirm(){
            if(this.why==''){
              this.$message.warning('请填写拒绝原因')
            }else{
              consentOrRefusal(this.tableDatas[this.noUpId].id,6,this.why,'123456.pic').then(response => {
                const data = response;
                 if(data.msg==1){
                    this.$router.go(0)
                 }
              }).catch(error => {
                reject(error);
              });
            }
          },
          // 同意处理
          buYes(index){
            var that=this;
            consentOrRefusal(this.tableDatas[index].id,5,).then(response => {
              const data = response;
               if(data.msg==1){
                  this.$message.success('已同意处理，去转账')
                  setTimeout(function(){
                    that.$router.push('/store/product')
                  },500)
               }
            }).catch(error => {
              reject(error);
            }); 
          }
        }
    }
</script>

<style scoped>
  .store-inner{
    background:#fff;
    padding:20px;
    height:100%;
  }
  .queryBox{
    display:block;
    float:left;
  }
  #app .first-box .el-table .table-header{
    background:#f5f7fa;
  }
  .el-table th, .el-table tr.table-header{
    background:#f5f7fa;
  }
  a{
    color:#1890FF;
  }
  a:hover{
    color:#fff;
  }
  .loading-tips{
    text-align:left;
    font-size:14px;
    line-height:30px;
    overflow:hidden;
  }
  .loading-ge{
    border-bottom:1px solid rgba(0,0,0,0.09);
    padding:10px 0;
  }
  .loading-tips .loading-list{
    width:50%;
    float:left;
    color:rgba(0,0,0,0.45);
  }
  .loading-tips .alert-label{
    margin-right:10px;
    color:#000;
  }
  .loading-tipss{
    display:flex;
  }
  .loading-tipss .alert-label{
     display:block;
  }
  .taskInfos .el-dialog__header{
    border:1px solid rgba(0,0,0,0.09);
  }
  .taskInfos .loading-ge .up-imgs{
    width:160px;
    height:100px;
    cursor: pointer;
    margin-right:20px;
  }
  .taskInfos .tipBox{
    display:flex;
    width:75%;
    flex-wrap:wrap;
  }
  .taskInfos .loading-ge .tipBox .up-imgs{
    margin-bottom:20px;
  }
  .noInp{
    width:50%;
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
