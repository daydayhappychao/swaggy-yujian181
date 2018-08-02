import { action } from 'mobx';
import Store from './store';

class Layout extends Store {
    @action setCollapse = (val: boolean) => {
        this.collapse = val;
    }
}
export default new Layout();