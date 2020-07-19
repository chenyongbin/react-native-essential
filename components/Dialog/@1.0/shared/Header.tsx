import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import PX from "../../../../utils/px/@1.0";
import Text from "../../../Text/@1.0";

interface HeaderProps {
  /**
   * 标题
   */
  readonly title?: string;
  /**
   * 是否隐藏标题，默认不隐藏
   */
  readonly hideTitle?: boolean;
}

class Header extends PureComponent<HeaderProps> {
  static defaultProps = {
    hideTitle: false,
    title: "温馨提示",
  };

  render() {
    if (this.props.hideTitle) {
      return <View style={styles.container_withoutTitle} />;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.title}</Text>
      </View>
    );
  }
}

export { Header, HeaderProps };

const styles = StyleSheet.create({
  container: {
    paddingTop: PX.rpx(40),
    paddingBottom: PX.rpx(24),
  },
  container_withoutTitle: {
    height: PX.rpx(50),
  },
  text: {
    textAlign: "center",
    color: "#333",
    fontSize: 17,
    fontWeight: "bold",
  },
});
