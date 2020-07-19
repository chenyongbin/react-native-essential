import { Platform, Dimensions } from "react-native";

/**
 * 是否是iPhoneX、iPhone XR、 iPhone XS、iPhone 11等类似机型
 */
export default () => {
  if (Platform.OS != "ios" || Platform.isPad || Platform.isTVOS) {
    return false;
  }

  const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");
  return (
    ScreenHeight === 812 ||
    ScreenWidth === 812 ||
    ScreenHeight === 896 ||
    ScreenWidth === 896
  );
};
