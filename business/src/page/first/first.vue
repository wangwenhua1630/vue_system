<template>
	<div id="all_box" >
	    <el-row type="flex"  justify="center" class="company-title">
        <el-col :span='22'>
          <el-row  >
            <el-col :span="2"class="company-name">任务工会</el-col>
            <el-col :span="13"  class="company-name">
              <el-menu default-active="/homes" class="el-menu-vertical-demo" unique-opened text-color="#fff" active-text-color="#FFBF00" router mode="horizontal" popper-class='twoMenu' :default-active="activeIndex" @select="handleSelect">
                <el-menu-item index="/homes">首页</el-menu-item>
                <!-- <el-menu-item index="/home">数据分析</el-menu-item> -->
                 <el-submenu index="1">
                    <template slot="title">任务管理</template>
                    <el-menu-item index="/send">　　发布任务</el-menu-item>
                    <el-menu-item index="/task">　　任务管理</el-menu-item>
                    <el-menu-item index="/comment">　　任务评价</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">资金管理</template>
                    <el-menu-item index="/store/recharge">　　账号充值</el-menu-item>
                    <el-menu-item index="/store/product">　　转账管理</el-menu-item>
                    <el-menu-item index="/store/orders">　　流水明细</el-menu-item>
                    <el-menu-item index="/store/ordersMessage">　　消费详情</el-menu-item>
                    <el-menu-item index="/store/exchange">　　发布点兑换</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">会员中心</template>
                  <el-menu-item index="/vipMessage">　　基本资料</el-menu-item>
                  <el-menu-item index="/stores">　　店铺管理</el-menu-item>
                  <el-menu-item index="/goods">　　商品管理</el-menu-item>
                  <el-menu-item index="/notic">　　平台公告</el-menu-item>
                  <el-menu-item index="/change">　　调整单量</el-menu-item>
                </el-submenu>
                <el-menu-item index="/custom">客服工单</el-menu-item>
              </el-menu>
            </el-col>
            <el-col :span="5" :offset="2">
             <el-radio-group v-model="radio" fill='#FFBF00' text-color='#fff' class='styles'>
                <el-radio :label="1" :disabled='true'  style='color:#fff; margin-right:30px;' >显示任务</el-radio>
                <el-radio :label="2" :disabled='true'  style='color:#fff;'>隐藏任务</el-radio>
             </el-radio-group>
            </el-col>
            <el-col :span="2"  class="company-name company-names">
              <img src="../../assets/logo-img.png" alt="" class='logo-img' >
              <p class="controllerName">{{account}}</p>
              <ul class='main'>
                <li class='main-list'><router-link to='/vipMessage'>基本资料</router-link></li>
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
                <div v-if='activeIndex=="/task"||activeIndex=="/comment"||activeIndex=="/send"||activeIndex=="/send/sendOne"||activeIndex=="/send/sendTwo"||activeIndex=="/send/sendThree"||activeIndex=="/send/sendFour"'>
                  <p class="nav-title">任务管理</p>
                  <el-menu-item :class="$route.path=='/send'?'is-active':''" index="/send">发布任务</el-menu-item>
                  <el-menu-item :class="$route.path=='/task' ?'is-active':''" index="/task">任务管理</el-menu-item>
                  <el-menu-item :class="$route.path=='/comment' ?'is-active':''" index="/comment">任务评价</el-menu-item>
                </div>
                <div v-if='activeIndex=="/store/recharge"||activeIndex=="/store/product"||activeIndex=="/store/orders"||activeIndex=="/store/ordersMessage"||activeIndex=="/store/exchange"'>
                  <p class="nav-title">资金管理</p>
                  <el-menu-item :class="$route.path=='/store/recharge' ?'is-active':''" index="/store/recharge">账号充值</el-menu-item>
                  <el-menu-item :class="$route.path=='/store/product'?'is-active':''" index="/store/product">转账管理</el-menu-item>
                  <el-menu-item :class="$route.path=='/store/orders'?'is-active':''" index="/store/orders">流水明细</el-menu-item>
                  <el-menu-item :class="$route.path=='/store/ordersMessage'?'is-active':''" index="/store/ordersMessage">消费详情</el-menu-item>
                  <el-menu-item :class="$route.path=='/store/exchange'?'is-active':''" index="/store/exchange">发布点兑换</el-menu-item>
                </div>
                <div v-if='activeIndex=="/vipMessage"||activeIndex=="/stores"||activeIndex=="/goods"||activeIndex=="/notic"||activeIndex=="/change"||activeIndex=="/newGoods"||activeIndex=="/noticMessage"'>
                  <p class="nav-title">会员管理</p>
                  <el-menu-item :class="$route.path=='/vipMessage' ?'is-active':''" index="/vipMessage">基本资料</el-menu-item>
                  <el-menu-item :class="$route.path=='/stores' ?'is-active':''" index="/stores">店铺管理</el-menu-item>
                  <el-menu-item :class="$route.path=='/goods'?'is-active':''" index="/goods">商品管理</el-menu-item>
                  <el-menu-item :class="$route.path=='/notic' ?'is-active':''" index="/notic">平台公告</el-menu-item>
                  <el-menu-item :class="$route.path=='/change' ?'is-active':''" index="/change">调整单量</el-menu-item>
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
    box-shadow: 0 0 10px rgba(0,0,0,0.05);
  }
  .tac .tac-inner{
    height:100%;
  }
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
  .homes-icon{
    width:;
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
</style>
<script>
  import {bussinessStatus} from '../../api/task'
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
      bussinessStatus().then(response=>{
        var data=response
        this.account=data.userStatus.account
        if(data.userStatus.hideStatus==1){
          this.radio=2
        }else{
          this.radio=1
        }
      }).catch(error=>{})
    },
    methods:{
      handleSelect(key, keyPath){
        this.activeIndexs=key;
        if(key=='/homes'||key=='/home'||key=='/custom'||key=='/customMessage'){
          this.nav=1
        }else{
          this.nav=2
        }
      },
      handleSelects(key, keyPath){
        this.activeIndex=key;
        if(key=='/homes'||key=='/home'||key=='/custom'||key=='/customMessage'){
          this.nav=1
        }else{
          this.nav=2
        }
      },
      // 退出登录
      logOut(){
        this.$store.dispatch('logOut')
        .then(() => {
          this.$router.push('/login')
        }).catch(() => {
        });
      }
    },
    watch: {  
        $route(to, from) {
           this.activeIndex=to.path;
           this.activeIndexs=to.path;
           bussinessStatus().then(response=>{
            var data=response
            this.account=data.userStatus.account
            if(data.userStatus.hideStatus==1){
              this.radio=2
            }else{
              this.radio=1
            }
          }).catch(error=>{})
          if(to.path=='/homes'||to.path=='/home'||to.path=='/custom'||to.path=='/customMessage'){
            this.nav=1
          }else{
            this.nav=2
          }
        }  
    }  
  }
</script>