<template>
  <div>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="store-inner">
          <el-tabs>
            <el-tab-pane label="投诉问题"><shua_tou></shua_tou></el-tab-pane>
            <el-tab-pane label="转账问题"><shua_zhuan></shua_zhuan></el-tab-pane>
            <el-tab-pane label="保证金"><shua_bao></shua_bao></el-tab-pane>
            <el-tab-pane label="提现"><shua_xian></shua_xian></el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import shua_tou from './innerHand/shua_tou'
import shua_bao from './innerHand/shua_bao'
import shua_zhuan from './innerHand/shua_zhuan'
import shua_xian from './innerHand/shua_xian'
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
      shua_zhuan,
      shua_bao,
      shua_tou,
      shua_xian
    }
  }
</script>

<style>
.store-inner{
  background:#fff;
  padding:20px;
}
</style>
