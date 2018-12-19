<template>
  <div>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="store-inner">
          <el-tabs>
            <el-tab-pane label="投诉问题"><tou></tou></el-tab-pane>
            <el-tab-pane label="转账问题"><zhuan></zhuan></el-tab-pane>
            <el-tab-pane label="加单量"><dan></dan></el-tab-pane>
            <el-tab-pane label="保证金"><bao></bao></el-tab-pane>
            <el-tab-pane label="充值"><chong></chong></el-tab-pane>
            <el-tab-pane label="提现"><tiXian></tiXian></el-tab-pane>
            <el-tab-pane label="店铺审核"><shen></shen></el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import tou from './innerStore/tou'
import bao from './innerStore/bao'
import dan from './innerStore/dan'
import zhuan from './innerStore/zhuan'
import chong from './innerStore/chong'
import tiXian from './innerStore/tiXian'
import shen from './innerStore/shen'
  export default {
    data(){
      return {
      };
    },
    mounted:function(){

    },
    methods: {
    },
    components:{
      tou,
      bao,
      zhuan,
      dan,
      chong,
      tiXian,
      shen
    }
  }
</script>

<style>
.store-inner{
  background:#fff;
  padding:20px;
}
</style>
