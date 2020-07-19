import { AxiosResponse, AxiosError } from "axios";

/**
 * HTTP响应状态
 */
enum HttpResponseStatus {
  /**
   * 响应正常
   */
  Ok = "ok",
  /**
   * 请求已被取消
   */
  RequestCanceled = "request_canceld",
  /**
   * 请求超时
   */
  RequestTimeout = "request_timeout",
  /**
   * 请求失败
   */
  RequestFailed = "request_failed",
  /**
   * 找不到请求
   */
  RequestNotFound = "request_not_found",
  /**
   * 服务器异常
   */
  ServerError = "server_error",
}

/**
 * HTTP响应
 */
interface HttpResponse<T = any> {
  /**
   * 状态
   */
  status: HttpResponseStatus;
  /**
   * 错误消息
   */
  message?: string;
  /**
   * 响应结果
   */
  result?: T;
  /**
   * 历时（毫秒）
   */
  elapsed: number;
  /**
   * 响应错误原始对象
   */
  error?: AxiosError;
  /**
   * 响应原始对象
   */
  response?: AxiosResponse;
}

export { HttpResponseStatus, HttpResponse };
