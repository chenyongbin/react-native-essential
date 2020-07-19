# Spacer组件  

## @1.0  

空间间隔组件。主要用于页面布局时，在两个区块间增加间隔。使用这个组件比使用`padding`、`magin`更直观和方便。支持水平和垂直方向上的间隔效果，默认是垂直方向间隔。  

**支持的属性**  

| 名称 | 类型 | 说明 | 是否必填 | 默认值 |  
| - | - | - | :-: | :- |  
| direction | `horizontal`/`vertical` | 方向。`horizontal`=水平，`vertical`=垂直，默认是垂直方向。 | 否 | `vertical` |  
| width | `number` | 宽度 | 否 | 水平方向时有效，默认值是15，垂直方向时是固定值100%。 |  
| height | `number` | 高度 | 否 | 垂直方向时有效，默认值是30，水平方向时为固定值100%。 |  
| backgroundColor | `string` | 背景色 | 否 | `transparent` |  