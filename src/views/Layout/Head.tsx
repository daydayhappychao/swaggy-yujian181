import {Vue, Component} from 'vue-property-decorator';
import {observer} from 'mobx-vue';
import userStore from '@/stores/userStore';
import userMenu from '@/common/userMenu';
import layoutStore from '@/stores/layout';
import { BAR_BACKGROUND_COLOR, BAR_TEXT_COLOR } from '@/common/constant';

@observer
@Component
export default class Head extends Vue {
    constructor(props:any){
        super(props);
    }
    public handleUserDropdown = (command: number) => {
        userMenu[command].method();
      }
    render(){
        return(
            <el-header style={{
                fontSize: '12px',
                background: BAR_BACKGROUND_COLOR,
                color: BAR_TEXT_COLOR,
                display: 'flex',
              }}>
                <div
                  class='bg-blue'
                  style={{
                    height: '100%',
                    lineHeight: '60px',
                  }}>
                  <span class='font-primary' style={{ fontWeight: 'bold' }}>Swaggy YuJian</span>
                  <i
                    class='el-icon-more'
                    style={{ marginLeft: '10px', cursor: 'pointer' }}
                    onClick={layoutStore.setCollapse.bind(layoutStore, !layoutStore.collapse)}></i>
                </div>
                <div style={{ flex: 1 }}></div>
                <div>
                  <el-dropdown onCommand={this.handleUserDropdown}>
                    <i class='el-icon-setting' style={{ marginRight: '15px', color: BAR_TEXT_COLOR }}></i>
                    <el-dropdown-menu slot='dropdown'>
                      {
                        userMenu.map((v, k) =>
                          <el-dropdown-item
                            command={k}>
                            {v.name}
                          </el-dropdown-item>,
                        )
                      }
                    </el-dropdown-menu>
                  </el-dropdown>
                  <span>{userStore.userInfo.username}</span>
                </div>
              </el-header>
        )
    }
}