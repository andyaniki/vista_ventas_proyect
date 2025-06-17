import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '@/componente/Authentication/LoginForm.vue';
import DashboardView from '@/views/DashboardView.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginForm },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
