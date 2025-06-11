<!-- AdmissionRatio.vue -->
<template>
  <div class="admission-ratio-container" @mousemove="updateTooltipPosition">
    <!-- 标题 -->
    <h2>报录比</h2>

    <!-- 筛选条件 -->
    <div class="filters">
      <div class="filter-group">
        <label>类别</label>
        <select v-model="selectedCategory">
          <option value="最终录取">最终录取</option>
          <option value="进入复试">进入复试</option>
        </select>
      </div>
      <div class="filter-group">
        <label>性别</label>
        <select v-model="selectedGender">
          <option value="全部">全部</option>
          <option value="男">男</option>
          <option value="女">女</option>
        </select>
      </div>
      <div class="filter-group">
        <label>专业</label>
        <select v-model="selectedMajor">
          <option value="计算机类">计算机类</option>
          <option value="计算机科学与技术">计算机科学与技术</option>
          <option value="智能科学与技术">智能科学与技术</option>
          <option value="软件工程">软件工程</option>
          <option value="电子信息">电子信息</option>
        </select>
      </div>
    </div>

    <!-- 华夫图展示 -->
    <div class="waffle-charts">
      <div
        v-for="year in years"
        :key="year"
        class="waffle-chart"
        @mouseover="showTooltip(year)"
        @mouseleave="hideTooltip"
      >
        <h3>{{ year }}年</h3>
        <div class="waffle-grid" ref="waffleGrid">
          <div
            v-for="i in 100"
            :key="i"
            class="waffle-cell"
            :class="{ 'filled': i <= filteredData[year] }"
          >
            <span class="person-icon" aria-hidden="true"></span>
          </div>
        </div>
        <div v-if="hoveredYear === year" class="tooltip" :style="tooltipStyle">
          {{ tooltipText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// 年份列表
const years = [2020, 2021, 2022, 2023, 2024];

// 筛选条件
const selectedCategory = ref('最终录取');
const selectedGender = ref('全部');
const selectedMajor = ref('计算机类');

// 模拟数据：进入初始人数和最终录取人数（按年份、性别、专业划分）
const rawData = {
    进入复试: {
    男: {
      计算机科学与技术: { 2020: 40, 2021: 25, 2022: 21, 2023: 21, 2024: 20 },
      智能科学与技术: { 2020: 34, 2021: 37, 2022: 40, 2023: 41, 2024: 43 },
      软件工程: { 2020: 28, 2021: 31, 2022: 34, 2023: 35, 2024: 37 },
      电子信息: { 2020: 22, 2021: 25, 2022: 28, 2023: 29, 2024: 31 },
      计算机类: { 2020: 31, 2021: 34, 2022: 37, 2023: 38, 2024: 40 }
    },
    女: {
      计算机科学与技术: { 2020: 20, 2021: 20, 2022: 22, 2023: 19, 2024: 18 },
      智能科学与技术: { 2020: 26, 2021: 28, 2022: 30, 2023: 31, 2024: 32 },
      软件工程: { 2020: 22, 2021: 24, 2022: 26, 2023: 27, 2024: 28 },
      电子信息: { 2020: 18, 2021: 20, 2022: 22, 2023: 23, 2024: 24 },
      计算机类: { 2020: 24, 2021: 26, 2022: 28, 2023: 29, 2024: 30 }
    },
    全部: {
      计算机科学与技术: { 2020: 50, 2021: 45, 2022: 43, 2023: 40, 2024: 38 },
      智能科学与技术: { 2020: 60, 2021: 65, 2022: 70, 2023: 72, 2024: 75 },
      软件工程: { 2020: 50, 2021: 55, 2022: 60, 2023: 62, 2024: 65 },
      电子信息: { 2020: 40, 2021: 45, 2022: 50, 2023: 52, 2024: 55 },
      计算机类: { 2020: 55, 2021: 60, 2022: 65, 2023: 67, 2024: 70 }
    }
  },
  最终录取: {
    男: {
      计算机科学与技术: { 2020: 10, 2021: 8, 2022: 7, 2023: 7, 2024: 5 },
      智能科学与技术: { 2020: 27, 2021: 28, 2022: 22, 2023: 23, 2024: 23 },
      软件工程: { 2020: 8, 2021: 13, 2022: 12, 2023: 13, 2024: 11 },
      电子信息: { 2020: 12, 2021: 13, 2022: 12, 2023: 13, 2024: 8 },
      计算机类: { 2020: 12, 2021: 12, 2022: 10, 2023: 9, 2024: 10 }
    },
    女: {
      计算机科学与技术: { 2020: 9, 2021: 7, 2022: 6, 2023: 7, 2024: 6 },
      智能科学与技术: { 2020: 19, 2021: 10, 2022: 13, 2023: 15, 2024: 17 },
      软件工程: { 2020: 12, 2021: 8, 2022: 10, 2023: 12, 2024: 9 },
      电子信息: { 2020: 10, 2021: 12, 2022: 8, 2023: 10, 2024: 13 },
      计算机类: { 2020: 8, 2021: 9, 2022: 9, 2023: 8, 2024: 8 }
    },
    全部: {
      计算机科学与技术: { 2020: 19, 2021: 15, 2022: 13, 2023: 14, 2024: 11 },
      智能科学与技术: { 2020: 46, 2021: 38, 2022: 35, 2023: 38, 2024: 40 },
      软件工程: { 2020: 20, 2021: 21, 2022: 22, 2023: 25, 2024: 20 },
      电子信息: { 2020: 22, 2021: 25, 2022: 20, 2023: 23, 2024: 21 },
      计算机类: { 2020: 20, 2021: 21, 2022: 19, 2023: 17, 2024: 18}
    }
  }
};

// 计算筛选后的数据
const filteredData = computed(() => {
  const result = {};
  years.forEach(year => {
    result[year] = rawData[selectedCategory.value][selectedGender.value][selectedMajor.value][year];
  });
  return result;
});

// 悬停状态和工具提示
const hoveredYear = ref(null);
const tooltipStyle = ref({ top: '0px', left: '0px' });
const mousePosition = ref({ x: 0, y: 0 });

const percentage = computed(() => {
  if (hoveredYear.value && filteredData.value[hoveredYear.value]) {
    return ((filteredData.value[hoveredYear.value] / 100) * 100).toFixed(1);
  }
  return '0';
});

const tooltipText = computed(() => {
  if (hoveredYear.value && selectedCategory.value && selectedGender.value&& selectedMajor.value) {
    const genderDisplay = {
      全部: '全部学生',
      男: '男生',
      女: '女生'
    };
    return `${hoveredYear.value}年报考${selectedMajor.value}中${selectedCategory.value}的${genderDisplay[selectedGender.value]}占报考人数的${percentage.value}%`;
  }
  return '';
});

const showTooltip = (year) => {
  hoveredYear.value = year;
};

const hideTooltip = () => {
  hoveredYear.value = null;
};

const updateTooltipPosition = (event) => {
  mousePosition.value = { x: event.pageX, y: event.pageY };
  tooltipStyle.value = {
    top: `${mousePosition.value.y - 40}px`,
    left: `${mousePosition.value.x + 10}px`
  };
};

onMounted(() => {
  document.addEventListener('mousemove', updateTooltipPosition);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', updateTooltipPosition);
});
</script>

<style scoped>
.admission-ratio-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  font-size: 28px;
  color: #333;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.filter-group label {
  font-size: 14px;
  color: #666;
}

.filter-group select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.waffle-charts {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
}

.waffle-chart {
  text-align: center;
  position: relative;
}

.waffle-chart h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
  background-color: #93AFF9;
  padding: 5px;
  border-radius: 20px;
}

.waffle-grid {
  display: grid;
  grid-template-columns: repeat(10, 20px);
  grid-template-rows: repeat(10, 20px);
  gap: 2px;
  border: 2px solid #2A59D9;
  padding: 5px;
  background-color: white;
}

.waffle-cell {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}

.waffle-cell.filled {
  background-color: white;
}

.person-icon {
  display: inline-block;
  width: 25px;
  height: 25px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23C7C7C7"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>');
  background-size: contain;
  background-repeat: no-repeat;
  transition: transform 0.3s ease;
}

.waffle-cell.filled .person-icon {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%232A59D9"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>');
  animation: scaleUp 0.3s ease forwards;
}

/* 工具提示样式 */
.tooltip {
  position: fixed;
  background-color: #2A59D9;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  pointer-events: none;
  z-index: 10;
  max-width: 200px;
  word-wrap: break-word;
}

/* 动画定义 */
@keyframes popIn {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}

@keyframes scaleUp {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}
</style>