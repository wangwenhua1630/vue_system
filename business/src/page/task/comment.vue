<template>
  <div class='comment'>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="first-box">
          <p class='break'>任务评价管理</p>
          <el-form ref="form" :model="form" class="queryBox" label-width="76px"  size="small" :inline="true">
            <el-form-item>
              <el-select v-model="form.tai" placeholder="所属平台">
                <el-option :label="item.name" :value="item.id" v-for="(item,index) in tai" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="form.state" placeholder="评价状态" >
                <el-option label="未设置评价" value="0"></el-option>
                <el-option label="已设置好评，等待刷手接单" value="1"></el-option>
                <el-option label="刷手已接单" value="2"></el-option>
                <el-option label="刷手完成任务，等待商家审核" value="3"></el-option>
                <el-option label="好评审核通过" value="4"></el-option>
                <el-option label="好评审核不通过" value="5"></el-option>
                <el-option label="取消好评" value="6"></el-option>
                <el-option label="已设置追评，等待刷手接单" value="7"></el-option>
                <el-option label="刷手已接单" value="8"></el-option>
                <el-option label="刷手完成任务，等待商家审核" value="9"></el-option>
                <el-option label="追评审核通过" value="10"></el-option>
                <el-option label="追评审核不通过" value="11"></el-option>
                <el-option label="取消追评" value="12"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item >
              <el-select v-model="form.cha" >
                <el-option label="任务编号" value="1"></el-option>
                <el-option label="订单编号" value="2"></el-option>
                <el-option label="商品名称" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item >
              <el-input v-model="form.num" placeholder='查询条件' ></el-input>
            </el-form-item>
            <el-form-item label="发布时间">
              <el-date-picker type="daterange" v-model='form.date':default-time="['00:00:00', '23:59:59']" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round size='mini' class='style-btn' @click='search' >查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" round size='mini' @click='allHe' >一键审核</el-button>
            </el-form-item>
          </el-form>
          <el-table  ref="multipleTable" :data="tableData" :row-class-name="tableRowClassName" tooltip-effect="dark"  style="width: 100%"  header-row-class-name="table-header" @selection-change='selection'>
            <el-table-column type="selection"  width="55" header-align="center">
            </el-table-column>
            <el-table-column label="所属平台" header-align="center"  show-overflow-tooltip width="100">
              <template slot-scope="scope">
                <p class='task-list'><span class='table-label'>{{scope.row.adminStoreType.name}}</span></p>
              </template>
            </el-table-column>
            <el-table-column prop="task_num" label="任务/订单编号" header-align="center"  show-overflow-tooltip >
             <template slot-scope="scope">
                <p class='task-list'>任务编号：<span class='table-label'>{{scope.row.idNum}}</span> </p>
                <p class='task-list'>订单编号：<span class='table-label'>{{scope.row.orderId}}</span></p>
              </template>
            </el-table-column>
            <el-table-column  label="买号/商品信息"  show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <p class='task-list'>买号：<span class='table-label'>{{scope.row.handTaoAccount}}</span></p>
                <p class='task-list'>店铺名称：<span class='table-label'>{{scope.row.storeName}}</span></p>
              </template>
            </el-table-column>
            <el-table-column label="好评内容"  prop='good' header-align="center" >
              <template slot-scope="scope">
                <p class='ping-text'>{{scope.row.goodEvaluate}}</p>
                <p class='ping-tu' v-if='scope.row.goodStatus==0'>图片评价：未设置</p>
                <p class='ping-tu' v-if='scope.row.goodStatus>0' @click="kan(scope.row.id,1)">查看图片</p>
              </template>
            </el-table-column>
            <el-table-column label="追评内容"  prop='zhui' header-align="center" >
              <template slot-scope="scope">
                <p class='ping-text'>{{scope.row.addEvaluate}}</p>
                <p class='ping-tu' v-if='scope.row.addStatus==0'>图片评价：未设置</p>
                <p class='ping-tu' v-if='scope.row.addStatus>0' @click="kan(scope.row.id,2)">查看图片</p>
              </template>
            </el-table-column>
            <el-table-column label="评价状态"  header-align="center" width='160' >
              <template slot-scope="scope">
                <p class='task-listss' v-if='scope.row.goodStatus==0'>未设置</p>
                <p class='task-listss' v-if='scope.row.goodStatus==1'>已设置好评</p>
                <p class='task-listss' v-if='scope.row.goodStatus==2'>刷手已接单</p>
                <p class='task-listss' v-if='scope.row.goodStatus==3'>等待商家审核</p>
                <p class='task-listss' v-if='scope.row.goodStatus==4'>好评审核通过</p>
                <p class='task-listss' v-if='scope.row.goodStatus==5'>好评审核不通过</p>
                <p class='task-listss' v-if='scope.row.goodStatus==6'>取消好评</p>
                <p class='task-listss' v-if='scope.row.addStatus==1'>已设置追评</p>
                <p class='task-listss' v-if='scope.row.addStatus==2'>刷手已接单</p>
                <p class='task-listss' v-if='scope.row.addStatus==3'>等待商家审核</p>
                <p class='task-listss' v-if='scope.row.addStatus==4'>追评审核通过</p>
                <p class='task-listss' v-if='scope.row.addStatus==5'>追评审核不通过</p>
                <p class='task-listss' v-if='scope.row.addStatus==6'>取消追评</p>
                <p class='task-lists'>发布时间：<span class='table-label'>{{scope.row.issueAt}}</span></p>
                <p class='task-lists'>接收时间：<span class='table-label' >{{scope.row.createAt}}</span></p>
              </template>
            </el-table-column>
            <el-table-column   label="操作"  header-align="center" width='140'>
              <template slot-scope="scope">
                <el-button type="primary" plain round size="mini" @click="selfComment(scope.row.id,1)" v-if='scope.row.goodStatus==0||scope.row.goodStatus==6'>设置好评</el-button>
                <el-button type="primary" plain round size="mini" @click="selfComment(scope.row.id,2)" v-if='scope.row.addStatus==0&&scope.row.goodStatus==1||scope.row.addStatus==6&&scope.row.goodStatus==1||scope.row.addStatus==6'>设置追评</el-button>
                <el-button type="danger" plain round size="mini" @click="cancelComment(scope.row.id,1)" v-if='scope.row.goodStatus==1' >取消好评</el-button>
                <el-button type="danger" plain round size="mini" @click="cancelComment(scope.row.id,2)" v-if='scope.row.addStatus==1' >取消追评</el-button>
                <el-button type="success" plain round size="mini" @click="lookImg(scope.$index,1)" v-if='scope.row.goodStatus==3&&(scope.row.evaluateType==2||scope.row.evaluateType==5||scope.row.evaluateType==6)||scope.row.goodStatus==4&&(scope.row.evaluateType==2||scope.row.evaluateType==5||scope.row.evaluateType==6)||scope.row.goodStatus==5&&(scope.row.evaluateType==2||scope.row.evaluateType==5||scope.row.evaluateType==6)' >查看好评截图</el-button>
                <el-button type="success" plain round size="mini" @click="lookImg(scope.$index,2)" v-if='scope.row.addStatus==3&&(scope.row.evaluateType==4||scope.row.evaluateType==6)||scope.row.addStatus==4&&(scope.row.evaluateType==4||scope.row.evaluateType==6)||scope.row.addStatus==5&&(scope.row.evaluateType==4||scope.row.evaluateType==6)' >查看追评截图</el-button>
                <el-button type="warning" plain round size="mini" @click="ckechCommit(scope.row.id,1,scope.$index)" v-if='scope.row.goodStatus==3' >好评截图审核</el-button>
                <el-button type="warning" plain round size="mini" @click="ckechCommit(scope.row.id,2,scope.$index)" v-if='scope.row.addStatus==3' >追评截图审核</el-button>
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
    <!--**取消评价**-->
    <el-dialog title='取消评价' width='30%' :visible.sync="hiddedialog" >
      <p class='hidde-title'>您将取消本次追评任务，请输入支付密码确认。</p>
      <el-input  type='password' v-model="input" placeholder="请输入密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary' @click="cancelConfirm" size="small" >确认</el-button>
        <el-button @click="hiddedialog = false" size="small" >取消</el-button>
      </span>
    </el-dialog>
    <!--**查看好评截图**-->
    <el-dialog title='查看好评截图' width='30%' :visible.sync="missdialog" >
      <img :src="picImg" alt="" class='ups-img' @click="bigImg" >
      <span slot="footer" class="dialog-footer">
        <el-button type='primary' @click="missdialog = false" size="small">关闭</el-button>
      </span>
    </el-dialog>
    <!--查看图片-->
    <el-dialog title='查看好评图片' width='30%' :visible.sync="kandialog" >
      <img :src="kanImg" alt="" class='ups-img'>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary' @click="kandialog = false" size="small">关闭</el-button>
      </span>
    </el-dialog>
    <!--**查看好评截图审核**-->
    <el-dialog title='查看好评截图' width='30%' :visible.sync="commentdialog" >
      <img :src="goodImg" alt="" class='ups-img' @click="bigImg" >
      <span slot="footer" class="dialog-footer">
        <el-button type='primary'  @click="checkConfrim(1)" size="small">通过</el-button>
        <el-button @click="checkConfrim(2)" size="small">不通过</el-button>
      </span>
    </el-dialog>
    <!--**设置好评内容**-->
    <el-dialog title='设置评价内容' width='40%'  label-position="left" :visible.sync="kedialog" >
      <el-form label-width="120px" class='commentForm' :model="forms" :rules="rules" ref="forms" >
        <el-form-item label='选择评价类型' prop='resource' >
          <el-radio-group v-model="forms.resource" size="medium">
            <el-radio label="1">文字好评(1.5个发布点)</el-radio>
            <el-radio label="2">晒图好评(3.0个发布点)</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label='设置好评内容'  prop='inner'>
          <el-input type="textarea" v-model="forms.inner" placeholder='请输入6-500字的评价内容'   :autosize="{ minRows:5, maxRows: 6}" ></el-input>
        </el-form-item>
        <el-form-item label='上传图片' v-if='forms.resource==2' >
           <el-upload action="http://www.rwgh66.com/sd-web/merchant/upload" list-type="picture-card" :on-remove="handleRemove" :limit="4" :on-exceed="handleExceeds"  :on-success="bannerUp">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label='支付密码' prop='password' >
          <el-input type='password' v-model="forms.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary' @click="commentConfirm('forms')" size="small">确认付款</el-button>
        <el-button @click="kedialog = false" size="small">取消</el-button>
      </span>
    </el-dialog>
    <!--**图片放大**-->
    <div class="mask" v-show="show" @click="small">
      <img :src="bigsrc" alt="" class="bigimg">
    </div>
  </div>
</template>

<script>
    import {findHandTaskInfo,findHandTaskInfo1,setGoodEvaluate,setAddEvaluate,cancelEvaluate,auditHandTasks,auditHandTask,pic,formatDate,kanImg} from '../../api/task';
    export default {
        name: "goods",
        data(){
          return{
            tai:'',
            form:{
              num:'',
              state: '',
              date:'',
              tai:''
            },
            forms:{
              resource:'',
              inner:'',
              password:''
            },
            totalPages:0,
            commentId:'',
            tableData:[],
            imgData:[],
            picImg:'',
            kanImg:'',
            check:[],
            hiddedialog:false,
            missdialog:false,
            kandialog:false,
            kedialog:false,
            commentdialog:false,
            show:false,
            dialogImageUrl: '',
            dialogVisible: false,
            commentTyps:'',
            input:'',
            bigsrc:'',
            goodImg:'',
            imgs:'',
            rules:{
              resource:[{required:true,trigger:'change',message:'请选择评价类型'}],
              password:[{required:true,trigger:'blur',message:'请输入支付密码'}],
              inner:[{required:true,trigger:'blur',message:'请输入好评内容'}]
            } 
          }
        },
        mounted(){
          findHandTaskInfo(1,10,'','','','','','','').then(response => {
            const data = response;
             if(data.msg==1){
               this.tai=data.types;
                this.tableData=data.page.result
                for(var i=0;i<data.page.result.length;i++){
                  this.tableData[i].storeName=data.page.result[i].store.name
                  this.tableData[i].keyword=data.page.result[i].require.keyword
                  this.tableData[i].orderId=data.page.result[i].handTaskEvaluateImg.tradeNo
                }
                this.tableData=data.page.result
                this.totalPages=data.page.totalRow
             }else if(data.msg==3){
                 this.tableData=[]
                 this.totalPages=0
             }
          }).catch(error => {
            reject(error);
          }); 
        },  
        methods:{
          //查看评论图片
          kan(id,status){
            var that=this;
            kanImg(id,status).then(response=>{
              const data=response;
              if(data.msg==1){
                that.kanImg=data.pic.goodEvaluatePic;
                this.kandialog=true;
              }
              else if(data.msg==3){
                that.kanImg='';
              }
            })
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
          // 查看截图
          lookImg(id,types){
            this.missdialog=true
            // pic(id,types).then(response => {
            //   const data = response;
            //    if(data.msg==1){
            //       this.picImg=data.pic.goodEvaluatePic
            //    }else if(data.msg==3){
            //       this.$message.error('此任务未文字评价')
            //    }
            // }).catch(error => {
            //   reject(error);
            // });
            console.log(id);
            this.imgData=this.tableData[id];
            if(types==1){
              this.picImg=this.imgData.handTaskEvaluateImg.goodImg;
            }else{
              this.picImg=this.imgData.handTaskEvaluateImg.addImg;
            }

          },
          handleRemove(file, fileList) {
            console.log(file, fileList);
          },
          handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
          },
          handleExceeds(){
            this.$alert('只能上传4张图片',  {
              confirmButtonText: '确定',
              callback: action => {

              }
            });
          },
          bannerUp(response, file, fileList){
            this.imgs=response.src
          },
           // 表格颜色
          tableRowClassName({row, rowIndex}){
            if (rowIndex %2 == 1) {
              return 'warning-row';
            }
            return '';
          },
           // 条件查询
          search(){
            var result=''
            var results=''
            var resultss=''
            if(this.form.cha==1){
              result=this.form.num
              results=''
              resultss=''
            }else if(this.form.cha==2){
              result=''
              results=this.form.num
              resultss=''
            }else{
              result=''
              results=''
              resultss=this.form.num
            }
            var date1 
            var date2
            if(this.form.date==null){
               date1=null
               date2=null
            }else{
              date1=formatDate(new Date(this.form.date[0]))
              date2=formatDate(new Date(this.form.date[1]))
            }
            var addStatus=''; var goodStatus='';

            if(this.form.state==1||this.form.state==2||this.form.state==3||this.form.state==4||this.form.state==5||this.form.state==6){
              addStatus=''
              goodStatus=this.form.state
            }else if(this.form.state==7){
              addStatus=1
              goodStatus=''
            }else if(this.form.state==8){
              addStatus=2
              goodStatus=''
            }else if(this.form.state==9){
              addStatus=3
              goodStatus=''
            }else if(this.form.state==10){
              addStatus=4
              goodStatus=''
            }else if(this.form.state==11){
              addStatus=5
              goodStatus=''
            }else if(this.form.state==12){
              addStatus=6
              goodStatus=''
            }
            findHandTaskInfo1(1,10,this.form.tai,result,results,resultss,date1,date2,goodStatus,addStatus).then(response => {
              const data = response;
               if(data.msg==1){
                 this.tableData=data.page.result
                  for(var i=0;i<data.page.result.length;i++){
                    this.tableData[i].storeName=data.page.result[i].store.name
                    this.tableData[i].keyword=data.page.result[i].require.keyword
                    this.tableData[i].orderId=data.page.result[i].handTaskEvaluateImg.tradeNo
                  }
                  this.tableData=data.page.result
                  this.totalPages=data.page.totalRow
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
            var result=''
            var results=''
            var resultss=''
            if(this.form.cha==1){
              result=this.form.num
              results=''
              resultss=''
            }else if(this.form.cha==2){
              result=''
              results=this.form.num
              resultss=''
            }else{
              result=''
              results=''
              resultss=this.form.num
            }
            var date1 
            var date2
            if(this.form.date==null){
               date1=null
               date2=null
            }else{
              date1=formatDate(new Date(this.form.date[0]))
              date2=formatDate(new Date(this.form.date[1]))
            }
            var addStatus=''; var goodStatus='';

            if(this.form.state==1||this.form.state==2||this.form.state==3||this.form.state==4||this.form.state==5||this.form.state==6){
              addStatus=''
              goodStatus=this.form.state
            }else if(this.form.state==7||this.form.state==8||this.form.state==9||this.form.state==10||this.form.state==11||this.form.state==12){
              addStatus=this.form.state
              goodStatus=''
            }
             findHandTaskInfo(e,10,this.form.tai,result,results,resultss,date1,date2,goodStatus,addStatus).then(response => {
              const data = response;
               if(data.msg==1){
                  this.tableData=data.page.result
                  for(var i=0;i<data.page.result.length;i++){
                    this.tableData[i].storeName=data.page.result[i].store.name
                    this.tableData[i].keyword=data.page.result[i].require.keyword
                    this.tableData[i].orderId=data.page.result[i].handTaskEvaluateImg.tradeNo
                  }
                  this.tableData=data.page.result
                  this.totalPages=data.page.totalRow
               }
            }).catch(error => {
              reject(error);
            }); 
          },
          // 设置好评信息
          selfComment(id,types){
            this.commentId=id
            this.commentTyps=types
            this.kedialog=true;
          },
          commentConfirm(formName){
            var that=this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                  // this.kedialog=false
                  console.log(this.commentTyps);
                  if(this.commentTyps==1){
                      this.kedialog=false
                      if(this.forms.resource==1){
                        setGoodEvaluate(this.commentId,this.forms.password,this.forms.resource,this.forms.inner,this.imgs).then(response => {
                          const data = response;
                          if(data.msg==1){
                            this.$message.success('设置成功')
                            setTimeout(function(){
                              that.$router.go(0)
                            },500)
                          }else if(data.msg==4){
                            this.$message.error('密码错误')
                          }else if(data.msg==5){
                            this.$message.error('发布点不足')
                          }
                        }).catch(error => {
                          reject(error);
                        });
                      }else{
                        if(this.imgs){
                          setGoodEvaluate(this.commentId,this.forms.password,this.forms.resource,this.forms.inner,this.imgs).then(response => {
                            const data = response;
                            if(data.msg==1){
                              this.$message.success('设置成功')
                              setTimeout(function(){
                                that.$router.go(0)
                              },500)
                            }else if(data.msg==4){
                              this.$message.error('密码错误')
                            }else if(data.msg==5){
                              this.$message.error('发布点不足')
                            }
                          }).catch(error => {
                            reject(error);
                          });
                        }else{
                          this.$message.warning('请上传图片')
                        }
                      }
                  }else{
                      this.kedialog=false
                      if(this.forms.resource==1){
                        setAddEvaluate(this.commentId,this.forms.password,this.forms.resource,this.forms.inner,this.imgs).then(response => {
                          const data = response;
                          if(data.msg==1){
                            this.$message.success('设置成功')
                            setTimeout(function(){
                              that.$router.go(0)
                            },500)
                          }else if(data.msg==4){
                            this.$message.error('密码错误')
                          }else if(data.msg==3){
                            this.$message.error('还未设置好评，不能设置追评')
                          }
                        }).catch(error => {
                          reject(error);
                        });
                      }else{
                        if(this.imgs){
                          setAddEvaluate(this.commentId,this.forms.password,this.forms.resource,this.forms.inner,this.imgs).then(response => {
                            const data = response;
                            if(data.msg==1){
                              this.$message.success('设置成功')
                              setTimeout(function(){
                                that.$router.go(0)
                              },500)
                            }else if(data.msg==4){
                              this.$message.error('密码错误')
                            }else if(data.msg==3){
                              this.$message.error('还未设置好评，不能设置追评')
                            }
                          }).catch(error => {
                            reject(error);
                          });
                        }else{
                          this.$message.warning('请上传图片')
                        }
                      }
                  }
                } else {
                  console.log('error submit!!');
                  return false;
                }
             });
          },
          // 取消评价
          cancelComment(id,types){
            this.commentId=id
            this.comment_types=types
            this.hiddedialog=true
          },
          cancelConfirm(){
            var that=this;
            if(this.input==''){
              this.$message.warning('请输入支付密码')
            }else{
              cancelEvaluate(this.commentId,this.input,this.comment_types).then(response => {
                const data = response;
                 if(data.msg==1){
                  this.hiddedialog=false;
                   this.$message.success('已取消')
                   setTimeout(function(){
                    that.$router.go(0)
                   },500)
                 }else if(data.msg==4){
                    this.$message.error('密码错误')
                 }else if(data.msg==3){
                    this.$message.error('不能取消任何评价')
                 }
              }).catch(error => {
                reject(error);
              }); 
            }
          },
          // 复选框状态改变
          selection(val) {
            this.check = val;
          },
          // 一键审核
          allHe(){
            var ids=[];
            var that=this;
            for(var i=0;i<this.check.length;i++){
                ids.push(this.check[i].id)
            }
            if(ids==''){
              this.$message.warning('请至少选择一条内容')
            }else{
              this.$confirm('确认一键审核吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                auditHandTasks(ids).then(response => {
                  const data = response;
                   if(data.msg==1){
                     this.$message.success('审核成功')
                     setTimeout(function(){
                      that.$router.go(0)
                     },500)
                   }else if(data.msg==3){
                      this.$message.warning('没有要审核的任务')
                   }
                }).catch(error => {
                  reject(error);
                }); 
              })
            }
          },
          // 单条审核
          ckechCommit(id,types,index){
            this.commentId=id
            this.commentTyps=types
            if(types==1){
              this.goodImg=this.tableData[index].goodImg
            }else{
              this.goodImg=this.tableData[index].addImg
            }
            this.commentdialog=true
            
          },
          checkConfrim(check){
            var checkstatus=''
            var that=this;
            if(check==1&& this.commentTyps==1){
              checkstatus=1
            }else if(check==1&& this.commentTyps==2){
              checkstatus=3
            }else if(check==2&& this.commentTyps==1){
              checkstatus=2
            }else if(check==2&& this.commentTyps==2){
              checkstatus=4
            }

            auditHandTask(this.commentId,checkstatus).then(response => {
              const data = response;
              this.commentdialog=false
               if(data.msg==1){
                 this.$message.success('操作成功')
                 setTimeout(function(){
                  that.$router.go(0)
                 },500)
               }else if(data.msg==3){
                  this.$message.error('该信息不能被审核')
               }
            }).catch(error => {
              reject(error);
            }); 
          }
        }
    }
</script>

<style>
  .ping-text{
    text-align:left;
  }
  .ping-tu{
    color:#1890ff;
  text-align:left;
  }
  .first-box{
    background:#fff;
    padding:20px;
  }
  .table-label{
    color:rgba(0,0,0,0.45);
  }
  .commentForm .el-form-item__content{
    text-align:left;
  }
  .step{
    position: relative;
    margin-bottom:50px;
  }
  .step .step-title{
    font-size:14px;
    position: absolute;
    left:0;
  }
  .hidde-title{
    text-align:left;
    margin-bottom:20px;
  }
  .task-list{
    text-align:left;
  }
  .task-title{
    color:#1890FF;
  }
  .first-box .task-lists{
    text-align:left;
    font-size:14px;
  }
  .task-listss{
    text-align:left;
    color:#F5222D;
  }
  .task-look{
    text-align:left;
    color:#1890FF;
    font-size:12px;
    cursor:pointer;
  }
  .queryBox{
    display:block;
    text-align:left;
  }
  .expandBox{
    width:100%;
    text-align:left;
    line-height:30px;
    overflow:hidden;
  }
  .expandBox .expand-list{
    width:50%;
    float:left;
  }
  .expandBox .expand-label{
    color: #99a9bf;
    width:100px;
    display:inline-block;
  }
  #app .first-box .el-table .table-header{
    background:#f5f7fa;
  }
  .el-table th, .el-table tr.table-header{
    background:#f5f7fa;
  }
  .loading-tips{
    text-align:left;
    font-size:14px;
    line-height:30px;
    overflow:hidden;
  }
  .loading-tips .loading-list{
    width:50%;
    float:left;
  }
  .loading-tips .alert-label{
    margin-right:10px;
  }
  .loading-tipss{
    display:flex;
  }
  .ups-img{
    width:100px;
    height:100px;
    cursor: pointer;
  }
  .up-imgs{
    width:100px;
    height:160px;
    cursor: pointer;
    margin-right:20px;
  }
  .comment .mask{
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
