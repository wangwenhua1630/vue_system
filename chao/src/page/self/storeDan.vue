<template>
    <div>
      <el-row class="contain row-bg" type="flex"  justify="center">
        <el-col>
          <div class="store-inner">
            <p class='break'>商家单量设置
             <el-button type="primary"  size="mini" class="bindbtn" @click='dandialog=true'> 新增 </el-button>
            </p>
            <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%"   header-row-class-name="table-header" border >
              <el-table-column prop="num" label="单量(天)"  header-align="center">
              </el-table-column>
              <el-table-column  prop="cycle" label="周期(月)" header-align="center">
              </el-table-column>
              <el-table-column prop="price" label="收费金额"  show-overflow-tooltip header-align="center">
              </el-table-column>
              <el-table-column prop="upAt" label="调整时间"  show-overflow-tooltip header-align="center">
              </el-table-column>
              <el-table-column prop="cardTime" label="操作"  header-align="center" width='220'>
                <template slot-scope="scope">
                  <el-button type="primary" plain round size="mini" @click="xiu(scope.$index)">单量修改</el-button>
                  <el-button type="danger"  plain round size="mini" @click='deldialog=true,Ids=scope.row.id'>删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <!-- 单量调整 -->
      <el-dialog title="单量调整" :visible.sync="dandialog" width='30%' >
          <ul class='touBox'>
            <li class='touList'><span class='touLabel'>单量：</span><el-input v-model="dan"  class='danInp' size='small' ></el-input></li>
            <li class='touList'><span class='touLabel'>价格：</span><el-input v-model="money"  class='danInp' size='small' ></el-input></li>
            <li class='touList'><span class='touLabel'>周期：</span>1个月</li>
            <li class='touList'><span class='touLabel'>操作密码：</span><el-input v-model="password" type='password' class='danInp' size='small' ></el-input></li>
          </ul>
          <span slot="footer" class="dialog-footer">
            <el-button  type='primary' @click="danChange" size='small'>确定</el-button>
            <el-button @click="dandialog = false" size='small'>取消</el-button>
          </span>
      </el-dialog>
      <!-- 单量删除 -->
      <el-dialog title="单量删除" :visible.sync="deldialog" width='30%' >
          <ul class='touBox'>
            <li class='touList'><span class='touLabel'>操作密码：</span><el-input v-model="passwords" type='password'  class='danInp' size='small' ></el-input></li>
          </ul>
          <span slot="footer" class="dialog-footer">
            <el-button  type='primary' @click="del" size='small'>确定</el-button>
            <el-button @click="deldialog = false" size='small'>取消</el-button>
          </span>
      </el-dialog>
      <!--**图片放大**-->
      <div class="mask" v-show="show" @click="small">
        <img :src="bigsrc" alt="" class="bigimg">
      </div>
    </div>
</template>

<script>
    import {businessChange,businessChanges,businessDel} from '../../api/self'
    export default {
      name: "stores",
      data() {
        return {
          dandialog:false,
          deldialog:false,
          passwords:'',
          dan:'',
          money:'',
          bigsrc:'',//放大图片的地址
          show:false,  //放大图片的遮造层
          tableData: [],
          Ids:'',
          password:''
        }
      },
      mounted(){
        businessChange().then(response=>{
          var data=response
          this.tableData=data.nums
        }).catch(error=>{})
      },
      methods:{
         //===查看原图
        bigImg(e){
          this.show=true;
          this.bigsrc=e.target.currentSrc;
        },
        //===隐藏原图
        small(){
          this.show=false;
        },
        // 单量修改
        xiu(index){
          this.dan=this.tableData[index].num;
          this.money=this.tableData[index].price;
          this.Ids=this.tableData[index].id
          this.dandialog=true;
        },
        danChange(){
          var that=this
          if(this.dan==''){
            this.$message.warning('请输入单量')
          }else if(this.money==''){
            this.$message.warning('请输入价格')
          }else if(this.password==''){
            this.$message.warning('请输入操作密码')
          }else{
            businessChanges(this.dan,this.money,this.Ids,this.password).then(response=>{
              var data=response
              this.dandialog=false
              if(data.msg==1){
                this.$message.success('修改成功')
                setTimeout(function(){
                  that.$router.go(0)
                },500)
              }else if(data.msg==3){
                this.$message.error('密码错误')
              }
            }).catch(error=>{})
          }
        },
        // ===删除
        del(){
          var that=this;
          if(this.passwords==''){
            this.$message.warning('请输入操作密码')
          }else{
            businessDel(this.Ids,this.passwords).then(response=>{
              this.deldialog=false
              var data=response
              if(data.msg==1){
                this.$message.success('删除成功')
                setTimeout(function(){
                  that.$router.go(0)
                },500)
              }else if(data.msg==3){
                this.$message.error('密码错误')
              }
            }).catch(error=>{})
          }
        }
      }
    }
</script>

<style scoped>
  .stores-title{
    font-size:16px;
    text-align: left;
    height:20px;
    line-height:20px;
    border-left:4px solid #4782ef;
    padding-left:6px;
    font-weight:bold;
    margin-bottom:20px;
  }
  .tips{
    font-size:14px;
    color:#f56c6c;
    text-align: left;
    padding-left:10px;
  }
  .bindbtn{
    margin-left:50px;
  }
  .store-inner{
    background:#fff;
    padding:20px;
    height:100%;
  }
  #app .first-box .el-table .table-header{
    background:#f5f7fa;
  }
  .el-table th, .el-table tr.table-header{
    background:#f5f7fa;
  }
  a{
    color:#fff;
  }
  .loading-tips{
    text-align:left;
    font-size:14px;
    line-height:30px;
  }
  .loading-tips .alert-label{
    margin-right:10px;
    font-weight:bold;
  }
  .loading-tipss{
    display:flex;
  }
  .loading-tipss .alert-label{
     display:block;
  }
  .up-img{
    width:300px;
    height:300px;
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
  .touBox{
    width:100%;
  }
  .touBox .touList{
    margin-bottom: 10px;
    text-align:left;
    font-size:14px;
    color:rgba(0,0,0,0.45);
     vertical-align:text-top;
  }
  .touLabel{
    color:#000;
    margin-right:10px;
  }
  .danInp{
    width:60%;
  }
</style>
