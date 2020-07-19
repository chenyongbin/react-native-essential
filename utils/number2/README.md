# number2

JavaScript 项目中，针对日期对象做格式化、计算、比较是常见操作。该模块模仿包装对象`Number`，输出了一个`Number2Class`类和一个可以创建该类实例的方法`Number2`。

`Number2Class`类支持级联操作。

## @1.0

### 引入路径

```js
import {
  Number2Class,
  default as Number2,
} from "react-native-essential/utils/number2/@1.0";
```

`Number2Class`支持的方法如下：

### `val`

该方法可以返回当前数值。

### `add`

加法。

### `sub`

减法。

### `mul`

乘法。

### `div`

除法。

### `toFixed`

四舍五入方法。

### `toThousands`

将数值转换为用千分位表示的字符串，如`20302` =### `20,302`。

### `toWan`

将数值转换为用单位是万的字符串，如`20302` =### `2.03`。

### `Number2`

该方法是该模块的默认输出，模仿了包装对象`Number`。通过该方法可以优雅地创建一个`Number2Class`对象。
