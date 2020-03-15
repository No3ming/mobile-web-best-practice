import Vue from 'vue';
import { Toast, Dialog } from 'vant';

import App from './App.vue';
import router from './router';
// 错误上报模块
import Report from './utils/report';
// 混合事件
import GlobalMethods from './utils/global-method';
// mock 假数据
import initMockService from '@/mocks';
// initPlatform 将一些设备信息放在window下
import { initPlatform } from '@/utils/common-tools';
// 指令管理模块
import Directives from '@/directives';
// 配置信息
import LocalConfig from '@/config.json';

const IS_DEV = process.env.NODE_ENV === 'development';
// 配置数据上报
if (LocalConfig.SentryEnabled && !IS_DEV) {
  const sentry = Report.getInstance(Vue, {
    dsn: LocalConfig.SentryDSN,
    release: __VERSION__, // from webpack DefinePlugin
    environment: 'Prod'
  });

  window.$sentry = sentry;

  // 全局监控 Vue errorHandler
  Vue.config.errorHandler = (error, vm, info) => {
    window.$sentry.log({
      error,
      type: 'vue errorHandler',
      vm,
      info
    });
  };
}
// 是否使用mocks配置
if (LocalConfig.MockEnabled) {
  initMockService();
}

initPlatform();

Vue.config.productionTip = false;

Vue.use(GlobalMethods)
  .use(Directives)
  .use(Toast)
  .use(Dialog);

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app');
