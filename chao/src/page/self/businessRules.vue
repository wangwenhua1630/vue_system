<template>
    <div>
      <el-row class="contain row-bg" type="flex"  justify="center">
        <el-col>
          <div class="store-inner">
            <p class='break'>刷手等级设置
              <el-button type="primary"  size="mini" class="bindbtn" @click='ruleAdddialog=true'> 新增 </el-button>
            </p>
            <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%"   header-row-class-name="table-header" border >
              <el-table-column type="index" label="No."  header-align="center">
              </el-table-column>
              <el-table-column prop="minPrice" label="佣金区间(小)"  header-align="center">
              </el-table-column>
              <el-table-column  prop="maxPrice" label="佣金区间(大)" header-align="center">
              </el-table-column>
              <el-table-column prop="merchantCommission" label="商家任务支付佣金(条)"  show-overflow-tooltip header-align="center">
              </el-table-column>
              <el-table-column prop="handCommission" label="刷手任务应得佣金(条)"  show-overflow-tooltip header-align="center">
              </el-table-column>
              <el-table-column prop="createAt" label="创建时间"  show-overflow-tooltip header-align="center">
              </el-table-column>
              <el-table-column prop="upAt" label="修改时间"  show-overflow-tooltip header-align="center">
              </el-table-column>
              <el-table-column  label="操作"  header-align="center" width='220'>
                <template slot-scope="scope">
                  <el-button type="primary" plain round size="mini" @click="xiu(scope.row.id)">修改</el-button>
                  <el-button type="primary" plain round size="mini" @click="del(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <!-- 修改佣金规则 -->
      <el-dialog title="新增规则设置" :visible.sync="ruleAdddialog" width='30%' >
        <ul class='touBox'>
          <li class='touList'><span class='touLabel'>佣金区间(小)：</span><el-input-number v-model="num1" :min="0" :precision="0"  class='danInp' size='small' ></el-input-number></li>
          <li class='touList'><span class='touLabel'>佣金区间(大)：</span><el-input-number v-model="num2" :min="0" :precision="0"  class='danInp' size='small' ></el-input-number></li>
          <li class='touList'><span class='touLabel'>商家任务支付佣金(条)：</span><el-input v-model="num3"  class='danInp' size='small' ></el-input></li>
          <li class='touList'><span class='touLabel'>刷手任务应得佣金(条)：</span><el-input v-model="num4"  class='danInp' size='small' ></el-input></li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button  type='primary' @click="ruleAdds(num1,num2,num3,num4)" size='small'>确定</el-button>
          <el-button @click="ruleAdddialog = false" size='small'>取消</el-button>
        </span>
      </el-dialog>
      <!-- 修改佣金规则 -->
      <el-dialog title="修改规则设置" :visible.sync="ruleUpdatadialog" width='30%' >
        <ul class='touBox'>
          <li class='touList'><span class='touLabel'>佣金区间(小)：</span><el-input-number v-model="num1" :min="0" :precision="0"  class='danInp' size='small' ></el-input-number></li>
          <li class='touList'><span class='touLabel'>佣金区间(大)：</span><el-input-number v-model="num2" :min="0" :precision="0"  class='danInp' size='small' ></el-input-number></li>
          <li class='touList'><span class='touLabel'>商家任务支付佣金(条)：</span><el-input v-model="num3"  class='danInp' size='small' ></el-input></li>
          <li class='touList'><span class='touLabel'>刷手任务应得佣金(条)：</span><el-input v-model="num4"  class='danInp' size='small' ></el-input></li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button  type='primary' @click="ruleUpdatas(num1,num2,num3,num4)" size='small'>确定</el-button>
          <el-button @click="ruleUpdatadialog = false" size='small'>取消</el-button>
        </span>
      </el-dialog>
      <!-- 删除佣金规则 -->
      <el-dialog title="修改规则设置" :visible.sync="ruleDeldialog" width='30%' >
        <ul class='touBox'>
          <li class='touList'><span class='touLabel'>支付密码：</span><el-input type="password" v-model="pass" class='danInp' size='small' ></el-input></li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button  type='primary' @click="ruleDels(pass)" size='small'>确定</el-button>
          <el-button @click="ruleDeldialog = false" size='small'>取消</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  import {ruleFind,ruleAdd,ruleUpdate,ruleDel} from '../../api/self'
    export default {
        name: "businessRules",
      data(){
          return{
            ruleAdddialog:false,
            ruleUpdatadialog:false,
            ruleDeldialog:false,
            tableData:[],
            pass:'',
            num1:'',
            num2:'',
            num3:'',
            num4:'',
            index:''
          }
      },
      mounted:function(){
          //查询
        ruleFind().then(response=>{
          const data=response;
          console.log(data);
          this.tableData=data.list;
        })
      },
      methods:{
          //新增
        ruleAdds(n1,n2,n3,n4){
          var that=this;
          if(n1<n2){
            ruleAdd(n1,n2,n3,n4).then(response=>{
              const data=response;
              if(data.msg==1){
                this.$message.success('新增成功');
                setTimeout(function(){
                  that.$router.go(0)
                },500)
              }
            }).catch(
              console.log(error)
            )
          }else{
            this.$message.success('佣金区间设置错误');
          }

        },
        //修改
        xiu(id){
          this.index=id;
          var arr=this.tableData[id-1];
          this.num1=arr.minPrice;
          this.num2=arr.maxPrice;
          this.num3=arr.merchantCommission;
          this.num4=arr.handCommission;
          this.ruleUpdatadialog=true;
        },
        ruleUpdatas(n1,n2,n3,n4){
          var that=this;
          if(n1<n2){
            ruleUpdate(this.index,n1,n2,n3,n4).then(response=>{
              const data=response;
              if(data.msg==1){
                this.$message.success('修改成功');
                setTimeout(function(){
                  that.$router.go(0)
                },500)
              }
            }).catch(error=>{})
          }else{
            this.$message.success('佣金区间设置错误');
          }

        },
        //删除
        del(id){
          this.index=id;
          this.ruleDeldialog=true;
        },
        ruleDels(pass){
          var that=this;
          ruleDel(that.index,pass).then(response=>{
            const data=response;
            if(data.msg==1){
              this.$message.success('删除成功');
              setTimeout(function(){
                that.$router.go(0)
              },500)
            }else if(data.msg==4){
              this.$message.success('密码错误');
            }
          }).catch()
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
