<!-- <template>
  <div class="boxplot-container">
    <div id="main-boxplot" :style="{ width: chartWidth, height: chartHeight }"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts/extension/dataTool'; // 确保引入数据工具扩展

export default {
  name: 'BoxplotChart',
  props: {
    // 可选props，支持外部传入尺寸和数据
    width: { type: String, default: '600px' },
    height: { type: String, default: '400px' },
    sourceData: {
      type: Array,
      default: () => [
        [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
        [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 810, 880, 880, 830, 800, 790, 760, 800],
        [880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 850, 870, 840, 840, 850, 840, 840, 840],
        [890, 810, 810, 820, 800, 770, 760, 740, 750, 760, 910, 920, 890, 860, 880, 720, 840, 850, 850, 780]
      ]
    }
  },
  data() {
    return {
      chart: null,
      chartWidth: this.width,
      chartHeight: this.height,
      processedData: null
    };
  },
  watch: {
    // 监听props变化并重新渲染图表
    sourceData(newVal) {
      this.initChartData(newVal);
    },
    width(newVal) {
      this.chartWidth = newVal;
      this.resizeChart();
    },
    height(newVal) {
      this.chartHeight = newVal;
      this.resizeChart();
    }
  },
  mounted() {
    this.initChart();
    this.initChartData(this.sourceData);
    window.addEventListener('resize', this.resizeChart);
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.dispose();
      window.removeEventListener('resize', this.resizeChart);
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('main-boxplot'));
      this.setBaseOptions();
    },

    initChartData(data) {
      this.processedData = echarts.dataTool.prepareBoxplotData(data);
      this.updateChartOptions();
    },

    setBaseOptions() {
        
      this.chart.setOption({
        title: [
          {
            text: '五川大学/分数线',
            left: ''
          },
        //   {
        //     text: 'upper: Q3 + 1.5 * IQR \nlower: Q1 - 1.5 * IQR',
        //     borderColor: '#999',
        //     borderWidth: 1,
        //     textStyle: { fontSize: 12 },
        //     left: '10%',
        //     top: '90%'
        //   }
        ],
        tooltip: {
          trigger: 'item',
          axisPointer: { type: 'shadow' }
        },
        grid: {
          left: '10%',
          right: '10%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          axisLabel: { formatter: '' }
        },
        yAxis: {
          type: 'value',
          name: '',
          splitArea: { show: true }
        }
      });
    },

    updateChartOptions() {
      if (!this.processedData) return;
      
      this.chart.setOption({
        xAxis: { data: this.processedData.axisData },
        series: [
          {
            type: 'boxplot',
            data: this.processedData.boxData,
            tooltip: {
              formatter: (param) => [
                `实验 ${param.name}:`,
                `上限: ${param.data[5]}`,
                `上四分位数: ${param.data[4]}`,
                `中位数: ${param.data[3]}`,
                `下四分位数: ${param.data[2]}`,
                `下限: ${param.data[1]}`
              ].join('<br/>')
            }
          },
          {
            name: 'outlier',
            type: 'scatter',
            data: this.processedData.outliers
          }
        ]
      });
    },

    resizeChart() {
      this.chart?.resize();
    }
  }
};
</script>

<style scoped>
.boxplot-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>


 -->

 <template>
  <div class="boxplot-container">
    <div class="chart-wrapper">
      <div id="main-boxplot" :style="{ width: chartWidth, height: chartHeight }"></div>
    </div>
    <div class="chart-wrapper">
      <div id="comparison-boxplot" :style="{ width: chartWidth, height: chartHeight }"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts/extension/dataTool';

export default {
  name: 'BoxplotChart',
  props: {
    width: { type: String, default: '400px' },
    height: { type: String, default: '300px' },
    sourceData: {
      type: Array,
      default: () => [
        [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
        [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 810, 880, 880, 830, 800, 790, 760, 800],
        [880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 850, 870, 840, 840, 850, 840, 840, 840],
        [890, 810, 810, 820, 800, 770, 760, 740, 750, 760, 910, 920, 890, 860, 880, 720, 840, 850, 850, 780]
      ]
    },
    comparisonData: {
      type: Array,
      default: () => [
        [750, 700, 800, 970, 830, 750, 850, 880, 880, 780, 900, 880, 830, 550, 660, 710, 900, 900, 860, 860],
        [860, 840, 860, 840, 780, 700, 750, 780, 800, 740, 730, 690, 710, 780, 780, 730, 700, 690, 660, 700],
        [780, 780, 780, 760, 620, 620, 520, 760, 870, 850, 780, 810, 750, 770, 740, 740, 750, 740, 740, 740],
        [790, 710, 710, 720, 700, 670, 660, 640, 650, 660, 810, 820, 790, 760, 780, 620, 740, 750, 750, 680],
        [790, 710, 710, 720, 700, 670, 660, 640, 650, 660, 810, 820, 790, 760, 780, 620, 740, 750, 750, 680]
      ]
    },
        mainChartLabels: { 
      type: Array,
      default: () => ['计算机科学与技术', '人工智能', '软件工程', '电子信息工程']
    },
    comparisonChartLabels: { 
      type: Array,
      default: () => ['2020年', '2021年', '2022年', '2023年', '2024年']
    }
  },
  
  data() {
    return {
      chart: null,
      comparisonChart: null,
      chartWidth: this.width,
      chartHeight: this.height,
      processedData: null,
      comparisonProcessedData: null
    };
  },
  watch: {
    sourceData(newVal) {
      this.initChartData(newVal);
    },
    comparisonData(newVal) {
      this.initComparisonChartData(newVal);
    },
    width(newVal) {
      this.chartWidth = newVal;
      this.resizeCharts();
    },
    height(newVal) {
      this.chartHeight = newVal;
      this.resizeCharts();
    }
  },
  mounted() {
    this.initMainChart();
    this.initComparisonChart();
    this.initChartData(this.sourceData);
    this.initComparisonChartData(this.comparisonData);
    window.addEventListener('resize', this.resizeCharts);
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
    if (this.comparisonChart) {
      this.comparisonChart.dispose();
    }
    window.removeEventListener('resize', this.resizeCharts);
  },
  methods: {
    initMainChart() {
      this.chart = echarts.init(document.getElementById('main-boxplot'));
      this.setBaseOptions(this.chart, '四川大学/分数线');
    },

    initComparisonChart() {
      this.comparisonChart = echarts.init(document.getElementById('comparison-boxplot'));
      this.setBaseOptions(this.comparisonChart, '2020-2024分数线箱线图');
    },

    initChartData(data) {
      this.processedData = echarts.dataTool.prepareBoxplotData(data);
      this.updateChartOptions(this.chart, this.processedData, '四川大学');
    },

    initComparisonChartData(data) {
      this.comparisonProcessedData = echarts.dataTool.prepareBoxplotData(data);
      this.updateChartOptions(this.comparisonChart, this.comparisonProcessedData, '对比院校');
    },

    setBaseOptions(chartInstance, titleText) {
      chartInstance.setOption({
        title: {
          text: titleText,
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          axisPointer: { type: 'shadow' }
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.mainChartLabels,
          axisLabel: { 
            // formatter: 'data',             
            rotate: 45, // 标签旋转角度
            interval: 0, // 强制显示所有标签
            color: '#333',
            fontSize: 12}
        },
        yAxis: {
          type: 'value',
          name: '分数',
          splitArea: { show: true }
        }
      });
    },

    updateChartOptions(chartInstance, processedData, seriesName) {
      if (!processedData) return;
      
      chartInstance.setOption({
        xAxis: { data: processedData.axisData },
        series: [
          {
            name: seriesName,
            type: 'boxplot',
            data: processedData.boxData,
            tooltip: {
              formatter: (param) => [
                `${seriesName} ${param.name}:`,
                `最高分: ${param.data[5]}`,
                // `上四分位数: ${param.data[4]}`,
                `中位数: ${param.data[3]}`,
                // `下四分位数: ${param.data[2]}`,
                `最低分: ${param.data[1]}`
              ].join('<br/>')
            }
          },
          // {
          //   name: '异常值',
          //   type: 'scatter',
          //   data: processedData.outliers
          //}
        ]
      });
    },

    resizeCharts() {
      this.chart?.resize();
      this.comparisonChart?.resize();
    }
  }
};
</script>

<style scoped>
.boxplot-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
}

.chart-wrapper {
  flex: 1;
  min-width: 300px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .boxplot-container {
    flex-direction: column;
    gap: 30px;
  }
}
</style>