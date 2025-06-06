<template>
  <div class="module-inner">
    <div class="title-container">
      <p>报录比Top5院校</p>
      <select v-model="selectedYear">
        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
      </select>
    </div>
    <div ref="chartContainer" class="chart-container">
      <v-chart :option="chartOption" autoresize />
    </div>
  </div>
</template>

<script>
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';

// Register ECharts components
use([CanvasRenderer, BarChart, GridComponent, TooltipComponent, LegendComponent]);

export default {
  name: 'Top5View',
  components: { VChart },
  data() {
    return {
      selectedYear: '2023',
      years: ['2020', '2021', '2022', '2023'],
      dataByYear: {
        2020: {
          projects: ['清华大学', '浙江大学', '北京大学', '上海交通大学', '华中科技大学'],
          admitted: [300, 280, 270, 310, 350],
          notAdmitted: [1500, 1400, 1300, 1200, 1100],
        },
        2021: {
          projects: ['清华大学', '北京大学', '浙江大学', '上海交通大学', '华中科技大学'],
          admitted: [310, 290, 280, 320, 360],
          notAdmitted: [1400, 1300, 1200, 1100, 1000],
        },
        2022: {
          projects: ['清华大学', '北京大学', '浙江大学', '复旦大学', '南京大学'],
          admitted: [320, 302, 301, 334, 390],
          notAdmitted: [1200, 1320, 1010, 1340, 900],
        },
        2023: {
          projects: ['清华大学', '北京大学', '上海交通大学', '浙江大学', '中国科学技术大学'],
          admitted: [330, 310, 305, 340, 400],
          notAdmitted: [1100, 1250, 1150, 1300, 950],
        },
        // 2024: {
        //   projects: ['项目1', '项目2', '项目3', '项目4', '项目5'],
        //   admitted: [340, 320, 310, 350, 410],
        //   notAdmitted: [100, 120, 110, 125, 85],
        // },
      },
    };
  },
  computed: {
    chartOption() {
      const data = this.dataByYear[this.selectedYear];
      return {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        legend: { data: ['录取人数', '未录取人数'], bottom: '0.5%' },
        grid: { left: '3%', right: '4%', bottom: '10%', containLabel: true },
        xAxis: { type: 'value', name: '人数' },
        yAxis: { type: 'category', name: '院校', data: data.projects },
        series: [
          {
            name: '录取人数',
            type: 'bar',
            stack: 'total',
            label: { show: true },
            data: data.admitted,
            itemStyle: { color: '#3093d8' },
          },
          {
            name: '未录取人数',
            type: 'bar',
            stack: 'total',
            label: { show: true },
            data: data.notAdmitted,
            itemStyle: { color: '#b0d6f5' },
          },
        ],
      };
    },
  },
  mounted() {
    // Ensure chart container has dimensions before rendering
    this.$nextTick(() => {
      const container = this.$refs.chartContainer;
      if (container && container.offsetWidth > 0 && container.offsetHeight > 0) {
        // Chart will render via vue-echarts
      } else {
        // Fallback: Force resize after a short delay
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 100);
      }
    });
  },
};
</script>

<style scoped>
.module-inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1px;
  box-sizing: border-box;
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 10px;
}

.module-inner p {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.module-inner select {
  padding: 5px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  z-index: 3;
}

.chart-container {
  flex: 1;
  width: 100%;
  min-height: 50px; /* Prevent flex overflow */
  margin-top:-40px;
}
</style>