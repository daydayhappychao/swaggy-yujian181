import Vue from 'vue';

declare module '*.vue' {
  export default Vue;
}

// 全局变量设置
declare global {
  interface Element {
    validate: any
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    validate: any
  }
}