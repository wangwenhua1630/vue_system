<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
    
<script>

  export default {
    data() {
      return {
      };
    },
    mounted(){
       
    },
    methods: {},
    watch: {  
        $route(to, from) {  
          if(to.path=='/homes'||to.path=='/home'||to.path=='/role'){
            this.nav=1
          }else{
            this.nav=2
          }
          var nav=JSON.stringify({'nav':this.nav,'navIndex':to.path})
          localStorage.setItem('nav',nav);
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
  height:100%;
  background:#f8f9fb;
  /*background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);*/
}
  html{
    height:100%;
  }
body{
  background:#f8f8f8;
  height:100%;
}
h1, h2 {
  font-weight: normal;
}
.break{
    font-size:16px;
    color:#1890FF;
    margin-bottom:20px;
    text-align:left;
    cursor:pointer;
  }
  .break a{
    color:#1890FF;
  }
      .row-bg .el-table .table-header{
    background:#f5f7fa;
  }
  .el-table th, .el-table tr.table-header{
    background:#f5f7fa;
  }
  .style-btn{
    background:linear-gradient(-135deg,rgba(53,195,255,1),rgba(24,144,255,1));
  }
  .next-btn{
    width:300px;
  }
  .el-table th, .el-table tr.warning-row{
    background:#F5FCFF;
  }
  .el-form-item__label{
    color:#000;
  }
</style>
