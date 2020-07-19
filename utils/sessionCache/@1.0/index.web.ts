import SessionCacheLike from "./SessionCacheLike";

/**
 * 缓存实体类
 */
interface SessionCacheEntity<T> {
  value: T;
}

/**
 * 获取项目名称
 * 1. 先检查window对象有没有对应变量名称__rnweb_appname
 * 2. 如果window对象没有，解析出当前页面地址的子路径，并将其视为项目名称
 */
const getAppName = () => {
  let appName = (window as any)["__rnweb_appname"];
  if (!!appName) {
    return (appName + "").toUpperCase();
  }

  if (location.pathname) {
    const path = location.pathname.substr(1),
      slashIndex = path.indexOf("/");

    if (slashIndex == -1) {
      const dotIndex = path.indexOf(".");
      if (dotIndex == -1) {
        appName = path;
      } else {
        appName = path.substr(0, dotIndex);
      }
    } else {
      appName = path.substr(0, slashIndex);
    }

    appName && (appName = appName.toUpperCase());
  }

  return appName;
};

/**
 * 当前项目名称
 */
const appName = getAppName() || "ESSENTIAL";
/**
 * 包装缓存key
 * @param key 原始key
 */
const buildKey = (key: string) => `RN_WEB_${appName}_${key}`;

const get = <T = string>(key: string): T | undefined => {
  try {
    key = buildKey(key);
    const { value } = JSON.parse(
      sessionStorage.getItem(key) || ""
    ) as SessionCacheEntity<T>;
    return value;
  } catch (error) {
    return undefined;
  }
};

const set = <T>(key: string, value: T): boolean => {
  const wrapper: SessionCacheEntity<T> = { value };
  try {
    key = buildKey(key);
    sessionStorage.setItem(key, JSON.stringify(wrapper));
    return true;
  } catch (error) {
    return false;
  }
};

const remove = (key: string) => sessionStorage.removeItem(buildKey(key));

const clear = () => {
  if (sessionStorage.length <= 0) {
    return;
  }

  const allKeys: string[] = [],
    count = sessionStorage.length;

  // 找到当前项目的所有key
  for (let i = 0; i < count; i++) {
    const key = sessionStorage.key(i);
    if (!key) {
      break;
    }
    if (key.indexOf(appName) != -1) {
      allKeys.push(key);
    }
  }

  // 删除缓存
  if (allKeys.length > 0) {
    allKeys.forEach((k) => sessionStorage.removeItem(k));
  }
};

const webSessionCache: SessionCacheLike = { get, set, remove, clear };

export default webSessionCache;
