import React, { PureComponent } from "react";
import {
  NativeModules,
  Platform,
  DeviceEventEmitter,
  NativeEventEmitter,
  EmitterSubscription,
} from "react-native";

/**
 * 支持的原生事件
 * controllerDidAppear 应用已经进入前台
 * controllerDidDisappear 应用已经进入后台
 * controllerWillAppear 应用即将进入前台
 * controllerWillDisappear 应用即将进入后台
 */
type SupportedNativeEvent =
  | "controllerDidAppear"
  | "controllerDidDisappear"
  | "controllerWillAppear"
  | "controllerWillDisappear";
/**
 * 原生事件映射对象
 */
type NativeEventMapType = Map<number, NativeEvent>;

const NativeEventMap_List: NativeEventMapType[] = [];
let NativeEventMap: NativeEventMapType = new Map();

/**
 * 原生事件服务
 */
class NativeEventService extends PureComponent {
  constructor(props: any) {
    super(props);
    NativeEventMap = new Map<number, NativeEvent>();
    NativeEventMap_List.push(NativeEventMap);
  }

  componentWillUnmount() {
    NativeEventMap.clear();
    NativeEventMap_List.pop();
    if (NativeEventMap_List.length > 0) {
      NativeEventMap = NativeEventMap_List[NativeEventMap_List.length - 1];
    }
  }

  render() {
    return null;
  }
}

/**
 * 原生事件类
 */
class NativeEvent {
  /**
   * 注册原生事件，且只监听一次，事件被触发后会自动删除
   * @param eventName 事件名称
   * @param callback 回调函数
   */
  static once(eventName: SupportedNativeEvent, callback: () => void) {
    let listener = new NativeEvent(eventName, () => {
      listener && listener.remove();
      callback && callback();
    });
    return listener;
  }

  private readonly nativeEventId = Date.now();
  private listener: EmitterSubscription | undefined;

  constructor(
    /** 事件名称 */
    readonly eventName: SupportedNativeEvent,
    /**
     * 事件回调
     */
    private callback: () => void
  ) {
    this.remove = this.remove.bind(this);

    if (Platform.OS == "android") {
      this.listener = DeviceEventEmitter.addListener(eventName, callback);
    } else {
      this.listener = new NativeEventEmitter(
        NativeModules.commonEvents
      ).addListener(eventName, callback);
    }

    NativeEventMap.set(this.nativeEventId, this);
  }

  /**
   * 移除监听
   */
  remove() {
    try {
      if (Platform.OS == "android") {
        DeviceEventEmitter.removeListener(this.eventName, this.callback);
      } else {
        this.listener && this.listener.remove();
      }
      NativeEventMap.has(this.nativeEventId) &&
        NativeEventMap.delete(this.nativeEventId);
    } catch (error) {
      console.warn("utils.NativeEvent.remove", error);
    }
  }
}

export { NativeEventService, NativeEvent };
