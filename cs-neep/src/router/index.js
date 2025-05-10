import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import SichuanUniversity from './components/SichuanUniversity.vue';
import UESTC from './components/UESTC.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App,
  },
  {
    path: '/university/sichuan-university',
    name: 'SichuanUniversity',
    component: SichuanUniversity,
  },
  {
    path: '/university/uestc',
    name: 'UESTC',
    component: UESTC,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;