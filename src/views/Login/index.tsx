import { Vue, Component } from 'vue-property-decorator';
import './index.scss';
@Component
export default class Login extends Vue {
  private loginForm = {
    username: 'admin',
    password: '1111111',
  };
  public render() {
    const $t = (word: string) => word;
    return (
      <div class='login-container'>
        <el-form class='login-form' autoComplete='on' ref={this.loginForm} label-position='left'>

          <div class='title-container'>
            <h3 class='title'>欢迎登录后台管理系统</h3>
          </div>

          <el-form-item prop='username'>
            <el-input
              name='username'
              type='text'
              v-model={this.loginForm.username}
              autoComplete='on'
              placeholder='用户名'
            />
          </el-form-item>

          <el-form-item prop='password'>
            <el-input name='password' type='password' v-model={this.loginForm.password} autoComplete='on'
              placeholder='密码' />
          </el-form-item>

          <el-button
            type='primary'
            style='width:100%;margin-bottom:30px;'
            onClick={() => { console.log(this.loginForm); }}>登录</el-button>
        </el-form>
      </div>
    );
  }
}
