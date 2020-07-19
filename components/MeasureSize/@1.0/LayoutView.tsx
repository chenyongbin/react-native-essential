import React, { PureComponent } from "react";
import { StyleSheet, View, Dimensions, LayoutChangeEvent } from "react-native";
import ZIndex from "../../../constants/zindex";

interface LayoutViewProps {
  /**
   * 布局结束时
   */
  onLayoutFinished: (width: number, height: number) => void;
}

interface LayoutViewState {
  /**
   * 是否布局完毕
   */
  layouted: boolean;
}

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");

/**
 * 计算尺寸的布局View
 */
class LayoutView extends PureComponent<LayoutViewProps, LayoutViewState> {
  private width = 0;
  private height = 0;
  private layoutCount = 0;

  constructor(props: LayoutViewProps) {
    super(props);

    this.onLayoutWidth = this.onLayoutWidth.bind(this);
    this.onLayoutHeight = this.onLayoutHeight.bind(this);
    this.onLayoutFinished = this.onLayoutFinished.bind(this);

    this.state = { layouted: false };
  }

  componentDidMount() {
    // 若没有子组件时
    if (!this.props.children) {
      this.props.onLayoutFinished(0, 0);
    }
  }

  onLayoutWidth(e: LayoutChangeEvent) {
    this.width = ScreenWidth - e.nativeEvent.layout.width;
    this.onLayoutFinished();
  }

  onLayoutHeight(e: LayoutChangeEvent) {
    this.height = ScreenHeight - e.nativeEvent.layout.height;
    this.onLayoutFinished();
  }

  onLayoutFinished() {
    this.layoutCount++;
    if (this.layoutCount == 2) {
      this.layoutCount = 0;
      this.setState({ layouted: true });
      this.props.onLayoutFinished(this.width, this.height);
    }
  }

  render() {
    const { children } = this.props,
      { layouted } = this.state;

    if (layouted || !this.props.children) {
      return null;
    }

    return (
      <>
        <View style={styles.width}>
          <View style={styles.width_sibling} onLayout={this.onLayoutWidth} />
          {children}
        </View>
        <View style={styles.height}>
          <View style={styles.height_sibling} onLayout={this.onLayoutHeight} />
          {children}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  width: {
    position: "absolute",
    left: 0,
    bottom: -(ScreenHeight + 100),
    width: "100%",
    height: "100%",
    flexDirection: "row",
    zIndex: ZIndex.mask + 1,
  },
  height: {
    position: "absolute",
    left: 0,
    bottom: -(ScreenHeight + 100),
    width: "100%",
    height: "100%",
    zIndex: ZIndex.mask + 2,
  },
  width_sibling: {
    flex: 1,
    height: "100%",
  },
  height_sibling: {
    flex: 1,
    width: "100%",
  },
});

/**
 * 创建布局view
 * @param props 属性
 */
const createLayoutView = (props: LayoutViewProps) => <LayoutView {...props} />;

export { LayoutViewProps, createLayoutView };
