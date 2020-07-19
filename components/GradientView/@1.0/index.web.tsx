import React, { PureComponent } from "react";
import { View } from "react-native";
import { GradientViewProps, styles } from "./shared";

/**
 * 渐变背景组件
 */
export default class GradientView extends PureComponent<GradientViewProps> {
  render() {
    let children = this.props.children;
    const { width, height, background, borderRadius } = this.props;

    if (children) {
      children = <View style={styles.children}>{children}</View>;
    }

    return (
      <View style={[{ width, height }, this.props.style]}>
        <div
          style={{
            width: "100%",
            height: "100%",
            background,
            borderRadius,
          }}
        ></div>
        {children}
      </View>
    );
  }
}
