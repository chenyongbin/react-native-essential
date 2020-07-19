# getQueryString  

获取url中某个参数的值，只适用于`web`版。  

## @1.0  

### 引入路径  

```js
import { default as getQueryString } from "react-native-essential/utils/getQueryString/@1.0";
```  

**入参**  

| 名称 | 类型 | 说明 | 是否必填 | 默认值 |  
| - | - | - | :-: | :- |   
| name | `string` | 参数名称 | 是 | 无 |   
| isUrl | `boolean`/`undefined` | 是否是url值，如果是的话，会对齐采用不用解码函数 | 否 | 无 |   

**出参**  

| 名称 | 类型 | 说明 | 
| - | - | - | 
| value | `string` | 参数值 |  