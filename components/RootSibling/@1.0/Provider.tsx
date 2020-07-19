import React, { Component } from "react";

interface ProviderProps {
  siblingElement: JSX.Element | null;
}

export default class Provider extends Component<ProviderProps> {
  getChildContext() {
    return { store: this.props.siblingElement };
  }
  render() {
    return this.props.children;
  }
}
