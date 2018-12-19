<template>
    <div class='stores'>
      <el-row class="contain row-bg" type="flex"  justify="center">
        <el-col>
          <div class="store-inner">
            <p class="stores-title">
              淘宝店铺<span class="tips"></span>
              <el-button type="primary"  size="mini" class="bindbtn" @click='newdialog=true'> 绑定新店铺<!-- <router-link to="/newStore">绑定新店铺</router-link> --> </el-button>
              <el-button type="warning"  size="mini" class="bindbtn" @click='shou'>一键授权</el-button>
              <el-button type="success"  size="mini" class="bindbtn" @click="biao">标记信息</el-button>
            </p>
            <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%"   header-row-class-name="table-header" border >
              <el-table-column prop="name" label="店铺名称"  header-align="center">
                 <template slot-scope="scope">
                   <p>{{scope.row.name}}</p>
                   <p style='text-align:right;cursor:pointer;color:#1890ff;' @click='changeName(scope.row.id)'>修改</p>
                 </template>
              </el-table-column>
              <el-table-column  prop="platform" label="所属平台" header-align="center">
              </el-table-column>
              <el-table-column prop="storeStatus" label="状态"  show-overflow-tooltip header-align="center">
                <template slot-scope="scope">
                  <p v-if='scope.row.storeStatus==0'>未审批</p>
                  <p v-if='scope.row.storeStatus==1'>审批通过</p>
                  <p v-if='scope.row.storeStatus==2'>审批未通过</p>
                  <p v-if='scope.row.storeStatus==4'>审批中</p>
                </template>
              </el-table-column>
              <el-table-column label="发货人信息"  show-overflow-tooltip header-align="center">
                <template slot-scope="scope">
                  <p style='text-align:left;' >姓名：{{scope.row.shippersName}}</p>
                  <p style='text-align:left;'>电话：{{scope.row.shippersPhone}}</p>
                  <p style='text-align:left;'>地址：{{scope.row.shippersAddress}}</p>
                  <p style='text-align:right;cursor:pointer;color:#1890ff;' @click='change(scope.row.id)' >修改</p>
                </template>
              </el-table-column>
              <el-table-column prop="cardBank" label="店铺推广状态"  show-overflow-tooltip header-align="center">
                <el-table-column prop="cardBank" label="淘宝客"  show-overflow-tooltip header-align="center" width="100" >
                  <template slot-scope="scope">
                      <p v-if='scope.row.tbkOpenState==1' @click='changeKe(scope.row.id)' style='cursor:pointer;' >已开启</p>
                      <p v-else @click='changeKe(scope.row.id)' style='cursor:pointer;' >未开启</p>
                  </template>
                </el-table-column>
                <el-table-column prop="cardBank" label="农村淘宝"  show-overflow-tooltip header-align="center" width="100">
                  <template slot-scope="scope">
                      <p v-if='scope.row.nctbOpenState==1'  @click='changeNong(scope.row.id)' style='cursor:pointer;'>已开启</p>
                      <p v-else  @click='changeNong(scope.row.id)' style='cursor:pointer;'>未开启</p>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column prop="cardTime" label="操作"  header-align="center" width='220'>
                <template slot-scope="scope">
                  <el-button type="primary" plain round size="mini" @click="look(scope.$index, scope.row)">查看</el-button>
                  <el-button type="danger"  plain round size="mini" @click='del(scope.row.id)'>删除</el-button>
                  <el-button type="warning"  plain round size="mini" @click='quan(scope.$index)'>授权</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <!--**绑定新店铺**-->
      <el-dialog  title="新增店铺" :visible.sync="newdialog" width='70%' >
        <newStore v-on:storeMessage="storeMessages"></newStore>
      </el-dialog>
      <!-- **查看店铺** -->
      
      <el-dialog  title="查看店铺" :visible.sync="lookdialog" width='60%' >
        <el-row class="contain row-bg taskInfos" type="flex"  justify="center">
          <el-col>
            <ul class="loading-tips loading-ge">
              <li class='loading-list'><label class='alert-label' >店铺性质：</label>{{form.platform}}</li>
              <li class='loading-list'><label class='alert-label'>掌柜号:</label>{{form.tbAccount}}</li>
              <li class='loading-list'><label class='alert-label'>店铺名：</label> {{form.name}}</li>
              <li class='loading-list'><label class='alert-label'>行业类目：</label> {{form.category}}</li>
              <li class='loading-list'><label class='alert-label'>发货人：</label> {{form.shippersName}}</li>
              <li class='loading-list'><label class='alert-label'>发货人手机号：</label> {{form.shippersPhone}}</li>
              <li class='loading-list'><label class='alert-label'>发货人地址：</label> {{form.shippersAddress}}</li>
              <li class='loading-list'><label class='alert-label'>店铺推广状态：</label>
                <span v-if='form.nctbOpenState==1'>农村淘宝</span>
                <span v-if='form.tbkOpenState==1'>淘宝客</span>
              </li>
            </ul>
            <div class="loading-tips loading-ge loading-tipss">
              <label class='alert-label'>店铺首页图：</label>
              <img :src="form.storeHomePic" alt="" class='up-imgs' @click="bigImg" >
            </div>
            <div class="loading-tips loading-ge loading-tipss">
              <label class='alert-label'>生意参谋图：</label>
              <div class='tipBox'>
                <img :src="form.storeStaffPic" alt="" class='up-imgs' @click="bigImg" >
              </div>
            </div>
          </el-col>
        </el-row>
      </el-dialog>
      <!-- **修改地址** -->
      <el-dialog  title="修改地址" :visible.sync="changedialog" width='50%' >
        <el-form label-width="150px"  ref="changeForm" :model="changeForm"  size='small' :rules="rules" class='commentForm' >
            <el-form-item label="发货人姓名：" prop='faName'>
              <el-input v-model="changeForm.faName"></el-input>
            </el-form-item>
            <el-form-item label="发货人手机号：" prop='phone'>
              <el-input v-model="changeForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="店铺省市区:" class='form-item' prop='citys' >
              <el-select  placeholder="请选择"   v-model="pro_value">
                <el-option v-for="item in pro" :key="item" :label="item" :value="item"></el-option>
              </el-select>
              <el-select  placeholder="请选择"  v-model="city_value">
                <el-option v-for="item in city" :key="item" :label="item" :value="item"></el-option>
              </el-select>
              <el-select  placeholder="请选择"  v-model="area_value">
                 <el-option v-for="item in area" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发货详细地址：" prop='info'>
              <el-input  v-model="changeForm.info" ></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="changedialog = false" size='small' >取消</el-button>
          <el-button @click="changeConfirm('changeForm')" size='small' type='primary'>确定</el-button>
        </span>
      </el-dialog>
      <!-- 修改状态 -->
      <el-dialog  title="修改状态" :visible.sync="tuidialog" width='30%' >
        <el-form label-width="150px"  size='small'  class='commentForm' >
            <el-form-item label="淘宝客状态:" class='form-item' v-if='tuiStatus==1' >
              <el-select  placeholder="请选择"   v-model="ke_value">
                <el-option label="已开通" value="1"></el-option>
                <el-option label="未开通" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="农村淘宝状态:" class='form-item' v-if='tuiStatus==2'>
              <el-select  placeholder="请选择"   v-model="nong_value">
                <el-option label="已开通" value="1"></el-option>
                <el-option label="未开通" value="2"></el-option>
              </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="tuidialog = false" size='small' >取消</el-button>
          <el-button @click="tuiConfirm" size='small' type='primary'>确定</el-button>
        </span>
      </el-dialog>
      <!-- **修改店铺名称** -->
      <el-dialog  title="修改店铺名称" :visible.sync="storedialog" width='30%' >
        <el-input v-model="storeChangeName" placeholder='输入店铺名称' ></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="storedialog = false" size='small' >取消</el-button>
          <el-button @click="storeConfirm" size='small' type='primary'>确定</el-button>
        </span>
      </el-dialog>
      <!--**图片放大**-->
      <div class="mask" v-show="show" @click="small">
        <img :src="bigsrc" alt="" class="bigimg">
      </div>
      <!-- **授权** -->
      <el-dialog title='淘宝授权' width='50%' :visible.sync="shoudialog" >
        <p class='hidde-title'>请您输入正确的淘宝昵称，否则无法标记成功。</p>
        <el-input  v-model="shous" placeholder="淘宝昵称"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button  type='primary' @click="shouConfirm"  size='small'>确认</el-button>
          <el-button @click="shoudialog = false"  size='small'>取消</el-button>
        </span>
      </el-dialog>
       <!-- **标记** -->
      <el-dialog title='标记' width='50%' :visible.sync="biaodialog" >
        <el-form ref="form" :model="biaoforms" class="queryBox" label-width="76px"  size="small" :inline="true">
           <!--  <el-form-item label="淘宝昵称">
              <el-input  v-model="biaoforms.name"></el-input>
            </el-form-item>  -->
            <el-form-item label="标注信息">
              <el-input  v-model="biaoforms.message"></el-input>
            </el-form-item> 
            <el-form-item label="旗子颜色">
              <el-select v-model="biaoforms.qi" >
                <el-option label="红色" value="1"></el-option>
                <el-option label="黄色" value="2"></el-option>
                <el-option label="绿色" value="3"></el-option>
                <el-option label="蓝色" value="4"></el-option>
              </el-select>
            </el-form-item> 
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button  type='primary' @click="biaoConfirm"  size='small'>确认</el-button>
          <el-button @click="biaodialog = false"  size='small'>取消</el-button>
        </span>
      </el-dialog>
      <!--授权-->
      <el-dialog title='标记' width='50%' :visible.sync="quandialog" >
        <el-form ref="form" :model="quanforms" class="queryBox" label-width="76px"  size="small" :inline="true">
          <!--  <el-form-item label="淘宝昵称">
             <el-input  v-model="biaoforms.name"></el-input>
           </el-form-item>  -->
          <el-form-item label="标注信息">
            <el-input  v-model="quanforms.message"></el-input>
          </el-form-item>
          <el-form-item label="旗子颜色">
            <el-select v-model="quanforms.qi" >
              <el-option label="红色" value="1"></el-option>
              <el-option label="黄色" value="2"></el-option>
              <el-option label="绿色" value="3"></el-option>
              <el-option label="蓝色" value="4"></el-option>
              <el-option label="紫色" value="5"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button  type='primary' @click="quanConfirm"  size='small'>确认</el-button>
          <el-button @click="quandialog = false"  size='small'>取消</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
    import newStore from './newStore'
    import {storeLists,changeShipperInfo,changeNctbOpenState,changeTbkOpenState,changeStoreName,deleteStore,addStore,quanShou} from '../../api/vip';
    import {taskBiaos} from '../../api/task'
    import arrAll from '../../until/city'
    import {isvalidPhone} from '../../until/regex';
    export default {
      name: "stores",
      data() {
        // 省市区验证
        var cityYan=(rule, value,callback)=>{
          if(this.pro_value==''){
            callback(new Error('请选择省'))
          } else if(this.city_value==''){
            callback(new Error('请选择市'))
          }else if(this.area_value==''){
            callback(new Error('请选择区'))
          }else{
            callback()
          }
        }
        // 验证手机号
        var validPhone=(rule, value,callback)=>{
          if (!value){
              callback(new Error('请输入电话号码'))
          }else  if (!isvalidPhone(value)){
            callback(new Error('请输入正确的11位手机号码'))
          }else {
              callback()
          }
        }
        return {
          newdialog:false,
          shoudialog:false,
          biaodialog:false,
          lookdialog:false,
          changedialog:false,
          storedialog:false,
          quandialog:false,
          bigsrc:'',//放大图片的地址
          show:false,  //放大图片的遮造层
          types:0,
          storeChangeName:'',
          biaoforms:{
              message:"",
              qi:''
            },
          quanforms:{
            message:'',
            qi:''
          },
          tableData: [],
          quanData:[],
          shous:'',
          form:'',
          changeId:'',
          changeForm:{
            faName:'',
            phone:'',
            info:'',
            pro:'',
            city:'',
            area:''
          },
          city:[],
          pro:[],
          area:[],
          pro_value:'',
          city_value:'',
          area_value:'',
          ke_value:'',
          nong_value:'',
          tuidialog:false,
          keId:'',
          nongId:'',
          tuiStatus:1,
          rules:{
            faName:[{required: true, message: '请输入发货人姓名', trigger: 'blur'}],
            phone:[{required:true,trigger:'blur',validator: validPhone}],
            info:[{required:true,trigger:'blur',message: '请输入发货详细地址'}],
            citys:[{required:true,trigger:'change',validator: cityYan}]
          },
        }
      },
      mounted(){
         storeLists().then(response => {
            const data = response;
            this.logindialog=false
            if(data.msg==1){
             this.tableData=data.stores
            }
          }).catch(error => {
            reject(error);
          }); 
          for(let i=0;i<arrAll.length;i++){
              this.pro.push(arrAll[i].name)
          }
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
        // 查看
        look(index,row,type){
          this.form=this.tableData[index]
          this.lookdialog=true
        },
        // ===删除
        del(id){

          var that=this;
          this.$confirm('此操作将删除该店铺, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
             deleteStore(id).then(response => {
                const data = response;
                if(data.msg==1){
                  this.$message.success('删除成功')
                  setTimeout(function(){
                      that.$router.go(0)
                  },500)
                }
              }).catch(error => {
                reject(error);
              }); 
          })
          console.log(index, row)
        },
        // 修改地址
        change(id){
          this.changedialog=true
          this.changeId=id
        },
        changeConfirm(formName){
          var that=this;
          this.changedialog=false
           this.$refs[formName].validate((valid) => {
            if (valid) {
              changeShipperInfo(that.changeId,that.changeForm.faName,that.changeForm.phone,this.pro_value,this.city_value,this.area_value,that.changeForm.info).then(response => {
                const data = response;
                if(data.msg==1){
                  this.$message.success('修改成功')
                  setTimeout(function(){
                    that.$router.go(0)
                  },500)
                }else if(data.msg==3){
                  this.$message.error('店铺名称重复,请重新输入店铺名称')
                }
              }).catch(error => {
                reject(error);
              }); 
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        // 修改淘宝客状态
        changeKe(id){
          this.keId=id
          this.tuiStatus=1
          this.tuidialog=true
        },
        // 修改农村淘宝状态
        changeNong(id){
          this.nongId=id
          this.tuiStatus=2
          this.tuidialog=true
        },
        tuiConfirm(){
          this.tuidialog=false;
          var that=this;
          if(this.tuiStatus==1){
            changeTbkOpenState(this.keId,this.ke_value).then(response => {
              const data = response;
              if(data.msg==1){
                this.$message.success('修改成功')
                setTimeout(function(){
                    that.$router.go(0)
                },500)
              }
            }).catch(error => {
              reject(error);
            }); 
          }else{
            changeNctbOpenState(this.nongId,this.nong_value).then(response => {
              const data = response;
              if(data.msg==1){
                this.$message.success('修改成功')
                setTimeout(function(){
                    that.$router.go(0)
                },500)
              }
            }).catch(error => {
              reject(error);
            }); 
          }
        },
        // 修改店铺名称
        changeName(id){
          this.storeChangeId=id;
          this.storedialog=true;
        },
        storeConfirm(){
          var that=this;
          this.storedialog=false
          if(this.storeChangeName==''){
            this.$message.warning('请填写店铺名称')
          }else{
            changeStoreName(this.storeChangeId,this.storeChangeName).then(response => {
              const data = response;
              if(data.msg==1){
               this.$message.success('修改成功')
                setTimeout(function(){
                    that.$router.go(0)
                },500)
              }
            }).catch(error => {
              reject(error);
            }); 
          }
        },
        //新增店铺
        storeMessages(storemessages){
          var that=this;
           addStore(
              '',
             storemessages.types,
             storemessages.storeName,
             storemessages.name,
             storemessages.type_value,
             storemessages.tao,
             storemessages.nong,
             storemessages.faName,
             storemessages.phone,
             storemessages.pro,
             storemessages.city,
             storemessages.area,
             storemessages.info,
             storemessages.can,
             storemessages.shou
            ).then(response => {
            const data = response;
            this.newdialog=false
            if(data.msg==1){
               this.$message.success('添加成功')
                setTimeout(function(){
                    that.$router.go(0)
                },500)
            }else if(data.msg==4){
              this.$message.error('店铺数量大于等于5,不能在添加店铺了')
            }else if(data.msg==3){
              this.$message.error('店铺名称重复,请重新输入店铺名称')
            }
          }).catch(error => {
            reject(error);
          }); 
        },
          // 一键授权
          shou(){
            this.shoudialog=true
          },
          shouConfirm(){
            if(this.shous==''){
              this.$message.warning('请输入淘宝昵称')
            }else{
              window.open("http://www.1haohaitao.com/apiproxy.aspx?uid=060a57ae-9846-4bd1-aa29-7d8ce87163a0&nick="+this.shous)
              this.shoudialog=false
            }
          },
          // 标记
          biao(){
            this.biaodialog=true
          },
          // 
          biaoConfirm(){
            if(this.biaoforms.message==''){
              this.$message.warning('请输入标记信息')
            }else if(this.biaoforms.qi==''){
              this.$message.warning('请选择旗子颜色')
            }else{
              taskBiaos(this.biaoforms.message,this.biaoforms.qi).then(response=>{
                  var data=response
                  this.biaodialog=false
                  if(data.msg==1){
                    this.$message.success('标记成功')
                  }else if(data.msg==3){
                    this.$message.error('授权错误，请重新授权')
                  }else if(data.msg==4){
                    this.$message.error('标注已过期，联系超管处理')
                  }else if(data.msg==5){
                    this.$message.error('刷手提交的订单编号有误')
                  }else if(data.msg==6){
                    this.$message.error('标记信息格式有误')
                  }else if(data.msg==7){
                    this.$message.error('格式有误')
                  }
              }).catch(error=>{})
            }
          },
        quan(index){
          this.quandialog=true;
          this.quanData=this.tableData[index];
        },
        quanConfirm(){
          // console.log(this.quanData.id,this.quanforms.message,this.quanforms.qi)
            quanShou(this.quanData.id,this.quanforms.message,this.quanforms.qi).then(response=>{
                    const data=response;
                    window.location.href=data;
            })
        }
      },
      watch: {
          // 省
          pro_value(e){
            console.log(arrAll)
            this.city=[];
            for(let i=0;i<arrAll.length;i++){
              if(this.pro_value==arrAll[i].name){
                for(let j=0;j<arrAll[i].city.length;j++){
                  this.city.push(arrAll[i].city[j].name)
                  this.form.pro=this.pro_value
                }
              }
            }
          },
          // 市
          city_value(e){
            this.area=[];
            for(let i=0;i<arrAll.length;i++){
              if(this.pro_value==arrAll[i].name){
                for(let j=0;j<arrAll[i].city.length;j++){
                  if(this.city_value==arrAll[i].city[j].name){
                    for(let x=0;x<arrAll[i].city[j].area.length;x++){
                      this.area.push(arrAll[i].city[j].area[x])
                      this.form.city=this.city_value
                    }
                  }
                }
              }
            }
          },
          area_value(e){
             this.form.area=this.area_value
          }
      },
      components:{
        newStore
      }
    }
</script>

<style scoped>
 .el-form-item__content{
    text-align:left;
  }
  .stores-title{
    font-size:16px;
    text-align: left;
    height:20px;
    line-height:20px;
    border-left:4px solid #4782ef;
    padding-left:6px;
    font-weight:bold;
    margin-bottom:20px;
  }
  .tips{
    font-size:14px;
    color:#f56c6c;
    text-align: left;
    padding-left:10px;
  }
  .bindbtn{
    margin-left:50px;
  }
  .store-inner{
    background:#fff;
    padding:20px;
    height:100%;
  }
  #app .first-box .el-table .table-header{
    background:#f5f7fa;
  }
  .el-table th, .el-table tr.table-header{
    background:#f5f7fa;
  }
  a{
    color:#fff;
  }
  .loading-tips{
    text-align:left;
    font-size:14px;
    line-height:30px;
  }
  .loading-tips .alert-label{
    margin-right:10px;
    font-weight:bold;
  }
  .loading-tipss{
    display:flex;
  }
  .loading-tipss .alert-label{
     display:block;
  }
  .up-img{
    width:300px;
    height:300px;
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
</style>
