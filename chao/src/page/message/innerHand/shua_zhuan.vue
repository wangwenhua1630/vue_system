<template>
  <div class='shua_tou'>
    <el-row class="row-bg" type="flex"  justify="center">
      <el-col>
        <div class="queryBoxs">
          <el-form ref="form" :model="form" class="queryBox" label-width="70px"  size="mini" :inline="true">
            <el-form-item label="刷手账号">
              <el-input v-model="form.num" ></el-input>
            </el-form-item>
            <el-form-item label="问题类型">
              <el-select v-model="form.state" placeholder="请选择" >
                <el-option label="多退少补" value="1"></el-option>
                <el-option label="无法体现" value="2"></el-option>
                <el-option label="本金未转账" value="3"></el-option>
                <el-option label="佣金未转账" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布时间">
              <el-date-picker v-model="form.date" type="daterange"  :default-time="['00:00:00', '23:59:59']" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click='search'>查询</el-button>
            </el-form-item>
            <!-- <el-form-item>
              <el-button type="danger"  size="small" @click="zhuanjie" >任务转介</el-button>
            </el-form-item> -->
          </el-form>
          <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%"  @selection-change='selection' header-row-class-name="table-header">
            <el-table-column type="selection"  width="55" header-align="center">
            </el-table-column>
            <el-table-column prop="handAccount" label="刷手账号"  header-align="center">
            </el-table-column>
            <el-table-column  prop="createAt" label="发布时间" header-align="center">
            </el-table-column>
            <el-table-column prop="type" label="投诉类型"  show-overflow-tooltip header-align="center">
               <template slot-scope="scope">
                 <p v-if='scope.row.type==1'>多退少补</p>
                 <p v-if='scope.row.type==2'>无法体现</p>
                 <p v-if='scope.row.type==3'>本金未转账</p>
                 <p v-if='scope.row.type==4'>佣金未转账</p>
               </template>
            </el-table-column>
            <el-table-column prop="name" label="操作"  show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <el-button type="success" plain  size="mini" @click="missdialog = true,index=scope.$index,Ids=scope.row.id" v-if='scope.row.type==2' >查看详情</el-button>
                <el-button type="success" plain  size="mini" @click="zhuandialog = true,index=scope.$index,Ids=scope.row.id" v-if='scope.row.type==3'>查看详情</el-button>
                <el-button type="success" plain  size="mini" @click="budialog = true,index=scope.$index,Ids=scope.row.id" v-if='scope.row.type==1'>查看详情</el-button>
                <el-button type="success" plain  size="mini" @click="yongdialog = true,index=scope.$index,Ids=scope.row.id" v-if='scope.row.type==4'>查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @current-change="CurrentChange" layout="prev, pager, next" :total="totalPages">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <!--**商家投诉详情**-->
    <el-dialog title='刷手转账问题详情' width='30%' :visible.sync="missdialog" >
      <ul class='touBox' v-if='tableData.length!=0'>
        <li class='touList'><span class='touLabel'>刷手账号：</span>{{tableData[index].handAccount}}</li>
        <li class='touList'><span class='touLabel'>发布时间：</span>{{tableData[index].createAt}}</li>
        <li class='touList'><span class='touLabel'>任务编号：</span>{{tableData[index].idNum}}</li>
        <li class='touList'><span class='touLabel'>投诉内容：</span>无法提现</li>
        <li class='touList'><span class='touLabel'>图片展示：</span><img :src="tableData[index].handImg" alt="" class='tou-img' @click="bigImg" ></li>
        <li class='touList'><span class='touLabel'>审核意见：<el-input  v-model="textarea" type='text' class='danInp' size='small' ></el-input></span>
        <li class='touList'><span class='touLabel'>操作密码：</span><el-input v-model="passwordsss" type='password' class='danInp' size='small' ></el-input></li> 
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button  type='primary' @click="shuaTi" size='small'>确定</el-button>
        <el-button  type='primary' @click="missdialog = false" size='small'>取消</el-button>
      </span>
    </el-dialog>
    <!--**商家未转账**-->
    <el-dialog title='商家未转账' width='30%' :visible.sync="zhuandialog" >
      <ul class='touBox'  v-if='tableData.length!=0'>
        <li class='touList'><span class='touLabel'>刷手账号：</span>{{tableData[index].handAccount}}</li>
        <li class='touList'><span class='touLabel'>发布时间：</span>{{tableData[index].createAt}}</li>
        <li class='touList'><span class='touLabel'>任务编号：</span>{{tableData[index].idNum}}</li>
        <li class='touList'><span class='touLabel'>原因：</span>商家未转账</li>
        <li class='touList'><span class='touLabel'>操作密码：</span><el-input v-model="password" type='password' class='danInp' size='small' ></el-input></li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button  type='primary' @click="shuaZhuan(1)" size='small'>同意</el-button>
        <el-button  @click="shuaZhuan(2)" size='small'>拒绝</el-button>
      </span>
    </el-dialog>
    <!--**佣金未转账**-->
    <el-dialog title='佣金未转账' width='30%' :visible.sync="yongdialog" >
      <ul class='touBox'  v-if='tableData.length!=0'>
        <li class='touList'><span class='touLabel'>刷手账号：</span>{{tableData[index].handAccount}}</li>
        <li class='touList'><span class='touLabel'>发布时间：</span>{{tableData[index].createAt}}</li>
        <li class='touList'><span class='touLabel'>任务编号：</span>{{tableData[index].idNum}}</li>
         <li class='touList'><span class='touLabel'>操作密码：</span><el-input v-model="passwords" type='password' class='danInp' size='small' ></el-input></li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button  type='primary' @click="shuaYong(1)" size='small'>同意</el-button>
        <el-button  @click="shuaYong(2)" size='small'>拒绝</el-button>
      </span>
    </el-dialog>
    <!--**多退少补**-->
    <el-dialog title='多退少补' width='30%' :visible.sync="budialog" >
      <ul class='touBox'  v-if='tableData.length!=0'>
        <li class='touList'><span class='touLabel'>刷手账号：</span>{{tableData[index].handAccount}}</li>
        <li class='touList'><span class='touLabel'>发布时间：</span>{{tableData[index].createAt}}</li>
        <li class='touList'><span class='touLabel'>任务编号：</span>{{tableData[index].idNum}}</li>
        <li class='touList'><span class='touLabel'>商品金额：</span>{{tableData[index].merchantMoney}}</li>
        <li class='touList'><span class='touLabel'>差价：</span>{{tableData[index].handMoney}}</li>
        <li class='touList'><span class='touLabel'>图片展示：</span><img :src="tableData[index].handImg" alt="" class='tou-img' @click="bigImg" ></li>
         <li class='touList'><span class='touLabel'>操作密码：</span><el-input v-model="passwordss" type='password' class='danInp' size='small' ></el-input></li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button  type='primary' @click="shuaBu(1)" size='small'>同意</el-button>
        <el-button  @click="shuaBu(2)" size='small'>拒绝</el-button>
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
    import {handZhuan,handYong,handStore,handTi,handBu} from '../../../api/message'
    import { businessadmins} from '../../../api/userConller'
    export default {
        name: "result",
        data(){
          return{
            missdialog:false,
            zhuandialog:false,
            budialog:false,
            taskdialog:false,
            yongdialog:false,
            bigsrc:'',
            show:false,
            passwords:'',
            password:'',
            passwordss:"",
            passwordsss:"",
            textarea:'',
            index:0,
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
          handZhuan('','','','',1,10).then(response=>{
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
            handZhuan(this.form.num,this.form.state,date1,date2,e,10).then(response=>{
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
            handZhuan(this.form.num,this.form.state,date1,date2,this.currentPage,10).then(response=>{
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
            // businessZhuans(idList,this.jie).then(response=>{
            //   this.taskdialog=false
            //   var data=response
            //   if(data.msg==1){
            //     this.$message.success('操作成功')
            //     setTimeout(function(){
            //       that.$router.go(0)
            //     },500)
            //   }
            // }).catch(error=>{

            // })
          },
          // 处理商家未转账
          shuaZhuan(types){
            var that=this;
            if(this.password==''){
              this.$message.warning('请输入操作密码')
            }else{
              handStore(this.Ids,types,this.password).then(response=>{
                this.zhuandialog=false
                var data=response
                if(data.msg==1){
                  this.$message.success('操作成功')
                  setTimeout(function(){that.$router.go(0)},500)
                }else if(data.msg==4){
                  this.$message.error('密码错误')
                }
              }).catch(error=>{})
            }  
          },
          // 处理佣金未转账
          shuaYong(types){
            var that=this;
            if(this.passwords==''){
              this.$message.warning('请输入操作密码')
            }else{
              handYong(this.Ids,types,this.passwords).then(response=>{
                var data=response
                this.yongdialog=false
                if(data.msg==1){
                  this.$message.success('操作成功')
                  if(types==1){
                    setTimeout(function(){ that.$router.push('/store/product')},500)
                  }else{
                    setTimeout(function(){that.$router.go(0)},500)
                  }
                }else if(data.msg==4){
                  this.$message.error('密码错误')
                }
              }).catch(error=>{})
            }  
          },
          // 处理多退少补
          shuaBu(types){
            var that=this;
            if(this.passwordss==''){
              this.$message.warning('请输入操作密码')
            }else{
              handBu(this.Ids,types,this.passwordss).then(response=>{
                var data=response
                this.budialog=false
                if(data.msg==1){
                  this.$message.success('操作成功')
                  setTimeout(function(){that.$router.go(0)},500)
                }else if(data.msg==4){
                  this.$message.error('密码错误')
                }
              }).catch(error=>{})
            }  
          },
          // 处理无法体现
          shuaBu(types){
            var that=this;
            if(this.passwordss==''){
              this.$message.warning('请输入操作密码')
            }else{
              handBu(this.Ids,types,this.passwordss).then(response=>{
                var data=response
                this.budialog=false
                if(data.msg==1){
                  this.$message.success('操作成功')
                  setTimeout(function(){that.$router.go(0)},500)
                }else if(data.msg==4){
                  this.$message.error('密码错误')
                }
              }).catch(error=>{})
            }  
          },
          shuaTi(){
            var that=this;
            if(this.passwordsss==''){
              this.$message.warning('请输入操作密码')
            }else if(this.textarea==''){
              this.$message.warning('请输入处理意见')
            }else{
              handTi(this.Ids,this.textarea,this.passwordsss).then(response=>{
                var data=response
                this.budialog=false
                if(data.msg==1){
                  this.$message.success('操作成功')
                  setTimeout(function(){that.$router.go(0)},500)
                }else if(data.msg==4){
                  this.$message.error('密码错误')
                }
              }).catch(error=>{})
            }  
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
    vertical-align:top;
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
  .shua_tou .el-tabs__content{
    position:static;
  }
</style>
