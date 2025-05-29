<template>
  <div class="chart-container">
    <div ref="chartDom" class="chart"></div>
    <a-card
      v-if="showMenu"
      class="university-menu"
      :style="menuPosition"
      :title="`${selectedProvince} 985 院校`"
      ref="menuDom"
    >
      <a-list
        :data-source="selectedUniversities"
        :locale="{ emptyText: '该省份没有985院校' }"
      >
        <template #renderItem="{ item }">
          <a-list-item class="university-item" @click="handleUniversityClick(item)">
            <StarOutlined />
            {{ item.name }}
          </a-list-item>
        </template>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import * as echarts from 'echarts';
import geoJson from '../assets/china.json';
import { Card, List } from 'ant-design-vue';
import { StarOutlined } from '@ant-design/icons-vue';
import 'ant-design-vue/dist/reset.css';

export default {
  components: {
    ACard: Card,
    AList: List,
    AListItem: List.Item,
    StarOutlined,
  },
  setup() {
    const chartDom = ref(null);
    const menuDom = ref(null);
    const showMenu = ref(false);
    const menuPosition = ref({ top: '0px', left: '0px' });
    const selectedProvince = ref('');
    const selectedUniversities = ref([]);
    const router = useRouter();

    // Define 985 universities with their provinces
    const universities = [
      { name: '北京大学', province: '北京市', coords: [116.31088, 39.99281] },
      { name: '清华大学', province: '北京市', coords: [116.326836, 40.00366] },
      { name: '复旦大学', province: '上海市', coords: [121.503971, 31.29686] },
      { name: '上海交通大学', province: '上海市', coords: [121.445991, 31.028512] },
      { name: '中国科学技术大学', province: '安徽省', coords: [117.263033, 31.838803] },
      { name: '南京大学', province: '江苏省', coords: [118.781696, 32.050303] },
      { name: '西安交通大学', province: '陕西省', coords: [108.984598, 34.246033] },
      { name: '浙江大学', province: '浙江省', coords: [120.08083, 30.302959] },
      { name: '哈尔滨工业大学', province: '黑龙江省', coords: [126.632628, 45.743215] },
      { name: '南开大学', province: '天津市', coords: [117.156255, 39.105977] },
      { name: '天津大学', province: '天津市', coords: [117.175606, 39.114218] },
      { name: '东南大学', province: '江苏省', coords: [118.830289, 31.887157] },
      { name: '华中科技大学', province: '湖北省', coords: [114.414724, 30.515977] },
      { name: '武汉大学', province: '湖北省', coords: [114.365248, 30.53786] },
      { name: '厦门大学', province: '福建省', coords: [118.102555, 24.436341] },
      { name: '山东大学', province: '山东省', coords: [117.057769, 36.679135] },
      { name: '湖南大学', province: '湖南省', coords: [112.944991, 28.178328] },
      { name: '中国海洋大学', province: '山东省', coords: [120.499205, 36.16126] },
      { name: '中南大学', province: '湖南省', coords: [112.936703, 28.160166] },
      { name: '吉林大学', province: '吉林省', coords: [125.289795, 43.824175] },
      { name: '北京理工大学', province: '北京市', coords: [116.321567, 39.959693] },
      { name: '大连理工大学', province: '辽宁省', coords: [121.525047, 38.883616] },
      { name: '北京航空航天大学', province: '北京市', coords: [116.347313, 39.981771] },
      { name: '重庆大学', province: '重庆市', coords: [106.45952, 29.567283] },
      { name: '电子科技大学', province: '四川省', coords: [104.102289, 30.674422] },
      { name: '四川大学', province: '四川省', coords: [104.083748, 30.630869] },
      { name: '华南理工大学', province: '广东省', coords: [113.432504, 23.173239] },
      { name: '中山大学', province: '广东省', coords: [113.391786, 23.067691] },
      { name: '兰州大学', province: '甘肃省', coords: [103.861929, 36.046187] },
      { name: '西北工业大学', province: '陕西省', coords: [108.915419, 34.243687] },
      { name: '东北大学', province: '辽宁省', coords: [123.41842, 41.76529] },
      { name: '同济大学', province: '上海市', coords: [121.50781, 31.282553] },
      { name: '北京师范大学', province: '北京市', coords: [116.365798, 39.961576] },
      { name: '中国人民大学', province: '北京市', coords: [116.313361, 39.970561] },
      { name: '中国农业大学', province: '北京市', coords: [116.281538, 40.026337] },
      { name: '国防科技大学', province: '湖南省', coords: [112.985921, 28.164312] },
      { name: '中央民族大学', province: '北京市', coords: [116.320486, 39.950567] },
      { name: '西北农林科技大学', province: '陕西省', coords: [108.063431, 34.263566] },
    ];

    // 一组易区分的颜色
    const colors = [
      '#f5222d', '#fa541c', '#fa8c16', '#fadb14',
      '#52c41a', '#13c2c2', '#2f54eb', '#722ed1',
      '#eb2f96', '#a0d911', '#f0f', '#1890ff',
      '#faad14', '#13c2c2', '#f5222d', '#fa541c'
    ];

    const universityRoutes = {
      '四川大学': 'scu',
      '电子科技大学': 'uestc',
      '清华大学': 'thu',
      '北京大学': 'pku',
      '复旦大学': 'fudan',
      '上海交通大学': 'sjtu',
      '东南大学': 'seu',
      '东华大学': 'dhu',
      '上海外国语大学': 'sisu',
      '武汉理工大学': 'wut',
      '华中师范大学': 'ccnu',
      '吉林大学': 'jlu',
      '同济大学': 'tongji',
      '西北农林科技大学': 'nwafu',
      '东北师范大学': 'nenu',
      '上海财经大学': 'sufe',
      '中国矿业大学': 'cumt',
      '西南大学': 'swu',
      '山东大学': 'sdu',
      '兰州大学': 'lzu',
      '天津大学': 'tju',
      '东北大学': 'neu',
      '华东师范大学': 'ecnu',
      '武汉大学': 'whu',
      '重庆大学': 'cqu',
      '北京外国语大学': 'bfsu',
      '中国农业大学': 'cau',
      '南开大学': 'nku',
      '浙江大学': 'zju',
      '中南大学': 'csu',
      '中山大学': 'sysu',
      '西安交通大学': 'xjtu',
      '中国海洋大学': 'ouc',
      '北京师范大学': 'bnu',
      '大连理工大学': 'dut',
      '南京大学': 'nju',
      '厦门大学': 'xmu',
      '华中科技大学': 'hust',
      '湖南大学': 'hnu',
      '华南理工大学': 'scut',
      '北京理工大学': 'bit',
      '北京航空航天大学': 'buaa',
      '哈尔滨工业大学': 'hit',
      '西北工业大学': 'npu',
      '中央民族大学': 'muc',
      '中国科学技术大学': 'ustc',
      '北京科技大学': 'ustb',
      '中央财经大学': 'cufe',
      '对外经济贸易大学': 'uibe',
      '东北林业大学': 'nefu',
      '华东理工大学': 'ecust',
      '河海大学': 'hh',
      '江南大学': 'jiangnan',
      '合肥工业大学': 'hfut',
      '中国石油大学': 'upc',
      '中国地质大学': 'cug',
      '西南财经大学': 'swufe',
      '西南交通大学': 'swjtu',
      '陕西师范大学': 'snnu',
      '西安电子科技大学': 'xdu'
    };

    let handleDocumentClick = null;
    onMounted(() => {
      if (!chartDom.value) {
        console.error('chartDom is not initialized');
        return;
      }

      const chart = echarts.init(chartDom.value);

      echarts.registerMap('china', geoJson);

      window.addEventListener('resize', () => {
        try {
          chart.resize();
        } catch (e) {
          console.warn('resize error:', e);
        }
      });

      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}',
        },
        visualMap: {
          min: 0,
          max: 30000,
          inRange: {
            color: ['#e6f7ff', '#0050b3'],
          },
          calculable: true,
          seriesIndex: 0,
        },
        geo: {
          map: 'china',
          roam: true,
          zoom: 1.2,
          layoutCenter: ['50%', '70%'],
          layoutSize: '114%',
          itemStyle: {
            areaColor: '#e0f3ff',
            borderColor: 'rgba(24,144,255,1)',
            borderWidth: 1.5,
          },
          emphasis: {
            itemStyle: {
              areaColor: '#0050b3',
              borderColor: '#fff',
              borderWidth: 1,
            },
            label:{
              show:false,
              // textStyle:{
              //   color: '#d4d3ce',
              // }
            }
          },
          select: {
            itemStyle: {
              areaColor: '#0050b3',
            },
            label:{
              show:false,
            }
          },
        },
        series: [
          {
            type: 'map',
            // map: 'china',
            // zoom: 1.2,
            // layoutCenter: ['50%', '70%'],
            // layoutSize: '114%',
            // selectedMode: false,
            geoIndex: 0, // 🔁 使用 geo 坐标系
            data: [
              { name: '北京市', value: 30000 },
              { name: '天津市', value: 15000 },
              { name: '上海市', value: 25000 },
              { name: '重庆市', value: 12000 },
              { name: '辽宁省', value: 14000 },
              { name: '吉林省', value: 10000 },
              { name: '黑龙江省', value: 9000 },
              { name: '江苏省', value: 20000 },
              { name: '浙江省', value: 18000 },
              { name: '安徽省', value: 12000 },
              { name: '福建省', value: 10000 },
              { name: '山东省', value: 15000 },
              { name: '湖北省', value: 20000 },
              { name: '湖南省', value: 15000 },
              { name: '广东省', value: 22000 },
              { name: '四川省', value: 18000 },
              { name: '陕西省', value: 20000 },
              { name: '甘肃省', value: 5000 },
            ],
            // itemStyle: {
            //   areaColor: '#e0f3ff',
            //   borderColor: 'rgba(24,144,255,1)',
            //   borderWidth: 1.5,
            //   shadowColor: 'rgba(0,0,0,0.1)',
            //   shadowBlur: 2,
            //   shadowOffsetY: 2,
            // },
            // emphasis: {
            //   itemStyle: {
            //     areaColor: '#0050b3',
            //     borderColor: 'rgba(255,255,255,0.8)',
            //     borderWidth: 2,
            //   },
            // },
            // select: {
            //   itemStyle: {
            //     areaColor: '#0050b3',
            //     borderColor: 'rgba(255,255,255,0.8)',
            //     borderWidth: 2,
            //   },
            // },
          },
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              color: ({ dataIndex }) => colors[dataIndex % colors.length],
              borderColor: '#fff',
              borderWidth: 1,
            },
            data: universities.map((uni) => ({
              name: uni.name,
              value: [...uni.coords, 1],
            })),
            tooltip: {
              trigger: 'item',
              formatter: (params) =>
                `${params.name}<br/>经纬度: ${params.value[0]}, ${params.value[1]}`,
            },
          },
        ],
      };

      chart.setOption(option);

      chart.on('click', (params) => {
        if (params.componentType === 'series' && params.seriesType === 'map') {
          const province = params.name;
          selectedProvince.value = province;
          selectedUniversities.value = universities.filter(
            (uni) => uni.province === province
          );

          // 动态调整弹框位置，防止溢出
          const event = params.event.event;
          const chartRect = chartDom.value.getBoundingClientRect();
          const menuWidth = 200;
          const menuHeight = 250;
          let offsetX = event.offsetX + 10;
          let offsetY = event.offsetY + 10;

          if (offsetX + menuWidth > chartRect.width) {
            offsetX = chartRect.width - menuWidth - 10;
          }
          if (offsetY + menuHeight > chartRect.height) {
            offsetY = chartRect.height - menuHeight - 10;
          }
          if (offsetX < 0) {
            offsetX = 10;
          }
          if (offsetY < 0) {
            offsetY = 10;
          }

          menuPosition.value = {
            top: `${offsetY}px`,
            left: `${offsetX}px`,
          };
          showMenu.value = true;

          console.log('Clicked region:', province, 'Universities:', selectedUniversities.value);
        }
      });

      // 监听点击事件，点击外部关闭弹框
      handleDocumentClick = (event) => {
        if (
          showMenu.value &&
          menuDom.value &&
          !menuDom.value.$el.contains(event.target) &&
          chartDom.value &&
          !chartDom.value.contains(event.target)
        ) {
          showMenu.value = false;
          //取消地图选中状态
          chart.dispatchAction({
            type: 'unselect',
            seriesIndex: 0,
            name: selectedProvince.value
          });
        }
      };
      document.addEventListener('click', handleDocumentClick);
    });

    onBeforeUnmount(() => {
      if (handleDocumentClick) {
        document.removeEventListener('click', handleDocumentClick);
      }
    });

    const handleUniversityClick = (university) => {
      console.log('Clicked university:', university.name);
      showMenu.value = false;

      const shortName = universityRoutes[university.name];
      if (shortName) {
        router.push(`/university/${shortName}`);
      } else {
        const fallback = university.name
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
        router.push(`/university/${fallback}`);
      }
    };

    return {
      chartDom,
      menuDom,
      showMenu,
      menuPosition,
      selectedProvince,
      selectedUniversities,
      handleUniversityClick,
    };
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-sizing: border-box;
}

.chart {
  width: 100%;
  height: 100%;
}

.university-menu {
  position: absolute;
  z-index: 1000;
  width: 200px;
  max-height: 250px;
  overflow-y: auto;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  background: white;
}

.university-menu :deep(.ant-card-head-title) {
  font-size: 16px;
  padding: 5px;
}

.university-item {
  cursor: pointer;
  font-size: 14px;
}

.university-item:hover {
  background: #e6f7ff;
}

@media (max-width: 800px) {
  .university-menu {
    width: 150px;
    max-height: 200px;
  }

  .university-menu :deep(.ant-card-head-title) {
    font-size: 16px;
    padding: 8px;
  }

  .university-item {
    font-size: 14px;
  }
}
</style>