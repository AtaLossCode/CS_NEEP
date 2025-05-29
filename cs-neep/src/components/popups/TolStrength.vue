
<template>
  <div class="college-card">
    <!-- 顶部区域保持不变 -->
    <div class="card-header">
      <div class="title-container">
        <h2 class="college-title">四川大学 - 计算机学院</h2>
        <div class="line-decoration"></div>
      </div>
    </div>

    <!-- 历史时间线保持不变 -->
    <div class="timeline-section">
      <h3 class="section-title">发展历程</h3>
      <div class="timeline">
        <div class="timeline-item" v-for="(item, index) in historyItems" :key="index">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-year">{{ item.year }}</div>
            <div class="timeline-text">{{ item.text }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 师资力量部分保持不变 -->
    <div class="faculty-section">
      <h3 class="section-title">师资力量</h3>
      <div class="stats-container">
        <div class="stat-card">
          <div class="stat-value">{{ totalStaff }}</div>
          <div class="stat-label">教职工总数</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ teacherCount }}</div>
          <div class="stat-label">专业教师</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ seniorTitle }}</div>
          <div class="stat-label">正高级职称</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ associateTitle }}</div>
          <div class="stat-label">副高级职称</div>
        </div>
      </div>

      <!-- 高层次人才 -->
      <div class="talents-container">
        <h4 class="sub-section-title">高层次人才</h4>
        <div class="talent-groups">
          <div class="talent-group" v-for="(group, index) in talentGroups" :key="index">
            <div class="group-title">{{ group.title }}</div>
            <div class="group-count">{{ group.count }}</div>
          </div>
        </div>
      </div>

      <!-- 学科建设 - 优化显示 -->
      <div class="discipline-section">
        <h4 class="sub-section-title">学科建设</h4>
        <div class="discipline-content">
          <div v-for="item in disciplineItems" :key="item.label" class="discipline-item">
            <span class="discipline-label">{{ item.label }}</span>
            <span>{{ item.content }}</span>
          </div>
        </div>
      </div>

      <!-- 科研平台 - 优化显示 -->
      <div class="research-platforms">
        <h4 class="sub-section-title">科研平台</h4>
        <div class="platforms-grid">
          <div v-for="(platform, index) in researchPlatforms" :key="index" class="platform-item">
            <div class="platform-icon">
              <i class="el-icon-s-platform"></i>
            </div>
            <div class="platform-name">{{ platform }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 考研数据部分保持不变 -->
    <div class="admission-section">
      <h3 class="section-title">考研与研究生人数统计</h3>
      <div class="chart-container">
        <div class="chart-wrapper">
          <div ref="liquidChart" class="liquid-chart"></div>
          <div class="chart-info">
            <div class="info-item">
              <div class="info-label">报考人数</div>
              <div class="info-value">{{ applyCount }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">录取人数</div>
              <div class="info-value">{{ admitCount }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">报录比例</div>
              <div class="info-value ratio">{{ ratioText }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部装饰保持不变 -->
    <div class="card-footer">
      <div class="footer-decoration"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-liquidfill';

export default {
  data() {
    return {
      // 学院历史数据
      historyItems: [
        { year: '1958年', text: '设立计算机专业，开启学科建设序幕' },
        { year: '1981年', text: '成立计算机科学系，推动专业系统化发展' },
        { year: '1998年', text: '升级为计算机学院，标志学科体系进一步完善' },
        { year: '2005年', text: '与软件学院行政班子合并，实行"行政统一管理、教学与学生管理独立运行"的创新模式' }
      ],
      
      // 师资力量数据
      totalStaff: 229,
      teacherCount: 186,
      seniorTitle: 41,
      associateTitle: 76,
      talentGroups: [
        { title: '中科院院士（双聘）', count: 1 },
        { title: 'IEEE Fellow', count: 1 },
        { title: '国家杰青', count: 1 },
        { title: '优青', count: 1 },
        { title: '教育部人才', count: 8 },
        { title: '四川省学术带头人', count: 9 },
        { title: '四川省突出贡献专家', count: 7 },
        { title: '四川省教学名师', count: 2 }
      ],
      
      // 学科建设数据（结构化）
      disciplineItems: [
        { label: '博士后流动站：', content: '计算机科学与技术' },
        { label: '一级学科博士点：', content: '计算机科学与技术、软件工程' },
        { label: '工程博士点：', content: '电子与信息' },
        { label: '国家重点学科：', content: '计算机应用技术（2007年）' },
        { label: '四川省重点学科：', content: '计算机科学与技术（2008年）' }
      ],
      
      // 科研平台数据
      researchPlatforms: [
        '视觉合成图形图像技术重点学科实验室',
        '国家空管自动化系统技术重点实验室',
        '教育部现代交通管理系统工程研究中心',
        '四川省智能系统重点实验室',
        '四川省知识工程与网络智能重点实验室',
        '医疗信息化技术工程研究中心',
        '四川省网络大数据认知分析工程实验室',
        '四川省2011协同创新中心"大数据分析"',
        '四川省2011协同创新中心"智能空管系统"'
      ],
      
      // 考研数据
      applyCount: 2856,
      admitCount: 1371,
      ratio: 0.48,
      
      // 图表和加载状态
      liquidChart: null,
      chartLoaded: false,
      chartError: null
    };
  },
  computed: {
    ratioText() {
      return `${(this.ratio * 100).toFixed(1)}%`;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initLiquidChart();
      window.addEventListener('resize', this.resizeCharts);
    });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resizeCharts);
    if (this.liquidChart) {
      this.liquidChart.dispose();
      this.liquidChart = null;
    }
  },
  methods: {
    initLiquidChart() {
      try {
        const container = this.$refs.liquidChart;
        if (!container) throw new Error('图表容器未找到');
        
        // 确保容器有尺寸
        if (container.clientWidth === 0) {
          console.warn('图表容器宽度为0，尝试在100ms后初始化');
          setTimeout(() => this.initLiquidChart(), 100);
          return;
        }
        
        this.liquidChart = echarts.init(container);
        
        const option = {
          series: [{
            type: 'liquidFill',
            radius: '90%',
            center: ['50%', '50%'],
            data: [this.ratio],
          amplitude: 8,
          waveLength: 100,
          period: 4000,
          color: [
            {
              type: 'linear',
              x: 0, y: 0, x2: 1, y2: 0,
              colorStops: [
                {offset: 0, color: '#409EFF'},
                {offset: 1, color: '#1890FF'}
              ]
            }
          ],
          backgroundStyle: {
            color: 'rgba(240, 242, 245, 0.8)',
            borderWidth: 0
          },
          label: {
            position: ['50%', '45%'],
            formatter: () => `${(this.ratio * 100).toFixed(1)}%`,
            font: 'bold',
            textStyle: {
              fontSize: '52px',
              color: '#1890FF',
              fontWeight: 'bold'
            }
          },
          outline: {
            show: true,
            borderDistance: 5,
            itemStyle: {
              borderWidth: 2,
              borderColor: '#1890FF',
              shadowBlur: 10,
              shadowColor: 'rgba(24, 144, 255, 0.2)'
            }
          }
        
          }]
        };
        
        this.liquidChart.setOption(option);
        this.chartLoaded = true;
        
      } catch (error) {
        this.chartError = error.message;
        console.error('水球图初始化失败:', error);
      }
    },
    
    resizeCharts() {
      if (this.liquidChart) {
        this.liquidChart.resize();
      }
    }
  }
}
</script>


<style scoped>
.college-card {
  width: 90%;
  max-width: 1000px;
  margin: 30px auto;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.college-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
}

.card-header {
  padding: 30px 40px 20px;
  background: linear-gradient(135deg, #0F4C81 0%, #1A73E8 100%);
  color: white;
}

.title-container {
  position: relative;
}

.college-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.line-decoration {
  height: 3px;
  width: 80px;
  background-color: #ffffff;
  border-radius: 3px;
}

.timeline-section,
.faculty-section,
.admission-section {
  padding: 30px 40px;
}

.section-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 25px;
  color: #0F4C81;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 40px;
  height: 3px;
  background-color: #1A73E8;
  border-radius: 3px;
}

.timeline {
  position: relative;
  padding-left: 25px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 5px;
  bottom: 0;
  width: 2px;
  background-color: #E0E0E0;
}

.timeline-item {
  margin-bottom: 25px;
  position: relative;
}

.timeline-dot {
  position: absolute;
  left: -33px;
  top: 5px;
  width: 12px;
  height: 12px;
  background-color: #1A73E8;
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.15);
}

.timeline-year {
  font-size: 16px;
  font-weight: 600;
  color: #1A73E8;
  margin-bottom: 5px;
}

.timeline-text {
  font-size: 15px;
  color: #555555;
  line-height: 1.6;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background-color: #F5F7FA;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-3px);
  background-color: #E8F0FE;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #0F4C81;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 15px;
  color: #666666;
}

.sub-section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 15px;
}

.talent-groups {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

@media (min-width: 600px) {
  .talent-groups {
    grid-template-columns: repeat(4, 1fr);
  }
}

.talent-group {
  background-color: #F9FAFB;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  border: 1px solid #E5E7EB;
  transition: all 0.3s ease;
}

.talent-group:hover {
  border-color: #1A73E8;
  box-shadow: 0 4px 12px rgba(26, 115, 232, 0.08);
}

.group-title {
  font-size: 13px;
  color: #666666;
  margin-bottom: 5px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.group-count {
  font-size: 18px;
  font-weight: 600;
  color: #0F4C81;
}


/* 考研数据图表样式 */
.admission-section {
  padding-top: 0;
}

.chart-container {
  background-color: #fbfbfb;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) inset;
}

.chart-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.liquid-chart {
  width: 100%;
  max-width: 300px;
  height: 250px;
  margin: 0 auto;
}

.chart-info {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-top: 20px;
}

.info-item {
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.info-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.info-value {
  font-size: 22px;
  font-weight: 600;
  color: #0F4C81;
}

.ratio {
  color: #E6A23C;
}

.card-footer {
  height: 15px;
  background: linear-gradient(135deg, #0F4C81 0%, #1A73E8 100%);
}

.footer-decoration {
  height: 100%;
  background-image: linear-gradient(90deg, rgba(255,255,255,0.1) 50%, transparent 50%);
  background-size: 20px 100%;
}

.debug-border {
  border: 1px dashed red;
}

/* 科研平台部分样式优化 */
.research-platforms {
  margin-top: 25px;
}

.platforms-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

@media (min-width: 600px) {
  .platforms-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.platform-item {
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.platform-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.platform-icon {
  width: 32px;
  height: 32px;
  background-color: #e2e8f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: #475569;
  flex-shrink: 0;
}

.platform-name {
  font-size: 14px;
  color: #334155;
  line-height: 1.4;
}

/* 学科建设部分样式优化 */
.discipline-section {
  margin-top: 25px;
}

.discipline-item {
  margin-bottom: 12px;
  display: flex;
  flex-wrap: wrap;
}

.discipline-label {
  font-weight: 600;
  color: #0f172a;
  min-width: 130px;
  margin-right: 8px;
}

.discipline-content {
  color: #334155;
}
</style>    