# fetchData  

有些接口在web端不支持跨域访问，但可以通过`jsonp`方式访问。此方法在`RN`平台使用`get`方法，在`web`平台使用`jsonp`方法。  

## @1.0  

### 依赖 

_[axios](https://github.com/axios/axios)_  


### 引入路径  

```js
import { default as fetchData } from "react-native-essential/utils/fetchData/@1.0";
```  

**入参**  

| 名称 | 类型 | 说明 | 是否必填 | 默认值 |  
| - | - | - | :-: | :- |   
| url | `string` | 请求地址 | 是 | 无 |   
| options | `FetchDataOptions`/`undefined` | 配置 | 否 | 无 |   

`FetchDataOptions`包含的属性如下： 

| 名称 | 类型 | 说明 | 是否必填 | 默认值 |  
| - | - | - | :-: | :- |   
| timeoutMilliseconds | `number`/`undefined` | 超时毫秒数，传0时代表不设超时逻辑 | 否 | `10000` |   
| callbackName | `string`/`undefined` | 使用jsonp方式时的回调名称 | 否 | `callback` |   

**出参**  

出参    

| 名称 | 类型 | 说明 | 
| - | - | - | 
| value | `Promise<string>` | 结果 |  
