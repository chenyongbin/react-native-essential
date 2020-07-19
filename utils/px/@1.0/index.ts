/**
 * @author chenyongbin
 * @date 2020-1-13
 * @description 像素帮助方法模块
 */

import { Dimensions, PixelRatio } from "react-native";

const PIXEL_RATIO = PixelRatio.get(),
  IPAD_APP_WIDTH = 414,
  DEVICE_WIDTH = Math.min(IPAD_APP_WIDTH, Dimensions.get("window").width),
  BASE_WIDTH = 750;

/**
 * 根据设备尺寸转换大小
 * @param px 像素大小
 */
const rpx = (px: number) => {
  return (px * DEVICE_WIDTH) / BASE_WIDTH;
};

/**
 * 根据像素密度转换大小
 * @param px 像素大小
 */
const ratio = (px: number) => px / PIXEL_RATIO;

export default { rpx, ratio };
