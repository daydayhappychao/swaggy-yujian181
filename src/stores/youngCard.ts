import { observable, action } from 'mobx';
import axios from 'axios';

class YoungCard {
  @observable public nopassList: any[] = [];

  @action public getNopass = (status: number) => {
    axios.get('/api/getYoungCardByStatus?status=' + status).then(res => {
      if (res.data instanceof Array) {
        this.nopassList = res.data;
      }
    });
  }

  @action public updateYoungCard = (id: string, status: number) => {
    axios.post('/api/updateYoungCard/' + id, { status }).then(res => {
      if (res.data instanceof Array) {
        this.nopassList = res.data;
      }
    });
  }
}

export default new YoungCard();
