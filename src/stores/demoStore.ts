import { observable, action, computed } from 'mobx';

class DemoStore {
    @observable public color = 'red';
    @action public changeColor = () => {
        this.color = this.color === 'red' ? 'green' : 'red';
    }
}
export default new DemoStore();