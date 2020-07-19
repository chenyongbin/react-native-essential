# Dialog 和 MultiDialog组件

## @1.0

对话窗组件。虽是组件，但不建议直接使用组件。当前模块已经把创建、销毁对话窗的逻辑封装起来，并输出两个方法：`Dialog`和`MultiDialog`。

**依赖**  
_react-native-essential/constants/zindex_  
_react-native-essential/components/Text/@1.0_  
_react-native-essential/components/Popup/@1.0_

### Dialog

**引入路径**

```js
import {
  DialogMessageStyle,
  Dialog,
} from "react-native-essential/components/Dialog/@1.0/Dialog";
```

**示例**

![单个按钮对话窗](../../resources/images/dialog_one.png) ![两个个按钮对话窗](../../resources/images/dialog_two.png)

`Dialog`方法支持两个参数：

- `message`，`string` / `ReactElement`类型，对话窗内容，支持字符串和自定义组件
- `options`，`DialogOptions`类型，用于配置对话窗的样式和一些行为

**`DialogOptions`包含的属性**

| 名称       | 类型                                     | 说明                                                                       | 是否必填 | 默认值     |
| ---------- | ---------------------------------------- | -------------------------------------------------------------------------- | :------: | :--------- |
| title      | `string`                                 | 标题                                                                       |    否    | `温馨提示` |
| hideTitle  | `boolean`                                | 是否隐藏标题                                                               |    否    | 无         |
| align      | `auto`/`left`/`right`/`center`/`justify` | 消息对齐格式                                                               |    否    | `center`   |
| okText     | `string`                                 | 一个按钮时，按钮显示内容；两个按钮时，右边按钮内容                         |    否    | `确定`     |
| cancelText | `string`                                 | 两个按钮时，左按钮内容。想要显示两个按钮，设置了该属性，才会显示两个按钮。 |    否    | 无         |
| onOk       | `function`                               | 一个按钮时，默认按钮处理方法；两个按钮时，右边按钮处理方法                 |    否    | 无         |
| onCancel   | `string`                                 | 两个按钮时，左边按钮处理方法                                               |    否    | 无         |

### MultiDialog

多个对话混杂在一起的对话窗组件。

```js
import {
  DialogMessageStyle,
  MultiDialog,
} from "react-native-essential/components/Dialog/@1.0/MultiDialog";
```

**示例**

![多对话窗](../../resources/images/multidialog.png)

`MultiDialog`方法只有一个参数，类型是`MultiDialogOptions`，该类型只有个属性是`data`，其类型是个`DialogProps`的数组，而`DialogProps`类型相比`DialogOptions`多了一个`message`属性。

其类型关系如下：

```ts
interface DialogOptions {}

interface DialogProps extends DialogOptions {
  message: string;
}

interface MultiDialogOptions {
  data: DialogProps[];
}
```
