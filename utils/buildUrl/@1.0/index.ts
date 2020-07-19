/**
 * 根据url和参数拼接最终的url
 * @param url 地址
 * @param params 参数
 */
export default (url: string, params?: DynamicObject) => {
  if (!params) {
    return url;
  }

  const paramList = Object.entries(params).map(([k, v]) => `${k}=${v}`);
  return paramList.length == 0
    ? url
    : `${url}${url.lastIndexOf("?") == -1 ? "?" : "&"}${paramList.join("&")}`;
};
