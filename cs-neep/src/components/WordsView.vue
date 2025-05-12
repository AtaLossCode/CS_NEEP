<template>
  <div ref="wordcloudChart" class="wordcloud-container"></div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-wordcloud';

export default {
  name: 'WordCloud',
  mounted() {
    this.initChart();
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.wordcloudChart);
      const colorList = [
        '#c23531', '#2f4554', '#61a0a8', '#d48265',
        '#91c7ae', '#749f83', '#ca8622', '#bda29a',
        '#6e7074', '#546570', '#c4ccd3', '#f05b72',
        '#ef5b9c', '#f47920', '#905a3d', '#fab27b',
        '#2a5caa', '#444693', '#726930', '#b2d235'
      ];
      const option = {
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: function (params) {
            return `${params.data.description}`;
          },
          textStyle: {
            fontSize: 12
          },
          extraCssText: 'box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); white-space: normal; width: 250px; padding: 8px; border-radius: 4px; background-color: #fff;',
          position: function (point, params, dom, rect, size) {
            const chartRect = this.$refs.wordcloudChart.getBoundingClientRect();
            const tooltipWidth = size.contentSize[0];
            const tooltipHeight = size.contentSize[1];
            let x = point[0];
            let y = point[1];

            // 确保 tooltip 不超出右边界
            if (x + tooltipWidth > chartRect.width) {
              x = chartRect.width - tooltipWidth - 5;
            }
            // 确保 tooltip 不超出下边界
            if (y + tooltipHeight > chartRect.height) {
              y = chartRect.height - tooltipHeight - 5;
            }
            // 确保 tooltip 不超出左边界
            if (x < 0) {
              x = 5;
            }
            // 确保 tooltip 不超出上边界
            if (y < 0) {
              y = 5;
            }

            return [x, y];
          }.bind(this)
        },
        series: [{
          type: 'wordCloud',
          data: [
            { name: '计算机科学与技术', value: 1000, description: '计算机科学与技术是一门普通高等学校本科专业，是计算机类专业的基础专业之一。该专业主要研究计算机的理论、算法、数据结构、操作系统等方面的知识，培养学生具备扎实的计算机基础理论和实践能力，能够从事计算机系统的设计、开发、维护和管理等工作。' },
            { name: '软件工程', value: 600, description: '软件工程是一门研究用工程化方法构建和维护有效的、实用的和高质量的软件的学科。该专业注重培养学生的软件开发能力，包括软件需求分析、设计、编码、测试和维护等方面的技能，使学生能够运用工程化的方法和工具进行软件项目的开发和管理。' },
            { name: '人工智能', value: 300, description: '人工智能是研究、开发用于模拟、延伸和扩展人的智能的理论、方法、技术及应用系统的一门新的技术科学。该专业聚焦于机器学习、深度学习、自然语言处理、计算机视觉等领域，培养学生掌握人工智能的核心技术和方法，能够从事人工智能系统的设计、开发和应用等工作。' },
            { name: '电子信息工程', value: 380, description: '电子信息工程专业主要研究电子电路、信号处理、通信原理、计算机技术等方面的知识，培养学生具备电子信息系统的设计、开发、测试和维护等能力，能够在电子信息领域从事相关工作。' },
            { name: '网络空间安全', value: 85, description: '网络空间安全专业致力于培养能够应对网络安全挑战的专业人才。该专业涉及网络安全技术、信息安全管理、密码学等方面的知识，使学生掌握网络空间安全的核心技术和方法，能够进行网络安全防护、安全评估和应急响应等工作。' },
            { name: '智能科学与技术', value: 65, description: '智能科学与技术专业融合了计算机科学、人工智能、控制科学等多学科知识，旨在培养具备智能系统设计、开发和应用能力的专业人才。该专业注重培养学生在智能算法、机器人技术、智能控制等方面的技能。' },
            { name: '物联网工程', value: 90, description: '物联网工程专业主要研究物联网的感知层、网络层和应用层的相关技术，包括传感器技术、无线通信技术、云计算、大数据等。培养学生具备物联网系统的设计、开发和管理能力，能够在物联网领域从事相关工作。' },
            { name: '数字媒体技术', value: 60, description: '数字媒体技术专业主要涉及计算机技术、数字图像处理、动画设计、音视频处理等方面的知识，培养学生具备数字媒体内容的创作、开发和管理能力，能够在数字媒体领域从事相关工作。' }
          ],
          sizeRange: [16, 46],
          rotationRange: [0, 0],
          shape: 'circle',
          textStyle: {
            color: (params) => {
              return colorList[params.dataIndex % colorList.length];
            }
          },
          emphasis: {
            focus: 'self',
            textStyle: {
              transform: 'scale(1.2)',
              transformOrigin: 'center'
            }
          }
        }]
      };

      this.chart.setOption(option);
    }
  }
};
</script>

<style scoped>
.wordcloud-container {
  width: 100%;
  height: 100%;
}
</style>
  
  