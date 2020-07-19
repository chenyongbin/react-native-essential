import { FetchRequest } from "./shared";

/**
 * 带有取消逻辑的fetch请求结果对象
 */
interface FetchWithCancelResult {
  /**
   * 带有取消逻辑的fetch请求方法
   */
  fetch: FetchRequest;
  /**
   * 取消方法
   */
  cancel: () => void;
}

/**
 * fetch请求取消错误类
 */
class FetchCancelError extends Error {
  constructor(message?: string) {
    super(message || "请求已取消");
    this.name = "FetchCancelError";
  }
}

/**
 * 生成一个带有取消逻辑的fetch请求
 */
const fetchWithCancel = (fetchRequest: FetchRequest): FetchWithCancelResult => {
  let aborted = false,
    abortController: AbortController | undefined,
    cancelHook = (): void => {};

  // 首先使用AbortController
  try {
    if (AbortController && typeof AbortController == "function") {
      abortController = new AbortController();
      cancelHook = () => {
        abortController && abortController.abort();
        aborted = true;
      };
    }
  } catch (error) {
    console.log("当前环境不支持AbortController");
  }

  const fetch: FetchRequest = (input, request) => {
    //支持
    if (abortController) {
      request = Object.assign(request || {}, {
        signal: abortController.signal,
      });
      return fetchRequest(input, request)
        .then((r) => r)
        .catch((error) => {
          if (aborted) {
            throw new FetchCancelError();
          }
          throw error;
        });
    }

    // 不支持
    return Promise.race([
      fetchRequest(input, request),
      new Promise<boolean>((resolve) => (cancelHook = () => resolve(true))),
    ])
      .then((response) => {
        if (typeof response == "boolean") {
          throw new FetchCancelError();
        }
        return response;
      })
      .catch((error) => {
        throw error;
      });
  };

  return { fetch, cancel: () => cancelHook && cancelHook() };
};

export { FetchWithCancelResult, FetchCancelError, fetchWithCancel };
