interface Menu {
  icon: string;
  name: string;
  children: Array<{ name: string, path: string }>;
}

const menu: Menu[] = [
  {
    icon: 'el-icon-location',
    name: '用户',
    children: [
      {
        name: '用户',
        path: '/users',
      }
    ],
  },
  {
    icon: 'el-icon-edit-outline',
    name: '课程',
    children: [
      {
        name: '课程',
        path: '/courses',
      }
    ],
  },
];
export default menu;
