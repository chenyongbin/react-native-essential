import React, { PureComponent } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Text from "../../../../components/Text/@1.0";
import HeaderConstants from "./HeaderConstants";

interface HeaderLeftProps {
  /**
   * 点击处理方法
   */
  onPress: () => void;
}

/**
 * Header左部
 */
export default class HeaderLeft extends PureComponent<HeaderLeftProps> {
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.7}
        onPress={this.props.onPress}
      >
        <Text style={styles.title}>返回</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: HeaderConstants.leftWidth,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  title: {
    color: "#333",
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
});
