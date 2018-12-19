<template>
    <div>
      <el-row class="contain row-bg" type="flex"  justify="center">
        <el-col>
          <div class="store-inner">
            <p class='break'>
              <router-link to='/custom' >
                <img src="../../assets/hui.png" alt="" class='back-icon' >
              </router-link>
            </p>
            <ul class="tabel-info tabel-infos">
              <li class="tabel-title"><span class="tabel-label">任务编号：</span>{{info.idNum}}</li>
              <li class="tabel-title"><span class="tabel-label">订单编号：</span>{{info.orderId}}</li>
              <li class="tabel-title"><span class="tabel-label">工单状态：</span>
                <span v-if='info.workOtherStatus==1'>待处理</span>
                <span v-if='info.workOtherStatus==2'>待执行</span>
                <span v-if='info.workOtherStatus==3'>已撤销</span>
              </li>
              <li class="tabel-title"><span class="tabel-label">工单类型：</span>任务处罚</li>
              <li class="tabel-title"><span class="tabel-label">问题分类：</span>{{info.problemCondition}}</li>
              <li class="tabel-title"><span class="tabel-label">提交时间：</span>{{info.createAt}}</li>
            </ul>
            <ul class="tabel-info">
              <li class="tabel-title"><span class="tabel-label">处理方式：</span>{{info.dispose}}</li>
              <li class="tabel-title"><span class="tabel-label">处罚金额：</span>{{info.punishMoney}}</li>
              <li class="tabel-title"><span class="tabel-label">处理结果：</span>{{info.punishResult}}</li>
            </ul>
            <p class='break'>任务处理情况记录</p>
            <div class='remember'>
              
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    import {findMsgById} from '../../api/custom';
    export default {
        name: "custom-message",
        data(){
          return{
            ids:this.$route.params.id,
            info:''
          }
        },
        mounted(){
          console.log(this.ids)
          findMsgById(this.ids).then(response => {
            const data = response;
             if(data.msg==1){
                this.info=data.HandTaskErrorMsg
             }
          }).catch(error => {
            reject(error);
          }); 
        },
        methods:{
           
        }
    }
</script>

<style scoped>
  .store-inner{
    background:#fff;
    padding:20px;
    height:100%;
  }
  .tabel-info{
    border:1px solid #ccc;
    text-align: left;
    font-size:14px;
    margin-bottom:20px;
  }
  .tabel-infos{
    display: flex;
    flex-wrap:wrap;
    border-bottom:none;
    margin:0;
  }
  .tabel-infos .tabel-title{
    border-bottom:1px solid #ccc;
    width:33.33%;
    height:30px;
    line-height:30px;
  }
  .tabel-info .tabel-title{
    border-bottom:1px solid #ccc;
    height:30px;
    line-height:30px;
  }
  .tabel-infos .tabel-title:nth-last-child(3){
    border:none;
  }
  .tabel-infos .tabel-title:nth-last-child(2){
    border:none;
  }
  .tabel-info .tabel-title:nth-last-child(1){
     border:none;
  }
  .tabel-info .tabel-title:nth-child(1) .tabel-label{
    border-left:none;
  }
  .tabel-info .tabel-title:nth-child(4) .tabel-label{
    border-left:none;
  }
  .tabel-info .tabel-title:nth-child(2) .tabel-label{
    border-left:none;
  }
  .tabel-info .tabel-title:nth-child(3) .tabel-label{
    border-left:none;
  }
  .tabel-infos .tabel-title:nth-child(2) .tabel-label{
    border-left:1px solid #ccc;
  }
  .tabel-infos .tabel-title:nth-child(3) .tabel-label{
    border-left:1px solid #ccc;
  }
  .tabel-title .tabel-label{
    border-right:1px solid #ccc;
    border-left:1px solid #ccc;
    background:#f5f7fa;
    display:inline-block;
    width:120px;
    height:100%;
    text-align: center;
    margin-right:20px;
  }
  a{
    color:#606266;
  }
  .remember{
    width:100%;
    height:400px;
    border:1px solid #ccc;
  }
  .break a{
    display:block;
    width:100%;
    height:100%;
  }
  .back-icon{
    width:20px;
    height:20px;
  }
</style>
