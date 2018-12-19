<template>
  <div>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col v-if='info.detail!=null'>
        <ul class="loading-tips loading-ge">
          <li class='loading-list'><label class='alert-label' >买  号：</label>{{info.taoAccount}}</li>
          <li class='loading-list' v-if='info.detail.sex==1'><label class='alert-label'>性　　别:</label>男</li>
          <li class='loading-list' v-if='info.detail.sex==2'><label class='alert-label'>性　　别:</label>女</li>
          <li class='loading-list'><label class='alert-label'>出生日期：</label> {{info.detail.birthday}}</li>
          <li class='loading-list'><label class='alert-label'>地　　区：</label> {{info.detail.province}}{{info.detail.city}}{{info.detail.area}}</li>
          <li class='loading-list'><label class='alert-label' >银行卡：</label>{{info.bankCard}}</li>
          <li class='loading-list'><label class='alert-label' >开户行：</label>{{info.bankOfName}}</li>
          <li class='loading-list'><label class='alert-label' >开户人：</label>{{info.bankName}}</li>
          <li class='loading-list'><label class='alert-label' >支行名称：</label>{{info.bankArea}}</li>
          <li class='loading-list'><label class='alert-label' >支付宝账号：</label>{{info.payNums}}</li>
          <li class='loading-list'><label class='alert-label' >支付宝昵称：</label>{{info.payName}}</li>
        </ul>
        <div class="loading-tips loading-ge loading-tipss">
          <label class='alert-label'>身份认证图：</label>
          <img :src="info.pic.cardFront" alt="" class='up-imgs' @click="bigImg" >
          <img :src="info.pic.cardReverse" alt="" class='up-imgs' @click="bigImg" >
        </div>
        <div class="loading-tips loading-ge loading-tipss">
          <label class='alert-label'>淘宝号实名认证图：</label>
          <img :src="info.pic.messageImg" alt="" class='up-imgs' @click="bigImg" >
        </div>
        <div class="loading-tips loading-ge loading-tipss">
          <label class='alert-label'>手持身份认证图：</label>
          <div class='tipBox'>
            <img :src="info.pic.cardHand" alt="" class='up-imgs' @click="bigImg" >
          </div>
        </div>
        <div class="loading-tips loading-ge loading-tipss">
          <label class='alert-label'>支付宝实名认证图：</label>
          <div class='tipBox'>
            <img :src="info.pic.cardPay" alt="" class='up-imgs' @click="bigImg" >
          </div>
        </div>
        <div class="loading-tips loading-ge loading-tipss">
          <label class='alert-label'>淘气值认证图：</label>
          <div class='tipBox'>
            <img :src="info.pic.cardValue" alt="" class='up-imgs' @click="bigImg" >
          </div>
        </div>
      </el-col>
    </el-row>
    <!--**图片放大**-->
    <div class="mask" v-show="show" @click="small">
      <img :src="bigsrc" alt="" class="bigimg">
    </div>
  </div>
</template>

<script>
  export default {
    name: "company",
    data(){
      return{
        show:false,
        bigsrc:''
      }
    },
    props:['info'],
    methods:{
      bigImg(e){
        this.show=true;
        this.bigsrc=e.target.currentSrc;
      },
      //隐藏原图
      small(){
        this.show=false;
      },
    }
  }
</script>

<style scoped>
  body{
    background: #f8f8f8;
  }
  .steps{
    margin-top:50px;
  }
  .all-box{
    background:#fff;
    padding:20px;
  }
  .recharge-info .info-box{
    border:none;
  }
  .recharge-info{
    margin-bottom:44px;
    overflow:hidden;
    background:#E6F7FF;
    border-radius:4px;
    border:1px solid #91D5FF;
    height:124px;
  }
  .info-fl{
    float:left;
    width:10%;
    position:relative;
    display:flex;
    height:124px;
    justify-content:center;
    flex-direction:column;
  }
  .icons{
    width:24px;
    height:24px;
    display:block;
    border:2px solid #1890FF;
    color:#1890FF;
    font-size:20px;
    text-align:center;
    line-height:24px;
    border-radius:50%;
    margin:0 auto;
    font-weight:bold;
  }
  .rechare-span{
    color:#F5222D;
  }
  form{
    background:#fff;
    border-radius:4px;
    /*box-shadow: 0 0 10px rgba(0,0,0,0.1);*/
  }
  .form-item{
    text-align:left;
  }
  #app .all-box .el-form-item__content{
    text-align: left;
  }
  .all-box .el-radio-group{
    margin:0;
  }
  .radio-label{
    display:inline-block;
  }
  .select{
    width:100%;
  }
  .rechare-title{
    font-size:16px;
    color:#000;
    text-align: left;
    margin-bottom:10px;
  }
  .info-box{
    padding:15px;
    width:90%;
    float:left;
    font-size:14px;
    text-align: left;
    line-height:30px;
   
  }
  .up-all{
    width:100%;
    overflow:hidden;
  }
  .up-label{
    width:130px;
    text-align:left;
    float:left;
    padding-right:12px;
  }
  .upBox{
    overflow:hidden;
    width:700px;
    float:left;
  }
  .up-img{
    width:148px;
    height:148px;
    float:left;
    border-radius:4px;
    margin-right:30px;
    position: relative;
    overflow:hidden;
  }
  .up-imgs{
    width:100%;
    height:100%;
  }
  .upmask-img{
    width:100%;
    text-align: center;
    line-height:148px;
    color:#fff;
    font-size:16px;
    background:rgba(0,0,0,0.5);
    position: absolute;
    left:0;
    top:0;
    cursor:pointer;
  }
  .up_load{
    float:left;
  }
  .el-upload__tip{
    display:inline;
    width:60%;
    margin-left:20px;
  }
  .submit{
    margin-top:50px;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
  }
  .mask{
    width:100%;
    height:100%;
    position:fixed;
    left:0;
    top:0;
    background:rgba(0,0,0,0.6);
    z-index:2;
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
</style>
