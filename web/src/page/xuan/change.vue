<template>
    <div class="change">
      <div class="num_list" v-if="lists!=1"  v-for="item in lists">
        <div class="num" @click="change(item.account_type,item.id,item.status)">
          <span class="num_left" :class="item.status==1?'active_txt':''">{{item.tao_account}}</span>

        </div>
        <img src="../../assets/ok.png" alt="" class="num_ok_icon" v-if="item.xuan==1">
        <span class="shen_txt" v-if="item.status==1">审核中</span>
        <span class="shen_bai" v-if="item.status==3">审核失败</span>
        <span class="shen_xiu" v-if="item.status==2" @click="goXiu(item.id)">修改</span>
      </div>
      <div class="num_list">
        <div class="num_add" @click="goAdd">
          <img src="../../assets/add.png" alt="" class="num_add_icon">
          添加账号
        </div>
      </div>
      <img class="goHome" @click="goHomes" src="../../assets/tab-icon5.png" alt="">
    </div>
</template>

<script>
  import {choosePlatform,chooseUser} from '../../api/api'
    export default {
        name: "change",
      data(){
          return{
            lists:[]
          }
      },
      mounted(){
        var that=this;
        var num=sessionStorage.getItem('qie');
        console.log(num);
        this.$indicator.open('加载中...');
        choosePlatform(num).then(response=>{
          const data=response;
          console.log(data);
          this.lists=data.info
          setTimeout(function(){
            that.$indicator.close()
          },500)
        }).catch()
      },
      methods:{
          //跳转填写资料
        goAdd(){
          this.$router.push('/infoMessage');
        },
        //切换账户
        change(type,index,status){
            console.log(type,index);
            if(status==1){
              this.$toast('该账号还在审核中...')
            }else if(status==3){
              this.$toast('该账号审核失败')
              sessionStorage.hand_id=index;
              this.$router.push('/infoMessage');
            }else if(status==2){
              chooseUser(type,index).then(response=>{
                const data=response;
                console.log(data);
                if(data==2){
                  this.$router.push('/main');
                }
              }).catch()
            }
        },
        goXiu(id){
          // console.log(id);
          sessionStorage.hand_id=id;
          this.$router.push('/infoMessage');
        },
        goHomes(){
          this.$router.push('/main');
        }
      }
    }
</script>

<style scoped>
.change{
  margin-top:20px;
  background-color: #fff;
}
  .num_list{
    width:690px;
    /*padding:0 30px;*/
    margin:0 auto;
    /*background-color: #fff;*/
    display:flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom:1px solid #ddd;
  }
.change .num{
    height:120px;
    flex:1;
    display:flex;
    justify-content: flex-start;
    align-items: center;
    /*border-bottom:1px solid #ddd;*/
    font-size:36px;
    font-weight:400;
    color:#2c2c2c;
  }
  .num_add{
    height:120px;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size:36px;
    font-weight:400;
    color:#108EE9;
  }
.num_add_icon{
  width:36px;
  height:36px;
  margin-right:11px;
}
.num_left{flex:1}
  .num_ok_icon{
    width:41px;
    height:41px;
  }
  .active_txt{
    color:#ddd;
  }
  .shen_txt{
    font-size:20px;
    color:#ddd;
  }
  .shen_bai{
    font-size:20px;
    color:red;
  }
  .shen_xiu{
    font-size:20px;
    color:red;
    display:flex;
    justify-content: center;
    align-items: center;
    height:120px;
    width:80px;
  }
  .goHome{
    width:50px;height:50px;
    position:fixed;
    bottom:50px;
    left:30px;
  }
</style>
