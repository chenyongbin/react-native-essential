import React, { PureComponent } from "react";
import { StyleSheet } from "react-native";

import Text from "../../../../components/Text/@1.0";
import HeaderConstants from "./HeaderConstants";

interface HeaderTitleProps {
  /**
   * 标题
   */
  title: string;
}

/**
 * Header标题部分
 */
export default class HeaderTitle extends PureComponent<HeaderTitleProps> {
  render() {
    return <Text style={styles.title}>{this.props.title}</Text>;
  }
}

const styles = StyleSheet.create({
  title: {
    color: HeaderConstants.titleFontColor,
    fontSize: HeaderConstants.titleFontSize,
    flex: 1,
    textAlign: "center",
  },
});
