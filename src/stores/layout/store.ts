import {observable,action} from "mobx";

export default class LayoutStore {
    /**
     * 左侧tab栏是否隐藏
     *
     * @type {boolean}
     * @memberof LayoutStore
     */
    @observable collapse:boolean = false;
}

