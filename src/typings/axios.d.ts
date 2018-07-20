import Vue from 'vue';

declare global {
  interface AxiosResponse<T = any> {
    entity: Vue
  }
}