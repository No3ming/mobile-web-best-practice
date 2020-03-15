// https://github.com/sindresorhus/mem#readme 缓存
import mem from 'mem';

/**
 * @param {MemOption} - mem 配置项
 * @return {Function} - 装饰器
 * @use 用于缓存部分接口请求函数或其他函数
 */
export default function m(options: AnyObject) {
  return (target: AnyObject, name: string, descriptor: PropertyDescriptor) => {
    console.log(target);
    console.log(name);
    console.log(descriptor);
    const oldValue = descriptor.value;
    descriptor.value = mem(oldValue, options);
    return descriptor;
  };
}
