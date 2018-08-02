import VueRouter, { RouteConfig } from 'vue-router';
import userStore, { UserInfo } from '@/stores/userStore';

// const routes: RouteConfig[] = [
const routes: any[] = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: import('@/views/Home'), name: 'home' },
  { path: '/login', component: import('@/views/Login'), name: 'login' },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  if ((to.name !== 'login') && !userStore.userInfo.username) {
    const localUserInfo = localStorage.getItem('userInfo');
    if (localUserInfo) {
      try {
        const userInfo = JSON.parse(localUserInfo) as UserInfo;
        userStore.setUserInfo(userInfo);
        next();
      } catch (e) {
        next({ name: 'login' });
      }
    } else {
      next({ name: 'login' });
    }
  } else if ((to.name === 'login') && (userStore.userInfo.username || localStorage.getItem('userInfo'))) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
