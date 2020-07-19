import { ReactNode } from "react";
import RootSibling from "../../RootSibling/@1.0";
import { createLayoutView } from "./LayoutView";

interface MeasuredSize {
  /**
   * 宽
   */
  width: number;
  /**
   * 高
   */
  height: number;
}

/**
 * 开始测量组件尺寸
 * @param children 待测量组件
 */
const beginMeasureSize = (
  children?: ReactNode
): Promise<Readonly<MeasuredSize>> => {
  if (!children) {
    return Promise.resolve({ width: 0, height: 0 });
  }

  return new Promise<MeasuredSize>((resolve) => {
    let layoutViewSibling: RootSibling | undefined;
    const onLayoutFinished = (width: number, height: number) => {
      layoutViewSibling && layoutViewSibling.destroy();
      layoutViewSibling = undefined;
      resolve({ width, height });
    };

    layoutViewSibling = new RootSibling(
      createLayoutView(Object.assign({ onLayoutFinished }, { children }))
    );
  });
};

export { MeasuredSize, beginMeasureSize };
