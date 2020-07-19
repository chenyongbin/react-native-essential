import { ReactElement } from "react";
import RootSibling from "../../RootSibling/@1.0";
import { ToastProps, createToast } from "./Toast";

/**
 * Toast配置项
 */
interface ToastOptions extends Omit<ToastProps, "message" | "onPress2Hide"> {
  /**
   * 自动隐藏时间，默认是1500毫秒
   */
  hideDuration?: number;
  /**
   * 提示窗自动隐藏时的回调函数
   */
  onHide?: () => void;
  /**
   * 是否开启点击隐藏
   * 1. 默认开启
   * 2. 当内容是自定义组件时，不适用
   */
  press2Hide?: boolean;
}

/**
 * 创建一个toast
 */
export default (
  message: string | ReactElement,
  {
    hideDuration = 1500,
    onHide,
    mode = "push-up",
    press2Hide = true,
  }: ToastOptions = {}
) => {
  let autoHideTimer: number | undefined,
    toastSibling: RootSibling | undefined,
    newMessage = "",
    children: ReactElement | undefined;

  if (typeof message == "string") {
    newMessage = message;
  } else {
    children = message;
  }

  const props: ToastProps = { message: newMessage, mode },
    destroyToast = () => {
      if (autoHideTimer) {
        clearTimeout(autoHideTimer);
        autoHideTimer = undefined;
      }
      if (toastSibling) {
        toastSibling.destroy();
        toastSibling = undefined;
      }
      onHide && onHide();
    };

  if (press2Hide) {
    props.onPress2Hide = destroyToast;
  }

  toastSibling = new RootSibling(
    createToast(Object.assign(props, { children }))
  );
  autoHideTimer = window.setTimeout(destroyToast, hideDuration);
};
