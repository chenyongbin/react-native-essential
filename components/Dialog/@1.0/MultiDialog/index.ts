import { PopupClass, Popup } from "../../../Popup/@1.0";
import ZIndex from "../../../../constants/zindex";

import { MessageStyle } from "../shared/Body";
import {
  MultiDialogProps,
  createMultiDialog,
} from "../MultiDialog/MutilDialog";

/**
 * 多个对话窗可选配置项
 */
type MultiDialogOptions = Omit<MultiDialogProps, "hideMultiDialog">;

let multiDialogPopup: PopupClass | undefined;

/**
 * 销毁多个对话框
 */
const destroyMultiDialog = () => {
  if (multiDialogPopup) {
    multiDialogPopup.destroy();
    multiDialogPopup = undefined;
  }
};

/**
 * 显示多个对话窗混合的对话窗
 * @param message 对话窗消息会自定义组件
 * @param options 对话窗配置项
 */
const showMultiDialog = (options: MultiDialogOptions) => {
  destroyMultiDialog();
  multiDialogPopup = Popup(
    createMultiDialog(
      Object.assign({ hideMultiDialog: destroyMultiDialog }, options)
    ),
    { zIndex: ZIndex.notice, backgroundColor: "rgba(0,0,0,0.3)" }
  );
};

export { showMultiDialog as MultiDialog, MessageStyle as DialogMessageStyle };
