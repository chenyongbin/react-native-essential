import React, { PureComponent, ReactElement } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Text from "../../../Text/@1.0";

interface FooterProps {
  /**
   * 右侧按钮名称
   */
  okText?: string;
  /**
   * 左侧按钮名称
   */
  cancelText?: string;
  /**
   * 右侧按钮响应函数
   */
  onOk?: () => void;
  /**
   * 取消按钮响应
   */
  onCancel?: () => void;
}

class Footer extends PureComponent<FooterProps> {
  static defaultProps = {
    okText: "确定",
    cancelText: "",
    onOk: () => {},
    onCancel: () => {},
  };

  render() {
    let cancelButton: ReactElement | undefined = undefined,
      okButton: ReactElement | undefined = undefined,
      { okText, cancelText, onOk, onCancel } = this.props;

    if (cancelText) {
      cancelButton = (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.button, styles.cancelButtonBorder]}
            onPress={onCancel}
          >
            <Text style={styles.text}>{cancelText}</Text>
          </TouchableOpacity>
        </View>
      );
    }

    okButton = (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.button}
          onPress={onOk}
        >
          <Text style={[styles.text, styles.okText]}>{okText}</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={styles.container}>
        {cancelButton}
        {okButton}
      </View>
    );
  }
}

export { Footer, FooterProps };

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    overflow: "hidden",
    borderWidth: 0,
    borderTopWidth: 1,
    borderStyle: "solid",
    borderTopColor: "#eee",
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    height: 58.8,
    borderWidth: 0,
  },
  cancelButtonBorder: {
    borderRightWidth: 1,
    borderStyle: "solid",
    borderRightColor: "#eee",
  },
  text: {
    color: "#444",
    fontSize: 17,
    lineHeight: 58.8,
    textAlign: "center",
  },
  okText: {
    color: "#007FF0",
  },
});
