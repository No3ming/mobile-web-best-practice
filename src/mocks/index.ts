import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export default function initMockService() {
  const mock = new MockAdapter(axios);
  const modulesContext = require.context('./modules/', false, /\.ts$/);
  // 获取'./modules/下的所有文件，设置为mock'
  modulesContext.keys().forEach((key) => {
    if (modulesContext(key).default) {
      modulesContext(key).default(mock);
    }
  });
}
