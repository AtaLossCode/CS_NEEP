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
          <Map />
        </div>
        <div class="module-box score-box">
          <Score />
        </div>
      </div>
      <!-- 右侧部分：宽度 25% -->
      <div class="right-col">
        <div class="module-box words-box">
          <Words />
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
import Map from './components/MapView.vue'
import Radar from './components/RadarChart.vue'
import Score from './components/ScoreView.vue'
import Top5 from './components/Top5View.vue'
import Words from './components/WordsView.vue'
import Subject from './components/SubjectView.vue'
import Compare from './components/CompareChart.vue'

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
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-title {
  font-size: 36px; /* 大字体 */
  font-weight: bold;
  color: #333;
}

.sub-title {
  font-size: 18px; /* 小字体 */
  color: #666;
}

/* 内容区：占据剩余高度，背景色 #F5F5F5 */
.content {
  flex: 1;
  background-color: #F5F5F5;
  display: flex;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
}

/* 左侧、中间、右侧列均拉满 content 高度 */
.left-col,
.center-col,
.right-col {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 分别设置各列宽度 */
.left-col {
  width: 25%;
}

.center-col {
  width: 50%;
}

.right-col {
  width: 25%;
}

/* 模块盒子：蓝色边框、白色背景，并默认占父列均分高度 */
.module-box {
  background-color: white;
  border: 2px solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
}

/* 中间区域内，Map模块和Score模块分别占3/4和1/4高度 */
.center-col .map-box {
  flex: 2.5;
}

.center-col .score-box {
  flex: 1.5;
}

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

.compare-box{
  border:white;
}
</style>