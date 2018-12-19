<template>
  <div>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="store-inner">
          <p class='break'><router-link to='/businessNoticBox'>商家公告/发布公告</router-link></p>
          <el-row type="flex"  justify="space-between">
            <el-col :span='18'>
              <div class='faBox'>
                <div class='faList'>
                  <span class='faLabel'>标题</span>
                  <el-input v-model="input" placeholder="请输入内容" class='faInp' size='small' ></el-input>
                </div>
                <!-- <div class='faList'>
                  <span class='faLabel'>发送对象</span>
                  <div class='faTags'>
                    <span class='fa_tag_list' v-bind:class="[item.choose?active:'']" v-for='(item,index) in tag_list' @click='tags(index)' >{{item.name}}</span>
                  </div>
                </div> -->
                <div class='faList'>
                  <span class='faLabel' >发送内容</span>
                  <div class='ues'>
                     <UE id="ueditor" :value="ueditor.value" :config="ueditor.config" ref="ue"></UE>
                  </div>
                </div>
                <div class='faLists'>
                  <el-button type="primary"  class='style-btn next-btn' round  @click="returnContent">发布</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
   import UE from '../ue/ue.vue';
   import {addBusinessinfo} from '../../api/self'
  export default {
    data(){
      return {
        tag_list:[{'name':'商家','choose':false,id:1},{'name':'刷手','choose':false,id:2}],
        input:'',
        active:'active',
        dat: {
          content: ''
        },
        ids:this.$route.params.id,
        ueditor: {
          value: '',
          config: {
            initialFrameWidth: '',
            initialFrameHeight: 320
          }
        }
      };
    },
    components: {UE},
    methods:{
      tabs(tab, event){
        console.log(tab.index)
      },
      returnContent () {
        var that=this
        var type
        var n=0
        for(var i=0;i<this.tag_list.length;i++){
          if(this.tag_list[i].choose){
            n++
            type=this.tag_list[i].id
          }
        }
        if(n>1){
          type=1
        }
        addBusinessinfo(this.input,this.$refs.ue.getUEContent(),1,this.$route.params.id).then(response=>{
          var data=response
          if(data.msg==1){
            this.$message.success('发送成功')
            setTimeout(function(){
              that.$router.go(0)
            },500)
          }
        }).catch(error=>{

        })
      },
      // 选择发送对象
      tags(index){
        this.tag_list[index].choose=!this.tag_list[index].choose
      }
    }
  }
</script>

<style>
.store-inner{
  background:#fff;
  padding:20px;
}
.notic-list{
  line-height:40px;
  font-size:14px;
  display:flex;
  text-align:left;
  justify-content:space-between;
  cursor:pointer;
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
.faList{
  margin-bottom:20px;
  overflow:hidden;
}
.faLabel{
  float:left;
  font-size:14px;
  color:#000;
  width:80px;
  text-align:right;
  padding-right:20px;
  height:36px;
  line-height:36px;
}
.faInp{
  float:left;
  width:80%;
}
.faTags{
  float:left;
}
.faTags .fa_tag_list{
  line-height:30px;
  text-align:center;
  font-size:14px;
  width:80px;
  border-radius:4px;
  background:rgba(0,0,0,0.1);
  display:block;
  margin-right:20px;
  float:left;
  cursor:pointer;
  margin-top:3px;
}
.fa_tag_list.active{
  background:#1890FF;
  color:#fff;
}
.ues{
  width:80%;
  float:left;
}
</style>
