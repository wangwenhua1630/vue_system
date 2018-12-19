<template>
  <div class='noticMessageget'>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="store-inner">
          <p class='break'><router-link to='/notic'><img src="../../assets/hui.png" alt="" class='back-icon' ></router-link></p>
          <p class='title'>{{info.title}}</p>
          <p class='time'>{{info.createAt}}</p>
          <div id='con'></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {noticMessageget} from '../../api/vip'
  export default {
    data(){
      return {
        ids:this.$route.params.id,
        info:''
      };
    },
    mounted(){
      noticMessageget(this.$route.params.id).then(response=>{
        var data=response
        this.info=data.message
        var doc=document.getElementById('con')
        doc.innerHTML=data.message.content
      }).catch(error=>{})
    },
    methods:{
    }
  }
</script>

<style>
.noticMessageget .title{
  width:100%;
  text-align:center;
  font-size:16px;
  color:#2c2c2c;
  margin-bottom:10px;
}
.noticMessageget .time{
  width:100%;
  text-align:right;
  font-size:14px;
  color:#a0a0a0;
  margin-bottom:10px;
}
.store-inner{
  background:#fff;
  padding:20px;
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
  color:#1890ff;
}
.notic-title{
  margin-right:50px;
}
.notic-time{
  color:#909399;
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
