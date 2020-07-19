import React, { PureComponent, ReactElement } from "react";
import { StyleSheet, ScrollView, TextStyle } from "react-native";
import PX from "../../../../utils/px/@1.0";
import Text from "../../../Text/@1.0";

interface BodyProps {
  /**
   * 消息
   */
  readonly message: string | ReactElement;
  /**
   * 消息对齐格式，默认居中
   */
  readonly align?: "auto" | "left" | "right" | "center" | "justify";
}

/**
 * 对话窗消息样式
 */
const MessageStyle: TextStyle = {
  fontSize: 15,
  lineHeight: 27.6,
  color: "#444",
  textAlign: "center",
};

/**
 * 消息组件
 */
class Body extends PureComponent<BodyProps> {
  render() {
    const { message, align = "center" } = this.props;

    let messageComponent: ReactElement | undefined;
    if (typeof message == "string") {
      messageComponent = (
        <Text style={[MessageStyle, { textAlign: align }]}>{message}</Text>
      );
    } else {
      messageComponent = message;
    }

    return <ScrollView style={styles.container}>{messageComponent}</ScrollView>;
  }
}

export { Body, BodyProps, MessageStyle };

const styles = StyleSheet.create({
  container: {
    maxHeight: PX.rpx(480),
    paddingBottom: PX.rpx(40),
    marginLeft: 26.4,
    marginRight: 26.4,
  },
});
