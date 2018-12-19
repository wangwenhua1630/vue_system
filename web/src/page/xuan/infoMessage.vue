<template>
    <div class="infoMessage">
      <div class='mainMessage-box'>
        <div class='mainMessage-title'>账号资料</div>
        <div class='study-list'>
          <p class='study-label'>
            <span v-if="flags==1">淘宝</span><span v-if="flags==2">京东</span><span v-if="flags==3">拼多多</span>会员名</p>
          <p class='study-message'><input type="text" v-model='form.name' placeholder="请输入名称" class='mainMessage-inp' ><img src="../../assets/icon_in.png" alt="" class='study-icon'></p>
        </div>
        <div class='study-list' @click='chooses(1)'>
          <p class='study-label'>性别</p>
          <p class='study-message'>{{form.sex}} <img src="../../assets/icon_in.png" alt="" class='study-icon'></p>
        </div>
        <div class='study-list' @click='chooses(2)'>
          <p class='study-label'>出生日期</p>
          <p class='study-message'>{{form.birthday}} <img src="../../assets/icon_in.png" alt="" class='study-icon'></p>
        </div>
        <div class='study-list' @click='chooses(3)'>
          <p class='study-label'>所在地区</p>
          <p class='study-message'>{{form.province}}-{{form.city}}-{{form.area}}<img src="../../assets/icon_in.png" alt="" class='study-icon'></p>
        </div>
        <div class='study-list' @click='classFlag=true'>
          <p class='study-label'>关注类目</p>
          <p class='study-message' v-if='choose==1'>选择 <img src="../../assets/icon_in.png" alt="" class='study-icon'></p>
          <p class='study-message' v-if='choose==2'>已选择 <img src="../../assets/icon_in.png" alt="" class='study-icon'></p>
        </div>
        <mt-datetime-picker ref="picker" v-model="pickerVisible" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"
                :startDate='startDate' @confirm="handleConfirm">
        </mt-datetime-picker>
      </div>
      <!--性别-->
      <mt-popup
        v-model="sexDialog"
        position="bottom">
        <div class='caozuo'>
          <p class='cancel' @click='cancel' >取消</p>
          <p class='confirm' @click='confirm'>确定</p>
        </div>
        <mt-picker :slots="slots" @change="onsexChange"></mt-picker>
      </mt-popup>
      <!--出生地-->
      <mt-popup v-model="areaDialog" position="bottom">
        <div class='caozuo'>
          <p class='cancel' @click='cancel'>取消</p>
          <p class='confirm' @click='confirm'>确定</p>
        </div>
        <mt-picker :slots="areaslots" @change="onareaChange"></mt-picker>
      </mt-popup>
      <!--关注类目提示框-->
      <div class='classBox-mask' v-if='classFlag'>
        <div class='classBox'>
          <div class='classBox-close' @click='classObject(1)'>&times</div>
          <div class='classBox-confirm' @click='classObject(2)'>确定</div>
          <p class='classBox-list' v-bind:class="item.select?classActive:''" v-for='(item,index) in classBox' @click='classList(index)' >{{item.name}}</p>
        </div>
      </div>
      <div class='prove-upBox' v-if='!up'>
        <img src="../../assets/up-three.png" alt="" class='upImg' >
        <p class='up-text' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">上传截图</p>
        <input type="file" class='up-inp'  @change="upLoad" multiple="multiple">
      </div>
      <div class='prove-upBox proves-upBoxs' v-if='up'>
        <div class='prove-upBoxs' v-for='item in upimg'>
          <img :src='item' alt=""  class='upImg-upBox' >
          <input type="file" class='up-inp'  @change="upLoad" multiple="multiple">
        </div>
      </div>
      <p class='look' @click='example(1)'>查看示例</p>
      <div class='prove-upBox' v-if='!ups'>
        <img src="../../assets/up-three.png" alt="" class='upImg' >
        <p class='up-text' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">上传截图</p>
        <input type="file" class='up-inp'  @change="upLoads" multiple="multiple">
      </div>
      <div class='prove-upBox proves-upBoxs' v-if='ups'>
        <div class='prove-upBoxs' v-for='item in upimgs'>
          <img :src='item' alt=""  class='upImg-upBox' >
          <input type="file" class='up-inp'  @change="upLoads" multiple="multiple">
        </div>
      </div>
      <p class='look' @click='example(2)'>查看示例</p>
      <div class='upMask' v-if='mask' @click='mask=false' >
        <img :src="example_img" alt="" class='look-img' >
      </div>
      <div class='prove-upBox' v-if='!upss'>
        <img src="../../assets/up-three.png" alt="" class='upImg' >
        <p class='up-text' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">上传截图</p>
        <input type="file" class='up-inp'  @change="upLoadss" multiple="multiple">
      </div>
      <div class='prove-upBox proves-upBoxs' v-if='upss'>
        <div class='prove-upBoxs' v-for='item in upimgss'>
          <img :src='item' alt=""  class='upImg-upBox' >
          <input type="file" class='up-inp'  @change="upLoadss" multiple="multiple">
        </div>
      </div>
      <p class='look' @click='example(3)'>查看示例</p>
      <div class='upMask' v-if='mask' @click='mask=false' >
        <img :src="example_img" alt="" class='look-img' >
      </div>
      <button class="info_ok" @click="submit">完成</button>
    </div>
</template>

<script>
  import cityData from '../../config/city1.json'
  import {chooseUserInfo,userInfoSave} from '../../api/api'
    export default {
        name: "infoMessage",
      data(){
          return{
            flags:0,
            form:{
              name:'',
              sex:'选择',
              birthday:'选择',
              province:'请选择',
              city:'请选择',
              area:'请选择'
            },
            slots:[{
              flex: 1,
              values: ['男','女'],
              className: 'slot1',
              textAlign: 'right'
            }],
            areaslots:[{
              flex: 1,
              values: ['请选择'],
              className: 'slot1',
              textAlign: 'left'
            },{
              flex: 1,
                values: ['请选择'],
                className: 'slot2',
                textAlign: 'center'
            },{
              flex: 1,
                values: ['请选择'],
                className: 'slot3',
                textAlign: 'right'
            }],
            type:'',
            startDate:new Date('1970/1/1'),
            sexDialog:false,
            classFlag:false,
            areaDialog:false,
            pickerVisible:'',
            classActive:'class_active',
            choose:1,
            classBox:[],
            mask:false,
            up:false,
            upimg:[],
            ups:false,
            upimgs:[],
            upss:false,
            upimgss:[],
            example_img:'',
            example_img1:'',
            example_img2:'',
            example_img3:'',
            hand_id:''
          }
      },
      mounted(){
          var that=this;
          this.flags=sessionStorage.qie;
          var handId=sessionStorage.hand_id;
          this.hand_id=sessionStorage.hand_id;
          // console.log(this.hand_id);
        this.$indicator.open('加载中...');
        if(handId){
          sessionStorage.hand_id=''
          chooseUserInfo(handId).then(response=>{
            const data=response;
            console.log(data);
            this.classBox=data.hand_types
            this.form=data.info
            this.form.name=data.info.tao_account;
            if(this.form.sex==1){
              this.form.sex='男'
            }else{
              this.form.sex='女'
            }
            this.upimg=data.list.card_pay
            this.up=true
            this.upimgs=data.list.card_value
            this.ups=true
            this.upimgss=data.list.message_img
            this.upss=true
            this.example_img1=data.example_img.one;
            this.example_img2=data.example_img.two;
            this.example_img3=data.example_img.three;
            setTimeout(function(){
              that.$indicator.close()
            },500)
          }).catch()
        }else{
          chooseUserInfo().then(response=>{
            const data=response;
            console.log(data);
            this.classBox=data.hand_types
            this.example_img1=data.example_img.one;
            this.example_img2=data.example_img.two;
            this.example_img3=data.example_img.three;
            setTimeout(function(){
              that.$indicator.close()
            },500)
          }).catch()
        }
      },
      methods:{
          //选择
        chooses(index){
            this.type=index;
            if(index==1){
              this.sexDialog=true;
            }else if(index==2){
              console.log(this.$refs);
              this.$refs.picker.open();
            }else if(index==3){
              this.areaDialog=true;
              this.initCity()
            }
        },
        // 选择男女
        onsexChange(e){
          console.log(e);
          this.form.sex=e.values[0]
        },
        //选择日期
        handleConfirm(date){
          this.form.birthday=this.formatDate(date);
          console.log(this.form.birthday);
        },
        // 转换时间
        formatDate(date) {
          const y = date.getFullYear()
          let m = date.getMonth() + 1
          m = m < 10 ? '0' + m : m
          let d = date.getDate()
          d = d < 10 ? ('0' + d) : d
          return y + '-' + m + '-' + d
        },
        // 初始化省市区
        initCity(){
          for(var i=0;i<cityData.length;i++){
            this.areaslots[0].values.push(cityData[i].name)
          }
          for(var i=0;i<cityData[0].city.length;i++){
            this.areaslots[1].values.push(cityData[0].city[i].name)
          }
          for(var i=0;i<cityData[0].city[0].area.length;i++){
            this.areaslots[2].values.push(cityData[0].city[0].area[i])
          }
        },
        // 选择
        onareaChange(picker,values){
          var areas=[];
          var citys=[];
          var pro_indexs=0;
          var city_indexs=0;
          var areas_index=0;
          this.form.province=values[0];
          this.form.city=values[1];
          this.form.area=values[2];
          for(var i=0;i<cityData.length;i++){
            if(cityData[i].name==values[0]){
              // this.proIndex=i
              pro_indexs=i
            }
          }
          for(var i=0;i<cityData[pro_indexs].city.length;i++){
            citys.push(cityData[pro_indexs].city[i].name)
            if(cityData[pro_indexs].city[i].name==values[1]){
              city_indexs=i
            }
          }
          picker.setSlotValues(1,citys);
          for(var i=0;i<cityData[pro_indexs].city[city_indexs].area.length;i++){
            areas.push(cityData[pro_indexs].city[city_indexs].area[i])
          }
          picker.setSlotValues(2,areas);
          // console.log(this.form.province,this.form.city,this.form.area);
        },
        //取消
        cancel:function(){
          if(this.type==1){
            this.form.sex='选择';
            this.sexDialog=false;
          }else if(this.type==2){
           this.form.birthday='选择'
          }else if(this.type==3){
            this.form.province='请选择'
            this.form.city='请选择'
            this.form.area='亲选择'
            this.areaDialog=false
          }
        },
        //确认
        confirm:function(){
          if(this.type==1){
            this.sexDialog=false;
          }else if(this.type==3){
            this.areaDialog=false;
          }
        },
        // 选择关注类目
        classList(index){
          this.classBox[index].select=!this.classBox[index].select
        },
        classObject(type){
          this.classFlag=false
          if(type==1){
            this.choose=1
            for(var i=0; i<this.classBox.length;i++){
              this.classBox[i].select=false
            }
          }else{
            this.choose=2
          }
      },
        upLoad(e){
          this.upimg=[];
          var that=this;
          var files = e.target.files
          for(var i=0;i<files.length;i++){
            let reader = new FileReader()
            reader.readAsDataURL(files[i])
            reader.onloadend = function () {
              //that.upimg.push(this.result)
              that.up=true
              var image=new Image()
              image.src=this.result;
              var canvas = document.createElement("canvas");
              image.onload = function(){
                if(image.width>750){
                  canvas.width = 1000;
                  canvas.height = canvas.width * (image.height / image.width);;
                }else{
                  canvas.width = image.width;
                  canvas.height = image.height;
                }
                canvas.getContext("2d").drawImage(image, 0, 0,canvas.width,canvas.height);
                canvas.toDataURL('image/jpeg', 0.7)
                that.upimg.push(canvas.toDataURL('image/jpeg', 0.7))
              }
            }
          }
        },
        upLoads(e){
          this.upimgs=[];
          var that=this;
          var files = e.target.files
          for(var i=0;i<files.length;i++){
            let reader = new FileReader()
            reader.readAsDataURL(files[i])
            reader.onloadend = function () {
              //that.upimgs.push(this.result)
              that.ups=true
              var image=new Image()
              image.src=this.result;
              var canvas = document.createElement("canvas");
              image.onload = function(){
                if(image.width>750){
                  canvas.width = 1000;
                  canvas.height = canvas.width * (image.height / image.width);;
                }else{
                  canvas.width = image.width;
                  canvas.height = image.height;
                }
                canvas.getContext("2d").drawImage(image, 0, 0,canvas.width,canvas.height);
                canvas.toDataURL('image/jpeg', 0.7)
                that.upimgs.push(canvas.toDataURL('image/jpeg', 0.7))
              }
            }
          }
        },
        upLoadss(e){
          this.upimgss=[];
          var that=this;
          var files = e.target.files
          for(var i=0;i<files.length;i++){
            let reader = new FileReader()
            reader.readAsDataURL(files[i])
            reader.onloadend = function () {
              //that.upimgs.push(this.result)
              that.upss=true
              var image=new Image()
              image.src=this.result;
              var canvas = document.createElement("canvas");
              image.onload = function(){
                if(image.width>750){
                  canvas.width = 1000;
                  canvas.height = canvas.width * (image.height / image.width);;
                }else{
                  canvas.width = image.width;
                  canvas.height = image.height;
                }
                canvas.getContext("2d").drawImage(image, 0, 0,canvas.width,canvas.height);
                canvas.toDataURL('image/jpeg', 0.7)
                that.upimgss.push(canvas.toDataURL('image/jpeg', 0.7))
              }
            }
          }
        },
        example(type){
          this.mask=true
          if(type==1){
            console.log(this.example_img1);
            this.example_img=this.example_img1
          }else if(type==2){
            this.example_img=this.example_img2
          }else{
            this.example_img=this.example_img3
          }
      },
        //提交
        submit(){
          var pay_type=[];
          var that=this;
          var accountType=sessionStorage.qie;
          for(var i=0;i<this.classBox.length;i++){
            if(this.classBox[i].select){
              pay_type.push(this.classBox[i].id)
            }
          }
          console.log(this.upimg);
          console.log(this.upimgs);
          if(this.upimg.length==0){
            this.$toast('请上传图片1')
          }else if(this.upimgs.length==0){
            this.$toast('请上传图片2')
          }else if(this.upimgss.length==0){
            this.$toast('请上传图片3')
          }else if(this.form.sex=='选择'){
            this.$toast('请选择性别')
          }else if(this.form.birthday=='选择'){
            this.$toast('请选择生日')
          }else if(this.form.province=='请选择'||this.form.province==''){
            this.$toast('请选择省')
          }else if(this.form.city=='请选择'||this.form.city==''){
            this.$toast('请选择市')
          }else if(this.form.area=='请选择'||this.form.area==''){
            this.$toast('请选择区')
          }else if(pay_type==''){
            this.$toast('请选择关注类目')
          }else if(this.form.name==''){
            this.$toast('请填写账号')
          }else{
             userInfoSave(accountType,this.form.name,this.form.sex,this.form.birthday,this.form.province,this.form.city,this.form.area,pay_type,this.upimg,this.upimgs,this.upimgss,this.hand_id).then(response=>{
               const data=response;
               console.log(data);
               if(data.status==2){
                 this.$toast('注册成功，等待审核');
                 this.$router.push('/change');
               }else if(data.status==4){
                 this.$toast('修改成功，等待审核');
                 this.$router.push('/change');
               }
               else if(data.status==3){
                 this.$toast('添加失败');
                 this.$router.push('/change');
               }
               else if(data.status==5){
                 this.$toast('修改失败');
                 this.$router.push('/change');
               }
               else if(data.status==10){
                 this.$toast('账号重复');
               }
               else if(data.status==1){
                 this.$toast('超过最大账号注册数量');
               }
             }).catch()
          }
        }
    }
 }
</script>

<style scoped>
  .infoMessage{}
  .mainMessage-box{
    background:#fff;
    margin-bottom:30px;
    padding:0 20px;
    padding-top:20px;
  }
  .mainMessage-title{
    font-size:48px;
    color:#FD950A;
    margin-bottom:10px;
  }
  .study-list{
    display:flex;
    height:120px;
    border-bottom:1px solid #ddd;
    justify-content:space-between;
    position:relative;
  }
  .study-label{
    width:50%;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    line-height:120px;
    color:#2c2c2c;
    font-size:36px;/*px*/
  }
  .study-message{
    line-height:120px;
    font-size:26px;/*px*/
    color:#a0a0a0;
    position:relative;
    padding-right:20px;
  }
  .study-icon{
    width:13px;
    height:24px;
    position:absolute;
    right:0;
    top:48px;
    z-index:100
  }
  .mainMessage-inp{
    display:inline-block;
    width:100%;
    height:98%;
    text-align:right;
    font-size:26px;
    color:#A0A0A0;
    border:none;
    outline:none;
  }
  .classBox-mask{
    width:100%;
    height:100%;
    position:fixed;
    left:0;
    top:0;
    background:rgba(0,0,0,0.5);
    z-index:100;
  }
  .classBox{
    width:100%;
    height:800px;
    border-top-left-radius:50px;
    border-top-right-radius:50px;
    background:#fff;
    position:absolute;
    left:0;
    bottom:0;
    display:flex;
    flex-wrap:wrap;
    padding-left:20px;
    padding-top:100px;
    overflow:auto;
  }
  .classBox-list{
    padding:0 15px;
    height:50px;
    line-height:50px;
    background:#eee;
    font-size:26px;/*px*/
    color:#2c2c2c;
    margin-right:20px;
    margin-bottom:20px;
    border-radius:100px;
  }
  .classBox-close{
    width:100%;
    height:100px;
    position:absolute;
    left:0;
    top:0;
    font-size:70px;
    text-align:left;
    padding-left:20px;
  }
  .classBox-confirm{
    width:120px;
    height:50px;
    text-align:center;
    line-height:50px;
    color:#FD950A;
    border:1px solid #FD950A;
    border-radius:60px;
    font-size:26px;/*px*/
    position:absolute;
    right:30px;
    top:30px;
  }
  .classBox-list.class_active{
    background:linear-gradient(-135deg,rgba(253,149,10,1),rgba(253,80,2,1));
    color:#fff;
  }
  .prove-upBox{
    width:560px;
    height:300px;
    background:#fff;
    border-radius:10px;
    margin:0 auto;
    margin-bottom:30px;
    overflow:hidden;
    position:relative;
  }
  .prove-upBoxs{
    width:560px;
    height:300px;
    background:#fff;
    border-radius:10px;
    margin:0 auto;
    margin-bottom:30px;
    overflow:hidden;
    position:relative;
  }
  .infoMessage .proves-upBoxs{
    height:auto;
  }
  .upImg{
    width:200px;
    height:133px;
    display:block;
    margin:0 auto;
    margin-top:60px;
    margin-bottom:20px;
  }
  .upImg-upBox{
    width:100%;
    height:100%;
    display:block;
    margin-bottom:20px;
  }
  .up-text{
    text-align:center;
    font-size:28px;
    color:#a0a0a0;
  }
  .look{
    text-align:center;
    font-size:28px;
    color:#1890FF;
    margin-bottom:80px;
  }
  .look-img{
    width:80%;
    margin:0 auto;
  }
  .upMask{
    width:100%;
    height:100%;
    position:fixed;
    left:0;
    top:0;
    z-index:9;
    background:rgba(0,0,0,0.65);
    display:flex;
    justify-content:center;
    flex-direction:column;
  }
  .info_ok{
    width:660px;height:80px;
    text-align: center;
    line-height: 80px;
    border-radius: 100px;
    font-size:36px;
    color:#fff;
    font-weight:500;
    margin-left:45px;
    background:linear-gradient(315deg,rgba(253,149,10,1) 0%,rgba(253,80,2,1) 100%);
  }
</style>
