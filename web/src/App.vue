<template>
  <div id="app">
    <div v-wechat-title="$route.name"></div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App' ,
  data(){
    return{
      selected:''
    }
  },
  watch: {
    $route(to, from) {
      if(to.path=='/homes'){
        this.selected=1
      }else if(to.path=='/main'){
        this.selected=2
      }
      localStorage.setItem('selected',this.selected);
    }  
  }

}
</script>

<style>
@import './style/reset.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background:#f8f8f8;
  height:100%;
  overflow:auto;
}
html,body{
  height:100%;
  background:#f8f8f8;
  overflow:auto;
}
.style-btn{
  color:#fff;
  text-align:center;
  font-size:26px;/*px*/
  background:linear-gradient(-135deg,rgba(253,149,10,1),rgba(253,80,2,1));
  border-radius:100px;
}
#app .style-color{
  color:#FF2613;
}
.mint-popup-bottom{
    width:100%;
  }
  .picker-item{
    text-align:center;
  }
  .caozuo{
    width:100%;
    padding:0 20px;
    display:flex;
    justify-content:space-between;
    font-size:30px;
  }
  .cancel{
    height:100px;
    line-height:100px;
    color:#a0a0a0;
    flex-grow: 1;
    text-align:left;
  }
  .confirm{
    height:100px;
    line-height:100px;
    color:#FD950A;
    flex-grow: 1;
    text-align:right;
  }
  .cancels{
    height:60px;
    line-height:60px;
    color:#a0a0a0;
    text-align:center;
    border:1px solid #a0a0a0;
    border-radius:60px;
    width:120px;
  }
  .confirms{
    height:60px;
    line-height:60px;
    color:#fff;
    text-align:center;
    background:linear-gradient(-135deg,rgba(253,149,10,1),rgba(253,80,2,1));
    border-radius:60px;
    width:120px;
  }
  .caozuo .cancel{
    height:100px;
    line-height:100px;
    border:0;
    color:#a0a0a0;
    border-radius: 0;
    text-align:left;
  }
  .caozuo .confirm{
    height:100px;
    line-height:100px;
    border:0;
    color:#FD950A;
    border-radius: 0;
    background:none;
    text-align:right;
  }
  .up-inp{
    display:block;
    width:100%;
    height:100%;
    opacity:0;
    position:absolute;
    left:0;
    top:0;
  }
  .empty{
    width:100%;
    height:100%;
    text-align:center;
    line-height:1000px;
    font-size:40px;
    color:#2c2c2c;
    display:flex;
    justify-content:center;
    flex-direction:column;
  }
  .empty-icon{
    margin:0 auto;
    width:410px;
    height:384px;
    margin-top:100px;
    display:block;
  }
  .mint-indicator-text{
    font-size:30px;/*px*/
  }
  .mint-toast-text{
    font-size:30px;/*px*/
  }
</style>
