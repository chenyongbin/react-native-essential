# debounce

防抖函数，详细说明参考[这里](https://segmentfault.com/a/1190000018428170)。

## @1.0

### 引入路径

```js
import { default as debounce } from "react-native-essential/utils/debounce/@1.0";
```

**入参**  

| 名称 | 类型 | 说明 | 是否必填 | 默认值 |
| - | - | - | :-: | :- | 
| target | `function` | 目标函数 | 是 | 无 |   
| delay | `number` | 延时时间，单位时毫秒 | 否 | `500` |   

**出参**  

一个封装了防抖逻辑的函数。