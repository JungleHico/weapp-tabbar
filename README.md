# 微信小程序基于 vant-weapp 自定义 tabbar

## 为什么要自定义 tabbar？

微信小程序的全局配置中支持 tabBar，为什么还需要自定义？当我们自定义弹窗时，弹窗的模板不能遮盖默认的底部导航，不符合弹窗的业务功能，使用 `wx.hideTabBar()` 手动隐藏底部导航，又可能导致页面布局重排。综上所述，考虑自定义 tabbar。

## 为什么不用微信小程序的 WeUI 组件库？

WeUI 组件库中使用 `addGlobalClass`，该属性需要基础库版本为 2.2.3，在低版本的环境中无法正常显示样式。使用 vant-weapp，可兼容基础库版本 1.6.8。

## 实现

### 1.引入 vant-weapp 组件库中的 tabbar

参考 vant-weapp 文档 [快速上手](https://vant-contrib.gitee.io/vant-weapp/#/quickstart) 和 [Tabbar](https://vant-contrib.gitee.io/vant-weapp/#/tabbar)，安装 vant-weapp，然后在首页中引入 `tabbar`：

```json
{
  "usingComponents": {
    "van-tabbar": "@vant/weapp/tabbar/index",
    "van-tabbar-item": "@vant/weapp/tabbar-item/index"
  }
}
```

```html
<!-- index.wxml -->
<van-tabbar active="{{active}}" bind:change="onChange">
  <van-tabbar-item icon="wap-home">tab1</van-tabbar-item>
  <van-tabbar-item icon="manager">tab2</van-tabbar-item>
</van-tabbar>
```

```js
// index.js
Page({
  data: {
    active: 0
  },
  onChange(e) {
    this.setData({
      active: e.detail
    })
  }
})
```

### 2.页面布局

```html
<view class="tab-view">

</view>
<van-tabbar active="{{active}}" bind:change="onChange">
  <van-tabbar-item icon="wap-home">tab1</van-tabbar-item>
  <van-tabbar-item icon="manager">tab2</van-tabbar-item>
</van-tabbar>
```

```css
page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.tab-view {
  flex: 1;
  overflow: auto;
}
```

`tabbar`位于底部，`tab-view` 为页面主体内容的容器，占据页面其他空间，同时设置 `overflow: auto;` 支持滚动。

### 创建和引入 tab 页

以组件方式创建两个 tab 页：`pages/tab1` 和 `pages/tab2`

在 `index.json` 中引入两个 tab 页组件：

```json
{
  "usingComponents": {
    "van-tabbar": "@vant/weapp/tabbar/index",
    "van-tabbar-item": "@vant/weapp/tabbar-item/index",
    "tab1": "../tab1/tab1",
    "tab2": "../tab2/tab2"
  }
}
```

使用：

```html
<view class="tab-view">
  <tab1 wx:if="{{active === 0}}"></tab1>
  <tab2 wx:if="{{active === 1}}"></tab2>
</view>
<van-tabbar active="{{active}}" bind:change="onChange">
  <van-tabbar-item icon="wap-home">tab1</van-tabbar-item>
  <van-tabbar-item icon="manager">tab2</van-tabbar-item>
</van-tabbar>