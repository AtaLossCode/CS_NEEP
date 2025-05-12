import { createRouter, createWebHistory } from 'vue-router';
// import App from '../App.vue';
import Home from '../components/Home.vue';
import SCU from '../components/SCU.vue';
import UESTC from '../components/UESTC.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/university/scu',
    name: 'SCU',
    component: SCU,
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