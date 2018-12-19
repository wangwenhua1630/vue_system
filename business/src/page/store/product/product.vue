<template>
  <div>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="store-inner">
          <el-tabs>
            <el-tab-pane label="等待转账"><wait></wait></el-tab-pane>
            <el-tab-pane label="转账结果"><result></result></el-tab-pane>
            <el-tab-pane label="未到账反馈"><not></not></el-tab-pane>
            <el-tab-pane label="买家已退款"><back></back></el-tab-pane>
            <el-tab-pane label="转账失败"><miss></miss></el-tab-pane>
            <el-tab-pane label="超时未转账"><overtime></overtime></el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import wait from './wait/wait'
import result from './result/result'
import not from './not/not'
import back from './back/back'
import miss from './miss/miss'
import overtime from './overtime/overtime'
  export default {
    data(){
      return {
      };
    },
    mounted:function(){

    },
    // =======方法列表
    methods: {
      // ====导出为zip
      zip_down(){
        require.ensure([], () => {
          const { export_txt_to_zip } = require('@/vendor/Export2Zip')
          const tHeader = ['编号','商品名称','价格','销量','库存','简介']
          const filterVal = ['nums','name','money','xiao','cun','info']
          const indexss=this.activeName
          const list = this.store_info[indexss].tableData
          const data = this.formatJson(filterVal, list)
          export_txt_to_zip(tHeader, data, '列表文本', '压缩文本')
          this.downloadLoading = false
        })
      },
      // 导出为表格
      excel_down(){
        this.downloadLoading = true
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel')
          const tHeader = ['编号','商品名称','价格','销量','库存','简介']
          const filterVal = ['nums','name','money','xiao','cun','info']
          const indexss=this.activeName
          const list = this.store_info[indexss].tableData
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '列表文本', '压缩文本')
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
    },
    components:{
      wait,
      result,
      not,
      back,
      miss,
      overtime
    }
  }
</script>

<style>
.store-inner{
  background:#fff;
  padding:20px;
}
</style>
