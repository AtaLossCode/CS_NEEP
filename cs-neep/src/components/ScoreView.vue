<template>
  <div class="module-inner">
    <!-- <h2>Score 模块</h2> -->
    <p>历年A、B区国家分数线与报录比</p>
    <div class="chart-container">
      <v-chart :option="chartOption" autoresize />
    </div>
  </div>
</template>

<script>
// Ensure dependencies are installed: npm install echarts vue-echarts
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  AxisPointerComponent,
} from 'echarts/components';

// Register ECharts components
use([
  CanvasRenderer,
  BarChart,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  AxisPointerComponent,
]);

export default {
  name: 'ScoreView',
  components: {
    VChart,
  },
  data() {
    return {
      chartOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
        },
        legend: {
          data: ['A区国家线', 'B区国家线', '全国报录比'],
          bottom: '3%',
        },
        grid: {
          left: '10%',
          right: '10%',
          bottom: '15%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          name: '年份',
          data: ['2020', '2021', '2022', '2023', '2024'],
        },
        yAxis: [
          {
            type: 'value',
            name: '分数',
            position: 'left',
            min: 220,
            max: 280,
          },
          {
            type: 'value',
            name: '报录比',
            position: 'right',
            min: 0,
            max: 0.2,
          },
        ],
        series: [
          {
            name: 'A区国家线',
            type: 'bar',
            data: [264, 263, 273, 273, 273],
            yAxisIndex: 0,
            itemStyle: {
              color: '#3093d8',
            },
          },
          {
            name: 'B区国家线',
            type: 'bar',
            data: [254, 253, 263, 263, 263],
            yAxisIndex: 0,
            itemStyle: {
              color: '#b0d6f5',
            },
          },
          {
            name: '全国报录比',
            type: 'line',
            data: [0.1, 0.12, 0.15, 0.13, 0.14],
            yAxisIndex: 1,
            itemStyle: {
              color: '#91CC75',
            },
            lineStyle: {
              width: 2,
            },
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
.module-inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 16px;
  color: #333;
  padding: 5px;
  box-sizing: border-box;
}

/* .module-inner h2 {
  margin: 0 0 5px 0;
  font-size: 20px;
} */

.module-inner p {
  margin: 5px 0 0 0;
  font-size: 18px;
  font-weight: bold;
}

.chart-container {
  flex: 1;
  width: 100%;
  height: 100%;
  margin-top: -40px;
}
</style>