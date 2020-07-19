import {
  fetchDataOptions,
  fetchDataLike,
  defaultTimeoutMilliseconds,
} from "./fetchDataLike";

const fetchData: fetchDataLike = (
  url,
  {
    callbackName = "callback",
    timeoutMilliseconds = defaultTimeoutMilliseconds,
  }: fetchDataOptions = {}
) =>
  new Promise<any>((resolve, reject) => {
    if (!url) {
      reject(new Error("请求地址不能为空"));
      return;
    }

    let timerId = -1,
      scriptElement: HTMLScriptElement | undefined;
    const callbackFunctionName = `react_native_web_jsonp_callbackname_${Date.now()}`,
      cleanup = () => {
        timerId >= 0 && clearTimeout(timerId);
        scriptElement && scriptElement.remove();
        (window as any)[callbackFunctionName] = undefined;
      };

    try {
      // 创建请求脚本
      scriptElement = document.createElement("script");
      scriptElement.src = `${url}${
        url.lastIndexOf("?") != -1 ? "&" : "?"
      }${callbackName}=${callbackFunctionName}`;

      // 创建回调
      (window as any)[callbackFunctionName] = (json: any) => {
        if (typeof json == "string") {
          try {
            json = JSON.parse(json);
          } catch (error) {}
        }
        cleanup();
        resolve(json);
      };

      // 创建超时
      if (timeoutMilliseconds > 0) {
        timerId = window.setTimeout(cleanup, timeoutMilliseconds);
      }

      // 开始请求
      document.body.append(scriptElement);
    } catch (error) {
      cleanup();
      resolve(undefined);
    }
  });

export default fetchData;
