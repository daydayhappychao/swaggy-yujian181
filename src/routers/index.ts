import VueRouter from 'vue-router';
import Login from '@/views/Login';
import Home from '@/views/Home';

const routes = [
  {path: '/login', component: Login, name: 'login'},
  {path: '/', component: Home, name: 'home'},
];
export default new VueRouter({
  routes,
  mode: 'hash',
});
