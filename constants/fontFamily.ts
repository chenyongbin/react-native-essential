import { Platform } from "react-native";

/**
 * 获取不同平台默认字体
 */
export default Platform.select({
  web:
    '"PingFang SC",Arial,Roboto,"Droid Sans","Hiragino Sans GB",STXihei,"sans-serif"',
  ios: "PingFang SC",
});
