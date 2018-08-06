interface Menu {
  icon: string;
  name: string;
  children: Array<{ name: string, path: string }>;
}

const menu: Menu[] = [
  {
    icon: 'el-icon-location',
    name: '商家',
    children: [
      {
        name: '商家分类',
        path: '/businessCate',
      },
      {
        name: '商家信息',
        path: '/businessInfo',
      },
    ],
  },
  {
    icon: 'el-icon-edit-outline',
    name: '青年卡',
    children: [
      {
        name: '未审核',
        path: '/youngcardNopass',
      },
      {
        name: '已审核',
        path: '/youngcardPass',
      },
    ],
  },
];
export default menu;
