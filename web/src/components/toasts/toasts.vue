<template>
  <transition name='fade'>
      <div class='alert' v-show='show'>
        <div class='alertMask'>
          <div class='alertBox'>
            <div class='alertIcon'></div>
            <div class='alertText'>{{message}}</div>
          </div>
        </div>
    </div>
  </transition>
</template>

<style>
  .alert{
    width:100%;
    height:100%;
    position:fixed;
    left:0;
    top:0;
    z-index:9999;
  }
  .alertMask{
    width:100%;
    height:100%;
    background:rgba(0,0,0,0);
    position:fixed;
    left:0;
    top:0;
    display:flex;
    justify-content:center;
    flex-direction:column;
  }
  .alertBox{
    padding:30px;
    background:rgba(0,0,0,0.65);
    border-radius:10px;
    margin:0 auto;
  }
  .alertText{
    color:#fff;
    font-size:26px;/*px*/
  }
  .fade-enter,.fade-leave{
    opacity: 0
  }
  .fade-enter-active,.fade-leave-active{
    transition: all 0.5s ease;
  }
</style>

<script>
  export default{
    data(){
      return{
        show:false
      }
    },
    props:{
      message:String
    }
  }
</script>