/**
 * 是否是iPhoneX、iPhone XR、 iPhone XS、iPhone 11等类似机型
 */
export default () => {
  if (typeof window !== "undefined" && window) {
    return (
      /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812
    );
  }
  return false;
};
