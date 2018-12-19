<template>
  <div>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="store-inner">
          <el-tabs @tab-click="tabs">
            <el-tab-pane label="商家公告"></el-tab-pane>
           <!--  <el-tab-pane label="刷手信息"></el-tab-pane> -->
          </el-tabs>
          <div class='notic'>
            <div class='notic-titls' v-if='cont!=null'>{{title}}</div>
            <div class='notic-inners' v-html='cont' v-if='cont!=null'></div>
            <div v-else class='emptys'>暂无数据</div>
          </div>
          <el-button type="primary" round size='mini' class='faMessage' @click='fa' >发布公告</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {businessinfos} from '../../api/self'
  export default {
    data(){
      return {
        info:'',
        active:'active',
        totalPages:0,
        currentPage:1,
        types:1,
        dongdialog:false,
        title:'',
        cont:'',
        input:'',
        Ids:'',
        form:{
          date:''
        }
      };
    },
    mounted(){
      businessinfos(1).then(response=>{
        var data=response
        if(data.msg==1){
          this.title=data.notice.title
          this.cont=data.notice.content
          this.Ids=data.notice.id
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
        this.$router.push({
         name:'businessNotic',
          params: {
            id:this.Ids
          }
        })
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
.emptys{
  width:100%;
  text-align:center;
  font-size:20px;
  padding:30px;
}
.notic-titls{
  width:100%;
  margin-bottom:30px;
  text-align:center;
  font-size:20px;
}
.notic-inners{
  padding:0 30px;
}
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
