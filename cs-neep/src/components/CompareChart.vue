<template>
  <div class="compare-chart module-inner">
    <div class="item">
      <h3 class="title">报考人数</h3>
      <div class="number">
        <span class="value">45.8</span>
        <span class="change up">▲2.3%</span>
        <span class="unit">万人</span>
      </div>
    </div>
    <div class="item">
      <h3 class="title">分数线</h3>
      <div class="number">
        <span class="value">310</span>
        <span class="change up">▲1.5%</span>
        <span class="unit">分</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompareChart',
  data() {
    return {
      examCount: 45.8,       
      examChange: 2.3,       
      scoreLine: 310,        
      scoreChange: 1.5       
    }
  },
  computed: {
    formattedExamCount() {
      return this.examCount.toFixed(1);
    },
    formattedExamChange() {
      return `▲${this.examChange.toFixed(1)}%`;
    },
    formattedScoreLine() {
      return this.scoreLine;
    },
    formattedScoreChange() {
      return `▲${this.scoreChange.toFixed(1)}%`;
    }
  }
}
</script>

<style scoped>
/* 主容器 */
.compare-chart {
  width: 100%;
  height:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

/* 单个模块卡片 */
.item {
  width: 100%;
  height:85%;
  flex: 1;
  background: #0e1c3f;
  border-radius: 16px;
  padding: 22px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  justify-content: center;
  align-items: center;
}
.item:hover {
  transform: translateY(-6px);
}

/* 左侧竖条标题 */
.title {
  position: relative;
  padding-left: 20px;
  font-size: 26px;
  color: #ffffff;
}
.title::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 6px;
  width: 4px;
  height: 22px;
  background-color: #3e7bff;
  border-radius: 2px;
}

/* 数字区 */
.number {
  position: relative;
  font-size: 90px;
  display: inline-block;
  font-weight: bold;
  color: transparent;
}

/* 渐变数字 */
.value {
  background: linear-gradient(90deg, #3e7bff, #8ac0ff);
  -webkit-background-clip: text;
  color: transparent;
  padding-right: 50px;
}

/* 上浮动画 */
@keyframes floatArrow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
.change {
  position: absolute;
  font-size: 16px;
  color: #4db6ff;
  top: -8px;
  right: 0;
  animation: floatArrow 1.5s infinite ease-in-out;
}

/* 单位位置 */
.unit {
  position: absolute;
  font-size: 16px;
  color: #ccc;
  bottom: 0;
  right: 21px;
}
</style>

  
  