import { Vue, Component, Prop } from 'vue-property-decorator';
import { observer } from 'mobx-vue';
import tabBar from '@/common/tabBar';
import layoutStore from '@/stores/layout';
import { BAR_ACTIVE_COLOR, BAR_BACKGROUND_COLOR, BAR_TEXT_COLOR } from '@/common/constant';

@observer
@Component
export default class Left extends Vue {
  constructor(props:any){
    super(props);
  }
  public render() {
    return (
      <el-menu
        default-active='1'
        class='el-menu-vertical-demo'
        background-color={BAR_BACKGROUND_COLOR}
        text-color={BAR_TEXT_COLOR}
        active-text-color={BAR_ACTIVE_COLOR}
        collapse={layoutStore.collapse}
      >
        <el-menu-item index='0'>
          <i class='fa fa-home'></i>
          <span slot='title'>首页</span>
        </el-menu-item>
        {
          tabBar.map((menu, index) => (
            <el-submenu key={index} index={index.toString()}>
              <template slot='title'>
                <i class={menu.icon}></i>
                <span slot='title'>{menu.name}</span>
              </template>
              <el-menu-item-group >
                {
                  menu.children.map((child, indexx) => (
                    <el-menu-item
                      index={`${index}-${indexx}`}
                      key={indexx}
                      onClick={() => {
                        this.$router.push(child.path);
                      }}
                    >
                      {child.name}
                    </el-menu-item>
                  ))
                }
              </el-menu-item-group>
            </el-submenu>
          ))
        }
      </el-menu>
    );
  }
}
