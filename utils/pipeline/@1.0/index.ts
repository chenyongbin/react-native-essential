/**
 * @author chenyongbin
 * @date 2019-11-1
 * @description 管道方法模块
 * @description https://juejin.im/post/5dbd2c426fb9a020594d12ee
 */

/**
 * 管道方法目标函数类型
 */
interface PipelineTarget {
  (...params: any[]): Promise<any>;
}

/**
 * 实现同时多次调用一个异步方法时只执行一次异步操作的管道方法
 * @param target 目标函数
 */
export default <T extends PipelineTarget>(target: T) => {
  let startedPromise: Promise<any> | undefined;
  const wrapper: unknown = (...params: any[]) => {
    if (!startedPromise) {
      startedPromise = new Promise((resolve, reject) =>
        target(...params)
          .then((result) => resolve(result))
          .catch(reject)
          .finally(() => (startedPromise = undefined))
      );
    }
    return startedPromise;
  };
  return wrapper as T;
};
