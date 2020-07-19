import React, { PureComponent } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import PX from "../../../../utils/px/@1.0";
import Text from "../../../Text/@1.0";

interface MultiHeaderProps {
  /**
   * 标题
   */
  readonly title: string;
  /**
   * 子标题
   */
  readonly subTitle: string;
}

interface MultiHeaderHandle {
  /**
   * 点击后退按钮
   */
  onPressBack: () => void;
  /**
   * 点击向前按钮
   */
  onPressForward: () => void;
  /**
   * 点击关闭按钮
   */
  onClose: () => void;
}

class MultiHeader extends PureComponent<MultiHeaderProps & MultiHeaderHandle> {
  static defaultProps = {
    title: "温馨提示",
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onPressBack}>
          <View style={styles.back} />
        </TouchableOpacity>
        <View style={styles.box}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.subTitle}>{this.props.subTitle}</Text>
        </View>
        <TouchableOpacity onPress={this.props.onPressForward}>
          <View style={styles.forward} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.close} onPress={this.props.onClose}>
          <View style={styles.close_flag} />
          <View style={[styles.close_flag, styles.close_flag2]} />
        </TouchableOpacity>
      </View>
    );
  }
}

export { MultiHeader, MultiHeaderProps, MultiHeaderHandle };

const styles = StyleSheet.create({
  container: {
    paddingTop: PX.rpx(40),
    paddingBottom: PX.rpx(24),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  back: {
    width: 10,
    height: 10,
    margin: 5,
    borderColor: "#3381e3",
    borderStyle: "solid",
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    transform: [{ rotateZ: "45deg" }],
    marginRight: 20,
  },
  forward: {
    width: 10,
    height: 10,
    margin: 5,
    borderColor: "#3381e3",
    borderStyle: "solid",
    borderLeftWidth: 1,
    borderTopWidth: 1,
    transform: [{ rotateZ: "135deg" }],
    marginLeft: 20,
  },
  box: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    color: "#333",
    fontSize: 17,
    fontWeight: "bold",
  },
  subTitle: {
    color: "#999",
    fontSize: 12,
    marginTop: 3,
  },
  close: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  close_flag: {
    width: 2,
    height: 12,
    backgroundColor: "#ccc",
    transform: [{ rotateZ: "-45deg" }],
  },
  close_flag2: {
    position: "absolute",
    transform: [{ rotateZ: "45deg" }],
  },
});
