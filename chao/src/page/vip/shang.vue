<template>
  <div class='goods'>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="first-box">
          <p class='break'>刷手管理</p>
          <el-form ref="form" :model="form" class="queryBox" label-width="76px"  size="mini" :inline="true">
            <el-form-item label="刷手等级">
              <el-select v-model="form.state" placeholder="请选择" >
                <el-option label="等待转账" value="1"></el-option>
                <el-option label="已导出" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="刷手账号">
              <el-input v-model="form.num" ></el-input>
            </el-form-item>
            <el-form-item label="在线天数">
              <el-input v-model="form.num" ></el-input>
            </el-form-item>
           <el-form-item label="刷手状态">
              <el-select v-model="form.status" placeholder="请选择" >
                <el-option label="已冻结" value="1"></el-option>
                <el-option label="未冻结" value="2"></el-option>
              </el-select>
            </el-form-item>
           <el-form-item label="违规行为">
              <el-select v-model="form.wei" placeholder="请选择" >
                <el-option label="存在" value="1"></el-option>
                <el-option label="不存在" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
             <el-form-item>
              <el-button type="danger">批量冻结</el-button>
            </el-form-item>
          </el-form>
          <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%"  border  header-row-class-name="table-header">
            <el-table-column type="selection"  width="55" header-align="center">
            </el-table-column>
            <el-table-column prop="jian" label="账号"  header-align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column  prop="name" label="等级" header-align="center"  show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="ids" label="总单量"  show-overflow-tooltip header-align="center">
            </el-table-column>
             <el-table-column prop="ids" label="剩余单量"  show-overflow-tooltip header-align="center">
            </el-table-column>
             <el-table-column prop="ids" label="可提现佣金数"  show-overflow-tooltip header-align="center">
            </el-table-column>
             <el-table-column prop="ids" label="冻结佣金数"  show-overflow-tooltip header-align="center">
            </el-table-column>
             <el-table-column prop="ids" label="在线天数(30天)"  show-overflow-tooltip header-align="center">
            </el-table-column>
             <el-table-column prop="ids" label="状态"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="status" label="标记备注"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column   label="操作"  header-align="center">
              <template slot-scope="scope">
                <el-dropdown @command="handleCommand">
                  <el-button type="primary">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command='1'>冻结</el-dropdown-item>
                    <el-dropdown-item command='2'>解冻</el-dropdown-item>
                    <el-dropdown-item command='3'>查看资料</el-dropdown-item>
                    <el-dropdown-item command='4'>编辑私信</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    <!--**冻结，解冻刷手**-->
    <el-dialog  title="提示" :visible.sync="dongdialog" width="30%" >
      <p class='hidde-title'>您将冻结/解冻该刷手</p>
      <el-input  type='password' v-model="input" placeholder="请输入操作密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary' @click="dongdialog = false" size='small' >确定</el-button>
        <el-button  @click="dongdialog = false" size='small' >取消</el-button>
      </span>
    </el-dialog>
    <!--**编辑私信**-->
    <el-dialog  title="私信编辑" :visible.sync="xindialog" width="30%" >
      <p class='hidde-title'>您将发送私信给该刷手</p>
      <el-input  type='textarea' v-model="input" placeholder="请输入私信内容"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary' @click="xindialog = false" size='small' >确定</el-button>
        <el-button  @click="xindialog = false" size='small' >取消</el-button>
      </span>
    </el-dialog>
    <!--**查看详情**-->
    <el-dialog  title="查看详情" :visible.sync="newdialog" width="50%" class='taskInfos'>
      <shuaMessage></shuaMessage>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newdialog = false" size='small'>关闭</el-button>
      </span>
    </el-dialog>
    <!--**图片放大**-->
      <div class="mask" v-show="show" @click="small">
        <img :src="bigsrc" alt="" class="bigimg">
      </div>
  </div>
</template>

<script>
   import shuaMessage from './shuaMessage'
    export default {
        name: "goods",
        data(){
          return{
            form:{
              num:'',
              state: '',
              status:'',
              wei:''
            },
            tableData:[{
              jian:'睡衣女夏',
              name:'睡衣女夏',
              ids:'5454215',
              status:'正常'
            }],
            newdialog:false,
            dongdialog:false,
            xindialog:false,
            show:false,
            bigsrc:''
          }
        },
        methods:{
           //查看原图
          bigImg(e){
            this.show=true;
            this.bigsrc=e.target.currentSrc;
          },
          //隐藏原图
          small(){
            this.show=false;
          },
          // 操作按钮
          handleCommand(command){
            if(command==1){
              this.dongdialog=true
            }else if(command==2){
               this.dongdialog=true
            }else if(command==3){
              this.newdialog=true;
            }else if(command==4){
              this.xindialog=true;
            }
          },
          addGoods(){
            this.$router.push('/newGoods')
          }
        },
        components:{
          shuaMessage
        }
    }
</script>

<style>
  .first-box{
    background:#fff;
    padding:20px;
  }
  .hidde-title{
    text-align:left;
    margin-bottom:20px;
  }
  .step{
    position: relative;
    margin-bottom:50px;
  }
  .step .step-title{
    font-size:14px;
    position: absolute;
    left:0;
  }
  .queryBox{
    display:block;
    text-align:left;
  }
  #app .first-box .el-table .table-header{
    background:#f5f7fa;
  }
  .el-table th, .el-table tr.table-header{
    background:#f5f7fa;
  }
  .loading-tips{
    text-align:left;
    font-size:14px;
    line-height:30px;
  }
  .loading-tips .alert-label{
    margin-right:10px;
  }
  .loading-tipss{
    display:flex;
  }
  .loading-tipss .alert-label{
     display:block;
  }
  .ups-img{
    width:100px;
    height:100px;
    cursor: pointer;
  }
  .mask{
    width:100%;
    height:100%;
    position: absolute;
    left:0;
    top:0;
    background:rgba(0,0,0,0.6);
    z-index:3000;
    overflow: hidden;
  }
  .bigimg{
    width:30%;
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
  }
  .loading-tips{
    text-align:left;
    font-size:14px;
    line-height:30px;
    overflow:hidden;
  }
  .loading-ge{
    border-bottom:1px solid rgba(0,0,0,0.09);
    padding:10px 0;
  }
  .loading-tips .loading-list{
    width:50%;
    float:left;
    color:rgba(0,0,0,0.45);
  }
  .loading-tips .alert-label{
    margin-right:10px;
    color:#000;
  }
  .loading-tipss{
    display:flex;
  }
  .loading-tipss .alert-label{
     display:block;
  }
  .taskInfos .el-dialog__header{
    border:1px solid rgba(0,0,0,0.09);
  }
  .taskInfos .loading-ge .up-imgs{
    width:160px;
    height:100px;
    cursor: pointer;
    margin-right:20px;
  }
  .taskInfos .tipBox{
    display:flex;
    width:75%;
    flex-wrap:wrap;
  }
  .taskInfos .loading-ge .tipBox .up-imgs{
    margin-bottom:20px;
  }
  .goods .el-dialog{
    position:static;
  }
</style>
