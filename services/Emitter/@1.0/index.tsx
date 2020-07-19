/**
 * @author chenyongbin
 * @date 2020-1-9
 * @description 触发器模块
 */

import React, { PureComponent } from "react";

/**
 * 触发器订阅
 */
interface EmitterSubscription {
  /**
   * 事件名称
   */
  eventName: string;
  /**
   * 回调函数
   */
  callback: Function;
}

/**
 * 监听器集合，供相同模块被打开多次时使用
 */
const EMITTER_MAP_LIST: Array<Map<number, EmitterSubscription>> = [];
/**
 * 监听器映射集合
 */
let EMITTER_MAP = new Map<number, EmitterSubscription>();
/**
 * 监听器计数
 */
let listenerId = 0;

/**
 * 触发器事件订阅类
 */
class EmitterEventSubscription {
  /**
   * 事件监听id
   */
  private id = ++listenerId;

  constructor(
    /** 事件名称 */ eventName: string,
    /** 回调函数 */ callback: Function
  ) {
    this.remove = this.remove.bind(this);
    EMITTER_MAP.set(this.id, { eventName, callback });
  }

  /**
   * 移除订阅
   */
  remove() {
    if (!EMITTER_MAP.has(this.id)) {
      return true;
    }

    try {
      return EMITTER_MAP.delete(this.id);
    } catch (error) {
      return false;
    }
  }
}

/**
 * 监听某个事件
 * @param eventName 事件名称
 * @param listener 回调函数
 */
const on = (eventName: string, callback: Function) => {
  return new EmitterEventSubscription(eventName, callback);
};

/**
 * 触发某个事件
 * @param eventName 事件名称
 * @param params 回调参数
 */
const emit = (eventName: string, ...params: any[]) => {
  if (!eventName) {
    return;
  }

  EMITTER_MAP.forEach(({ eventName: key, callback }) => {
    if (key == eventName) {
      try {
        callback && callback(...params);
      } catch (error) {}
    }
  });
};

/**
 * 触发器服务
 */
class EmitterService extends PureComponent {
  constructor(props: any) {
    super(props);
    EMITTER_MAP = new Map<number, EmitterSubscription>();
    EMITTER_MAP_LIST.push(EMITTER_MAP);
  }

  componentWillUnmount() {
    EMITTER_MAP.clear();
    EMITTER_MAP_LIST.pop();
    if (EMITTER_MAP_LIST.length > 0) {
      EMITTER_MAP = EMITTER_MAP_LIST[EMITTER_MAP_LIST.length - 1];
    }
  }

  render() {
    return null;
  }
}

/**
 * 触发器
 */
const Emitter = { on, emit };

export { EmitterService, EmitterEventSubscription, Emitter };
