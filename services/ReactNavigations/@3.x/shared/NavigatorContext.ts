import {
  NavigationState,
  NavigationParams,
  NavigationAction,
  NavigationRoute,
  NavigationActions,
  NavigationContainerComponent,
} from "react-navigation";
import { NavigatorServiceProps } from "./NavigatorServiceProps";
import NavigatorActions from "./NavigatorActions";
import { WillBackType } from "./NavigatorLike";

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
 * 导航器上下文类
 */
export class NavigatorContext {
  private pageTimestampValue = Date.now();
  private willBackParamName = "react_navigation_3x_willback_id";
  private willBackMap = new Map<string, WillBackType>();

  /**
   * 构造函数
   * @param appContainer app容器对象
   * @param props 属性
   */
  constructor(
    private readonly appContainer: NavigationContainerComponent | null,
    private readonly props?: NavigatorServiceProps
  ) {
    this.dispatch = this.dispatch.bind(this);
    this.getRouteList = this.getRouteList.bind(this);
    this.getRoute = this.getRoute.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.setWillBack = this.setWillBack.bind(this);
    this.checkCanGoBack = this.checkCanGoBack.bind(this);
    this.getPageName = this.getPageName.bind(this);
    this.getParam = this.getParam.bind(this);
    this.setParams = this.setParams.bind(this);
    this.setParamWith = this.setParamWith.bind(this);
    this.exitApp = this.exitApp.bind(this);
  }

  /**
   * 页面时间戳
   */
  get pageTimestamp() {
    return this.pageTimestampValue;
  }

  /**
   * 触发操作
   * @param action 目标操作
   */
  dispatch(action: NavigationAction) {
    this.appContainer && this.appContainer.dispatch(action);
  }

  /**
   * 获取路由列表
   */
  getRouteList(): NavigationRoute<NavigationParams>[] {
    const routeList: NavigationRoute<NavigationParams>[] = [];
    if (this.appContainer) {
      const appState = this.appContainer.state as AppContainerState;
      if (appState && appState.nav) {
        const { routes } = appState.nav;
        routeList.push(...routes);
      }
    }
    return routeList;
  }

  /**
   * 获取当前路由
   */
  getRoute(): NavigationRoute<NavigationParams> | undefined {
    if (this.appContainer) {
      const appState = this.appContainer.state as AppContainerState;
      if (appState && appState.nav) {
        const { index, routes } = appState.nav;
        return routes[index];
      }
    }
    return undefined;
  }

  /**
   * 页面改变时
   * @param action 操作
   */
  onPageChange(action: NavigatorActions) {
    this.pageTimestampValue = Date.now();
    if (this.props && this.props.onPageChange) {
      const route = this.getRoute();
      route && this.props.onPageChange(action, route.routeName, route.params);
    }

    // 删除willBack
    const willBackKey = this.getParam(this.willBackParamName) as string;
    willBackKey && this.willBackMap.delete(willBackKey);
  }

  /**
   * 获取页面名称
   * 1. 该名称不是页面标题，而是页面路由名称
   * 2. 可指定是否带有页面时间戳参数，该时间戳表示进入该页面的即刻时间
   * 3. 离开当前页面再返回，该时间戳也会不一样
   * @param withTimestamp 是否带有页面时间戳，默认不带有
   */
  getPageName(withTimestamp = false) {
    const route = this.getRoute();
    if (route) {
      return withTimestamp
        ? `${route.routeName}_${this.pageTimestampValue}`
        : route.routeName;
    }
    return "";
  }

  /**
   * 获取对应参数的值
   * @param paramName 参数名称
   */
  getParam(paramName: string) {
    const route = this.getRoute();
    return route && route.params ? route.params[paramName] : undefined;
  }

  /**
   * 设置参数
   * @param params 参数
   */
  setParams(params: NavigationParams) {
    const route = this.getRoute();
    if (route) {
      this.dispatch(NavigationActions.setParams({ key: route.key, params }));
    }
  }

  /**
   * 设置单个参数
   * @param paramName 参数名称
   * @param paramValue 参数值
   */
  setParamWith(paramName: string, paramValue: any) {
    const params: any = {};
    params[paramName] = paramValue;
    this.setParams(params);
  }

  /**
   * 设置返回前操作
   * 1. 在点返回按钮时，需要做一些额外操作的，可以调用该方法设置
   * 2. 参数是一个返回了Promise对象的函数
   * 3. Promise对象的结果必须是布尔类型，导航器会根据这个值判断要不要继续，true=继续返回，false=暂不返回
   * @param willBack 自定义的返回前操作
   */
  setWillBack(willBack: WillBackType) {
    const willBackKey = Date.now().toString();
    this.setParamWith(this.willBackParamName, willBackKey);
    this.willBackMap.set(willBackKey, willBack);
  }

  /**
   * 校验是否可以继续返回
   * @returns true=可以继续返回，false=暂不能返回
   */
  async checkCanGoBack(): Promise<boolean> {
    if (this.willBackMap.size == 0) {
      return true;
    }

    const willBack = this.willBackMap.get(
      this.getParam(this.willBackParamName)
    );
    if (!willBack) {
      return true;
    }

    return await willBack()
      .then((r) => r)
      .catch(() => true);
  }

  /**
   * 退出app
   */
  exitApp() {
    this.onPageChange(NavigatorActions.exitApp);
    if (this.props) {
      this.props.exitApp && this.props.exitApp();
    }
  }
}
