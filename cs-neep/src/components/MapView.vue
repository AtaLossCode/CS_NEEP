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
  emits: ['hover-university'],
  setup(props, { emit }) {
    const chartDom = ref(null);
    const menuDom = ref(null);
    const showMenu = ref(false);
    const menuPosition = ref({ top: '0px', left: '0px' });
    const selectedProvince = ref('');
    const selectedUniversities = ref([]);
    const router = useRouter();

    // Define 985 universities with their provinces
    const universities = [
      { "name": "清华大学", "province": "北京市", "coords": [116.326836, 40.00366] },
      { "name": "北京大学", "province": "北京市", "coords": [116.31088, 39.99281] },
      { "name": "上海交通大学", "province": "上海市", "coords": [121.445991, 31.028512] },
      { "name": "浙江大学", "province": "浙江省", "coords": [120.08083, 30.302959] },
      { "name": "西北工业大学", "province": "陕西省", "coords": [108.915419, 34.243687] },
      { "name": "北京航空航天大学", "province": "北京市", "coords": [116.347313, 39.981771] },
      { "name": "华中科技大学", "province": "湖北省", "coords": [114.414724, 30.515977] },
      { "name": "哈尔滨工业大学", "province": "黑龙江省", "coords": [126.632628, 45.743215] },
      { "name": "国防科技大学", "province": "湖南省", "coords": [112.985921, 28.164312] },
      { "name": "中国科学技术大学", "province": "安徽省", "coords": [117.263033, 31.838803] },
      { "name": "南京大学", "province": "江苏省", "coords": [118.781696, 32.050303] },
      { "name": "电子科技大学", "province": "四川省", "coords": [104.102289, 30.674422] },
      { "name": "北京理工大学", "province": "北京市", "coords": [116.321567, 39.959693] },
      { "name": "中山大学", "province": "广东省", "coords": [113.391786, 23.067691] },
      { "name": "湖南大学", "province": "湖南省", "coords": [112.944991, 28.178328] },
      { "name": "东南大学", "province": "江苏省", "coords": [118.830289, 31.887157] },
      { "name": "西安交通大学", "province": "陕西省", "coords": [108.984598, 34.246033] },
      { "name": "中南大学", "province": "湖南省", "coords": [112.936703, 28.160166] },
      { "name": "东北大学", "province": "辽宁省", "coords": [123.41842, 41.76529] },
      { "name": "武汉大学", "province": "湖北省", "coords": [114.365248, 30.53786] },
      { "name": "同济大学", "province": "上海市", "coords": [121.50781, 31.282553] },
      { "name": "四川大学", "province": "四川省", "coords": [104.083748, 30.630869] },
      { "name": "天津大学", "province": "天津市", "coords": [117.175606, 39.114218] },
      { "name": "华南理工大学", "province": "广东省", "coords": [113.432504, 23.173239] }
    ];


    const universityData = {
      '四川大学': {
        admissionHeat: {
          '电子信息': 699,
          '网络空间安全': 103,
          '智能科学与技术': 25,
          '软件工程': 68,
          '计算机科学与技术': 204
        },
        examCount: 182+65+699+25, // 报考人数
        examChange: '-27.3%', // 报考人数变化
        scoreLine: 310, // 分数线
        scoreChange: '-2.8%' // 分数线变化
      }
    };

    // 一组易区分的颜色
    const colors = [
      '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622'
    ];

    const universityRoutes = {
      '清华大学': 'thu',
      '北京大学': 'pku',
      '上海交通大学': 'sjtu',
      '浙江大学': 'zju',
      '西北工业大学': 'npu',
      '北京航空航天大学': 'buaa',
      '华中科技大学': 'hust',
      '哈尔滨工业大学': 'hit',
      '中国科学技术大学': 'ustc',
      '南京大学': 'nju',
      '电子科技大学': 'uestc',
      '北京理工大学': 'bit',
      '中山大学': 'sysu',
      '湖南大学': 'hnu',
      '东南大学': 'seu',
      '西安交通大学': 'xjtu',
      '中南大学': 'csu',
      '东北大学': 'neu',
      '武汉大学': 'whu',
      '同济大学': 'tongji',
      '四川大学': 'scu',
      '复旦大学': 'fudan',
      '天津大学': 'tju',
      '华南理工大学': 'scut'
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
            label: {
              show: false,
            }
          },
          select: {
            itemStyle: {
              areaColor: '#0050b3',
            },
            label: {
              show: false,
            }
          },
        },
        series: [
          {
            type: 'map',
            geoIndex: 0,
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

      // 添加鼠标悬浮事件
      chart.on('mouseover', (params) => {
        if (params.componentType === 'series' && params.seriesType === 'scatter' && params.name === '四川大学') {
          emit('hover-university', universityData['四川大学']);
          emit('hover-university-name', '四川大学');
          
        }
        if (params.componentType === 'series' && params.seriesType === 'scatter') {
          const universityName = params.name;
          // 仅当非四川大学时触发新事件（避免重复触发）
          if (universityName !== '四川大学') {
            emit('hover-university-name', universityName);
          }
        }
        
      });

      chart.on('mouseout', (params) => {
        if (params.componentType === 'series' && params.seriesType === 'scatter') {
          emit('hover-university', null);
          emit('hover-university-name', null);
        }
        // if (params.componentType === 'series' && params.seriesType === 'scatter') {
        //   // const universityName = params.name;
        //   // if (universityName !== '四川大学') {
        //   //   emit('hover-university-name', null);
        //   // }
        //       emit('hover-university', null);
        //       emit('hover-university-name', null);
        // }
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