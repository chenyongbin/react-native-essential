# MeasureSize组件

## @1.0

测量组件尺寸组件。虽然该模块属于组件，但不会以组件的形式使用。该模块封装、输出了一个测量组件尺寸的方法`beginMeasureSize`。

**依赖**

_react-native-essential/constants/ZIndex_  
_react-native-essential/components/RootSibling/@1.0_

**引入路径**

```js
import {
  MeasuredSize,
  beginMeasureSize,
} from "react-native-essential/components/MeasureSize/@1.0";
```

**实现原理**

该方法会根据目标组件创建一个`RootSibling`，并设置`bottom`样式属性使其不会打扰视图内容后，再监控其`onLayout`事件，最终得到组件的实际尺寸。

```js
const Content = <View />;

const { width, height } = await beginMeasureSize(<Content />);
```
