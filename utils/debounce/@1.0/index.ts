/**
 * 防抖函数
 * @param target 目标函数
 * @param delay 延时时间，默认是500毫秒
 */
export default <T extends Function>(target: T, delay = 500) => {
  let timer = -1;

  const wrapper: unknown = (...params: any[]) => {
    if (timer > 0) {
      return;
    }

    timer = window.setTimeout(() => {
      window.clearTimeout(timer);
      timer = -1;
    }, delay);
    return target && target(...params);
  };

  return wrapper as T;
};
