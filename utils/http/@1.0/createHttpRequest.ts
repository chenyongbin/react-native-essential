import { fetchWithTimeout } from "./fetchWithTimeout";
import { fetchWithCancel } from "./fetchWithCancel";
import { HttpResponseBase } from "./shared";

/**
 * http响应对象
 */
interface HttpResponse extends HttpResponseBase {
  /**
   * 响应对象
   */
  response?: Response;
}

/**
 * http请求对象
 */
interface HttpRequest {
  /**
   * 封装有超时、取消逻辑的fetch请求方法
   */
  fetch: (input: RequestInfo, request?: RequestInit) => Promise<HttpResponse>;
  /**
   * 取消请求的方法
   */
  cancel: () => void;
}

/**
 * 创建一个http请求
 * @param timeoutMilliSeconds 支持的超时时间，单位是毫秒
 * @returns HttpRquest http请求对象
 * @returns HttpRequest.fetchRequest 封装有超时、取消逻辑的fetch请求方法
 * @returns HttpRequest.cancel 取消方法
 */
const createHttpRequest = (timeoutMilliSeconds: number): HttpRequest => {
  const { fetch, cancel } = fetchWithCancel(
    fetchWithTimeout(timeoutMilliSeconds)
  );

  const newFetch = async (
    input: RequestInfo,
    request?: RequestInit
  ): Promise<Readonly<HttpResponse>> => {
    const result: HttpResponse = {
      status: "ok",
      elapsed: 0,
      response: undefined,
      error: undefined,
    };

    let startTime = Date.now();
    await fetch(input, request)
      .then((response) => (result.response = response))
      .catch((error) => {
        const name = error ? error.name : "";
        if (error instanceof Error && name == "FetchTimeoutError") {
          result.status = "timeout";
          cancel();
        } else if (error instanceof Error && name == "FetchCancelError") {
          result.status = "canceled";
        } else {
          result.status = "error";
        }
        result.error = error;
      })
      .finally(() => (result.elapsed = Date.now() - startTime));

    return result;
  };

  return { fetch: newFetch, cancel };
};

export { HttpRequest, HttpResponse, createHttpRequest };
