import { ReactElement } from "react";
import { PopupClass, Popup } from "../../../Popup/@1.0";
import ZIndex from "../../../../constants/zindex";

import { MessageStyle } from "../shared/Body";
import { DialogProps, createDialog } from "./Dialog";

/**
 * 对话窗可选配置项
 */
type DialogOptions = Omit<DialogProps, "message">;

let dialogPopup: PopupClass | undefined;

/**
 * 销毁对话框
 */
const destroyDialog = () => {
  if (dialogPopup) {
    dialogPopup.destroy();
    dialogPopup = undefined;
  }
};

/**
 * 显示对话窗
 * @param message 对话窗消息会自定义组件
 * @param options 对话窗配置项
 */
const showDialog = (
  message: string | ReactElement,
  options?: DialogOptions
) => {
  destroyDialog();

  const props: DialogProps = Object.assign({}, options, { message });
  props.onOk = () => {
    destroyDialog();
    options && options.onOk && options.onOk();
  };
  if (options && options.cancelText) {
    props.onCancel = () => {
      destroyDialog();
      options.onCancel && options.onCancel();
    };
  }

  dialogPopup = Popup(createDialog(props), {
    zIndex: ZIndex.dialog,
    backgroundColor: "rgba(0,0,0,0.3)",
  });
};

export { showDialog as Dialog, MessageStyle as DialogMessageStyle };
