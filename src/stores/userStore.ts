import { observable, action, computed } from 'mobx';

class UserStore {
  @observable public userInfo = {
    username: '',
  };
}
export default new UserStore();