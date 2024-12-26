import { createRouter, createWebHistory } from 'vue-router';

import AdminView from '../components/AdminView.vue';
import LibrarianView from '../components/LibrarianView.vue';
import ClientView from '../components/ClientView.vue';
import LoginView from '../components/LoginView.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/librarian',
    name: 'librarian',
    component: LibrarianView,
    meta: { requiresAuth: true, role: 'librarian' }
  },
  {
    path: '/client',
    name: 'client',
    component: ClientView,
    meta: { requiresAuth: true, role: 'client' }
  }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes
  });
  
  

// Защита маршрутов
router.beforeEach((to, _, next) => {
  const userRole = localStorage.getItem('role'); 
  if (to.meta.requiresAuth && (!userRole || to.meta.role !== userRole)) {
    next({ name: 'login' });
  } else {
    next();
  }
})

export default router;
