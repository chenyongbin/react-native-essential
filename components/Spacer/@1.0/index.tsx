import React, { PureComponent } from "react";
import { View, ViewStyle } from "react-native";

interface SpaceProps {
  /**
   * 方向
   * 1. horizontal=水平，vertical=垂直
   * 2. 默认是垂直方向
   */
  direction?: "horizontal" | "vertical";
  /**
   * 宽度
   * 1. 水平方向时有效，默认值是15
   * 2. 垂直方向时是固定值100%
   */
  width?: number;
  /**
   * 高度
   * 1. 垂直方向时有效，默认值是30
   * 2. 水平方向时为固定值100%
   */
  height?: number;
  /**
   * 背景颜色，默认是透明的
   */
  backgroundColor?: string;
}

/**
 * 空间间隔组件
 * 1. 主要用于页面布局时，在两个区块间增加间隔
 * 2. 使用这个组件比使用padding、magin更直观和方便
 * 3. 支持水平和垂直方向上的间隔效果，默认是垂直方向间隔
 */
export default class Space extends PureComponent<SpaceProps> {
  render() {
    const {
        direction,
        width = 15,
        height = 30,
        backgroundColor = "transparent",
      } = this.props,
      spaceStyles: ViewStyle[] = [{ backgroundColor }];

    if (direction == 'horizontal') {
      spaceStyles.push({ width: width, height: "100%" });
    } else {
      spaceStyles.push({ width: "100%", height: height });
    }

    return <View style={spaceStyles} />;
  }
}
