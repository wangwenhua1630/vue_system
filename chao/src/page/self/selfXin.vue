<template>
  <div>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="store-inner">
          <p class='break'>刷手新手引导设置</p>
          <el-form  :model="form" class="queryBox querysBox" label-width="130px"  size="small">
            <el-form-item label="分类选择">
              <el-select v-model="form.state" placeholder="请选择" style='width:100%;' >
                <el-option :label="item.title" :value="item.id" v-for='item in list ' :key='item.id'></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="视频上传">
                <el-upload action="http://www.rwgh66.com/sd-web/merchant/upload" 
                           list-type="picture-card"
                           :on-remove="handleRemove"
                           :on-success="storeUp" :limit="1"
                           :on-exceed="handleExceed" class="up_load">
                  <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="内容填写">
              <UE id="ueditor" :value="ueditor.value" :config="ueditor.config" ref="ue"></UE>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  class='style-btn next-btn' size='small' round @click='submit' >提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import UE from '../ue/ue.vue';
    import {handSelflook,handSelfChange} from '../../api/self'
    export default {
        name: "index",
        data(){
          return{
            form:{
              state:''
            },
            ueditor: {
              value: '',
              config: {
                initialFrameWidth: '',
                initialFrameHeight: 320
              }
            },
            list:[],
            url:''
          }
        },
        mounted(){
          handSelflook().then(response=>{
            var data=response
            this.list=data.list
          }).catch(error=>{})
        },
        methods:{
          returnContent () {
            this.dat.content = this.$refs.ue.getUEContent()
          },
          //上传图片
          storeUp(response, file, fileList){
            this.url=response.picPath
          },
          //删除上传图片
          handleRemove(file){
            let that=this;
            this.store.forEach(function(item,index){
              if(file.url==item){
                that.store.splice(index,1)
              }
            });
          },
          //限制展示图上传的张数
          handleExceed(){
            this.$alert('只能上传1个视频',{
              confirmButtonText: '确定',
              callback: action => {

              }
            });
          },

          submit(){
            var that=this;
            if(this.form.state==''){
              this.$message.warning('请选择类型')
            }else if( this.$refs.ue.getUEContent()==''){
              this.$message.warning('请填写内容')
            }else{
              handSelfChange(this.form.state,this.url,this.$refs.ue.getUEContent(),'').then(response=>{
                var data=response
                if(data.msg==1){
                  this.$message.success('提交成功')
                  setTimeout(function(){
                    that.$router.push('/self')
                  },500)
                }
              }).catch(error=>{

              })
            }
          }
        },
        components: {UE},
    }
</script>

<style scoped>
  .store-inner{
    background:#fff;
    padding:20px;
    height:100%;
  }
  .queryBox{
    display:block;
    float:left;
  }
  .querysBox{
    width:70%;
    text-align:left;
  }
  #app .first-box .el-table .table-header{
    background:#f5f7fa;
  }
  .el-table th, .el-table tr.table-header{
    background:#f5f7fa;
  }
  a{
    color:#1890FF;
  }
  a:hover{
    color:#fff;
  }
</style>
