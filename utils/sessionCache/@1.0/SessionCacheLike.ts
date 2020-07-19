/**
 * 会话缓存接口
 */
export default interface SessionCacheLike {
  /**
   * 获取缓存值
   * @param key 存储key
   */
  get: <T = string>(key: string) => T | undefined;
  /**
   * 设置会话缓存
   * @param key 存储key
   * @param value 存储值
   */
  set: <T = string>(key: string, value: T) => boolean;
  /**
   * 移除其中一项
   * @param key 存储key
   */
  remove: (key: string) => void;
  /**
   * 清除所有会话缓存
   * 1. web版只会清除同一个项目的缓存
   */
  clear: () => void;
}
