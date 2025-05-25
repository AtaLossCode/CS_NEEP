<template>
  <div class="container">
    <!-- 主标题 -->
    <div class="header">
      <h1 class="main-title">四川大学/综合实力</h1>
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 左侧文本框 -->
      <div class="left-panel">
        <div class="text-card">
          <h2 class="card-title">四川大学计算机学院（软件学院、智能科学与技术学院）</h2>
          <p class="card-content">
            四川大学于1958年设立计算机专业，1981年设立计算机科学系，1998年设立计算机学院。2005年，学校将计算机学院和软件学院行政班子合并，实行教学和学生管理独立运行的模式。
            <br><br>
            学院有教职工229人（含思政、行政），其中专业教师186人，正高级专业技术职称41人、副高级专业技术职称76人、博士生导师24人；中国科学院院士1人（双聘）、四川大学理科杰出教授1人、IEEE Fellow 1人、国家杰出青年科学基金获得者1人、海外高层次人才引进计划青年项目入选者2人、国家优秀青年科学基金获得者1人、教育部新（跨）世纪优秀人才入选者8人、四川省学术和技术带头人9人及后备人选9人、四川省突出贡献专家7人，四川省教学名师2人。
            <br><br>
          </p>
        </div>
      </div>

      <!-- 右侧图片框 -->
<div class="right-panel">
      <div class="small-container">
        <div class="small-card">
          <p>考研地区：A区</p>
          </div>
        <div class="small-card">
          <p>学科评估：A-</p>
          </div> 
          </div>
        <div class="image-card">
          <div class="circular-progress">
            <div class="progress-container">
              <div class="progress-bar"></div>
              <div class="progress-value">48%</div>
            </div>
            <div class="progress-label">考研人数/研究生人数</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TwoColumnLayout',
  data() {
    return {
      // 可以在这里定义动态数据
    };
  },
  mounted() {
    // 添加滚动动画效果
    this.addScrollAnimation();
  },
  methods: {
    addScrollAnimation() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.text-card, .image-card').forEach(el => {
        observer.observe(el);
      });
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.header {
  text-align: center;
  margin-bottom: 4rem;
}

.main-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  
}

.main-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 25%;
  width: 50%;
  height: 4px;
  background-color: #3b82f6;
  border-radius: 2px;
}

.content-wrapper {
  display: flex;
  gap: 3rem;
  justify-content: space-between;
  align-items: stretch;
}

.left-panel{
  flex: 2;
  min-width: 300px;
}

.right-panel {
  flex: 1;
  min-width: 300px;
}

.text-card {
  background: linear-gradient(145deg, #ffffff 0%, #dbe2f8 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.6s ease-out;
}

.image-card {
  background: linear-gradient(145deg, #ffffff 0%, #dbe2f8 100%);
  border-radius: 18px;
  padding: 2rem;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-card:hover {
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  transform: translateY(-5px) scale(1.01);
}

.small-cards-container {
  display: flex; 
  gap: 1rem; 
  flex-wrap: wrap;
}

.small-card {
  background: linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: 18px;
  padding: 2rem;
  flex:1;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.small-card:hover {
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  transform: translateY(-5px) scale(1.01);
}

.circular-progress {
  position: relative;
  width: 220px;
  height: 220px;
}

.progress-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-bar {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(#3b82f6 75%, #e0e7ff 0);
  mask: radial-gradient(transparent 55%, #000 56%);
  -webkit-mask: radial-gradient(transparent 55%, #000 56%);
}

.progress-value {
  position: relative;
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.progress-label {
  /* position: absolute; */
  bottom: 0px;
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  color: #64748b;
  font-weight: 500;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.image-card:hover .card-image {
  transform: scale(1.03);
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.card-content {
  font-size: 1.1rem;
  color: #4b5563;
  line-height: 1.8;
}

.animate-fade-in {
  transform: translateY(0);
  opacity: 1;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .content-wrapper {
    flex-direction: column;
  }
  
  .left-panel, .right-panel {
    width: 100%;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .card-title {
    font-size: 1.5rem;
  }
  
  .card-content {
    font-size: 1rem;
  }
}
</style>