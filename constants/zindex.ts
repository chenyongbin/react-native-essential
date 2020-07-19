/**
 * zIndex枚举，在这里标记所有用到的zIndex值，方便管理
 */
enum ZIndex {
  /**
   * toast提示
   */
  toast = 9999,
  /**
   * 公告提示
   */
  notice = 7999,
  /**
   * 对话窗
   */
  dialog = 5999,
  /**
   * 加载窗
   */
  loading = 3999,
  /**
   * 一般弹窗
   */
  popup = 1999,
  /**
   * 一般遮罩层
   */
  mask = 100,
  /**
   * 一般顶层元素
   */
  topElement = 1,
}

export default ZIndex;
