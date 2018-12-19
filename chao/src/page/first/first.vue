<template>
	<div id="all_box" >
	    <el-row type="flex"  justify="center" class="company-title">
        <el-col :span='22'>
          <el-row  >
            <el-col :span="2"class="company-name">超级管理员</el-col>
            <el-col :span="16"  class="company-name">
              <el-menu default-active="/homes" class="el-menu-vertical-demo" unique-opened text-color="#fff" active-text-color="#FFBF00" router mode="horizontal" popper-class='twoMenu' :default-active="activeIndex" @select="handleSelect">
                <el-menu-item index="/homes">首页</el-menu-item>
                 <el-submenu index="1">
                    <template slot="title">任务管理</template>
                    <el-menu-item index="/task">　　当前任务管理</el-menu-item>
                    <el-menu-item index="/taskOld">　　过往任务管理</el-menu-item>
                    <el-menu-item index="/comment">　　当前任务评价管理</el-menu-item>
                    <el-menu-item index="/commentOld">　　过往任务评价管理</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">资金管理</template>
                    <el-menu-item index="/store/recharge">　　账户修改</el-menu-item>
                    <el-menu-item index="/store/product">　　转账管理</el-menu-item>
                    <el-menu-item index="/store/orders">　　商家资金管理</el-menu-item>
                    <el-menu-item index="/store/ordersMessage">　　刷手资金管理</el-menu-item>
                    <el-menu-item index="/store/exchange">　　平台资金流水</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">消息管理</template>
                  <el-menu-item index="/messageNotic">　　公告发布</el-menu-item>
                  <!-- <el-menu-item index="/messageStore">　　商家提示管理</el-menu-item> -->
                  <el-menu-item index="/innerStore">　　商家站内信管理</el-menu-item>
                  <el-menu-item index="/innerHand">　　刷手站内信管理</el-menu-item>
                </el-submenu>
                 <el-menu-item index="/role">角色管理</el-menu-item>
                <el-submenu index="4">
                  <template slot="title">用户管理</template>
                  <el-menu-item index="/stores">　　商家管理</el-menu-item>
                  <el-menu-item index="/goods">　　刷手管理</el-menu-item>
                  <el-menu-item index="/storeInfo">　　商家信息审核</el-menu-item>
                  <el-menu-item index="/vipMessage">　　刷手信息审核</el-menu-item>
                  <el-menu-item index="/multipleAccounts">　　多账户管理</el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                  <template slot="title">系统设置</template>
                  <el-menu-item index="/mainMessage">　　基本资料</el-menu-item>
                  <el-menu-item index="/self">　　刷手设置</el-menu-item>
                  <el-menu-item index="/shuaDenji">　　刷手等级设置</el-menu-item>
                  <el-menu-item index="/shuaBanner">　　轮播广告设置</el-menu-item>
                  <el-menu-item index="/storeDan">　　商家单量调整</el-menu-item>
                  <el-menu-item index="/storeLei">　　行业类目设置</el-menu-item>
                  <el-menu-item index="/businessRules">　　商家佣金设置</el-menu-item>
                  <el-menu-item index="/businessNoticBox">　　商家公告</el-menu-item>
                  <!-- <el-menu-item index="/storeYao">　　商家内邀</el-menu-item> -->
                </el-submenu>
           </el-menu>
            </el-col>
            <!-- <el-col :span="5" :offset="2">
             <el-radio-group v-model="radio" fill='#FFBF00' text-color='#fff' class='styles'>
                <el-radio :label="1" style='color:#fff; margin-right:30px;' >显示任务</el-radio>
                <el-radio :label="2" style='color:#fff;'>隐藏任务</el-radio>
             </el-radio-group>
            </el-col> -->
            <el-col :span="2"  :offset="4" class="company-name company-names">
              <img src="../../assets/logo-img.png" alt="" class='logo-img' >
              <p class="controllerName">{{account}}</p>
              <ul class='main'>
                <li class='main-list'><router-link to='/mainMessage'>基本资料</router-link></li>
                <li class='main-list' @click='logOut' >退出</li>
              </ul>
            </el-col>
          </el-row>
        </el-col>
	    </el-row>
      <el-row type="flex"  justify="center" class="rowsAll">
        <el-col :span='22'>
          <el-row class="tac">
            <el-col :span="3"  class='tac-nav' v-if='nav==2' >
              <el-menu default-active="/homes" class="el-menu-vertical-demo" unique-opened   router 
              @select="handleSelects" :default-active='activeIndexs' >
                <div v-if='activeIndex=="/task"||activeIndex=="/comment"||activeIndex=="/taskOld"||activeIndex=="/commentOld"'>
                  <p class="nav-title">任务管理</p>
                  <el-menu-item :class="$route.path=='/task' ?'is-active':''" index="/task">当前任务管理</el-menu-item>
                  <el-menu-item :class="$route.path=='/taskOld' ?'is-active':''" index="/taskOld">过往任务管理</el-menu-item>
                  <el-menu-item :class="$route.path=='/comment' ?'is-active':''" index="/comment">当前任务评价管理</el-menu-item>
                  <el-menu-item :class="$route.path=='/commentOld' ?'is-active':''" index="/commentOld">过往任务评价管理</el-menu-item>
                </div>
                <div v-if='activeIndex=="/store/recharge"||activeIndex=="/store/product"||activeIndex=="/store/orders"||activeIndex=="/store/ordersMessage"||activeIndex=="/store/exchange"'>
                  <p class="nav-title">资金管理</p>
                  <el-menu-item :class="$route.path=='/store/recharge' ?'is-active':''" index="/store/recharge">账户修改</el-menu-item>
                  <el-menu-item :class="$route.path=='/store/product'?'is-active':''" index="/store/product">转账管理</el-menu-item>
                  <el-menu-item :class="$route.path=='/store/orders'?'is-active':''" index="/store/orders">商家资金管理</el-menu-item>
                  <el-menu-item :class="$route.path=='/store/ordersMessage'?'is-active':''" index="/store/ordersMessage">刷手资金管理</el-menu-item>
                  <el-menu-item :class="$route.path=='/store/exchange'?'is-active':''" index="/store/exchange">平台资金流水</el-menu-item>
                </div>
                <div v-if='activeIndex=="/vipMessage"||activeIndex=="/stores"||activeIndex=="/goods"||activeIndex=="/storeInfo"||activeIndex=="/multipleAccounts"'>
                  <p class="nav-title">用户管理</p>
                  <el-menu-item :class="$route.path=='/stores' ?'is-active':''" index="/stores">商家管理</el-menu-item>
                  <el-menu-item :class="$route.path=='/goods' ?'is-active':''" index="/goods">刷手管理</el-menu-item>
                  <el-menu-item :class="$route.path=='/storeInfo' ?'is-active':''" index="/storeInfo">商家信息审核</el-menu-item>
                  <el-menu-item :class="$route.path=='/vipMessage' ?'is-active':''" index="/vipMessage">刷手信息审核</el-menu-item>
                  <el-menu-item :class="$route.path=='/multipleAccounts' ?'is-active':''" index="/multipleAccounts">多账号管理</el-menu-item>
                </div>
                <div v-if='activeIndex=="/messageNotic"||activeIndex=="/messageFa"||activeIndex=="/noticMessage"||activeIndex=="/messageStore"||activeIndex=="/innerStore"
                ||activeIndex=="/innerHand"'>
                  <p class="nav-title">消息管理</p>
                  <el-menu-item :class="$route.path=='/messageNotic' ?'is-active':''" index="/messageNotic">公告发布</el-menu-item>
                 <!--  <el-menu-item :class="$route.path=='/messageStore' ?'is-active':''" index="/messageStore">商家提示管理</el-menu-item> -->
                  <el-menu-item :class="$route.path=='/innerStore' ?'is-active':''" index="/innerStore">商家站内信管理</el-menu-item>
                  <el-menu-item :class="$route.path=='/innerHand' ?'is-active':''" index="/innerHand">刷手站内信管理</el-menu-item>
                </div>
                 <div v-if='activeIndex=="/self"||activeIndex=="/selfXin"||activeIndex=="/selfMessage"||activeIndex=="/storeDan"||activeIndex=="/storeLei"||activeIndex=="/storeYao"||activeIndex=="/mainMessage"||activeIndex=="/businessNotic"||activeIndex=="/businessNoticBox"||activeIndex=="/shuaDenji"||activeIndex=="/businessRules"||activeIndex=="/shuaBanner"'>
                  <p class="nav-title">系统设置</p>
                   <el-menu-item :class="$route.path=='/mainMessage' ?'is-active':''" index="/mainMessage">基本资料</el-menu-item>
                   <el-submenu index="1">
                     <template slot="title">
                       <span>刷手设置</span>
                     </template>
                     <el-menu-item-group>
                   <el-menu-item :class="$route.path=='/self' ?'is-active':''" index="/self">刷手设置</el-menu-item>
                   <el-menu-item :class="$route.path=='/shuaDenji' ?'is-active':''" index="/shuaDenji">刷手等级设置</el-menu-item>
                   <el-menu-item :class="$route.path=='/shuaBanner' ?'is-active':''" index="/shuaBanner">轮播广告设置</el-menu-item>
                     </el-menu-item-group>
                   </el-submenu>
                   <el-submenu index="2">
                     <template slot="title">
                       <span>商家设置</span>
                     </template>
                     <el-menu-item-group>
                  <!-- <el-menu-item :class="$route.path=='/storeYao' ?'is-active':''" index="/storeYao">商家内邀</el-menu-item> -->
                   <el-menu-item :class="$route.path=='/storeDan' ?'is-active':''" index="/storeDan">商家单量设置</el-menu-item>
                   <el-menu-item :class="$route.path=='/storeLei' ?'is-active':''" index="/storeLei">行业类目设置</el-menu-item>
                   <el-menu-item :class="$route.path=='/businessRules' ?'is-active':''" index="/businessRules">商家佣金设置</el-menu-item>
                   <el-menu-item :class="$route.path=='/businessNoticBox' ?'is-active':''" index="/businessNoticBox">商家公告</el-menu-item>
                     </el-menu-item-group>
                   </el-submenu>
                </div>
              </el-menu>
            </el-col>
            <el-col :span="20" :offset='1' class="tac-inner" v-if='nav==2'>
              <router-view></router-view>
            </el-col>
             <el-col :span="24" class="tac-inner" v-if='nav==1'>
              <router-view></router-view>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
	</div>
</template>

<style>
  #all_box{
    height:100%;
  }
  .el-row{
    position:static;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  .nav-title{
    width:100%;
    text-align:center;
    font-size:14px;
    color:#1890FF;
    height:56px;
    line-height:56px;
    font-weight:bold;
  }
  .rowsAll{
    height:92%;
    padding:2% 0;
  }
  #app .tac{
    height:100%;
    position:static;
  }
  .tac .tac-nav{
    height:100%;
    background:#fff;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }
  /*  .tac .tac-inner{
      background:#fff;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }*/
  .company-title{
    color:#00213F;
    height:60px;
    width:100%;
    background:#1890FF;
  }
  .company-name{
    height:60px;
    line-height:60px;
    font-size:20px;
    color:#00213F;
  }
  .company-names{
    display:flex;
    position:relative;
    justify-content:center;
    cursor:pointer;
  }
  .company-names:hover{
    background:rgba(0,0,0,0.15);
  }
  .company-names:hover .main{
    display:block;
    height:72px;
  }
  .company-title .el-radio-group{
    margin-top:23px;
  }
  .styles .el-radio__input.is-checked .el-radio__inner{
    border-color:#FFBF00;
  }
  .styles .el-radio__inner{
    border:2px solid #fff;
    background:none;
  }
  .styles .el-radio__inner::after{
    width:5px;
    height:5px;
    background:#FFBF00;
  }
  .styles .el-radio__input.is-checked+.el-radio__label{
    color:#fff;
  }
  .main{
    width:100%;
    position:absolute;
    left:0;
    top:60px;
    background:rgba(20,122,217,0.6);
    height:0;
    overflow:hidden;
    transition:all 0.1s linear;
    z-index:2000;
  }
  .main-list{
    width:100%;
    height:36px;
    line-height:36px;
    font-size:14px;
    color:#fff;
  }
  .main-list a{
    color:#fff;
  }
  .main-list:nth-last-child(1){
    color:#00213F;
    background:rgba(255,255,255,0.4);
  }
  .el-menu-item.is-active{
    background:none;
    border-left:4px solid #1890FF;
    color:#1890FF;
  }
  .el-menu {
      border: none;
      margin:0;
  }
  .el-menu--horizontal,.el-menu-item{
    background:transparent;
  }
  .el-menu--horizontal>.el-submenu .el-submenu__title:hover{
    background:rgba(0,0,0,0.15);
  }
  .el-menu--horizontal .el-menu .el-menu-item, .el-menu--horizontal .el-menu .el-submenu__title{
    background:rgba(20,122,217,0.6);
  }
  .el-menu--horizontal>.el-submenu:focus,.el-menu--horizontal>.el-submenu:hover{
    background:rgba(0,0,0,0.15);
  }
  .el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover{
   background:rgba(0,0,0,0.15);
  }
  .el-submenu:hover{
    background:rgba(0,0,0,0.15);
  }
  .el-menu--popup{
    padding:0;
  }
  .lines{
    width:100%;
    height:3px;
    background:RGB(87,88,190);
    margin-top:14px;
    margin-bottom:50px;
  }
  .title{
    font-size:18px;
    font-weight: bold;
    color:RGB(87,88,190);
    text-align: left;
  }
  .el-breadcrumb{
    margin-bottom:20px;
    font-size:20px;
    color:#00213F;
  }
  .logo-img{
    width:30px;
    height:30px;
    border-radius:50%;
    margin-top:15px;
    margin-right:10px;
  }
  .controllerName{
    line-height:60px;
    font-size:14px;
    color:#fff;
  }
  .tac .el-submenu .el-menu-item{min-width:0}
</style>

<script>
  import {logOut} from '../../api/login'
  import {mainInfo} from '../../api/api'
  export default {
    data () {
      return {
        radio: 1,
        activeIndex:'',
        activeIndexs:'',
        nav:1,
        account:''
      };
    },
    beforeMount(){
      let navData =JSON.parse(localStorage.getItem('nav'))
      this.nav=navData.nav;
      this.activeIndexs=navData.navIndex
      this.activeIndex=navData.navIndex
    },
    mounted(){
        mainInfo().then(response=>{
          var data=response
          this.account=data.user.username
        }).catch(error=>{

        })
    },
    methods:{
      handleSelect(key, keyPath){
        this.activeIndexs=key;
        if(key=='/homes'||key=='/home'||key=='/custom'){
          this.nav=1
        }else{
          this.nav=2
        }
      },
      handleSelects(key, keyPath){
        this.activeIndex=key;
        if(key=='/homes'||key=='/home'||key=='/custom'){
          this.nav=1
        }else{
          this.nav=2
        }
      },
      // 退出登录
      logOut(){
       logOut().then(response=>{}).catch(error=>{})
       this.$router.push('/login')
      }
    },
    watch: {  
        $route(to, from) {
           this.activeIndex=to.path;
           this.activeIndexs=to.path;
          if(to.path=='/homes'||to.path=='/home'||to.path=='/role'){
            this.nav=1
          }else{
            this.nav=2
          }
        }  
    }  
  }
</script>
