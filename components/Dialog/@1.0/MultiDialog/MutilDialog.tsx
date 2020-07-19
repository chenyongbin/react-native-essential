import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import { MultiHeader } from "./MultiHeader";
import { HeaderProps } from "../shared/Header";
import { Body, BodyProps } from "../shared/Body";
import { Footer, FooterProps } from "../shared/Footer";

/**
 * 对话窗属性
 */
interface DialogProps extends HeaderProps, BodyProps, FooterProps {}

/**
 * 多个对话窗属性
 */
interface MultiDialogProps {
  /**
   * 数据
   */
  data: DialogProps[];
  /**
   * 隐藏对话窗
   */
  hideMultiDialog: () => void;
}

interface MultiDialogState {
  /**
   * 更新id
   */
  updateId: number;
}

interface DialogCallback {
  onOk?: () => void;
  onCancel?: () => void;
}

/**
 * 多个对话窗组件
 */
class MultiDialog extends PureComponent<MultiDialogProps, MultiDialogState> {
  private index: number = 0;
  private data: DialogProps[] = [];
  private callbackList: DialogCallback[] = [];

  constructor(props: MultiDialogProps) {
    super(props);

    this.onPressBack = this.onPressBack.bind(this);
    this.onPressForward = this.onPressForward.bind(this);
    this.state = { updateId: Date.now() };
    this.data = this.props.data;

    if (this.data.length > 0) {
      for (let i = 0; i < this.data.length; i++) {
        const { onOk, onCancel, cancelText } = this.data[i];
        this.callbackList.push({ onOk, onCancel });
        this.data[i].onOk = () => this.onPress("onOk");
        if (!!cancelText) {
          this.data[i].onCancel = () => this.onPress("onCancel");
        }
      }
    }
  }

  onPress(type: "onOk" | "onCancel") {
    if (this.index >= this.callbackList.length) {
      return;
    }
    try {
      const { onOk, onCancel } = this.callbackList[this.index];
      type == "onOk" && onOk && onOk();
      type == "onCancel" && onCancel && onCancel();
    } catch (error) {}

    this.callbackList.splice(this.index, 1);
    this.data.splice(this.index, 1);

    if (this.data.length == 0) {
      this.props.hideMultiDialog();
    } else {
      this.index = 0;
      this.setState({ updateId: Date.now() });
    }
  }

  onPressBack() {
    if (this.index > 0) {
      this.index--;
      this.setState({ updateId: Date.now() });
    }
  }

  onPressForward() {
    if (this.index < this.data.length - 1) {
      this.index++;
      this.setState({ updateId: Date.now() });
    }
  }

  render() {
    if (this.data.length == 0) {
      return null;
    }

    const props = this.data[this.index];
    return (
      <>
        <View style={styles.siblingY} />
        <View style={styles.box}>
          <MultiHeader
            title={props.title || "温馨提示"}
            subTitle={`${this.index + 1}/${this.data.length}`}
            onPressBack={this.onPressBack}
            onPressForward={this.onPressForward}
            onClose={this.props.hideMultiDialog}
          />
          <Body {...props} />
          <Footer {...props} />
        </View>
        <View style={styles.siblingY} />
      </>
    );
  }
}

/**
 * 创建多层对话窗
 * @param props 属性
 */
const createMultiDialog = (props: MultiDialogProps) => {
  return <MultiDialog {...props} />;
};

export { MultiDialogProps, createMultiDialog };

const styles = StyleSheet.create({
  siblingY: {
    flex: 1,
    width: "100%",
  },
  box: {
    width: "81%",
    backgroundColor: "#fff",
    borderRadius: 9.6,
  },
  content_textAlignLeft: {
    paddingLeft: 18,
  },
});
