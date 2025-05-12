<template>
  <div class="radar-module">
    <h2 class="radar-title">全国高校按地域分类对比雷达图</h2>
    <div ref="radarChart" class="radar-chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'RadarChart',
  data() {
    return {
      chart: null,
      option: {
        backgroundColor: 'white',
        color: ['rgba(63,177,227,1)', 'rgba(107,230,193,1)', 'rgba(216,130,115,1)'],
        tooltip: {
          trigger: 'item',
          borderColor: '#62FFFF',
          axisPointer: { type: 'shadow' }
        },
        legend: {
          show: true,
          bottom: '5%',
          data: ['沿海地区', '中部地区', '西部地区'],
          orient: 'horizontal',
          icon: 'circle',
          itemWidth: 14,
          itemHeight: 14,
          itemGap: 30,
          textStyle: { color: 'black', fontSize: 14 }
        },
        radar: {
          center: ['50%', '50%'],
          radius: '70%', // 减小雷达图半径以适配容器
          startAngle: 90,
          splitNumber: 5,
          indicator: [
            { name: '学科等级', max: 100 },
            { name: '教育资源', max: 100 },
            { name: '报考热度', max: 100 },
            { name: '花费', max: 100 },
            { name: '均分', max: 100 }
          ],
          axisName: {
            color: '#000',
            fontSize: 12 // 减小字体以适配
          },
          axisNameGap: 5,
          splitArea: { show: false },
          axisLine: { lineStyle: { color: '#1D6B86' } },
          splitLine: { lineStyle: { color: '#1D6B86', width: 1 } }
        },
        series: [
          {
            type: 'radar',
            symbolSize: 4,
            data: [
              {
                value: [88, 15, 92, 60, 85],
                name: '沿海地区',
                lineStyle: { width: 1, color: 'rgba(63,177,227,1)' },
                itemStyle: { color: 'rgba(63,177,227,1)', shadowColor: 'rgba(63,177,227,1)', shadowBlur: 10 },
                areaStyle: {
                  color: {
                    type: 'linear', x: 0, y: 0, x2: 1, y2: 1,
                    colorStops: [
                      { offset: 0, color: 'rgba(63,177,227,1)' },
                      { offset: 0.5, color: 'rgba(63,177,227,0.1)' },
                      { offset: 1, color: 'rgba(63,177,227,1)' }
                    ]
                  },
                  opacity: 1
                }
              },
              {
                value: [100, 65, 90, 15, 75],
                name: '中部地区',
                lineStyle: { width: 1, color: 'rgba(107,230,193,1)' },
                itemStyle: { color: 'rgba(107,230,193,1)', shadowColor: 'rgba(107,230,193,1)', shadowBlur: 10 },
                areaStyle: {
                  color: {
                    type: 'linear', x: 0, y: 0, x2: 1, y2: 1,
                    colorStops: [
                      { offset: 0, color: 'rgba(107,230,193,1)' },
                      { offset: 0.5, color: 'rgba(107,230,193,0.1)' },
                      { offset: 1, color: 'rgba(107,230,193,1)' }
                    ]
                  },
                  opacity: 1
                }
              },
              {
                value: [60, 55, 70, 80, 65],
                name: '西部地区',
                lineStyle: { width: 1, color: '#FFD1BB' },
                itemStyle: { color: '#FFD1BB', shadowColor: '#FFD1BB', shadowBlur: 10 },
                areaStyle: {
                  color: {
                    type: 'linear', x: 0, y: 0, x2: 1, y2: 1,
                    colorStops: [
                      { offset: 0, color: '#FFD1BB' },
                      { offset: 0.5, color: 'rgba(255,209,187,0.1)' },
                      { offset: 1, color: '#FFD1BB' }
                    ]
                  },
                  opacity: 1
                }
              }
            ]
          }
        ]
      }
    };
  },
  mounted() {
    this.initChart();
    window.addEventListener('resize', this.resizeChart);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resizeChart);
    this.chart && this.chart.dispose();
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.radarChart);
      this.chart.setOption(this.option);
    },
    resizeChart() {
      this.chart && this.chart.resize();
    }
  }
};
</script>

<style scoped>
.radar-module {
  width: 100%;
  height: 100%; /* 占满父容器 */
  padding: 10px; /* 减小内边距 */
  background: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden; /* 防止溢出 */
}

.radar-title {
  margin: 10px 0; /* 减小间距 */
  font-size: 20px; /* 减小字体 */
  color: black;
  text-align: center;
  font-weight: bold;
}

.radar-chart {
  width: 100%;
  height: 100%; /* 占满剩余空间 */
  min-height: 200px; /* 最小高度 */
}
</style>