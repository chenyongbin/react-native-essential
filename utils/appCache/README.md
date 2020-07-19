# appCache  

App级别缓存，在`RN`环境中使用[AsyncStorage](https://reactnative.dev/docs/0.55/asyncstorage)，在`web`环境中使用[localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)。  

由于`AsyncStorage`和`localStorage`是多个项目共用的缓存对象，为了防止缓存key相互冲突，在真正使用缓存前，必须指定当前项目名称。如天天宝项目指定了项目名称`A`，那么在该项目中缓存的内容的key都是以`RN_APP_A_`开始的。  

## @1.0  

### 依赖  

_[AsyncStorage](https://reactnative.dev/docs/0.55/asyncstorage)_  

### 引入路径  

```js  
import { default as AppCacheProvider } from "react-native-essential/utils/appCache/@1.0";
```  

简单使用示例：  

```js  
const AppCache = AppCacheProvider(appName);

// 获取缓存值
const value = await AppCache.get(appCacheKey);

// 设置缓存值
AppCache.set(appCacheKey, appCacheValue);

// 删除缓存
AppCache.remove(appCacheKey);

```  

### **get**  

获取缓存。

入参  

| 名称 | 类型 | 说明 | 是否必填 | 默认值 |
| - | - | - | :-: | :- | 
| key | `string` | 缓存key | 是 | 无 |   


出参    

| 名称 | 类型 | 说明 | 
| - | - | - | 
| value | `Promise<string>` | 存储值 |  


### **set**  

添加缓存。

入参  

| 名称 | 类型 | 说明 | 是否必填 | 默认值 |
| - | - | - | :-: | :- | 
| key | `string` | 缓存key | 是 | 无 |   
| value | `string` | 缓存值 | 是 | 无 |   


出参    

_无_


### **remove**  

移除缓存。

入参  

| 名称 | 类型 | 说明 | 是否必填 | 默认值 |
| - | - | - | :-: | :- | 
| key | `string` | 缓存key | 是 | 无 |   


出参    

_无_





