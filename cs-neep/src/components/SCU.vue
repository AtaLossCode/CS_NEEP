<template>
  <div class="homepage">
    <!-- 顶部标题部分 -->
    <div class="header">
      <button class="back-button" @click="goToHome">返回首页</button>
      <div class="title">
        <span class="main-title">计研视界</span>
        <span class="sub-title">全国985院校计算机考研数据可视化</span>
      </div>
    </div>
    <!-- 内容区，背景为 #F5F5F5 -->
    <div class="content">
      <div class="graph-container">
        <svg class="network-graph" width="800" height="600" viewBox="0 0 800 600" @mousemove="onMouseMove" @mouseup="onMouseUp">
          <!-- 连线 -->
          <line :x1="nodes[0].x" :y1="nodes[0].y" :x2="nodes[1].x" :y2="nodes[1].y" stroke="#666" stroke-width="2" />
          <line :x1="nodes[0].x" :y1="nodes[0].y" :x2="nodes[2].x" :y2="nodes[2].y" stroke="#666" stroke-width="2" />
          <line :x1="nodes[1].x" :y1="nodes[1].y" :x2="nodes[3].x" :y2="nodes[3].y" stroke="#666" stroke-width="2" />
          <line :x1="nodes[1].x" :y1="nodes[1].y" :x2="nodes[4].x" :y2="nodes[4].y" stroke="#666" stroke-width="2" />
          <line :x1="nodes[1].x" :y1="nodes[1].y" :x2="nodes[5].x" :y2="nodes[5].y" stroke="#666" stroke-width="2" />
          <line :x1="nodes[2].x" :y1="nodes[2].y" :x2="nodes[6].x" :y2="nodes[6].y" stroke="#666" stroke-width="2" />
          <line :x1="nodes[2].x" :y1="nodes[2].y" :x2="nodes[7].x" :y2="nodes[7].y" stroke="#666" stroke-width="2" />
          
          <!-- 节点 -->
          <g v-for="(node, index) in nodes" :key="index" class="node" @mousedown="startDrag(index, $event)">
            <circle :cx="node.x" :cy="node.y" :r="node.r" :fill="node.color" />
            <text :x="node.x" :y="node.y + (node.r === 80 ? 5 : node.r === 50 ? 5 : 5)" text-anchor="middle" fill="white" :font-size="node.r === 80 ? 20 : node.r === 50 ? 16 : 14">{{ node.label }}</text>
          </g>
        </svg>
      </div>
      
      <!-- 弹窗 -->
      <div v-if="showPopupContent" class="popup">
        <div class="popup-content">
          <component :is="activePopupComponent" v-if="activePopupComponent" />
          <!-- <template v-else>
            <h2>{{ activePopupLabel }}</h2>
            <p>这里是 {{ activePopupLabel }} 的详细信息。</p>
          </template> -->
          <button @click="closePopup">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { defineAsyncComponent } from 'vue';

// 动态导入弹窗组件
const popupComponents = {
  '综合实力': defineAsyncComponent(() => import('@/components/popups/TolStrength.vue')),
  '细分专业': defineAsyncComponent(() => import('@/components/popups/SubMajors.vue')),
  '师资概况': defineAsyncComponent(() => import('@/components/popups/TeachersIntro.vue')),
  '分数线': defineAsyncComponent(() => import('@/components/popups/MinScore.vue')),
  '报录比': defineAsyncComponent(() => import('@/components/popups/AdmissionRatio.vue')),
};

const router = useRouter();

const showPopupContent = ref(false);
const activePopupLabel = ref('');
const activePopupComponent = computed(() => {
  return popupComponents[activePopupLabel.value];
});

const nodes = reactive([
  { x: 400, y: 300, r: 80, color: '#1E4BC0', label: '四川大学' },
  { x: 200, y: 300, r: 50, color: '#537BF7', label: '专业概况' },
  { x: 600, y: 300, r: 50, color: '#537BF7', label: '报考情况' },
  { x: 100, y: 150, r: 40, color: '#93AFF9', label: '综合实力' },
  { x: 10, y: 300, r: 40, color: '#93AFF9', label: '细分专业' },
  { x: 100, y: 450, r: 40, color: '#93AFF9', label: '师资概况' },
  { x: 700, y: 200, r: 40, color: '#93AFF9', label: '分数线' },
  { x: 700, y: 400, r: 40, color: '#93AFF9', label: '报录比' }
]);

const draggingNode = ref(null);
const offset = ref({ x: 0, y: 0 });
const startPos = ref({ x: 0, y: 0 });
const startTime = ref(0);
const isDragging = ref(false);

const startDrag = (index, event) => {
  event.preventDefault();
  draggingNode.value = index;
  startTime.value = Date.now();
  const rect = event.target.closest('svg').getBoundingClientRect();
  startPos.value = {
    x: event.clientX / (rect.width / 800),
    y: event.clientY / (rect.height / 600)
  };
  offset.value = {
    x: startPos.value.x - nodes[index].x,
    y: startPos.value.y - nodes[index].y
  };
};

const onMouseMove = (event) => {
  if (draggingNode.value !== null) {
    const rect = event.target.closest('svg').getBoundingClientRect();
    const currentX = event.clientX / (rect.width / 800);
    const currentY = event.clientY / (rect.height / 600);
    
    const distance = Math.sqrt(
      Math.pow(currentX - startPos.value.x, 2) + 
      Math.pow(currentY - startPos.value.y, 2)
    );
    if (distance > 5) {
      isDragging.value = true;
    }

    if (isDragging.value) {
      nodes[draggingNode.value].x = Math.max(0, Math.min(800, currentX - offset.value.x));
      nodes[draggingNode.value].y = Math.max(0, Math.min(600, currentY - offset.value.y));
    }
  }
};

const onMouseUp = (event) => {
  if (draggingNode.value !== null) {
    const index = draggingNode.value;
    const timeDiff = Date.now() - startTime.value;
    const rect = event.target.closest('svg').getBoundingClientRect();
    const endX = event.clientX / (rect.width / 800);
    const endY = event.clientY / (rect.height / 600);
    const distance = Math.sqrt(
      Math.pow(endX - startPos.value.x, 2) + 
      Math.pow(endY - startPos.value.y, 2)
    );

    if (timeDiff < 300 && distance < 5 && [3, 4, 5, 6, 7].includes(index)) {
      showPopup(nodes[index].label);
    }

    draggingNode.value = null;
    isDragging.value = false;
  }
};

const globalMouseUp = () => {
  draggingNode.value = null;
  isDragging.value = false;
};

onMounted(() => {
  document.addEventListener('mouseup', globalMouseUp);
});

onUnmounted(() => {
  document.removeEventListener('mouseup', globalMouseUp);
});

const showPopup = (label) => {
  if (popupComponents[label] !== undefined) {
    activePopupLabel.value = label;
    showPopupContent.value = true;
  }
};

const closePopup = () => {
  showPopupContent.value = false;
  activePopupLabel.value = '';
};

// 跳转到首页
const goToHome = () => {
  router.push('/');
};
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
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.back-button {
  position: absolute;
  left: 20px;
  padding: 10px 20px;
  background-color: #1E4BC0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.back-button:hover {
  background-color: #537BF7;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-title {
  font-size: 36px;
  font-weight: bold;
  color: #333;
}

.sub-title {
  font-size: 18px;
  color: #666;
}

/* 内容区：占据剩余高度，背景色 #F5F5F5 */
.content {
  flex: 1;
  background-color: #F5F5F5;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.graph-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.network-graph {
  width: 100%;
}

.node {
  cursor: pointer;
}

.node:hover circle {
  opacity: 0.8;
}

/* 弹窗样式 */
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background-color: white;
  padding: 30px;
  width: 70%;
  height: 90%;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
}

.popup-content h2 {
  margin-top: 0;
  font-size: 24px;
}

.popup-content p {
  font-size: 16px;
}

.popup-content button {
  margin-top: 20px;
  padding: 12px 24px;
  background-color: #1E4BC0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.popup-content button:hover {
  background-color: #537BF7;
}
</style>