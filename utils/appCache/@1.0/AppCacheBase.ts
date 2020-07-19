/**
 * AppCache基类
 */
export default abstract class AppCacheBase {
  /**
   * 构造函数
   * @param appName app名称
   */
  constructor(private readonly appName: string) {
    this.buildKey = this.buildKey.bind(this);
  }

  /**
   * 包装真正存储的key
   * @param key 存储key
   */
  protected buildKey(key: string) {
    return `${this.appName}_AppCache_${key}`;
  }

  /**
   * 获取存储值
   * @param key 存储key
   */
  abstract get(key: string): Promise<string | null>;

  /**
   * 设置存储值
   * @param key 存储key
   * @param value 存储值
   */
  abstract set(key: string, value: string): Promise<void>;

  /**
   * 移除存储项
   * @param key 存储key
   */
  abstract remove(key: string): Promise<void>;
}
