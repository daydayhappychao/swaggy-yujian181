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
  @observable public userList:any[] = [];
  @action public login = (username: string, password: string) => {
    service.actionLogin({ username, password }).then((res) => {
      if (res.data.status === 0) {
        this.userInfo.username = res.data.message.username;
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
        router.push('/');
      }
    });
  }

  @action public setUserInfo = (userInfo: UserInfo) => {
    this.userInfo = userInfo;
  }

  @action public logout = () => {
    debugger;
    this.userInfo.username = '';
    localStorage.clear();
    router.push('/login');
  }

  @action getUsers = () => {
    service.actionGetUsers({}).then(res=>{
      this.userList = res.data;
    })
  }

}
export default new UserStore();
