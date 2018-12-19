<template>
    <div class="xuan">
      <div class="xuan_txt">点击图片选择平台</div>
      <div class="xuan_list">
          <div class="xuan_list_logo" @click="qie(1)">
            <img src="../../assets/tao.png" alt="" class="xuan_icon" >
            <div class="xuan_list_bottom" v-if="active==1">
              <div class="xuan_dian"></div>
              <span class="xuan_zi">已选择</span>
            </div>
          </div>
          <div class="xuan_list_logo" @click="qie(2)">
            <img src="../../assets/jd.png" alt="" class="xuan_icon">
            <div class="xuan_list_bottom" v-if="active==2">
              <div class="xuan_dian"></div>
              <span class="xuan_zi">已选择</span>
            </div>
          </div>
          <div class="xuan_list_logo" @click="qie(3)">
            <img src="../../assets/pdd.png" alt="" class="xuan_icon" >
            <div class="xuan_list_bottom" v-if="active==3">
              <div class="xuan_dian"></div>
              <span class="xuan_zi">已选择</span>
            </div>
        </div>
      </div>
      <button class="xuan_btn" @click="goXuan">进入选择账号</button>
    </div>
</template>

<script>
    export default {
        name: "xuan",
      data(){
          return{
            active:''    //切换状态
          }
      },
      mounted(){
        var that=this;
        this.$indicator.open('加载中...');
        this.active=sessionStorage.types;
        setTimeout(function(){
          that.$indicator.close()
        },500)
      },
      methods:{
          //选择平台
        qie(index){
          this.active=index;
        },
        goXuan(){
          if(this.active==1){
            sessionStorage.setItem('qie',this.active);
            this.$router.push('/change');
          }else if(this.active==2||this.active==3){
            this.$toast('平台暂未开放');
          }
          else{
            this.$toast('请选择平台');
          }
        }
      }
    }
</script>

<style scoped>
  .xuan_txt{
    width:300px;
    text-align: center;
    margin:241px auto 73px;
    font-size:36px;
    color:#2c2c2c;
    font-weight:400;
  }
  .xuan_list{
    width:652px;
    height:250px;
    margin:0 auto;
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
  .xuan_list_logo{
    width:180px;
    height:240px;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .xuan_list_bottom{
    display:flex;
    justify-content: center;
    align-items: center;
  }
  .xuan_icon{
    width:180px;height:180px;
  }
  .xuan_zi{
    font-size:28px;
    font-weight:400;
    color:#2c2c2c;
  }
  .xuan_dian{
    width:10px;height:10px;
    border-radius: 50%;
    background-color: #FD950A;
    margin-right:9px;
  }
  .xuan_btn{
    width:660px;
    height:80px;
    text-align: center;
    line-height: 80px;
    font-size:36px;
    color:#fff;
    position:fixed;
    bottom:108px;
    left:45px;
    font-weight:500;
    border-radius:100px;
    background:linear-gradient(315deg,rgba(253,149,10,1) 0%,rgba(253,80,2,1) 100%);
  }
</style>
