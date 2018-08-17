import { observable, action, computed } from 'mobx';
import * as service from '@/service';
class DemoStore {
    @observable public courses: any[] = [];
    @observable public coursePage = 1;

    @observable public videos: any[] = [];


    @action public getCourses = (page: number) => {
        service.actionGetCourses({ page }).then(res => {
            this.courses = res.data.data;
            this.coursePage = res.data.total;
        })
    }

    @action create = (data: any, page: number) => {
        service.actionCreateCourses(data).then(res => {
            if (res.data.status === 0) {
                this.getCourses(page);
            }
        });
    }

    @action delete = (id: number, page: number) => {
        service.actionDelCourses(id)({}).then(res => {
            if (res.data.status === 0) {
                this.getCourses(page);
            }
        })
    }

    @action public getVideos = (id: any) => {
        service.actionGetVideos({ id }).then(res => {
            this.videos = res.data;
        })
    }

    @action public createVideos = (data: any, id: any) => {
        service.actionCreateVideoss(Object.assign({}, data, { course_id: id })).then(res => {
            if (res.data.status === 0) {
                this.getVideos(id);
            }
        });
    }
    @action deleteVideo = (id: number, course_id: number) => {
        service.actionDelVideosss(id)({}).then(res => {
            if (res.data.status === 0) {
                this.getVideos(course_id);
            }
        })
    }
}
export default new DemoStore();