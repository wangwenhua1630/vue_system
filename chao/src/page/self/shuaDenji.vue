<template>
    <div>
      <el-row class="contain row-bg" type="flex"  justify="center">
        <el-col>
          <div class="store-inner">
            <p class='break'>刷手等级设置
            </p>
            <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%"   header-row-class-name="table-header" border >
              <el-table-column prop="name" label="刷手等级"  header-align="center">
              </el-table-column>
              <el-table-column  prop="numTop" label="积分区间(小)" header-align="center">
              </el-table-column>
              <el-table-column prop="numButtom" label="积分区间(大)"  show-overflow-tooltip header-align="center">
              </el-table-column>
              <el-table-column prop="moneysColdDays" label="佣金冻结天数"  show-overflow-tooltip header-align="center">
              </el-table-column>
              <el-table-column  label="操作"  header-align="center" width='220'>
                <template slot-scope="scope">
                  <el-button type="primary" plain round size="mini" @click="xiu(scope.row.id)">修改</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <!-- 单量调整 -->
      <el-dialog title="冻结天数设置" :visible.sync="qudialog" width='30%' >
        <ul class='touBox'>
          <li class='touList'><span class='touLabel'>修改冻结天数：</span><el-input-number v-model="num" :min="1" :precision="0"  class='danInp' size='small' ></el-input-number></li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button  type='primary' @click="quChange(num)" size='small'>确定</el-button>
          <el-button @click="qudialog = false" size='small'>取消</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  import {shuaHuo,shuaDen} from '../../api/self'
    export default {
        name: "shuaDenji",
      data(){
          return {
            tableData:[],
            qudialog:false,
            num:'',
            ids:''
          }
      },
      mounted(){
          shuaHuo().then(response=>{
            const data=response;
            console.log(data);
            this.tableData=data.list
          })
      },
      methods:{
          xiu(id){
            this.qudialog=true;
            this.ids=id
          },
        quChange(num){
            var that=this;
          if(!this.num){
            this.$message.warning('请设置天数')
          }else{
              // console.log(this.ids,num)
            shuaDen(this.ids,num).then(response=>{
              const data=response;
              that.$message.success('修改成功')
              setTimeout(function(){
                that.$router.go(0)
              },500)
            })
          }
        }
      }
    }
</script>

<style scoped>

</style>
