<template>
  <div class='huan'>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="alls-box">
          <div class='box-card'>
            <p class='huan-title'>余额兑换发布点</p>
            <div class="recharge-info">
              <div class='info-fl'><p class='icons'>i</p></div>
              <div class="infos-box">别说我没告诉你：9月21日起，所有数据只会保留50天，超时将永久删除，请提前做好对账工作。</div>
            </div>
            <div class='huan-message'>
              <div class='huan-icon'>
                <img src="../../assets/huan-icon1.png" alt="" class='huan-icons' >
                <img src="../../assets/huan-icon2.png" alt="" class='huan-icons huan-line' >
                <img src="../../assets/huan-icon3.png" alt="" class='huan-icons' >
              </div>
              <div class='huanFl'>
                <div class='huan-money'>
                  <p class='huanmTitle'>资金余额</p>
                  <p class='messaeMoney'>￥{{info.moneysBalance}}</p>
                </div>
                <div class='huan-money'>
                  <p class='huanmTitle'>可用发布点</p>
                  <p class='messaeMoney'>{{info.issuePoint}}点</p>
                </div>
              </div>
              <div class='huanRl'>
                <!-- <div class='huan-money'>
                  <p class='huanmTitle'>总发布点（发布点+保证金）</p>
                  <p class='messaeMoneys'>{{allDian}}点</p>
                </div> -->
              </div>
            </div>
            <p class='huan-inp'>
              将
              <el-input v-model="input" size='small' placeholder="在此输入兑换金额" class='huan-inps'></el-input>
              元兑换成发布点
              <span class='huan-li'>（兑换比例：1元=1.00点）</span>
            </p>
            <p class='huan-btn huan-btns' @click="huan(1)">兑换成点</p>
          </div>
          <div class='box-card'>
            <p class='huan-title'>发布点兑换余额</p>
            <div class="recharge-info">
              <div class='info-fl'><p class='icons'>i</p></div>
              <div class="infos-box">别说我没告诉你：9月21日起，所有数据只会保留50天，超时将永久删除，请提前做好对账工作。</div>
            </div>
            <div class='huan-message'>
              <div class='huan-icon'>
                <img src="../../assets/huan-icon1.png" alt="" class='huan-icons' >
                <img src="../../assets/huan-icon2.png" alt="" class='huan-icons huan-line huan-lines' >
                <img src="../../assets/huan-icon3.png" alt="" class='huan-icons' >
              </div>
              <div class='huanFl'>
                <div class='huan-money'>
                  <p class='huanmTitle'>资金余额</p>
                  <p class='messaeMoney'>￥{{info.moneysBalance}}</p>
                </div>
                <div class='huan-money'>
                  <p class='huanmTitle'>可用发布点</p>
                  <p class='messaeMoney'>{{info.issuePoint}}点</p>
                </div>
              </div>
              <div class='huanRl'>
               <!--  <div class='huan-money'>
                  <p class='huanmTitle'>总发布点（发布点+保证金）</p>
                  <p class='messaeMoneys'>{{allDian}}点</p>
                </div> -->
              </div>
            </div>
            <p class='huan-inp'>
              将
              <el-input v-model="inputs" size='small' placeholder="在此输入兑换发布点" class='huan-inps'></el-input>
              发布点兑换成余额
              <span class='huan-li'>（兑换比例：1元=1.00点）</span>
            </p>
            <p class='huan-btn ' @click="huan(2)">兑换成余额</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="支付" :visible.sync="dialogFormVisible" width='30%' >
      <el-form>
        <el-form-item label="支付密码">
          <el-input v-model="password" auto-complete="off" placeholder='请输入支付、提现密码' type='password' ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {exchange} from '../../api/money';
  import {moneys} from '../../api/money';
  export default {
    data(){
      return {
        dialogFormVisible:false,
        password:'',
        info:'',
        input:'', //余额换发布点
        inputs:'', //发布点还余额
        index:'',
        moneys:1200,
        dian:1000,
        allDian:2000
      }
    },
    mounted(){
      moneys().then(response => {
        const data = response;
         if(data.msg==1){
            this.info=data.businessAccount
            this.allDian=data.businessAccount.issuePoint+1000
         }
      }).catch(error => {
        reject(error);
      }); 
    },
    methods: {
      // index=2 兑换余额 index=1兑换成发布点
      // 
      huan(index){
        this.index=index;
        if(index==1){
          if(this.input>this.info.moneysBalance){
            this.input=''
            this.$message.error('余额不足');
          }else if(this.input==''){
            this.$message.error('请输入余额');
          }else{
            this.dialogFormVisible=true;
          }
        }else{
          if(this.inputs>this.info.issuePoint){
            this.input=''
            this.$message.error('发布点不足');
          }else if(this.inputs==''){
            this.$message.error('请输入发布点');
          }else{
            this.dialogFormVisible=true;
          }
        }
      },
      confirm(){
        // 需要输入支付密码，假如支付密码通过
        // index为1表示将余额兑换成发布点，2表示发布点换余额
        this.dialogFormVisible=false;
        if(this.password!=''){
          if(this.index==1){
            exchange(this.input,1,this.password).then(response => {
              const data = response;
               if(data.msg==1){
                  this.$message.success('兑换成功');
                  this.info=data.account
                  this.allDian=data.account.issuePoint+1000
               }else if(data.msg==3){
                   this.$message.error('余额不足');
               }else if(data.msg==4){
                   this.$message.error('支付密码错误');
               }
            }).catch(error => {
              reject(error);
            }); 
          }else{
            exchange(this.inputs,2,this.password).then(response => {
              const data = response;
               if(data.msg==1){
                  this.$message.success('兑换成功');
                  this.info=data.account
                  this.allDian=data.account.issuePoint+1000
               }else if(data.msg==3){
                   this.$message.error('发布点不足');
               }else if(data.msg==4){
                   this.$message.error('支付密码错误');
               }
            }).catch(error => {
              reject(error);
            }); 
          }
        }else{
          this.$message.error('请输入支付密码');
        }
      }
    }
  }
</script>

<style>
  .huan .alls-box{
    padding:0;
  }
  .box-card{
    background:#fff;
    padding:20px;
    margin-bottom:30px;
    border-radius:2px;
  }
  .huan-title{
    font-size:16px;
    color:#000;
    margin-bottom:16px;
    text-align:left;
  }
  .huan .recharge-info{
    border:1px solid #91D5FF;
    background:#E6F7FF;
    border-radius:4px;
    width:80%;
    margin-bottom:30px;
  }
  .huan .info-fl{
    float:left;
    width:6%;
    position:relative;
    height:40px;
  }
  .huan .icons{
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
  .huan .infos-box{
    padding:0;
    font-size:14px;
    text-align: left;
    line-height:40px;
  }
  .huan-message{
    width:100%;
    overflow:hidden;
    height:120px;
    margin-bottom:30px;
  }
  .huan-icon{
    float:left;
    height:100%;
    display:flex;
    justify-content:space-between;
    flex-direction:column;
    margin-right:10px;
    width:20px;
  }
  .huan-icons{
    display:block;
    width:20px;
    height:20px;
  }
  .huan-icon .huan-line{
    width:7px;
    height:56px;
    display:block;
    margin:0 auto;
  }
  .huan-icon .huan-lines{
    transform:rotate(180deg);
  }
  .huanFl{
    float:left;
  }
  .huan-money{
    margin-bottom:20px;
  }
  .huanmTitle{
    font-size:14px;
    color:#000;
    text-align:left;
  }
  .messaeMoney{
    font-size:24px;
    text-align:left;
    color:#F5222D;
  }
  .huanRl{
    float:left;
    margin-left:80px;
  }
  .messaeMoneys{
    font-size:24px;
    text-align:left;
    color:#000;
  }
  .huan-inp{
    font-size:14px;
    color:#000;
    margin-bottom:20px;
    text-align:left;
  }
  .huan-li{
    color:#F5222D;
  }
  .huan-inps{
    border-bottom:1px solid #1890FF;
    width:140px;
  }
  .huan-inp .el-input__inner{
    border:none;
  }
  .huan-btn{
    width:150px;
    height:30px;
    background:rgba(254,190,0,1);
    border-radius:15px;
    text-align:center;
    line-height:30px;
    color:#fff;
    cursor:pointer;
  }
  .huan-btns{
    background:linear-gradient(-135deg,rgba(53,195,255,1),rgba(24,144,255,1));
  }
</style>
