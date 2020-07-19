/**
 * 是否是iPad机型
 */
export default () =>
  typeof window !== "undefined" &&
  window &&
  /ipad/gi.test(window.navigator.userAgent);
