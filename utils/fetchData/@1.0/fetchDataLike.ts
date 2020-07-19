interface fetchDataOptions {
  /**
   * 超时毫秒数(默认10秒)，传0时代表不设超时逻辑
   */
  timeoutMilliseconds?: number;
  /**
   * 使用jsonp方式时的回调名称，默认是callback
   */
  callbackName?: string;
}

interface fetchDataLike {
  /**
   * 拉取数据方法
   * 1. 此方法适用那些不支持跨域的接口
   * 2. 在`RN`平台使用`get`方法
   * 3. 在`web`平台使用`jsonp`方法
   *
   * @param url 请求地址
   * @param options 请求配置
   */
  (url: string, options?: fetchDataOptions): Promise<any>;
}

/**
 * 默认超时毫秒数
 */
const defaultTimeoutMilliseconds = 10 * 1000;

export { fetchDataOptions, fetchDataLike, defaultTimeoutMilliseconds };
