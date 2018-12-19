<template>
  <div class='newStore'>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="all-box">
          <div class="recharge-info">
            <div class='info-fl'>
              <p class='icons '>i</p>
            </div>
            <div class="info-box">
              <p class="rechare-title">店铺入驻条件</p>
              淘宝店铺：<span class='rechare-span'>不招商</span>；天猫店铺：月成交额<span class='rechare-span'>30万</span>以上；若店铺不符合以上条件, 即使提交审核资料, 平台一律予以拒绝, 多谢配合~
              温馨提示：发货人信息会显示在快递单上，所以请如实填写。
            </div>
          </div>
          <el-form ref="form" :model="form"  :rules="rules" label-width="130px" label-position='left' size='small' >
            <el-row>
              <el-col>
                <el-form-item  label="店铺性质" prop='types' class='form-item'>
                  <el-radio-group v-model="form.types" >
                    <el-radio :label="1">淘宝</el-radio>
                    <el-radio :label="2">天猫</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="掌柜号：" prop='name'>
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="店铺名："  prop='storeName'>
                  <el-input v-model="form.storeName"></el-input>
                </el-form-item>
                <el-form-item label="店铺类目：" prop='type_value'>
                  <el-select  placeholder="请选择" class="select" v-model='form.type_value'>
                    <el-option :label="item.name" :value='item.id' v-for='item in leis' :key='item.id'></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="店铺推广状态：" class='form-item' prop='tui' >
                  <p class='radio-label'>淘宝客：</p>
                  <el-radio-group v-model="form.tao" size="medium" style='margin-right:50px;' >
                    <el-radio  label='1' >已开通</el-radio>
                    <el-radio  label='2'>未开通</el-radio>
                  </el-radio-group>
                  <p class='radio-label'>农村淘宝：</p>
                  <el-radio-group v-model="form.nong" size="medium">
                    <el-radio  label='1' >已开通</el-radio>
                    <el-radio  label='2'>未开通</el-radio>
                  </el-radio-group>
                </el-form-item>
                <p class='form-tips'>提示：请如实填写，避免不必要的损失，放单期间建议关闭淘宝客，否则会带来额外的不必要的损失。</p>
                <el-form-item label="发货人姓名：" prop='faName'>
                  <el-input v-model="form.faName"></el-input>
                </el-form-item>
                <el-form-item label="发货人手机号：" prop='phone'>
                  <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="店铺省市区:" class='form-item' prop='citys' >
                  <el-select  placeholder="请选择"   v-model="pro_value">
                    <el-option v-for="item in pro" :key="item" :label="item" :value="item"></el-option>
                  </el-select>
                  <el-select  placeholder="请选择"  v-model="city_value">
                    <el-option v-for="item in city" :key="item" :label="item" :value="item"></el-option>
                  </el-select>
                  <el-select  placeholder="请选择"  v-model="area_value">
                     <el-option v-for="item in area" :key="item" :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="发货详细地址：" prop='info'>
                  <el-input  v-model="form.info" ></el-input>
                </el-form-item>
                <div class='up-all'>
                  <div class='up-label'>上传截图：</div>
                  <div class='upBox upBoxs'>
                    <div class="up-img" @click="bigImg('https://www.bozhiyingxiao.com/task_program/imgs/tu2.png')">
                      <img src="../../assets/tu2.png" alt="" class="up-imgs" @click="bigImg">
                      <p class="upmask-img">生意参谋截图</p>
                    </div>
                    <div class="up-img" @click="bigImg('https://www.bozhiyingxiao.com/task_program/imgs/tu1.png')">
                      <img src="../../assets/tu1.png" alt="" class="up-imgs" @click="bigImg">
                      <p class="upmask-img">店铺首页截图</p>
                    </div>
                    <el-upload action="http://www.rwgh66.com/sd-web/merchant/upload" list-type="picture-card"
                              :on-remove="handleRemoves"
                               :on-success="bannerUp" :limit="2" :on-exceed="handleExceeds" class="up_load">
                      <i class="el-icon-plus"></i>
                    </el-upload> 
                  </div>
                </div>
                <el-form-item class="submit">
                  <el-button type="primary" @click="submitForm('form')" class='right-btn' >提交</el-button>
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
  import arrAll from '../../until/city'
  import {isvalidPhone} from '../../until/regex';
  import {storeLei} from '../../api/vip'
  export default {
    name: "company",
    data(){
      // 验证手机号
      var validPhone=(rule, value,callback)=>{
        if (!value){
            callback(new Error('请输入电话号码'))
        }else  if (!isvalidPhone(value)){
          callback(new Error('请输入正确的11位手机号码'))
        }else {
            callback()
        }
      }
      // 店铺推广状态
      var store=(rule, value,callback)=>{
        if(this.form.tao==''){
          callback(new Error('请选择店铺推广状态'))
        } else if(this.form.nong==''){
          callback(new Error('请选择店铺推广状态'))
        }else{
          callback()
        }
      }
      // 省市区验证
      var cityYan=(rule, value,callback)=>{
        if(this.pro_value==''){
          callback(new Error('请选择省'))
        } else if(this.city_value==''){
          callback(new Error('请选择市'))
        }else if(this.area_value==''){
          callback(new Error('请选择区'))
        }else{
          callback()
        }
      }
      return{
        form: {
          name: '',
          storeName:'',
          type_value:'',
          faName:'',
          phone:'',
          info:'',
          nong:'',
          tao:'',
          types:'',
          pro:'',
          city:'',
          area:'',
          can:'',
          shou:''
        },
        rules:{
          name: [{ required: true, message: '请输入掌柜号', trigger: 'blur' }],
          storeName:[{required: true, message: '请输入店铺名称', trigger: 'blur'}],
          type_value:[{required: true, message: '请输入店铺类目', trigger: 'change'}],
          faName:[{required: true, message: '请输入发货人姓名', trigger: 'blur'}],
          phone:[{required:true,trigger:'blur',validator: validPhone}],
          info:[{required:true,trigger:'blur',message: '请输入发货详细地址'}],
          types:[{required:true,trigger:'change',message: '请选择店铺性质'}],
          tui:[{required:true,trigger:'change',validator: store}],
          citys:[{required:true,trigger:'change',validator: cityYan}]
        },
        city:[],
        pro:[],
        area:[],
        leis:[],
        pro_value:'',
        city_value:'',
        area_value:'',
        bigsrc:'',//放大图片的地址
        show:false,  //放大图片的遮造层
        dialogVisible:false,
        banner:[],
        store:[]
      }
    },
    props:['forms'],
    mounted:function(){
      for(let i=0;i<arrAll.length;i++){
          this.pro.push(arrAll[i].name)
      }
      storeLei().then(response=>{
        var data=response
        this.leis=data.nums
        console.log(this.leis)
      }).catch(error=>{})
      //this.form.name=forms.name
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
        this.banner.push(response.src)
        this.form.can=this.banner[0]
        this.form.shou=this.banner[1]
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
        this.$alert('只能上传2张图片', '上传截图', {
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
            // 选判断截图是否上传
            if(that.banner==''||that.banner.length<2){
              that.$message.error('请上传截图');
            }else{
                that.form.can=that.banner[0]
                that.form.shou=that.banner[1]
                that.$emit("storeMessage",that.form)
             }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    watch: {
      // 省
      pro_value(e){
        this.city=[];
        for(let i=0;i<arrAll.length;i++){
          if(this.pro_value==arrAll[i].name){
            for(let j=0;j<arrAll[i].city.length;j++){
              this.city.push(arrAll[i].city[j].name)
              this.form.pro=this.pro_value
            }
          }
        }
      },
      // 市
      city_value(e){
        this.area=[];
        for(let i=0;i<arrAll.length;i++){
          if(this.pro_value==arrAll[i].name){
            for(let j=0;j<arrAll[i].city.length;j++){
              if(this.city_value==arrAll[i].city[j].name){
                for(let x=0;x<arrAll[i].city[j].area.length;x++){
                  this.area.push(arrAll[i].city[j].area[x])
                  this.form.city=this.city_value
                }
              }
            }
          }
        }
      },
      area_value(e){
         this.form.area=this.area_value
      }
    },
  }
</script>

<style scoped>
  body{
    background: #f8f8f8;
  }
  .form-tips{
    font-size:14px;
    color:#f00;
  }
  .steps{
    margin-top:50px;
  }
  .all-box{
    background:#fff;
    padding:20px;
  }
  .recharge-info .info-box{
    border:none;
  }
  .recharge-info{
    margin-bottom:44px;
    overflow:hidden;
    background:#E6F7FF;
    border-radius:4px;
    border:1px solid #91D5FF;
    height:124px;
  }
  .info-fl{
    float:left;
    width:10%;
    position:relative;
    display:flex;
    height:124px;
    justify-content:center;
    flex-direction:column;
  }
  .icons{
    width:24px;
    height:24px;
    display:block;
    border:2px solid #1890FF;
    color:#1890FF;
    font-size:20px;
    text-align:center;
    line-height:24px;
    border-radius:50%;
    margin:0 auto;
    font-weight:bold;
  }
  .rechare-span{
    color:#F5222D;
  }
  form{
    background:#fff;
    border-radius:4px;
    /*box-shadow: 0 0 10px rgba(0,0,0,0.1);*/
  }
  .form-item{
    text-align:left;
  }
  #app .all-box .el-form-item__content{
    text-align: left;
  }
  .all-box .el-radio-group{
    margin:0;
  }
  .radio-label{
    display:inline-block;
  }
  .select{
    width:100%;
  }
  .rechare-title{
    font-size:16px;
    color:#000;
    text-align: left;
    margin-bottom:10px;
  }
  .info-box{
    padding:15px;
    width:90%;
    float:left;
    font-size:14px;
    text-align: left;
    line-height:30px;
   
  }
  .up-all{
    width:100%;
    overflow:hidden;
  }
  .up-label{
    width:130px;
    text-align:left;
    float:left;
    padding-right:12px;
  }
  .upBox{
    overflow:hidden;
    width:700px;
    float:left;
  }
  .up-img{
    width:148px;
    height:148px;
    float:left;
    border-radius:4px;
    margin-right:30px;
    position: relative;
    overflow:hidden;
  }
  .up-imgs{
    width:100%;
    height:100%;
  }
  .upmask-img{
    width:100%;
    text-align: center;
    line-height:148px;
    color:#fff;
    font-size:16px;
    background:rgba(0,0,0,0.5);
    position: absolute;
    left:0;
    top:0;
    cursor:pointer;
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
  .newStore .el-radio+.el-radio{
    margin-left:30px;
  }
  .right-btn{
    float:right;
  }
</style>
