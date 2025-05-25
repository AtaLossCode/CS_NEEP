<template>
  <div class="card-container">
    <!-- 标题区域 -->
    <div class="section-header">
      <h2 class="main-title">四川大学/优秀导师</h2>
      <p class="section-desc"></p>
    </div>

    <!-- 卡片列表 -->
    <div class="info-cards">
      <div class="info-card" v-for="(card, index) in cards" :key="index">
        <div class="card-image" :style="{ backgroundImage: `url(${card.imageUrl})` }">
          <div class="image-overlay"></div>
        </div>
        <div class="card-content">
          <!-- <h3 class="card-title">{{ card.title }}</h3> -->
           <a :href="card.linkUrl" target="_blank" class="card-title">{{ card.title }}</a>
          <p class="card-text">{{ card.description }}</p>
        </div>
      </div>
    </div>

    <div class="bottom-link">
      <a href="https://cs.scu.edu.cn/szdw.htm" class="see-more-link" target="_blank">
        See More... <i class="el-icon-right"></i>
      </a>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'FourImageCards',
  data() {
    return {
      cards: [
        {
          imageUrl: 'https://cs.scu.edu.cn/__local/0/56/ED/EEA7B69761D4ED0A03AA42D0B84_AAAF15C8_37FC.jpg',
          title: '朱敏',
          description: '研究方向：信息可视化与可视分析，图像处理，生物信息学',
          linkUrl: 'https://cs.scu.edu.cn/info/1279/13673.htm'
        },
        {
          imageUrl: 'https://cs.scu.edu.cn/__local/E/80/FE/8F6FB800E10CF430E3D2D068504_4F21531E_236B3F.jpg',
          title: '吕建成',
          description: '研究方向： 人工智能、数据科学、软件智能',
          linkUrl: 'https://cs.scu.edu.cn/info/1303/13767.htm'
        },
        {
          imageUrl: 'https://cs.scu.edu.cn/__local/8/8B/30/7269D97E9586322DCEAAD5551D8_28395366_957EC.jpg',
          title: '雷文强',
          description: '研究方向：自然语言处理、信息检索、人机协同、计算音乐、计算人文社科',
          linkUrl: 'https://cs.scu.edu.cn/info/1282/17597.htm'
        },
        {
          imageUrl: 'https://cs.scu.edu.cn/__local/C/87/8E/90E3DE52F25BACD50F6BF1405A6_AB3736F3_27548B.jpg',
          title: '章乐',
          description: '研究方向：在基因层面，为基础医学和生物学研究，提供基于人工智能技术的分析工具。在蛋白质层面，为细胞信号通路和药学分子对接，提供基于人工智能技术的分析工具。在组织层面，为疾病的预防诊断，提供基于人工智能技术的影像和自然语言分析工具。',
          linkUrl: 'https://cs.scu.edu.cn/info/1291/13640.htm'
        }
      ]
    };
  }
};
</script>

<style scoped>

/* 底部文字链接样式 */
.bottom-link {
  text-align: center;
  padding: 1.5rem 0;
  border-top: 1px solid #f0f0f0; /* 可选分隔线 */
}
.card-container {
  padding: 2rem;
 
}

/* 标题区域样式 */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.main-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
}

.section-desc {
  font-size: 1.125rem;
  color: #555;
  max-width: 600px;
  margin: 0 auto;
}

.info-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.info-card {
  /* 保持原有卡片样式不变 */
  flex: 1;
  min-width: 280px;
  max-width: 320px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
}

.card-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
  
  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
}

.info-card:hover .image-overlay {
  opacity: 1;
}

.card-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.75rem;
  transition: color 0.3s ease;
}

.info-card:hover .card-title {
  color: #165DFF;
}

.card-text {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
  flex-grow: 1;
}

/* 响应式调整 */
@media (max-width: 992px) {
  .info-cards {
    gap: 1.5rem;
  }
  
  .info-card {
    min-width: 45%;
  }
}

@media (max-width: 768px) {
  .main-title {
    font-size: 1.75rem;
  }
  
  .section-desc {
    font-size: 1rem;
  }
  
  .info-card {
    min-width: 100%;
  }
}
</style>