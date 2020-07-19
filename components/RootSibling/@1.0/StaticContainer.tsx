import React, { Component, Children } from "react";

interface StaticContainerProps {
  shouldUpdate: boolean;
}

export default class StaticContainer extends Component<StaticContainerProps> {
  shouldComponentUpdate(nextProps: StaticContainerProps) {
    return nextProps.shouldUpdate;
  }
  render() {
    const child = this.props.children;
    return child === null || child === false ? null : Children.only(child);
  }
}
