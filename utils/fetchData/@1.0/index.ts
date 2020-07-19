import axios, { AxiosRequestConfig } from "axios";
import {
  fetchDataOptions,
  fetchDataLike,
  defaultTimeoutMilliseconds,
} from "./fetchDataLike";

const fetchData: fetchDataLike = async (
  url,
  { timeoutMilliseconds = defaultTimeoutMilliseconds }: fetchDataOptions = {}
) => {
  if (!url) {
    throw new Error("请求地址不能为空");
  }

  const config: AxiosRequestConfig = { url };
  if (timeoutMilliseconds > 0) {
    config.timeout = timeoutMilliseconds;
  }
  const response = await axios(config);
  return response.data;
};

export default fetchData;
