import { Vue, Component } from 'vue-property-decorator';
import Left from './Left';
import Head from './Head'
import { observer } from 'mobx-vue';
import './index.scss';

@observer
@Component
export default class Layout extends Vue {
  private collapse = true;

  public render() {
    return (
      <el-container style='height: 100vh; border: 1px solid #eee'>
       <Head />
        <el-container>
          <el-aside
            width='auto'
            class='left-bar-container'
          >
            <Left />
          </el-aside>
          <el-main>
            {this.$slots.default}
          </el-main>
        </el-container>
      </el-container>
    );
  }
}
