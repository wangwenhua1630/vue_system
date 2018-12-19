<template>
  <div>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="store-inner">
          <el-tabs @tab-click="tabs">
            <el-tab-pane label="商家信息"></el-tab-pane>
            <el-tab-pane label="刷手信息"></el-tab-pane>
          </el-tabs>
          <div class='notic'>
            <div class='notic-list' v-bind:class="[index%2==0?active:'']" v-for='(item,index) in info' :key='item.id'>
              <span class="notic-title" @click='message(item.id)'>{{item.title}}</span>
              <p class="notic-time">{{item.createAt}} <span class='dels' @click='del(item.id)' >删除</span> </p>
            </div>
          </div>
          <el-pagination @current-change="CurrentChange" layout="prev, pager, next" :total="totalPages">
          </el-pagination>
          <el-button type="primary" round size='mini' class='faMessage' @click='fa' >发布公告</el-button>
          <el-form ref="form" :model="form" class="queryBox fafix" label-width="76px"  size="mini" :inline="true">
            <el-form-item label="发送时间">
              <el-date-picker v-model="form.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click='search'>查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <!--**删除**-->
    <el-dialog  title="删除信息" :visible.sync="dongdialog" width="30%" >
      <p class='hidde-title'>您将删除该信息</p>
      <el-input  type='password' v-model="input" placeholder="请输入操作密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary' @click="delConfirm" size='small' >确定</el-button>
        <el-button  @click="dongdialog = false" size='small' >取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {messageList,delList} from '../../api/message'
  export default {
    data(){
      return {
        info:'',
        active:'active',
        totalPages:0,
        currentPage:1,
        types:1,
        dongdialog:false,
        input:'',
        form:{
          date:''
        }
      };
    },
    mounted(){
      messageList(1,'','',1,10).then(response=>{
        var data=response
        if(data.msg==1){
          this.info=data.page.result
          this.totalPages=data.page.totalRow
        }else if(data.msg==4){
          this.info=[]
          this.totalPages=0
        }
      }).catch(error=>{

      })
    },
    methods:{
      tabs(tab, event){
        var date1 
        var date2
        if(this.form.date==null){
           date1=null
           date2=null
        }else{
          date1=this.form.date[0]
          date2=this.form.date[1]
        }
        this.types=Number(tab.index)+1
        messageList(Number(tab.index)+1,date1,date2,1,10).then(response=>{
          var data=response
          if(data.msg==1){
            this.info=data.page.result
            this.totalPages=data.page.totalRow
            this.currentPage=1
          }else if(data.msg==4){
            this.info=[]
            this.totalPages=0
          }
        }).catch(error=>{

        })
      },
      fa(){
        this.$router.push('/messageFa')
      },
      message(id){
        this.$router.push({
         name:'noticMessage',
          params: {
            id:id
          }
        })
      },
      del(ids){
       this.Ids=ids
       this.dongdialog=true
      },
      delConfirm(){
        var that=this
        if(this.input==''){
          this.$message.warning('请输入操作密码')
        }else{
          delList(this.Ids,this.input).then(response=>{
            var data=response
            this.dongdialog=false
            if(data.msg==1){
              this.$message.success('删除成功')
              setTimeout(function(){
                that.$router.go(0)
              },500)
            }else if(data.msg==5){
              this.$message.error('密码错误')
            }
          }).catch(error=>{

          })
        }
      },
      CurrentChange(e){
        this.currentPage=e
        var date1 
        var date2
        if(this.form.date==null){
           date1=null
           date2=null
        }else{
          date1=this.form.date[0]
          date2=this.form.date[1]
        }
        messageList(this.types,date1,date2,e,10).then(response=>{
          var data=response
          if(data.msg==1){
            this.info=data.page.result
            this.totalPages=data.page.totalRow
          }else if(data.msg==4){
            this.info=[]
            this.totalPages=0
          }
        }).catch(error=>{

        })
      },
      search(){
        var date1 
        var date2
        if(this.form.date==null){
           date1=null
           date2=null
        }else{
          date1=this.form.date[0]
          date2=this.form.date[1]
        }
        messageList(this.types,date1,date2,this.currentPage,10).then(response=>{
          var data=response
          if(data.msg==1){
            this.info=data.page.result
            this.totalPages=data.page.totalRow
          }else if(data.msg==4){
            this.info=[]
            this.totalPages=0
          }
        }).catch(error=>{

        })
      }
    }
  }
</script>

<style>
.store-inner{
  background:#fff;
  padding:20px;
  position:relative;
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
.dels{
  color:#F5222D;
  padding-left:20px;
}
.faMessage{
  position: absolute;
  top:20px;
  right:20px;
}
.fafix{
  position: absolute;
  top:20px;
  right:120px;
}
</style>
