import Vue from 'vue';
import { CombinedVueInstance } from 'vue/types/vue';
import axios from 'axios';

export default (entity: CombinedVueInstance<Vue, object, object, object, Record<never, any>>) => {
  axios.interceptors.response.use((response) => {
    try {
      if ((response.data.status !== 0) && response.data.message) {
        entity.$notify.info(response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
    return response;
  }, (error: any) => {
    return Promise.reject(error);
  });
}