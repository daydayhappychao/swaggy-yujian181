import VueRouter from 'vue-router';
import Login from '@/views/Login';
import Home from '@/views/Home';
import BusinessCate from '@/views/BusinessCate';
import BusinessInfo from '@/views/BusinessInfo';
import YoungCardNopass from '@/views/YoungCardNopass'

import userStore, { UserInfo } from '@/stores/userStore';

const routes = [
  { path: '/home', component: Home, name: 'home' },
  { path: '/login', component: Login, name: 'login' },
  { path: '/businessCate', component: BusinessCate, name: 'businessCate' },
  { path: '/businessInfo', component: BusinessInfo, name: 'businessInfo' },
  { path: '/youngCardNopass', component: YoungCardNopass, name: 'youngCardNopass' },
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
