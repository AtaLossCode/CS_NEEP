<template>
  <div class="homepage">
    <!-- 顶部标题部分 -->
    <div class="header">
      <div class="title">
        <span class="main-title">计研视界</span>
        <span class="sub-title">全国985院校计算机考研数据可视化</span>
      </div>
    </div>
    <!-- 内容区，背景为 #F5F5F5 -->
    <div class="content">
      <!-- 左侧部分：宽度 25% -->
      <div class="left-col">
        <div class="module-box radar-box">
          <Radar />
        </div>
        <div class="module-box top5-box">
          <Top5 />
        </div>
      </div>
      <!-- 中间部分：宽度 50% -->
      <div class="center-col">
        <div class="module-box map-box">
          <Map @hover-university="handleHoverUniversity" />
        </div>
        <div class="module-box score-box">
          <Score />
        </div>
      </div>
      <!-- 右侧部分：宽度 25% -->
      <div class="right-col">
        <div class="module-box words-box">
          <Words :university-data="hoveredUniversityData" />
        </div>
        <div class="module-box subject-box">
          <Subject />
        </div>
        <div class="module-box compare-box">
          <Compare />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Map from '../components/MapView.vue'
import Radar from '../components/RadarChart.vue'
import Score from '../components/ScoreView.vue'
import Top5 from '../components/Top5View.vue'
import Words from '../components/WordsView.vue'
import Subject from '../components/SubjectView.vue'
import Compare from '../components/CompareChart.vue'

export default {
  name: 'App',
  components: {
    Map,
    Radar,
    Score,
    Top5,
    Words,
    Subject,
    Compare
  },
  data() {
    return {
      hoveredUniversityData: null
    }
  },
  methods: {
    handleHoverUniversity(data) {
      this.hoveredUniversityData = data;
    }
  }
}
</script>

<style scoped>
/* 整个页面占满视窗高度，并采用垂直方向布局 */
.homepage {
  font-family: Arial, sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 顶部标题部分 */
.header {
  background-color: white;
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
  flex-shrink: 0; /* 防止header被压缩 */
}

.title {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
}

.sub-title {
  font-size: 14px;
  color: #666;
}

/* 内容区：占据剩余高度，背景色 #F5F5F5 */
.content {
  flex: 1;
  background-color: #F5F5F5;
  display: flex;
  gap: 10px; /* 减小列间距 */
  padding: 10px; /* 减小外边距 */
  box-sizing: border-box;
  overflow: hidden; /* 防止内容溢出 */
}

/* 左侧、中间、右侧列均拉满 content 高度 */
.left-col,
.center-col,
.right-col {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px; /* 减小模块间距 */
  box-sizing: border-box;
}

/* 分别设置各列宽度 */
.left-col {
  width: 25%;
  min-width: 200px; /* 防止过窄 */
}

.center-col {
  width: 50%;
  min-width: 400px; /* 防止过窄 */
}

.right-col {
  width: 25%;
  min-width: 200px; /* 防止过窄 */
}

/* 模块盒子：蓝色边框、白色背景，并默认占父列均分高度 */
.module-box {
  background-color: white;
  border: 2px solid #5C93D1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px; /* 减小内边距 */
  box-sizing: border-box;
  overflow: hidden; /* 防止内部内容溢出 */
  flex: 1; /* 默认均分高度 */
}

/* 中间区域内，Map模块和Score模块分别占3/4和1/4高度 */
.center-col .map-box {
  flex: 2.5;
}

.center-col .score-box {
  flex: 1.5;
}

/* 左侧区域内，Radar和Top5模块均分高度 */
.left-col .radar-box {
  flex: 1;
}

.left-col .top5-box {
  flex: 1;
}

/* 右侧区域内，三个模块的高度比例设置为 1 : 1.5 : 1 */
.right-col > .module-box:nth-child(1) {
  flex: 1;
}

.right-col > .module-box:nth-child(2) {
  flex: 1.5;
}

.right-col > .module-box:nth-child(3) {
  flex: 1;
}

/* 修复Compare模块的边框问题 */
.compare-box {
  border: 2px solid #F5F5F5; /* 与其他模块一致 */
  padding: 0px; /* 减小内边距 */
}

/* 确保组件内容不溢出 */
.module-box > * {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  box-sizing: border-box;
  overflow: hidden; /* 防止组件内容溢出 */
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .left-col,
  .right-col {
    width: 30%;
  }
  .center-col {
    width: 40%;
  }
}

@media (max-width: 800px) {
  .content {
    flex-direction: column;
    gap: 10px;
  }
  .left-col,
  .center-col,
  .right-col {
    width: 100%;
    min-width: unset;
    height: auto;
  }
  .module-box {
    min-height: 150px; /* 确保模块有最小高度 */
  }
}
</style>