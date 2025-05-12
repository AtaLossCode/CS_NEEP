<template>
  <div class="compare-chart module-inner">
    <div class="item">
      <h3 class="title">报考人数</h3>
      <div class="number">
        <span class="value">{{ formattedExamCount }}</span>
        <span class="change up">{{ formattedExamChange }}</span>
        <span class="unit">万人</span>
      </div>
    </div>
    <div class="item">
      <h3 class="title">分数线</h3>
      <div class="number">
        <span class="value">{{ formattedScoreLine }}</span>
        <span class="change up">{{ formattedScoreChange }}</span>
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
    };
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
};
</script>

<style scoped>
.compare-chart {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #F5F5F5;
  box-sizing: border-box;
  
}

.item {
  border:#5C93D1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  overflow: hidden;
}

.item:hover {
  transform: translateY(-4px);
}

.title {
  position: relative;
  padding-left: -10px;
  font-size: 20px;
  color: #0050B3;
}

.title::before {
  content: '';
  position: absolute;
  left: -10px;
  top: 4px;
  width: 4px;
  height: 16px;
  background-color: #0050B3;
  border-radius: 2px;
}

.number {
  position: relative;
  font-size: 57px;
  display: flex;
  align-items: center;
  font-weight: bold;
  color: transparent;
}

.value {
  background: #0050B3;
  -webkit-background-clip: text;
  color: transparent;
  padding-right: 30px;
}

@keyframes floatArrow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

.change {
  position: absolute;
  font-size: 12px;
  color: #4db6ff;
  top: -6px;
  right: 0;
  animation: floatArrow 1.5s infinite ease-in-out;
}

.unit {
  position: absolute;
  font-size: 12px;
  color: black;
  bottom: 0;
  right: 10px;
}
</style>