import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { HttpResponseStatus, HttpResponse } from "./HttpResponse";

/**
 * 基于`axios`库封装的一个创建`http`请求的方法
 * @param `config` 请求配置
 * @returns `httpResponse` 一个包含有自定义状态值，请求历时时间的响应对象
 */
const createHttpRequest = async <T = any>(
  config: AxiosRequestConfig
): Promise<Readonly<HttpResponse<T>>> => {
  try {
    const startTime = Date.now(),
      httpResponse: HttpResponse<T> = {
        status: HttpResponseStatus.Ok,
        elapsed: 0,
      };

    await axios(config)
      .then((response) => {
        // 记录正常响应
        httpResponse.response = response;
        httpResponse.result = response.data as T;
      })
      .catch((error: AxiosError) => {
        httpResponse.error = error;

        if (axios.isCancel(error)) {
          httpResponse.status = HttpResponseStatus.RequestCanceled;
          httpResponse.message = "请求已取消";
        } else if (error.code == "ECONNABORTED") {
          httpResponse.status = HttpResponseStatus.RequestTimeout;
          httpResponse.message = "请求已超时";
        } else if (error.response) {
          // status<200或status>=300的响应
          const { status, statusText } = error.response;
          if (status == 404) {
            httpResponse.status = HttpResponseStatus.RequestNotFound;
            httpResponse.message = "找不到请求资源";
          } else if (status >= 500) {
            httpResponse.status = HttpResponseStatus.ServerError;
            httpResponse.message = `服务器出错了(${status})`;
          } else {
            httpResponse.status = HttpResponseStatus.RequestFailed;
            httpResponse.message = statusText;
          }
        } else {
          // 请求失败
          httpResponse.status = HttpResponseStatus.RequestFailed;
          httpResponse.message = error.message || "请求失败";
        }
      })
      .finally(() => {
        // 记录历时
        httpResponse.elapsed = Date.now() - startTime;
      });

    return httpResponse;
  } catch (error) {
    throw error;
  }
};

export { HttpResponseStatus, HttpResponse, createHttpRequest };
