import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";

import HeaderConstants from "./HeaderConstants";

/**
 * Header右部
 */
export default class HeaderRight extends PureComponent {
  render() {
    return <View style={styles.container} />;
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
});
