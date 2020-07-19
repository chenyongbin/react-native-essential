import {
  NavigationContainerComponent,
  NavigationParams,
  NavigationActions,
} from "react-navigation";

import debounce from "../../../../utils/debounce/@1.0";
import getQueryString from "../../../../utils/getQueryString/@1.0";

import { NavigatorContext } from "../shared/NavigatorContext";
import { NavigatorLike, WillBackType } from "../shared/NavigatorLike";
import NavigatorActions from "../shared/NavigatorActions";
import { NavigatorServiceProps } from "../shared/NavigatorServiceProps";
import PageRecords from "./PageRecords";

/**
 * 正在使用的导航器
 */
let navigatorContext: NavigatorContext = new NavigatorContext(null);
/**
 * 页面记录集合对象
 */
let pageRecords = new PageRecords("");

/**
 * 创建导航器
 * @param appContainer app容器ref对象
 * @param firstEntry 是否是首次进入
 */
const createNavigator = (
  appContainer: NavigationContainerComponent | null,
  props?: NavigatorServiceProps
) => {
  navigatorContext = new NavigatorContext(appContainer, props);

  // 初始化页面记录对象
  props && (pageRecords = new PageRecords(props.appName));

  // 设置标题
  const title = decodeURIComponent(navigatorContext.getParam("title") || "");
  document.title = title;

  // 注册浏览器返回事件
  history.pushState(null, title, location.href);
  window.onpopstate = () => {
    try {
      debouncedGoback();
    } catch (error) {
      console.warn("onpopstate", error);
    }
  };

  if (props && props.web) {
    const { firstEntry, setTitle, setBackHandler } = props.web;

    // 首次进入时，清空之前的记录，增加一条页面记录
    if (firstEntry) {
      pageRecords.clear();
      const route = navigatorContext.getRoute();
      route && pageRecords.push(props.initialPage, route.params);
    }

    // 宿主有自定义设置标题方法时，执行
    try {
      setTitle && setTitle(title);
    } catch (error) {
      console.warn("setTitle", error);
    }

    // 注册宿主返回处理方法
    try {
      setBackHandler && setBackHandler(debouncedGoback);
    } catch (error) {
      console.warn("setBackHandler", error);
    }
  }
};

/**
 * 组装将要跳转的页面完整地址
 * @param page 页面名称
 * @param params 参数
 */
const buildUrl = (page: string, params?: NavigationParams) => {
  params = Object.assign({}, params, { page });
  const paramList = Object.entries(params).map(([k, v]) => `${k}=${v}`);
  return `${location.origin}${location.pathname}?${paramList.join("&")}`;
};

const getParam = (paramName: string) => navigatorContext.getParam(paramName);

const setParams = (params: NavigationParams) => {
  setTimeout(() => {
    const route = navigatorContext.getRoute();
    if (route) {
      const { key, routeName } = route;
      navigatorContext.dispatch(NavigationActions.setParams({ key, params }));
      pageRecords.update(routeName, params);
    }
  }, 0);
};

const setParamWith = (paramName: string, paramValue: any) => {
  const params: any = {};
  params[paramName] = paramValue;
  setParams(params);
};

const getPageName = (withTimestamp = false) => {
  const page = getQueryString("page");
  if (page) {
    return withTimestamp ? `${page}_${navigatorContext.pageTimestamp}` : page;
  }
  return "";
};

const setWillBack = (willBack: WillBackType) =>
  setTimeout(() => navigatorContext.setWillBack(willBack), 0);

const navigateTo = (
  page: string,
  params?: NavigationParams,
  backPage?: string
) => {
  // 插入记录
  pageRecords.push(page, params, backPage);
  // 触发事件
  navigatorContext.onPageChange(
    backPage ? NavigatorActions.reset : NavigatorActions.navigate
  );
  // 跳到新页面
  location.href = buildUrl(page, params);
};

const replace = (page: string, params?: NavigationParams) => {
  // 先弹出一条记录
  pageRecords.pop();

  // 再检查新页面是否已存在
  let result = pageRecords.findLast(page);
  if (result.index >= 0) {
    // 若已存在，但不是最近的一条的记录，继续弹出记录
    while (result.index > 0) {
      pageRecords.pop();
      result = pageRecords.findLast(page);
    }
    // 更新参数
    pageRecords.update(page, params);
  } else {
    // 若不存在，则插入一条记录
    pageRecords.push(page, params);
  }

  // 触发事件
  navigatorContext.onPageChange(NavigatorActions.replace);
  // 跳到新页面
  location.href = buildUrl(
    page,
    Object.assign({}, result.record ? result.record.params : {}, params)
  );
};

const goBack = async () => {
  const canContinue = await navigatorContext.checkCanGoBack();
  if (!canContinue) {
    return;
  }

  // 弹出一条记录
  const prevPage = pageRecords.pop();
  if (!prevPage) {
    // 若前面已没有页面，或该页面有退出的标志，则退出整个app
    navigatorContext.exitApp();
  } else {
    // 触发事件
    navigatorContext.onPageChange(NavigatorActions.back);
    // 跳到前一个页面
    location.href = buildUrl(prevPage.page, prevPage.params);
  }
};

/**
 * 添加了防抖逻辑的返回方法
 */
const debouncedGoback = debounce(goBack);

const reload = () => {
  navigatorContext.onPageChange(NavigatorActions.reload);
  location.reload();
};

const reloadApp = () => {
  let route = pageRecords.pop(),
    lastRoute = route;

  while (!!route) {
    lastRoute = route;
    route = pageRecords.pop();
  }

  if (lastRoute) {
    const { page, params } = lastRoute;
    pageRecords.push(page, params);
    navigatorContext.onPageChange(NavigatorActions.reloadApp);
    location.href = buildUrl(page, params);
  }
};

const exitApp = () => {
  pageRecords.clear();
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

export { createNavigator };
export default navigator;
