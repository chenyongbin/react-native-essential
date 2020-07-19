/**
 * 根组件注入元素管理器
 * 源代码地址：https://github.com/magicismight/react-native-root-siblings
 */

import React, { Component, ComponentType } from "react";
import { AppRegistry, View } from "react-native";
import Provider from "./Provider";
import StaticContainer from "./StaticContainer";

declare module "react-native" {
  export namespace AppRegistry {
    export function setWrapperComponentProvider(
      provider: () => ComponentType
    ): void;
  }
}

interface UpdateSibling {
  (id: number, element?: JSX.Element, callback?: () => void): void;
}

let rootSiblingId = 0,
  rootSiblingContainerInjected = false;
const UpdateSiblingHooks: UpdateSibling[] = [],
  CleanupSiblingHooks: Array<() => void> = [];

/**
 * 根相邻组件容器
 */
class RootSiblingContainer extends Component<any> {
  private updateStates: Map<number, boolean> = new Map();
  private siblings: Map<number, JSX.Element | undefined> = new Map();
  private siblingElements: Map<number, JSX.Element | undefined> = new Map();

  constructor(props: any) {
    super(props);
    UpdateSiblingHooks.push(this.update);
    CleanupSiblingHooks.push(this.cleanup);

    // console.log("RootSiblingContainer constructor");
  }

  componentWillUnmount() {
    UpdateSiblingHooks.pop();
    CleanupSiblingHooks.pop();
    // console.log("RootSiblingContainer componentWillUnmount");
  }

  private cleanup = () => {
    this.siblings.clear();
    this.siblingElements.clear();
    this.forceUpdate();
    // console.log("RootSiblingContainer cleanup");
  };

  private update: UpdateSibling = (id, element, callback) => {
    if (this.siblings.has(id) && !element) {
      this.siblings.delete(id);
      this.siblingElements.delete(id);
    } else if (element) {
      this.siblings.set(id, element);
    }
    this.updateStates.set(id, true);
    this.forceUpdate(callback);
  };

  render() {
    if (this.siblings.size == 0) {
      // console.log("RootSiblingManager = null");
      return null;
    }

    const elements: Array<JSX.Element | null> = [];
    this.siblings.forEach((element, key) => {
      if (!element) {
        return;
      }
      const sibling = (
        <StaticContainer
          key={`root-sibling-${key}`}
          shouldUpdate={!!this.updateStates.get(key)}
        >
          {element}
        </StaticContainer>
      );

      const store = this.siblingElements.get(key);
      if (store) {
        elements.push(
          <Provider siblingElement={store} key={`root-sibling-${key}-provider`}>
            {sibling}
          </Provider>
        );
      } else {
        elements.push(sibling);
      }
    });

    this.updateStates.clear();
    return elements;
  }
}

// 设置相邻组件容器注册器
if (!rootSiblingContainerInjected) {
  AppRegistry.setWrapperComponentProvider(() => (props) => {
    return (
      <View style={{ flex: 1 }} pointerEvents="box-none">
        {props.children}
        <RootSiblingContainer />
      </View>
    );
  });
  rootSiblingContainerInjected = true;
}

/**
 * 根相邻组件类
 */
class RootSibling {
  readonly id = rootSiblingId++;

  /**
   * 构造函数
   * @param element 相邻组件元素
   */
  constructor(readonly element: JSX.Element) {
    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
    this.update(element);
  }

  /**
   * 更新
   * @param element 新状态的组件
   */
  update(element: JSX.Element) {
    if (UpdateSiblingHooks.length > 0) {
      const updateSibling = UpdateSiblingHooks[UpdateSiblingHooks.length - 1];
      updateSibling && updateSibling(this.id, element);
    }
  }

  /**
   * 销毁
   */
  destroy() {
    if (UpdateSiblingHooks.length > 0) {
      const updateSibling = UpdateSiblingHooks[UpdateSiblingHooks.length - 1];
      updateSibling && updateSibling(this.id);
    }
  }
}

export default RootSibling;
