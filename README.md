# vue-slide-show
vue-slide-show是一个Vue2.x的3d轮播组件

## Demo

[demo](https://susucain.github.io/vue-slide-show/)

## 使用

在vue单文件组件中

```javascript
export SlideShow from 'vue-slide-show'

export default {
  ...
  components: {
    SlideShow
  }
  ...
};
```
html结构，属性根据需要设置

```html
<slide-show 
  :slides="slides" 
  :width="width"
  :height="height"
  :autoplay="autoplay"
  :display-count="displayCount"
  :space="space">
</slide-show>
```


## Props

| 名称               | 类型             | 默认值                     | 描述                                  |
| ---------------- | -------------- | ----------------------- | ----------------------------------- |
| slides           | Array          | []                      | 滑块数组，数组中每一项都是对象，对象的background属性必须填写 |
| displayCount     | Number         | 5                       | 同时显示的滑块个数                           |
| animationSpeed   | Number         | 1000                    | 轮播时滑块的过渡时间                          |
| autoplay         | Boolean        | false                   | 是否自动轮播                              |
| width            | Number         | 300                     | 滑块宽度                                |
| height           | Number         | 270                     | 滑块高度                                |
| bannerWidth      | String         | 100%                    | 滑块父元素宽度                             |
| disable3d        | Boolean        | false                   | 是否禁用3d效果                            |
| inverseScaling   | Number         | 300                     | 启用3d效果时有效，值越大，两边的滑块离屏幕越远，看起来越小      |
| autoplayTimeout  | Number         | 2000                    | 自动播放时的延迟时间                          |
| space            | Number, String | auto                    | 值越大，两边滑块偏移距离越大                      |
| buttonStyle      | Object         | {}                      | 按钮样式                                |
| buttonBackground | String         | rgba(255, 255, 255, .3) | 按钮背景颜色                              |
| lightBackground  | String         | #01BDFF                 | 轮播到当前按钮对应的滑块时的背景颜色                  |

## License

MIT

