import SessionCacheLike from "./SessionCacheLike";

/**
 * 缓存对象
 */
const Cache = new Map<string, any>();

const get = <T = string>(key: string): T | undefined => Cache.get(key) as T;

const set = <T>(key: string, value: T): boolean => {
  try {
    Cache.set(key, value);
    return true;
  } catch (error) {
    return false;
  }
};

const remove = (key: string) => Cache.delete(key);

const clear = () => Cache.clear();

/**
 * 缓存对象
 */
const nativeSessionCache: SessionCacheLike = { get, set, remove, clear };

export default nativeSessionCache;
