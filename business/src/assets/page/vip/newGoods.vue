<template>
  <div>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="all-box">
          <p class="break"> <router-link to='/goods'><img src="../../assets/hui.png" alt="" class='back-icon' ></router-link></p>
          <el-form ref="form" :model="form" :rules='rules' label-width="130px">
            <el-row>
              <el-col :span="20">
                <el-form-item label="店铺名称"  prop='type_value' >
                  <el-select  placeholder="请选择" class="select" v-model='form.type_value' >
                    <el-option :label="item.name" :value="item.id" v-for='item in options' :key='item.id' ></el-option>
                  </el-select>
                </el-form-item>
                 <el-form-item label="商品链接：" prop='url' class='styless'>
                  <el-input v-model="form.url" class='small-inp'></el-input>
                  <el-button type="primary">获取商品详情</el-button>
                </el-form-item>
                <el-form-item label="商品名称：" prop='proName'>
                  <el-input v-model="form.proName"></el-input>
                </el-form-item>
                <el-form-item label="商品简称：" prop='proJian'>
                  <el-input v-model="form.proJian"></el-input>
                  
                </el-form-item>
                <el-form-item label="APP主图/直通车主图：">
                  <el-upload action="http://www.rwgh66.com/sd-web/merchant/upload" list-type="picture-card"
                            :on-remove="handleRemoves"
                             :on-success="bannerUps" :limit="1" :on-exceed="handleExceeds" class="up_load">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </el-form-item>
                <p class='form-tips'>提示：绑定直通车图或者app主图，同一个连接可以重复绑定，如果您的直通车与APP主图不一致，您可以再次绑定，避免任务出错</p>
               <!--  <el-form-item label="手机端天猫/淘宝主图(选填)" >
                  <el-upload action="https://www.bozhiyingxiao.com/sd-web/merchant/upload" list-type="picture-card"
                            :on-remove="handleRemoves"
                             :on-success="bannerUp" :limit="1" :on-exceed="handleExceeds" class="up_load">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </el-form-item> -->
                <el-form-item class="submit">
                  <el-button type="primary" @click="submitForm('form')">提交</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <!--**图片放大**-->
    <div class="mask" v-show="show" @click="small">
      <img :src="bigsrc" alt="" class="bigimg">
    </div>
  </div>
</template>

<script>
  import {addGoods,storeList} from '../../api/vip'
  export default {
    name: "company",
    data(){
      return{
        form: {
          type_value:'',
          url:'',
          proName:'',
          proJian:'',
        },
        rules:{
          type_value:[{required: true, message: '请选择店铺名称', trigger: 'change'}],
          url:[{required: true, message: '请获取商品详情', trigger: 'blur'}],
          proJian:[{required: true, message: '请输入商品简称', trigger: 'blur'}],
          proName:[{required: true, message: '请获取商品名称', trigger: 'blur'}]
        },
        bigsrc:'',//放大图片的地址
        show:false,  //放大图片的遮造层
        newdialog:false,
        banner:[],
        store:[],
        imgs:'',
        phoneImgs:'',
        options:[]
      }
    },
    mounted(){
      storeList().then(response=>{
        var data=response
        this.options=data.stores
      }).catch(error=>{

      })
    },
    methods: {
     //查看原图
      bigImg(src){
        this.show=true;
        this.bigsrc=src;
      },
      //隐藏原图
      small(){
        this.show=false;
      },
      // =====截图上传
      //展示图的操作
      bannerUp(response, file, fileList){
        this.phoneImgs=response.src
      },
      bannerUps(response, file, fileList){
        this.imgs=response.src
      },
      handleRemoves(file){
        let that=this;
        this.banner.forEach(function(item,index){
          if(file.url==item){
            that.banner.splice(index,1)
          }
        });
      },
      handleExceeds(){
        this.$alert('只能上传1张图片',  {
          confirmButtonText: '确定',
          callback: action => {

          }
        });
      },
      // ===提交
      submitForm(formName) {
        var that=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addGoods(this.form.type_value,'',this.form.url,this.form.proName,this.form.proJian,this.imgs,'').then(response=>{
              var data=response
              if(data.msg==1){
                this.$message.success('添加成功')
                setTimeout(function(){
                  that.$router.go(0)
                },500)
              }
            }).catch(error=>{})
          } else {
            return false;
          }
        });
      },
    },
  }
</script>

<style scoped>
  body{
    background: #f8f8f8;
  }
  .form-tips{
    color:#f00;
  }
  .steps{
    margin-top:50px;
  }
  body .styless .el-form-item__content{
    text-align: left;
  }
  .all-box{
    background:#fff;
    padding:20px;
  }
  .recharge-info{
    margin-bottom:20px;
  }
  form{
    background:#fff;
    padding:30px;
    border-radius:4px;
    /*box-shadow: 0 0 10px rgba(0,0,0,0.1);*/
    border:1px solid #eee;
  }
  .form-item{
    text-align:left;
  }
  .small-inp{
    width:80%;
  }
  #app .all-box .el-form-item__content{
    text-align: left;
  }
  .all-box .el-radio-group{
    margin:0;
  }
  .select{
    width:100%;
  }
  .rechare-title{
    font-size:16px;
    color:#4882f0;
    text-align: left;
    margin-bottom:10px;
  }
  .info-box{
    padding:15px;
    border:1px solid #eee;
    font-size:14px;
    text-align: left;
    line-height:30px;
  }
  .img{
    width:148px;
    height:148px;
    float:left;
    border-radius:4px;
    margin-right:30px;
    position: relative;
    overflow:hidden;
  }
  .up_load{
    float:left;
  }
  .el-upload__tip{
    display:inline;
    width:60%;
    margin-left:20px;
  }
  .submit{
    margin-top:50px;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
  }
  .mask{
    width:100%;
    height:100%;
    position: absolute;
    left:0;
    top:0;
    background:rgba(0,0,0,0.6);
    z-index:2;
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
  .break a{
    display:block;
    width:100%;
    height:100%;
  }
  .back-icon{
    width:20px;
    height:20px;
  }
</style>
