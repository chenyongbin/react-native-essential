import React, { PureComponent } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Header, HeaderProps } from "../shared/Header";
import { Body, BodyProps } from "../shared/Body";
import { Footer, FooterProps } from "../shared/Footer";

/**
 * 对话窗属性
 */
interface DialogProps extends HeaderProps, BodyProps, FooterProps {}

const ScreenWidth = Dimensions.get("window").width;

/**
 * 对话窗组件
 */
class Dialog extends PureComponent<DialogProps> {
  render() {
    return (
      <>
        <View style={styles.siblingY} />
        <View style={styles.box}>
          <Header {...this.props} />
          <Body {...this.props} />
          <Footer {...this.props} />
        </View>
        <View style={styles.siblingY} />
      </>
    );
  }
}

/**
 * 创建一个对话窗
 * @param props 属性
 */
const createDialog = (props: DialogProps) => {
  return <Dialog {...props} />;
};

export { DialogProps, createDialog };

const styles = StyleSheet.create({
  siblingY: {
    flex: 1,
    width: "100%",
  },
  box: {
    width: ScreenWidth * 0.8,
    backgroundColor: "#fff",
    borderRadius: 9.6,
  },
  content_textAlignLeft: {
    paddingLeft: 18,
  },
});
