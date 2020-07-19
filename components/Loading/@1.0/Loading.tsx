import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import Text from "../../Text/@1.0";
import Image from "../../Image/@1.0";

interface LoadingProps {
  /**
   * loading窗提示内容
   */
  message?: string;
}

/**
 * Loading窗
 */
class Loading extends PureComponent<LoadingProps> {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.img} source={require("./loading.gif")} />
        <Text style={styles.text}>{this.props.message || "加载中"}...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.7)",
    minWidth: 140,
    maxWidth: 300,
    maxHeight: 200,
    padding: 15,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  img: {
    width: 32,
    height: 32,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 5,
    marginTop: 15,
  },
});

/**
 * 创建loading
 */
export default (props: LoadingProps) => <Loading {...props} />;
