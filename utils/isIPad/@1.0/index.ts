import { NativeModules } from "react-native";

/**
 * 是否是iPad机型
 */
export default () =>
  !!(
    NativeModules.PlatformConstants &&
    NativeModules.PlatformConstants.interfaceIdiom === "pad"
  );
