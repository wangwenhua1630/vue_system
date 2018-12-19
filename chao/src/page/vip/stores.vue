<template>
  <div class='goods'>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="first-box">
          <p class='break'>商家管理</p>
          <el-form ref="form" :model="form" class="queryBox" label-width="100px"  size="mini" :inline="true">
            <el-form-item label="商家账号">
              <el-input v-model="form.num" ></el-input>
            </el-form-item>
            <el-form-item label="在线天数">
              <el-date-picker  v-model="form.days" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
           <el-form-item label="注册时间">
              <el-date-picker  v-model="form.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="最高佣金数">
               <el-input v-model="form.maxmoney" ></el-input>
            </el-form-item>
            <el-form-item label="账户金额">
               <el-input v-model="form.moneu" ></el-input>
            </el-form-item>
            <el-form-item label="当前每日单量">
               <el-input v-model="form.dan" ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click='search'>查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click='dong(2,1)'>批量冻结</el-button>
            </el-form-item>
             <el-form-item>
              <el-button type="success" @click='dong(2,2)'>批量解冻</el-button>
            </el-form-item>
          </el-form>
          <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"   @selection-change='selection' style="width: 100%"  border  header-row-class-name="table-header">
            <el-table-column type="selection"  width="55" header-align="center">
            </el-table-column>
            <el-table-column prop="account" label="账号"  header-align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column  prop="name" label="商家店铺" header-align="center"  show-overflow-tooltip>
              <template slot-scope="scope">
                <p  @click='lookStore(scope.row.id)'>查看店铺</p>
              </template>
            </el-table-column>
             <el-table-column prop="totalNum" label="发布任务总量"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="currentTaskCount" label="当前发放任务数"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="onlineCount" label="在线天数(30天)"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="moneysBalance" label="账户金额"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="maxCommission" label="最高佣金数"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="userCreateAt" label="注册时间"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="createYear" label="入驻年限"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="userStatus" label="状态"  show-overflow-tooltip header-align="center">
                <template slot-scope="scope">
                  <p v-if='scope.row.userStatus==1'>未填写资料</p>
                  <p v-if='scope.row.userStatus==2'>冻结中</p>
                  <p v-if='scope.row.userStatus==3'>审核通过</p>
                  <p v-if='scope.row.userStatus==4'>审核中</p>
                  <p v-if='scope.row.userStatus==5'>审核未通过</p>
                </template>
            </el-table-column>
            <el-table-column   label="操作"  header-align="center" width='120'>
              <template slot-scope="scope">
                <el-dropdown @command="handleCommand">
                  <el-button type="primary">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command='{type:1,index:scope.$index}'>冻结</el-dropdown-item>
                    <el-dropdown-item :command='{type:2,index:scope.$index}'>解冻</el-dropdown-item>
                    <el-dropdown-item :command='{type:6,index:scope.$index}'>删除</el-dropdown-item>
                    <el-dropdown-item :command='{type:3,index:scope.$index}'>查看资料</el-dropdown-item>
                    <el-dropdown-item :command='{type:4,index:scope.$index}'>编辑私信</el-dropdown-item>
                    <el-dropdown-item :command='{type:5,index:scope.$index}'>调整单量</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>

              </template>
            </el-table-column>
          </el-table>
          <el-pagination @current-change="CurrentChange" layout="prev, pager, next" :total="totalPages">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <!--**冻结，解冻商家**-->
    <el-dialog  title="提示" :visible.sync="dongdialog" width="30%" >
      <p class='hidde-title'>您将冻结/解冻该商家</p>
      <el-input  type='password' v-model="input" placeholder="请输入操作密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary' @click="dongConfirm" size='small' >确定</el-button>
        <el-button  @click="dongdialog = false" size='small' >取消</el-button>
      </span>
    </el-dialog>
    <!--**删除商家**-->
    <el-dialog  title="提示" :visible.sync="delsdialog" width="30%" >
      <p class='hidde-title'>您将删除该商家</p>
      <el-input  type='password' v-model="delinput" placeholder="请输入操作密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary' @click="delsConfirm" size='small' >确定</el-button>
        <el-button  @click="delsdialog = false" size='small' >取消</el-button>
      </span>
    </el-dialog>
    <!--**编辑私信**-->
    <el-dialog  title="私信编辑" :visible.sync="xindialog" width="60%" >
      <p class='hidde-title'>您将发送私信给该商家</p>
      <el-input  type='text' v-model="title" placeholder="请输入标题"></el-input>
      <div class='uess'>
         <UE id="ueditor" :value="ueditor.value" :config="ueditor.config" ref="ue"></UE>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary' @click="messageConfirm" size='small' >确定</el-button>
        <el-button  @click="xindialog = false" size='small' >取消</el-button>
      </span>
    </el-dialog>
     <!--**调整单量**-->
    <el-dialog  title="调整单量" :visible.sync="tiaodialog" width="30%" >
      <p class='hidde-title'>请选择要调整的单量</p>
      <el-select v-model="dans.dan" placeholder="请选择" class='selects'>
        <el-option :label="item.num" :value="item.id" v-for='item in danNum' :key='item.id'></el-option>
      </el-select>
      <p class='hidde-title'>请选择要调整的店铺</p>
      <el-select v-model="dans.ids" placeholder="请选择" class='selects' v-if='storenum!=null'>
        <el-option :label="item.name" :value="item.id" v-for='item in storenum' :key='item.id'></el-option>
      </el-select>
      <p class='hidde-title'>操作密码</p>
      <el-input  type='password' v-model="dans.password" placeholder="请输入操作密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary' @click="tiao" size='small' >确定</el-button>
        <el-button  @click="tiaodialog = false" size='small' >取消</el-button>
      </span>
    </el-dialog>
    <!--**查看商家详情**-->
    <el-dialog  title="查看详情" :visible.sync="newdialog" width="50%" class='taskInfos'>
      <storeMessage :info='businessMessage'></storeMessage>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newdialog = false" size='small'>关闭</el-button>
      </span>
    </el-dialog>
    <!-- **查看店铺资料** -->
    <el-dialog  title="店铺详情" :visible.sync="diandialog" width="50%" class='taskInfos'>
      <newStore :info='storeMessage'></newStore>
      <span slot="footer" class="dialog-footer">
        <el-button @click="diandialog = false" size='small'>关闭</el-button>
      </span>
    </el-dialog>
    <!--**图片放大**-->
    <div class="mask" v-show="show" @click="small">
      <img :src="bigsrc" alt="" class="bigimg">
    </div>
  </div>
</template>

<script>
   import storeMessage from './storeMessage'
   import newStore from './newStore'
   import UE from '../ue/ue.vue';
   import {businessList,businesscold,businessmessages,businessnum,businessInfo,businessdan,businessDels} from '../../api/userConller';
    export default {
        name: "goods",
        data(){
          return{
            form:{
              num:'',
              days:'',
              maxmoney:'',
              money:'',
              dan:'',
              date:''
            },
            ueditor: {
              value: '',
              config: {
                initialFrameWidth: '',
                initialFrameHeight: 220
              }
            },
            dans:{
              dan:'',
              ids:'',
              password:''
            },
            delsdialog:false,
            delinput:'',
            businessMessage:'',
            storeMessage:'',
            tableData:[],
            region:'',
            input:'',
            newdialog:false,
            dongdialog:false,
            xindialog:false,
            show:false,
            diandialog:false,
            tiaodialog:false,
            bigsrc:'',
            totalPages:0,
            currentPage:1,
            check:[],
            storenum:[],
            Ids:'',
            dongType:'',
            duo:'',
            title:'',
            danNum:[]
          }
        },
        mounted(){
          console.log(this.$route.params);
          if(this.$route.params){
            if(this.$route.params.phone){
              var tel=this.$route.params.phone;
            }else{
              var tel=''
            }
          }
          businessList(tel,'','','','','','','',1,10).then(response=>{
            var data=response
            if(data.msg==1){
              this.tableData=data.page.result
              for(var i=0; i<data.page.result.length;i++){
                if(data.page.store!=null){
                  for(var j=0;j<data.page.result[i].store.length;j++){
                    this.tableData[i].store.push(data.page.result[i].store[j].name)
                  }
                }
              }
              this.tableData=this.tableData
              this.totalPages=data.page.totalRow
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
           // 复选框状态改变
          selection(val) {
            this.check = val;
          },
          // 操作按钮
          handleCommand(command){
            this.Ids=this.tableData[command.index].id
            if(command.type==1){
              this.dongdialog=true
              this.duo=2
              this.dongType=1
            }else if(command.type==2){
               this.dongdialog=true
               this.duo=2
              this.dongType=2
            }else if(command.type==3){
              this.newdialog=true;
              businessInfo(this.Ids,1).then(response=>{
                var data=response
                this.businessMessage=data
              }).catch(error=>{})
            }else if(command.type==4){
              this.xindialog=true;
            }else if(command.type==5){
              this.tiaodialog=true;
              businessdan(this.Ids).then(response=>{
                var data=response
                if(data.msg==1){
                  this.storenum=data.stores
                  this.danNum=data.taskNums
                }
              }).catch(error=>{

              })
            }else if(command.type==6){
              this.delsdialog=true;
            }
          },
          // 查看店铺资料
          lookStore(ids){

            businessInfo(ids,1).then(response=>{
              var data=response
              if(data.stores==1){
                  this.$alert('提示', '暂无店铺', {
                    confirmButtonText: '确定',
                    callback: action => {}
                  });
              }else{
                  this.diandialog=true;
                  this.storeMessage=data.stores
              }
            }).catch(error=>{})
          },
          addGoods(){
            this.$router.push('/newGoods')
          },
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
            var days1
            var days2
            if(this.form.days==null){
               days1=null
               days2=null
            }else{
              days1=this.form.days[0]
              days2=this.form.days[1]
            }
            businessList(this.form.num,date1,date2,this.form.maxmoney,this.form.money,this.form.dan,days1 ,days2,e,10).then(response=>{
              var data=response
              if(data.msg==1){
                this.tableData=data.page.result
                this.tableData=this.tableData
                this.totalPages=data.page.totalRow
              }else if(data.msg==4){
                this.tableData=[]
                this.totalPages=0
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
              date1=this.form.date[0]
              date2=this.form.date[1]
            }
            var days1
            var days2
            if(this.form.days==null){
               days1=null
               days2=null
            }else{
              days1=this.form.days[0]
              days2=this.form.days[1]
            }
            businessList(this.form.num,date1,date2,this.form.maxmoney,this.form.money,this.form.dan,days1,days2,this.currentPage,10).then(response=>{
              var data=response
              if(data.msg==1){
                this.tableData=data.page.result
                this.tableData=this.tableData
                this.totalPages=data.page.totalRow
              }else if(data.msg==4){
                this.tableData=[]
                this.totalPages=0
              }
            }).catch(error=>{
            })
          },
          // 批量冻结
          dong(dongType,status){
            this.dongType=status
            this.duo=1
            if(this.check.length==0){
              this.$message.warning('至少选择一项')
            }else{
              this.dongdialog=true
            }
          },
          dongConfirm(){
            var that=this;
            var idList=[];
            if(this.duo==1){
               for(var i=0;i<this.check.length;i++){
                idList.push(this.check[i].id)
              }
            }else{
              idList.push(this.Ids)
            }
            if(this.input==''){
              this.$message.warning('请填写密码')
            }else{
              businesscold(idList,this.dongType,this.input).then(response=>{
                var data=response
                this.dongdialog=false
                if(data.msg==1){
                  this.$message.success('操作成功')
                  setTimeout(function(){
                    that.$router.go(0)
                  },500)
                }else if(data.msg==3){
                  this.$message.eroor('密码错误')
                }else if(data.msg==4){
                  this.$message.warning('列表中存在不能操作的对象')
                  setTimeout(function(){
                    that.$router.go(0)
                  },500)
                }
              }).catch(error=>{

              })
            }
          },
           // 删除商家
          delsConfirm(){
            var that=this;
            if(this.delinput==''){
              this.$message.warning('请输入操作密码')
            }else{
              businessDels(this.Ids,this.delinput).then(response=>{
                var data=response
                this.delsdialog=false
                if(data.msg==1){
                  this.$message.success('删除成功')
                  setTimeout(function(){
                    that.$router.go(0)
                  },500)
                }else if(data.msg==4){
                  this.$message.error('密码错误')
                }
              }).catch(error=>{})
            }
          },
          // 发送私信
          messageConfirm(){
            if(this.$refs.ue.getUEContent()==''){
              this.$message.warning('请填写内容')
            }else{
              businessmessages(this.Ids,this.$refs.ue.getUEContent(),this.title).then(response=>{
                this.xindialog=false
                var data=response
                if(data.msg==1){
                  this.$message.success('发送成功')
                }
              }).catch(error=>{

              })
            }
          },
          // 调整单量
          tiao(){
            var that=this;
            if(this.dans.password==''){
              this.$message.warning('请输入操作密码')
            }else{
              businessnum(this.dans.ids,this.dans.dan,this.dans.password).then(response=>{
                this.tiaodialog=false
                var data=response
                if(data.msg==1){
                  this.$message.success('单量已调整')
                  setTimeout(function(){
                    that.$router.go(0)
                  },500)
                }else if(data.msg==3){
                   this.$message.error('单量不能小于0')
                }else if(data.msg==4){
                   this.$message.error('操作密码错误')
                }
              }).catch(error=>{})
            }
          }
        },
        components:{
          storeMessage,
          newStore,
          UE
        }
    }
</script>

<style>
  .first-box{
    background:#fff;
    padding:20px;
  }
  .uess{
    width:100%;
    margin-top:30px;
  }
  .hidde-title{
    text-align:left;
    margin-bottom:20px;
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
  .queryBox{
    display:block;
    text-align:left;
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
  }
  .loading-tips .alert-label{
    margin-right:10px;
  }
  .loading-tipss{
    display:flex;
  }
  .loading-tipss .alert-label{
     display:block;
  }
  .ups-img{
    width:100px;
    height:100px;
    cursor: pointer;
  }
  .mask{
    width:100%;
    height:100%;
    position:fixed;
    left:0;
    top:0;
    background:rgba(0,0,0,0.6);
    z-index:3000;
    overflow:auto;
  }
  .bigimg{
    width:30%;
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
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
  .goods .el-dialog{
    position:static;
  }
  .selects{
    width:100%;
    margin-bottom:20px;
  }
  .store_list{
    text-align:left;
    color:#1890FF;
    font-size:12px;
    margin-bottom:6px;
    cursor:pointer;
  }
</style>
