import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Animated,
  Dimensions,
  View,
  TouchableOpacity,
} from "react-native";
import ZIndex from "../../../constants/zindex";
import { beginMeasureSize } from "../../MeasureSize/@1.0";
import PX from "../../../utils/px/@1.0";
import Text from "../../Text/@1.0";

const { height: ScreenHeight } = Dimensions.get("window"),
  InitialOffset_PullDown = -ScreenHeight,
  InitialOffset_PushUp = ScreenHeight / 2,
  Offset_PullDown = Platform.OS == "web" ? PX.rpx(60) : PX.rpx(160),
  Offset_PushUp = InitialOffset_PushUp - PX.rpx(160);

interface ToastProps {
  /**
   * toast支持的动画模式，默认是上推模式
   * 1. pull-down 下拉模式，toast内容从屏幕顶部缓缓移出
   * 2. push-up 上推模式，toast内容从屏幕中间向上缓缓移动一段距离
   */
  mode?: "pull-down" | "push-up";
  /**
   * 提示消息
   */
  message?: string;
  /**
   * 点击内容以关闭toast方法
   */
  onPress2Hide?: () => void;
  /**
   * 动画时间，默认是500毫秒
   */
  animationDuration?: number;
}

interface ToastState {
  /**
   * 偏移量
   */
  offset: Animated.Value;
}

/**
 * 提示
 */
class Toast extends Component<ToastProps, ToastState> {
  private visibilityAnimation: Animated.CompositeAnimation | undefined;

  constructor(props: ToastProps) {
    super(props);
    const offset =
      props.mode == "pull-down" ? InitialOffset_PullDown : InitialOffset_PushUp;
    this.state = { offset: new Animated.Value(offset) };

    this.startAnimation = this.startAnimation.bind(this);
    this.stopAnimation = this.stopAnimation.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
  }

  componentDidMount() {
    if (this.props.mode == "pull-down") {
      beginMeasureSize(this.renderMessage()).then((size) =>
        this.setState(
          { offset: new Animated.Value(-(size.height + 70)) },
          this.startAnimation
        )
      );
    } else {
      this.startAnimation();
    }
  }

  componentWillUnmount() {
    this.stopAnimation();
  }

  startAnimation() {
    this.stopAnimation();

    const { mode, animationDuration } = this.props;
    this.visibilityAnimation = Animated.timing(this.state.offset, {
      duration: animationDuration || 500,
      toValue: mode == "pull-down" ? Offset_PullDown : Offset_PushUp,
      useNativeDriver: false,
    });
    this.visibilityAnimation.start();
  }

  stopAnimation() {
    if (this.visibilityAnimation) {
      this.visibilityAnimation.stop();
      this.visibilityAnimation = undefined;
    }
  }

  renderMessage() {
    const { children, message, onPress2Hide } = this.props;
    if (children) {
      return children;
    }

    if (onPress2Hide) {
      return (
        <TouchableOpacity activeOpacity={1} onPress={onPress2Hide}>
          <Text style={styles.msg}>{message}</Text>
        </TouchableOpacity>
      );
    }

    return <Text style={styles.msg}>{message}</Text>;
  }

  render() {
    const { offset: marginTop } = this.state,
      custom = !!this.props.children;

    return (
      <View style={styles.container} pointerEvents="box-none">
        <Animated.View
          pointerEvents="box-none"
          style={[custom ? styles.wrapper : styles.box, { marginTop }]}
        >
          {this.renderMessage()}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    alignItems: "center",
    zIndex: ZIndex.toast,
    backgroundColor: "transparent",
  },
  wrapper: {
    width: "100%",
    alignItems: "center",
  },
  box: {
    minHeight: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  msg: {
    color: "#fff",
    fontSize: 13,
    margin: 15,
  },
});

/**
 * 创建toast
 * @param props 属性
 */
const createToast = (props: ToastProps) => <Toast {...props} />;

export { ToastProps, createToast };
