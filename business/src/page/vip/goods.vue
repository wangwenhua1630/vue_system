<template>
  <div>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="first-box">
          <p class='break'>商品管理</p>
          <el-form ref="form" :model="form" class="queryBox" label-width="76px"  size="small" :inline="true">
            <el-form-item label="店铺名称">
              <el-select v-model="form.state" placeholder="请选择" >
                <el-option v-for="item in stores" :key="item.name" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="名称/简称">
              <el-input v-model="form.nickname" ></el-input>
            </el-form-item>
            <el-form-item label="商品ID">
              <el-input v-model="form.ID"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click='search' >查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="warning" @click='addGood' >添加商品</el-button>
            </el-form-item>
             <el-form-item>
              <el-button type="danger" @click='dels' >批量删除</el-button>
            </el-form-item>
          </el-form>
          <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%;margin-bottom:30px;"  border  header-row-class-name="table-header"  v-loading="loading" @selection-change='selection'>
            <el-table-column type="selection"  width="55" header-align="center">
            </el-table-column>
            <el-table-column prop="storeName" label="店铺名称"  header-align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="goodNickname" label="简称"  header-align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column  prop="goodName" label="商品名称" header-align="center"  show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="goodId" label="商品ID"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="status" label="状态"  show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <p>正常</p>
              </template>
            </el-table-column>
            <el-table-column   label="操作"  header-align="center" width='240' >
              <template slot-scope="scope">
                <el-button type="primary" plain  size="mini" @click="look(scope.$index, scope.row)">查看</el-button>
                <el-button type="success" plain  size="mini" @click='addGoods(scope.row.id)'>编辑</el-button>
                <el-button type="danger"  plain  size="mini" @click='del(scope.$index)'>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
              @current-change="CurrentChange"
              layout="prev, pager, next"
              :total="totalPages">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
     <!--**查看详情**-->
    <el-dialog  title="查看详情" :visible.sync="newdialog" width="40%" >
      <ul class="loading-tips"> 
        <li><label class='alert-label'>掌 柜 号：</label>{{tableMessage.tbAccount}}</li>
        <li><label class='alert-label'>店铺名称：</label>{{tableMessage.storeName}}</li>
        <li><label class='alert-label'>商品简称:</label>{{tableMessage.goodNickname}}</li>
        <li><label class='alert-label'>商品链接：</label> {{tableMessage.url}}</li>
        <li><label class='alert-label'>商品名称：</label> {{tableMessage.goodName}}</li>
        <li><label class='alert-label'>商品ID：</label> {{tableMessage.goodId}}</li>
      </ul>
      <div class="loading-tips loading-tipss">
        <label class='alert-label'>商品主图：</label>
        <img :src="tableMessage.img" alt="" class='ups-img' @click="bigImg" >
      </div>
       <!-- <div class="loading-tips loading-tipss">
        <label class='alert-label'>移动端商品图：</label>
        <img :src="tableMessage.mobileImg" alt="" class='ups-img' @click="bigImg" >
      </div> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="newdialog = false">返回</el-button>
      </span>
    </el-dialog>
    <!--**图片放大**-->
      <div class="mask" v-show="show" @click="small">
        <img :src="bigsrc" alt="" class="bigimg">
      </div>
  </div>
</template>

<script>
    import {prodeuceList,prodeuceDel} from '../../api/vip';
    export default {
        name: "goods",
        data(){
          return{
            form:{
              state: '',
              nickname:'',
              ID:''
            },
            totalPages:0,
            stores:[],
            tableData:[],
            check:[],
            tableMessage:"",
            loading:false,
            total:'',

            newdialog:false,
            show:false,
            bigsrc:''
          }
        },
        mounted(){
            this.loading=true
             prodeuceList('','','',1,10).then(response => {
              const data = response;
              this.loading=false
                this.total=data.page.totalPages
                this.tableData=data.page.result
                this.stores=data.stores
                this.totalPages=data.page.totalRow
              }).catch(error => {
                reject(error);
              }); 
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
          look(index,row){
            this.tableMessage=this.tableData[index]
            this.newdialog=true
          },
          addGood(){
            this.$router.push('/newGoods')
          },
          addGoods(id){
            console.log(id)
            // this.$router.push('/newGoods')
            this.$router.push({name:'newGoods',params:{goodid:id,type:1}});
          },
          // 复选框状态改变
          selection(val) {
            this.check = val;
          },
          // 条件查询
          search(){
            prodeuceList(this.form.ID,this.form.state,this.form.nickname,1,10).then(response => {
                const data = response;
                 this.loading=false
                this.total=data.page.totalPages
                this.tableData=data.page.result
                this.stores=data.stores
              }).catch(error => {
                reject(error);
            }); 
          },
          // 分页查询
          CurrentChange(e){
             prodeuceList(this.form.ID,this.form.state,this.form.nickname,e,10).then(response => {
                const data = response;
                 this.loading=false
                this.total=data.page.totalPages
                this.tableData=data.page.result
                this.stores=data.stores
              }).catch(error => {
                reject(error);
            }); 
          },
          // 删除
          del(index){
            this.loading=true
            var ids=[];
            ids.push(this.tableData[index].id)
            prodeuceDel(ids).then(response => {
                const data = response;
                 this.loading=false
                 if(data.msg==1){
                  this.$router.go(0)
                 }
              }).catch(error => {
                reject(error);
            }); 
          },
          // 批量删除
          dels(){
              this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                var ids=[];
                  for(var i=0;i<this.check.length;i++){
                    ids.push(this.check[i].id)
                  }
                  prodeuceDel(ids).then(response => {
                      const data = response;
                       this.loading=false
                       if(data.msg==1){
                        this.$router.go(0)
                       }
                    }).catch(error => {
                      reject(error);
                  }); 
              }).catch(() => {
                        
              });
          }
        }
    }
</script>

<style>
  .first-box{
    background:#fff;
    padding:20px;
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
    display: block;
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
    color:rgba(0,0,0,0.85);
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
    transform: scale(1);
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
  }
</style>
