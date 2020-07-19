# IPhoneXShimView组件  

## @1.0  

`iPhone X`及其以后机型在屏幕底部会有一个`TabBar`按钮，页面中如果底部也有一个按钮，用户在点触`TabBar`或页面按钮时可能会误触彼此。  

为了防止这种情况的出现，需要对带有`TabBar`按钮的机型做特殊处理，在页面底部按钮下面加一小段空间，使其远离`TabBar`。  

该组件封装了判断机型、增加垫片空间逻辑，故在需要针对`TabBar`做特殊处理的地方，只需要在其下方添加该组件即可。  

该组件增加的垫片高度是`20`，在不带有`TabBar`的机型上，高度是`0`。  

__引入路径__  

```js  
import IPhoneXShimView from 'react-native-essential/components/IPhoneXShimView/@1.0';
```  

__示例__   
_无_  

__代码示例__  
```js  
<View>
    <BottomButton/>
    <IPhoneXShimView/>
</View>
```