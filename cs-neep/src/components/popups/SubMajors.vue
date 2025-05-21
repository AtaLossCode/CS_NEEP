<template>
  <div class="subdivided-majors">
    <h2>细分专业</h2>
    <!-- 表格 -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>开设专业</th>
            <th>第四轮学科评估等级</th>
            <th>2024年录取人数</th>
            <th>2024年复试分数线</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>计算机科学与技术</td>
            <td>B+</td>
            <td>26</td>
            <td>310</td>
          </tr>
          <tr>
            <td>人工智能</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>软件工程</td>
            <td>A-</td>
            <td>14</td>
            <td>310</td>
          </tr>
          <tr>
            <td>网络安全</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>招生比例</p>
    <!-- 图表容器 -->
    <div class="charts-container">
      <div class="chart" v-for="year in [2020, 2021, 2022, 2023, 2024]" :key="year">
        <div :id="'chart-' + year" class="chart-box"></div>
        <h3>{{ year }}年</h3>
        <!-- 图例 -->
        <!-- <div class="legend">
          <div v-for="(item, index) in getChartData(year)" :key="index" class="legend-item">
            <span class="color-box" :style="{ backgroundColor: item.color }"></span>
            <span>{{ item.name }}</span>
          </div>
        </div> -->
      </div>
    </div>
    
    <!-- ✅ 公共图例 -->
    <div class="legend legend-horizontal">
      <div v-for="(item, index) in getChartData(2024)" :key="index" class="legend-item">
        <span class="color-box" :style="{ backgroundColor: item.color }"></span>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

// 模拟数据：每年各专业的比例（百分比，总和为100）
const chartData = {
  2020: [
    { name: '计算机科学与技术', value: 41, color: '#1E4BC0' },
    { name: '人工智能', value: 25, color: '#537BF7' },
    { name: '软件工程', value: 20, color: '#93AFF9' },
    { name: '网络安全', value: 15, color: '#C7D3FB' },
  ],
  2021: [
    { name: '计算机科学与技术', value: 27, color: '#1E4BC0' },
    { name: '人工智能', value: 4, color: '#537BF7' },
    { name: '软件工程', value: 14, color: '#93AFF9' },
    { name: '网络安全', value: 15, color: '#C7D3FB' },
  ],
  2022: [
    { name: '计算机科学与技术', value: 18, color: '#1E4BC0' },
    { name: '人工智能', value: 7, color: '#537BF7' },
    { name: '软件工程', value: 14, color: '#93AFF9' },
    { name: '网络安全', value: 15, color: '#C7D3FB' },
  ],
  2023: [
    { name: '计算机科学与技术', value: 20, color: '#1E4BC0' },
    { name: '人工智能', value: 40, color: '#537BF7' },
    { name: '软件工程', value: 15, color: '#93AFF9' },
    { name: '网络安全', value: 15, color: '#C7D3FB' },
  ],
  2024: [
    { name: '计算机科学与技术', value: 26, color: '#1E4BC0' },
    { name: '人工智能', value: 45, color: '#537BF7' },
    { name: '软件工程', value: 14, color: '#93AFF9' },
    { name: '网络安全', value: 15, color: '#C7D3FB' },
  ],
};

// 获取图表数据
const getChartData = (year) => chartData[year];

// 初始化图表
const charts = {};
onMounted(() => {
  [2020, 2021, 2022, 2023, 2024].forEach((year) => {
    const chartDom = document.getElementById(`chart-${year}`);
    if (!chartDom) {
      console.warn(`Chart DOM for year ${year} not found`);
      return;
    }

    charts[year] = echarts.init(chartDom);
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
        position: 'top'
      },
      // legend: {
      //   top: '5%',
      //   left: 'center',
      //   show: false, // Hide default legend since custom legend is used
      // },
      series: [
        {
          name: '招生比例',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: getChartData(year).map((item) => ({
            name: item.name,
            value: item.value,
            itemStyle: { color: item.color },
          })),
        },
      ],
    };
    charts[year].setOption(option);

    // Handle window resize
    const resizeHandler = () => charts[year].resize();
    window.addEventListener('resize', resizeHandler);
    charts[year].resizeHandler = resizeHandler;
  });
});

// 销毁图表
onUnmounted(() => {
  [2020, 2021, 2022, 2023, 2024].forEach((year) => {
    if (charts[year]) {
      window.removeEventListener('resize', charts[year].resizeHandler);
      charts[year].dispose();
    }
  });
});
</script>

<style scoped>
.subdivided-majors {
  font-family: Arial, sans-serif;
}

/* 表格样式 */
.table-container {
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  font-size: 14px;
  color: #333;
}

th {
  background-color: #e3e9ff;
  font-weight: bold;
}

/* 图表容器 */
.charts-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.chart {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart h3 {
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
}

.chart-box {
  width: 170px;
  height: 170px;
}

/* 图例样式 */
.legend-horizontal {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 10px;
}
/* .legend {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.legend-item {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #666;
  margin: 2px 0;
} */

.color-box {
  width: 12px;
  height: 12px;
  display: inline-block;
  margin-right: 5px;
}
</style>