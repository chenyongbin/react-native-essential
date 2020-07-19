# Loading组件  

## @1.0  

加载窗组件。虽是组件，但不建议直接使用组件。当前模块已经把创建、显示加载窗和隐藏、销毁加载窗的逻辑封装起来，并针对不同场景输出了三对相关操作方法。  

__依赖__  
_react-native-essential/constants/ZIndex_  
_react-native-essential/components/Image/@1.0_  
_react-native-essential/components/Text/@1.0_  
_react-native-essential/components/Popup/@1.0_  

__引入路径__  

```js  
import {
  showLoading,
  hideLoading,
  beginLoading,
  endLoading,
  disableLoading,
  enableLoading,
} from "react-native-essential/components/Loading/@1.0";
```  

__示例__  

![加载中](../../resources/images/loading.png)  

__`showLoading`/`hideLoading`组合__  

一般情况下，使用`showLoading`/`hideLoading`组合来显示、隐藏加载窗。即在操作开始前，显示加载窗；操作结束时，隐藏加载窗，典型的场景如接口请求。

```js  
showLoading();
await beginApiRequest();
hideLoading();
```  

_注意： 上述代码示例只是简单演示该组合方法的使用，请自行处理异步操作状态是`rejected`的情况，以确保操作结束时一定会隐藏加载窗。_  

如果有多个使用了`showLoading`/`hideLoading`组合的接口请求方法，那么同时调用这些请求方法时，加载窗会在所有请求方法都操作完成之后再隐藏。

__`beginLoading`/`endLoading`组合__  

假如有多个使用了`showLoading`/`hideLoading`组合的接口请求方法，有一种场景，需要逐步调用这些请求方法，为了使加载窗不会出现一会显示一会隐藏的情况，可以使用`beginLoading`/`endLoading`组合。  

```js  

// 校验登录
const checkLogin = async () {
    showLoading();
    await fetch(api1);
    hideloading();
}

// 校验用户id
const checkUserId = async () {
    showLoading();
    await fetch(api2);
    hideloading();
}

// 提交委托订单
const postOrder = async () {
    showLoading();
    await fetch(api3);
    hideloading();
}

// 提交委托
const submitOrder = async () {
    // 开始显示加载窗
    beginLoading();

    await checkLogin();
    await checkUserId();
    await postOrder();
    
    // 结束加载窗
    endLoading();
};

```

调用`beginLoading`/`endLoading`组合方法时，会不再执行`showLoading`/`hideLoading`，以此实现在触逐步调用多个使用了`showLoading`/`hideLoading`组合方法异步请求时，不会出现加载窗一会出现一会隐藏的情况。  

__`disableLoading`/`enableLoading`组合__    

有时，不管调用的方法中有没有使用`beginLoading`/`endLoading`或`showLoading`/`hideLoading`，都不想显示加载窗。此时，可以使用`disableLoading`/`enableLoading`组合在某些场景下禁用、启用加载窗。调用该组合方法时，`beginLoading`/`endLoading`和`showLoading`/`hideLoading`都将失效。  

```js  

// 提交委托订单
const postOrder = async () {
    showLoading();
    await fetch(api3);
    hideloading();
}

disableLoading();
postOrder();
enableLoading();

```  


`showLoading`和`beginLoading`方法包含相同的参数  
  
| 参数 | 类型 | 说明 | 默认值 |
| :-: | :-: | - | - |  
| message | `sting` | 加载窗显示消息。加载窗会自动在该字段后面附加...，所以消息最好不用加...。 | `加载中` |  
| delayShow | `boolean` | 是否延迟显示加载窗。若加载窗中间的操作耗时很短，此时加载窗没必要显示，所以默认在调用显示方法后`500ms`才真正显示加载窗。如果不想使用延时逻辑，可以将该属性置为`false`。 | `true` |

