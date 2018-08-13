import VueRouter from 'vue-router';
import Login from '@/views/Login';
import Home from '@/views/Home';
import Users from '@/views/Users';
import Courses from '@/views/Courses';

import userStore, { UserInfo } from '@/stores/userStore';

const routes = [
  { path: '/home', component: Home, name: 'home' },
  { path: '/login', component: Login, name: 'login' },
  { path: '/users', component: Users, name: 'users'},
  { path: '/courses', component: Courses, name: 'courses'},
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
