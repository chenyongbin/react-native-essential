import React, { PureComponent } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface ArrowProps {
  /**
   * 方向
   */
  direction: "left" | "up" | "right" | "down";
  /**
   * 颜色
   */
  color: string;
  /**
   * 尺寸
   */
  size: number;
  /**
   * 箭头线宽，默认是1
   */
  lineSize?: number;
  /**
   * 布局样式，可以使用该属性自定义箭头的位置等布局属性，但不能改变尺寸和颜色、方向
   */
  layoutStyle?: ViewStyle;
}

/**
 * 箭头icon
 */
export default class Arrow extends PureComponent<ArrowProps> {
  render() {
    const { direction, color, size, lineSize = 1, layoutStyle } = this.props,
      containerSize = size + 2,
      arrowStyles: ViewStyle[] = [
        {
          width: size,
          height: size,
          borderColor: color,
          borderStyle: "solid",
          borderLeftWidth: lineSize,
          borderBottomWidth: lineSize,
        },
      ];

    if (direction == "right") {
      arrowStyles.push({ transform: [{ rotateZ: "225deg" }] });
    } else if (direction == "left") {
      arrowStyles.push({ transform: [{ rotateZ: "45deg" }] });
    } else if (direction == "up") {
      arrowStyles.push({ transform: [{ rotateZ: "135deg" }] });
    } else if (direction == "down") {
      arrowStyles.push({ transform: [{ rotateZ: "-45deg" }] });
    }

    return (
      <View
        style={[
          layoutStyle,
          { width: containerSize, height: containerSize },
          styles.container,
        ]}
      >
        <View style={arrowStyles} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
