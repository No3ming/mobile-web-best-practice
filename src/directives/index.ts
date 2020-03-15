import Vue from 'vue';
import { importAll } from '@/utils/common-tools';
// 以前怎么不知道 require.context() 可以像nodejs一样读取本地文件
const directvieContext = require.context('./', false, /\.ts$/);
const directives = importAll(directvieContext, {
  filterFunc: (key: string) => key !== './index.ts',
  keyTransformFunc: (key: string) =>
    key.replace(/^\.\//, '').replace(/\.ts$/, '')
});

// 一句话，获取所有要注册的指令，注册一遍
export default {
  install(vue: typeof Vue): void {
    Object.keys(directives).forEach((key) =>
      vue.directive(key, directives[key])
    );
  }
};
