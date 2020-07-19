/**
 * http响应状态，ok=正常，timeout=已超时，canceld=已取消，error=出错
 */
type HttpResponseStatus = "ok" | "timeout" | "canceled" | "error";

export { HttpResponseStatus };
