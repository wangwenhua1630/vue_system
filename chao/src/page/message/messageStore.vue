<template>
  <div>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="store-inner">
           <p class='break'>商家提示管理 <el-button type="primary" round size='mini' class='storeTips' @click='dialogVisible = true' >更新</el-button></p>
          <div class='notic'>
            <div class='notic-list active'  >
              <span class="notic-title" @click='message'>乐奇网诚邀体验 </span>
              <p class="notic-time">2018-9-20 <span class='dels' @click='del()'>删除</span> </p>
            </div>
            <div class='notic-list ' >
              <span class="notic-title"  @click='message'>乐奇网诚邀体验 </span>
              <p class="notic-time">2018-9-20 <span class='dels'>删除</span> </p>
            </div>
            <div class='notic-list active'  >
              <span class="notic-title" @click='message'>乐奇网诚邀体验 </span>
              <p class="notic-time">2018-9-20 <span class='dels'>删除</span> </p>
            </div>
            <div class='notic-list ' >
              <span class="notic-title" @click='message'>乐奇网诚邀体验 </span>
              <p class="notic-time">2018-9-20 <span class='dels'>删除</span> </p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="更新"  :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
       <div class='upDate'>
        <span class='ups'>更新内容</span>
        <p>这是一段原来的信息</p>
      </div>
      <div class='upDate'>
        <span class='ups'>更新内容</span>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size='small'>取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false" size='small'>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        textarea:'',
        dialogVisible:false
      };
    },
    methods:{
      message(){
        this.$router.push('/noticMessage')
      },
      del(){
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {         
        });
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
.storeTips{
  float:right;
}
.upDate{
  display:flex;
  font-size:14px;
  color:rgba(0,0,0,0.45);
  text-align:left;
  margin-bottom:20px;
}
.ups{
  margin-right:20px;
}
.upDate .el-textarea{
  width:80%;
}
</style>
