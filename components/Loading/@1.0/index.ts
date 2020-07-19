import { PopupClass, Popup } from "../../Popup/@1.0";
import ZIndex from "../../../constants/zindex";
import getEmAppContentOffsetToTop from "../../../utils/getEmAppContentOffsetToTop/@1.0";
import createLoading from "./Loading";

let loadingPopup: PopupClass | undefined,
  enabled = true,
  manualLoading = false,
  visible = false,
  showCount = 0,
  timerId: number | undefined;

/**
 * 清除定时器
 */
const clearTimer = () => timerId && clearTimeout(timerId);

/**
 * 创建加载窗
 */
const buildLoading = (message: string) => {
  const loading = createLoading({ message }),
    top = getEmAppContentOffsetToTop(true);
  loadingPopup && loadingPopup.destroy();
  loadingPopup = Popup(loading, {
    style: { top },
    zIndex: ZIndex.loading,
    backgroundColor: "rgba(255,255,255,0)",
  });
};

/**
 * 销毁加载窗
 */
const destroyLoading = () => {
  clearTimer();
  manualLoading = false;
  enabled = true;
  visible = false;
  showCount = 0;
  loadingPopup && loadingPopup.destroy();
  loadingPopup = undefined;
};

/**
 * 手动启用loading
 */
const enableLoading = () => (enabled = true);

/**
 * 手动禁用loading
 */
const disableLoading = () => {
  destroyLoading();
  enabled = false;
};

/**
 * 手动开始loading
 * @param message 消息
 * @param delayShow 是否延迟显示loading，默认是延迟500ms显示
 */
const beginLoading = (
  message: string = "加载中",
  delayShow: boolean = true
) => {
  if (!enabled) {
    return;
  }

  manualLoading = true;
  if (delayShow) {
    timerId = window.setTimeout(() => {
      manualLoading && buildLoading(message);
    }, 500);
  } else {
    buildLoading(message);
  }
};

/**
 * 手动结束loading
 */
const endLoading = () => {
  manualLoading = false;
  destroyLoading();
};

/**
 * 显示加载窗
 * @param message 消息，默认是“加载中”
 * @param delayShow 是否延迟显示加载窗，默认是
 */
const showLoading = (message: string = "加载中", delayShow: boolean = true) => {
  if (!enabled || manualLoading) {
    return;
  }

  showCount++;
  if (visible) {
    return;
  }

  visible = true;
  if (delayShow) {
    clearTimer();
    timerId = window.setTimeout(buildLoading, 500, message);
  } else {
    buildLoading(message);
  }
};

/**
 * 隐藏加载窗
 */
const hideLoading = () => {
  if (!enabled || manualLoading) {
    return;
  }

  showCount > 0 && showCount--;
  if (showCount > 0 || !visible) {
    return;
  }

  destroyLoading();
};

export {
  showLoading,
  hideLoading,
  beginLoading,
  endLoading,
  enableLoading,
  disableLoading,
};
