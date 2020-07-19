import { StyleSheet, ViewStyle } from "react-native";

export interface GradientViewProps {
  /**
   * 宽度，支持数值和百分比
   */
  width: number | string;
  /**
   * 高度，支持数值和百分比
   */
  height: number | string;
  /**
   * 渐变背景css，即background属性的css值
   */
  background: string;
  /**
   * 自定义样式
   */
  style?: ViewStyle;
  /**
   * 圆角css的值，即border-radius属性的css值
   */
  borderRadius?: string;
}

/**
 * 公共样式
 */
export const styles = StyleSheet.create({
  children: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
});
