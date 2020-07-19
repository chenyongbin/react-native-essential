import AppCacheBase from "./AppCacheBase";

/**
 * AppCache类
 */
class AppCache extends AppCacheBase {
  constructor(appName: string) {
    super(appName);
    this.get = this.get.bind(this);
    this.set = this.set.bind(this);
    this.remove = this.remove.bind(this);
  }

  get(key: string) {
    return Promise.resolve(localStorage.getItem(this.buildKey(key)));
  }

  set(key: string, value: string) {
    return Promise.resolve(localStorage.setItem(this.buildKey(key), value));
  }

  remove(key: string) {
    return Promise.resolve(localStorage.removeItem(this.buildKey(key)));
  }
}

/**
 * AppCacheProvider，执行该函数获得AppCache类实例
 * @param appName 项目app名称，用于区分不同App的数据
 */
export default (appName: string) => new AppCache(appName);
