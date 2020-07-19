import { NavigationState, NavigationParams } from "react-navigation";

/**
 * App容器状态
 */
export interface AppContainerState {
  /**
   * 导航状态数据
   */
  nav: NavigationState | null;
}

/**
 * 返回前操作类型
 */
export type WillBackType = () => Promise<boolean>;

/**
 * 导航器类型
 */
export interface NavigatorLike {
  /**
   * 获取对应参数的值
   * @param paramName 参数名称
   */
  getParam(paramName: string): any;
  /**
   * 设置参数
   * @param params 参数
   */
  setParams(params: NavigationParams): void;
  /**
   * 设置单个参数
   * @param paramName 参数名称
   * @param paramValue 参数值
   */
  setParamWith(paramName: string, paramValue: any): void;
  /**
   * 获取页面名称
   * 1. 该名称不是页面标题，而是页面路由名称
   * 2. 可指定是否带有页面时间戳参数，该时间戳表示进入该页面的即刻时间
   * 3. 离开当前页面再返回，该时间戳也会不一样
   * @param withTimestamp 是否带有页面时间戳，默认不带有
   */
  getPageName(withTimestamp: boolean): string;
  /**
   * 设置返回前操作
   * 1. 在点返回按钮时，需要做一些额外操作的，可以调用该方法设置
   * 2. 参数是一个返回了Promise对象的函数
   * 3. Promise对象的结果必须是布尔类型，导航器会根据这个值判断要不要继续，true=继续返回，false=暂不返回
   * @param willBack 自定义的返回前操作
   */
  setWillBack(willBack: WillBackType): void;
  /**
   * 导航到新页面
   * @param page 目标页面名称
   * @param params 页面参数
   * @param backPage 设置该参数后，在下个页面点返回按钮回直接回到该backPage指定的页面
   */
  navigateTo(page: string, params?: NavigationParams, backPage?: string): void;
  /**
   * 在页面栈中，用新页面替换掉当前页面
   * @param page 新页面名称
   * @param params 参数
   */
  replace(page: string, params?: NavigationParams): void;
  /**
   * 返回
   */
  goBack(): void;
  /**
   * 重载当前页面
   */
  reload(): void;
  /**
   * 重载整个app，页面回到初始页面
   */
  reloadApp(): void;
  /**
   * 退出app
   */
  exitApp(): void;
}
