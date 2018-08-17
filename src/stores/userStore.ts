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
  @observable public userList: any[] = [];
  @observable public userPage = 1;
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
    this.userInfo.username = '';
    localStorage.clear();
    router.push('/login');
  }

  @action getUsers = (page: number) => {
    service.actionGetUsers({ page:page }).then(res => {
      this.userPage = res.data.total;
      this.userList = res.data.data;
    })
  }

  @action createUser = (data: any, page: number) => {
    service.actionCreateUser(data).then(res => {
      if (res.data.status === 0) {
        this.getUsers(page);
      }
    });
  }

  @action delUser = (id: number, page: number) => {
    service.actionDelUser(id)({}).then(res => {
      if (res.data.status === 0) {
        this.getUsers(page);
      }
    })
  }
}
export default new UserStore();
