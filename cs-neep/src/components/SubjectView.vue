<template>
  <div class="pie-module">
    <div id="main_pie" class="pie-chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  props: {
    
    universityName: String // 新增：接收大学名称
  },
  name: "PieChart",
  data() {
    return {
      xy_data: [
        { name: '清华大学', value: 1615 },
        { name: '北京大学', value: 1203 },
        { name: '上海交通大学', value: 1021 },
        { name: '浙江大学', value: 1020 },
        { name: '西北工业大学', value: 1016 },
        { name: '北京航空航天大学', value: 900 },
        { name: '华中科技大学', value: 890 },
        { name: '哈尔滨工业大学', value: 825 },
        { name: '国防科技大学', value: 772 },
        { name: '中国科学技术大学', value: 661 },
        { name: '南京大学', value: 625 },
        { name: '电子科技大学', value: 577 },
        { name: '北京理工大学', value: 536 },
        { name: '中山大学', value: 530 },
        { name: '湖南大学', value: 510 },
        { name: '东南大学', value: 457 },
        { name: '西安交通大学', value: 453 },
        { name: '中南大学', value: 420 },
        { name: '东北大学', value: 389 },
        { name: '武汉大学', value: 389 },
        { name: '同济大学', value: 387 },
        { name: '四川大学', value: 375 },
        { name: '复旦大学', value: 362 },
        { name: '天津大学', value: 340 },
        { name: '华南理工大学', value: 324 }
      ],
      chart: null
    };
  },
  watch: {
  universityName(newName) {
    if (this.chart && newName) {
      this.highlightUniversity(newName);

    }
    else {
        // 当名称为空时，取消所有高亮
        this.chart.dispatchAction({ type: 'downplay', seriesIndex: 0 });
        this.chart.dispatchAction({ type: 'hideTip' });
      }
  }
},
  mounted() {
    this.initPie();
    window.addEventListener('resize', this.resizeChart);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resizeChart);
    this.chart && this.chart.dispose();
  },
  methods: {
    initPie() {
      this.$nextTick(() => {
        this.chart = echarts.init(document.getElementById('main_pie'));
        const option = {
          color: [
            '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622'
          ],
          title: {
            text: '各院校计算机学科实力软科排名',
            left: 'center',
            top: '1%',
            textStyle: {
              fontSize: 12 // 减小标题字体
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: (params) => {
              const university = this.xy_data.find(item => item.name === params.name);
              if (university) {
                return `
                  <div style="font-weight:bold;">${university.name}</div>
                  <div>软科评估得分: ${university.value}</div>
                  <div>排名: ${this.xy_data.indexOf(university) + 1}</div>
                `;
              }
              return params.name;
            },
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#ccc',
            borderWidth: 1,
            confine: true,
            padding: 10,
            textStyle: {
              color: '#333'
            }
            
          },
          
          series: [
            {
              stillShowZeroSum: true,
              legendHoverLink: true,
              roseType: 'area',
              name: '软科评估得分',
              radius: '120%', // 减小饼图半径
              center: ['50%', '70%'],
              label: {
                show: false,
                fontSize: 10 // 减小标签字体
              },
              type: 'pie',
              data: this.xy_data.map(item => ({
                name: item.name,
                value: item.value
              }))
            }
          ]
        };
        this.chart.setOption(option);
      });
    },
    resizeChart() {
      this.chart && this.chart.resize();
    },
    highlightUniversity(universityName) {
          // 1. 取消所有高亮
          this.chart.dispatchAction({ type: 'downplay', seriesIndex: 0 });
          
          // 2. 查找目标索引
          const dataIndex = this.xy_data.findIndex(item => item.name === universityName);
          
          // 3. 高亮目标
          if (dataIndex !== -1) {
            this.chart.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: dataIndex
            });
            this.chart.dispatchAction({
              type: 'showTip',
              seriesIndex: 0,
              dataIndex: dataIndex
            });
          }
        }
  }
};
</script>

<style scoped>
.pie-module {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden; /* 防止溢出 */
}

.pie-chart {
  width: 100%;
  height: 100%;
  min-height: 200px; /* 最小高度 */
}
</style>