import { Platform, BackHandler, NativeEventSubscription } from "react-native";
import {
  NavigationActions,
  NavigationContainerComponent,
  NavigationRoute,
  NavigationParams,
  StackActions,
} from "react-navigation";

import debounce from "../../../../utils/debounce/@1.0";

import { NavigatorServiceProps } from "../shared/NavigatorServiceProps";
import { NavigatorLike, WillBackType } from "../shared/NavigatorLike";
import { NavigatorContext } from "../shared/NavigatorContext";
import NavigatorActions from "../shared/NavigatorActions";

/**
 * 导航器集合
 */
const NavigatorContextList: NavigatorContext[] = [],
  DefaultNavigatorContext = new NavigatorContext(null);
/**
 * 正在使用的导航器上下文
 */
let navigatorContext: NavigatorContext = DefaultNavigatorContext,
  backHandlerSubscription: NativeEventSubscription | undefined;

/**
 * 为Android添加物理返回按键监听
 */
const addAndroidBackHandler = () => {
  if (Platform.OS == "android") {
    backHandlerSubscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        debouncedGoback();
        return true;
      }
    );
  }
};

/**
 * 移除Android物理返回按键监听
 */
const removeAndroidBackHandler = () => {
  if (backHandlerSubscription && Platform.OS == "android") {
    backHandlerSubscription.remove();
    backHandlerSubscription = undefined;
  }
};

/**
 * 创建导航器
 * @param appContainer app容器ref对象
 * @param props 属性
 */
const createNavigator = (
  appContainer: NavigationContainerComponent | null,
  props?: NavigatorServiceProps
) => {
  navigatorContext = new NavigatorContext(appContainer, props);
  NavigatorContextList.push(navigatorContext);

  removeAndroidBackHandler();
  addAndroidBackHandler();
};

/**
 * 销毁导航器
 */
const disposeNavigator = () => {
  navigatorContext = DefaultNavigatorContext;
  NavigatorContextList.pop();
  removeAndroidBackHandler();

  if (NavigatorContextList.length > 0) {
    navigatorContext = NavigatorContextList[NavigatorContextList.length - 1];
    addAndroidBackHandler();
  }
};

const getParam = (paramName: string) => navigatorContext.getParam(paramName);

const setParams = (params: NavigationParams) =>
  navigatorContext.setParams(params);

const setParamWith = (paramName: string, paramValue: any) =>
  navigatorContext.setParamWith(paramName, paramValue);

const getPageName = (withTimestamp: boolean) =>
  navigatorContext.getPageName(withTimestamp);

const setWillBack = (willBack: WillBackType) =>
  navigatorContext.setWillBack(willBack);

const navigateTo = (
  page: string,
  params?: NavigationParams,
  backPage?: string
) => {
  if (!!backPage) {
    const routes = navigatorContext.getRouteList();

    // 过滤路由
    while (
      routes.length > 0 &&
      routes[routes.length - 1].routeName != backPage
    ) {
      routes.pop();
    }

    // 重置路由
    const newRoutes = routes.map(({ routeName, params }) => ({
      routeName,
      params,
    }));
    newRoutes.push({ routeName: page, params });

    navigatorContext.onPageChange(NavigatorActions.reset);
    navigatorContext.dispatch(
      StackActions.reset({
        index: newRoutes.length - 1,
        actions: newRoutes.map(NavigationActions.navigate),
      })
    );
  } else {
    navigatorContext.onPageChange(NavigatorActions.navigate);
    navigatorContext.dispatch(
      NavigationActions.navigate({ routeName: page, params })
    );
  }
};

const replace = (page: string, params?: NavigationParams) => {
  const routeList = navigatorContext.getRouteList(),
    routeCount = routeList.length;

  navigatorContext.onPageChange(NavigatorActions.replace);
  if (routeCount >= 2 && routeList[routeCount - 2].routeName == page) {
    // 如果要替换的页面是上一页，那么直接返回
    navigatorContext.dispatch(NavigationActions.back());
    // 如果有带回的参数，则更新对应页面的参数信息
    if (params) {
      const { key, params: oldParams } = routeList[routeCount - 2];
      params = Object.assign(oldParams || {}, params || {});
      navigatorContext.dispatch(NavigationActions.setParams({ key, params }));
    }
  } else {
    navigatorContext.dispatch(
      StackActions.replace({ routeName: page, params })
    );
  }
};

const goBack = async () => {
  const canContinue = await navigatorContext.checkCanGoBack();
  if (!canContinue) {
    return;
  }

  const routes = navigatorContext.getRouteList();
  if (routes.length <= 1) {
    exitApp();
  } else {
    const { key } = routes[routes.length - 1];
    navigatorContext.onPageChange(NavigatorActions.back);
    navigatorContext.dispatch(NavigationActions.back({ key }));
  }
};

/**
 * 添加了防抖逻辑的返回方法
 */
const debouncedGoback = debounce(goBack);

const reload = () => {
  const route = navigatorContext.getRoute();
  if (route) {
    const { routeName, params } = route;
    navigatorContext.onPageChange(NavigatorActions.reload);
    navigatorContext.dispatch(StackActions.replace({ routeName, params }));
  }
};

const reloadApp = () => {
  const routes = navigatorContext.getRouteList();
  if (routes.length > 0) {
    const { routeName, params } = routes[0];
    navigatorContext.onPageChange(NavigatorActions.reloadApp);
    navigatorContext.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName, params })],
      })
    );
  }
};

const exitApp = () => {
  navigatorContext.exitApp();
};

/**
 * 导航器对象
 */
const navigator: NavigatorLike = {
  getParam,
  setParams,
  setParamWith,
  getPageName,
  setWillBack,
  navigateTo: debounce(navigateTo),
  replace: debounce(replace),
  goBack: debouncedGoback,
  reload,
  reloadApp,
  exitApp,
};

export { createNavigator, disposeNavigator };
export default navigator;
