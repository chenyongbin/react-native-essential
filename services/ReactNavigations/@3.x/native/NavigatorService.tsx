import React, { Component } from "react";
import { Easing, Animated } from "react-native";
import {
  StackNavigatorConfig,
  NavigationRouteConfigMap,
  createStackNavigator,
  createAppContainer,
  NavigationScreenConfig,
  NavigationScreenOptions,
  NavigationSceneRendererProps,
  NavigationContainerComponent,
} from "react-navigation";

import HeaderLeft from "./HeaderLeft";
import HeaderTitle from "./HeaderTitle";
import HeaderRight from "./HeaderRight";
import HeaderConstants from "./HeaderConstants";
import { NavigatorServiceProps } from "../shared/NavigatorServiceProps";
import Navigator, { createNavigator, disposeNavigator } from "./Navigator";

type DefaultNavigationOptionsProvider = NavigationScreenConfig<
  NavigationScreenOptions
>;

/**
 * 获取默认导航配置
 */
const getDefaultNavigationOptions: DefaultNavigationOptionsProvider = ({
  navigation,
}) => {
  return {
    headerStyle: {
      height: HeaderConstants.height,
      borderBottomWidth: 0,
      backgroundColor: HeaderConstants.backgroundColor,
    },
    headerLeft: <HeaderLeft onPress={Navigator.goBack} />,
    headerTitle: <HeaderTitle title={navigation.getParam("title")} />,
    headerRight: <HeaderRight />,
    headerBackTitle: null,
    headerTintColor: "#fff",
    headerTitleAllowFontScaling: true,
    headerTitleContainerStyle: { flex: 1 },
  };
};

/**
 * 获取转场配置
 */
const getTransitionConfig = () => {
  return {
    transitionSpec: {
      duration: 350,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
    screenInterpolator: (sceneProps: NavigationSceneRendererProps) => {
      const { layout, position, scene } = sceneProps || {};
      const { index } = scene;
      const width = layout.initWidth;
      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [width, 0, 0],
      });
      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });
      return { opacity, transform: [{ translateX }] };
    },
  };
};

/**
 * 合并默认导航配置
 * @param defaultNavigationOptions 传入的默认导航配置
 */
const mergeDefaultNavigationOptions = (
  defaultNavigationOptions?: DefaultNavigationOptionsProvider
) => {
  const mergedProvider: DefaultNavigationOptionsProvider = (options) => {
    const myOptions = getDefaultNavigationOptions(options);
    if (defaultNavigationOptions) {
      if (typeof defaultNavigationOptions == "function") {
        return Object.assign(myOptions, defaultNavigationOptions(options));
      } else {
        return Object.assign(myOptions, defaultNavigationOptions);
      }
    }
    return myOptions;
  };
  return mergedProvider;
};

/**
 * 获取默认栈导航器配置
 * @param props 属性
 */
const getDefaultStackConfig = (
  props: NavigatorServiceProps
): StackNavigatorConfig => {
  return {
    headerMode: "float",
    initialRouteName: props.initialPage,
    transitionConfig: getTransitionConfig,
    defaultNavigationOptions: mergeDefaultNavigationOptions(
      props.defaultNavigationOptions
    ),
  };
};

/**
 * 导航器服务
 */
export default class NavigatorService extends Component<NavigatorServiceProps> {
  componentWillUnmount() {
    disposeNavigator();
  }

  render() {
    const { pages, stackConfig, onNavigationStateChange } = this.props,
      routeConfig: NavigationRouteConfigMap = {};

    pages.forEach(({ name: page, screen, ...resetParams }) => {
      routeConfig[page] = { screen, params: { page, ...resetParams } };
    });

    const MainStack = createStackNavigator(
        routeConfig,
        stackConfig || getDefaultStackConfig(this.props)
      ),
      AppContainer = createAppContainer(MainStack);

    return (
      <AppContainer
        ref={(ref: NavigationContainerComponent) =>
          createNavigator(ref, this.props)
        }
        onNavigationStateChange={onNavigationStateChange}
      />
    );
  }
}
