<template>
  <div>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="store-inner">
          <el-steps :active="active"  simple style="margin-bottom: 30px">
            <el-step title="第一步：来路设置" ></el-step>
            <el-step title="第二步：任务要求填写" ></el-step>
            <el-step title="第三步：价格/发布时间" ></el-step>
            <el-step title="第四步：备注" ></el-step>
          </el-steps>
          <!-- <sendOne></sendOne> -->
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import sendOne from './send/sendOne'
  export default {
    data(){
      return {
        active:1
      };
    },
    mounted:function(){
       

    },
    // =======方法列表
    methods: {
      
    },
    watch:{
      $route(to, from){
          if(to.path=='/send'){
            this.active=1
          }else if(to.path=='/send/sendTwo'){
            this.active=2
          }else if(to.path=='/send/sendThree'){
            this.active=3
          }else if(to.path=='/send/sendFour'){
            this.active=4
          }
        }  
    }
  }
</script>

<style>
.store-inner{
  background:#fff;
  padding:20px;
}
.store-inner .el-step.is-simple .el-step__title{
  font-size:14px;
}
</style>
