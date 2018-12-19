<template>
  <div class="pie">
    <div class="myChart"></div>
  </div>
</template>

<script>
    import echarts from 'echarts';
    export default {
        name: "pie",
        mounted(){
        let myChart = echarts.init(document.querySelector('.pie .myChart'));
        myChart.setOption({
          title: {
            text: '折线图堆叠'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
          series: [
            {
              name:'访问来源',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
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
