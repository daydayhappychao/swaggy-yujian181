import { observable, action, computed } from 'mobx';
import axios from 'axios';

class BusinessStore {
  @observable public cateList: any[] = [];
  @observable public infoList: any[] = [];


  @action public getCateList = () => {
    axios.get('/api/listBusinessCate').then(this.setCateList);
  }
  @action public createCate = (name: string, weight: number, id?: string) => {
    axios.post(`/api/createBusinessCate${id ? '/' + id : ''}`, { name, weight }).then(this.setCateList);
  }

  @action public deleteCate = (id: string) => {
    axios.post(`/api/deleteBusinessCate/${id}`).then(this.setCateList);
  }

  @action public createInfo = (data: { [ket: string]: any }) => {
    axios.post(`/api/createBusinessInfo${data.id ? '/' + data.id : ''}`, data).then(this.setInfoList);
  }
  @action public getInfoList = () => {
    axios.get('/api/listBusinessInfo').then(this.setInfoList);
  }

  @action public deleteInfo = (id: string) => {
    axios.post(`/api/deleteBusinessInfo/${id}`).then(this.setInfoList);
  }

  private setCateList = (res: any) => {
    if (Array.isArray(res.data)) {
      this.cateList = res.data as any[];
    }
  }
  private setInfoList = (res: any) => {
    if (Array.isArray(res.data)) {
      this.infoList = res.data as any[];
    }
  }


}
export default new BusinessStore();
