import { Vue, Component } from 'vue-property-decorator';
import axios from 'axios';
import './index.scss';

@Component
export default class Login extends Vue {
  private loginForm = {
    username: '',
    password: '',
  };
  public loginAction = () => {
    (this.$refs.loginForm as Vue).validate((valid: boolean) => {
      if (valid) {
        axios.post('/api/login', this.loginForm).then(data => {
          console.log(data);
        })
      } else {
        this.$notify.info('请输入正确的用户名和密码!');
      }
    });
  }
  public render() {
    return (
      <div class='login-container'>
        <el-form model={this.loginForm} class='login-form' autoComplete='on' ref='loginForm' label-position='left'>
          <div class='title-container'>
            <h3 class='title'>欢迎登录后台管理系统</h3>
          </div>
          <el-form-item
            rules={[
              { required: true, message: '用户名不能为空' },
            ]}
            prop='username'>
            <el-input
              name='username'
              type='text'
              v-model={this.loginForm.username}
              autoComplete='on'
              placeholder='用户名'

            />
          </el-form-item>

          <el-form-item
            prop='password'
            rules={[
              { required: true, message: '密码不能为空' },
            ]}>
            <el-input name='password' type='password' v-model={this.loginForm.password} autoComplete='on'

              placeholder='密码' />
          </el-form-item>

          <el-button
            type='primary'
            style='width:100%;margin-bottom:30px;'
            onClick={this.loginAction}>登录</el-button>
        </el-form>
      </div>
    );
  }
}
