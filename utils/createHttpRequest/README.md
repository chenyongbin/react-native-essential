# createHttpRequest

## @1.0

在请求接口时使用了[axios](https://github.com/axios/axios)，该模块对这个库做了简单的封装。在收到响应后，会简单解析出是否是已取消、已超时、404 或 500+等错误，并统计了请求的耗时。  

### 依赖  

_[axios](https://github.com/axios/axios)_

### 引入路径

```js
import {
  HttpResponseStatus,
  HttpResponse,
  createHttpRequest,
} from "react-native-essential/utils/createHttpRequest/@1.0";
```  

### createHttpRequest<T>方法  

接口请求方法，支持泛型，其默认类型是`any`。

**入参**   

是一个`axios`[请求配置对象](https://github.com/axios/axios#request-config)。  

**出参**  

是一个`HttpResponse`对象  

| 名称 | 类型 | 说明 | 
| - | - | - | 
| status | `HttpResponseStatus` | 解析后的响应状态 |  
| message | `string`/`undefined` | 错误消息 |  
| result | `T` | 接口返回结果 |  
| elapsed | `number` | 请求历时，单位是毫秒 |  
| error | `AxiosError`/`undefined` | 响应时的错误对象 |  
| status | `response`/`undefined` | 接口响应的原始对象 | 

### HttpResponseStatus  

`HttpResponseStatus`是个表示响应状态的枚举类型，其支持的值如下：  

* `Ok` 响应正常  
* `RequestCanceled` 请求已取消  
* `RequestTimeout` 请求已超时  
* `RequestFailed` 请求失败（除其他类型以外的情况，都判定为请求失败）  
* `RequestNotFound` 找不到请求资源（404）  
* `ServerError` 服务器发生错误（500+）   

