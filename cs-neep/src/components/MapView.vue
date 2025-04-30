<template>
  <div class="chart-container">
    <div ref="chartDom" class="chart"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import geoJson from '../assets/china.json';

export default {
  setup() {
    const chartDom = ref(null);

    onMounted(() => {
      console.log('chartDom:', chartDom.value);
      if (!chartDom.value) {
        console.error('chartDom is not initialized');
        return;
      }

      const chart = echarts.init(chartDom.value);

      echarts.registerMap('china', geoJson);

      window.addEventListener('resize', chart.resize);

      const option = {
        tooltip: {
          trigger: 'item', // 触发类型，'item' 表示鼠标悬浮在地图区域时触发
          formatter: '{b}: {c}', // 格式化显示内容，{b} 是区域名称，{c} 是对应的值
        },
        visualMap: {
          min: 0,
          max: 30000, // 根据数据调整范围
          inRange: {
            color: ['#e6f7ff', '#0050b3']
          },
          calculable: true,
        },
        series: [{
          type: 'map',
          map: 'china',
          zoom: 1.2,
          layoutCenter: ['50%', '70%'],
          layoutSize: '114%',
          selectedMode: false,
          data: [
            { name: '北京市', value: 30000 }, // 北京大学、清华大学
            { name: '天津市', value: 15000 }, // 南开大学、天津大学
            { name: '上海市', value: 25000 }, // 复旦大学、上海交通大学
            { name: '重庆市', value: 12000 }, // 重庆大学
            { name: '辽宁省', value: 14000 }, // 大连理工大学、东北大学
            { name: '吉林省', value: 10000 }, // 吉林大学
            { name: '黑龙江省', value: 9000 }, // 哈尔滨工业大学、哈尔滨工程大学
            { name: '江苏省', value: 20000 }, // 南京大学、东南大学
            { name: '浙江省', value: 18000 }, // 浙江大学
            { name: '安徽省', value: 12000 }, // 中国科学技术大学
            { name: '福建省', value: 10000 }, // 厦门大学
            { name: '山东省', value: 15000 }, // 山东大学
            { name: '湖北省', value: 20000 }, // 武汉大学、华中科技大学
            { name: '湖南省', value: 15000 }, // 中南大学、湖南大学
            { name: '广东省', value: 22000 }, // 中山大学、华南理工大学
            { name: '四川省', value: 18000 }, // 四川大学、电子科技大学
            { name: '陕西省', value: 20000 }, // 西安交通大学、西北工业大学
            { name: '甘肃省', value: 5000 },  // 兰州大学
          ],
          itemStyle: {
            areaColor: '#e0f3ff', // 默认区域颜色
            borderColor: 'rgba(24,144,255,1)',
            borderWidth: 1.5,
            shadowColor: 'rgba(0,0,0,0.1)',
            shadowBlur: 2,
            shadowOffsetY: 2
          },
          emphasis: {
            itemStyle: {
              areaColor: null, // 鼠标悬浮时的颜色
              borderColor: 'rgba(255,255,255,0.8)',
              borderWidth: 2
            }
          },
          select: {
            itemStyle: {
              areaColor: null, // 点击选中时维持原色
              borderColor: 'rgba(255,255,255,0.8)', // 可选，边框颜色
              borderWidth: 2 // 可选，边框宽度
            }
          }
        }]
      };

      chart.setOption(option);
    });

    return {
      chartDom
    };
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.chart {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>