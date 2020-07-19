import { getQueryStringLike } from "./shared";

const getQueryString: getQueryStringLike = (name: string, isUrl = false) => {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),
    r = decodeURI(location.search).substr(1).match(reg);
  return r != null ? (isUrl ? decodeURIComponent(r[2]) : unescape(r[2])) : "";
};

export default getQueryString;
