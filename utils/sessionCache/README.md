# sessionCache  

会话级缓存，存续于项目App打开期间，在退出项目App时，会清理掉。  

在`RN`环境中使用一个`Map`类型变量存储，在`web`环境中使用[sessionStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage)。  

在某些情况下可能会存在多个项目共用`sessionStorage`，为了防止缓存key相互冲突，在真正使用缓存前，最好指定当前项目名称。如天天宝项目指定了项目名称`A`，那么在该项目中缓存的内容的key都是以`RN_WEB_A_`开始的。 

获取项目名称规则：  

1. 取约定的全局变量`__rnweb_appname`  
2. 如果步骤1没取到值，再解析当前页面地址的`location.pathname`第一段作为项目名称  
3. 如果步骤2也没取到值，选用默认值`ESSENTIAL`

## @1.0   

### 引入路径  

```js  
import { default as SessionCache } from "react-native-essential/utils/sessionCache/@1.0";
```  

### `SessionCache.get<T>`  

获取缓存。

入参  

| 名称 | 类型 | 说明 | 是否必填 | 默认值 |
| - | - | - | :-: | :- | 
| key | `string` | 缓存key | 是 | 无 |   


出参    

| 名称 | 类型 | 说明 | 
| - | - | - | 
| value | `Promise<T>` | 存储值 |  


### `SessionCache.set<T>`    

添加缓存。

入参  

| 名称 | 类型 | 说明 | 是否必填 | 默认值 |
| - | - | - | :-: | :- | 
| key | `string` | 缓存key | 是 | 无 |   
| value | `T` | 缓存值 | 是 | 无 |   


出参    

_无_


### `SessionCache.remove`    

移除缓存。

入参  

| 名称 | 类型 | 说明 | 是否必填 | 默认值 |
| - | - | - | :-: | :- | 
| key | `string` | 缓存key | 是 | 无 |   


出参    

_无_  

### `SessionCache.clear`    

清理当前项目全部缓存。

入参  

_无_ 


出参    

_无_  





