import { HttpResponseStatus } from "./HttpResponseStatus";

/**
 * fetch请求
 */
interface FetchRequest {
  (input: RequestInfo, request?: RequestInit): Promise<Response>;
}

/**
 * http响应对象基本属性
 */
interface HttpResponseBase {
  /**
   * 状态，ok=正常，timeout=已超时，canceld=已取消，error=出错
   */
  status: HttpResponseStatus;
  /**
   * 耗时（单位是毫秒）
   */
  elapsed: number;
  /**
   * 错误对象（若出错时）
   */
  error: any;
}

export { FetchRequest, HttpResponseBase };
