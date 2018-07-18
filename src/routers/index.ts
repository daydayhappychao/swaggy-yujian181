import userStore from '@/stores/userStore';


import VueRouter from 'vue-router';
import Login from '@/views/Login';
import Home from '@/views/Home';

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/', component: Home, name: 'home' },
];
const router = new VueRouter({
  routes,
  mode: 'hash',
});
router.beforeEach((to, from, next) => {
  if ((to.name !== 'login') && !userStore.userInfo.username) {
    next({ path: '/login' });
  } else {
    next();
  }
});
export default router;
