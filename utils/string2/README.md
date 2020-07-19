# string2

JavaScript 项目中，针对日期对象做格式化、计算、比较是常见操作。该模块模仿包装对象`Number`，输出了一个`String2Class`类和一个可以创建该类实例的方法`String2`。

## @1.0

### 引入路径

```js
import {
  String2Class,
  default as String2,
} from "react-native-essential/utils/string2/@1.0";
```

`String2Class`支持的方法如下：

### `val`

该方法可以返回当前字符串。

### `padStart`

补全字符串左侧。

### `padEnd`

补全字符串右侧。

### `contains`

判断是否包含目标字符串

### `beautify`

美化字符串为日期或时间格式。"163908  -### 16:39:08"，"63908  -### 06:39:08"，"20150507  -### 2015-05-07"。

### `equals`

和另一个字符串比较内容是否一致。

### `String2`

该方法是该模块的默认输出，模仿了包装对象`Number`。通过该方法可以优雅地创建一个`String2Class`对象。
