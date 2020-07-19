import { Platform } from "react-native";
import { HttpResponseBase } from "./shared";

/**
 * jsonp请求对象
 */
interface HttpJsonpRequest {
  /**
   * jsonp方法
   * @param url 请求地址
   * @param callbackName 回调名称，默认是callback
   */
  jsonp: (url: string, callbackName?: string) => Promise<HttpJsonpResponse>;
  /**
   * 取消请求的方法
   */
  cancel: () => void;
}

/**
 * jsonp请求响应对象
 */
interface HttpJsonpResponse extends HttpResponseBase {
  /**
   * 响应文本
   */
  responseText: string;
}

/**
 * 创建一个jsonp请求，该方法只支持web版
 * @param timeoutMilliSeconds 封装有超时、取消逻辑的fetch请求方法
 * @returns HttpJsonpRequest jsonp请求对象
 * @returns HttpJsonpRequest.jsonp 封装有超时、取消逻辑的jsonp请求方法
 * @returns HttpJsonpRequest.cancel 取消方法
 */
const createJsonpRequest = (timeoutMilliSeconds: number): HttpJsonpRequest => {
  if (Platform.OS != "web" && document && typeof document == "object") {
    throw new Error("jsonp方法只支持web平台");
  }

  if (timeoutMilliSeconds <= 0) {
    throw new Error("超时时间不能小于等于0");
  }

  let cancelHook: Function | undefined;
  const jsonp = (url: string, callbackName = "callback") =>
    new Promise<HttpJsonpResponse>((resolve) => {
      const response: HttpJsonpResponse = {
        status: "ok",
        elapsed: 0,
        responseText: "",
        error: undefined,
      };

      if (!url) {
        response.error = new Error("请求地址不能为空");
        resolve(response);
        return;
      }

      let timer = -1,
        scriptElement: HTMLScriptElement | undefined;
      const startTime = Date.now(),
        callbackFunctionName = `reactnative_jsonp_callbackname_${Date.now()}`,
        cleanup = () => {
          scriptElement && scriptElement.remove();
          window.clearTimeout(timer);
          (window as any)[callbackFunctionName] = undefined;
        };

      try {
        // 创建请求脚本
        scriptElement = document.createElement("script");
        scriptElement.src = `${url}${
          url.lastIndexOf("?") != -1 ? "&" : "?"
        }${callbackName}=${callbackFunctionName}`;

        // 创建回调
        (window as any)[callbackFunctionName] = (json: string) => {
          response.elapsed = Date.now() - startTime;
          response.responseText = json;
          cleanup();
          resolve(response);
        };

        // 创建超时逻辑
        timer = window.setTimeout(() => {
          response.elapsed = Date.now() - startTime;
          response.status = "timeout";
          cleanup();
          resolve(response);
        }, timeoutMilliSeconds);

        // 创建取消逻辑
        cancelHook = () => {
          response.elapsed = Date.now() - startTime;
          response.status = "canceled";
          cleanup();
          resolve(response);
          throw new Error("已取消");
        };

        // 开始请求
        document.body.append(scriptElement);
      } catch (error) {
        response.status = "error";
        response.error = error;
        cleanup();
        resolve(response);
      }
    });

  return { jsonp, cancel: () => cancelHook && cancelHook() };
};

export { HttpJsonpRequest, HttpJsonpResponse, createJsonpRequest };
