<template>
  <div class='messagess'>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="store-inner">
          <p class='break'><router-link to='/messageNotic'><img src="../../assets/hui.png" alt="" class='back-icon' ></router-link></p>
          <p class='title'>{{info.title}}</p>
          <p class='time'>{{info.createAt}}</p>
          <div id='con'></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {Listinfo} from '../../api/message'
  export default {
    data(){
      return {
        ids:this.$route.params.id,
        info:'',
        content:'<p>攻击力会</p><p>jbjk1</p><p>3216</p>'
      };
    },
    mounted(){
      Listinfo(this.ids).then(response=>{
        var data=response
        this.info=data.message
        var doc=document.getElementById('con')
        doc.innerHTML=data.message.content
      }).catch(error=>{

      })
    },
  }
</script>

<style>
.messagess .title{
  text-align: center;
  width:100%;
  margin-bottom:20px;
  color:#2c2c2c;
  font-size:16px;/*px*/
}
.messagess .time{
  text-align: right;
  width:100%;
  color:#a0a0a0;
  margin-bottom:20px;
  font-size:14px;/*px*/
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
  color:#F56C6C;
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
