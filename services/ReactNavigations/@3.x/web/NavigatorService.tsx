import React, { Component } from "react";
import {
  NavigationRouteConfigMap,
  createSwitchNavigator,
  NavigationContainerComponent,
} from "react-navigation";
import { createBrowserApp } from "@react-navigation/web";

import { NavigatorServiceProps } from "../shared/NavigatorServiceProps";
import { createNavigator } from "./Navigator";

/**
 * 导航器服务
 */
export default class NavigatorService extends Component<NavigatorServiceProps> {
  render() {
    const { initialPage, pages, web } = this.props,
      subPath = web && web.subPath ? web.subPath : "";
    const routeConfig: NavigationRouteConfigMap = {};

    pages.forEach(({ screen, name: page, title, ...resetParams }) => {
      const config = {
        screen,
        params: { page, title: encodeURIComponent(title), ...resetParams },
      };
      routeConfig[subPath ? `${subPath}/${page}` : page] = config;

      // 当有子路径时，设置首页地址
      if (subPath && page == initialPage) {
        routeConfig[subPath] = config;
      }
    });

    const MainSwitch = createSwitchNavigator(routeConfig, {
        initialRouteName: subPath ? `${subPath}/${initialPage}` : initialPage,
      }),
      AppContainer = createBrowserApp(MainSwitch);

    return (
      <AppContainer
        ref={(ref: NavigationContainerComponent) =>
          createNavigator(ref, this.props)
        }
      />
    );
  }
}
