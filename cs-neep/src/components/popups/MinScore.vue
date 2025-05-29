<template>
  <div class="dual-chart-container">
    
    <div class="chart-wrapper">
      <div ref="scatterChart" style="width: 100%; height: 500px;"></div>
      <div v-if="scatterError" class="error-message">{{ scatterError }}</div>
    </div>
    <div class="chart-wrapper">
      <div ref="boxplotChart" style="width: 100%; height: 500px;"></div>
      <div v-if="boxplotError" class="error-message">{{ boxplotError }}</div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts/extension/dataTool'; // 导入箱线图数据处理工具

export default {
  name: 'DualChartComponent',
  data() {
    return {
      scatterChart: null,
      boxplotChart: null,
      scatterError: null,
      boxplotError: null,
      // 散点图数据
      scatterData: [
        [[2, 80, 120, '计算机', 'blue'], [2, 90, 10, '计算机', 'blue'], [2, 75, 20, '计算机', 'blue']],
        [[4, 60, 90, '软件A', 'green'], [4, 70, 85, '软件B', 'green'], [4, 55, 80, '软件C', 'green']],
        [[6, 90, 130, 'AI-A', 'purple'], [6, 85, 120, 'AI-B', 'purple'], [6, 80, 110, 'AI-C', 'purple']],
        [[8, 70, 100, '网安A', 'orange'], [8, 65, 95, '网安B', 'orange'], [8, 60, 90, '网安C', 'orange']]
      ],
      // 散点图颜色映射
      scatterColorMap: {
        blue: 'rgba(59, 130, 246, 0.8)',
        green: 'rgba(34, 197, 94, 0.8)',
        purple: 'rgba(168, 85, 247, 0.8)',
        orange: 'rgba(245, 158, 11, 0.8)'
      },
      // 箱线图数据
      boxplotData: [
        [340, 354, 367, 375, 386],
        [310, 325, 345, 367, 373],
        [324, 334, 345, 355, 366],
        [332, 345, 350, 360, 370],
        [344, 359, 370, 375, 388],
        [400, 338, 348, 358, 368]
      ],
      boxplotNames: ['2020', '2021', '2022', '2023', '2024', '2025'],
      boxplotOutliers: [
        [0, 17, "异常"],
        [3, 75, "异常"]
      ]
    };
  },
  mounted() {
    try {
      this.initScatterChart();
      this.initBoxplotChart();
      window.addEventListener('resize', this.handleResize);
    } catch (e) {
      this.scatterError = `初始化散点图失败: ${e.message}`;
      console.error(e);
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    if (this.scatterChart) this.scatterChart.dispose();
    if (this.boxplotChart) this.boxplotChart.dispose();
  },
  methods: {
    initScatterChart() {
      const series = this.scatterData.map((group, index) => {
        const indicatorName = ['计科', '软件工程', '人工智能', '网络空间安全'][index];
        const colorKey = group[0][4];
        
        return {
          name: indicatorName,
          data: group,
          type: 'scatter',
          symbolSize: data => Math.sqrt(data[2]) * 3,
          emphasis: {
            label: {
              show: true,
              formatter: param => `${param.data[3]} (${param.data[2]})`,
              position: 'top',
              textStyle: { fontSize: 12 }
            }
          },
          itemStyle: {
            color: new echarts.graphic.RadialGradient(
              0.4, 0.3, 1,
              [
                { offset: 0, color: this.getLighterColor(this.scatterColorMap[colorKey]) },
                { offset: 1, color: this.scatterColorMap[colorKey] }
              ]
            ),
            borderWidth: 1,
            borderColor: '#fff'
          },
          symbol: ['circle', 'circle', 'circle', 'circle'][index % 4]
        };
      });

      const scatterOption = {
          title: {
          text: '学科对比分析',
          
          left: 'center',
          textStyle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#333'
          }},
        // backgroundColor: '#f8f9fa',
        legend: {
          top: 30,
          left: 'center',
          data: ['计科', '软件工程', '人工智能', '网络空间安全'],
          itemWidth: 12,
          itemHeight: 12
        },
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            return `
              <div style="font-weight: bold; color: ${params.color}">${params.seriesName}</div>
              
              <div>人数: ${params.data[2]}</div>
              
            `;
          }
        },
        xAxis: {
          name: '',
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#eee'
            }
          },
          // min: 0,
          // max: 13,
          
          axisLine: {
            lineStyle: { color: '#999' },
            
          },
            axisLabel: {
            show: false // 隐藏标签
          },
            axisTick: {
            show: false // 隐藏刻度
          }
        },
        yAxis: {
          name: '分数',
          type: 'value',
          scale: true,
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#eee'
            }
          },
          min: 0,
          max: 100,
          axisLine: {
            lineStyle: { color: '#999' }
          }
        },
        series: series,
        grid: {
          left: '5%',
          right: '5%',
          bottom: '10%',
          containLabel: true
        }
      };

      this.scatterChart = echarts.init(this.$refs.scatterChart);
      this.scatterChart.setOption(scatterOption);
    },
    
    initBoxplotChart() {
      // 处理箱线图数据
      const processedBoxplotData = echarts.dataTool.prepareBoxplotData(this.boxplotData);
      
      const boxplotOption = {
          title: {
          text: '2020-2025分数线箱线图',
          left: 'center',
          textStyle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#333'
          }
        },
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '50',
          right: '20',
          top: '50',
          bottom: '40',
        },
        xAxis: {
          type: 'category',
          data: this.boxplotNames,
          axisLabel: {
            color: '#777777',
            textStyle: {
              fontSize: '13'
            },
            rotate: 45, // 旋转标签避免重叠
            interval: 0 // 强制显示所有标签
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#333333',
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          name: '分数（分）',
          nameTextStyle: {
            color: '#777777',
            fontSize: 13,
            padding: [0, 0, 0, 60]
          },
          axisLabel: {
            color: '#777777',
            textStyle: {
              fontSize: '13'
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#333333',
            }
          },
          splitLine: {
            lineStyle: {
              color: '#D1D1D1',
            },
          },
          min:200,
          max:450
        },
        series: [
          {
            name: '箱线图',
            type: 'boxplot',
            data: processedBoxplotData.boxData,
            itemStyle: {
              normal: {
                borderColor: '#4B96F3',
                borderWidth: 2,
                color: 'rgba(75, 150, 243, 0.1)',
              }
            },
            tooltip: {
              formatter: function(param) {
                return [
                  `${param.name}:`,
                  '最高分: ' + param.data[5] + ' 分',
                  '中位数: ' + param.data[3] + ' 分',
                  '最低分: ' + param.data[1] + ' 分'
                ].join('<br/>')
              }
            }
          },
          {
            // name: '异常值',
            // type: 'scatter',
            // symbolSize: 10,
            // data: this.boxplotOutliers,
            // itemStyle: {
            //   normal: {
            //     color: 'rgba(75,150,243,.7)',
            //   }
            // },
            label: {
              show: true,
              position: 'top',
              formatter: function(param) {
                return param.data[2];
              }
            },
          }
        ]
      };

      this.boxplotChart = echarts.init(this.$refs.boxplotChart);
      this.boxplotChart.setOption(boxplotOption);
    },
    
    handleResize() {
      if (this.scatterChart) this.scatterChart.resize();
      if (this.boxplotChart) this.boxplotChart.resize();
    },
    
    getLighterColor(color) {
      const rgba = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),\s*(\d+\.?\d*)\)/);
      if (rgba) {
        const r = parseInt(rgba[1]);
        const g = parseInt(rgba[2]);
        const b = parseInt(rgba[3]);
        const a = rgba[4];
        
        const lighterR = Math.min(r + 30, 255);
        const lighterG = Math.min(g + 30, 255);
        const lighterB = Math.min(b + 30, 255);
        
        return `rgba(${lighterR}, ${lighterG}, ${lighterB}, ${a})`;
      }
      return color;
    }
  }
};
</script>

<style scoped>
.dual-chart-container {
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
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.error-message {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .dual-chart-container {
    flex-direction: column;
    gap: 30px;
  }
}
</style>

