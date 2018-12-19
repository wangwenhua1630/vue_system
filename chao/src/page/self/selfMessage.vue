<template>
  <div>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="store-inner">
          <p class='break'><router-link to='/self'>新手引导设置</router-link></p>
          <p class='title'>{{info.title}}</p>
          <p class='time'>{{info.createAt}}</p>
          <div id='content'></div>
          <video :src="url" controls="controls" width='500' height='200' v-if='url!=null' ></video>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {handNewmessage} from '../../api/self'
  export default {
    data(){
      return {
        ids:this.$route.params.id,
        url:'',
        info:''
      };
    },
    mounted(){
      handNewmessage(this.ids).then(response=>{
          var data=response
          this.url=data.adminRulesMessage.url
          this.info=data.adminRulesMessage
          var doc=document.getElementById('content')
          doc.innerHTML=data.adminRulesMessage.content
      }).catch(error=>{

      })
    },
    methods:{
    }
  }
</script>

<style>
.store-inner{
  background:#fff;
  padding:20px;
}
.title{
  width:100%;
  text-align:center;
  font-size:16px;
  color:#232323;
  margin-bottom:30px;
}
.time{
  width:100%;
  text-align:right;
  font-size:14px;
  color:#a0a0a0;
  margin-bottom:30px;
}
.notic-list{
  line-height:40px;
  font-size:14px;
  display:flex;
  text-align:left;
  justify-content:space-between;
  cursor:pointer;
}
.notic-list:hover{
  color:#F56C6C;
}
.notic-title{
  margin-right:50px;
}
.notic-time{
  color:#909399;
}
</style>
