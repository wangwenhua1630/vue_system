<template>
    <div class="map">
      <div class="myChart"></div>
    </div>
</template>

<script>
  import echarts from 'echarts';
  import china from 'echarts/map/js/china';
  export default {
    name: "map",
    mounted(){
      let myChart = echarts.init(document.querySelector('.map .myChart'));
      myChart.setOption({
        title: {
          text: 'iphone销量',
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          data:['iphone3','iphone4','iphone5']
        },
        visualMap: {
          min: 0,
          max: 2500,
          inRange: {
            color: ['rgba(60,66,71,0.5 )'],
            opacity:0.6
          },
          textStyle: {
            color: '#fff'
          },
          left: 'left',
          top: 'bottom',
          text: ['高','低'],           // 文本，默认为数值文本
          calculable: true
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: 'iphone3',
            type: 'map',
            mapType: 'china',
            coordinateSystem: 'geo',
            roam: false,
            label: {
              normal: {
                show: true,
                color:"#fff"
              },
              emphasis: {
                show: true,
                color:"#fff"
              }
            },
            itemStyle:{
              normal:{
                borderColor:"rgba(255, 255, 255, 0.35)",
                areaColor:"rgba(60,66,71,0.6)"
              },
              emphasis:{
                borderColor:"rgba(255, 255, 255, 0.35)",
                areaColor:"rgba(42,51,61,0.6)"
              }
            },
            data:[
              {name: '北京',value: 10 },
              {name: '天津',value: 30 },
              {name: '上海',value: 30 },
              {name: '重庆',value: 30 },
              {name: '河北',value: 30 },
              {name: '河南',value: 30 },
              {name: '云南',value: 30 },
              {name: '辽宁',value: 30 },
              {name: '黑龙江',value: 30 },
              {name: '湖南',value: 30 },
              {name: '安徽',value: 30 },
              {name: '山东',value: 30 },
              {name: '新疆',value: 30 },
              {name: '江苏',value: 30 },
              {name: '浙江',value: 30 },
              {name: '江西',value: 30 },
              {name: '湖北',value: 30 },
              {name: '广西',value: 30 },
              {name: '甘肃',value: 30 },
              {name: '山西',value: 30 },
              {name: '内蒙古',value: 30 },
              {name: '陕西',value: 30 },
              {name: '吉林',value: 30 },
              {name: '福建',value: 30 },
              {name: '贵州',value: 30 },
              {name: '广东',value: 30 },
              {name: '青海',value: 30 },
              {name: '西藏',value: 30 },
              {name: '四川',value: 30 },
              {name: '宁夏',value: 30 },
              {name: '海南',value: 30 },
              {name: '台湾',value: 30 },
              {name: '香港',value: 30 },
              {name: '澳门',value: 30 }
            ]
          },
          {
            name: 'iphone4',
            type: 'map',
            mapType: 'china',
            coordinateSystem: 'geo',
            label: {
              normal: {
                show: true,
              },
              emphasis: {
                show: true
              }
            },
            itemStyle:{
              normal:{
                borderColor:"rgba(255, 255, 255, 0.35)",
                areaColor:"rgba(60,66,71,0.6)"
              },
              emphasis:{
                borderColor:"rgba(255, 255, 255, 0.35)",
                areaColor:"rgba(42,51,61,0.6)"
              }
            },
            data:[
              {name: '北京',value: 30 },
              {name: '天津',value: 30 },
              {name: '上海',value: 30 },
              {name: '重庆',value: 30 },
              {name: '河北',value: 30 },
              {name: '安徽',value: 30 },
              {name: '新疆',value: 30 },
              {name: '浙江',value: 30 },
              {name: '江西',value: 30 },
              {name: '山西',value: 30 },
              {name: '内蒙古',value: 30 },
              {name: '吉林',value: 30 },
              {name: '福建',value: 30 },
              {name: '广东',value: 30 },
              {name: '西藏',value: 30 },
              {name: '四川',value: 30 },
              {name: '宁夏',value: 30 },
              {name: '香港',value: 30 },
              {name: '澳门',value: 30 }
            ]
          },
          {
            name: 'iphone5',
            type: 'map',
            mapType: 'china',
            coordinateSystem: 'geo',
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle:{
              normal:{
                borderColor:"rgba(255, 255, 255, 0.35)",
                areaColor:"rgba(60,66,71,0.6)"
              },
              emphasis:{
                borderColor:"rgba(255, 255, 255, 0.35)",
                areaColor:"rgba(42,51,61,0.6)"
              }
            },
            data:[
              {name: '北京',value: 30 },
              {name: '天津',value: 30 },
              {name: '上海',value: 30 },
              {name: '广东',value: 30 },
              {name: '台湾',value: 30 },
              {name: '香港',value: 30 },
              {name: '澳门',value: 30 }
            ]
          }
        ]
      })
    }
  }
</script>

<style scoped>
.myChart{
  width:100%;
  height:600px;
}
</style>
