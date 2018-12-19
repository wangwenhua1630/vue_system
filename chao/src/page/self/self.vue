<template>
  <div class='chong self'>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="all-box">
          <div class="recharge-pay">
            <el-row type="flex"  justify="space-between">
              <el-col >
                <div class='chong-fl'>
                  <p class="rechare-title">刷手基础设置</p>
                  <div class='chongs-type'>
                    <div class='chong-message'>
                      <p>保证金：{{info.deposit}}</p>
                      <p class="self-margin" @click='baodialog=true'>调整</p>
                    </div>
                    <div class='chong-message'>
                      <p v-if='info.depositStatus==2'>保证金状态：开启中</p>
                      <p v-if='info.depositStatus==1'>保证金状态：关闭中</p>
                      <p class="self-margin" @click='pass(2)' v-if='info.depositStatus==2'>关闭</p>
                      <p class="self-margin" @click='pass(2)' v-if='info.depositStatus==1'>开启</p>
                    </div>
                    <div class='chongs-message chong-message'>
                      <p style='float:left;' v-if='info.onOff==1'>用户推荐状态：开启中</p>
                      <p style='float:left;' v-if='info.onOff==2'>用户推荐状态：关闭中</p>
                      <p class="selfs-margin self-margin" @click='pass(3)' v-if='info.onOff==1'>关闭</p>
                      <p class="selfs-margin self-margin" @click='pass(3)' v-if='info.onOff==2'>开启</p>
                    </div>
                    <div class='chong-message'>
                      <p>刷单数：{{info.num}}</p>
                      <p class="self-margin" @click='shuadialog=true'>调整</p>
                    </div>
                    <div class='chong-message'>
                      <p>淘宝可绑账户数量：{{info.rule.handTaoCount}}</p>
                      <p class="self-margin" @click='taodialog=true'>调整</p>
                    </div>
                    <div class='chong-message'>
                      <p>京东可绑账户数量：{{info.rule.handJdCount}}</p>
                      <p class="self-margin" @click='jingdialog=true'>调整</p>
                    </div>
                    <div class='chong-message'>
                      <p>拼多多可绑账户数量：{{info.rule.handPddCount}}</p>
                      <p class="self-margin" @click='pingdialog=true'>调整</p>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!--给刷手群发短信-->
        <!--<div class="all-box">-->
          <!--<div class="recharge-pay">-->
            <!--<el-row type="flex"  justify="space-between">-->
              <!--<el-col >-->
                <!--<div class='chong-fl'>-->
                  <!--<p class="rechare-title">群发短信至刷手</p>-->
                  <!--<div class='chong-type'>-->
                    <!--<div class='chong-message chong-all-message'>-->
                      <!--<p>信息内容：</p>-->
                      <!--&lt;!&ndash;<p class="self-margin" @click='baodialog=true'>调整</p>&ndash;&gt;-->
                      <!--<div class="all-message">-->
                        <!--<el-input-->
                          <!--type="textarea"-->
                          <!--:rows="5"-->
                          <!--placeholder="请输入短信内容"-->
                          <!--v-model="textarea">-->
                        <!--</el-input>-->
                        <!--<el-button type="primary" v-if="fa==1" @click="textdialog=true">群发</el-button>-->
                        <!--<el-button type="primary" v-if="fa==0" icon="el-icon-loading">群发中</el-button>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</el-col>-->
            <!--</el-row>-->
          <!--</div>-->
        <!--</div>-->
        <!--刷手新手指导-->
        <div class="all-box">
          <div class="recharge-pay">
            <el-row type="flex"  justify="space-between">
              <el-col >
                <div class='chong-fl'>
                  <p class="rechare-title">刷手新手引导设置<span class='rechare-change' @click='editor' >修改</span></p>
                  <div class='chong-types'>
                    <div class='chong-message' v-for='(item,index) in infoMessage' :key='item.id'>
                      <p class='chong-messagess' @click='message(item.id)'>{{item.title}}</p>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 修改保证金 -->
    <el-dialog title="修改保证金" :visible.sync="baodialog" width='30%' >
        <ul class='touBox'>
          <li class='touList'><span class='touLabel'>修改金额：</span><el-input v-model="money"  class='danInp' size='small' ></el-input></li>
          <li class='touList'><span class='touLabel'>操作密码：</span><el-input v-model="password" type='password' class='danInp' size='small' ></el-input></li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button  type='primary' @click="bao" size='small'>确定</el-button>
          <el-button @click="baodialog = false" size='small'>取消</el-button>
        </span>
    </el-dialog>
    <!-- 操作密码 -->
    <el-dialog title="操作密码" :visible.sync="passdialog" width='30%' >
        <ul class='touBox'>
          <li class='touList'><span class='touLabel'>操作密码：</span><el-input v-model="passwords" type='password' class='danInp' size='small' ></el-input></li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button  type='primary' @click="passChange" size='small'>确定</el-button>
          <el-button @click="passdialog = false" size='small'>取消</el-button>
        </span>
    </el-dialog>
    <!-- 修改刷单数 -->
    <el-dialog title="修改刷单数" :visible.sync="shuadialog" width='30%' >
      <ul class='touBox'>
        <li class='touList'><span class='touLabel'>修改数量：</span><el-input-number v-model="num" :min="1" :precision="0"  class='danInp' size='small' ></el-input-number></li>
      </ul>
      <span slot="footer" class="dialog-footer">
          <el-button  type='primary' @click="shua" size='small'>确定</el-button>
          <el-button @click="shuadialog = false" size='small'>取消</el-button>
        </span>
    </el-dialog>
    <!-- 群发短信操作密码 -->
    <el-dialog title="操作密码" :visible.sync="textdialog" width='30%' >
      <ul class='touBox'>
        <li class='touList'><span class='touLabel'>操作密码：</span><el-input v-model="passwordss" type='password' class='danInp' size='small' ></el-input></li>
      </ul>
      <span slot="footer" class="dialog-footer">
          <el-button  type='primary' @click="send" size='small'>确定</el-button>
          <el-button @click="textdialog = false" size='small'>取消</el-button>
        </span>
    </el-dialog>
    <!-- 修改绑定淘宝-->
    <el-dialog title="修改刷单数" :visible.sync="taodialog" width='30%' >
      <ul class='touBox'>
        <li class='touList'><span class='touLabel'>修改数量：</span><el-input-number v-model="taoNum" :min="1" :precision="0"  class='danInp' size='small' ></el-input-number></li>
      </ul>
      <span slot="footer" class="dialog-footer">
          <el-button  type='primary' @click="tjpXiu" size='small'>确定</el-button>
          <el-button @click="taodialog = false" size='small'>取消</el-button>
      </span>
    </el-dialog>
    <!-- 修改绑定京东 -->
    <el-dialog title="修改刷单数" :visible.sync="jingdialog" width='30%' >
      <ul class='touBox'>
        <li class='touList'><span class='touLabel'>修改数量：</span><el-input-number v-model="jdNum" :min="1" :precision="0"  class='danInp' size='small' ></el-input-number></li>
      </ul>
      <span slot="footer" class="dialog-footer">
          <el-button  type='primary' @click="tjpXiu" size='small'>确定</el-button>
          <el-button @click="jingdialog = false" size='small'>取消</el-button>
      </span>
    </el-dialog>
    <!-- 修改绑定拼多多 -->
    <el-dialog title="修改刷单数" :visible.sync="pingdialog" width='30%' >
      <ul class='touBox'>
        <li class='touList'><span class='touLabel'>修改数量：</span><el-input-number v-model="pingNum" :min="1" :precision="0"  class='danInp' size='small' ></el-input-number></li>
      </ul>
      <span slot="footer" class="dialog-footer">
          <el-button  type='primary' @click="tjpXiu" size='small'>确定</el-button>
          <el-button @click="pingdialog = false" size='small'>取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {handSelf, handSelfs,shuaGai,sendMsgShua,tjpGai} from '../../api/self'
  export default {
    data(){
      return {
        textarea:'',
        fa:1,//群发短信状态判断
        money:'',
        password:'',
        passwords:'',
        passwordss:'',
        phone:'',
        textdialog:false,
        passdialog:false,
        baodialog:false,
        choosedialog:false,
        shuadialog:false,
        taodialog:false,
        jingdialog:false,
        pingdialog:false,
        info:'',
        infoMessage:[],
        types:'',
        num:'',
        taoNum:'',
        jdNum:'',
        pingNum:''
      }
    },
    mounted(){
      handSelf().then(response=>{
        var data=response
        this.info=data;
        this.infoMessage=data.course;
        this.num=data.num
        this.taoNum=data.rule.handTaoCount;
        this.jdNum=data.rule.handJdCount;
        this.pingNum=data.rule.handPddCount;
      }).catch(error=>{})
    },
    methods: {
      // 新手引导设置
      editor(){
        this.$router.push('/selfXin')
      },
      // 新手引导设置查看
      message(id){
        console.log(id)
        this.$router.push({
          name:'selfMessage',
          params: {
            id:id
          }
        })
      },
      // 保证金修改
      bao(){
        var that=this;
        if(this.money==""){
          this.$message.warning('请输入金额')
        }else if(this.money<0){
          this.$message.warning('请输入正确的金额')
        }else if(this.password==''){
          this.$message.warning('请输入操作密码')
        }else{
          handSelfs(1,this.password,this.money).then(response=>{
            var data=response
            this.baodialog = false
            if(data.msg==1){
              this.$message.success('修改成功')
              setTimeout(function(){
                that.$router.go(0)
              },500)
            }else if(data.msg==3){
              this.$message.error('密码错误')
            }
          }).catch(error=>{})
        }
      },
      // 用户推荐状态修改
      pass(types){
        this.types=types
        this.passdialog = true
      },
      //刷单数修改
      shua(){
        var that=this;
        if(!this.num){
          this.$message.warning('请输入数量');
        }else{
          console.log(this.num);
          shuaGai(this.num).then(response=>{
            var data=response;
            this.$message.success('修改成功')
            setTimeout(function(){
              that.$router.go(0)
            },500)
          }).catch(error=>{
            console.log(error);
          })
        }
      },
      //刷单数修改
      tjpXiu(){
        var that=this;
        if(!this.taoNum||!this.jdNum||!this.pingNum){
          this.$message.warning('请输入数量');
        }else{
          console.log(this.taoNum);
          tjpGai(this.taoNum,this.jdNum,this.pingNum).then(response=>{
            var data=response;
            this.$message.success('修改成功')
            setTimeout(function(){
              that.$router.go(0)
            },500)
          }).catch(error=>{
            console.log(error);
          })
        }
      },
      //群发短信
      send(){
        this.fa=0;
        if(this.textarea){
          if(this.passwordss){
            sendMsgShua(this.textarea,this.passwordss).then(response=>{
              const data=response;
              console.log(data);
              if(data.msg==1){
                this.fa=1;
                this.$message.success('群发成功！')
              }else if(data.msg==4){
                this.fa=1;
                this.$message.success('密码错误！')
              }
            }).catch()
          }else{
            this.fa=1
            this.$message.warning('密码不能为空！')
          }
        }else{
          this.fa=1
          this.$message.warning('发送信息不能为空！')
        }

      },
      passChange(){
        var that=this;
        if(this.passwords==''){
          this.$message.warning('请输入操作密码')
        }else{
          handSelfs(this.types,this.passwords,'').then(response=>{
            var data=response
            this.passdialog = false
            if(data.msg==1){
              this.$message.success('修改成功')
              setTimeout(function(){
                that.$router.go(0)
              },500)
            }else if(data.msg==3){
              this.$message.error('密码错误')
            }
          }).catch(error=>{})
        }
      }
    }
  }
</script>

<style scoped>
  .all-box{
    margin-bottom:30px;
  }
  .all-boxs{
    background:#fff;
  }
  .chong .recharge-pay{
    background:none;
    padding:0;
  }
  .recharge-info{
    margin-bottom:20px;
    background:#E6F7FF;
    border-radius:4px;
    border:1px solid #91D5FF;
  }
  .rechare-change{
    float:right;
    font-size:14px;
    color:#F5222D;
    font-weight:bold;
    cursor:pointer;
  }
  .self .rechare-title{
    font-size:16px;
    color:#000;
    font-weight:bold;
    text-align: left;
    border-bottom:1px solid rgba(0,0,0,0.08);
    margin-bottom:20px;
    padding-bottom:20px;
  }
  .rechare-span{
    font-size:14px;
    color:rgba(0,0,0,0.45);
  }
  .info-box{
    padding:15px;
    font-size:14px;
    text-align: left;
    line-height:30px;
  }
  .chong-fl{
    background:#fff;
    padding:20px;
  }
  .chong .info-fl{
    float:left;
    width:8%;
    position:relative;
    height:144px;
  }
  .chong .icons{
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
  .chong-list{
    width:100%;
    height:120px;
    border-bottom:1px solid #E9E9E9;
    display:flex;
  }
  .chong-lists{
    width:100%;
    height:150px;
    border-bottom:1px solid #E9E9E9;
    overflow:hidden;
  }
  .chong-listss{
    border:none;
    height:120px;
  }
  .chong-list .money-yu{
    text-align:left;
    flex-grow:1
  }
  .money-yu .moneyYutitle{
    font-size:14px;
    color:#000;
    display:block;
    width:100%;
    margin-top:30px;
  }
  .money-yu .moneyYumoney{
    font-size:24px;
    color:#F5222D;
    display:block;
    width:100%;
  }
  .chongNi{
    width:52%;
    text-align:left;
    font-size:14px;
    color:#000;
    margin-top:60px;
    margin-bottom:10px;
    display:block;
  }
  .chongNiss{
    margin-top:30px;
  }
  .chongNis{
    font-size:14px;
    text-align:left;
    color:#F5222D;
  }
  .chongNi:nth-last-child(1){
    margin:0;
  }
  .chong-label{
    color:rgba(0,0,0,0.45);
  }
  .chong-labels{
    float:right;
    color:#1890FF;
    cursor:pointer;
  }
  .long-btn{
    width:160px;
  }
  .self .chong-types{
    border-bottom:1px solid #e9e9e9;
  }
  .chong-type:nth-last-child(1){
    border:none;
  }
  .zhi-icon{
    display:block;
    margin-top:30px;
    margin-bottom:14px;
  }
  .chong-message{
    display:flex;
    justify-content:space-between;
    font-size:14px;
    text-align:left;
    color:#000;
    margin-bottom:10px;
    width:100%;
    cursor:pointer;
  }
  .chongs-message{
    overflow:hidden;
    display:block;
  }
  .chong-messagess:hover{
    color:#1890ff;
  }
  .chong-import{
    color:#F5222D;
  }
  .self-margin{
    cursor:pointer;
    color:#1890FF;
  }
  .selfs-margin{
    float:right;
    margin-left:16px;
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
  .danInp{
    width:60%;
  }
  .chong-all-message{
    justify-content: flex-start;
  }
  .all-message{
    display:flex;
    justify-content: space-between;
    align-items: flex-end;
    width:80%;
  }
</style>
