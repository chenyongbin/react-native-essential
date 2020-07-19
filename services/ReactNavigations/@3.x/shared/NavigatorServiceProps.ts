import {
  NavigationState,
  NavigationAction,
  NavigationComponent,
  NavigationParams,
  NavigationScreenConfig,
  NavigationScreenOptions,
  StackNavigatorConfig,
} from "react-navigation";
import { ServiceProps, WebServiceProps } from "../../../shared";
import NavigatorActions from "./NavigatorActions";

/**
 * web版导航器属性
 */
interface WebNavigatorProps {
  /**
   * 子路径
   */
  subPath?: string;
  /**
   * 在web环境所处的宿主中，可能有自定义的设置标题方法，通过该属性传入该方法
   */
  setTitle?: (title: string) => void;
  /**
   * 在web环境所处的宿主中，可能有自定义的设返回方法，通过该属性传入注册方法
   * @param navigatorBackHandler 导航器返回处理方法
   */
  setBackHandler?: (navigatorBackHandler: () => void) => void;
}

/**
 * 页面
 */
interface Page {
  /**
   * 页面名称，建议使用Pascal命名法
   */
  name: string;
  /**
   * 页面标题（不用编码）
   */
  title: string;
  /**
   * 页面组件
   */
  screen: NavigationComponent;
  /**
   * 支持其它属性
   */
  [prop: string]: any;
}

interface OnPageChange {
  /**
   * 页面发生改变时
   * @param action 操作
   * @param page 页面名称
   * @param params 页面参数
   */
  (action: NavigatorActions, page: string, params?: NavigationParams): void;
}

interface OnNavigationStateChange {
  /**
   * 导航状态发生改变后
   * @param prevNavigationState 上一个导航状态
   * @param nextNavigationState 下一个导航状态
   * @param action 页面参数
   */
  (
    prevNavigationState: NavigationState,
    nextNavigationState: NavigationState,
    action: NavigationAction
  ): void;
}

/**
 * 导航器属性
 */
interface NavigatorServiceProps extends ServiceProps {
  /**
   * 初始页面，即项目入口页面
   */
  initialPage: string;
  /**
   * 页面集合
   */
  pages: Page[];
  /**
   * web版导航器属性
   */
  web?: WebNavigatorProps & WebServiceProps;
  /**
   * 页面发生改变时
   */
  onPageChange?: OnPageChange;
  /**
   * 导航状态发生改变后
   */
  onNavigationStateChange?: OnNavigationStateChange;
  /**
   * 退出项目App的方法
   * 1. 适用于集成到现有App中的项目使用
   * 2. 由于该操作依赖宿主环境，故将接口暴露出来
   */
  exitApp?: () => void;
  /**
   * 导航配置
   * 1. 设置此属性会覆盖整个导航的配置
   */
  stackConfig?: StackNavigatorConfig;
  /**
   * 默认导航配置
   * 1. 此属性的值会合并组件的默认配置，所以可以不用重写整个默认配置
   */
  defaultNavigationOptions?: NavigationScreenConfig<NavigationScreenOptions>;
}

export { Page, NavigatorServiceProps, OnPageChange, OnNavigationStateChange };
