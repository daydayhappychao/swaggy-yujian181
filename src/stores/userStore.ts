import { observable, action, computed } from 'mobx';
import * as service from '@/service';
import router from '@/routers';

export interface UserInfo {
  username: string;
}

class UserStore {
  @observable public userInfo: UserInfo = {
    username: '',
  };

  @action public login = (username: string, password: string) => {
    service.actionLogin({ username, password }).then((res) => {
      if (res.data.status === 0) {
        this.userInfo.username = res.data.message.username;
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
        router.push('/');
      }
    });
  }

  @observable public setUserInfo = (userInfo: UserInfo) => {
    this.userInfo = userInfo;
  }

  @observable public logout = () => {
    this.userInfo.username = '';
    localStorage.clear();
    router.push('/login');
  }

}
export default new UserStore();
