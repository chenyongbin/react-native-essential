import React, { ReactElement } from "react";
import { Platform, Text } from "react-native";
import fontFamily from "../../../constants/fontFamily";

const oldRender = Text.prototype.render;
Text.prototype.render = function (...args) {
  let mergeProps = {};
  const origin = oldRender.call(this, ...args) as ReactElement;

  if (Platform.OS == "web") {
    mergeProps = { style: { fontFamily } };
  } else {
    mergeProps = { allowFontScaling: false };
    if (Platform.OS == "ios") {
      mergeProps = Object.assign(mergeProps, {
        style: [{ fontFamily }, origin.props.style],
      });
    }
  }

  return React.cloneElement(origin, mergeProps);
};

export default Text;
