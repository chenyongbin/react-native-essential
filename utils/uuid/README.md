# uuid  

生成随机字符串方法。字符串取值区间时0-9、a-z、A-Z。  

## @1.0   

### 引入路径   

```js  
import { default as Uuid } from "react-native-essential/utils/uuid/@1.0";
```   

入参  

| 名称 | 类型 | 说明 | 是否必填 | 默认值 |
| - | - | - | :-: | :- | 
| length | `number`/`undefined` | 需要随机字符串的长度 | 否 | `32` |   


出参    

| 名称 | 类型 | 说明 | 
| - | - | - | 
| value | `string` | 随机字符串 |  