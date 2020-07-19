declare module "react-native" {
  var WebView: any;
}

import React, { PureComponent } from "react";
import { View, WebView } from "react-native";
import { GradientViewProps, styles } from "./shared";

/**
 * 渐变背景组件
 */
export default class GradientView extends PureComponent<GradientViewProps> {
  /**
   * 生成native版使用的html
   */
  private getHtml = () => {
    const styleText = [
      `background:${this.props.background};`,
      `border-radius:${this.props.borderRadius};`,
    ].join("");

    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title></title>
          <style>
            html, body, div { width:100vw; height:100vh; padding: 0; margin: 0; overflow: hidden;}
          </style>
        </head>
        <body>
          <div style="${styleText}"></div>
        </body>
      </html>    
    `;
  };

  render() {
    let children = this.props.children;
    const { width, height } = this.props,
      linearGradient = (
        <WebView
          scrollEnabled={false}
          style={{ backgroundColor: "transparent" }}
          source={{ html: this.getHtml() }}
        />
      );

    if (children) {
      children = <View style={styles.children}>{children}</View>;
    }

    return (
      <View style={[{ width, height }, this.props.style]}>
        {linearGradient}
        {children}
      </View>
    );
  }
}
