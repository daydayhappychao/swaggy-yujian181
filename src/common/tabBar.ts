interface Menu {
  icon: string;
  name: string;
  children: Array<{ name: string, path: string }>;
}

const menu: Menu[] = [
  {
    icon: 'el-icon-location',
    name: '主页',
    children: [
      {
        name: '登录',
        path: '/login',
      },
      {
        name: '测试2',
        path: '/home',
      },
    ],
  },
];
export default menu;
