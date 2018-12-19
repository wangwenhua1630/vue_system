!--<script src="../../../../vue-admin-master/build/webpack.base.conf.js"></script>-->
<template>
  <div style="height:100%;" class='box'>
    <el-row>
      <div class="items actives"  data-order="1" @click="clickChart('1')" style="transform: translate(35%,4%) scale(1);">
        <maps></maps>
      </div>
      <div class="items item1"  data-order="2" @click="clickChart('2')" style="transform: translate(-35%,-30.5%) scale(0.31);">
        <v-line></v-line>
      </div>
      <div class="items item2"  data-order="3" @click="clickChart('3')" style="transform: translate(-35%,4.5%) scale(0.31);">
        <bar></bar>
      </div>
      <div class="items item3"  data-order="4" @click="clickChart('4')" style="transform: translate(-35%,38.5%) scale(0.31);">
        <pie></pie>
      </div>
    </el-row>
    <div>{{userInfo}}</div>
  </div>
</template>

<script>
  import maps from '../map/map'
  import line from '../line/line'
  import bar from '../bar/bar'
  import pie from '../pie/pie'
    export default {
      data(){
        return{
          items: []
        }
      },
      mounted() {
        this.init()
      },
      methods:{
        //====初始化添加内容
        init(){
          this.items = document.querySelectorAll('.box .items');
        },
        //====点击事件
        clickChart(index){
          let activeItem = document.querySelector('.box .actives');
          let activeIndex = activeItem.dataset.order;
          let clickItem=this.items[index-1];
          if(activeIndex==index){
            return
          }
          activeItem.classList.remove('actives');
          clickItem.classList.add('actives');
          this.style(activeItem,clickItem)
        },
      //  ========样式更换事件
        style(activeItem,clickItem){
          let transform1=activeItem.style.transform;
          let transform2=clickItem.style.transform;
          clickItem.style.transform=transform1;
          activeItem.style.transform=transform2;
        }
      },
      components:{
        maps,
        'v-line': line,
        bar,
        pie
      }
    }
</script>

<style scoped>
  .box{
    position:relative;
    height:100%;

  }
  .items{
    width:70%;
    height:600px;
    transform: translate(33%,4%);
    background:#fff;
    position :absolute;
    transition: all 0.8s ;
    border:1px solid #e7e7eb;
  }
  .el-breadcrumb{
    margin-bottom:0px;
  }
</style>
