<template>
  <div class='taskType'>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="taskTypes">
          <div class='typeBox'>
            <p class='typeheader'>所属平台选择 <span class='typeClose' @click='close' >X</span> </p>
            <div class='typebody'>
              <el-card class="box-card" shadow="hover" v-bind:class="[typeIndex==1 ? activeClass : '']" >
                <div slot="header" class="clearfix"  @click='choose(1)' >
                  <span>淘宝</span>
                </div>
                <div class="text item" @click='choose(1)' >
                  <img src="../../../assets/tao.png" alt="">
                </div>
              </el-card>
              <el-card class="box-card" shadow="hover" v-bind:class="[typeIndex==2 ? activeClass : '']" >
                <div slot="header" class="clearfix"  @click='choose(2)' >
                  <span>京东</span>
                </div>
                <div class="text item" @click='choose(2)'>
                  <img src="../../../assets/jd.png" alt="">
                </div>
              </el-card>
              <el-card class="box-card" shadow="hover" v-bind:class="[typeIndex==3 ? activeClass : '']" >
                <div slot="header" class="clearfix"   @click='choose(3)' >
                  <span>拼多多</span>
                </div>
                <div class="text item" @click='choose(3)'>
                  <img src="../../../assets/pdd.png" alt="">
                </div>
              </el-card>
            </div>
            <div class='typefooter'>
              <el-button type='primary' size='small' class='typeBtn' @click='confirms' >确定</el-button>
              <el-button  size='small' class='typeBtn'  @click='cancle' >取消</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        typeIndex:'',
        activeClass: 'active',
      }
    },
    methods: {
      // 选择类型
      choose(index){
        this.typeIndex=index
      },
      // 确定
      confirms(){
        this.$emit("taibox",this.typeIndex)
      },
      // 取消
      cancle(){
        this.$emit("taibox",0)
      },
      // 关闭
      close(){
        this.$emit("taibox",0)
      }
    }
  }
</script>

<style>
  .taskTypes{
    width:80%;
    background:#fff;
    margin:0 auto;
  }
  .taskType .recharge-info{
    border:1px solid #91D5FF;
    background:#E6F7FF;
    border-radius:4px;
    width:70%;
    margin-top:24px;
    float:left;
  }
  .typeheader{
    height:55px;
    border-bottom:1px solid rgba(0,0,0,0.09);
    padding:0 20px;
    text-align:left;
    line-height:55px;
  }
  .typeClose{
    float:right;
  }
  .typefooter{
    height:76px;
    border-top:1px solid rgba(0,0,0,0.09);
    overflow:hidden;
    padding:0 20px;
  }
  .taskType .info-fl{
    float:left;
    width:6%;
    position:relative;
    height:40px;
  }
  .taskType .icons{
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
  .taskType .infos-box{
    padding:0;
    font-size:14px;
    text-align: left;
    line-height:40px;
  }
  .typebody{
    padding:30px;
    display:flex;
    justify-content:space-around;
  }
  .typeList{
    margin-bottom:20px;
  }
  .typeTitle{
    font-size:14px;
    color:#000;
    margin-bottom:6px;
  }
  .typeText{
    font-size:12px;
    color:rgba(0,0,0,0.45);
  }
  .typeTexts{
    color:#F5222D
  }
  .taskType .el-card{
    border:none;
  }
  .taskType .el-card__header{
    background:#F0F2F5;
    padding:10px 20px;
  }
  .taskType .box-card.active .el-card__header {
    background:#1890FF;
    color:#fff;
  }
  .box-card{
    cursor:pointer;
  }
  .taskType .box-card.active{
    box-shadow:0 0 20px rgba(0,0,0,0.8)
  }
  .typeBtn{
    float:right;
    margin-right:20px;
    margin-top:30px;
  }
</style>
