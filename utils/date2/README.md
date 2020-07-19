# date2

JavaScript 项目中，针对日期对象做格式化、计算、比较是常见操作。该模块模仿包装对象`Number`，输出了一个`Date2Class`类和一个可以创建该类实例的方法`Date2`。

`Date2Class`类支持级联操作。  

## @1.1  

与`@1.0`相比，该版有以下变化：  

* 去掉了`addSeconds`、`addMinutes`、`addHours`、`addDays`和`和addYears`这些方法。可以利用`addMilliSeconds`、`addMonths`这两个方法以变通的方式实现这些方法，减少这些方法可以减小`Date2Class`类的体积，减少创建实例时的开销。  

## @1.0

### 依赖

_react-native-essential/utils/string2/@1.0_

### 引入路径

```js
import { Date2Class, default as Date2 } from "react-native-essential/utils/date2/@1.0";
```

`Date2Class`支持的方法如下：

### **static** `isDate`

静态方法，该方法可以判断参数是否是`Date`对象

### `val`

该方法可以返回当前日期对象的值。

### `clone`

克隆并返回一份当前的`Date2Class`对象。

### `format`

返回当前日期对象指定的格式化字符串。

### `addMilliSeconds`

为当前的日期对象增加若干毫秒，并返回当前的`Date2Class`对象。

### `addSeconds`

为当前的日期对象增加若干秒，并返回当前的`Date2Class`对象。

### `addMinutes`

为当前的日期对象增加若干分钟，并返回当前的`Date2Class`对象。

### `addHours`

为当前的日期对象增加若干小时，并返回当前的`Date2Class`对象。

### `addDays`

为当前的日期对象增加若干天，并返回当前的`Date2Class`对象。

### `addMonths`

为当前的日期对象增加若干月，并返回当前的`Date2Class`对象。

### `addYears`

为当前的日期对象增加若干年，并返回当前的`Date2Class`对象。

### `compare`

将当前日期对象和另一个`Date2Class`类型的值比较。小于 0，当前日期早于比较日期；等于 0，当前日期等于比较日期；大于 0，当前日期晚于比较日期。  

### `getWeekDay`  

获取星期描述，如"周日"、"周一"等。  

### `getFullWeekDay`  

获取星期描述，如"星期日"、"星期一"等。  

### `Date2`  

该方法是该模块的默认输出，模仿了包装对象`Number`。通过该方法可以优雅地创建一个`Date2Class`对象。
