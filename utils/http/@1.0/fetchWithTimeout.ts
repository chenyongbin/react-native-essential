import { FetchRequest } from "./shared";

/**
 * fetch请求超时错误类
 */
class FetchTimeoutError extends Error {
  constructor(message?: string) {
    super(message || "请求已超时");
    this.name = "FetchTimeoutError";
  }
}

/**
 * 带有超时逻辑的fetch方法
 * @param timeoutMilliseconds 支持的超时时间，单位是毫秒
 */
const fetchWithTimeout = (timeoutMilliseconds: number): FetchRequest => {
  if (timeoutMilliseconds <= 0) {
    throw new Error("超时时间不能小于等于0");
  }

  return (input: RequestInfo, request?: RequestInit): Promise<Response> => {
    let timer: number, timeoutHandler: Function | undefined;
    const requestPromise = fetch(input, request),
      timeoutPromise = new Promise<boolean>(
        (resolve) => (timeoutHandler = () => resolve(true))
      );

    // 设置定时器
    timer = window.setTimeout(timeoutHandler, timeoutMilliseconds);

    return Promise.race([requestPromise, timeoutPromise])
      .then((response) => {
        clearTimeout(timer)
        if (typeof response == "boolean") {
          throw new FetchTimeoutError();
        }
        return response;
      })
      .catch((error) => {
        clearTimeout(timer)
        throw error;
      });
  };
};

export { FetchTimeoutError, fetchWithTimeout };
