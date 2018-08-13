import { observable, action, computed } from 'mobx';
import * as service from '@/service';
class DemoStore {
    @observable public courses:any[] = [];
    @action public getCourses = ()=>{
       service.actionGetCourses({}).then(res=>{
        this.courses = res.data;
       })
    }
}
export default new DemoStore();