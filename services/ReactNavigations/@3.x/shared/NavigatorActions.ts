/**
 * 导航器操作类型
 */
enum NavigatorActions {
  /**
   * 导航到新页面
   */
  navigate = "navigate-to",
  /**
   * 重置页面导航轨迹。调用navigateTo方法跳转且带有backPage参数时，会重置路由。
   */
  reset = "navigate-to-with-backpage",
  /**
   * 在页面栈中，用新页面替换掉当前页面
   */
  replace = "replace",
  /**
   * 返回
   */
  back = "go-back",
  /**
   * 重新加载当前页面
   */
  reload = "reload",
  /**
   * 重新加载整个项目App
   */
  reloadApp = "reload-app",
  /**
   * 退出App
   */
  exitApp = "exit-app",
}

export default NavigatorActions;
