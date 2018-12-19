<template>
  <div>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="store-inner">
          <el-tabs v-model="activeName" @tab-click="tabs">
            <el-tab-pane label="审核通知" name='ones' >
            </el-tab-pane>
             <el-tab-pane label="系统通知" name='twos'>
            </el-tab-pane>
          </el-tabs>
          <div class='notic'>
            <p class='notic-list' v-bind:class="[index%2==0?active:'']" v-for='(item,index) in list' @click='message(item.id)' ><span class="notic-title">{{item.title}}</span>
            <span class="notic-time">{{item.createAt}}</span></p>
          </div>
          <el-pagination @current-change="CurrentChange" layout="prev, pager, next" :total="totalPages">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {noticMessage} from '../../api/vip'
  export default {
    data(){
      return {
        activeName:'ones',
        totalPages:0,
        list:[],
        index:'',
        currentPage:1,
        active:'active'
      };
    },
    mounted(){
      noticMessage(2,1,10).then(response=>{
        var data=response
        if(data.msg==1){
          this.list=data.page.result
          this.totalPages=data.page.totalRow
        }else if(data.msg==4){
          this.list=[]
          this.totalPages=0
        }
      }).catch(error=>{})
      console.log(this.$route.query.type)
      if(this.$route.query.type==1){
        this.activeName='ones'
        noticMessage(1,1,10).then(response=>{
          var data=response
          if(data.msg==1){
            this.list=data.page.result
            this.totalPages=data.page.totalRow
          }else if(data.msg==4){
            this.list=[]
            this.totalPages=0
          }
        }).catch(error=>{})
      }else{
        this.activeName='twos'
        noticMessage(2,1,10).then(response=>{
        var data=response
        if(data.msg==1){
          this.list=data.page.result
          this.totalPages=data.page.totalRow
        }else if(data.msg==4){
          this.list=[]
          this.totalPages=0
        }
      }).catch(error=>{})
      }
    },
    methods:{
      tabs(tab, event){
        this.index=Number(tab.index)+1
        noticMessage(Number(tab.index)+1,this.currentPage,10).then(response=>{
          var data=response
          if(data.msg==1){
            this.list=data.page.result
            this.totalPages=data.page.totalRow
          }else if(data.msg==4){
            this.list=[]
            this.totalPages=0
          }
        }).catch(error=>{})
      },
       message(id){
        this.$router.push({
          name:'noticMessage',
          params:{
            id:id
          }
        })
      },
      CurrentChange(e){
        this.currentPage=e
        noticMessage(this.index,e,10).then(response=>{
          var data=response
          if(data.msg==1){
            this.list=data.page.result
            this.totalPages=data.page.totalRow
          }else if(data.msg==4){
            this.list=[]
            this.totalPages=0
          }
        }).catch(error=>{})
      }
    }
  }
</script>

<style>
.store-inner{
  background:#fff;
  padding:20px;
}
.notic-list{
  line-height:60px;
  font-size:14px;
  display:flex;
  text-align:left;
  justify-content:space-between;
  cursor:pointer;
  padding:0 20px;
}
.notic-list.active{
  background:#F5FCFF;
}
.notic-list:hover{
  color:#1890FF;
}
.notic-title{
  margin-right:50px;
}
.notic-time{
  color:#909399;
}
</style>
