import React, { PureComponent } from "react";
import { View, ViewProps } from "react-native";
import isIPhoneX from "../../../utils/isIPhoneX/@1.0";

/**
 * iPhoneX等以上机型垫片View
 * 1. 主要是用于在这些机型TabBar上再加一层空间，避免点击TabBar时误触内容
 * 2. 该控件高度为20
 * 3. 在其它没有tabBar的机型，该组件返回null
 */
export default class IPhoneXShimView extends PureComponent<ViewProps> {
  render() {
    if (isIPhoneX()) {
      return (
        <View
          style={{ width: "100%", height: 20, backgroundColor: "transparent" }}
          {...this.props}
        />
      );
    }
    return null;
  }
}
