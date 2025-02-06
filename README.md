# electron-vite-vue

Electron Forge + Vite + Vue create electron apps demo

# 多窗口消息端口通信

- 通过 MessageChannelMain() 创建两个端口，将两个端口各自下发到窗口的 webContents
- 通过 ipcRenderer.on() 接入端口，以及监听端口消息
- 新增的窗口需要有独立的渲染进程时，需在 forge.config.js 中加入新渲染进程文件

```JavaScript
// 如：
{
  entry: 'src/settingPreload.js',
  config: 'vite.preload.config.mjs',
  target: 'preload',
},
```

# 注意点

- 采用 vue-router 路由切换时，需采用 hash 模式，且为了在打包好的生产环境下正常跳转，需在 loadFile 增加 hash 参数
- 为避免切换路由时导致组件卸载、重新渲染，导致消息端口监听器失效；需在 router-view 中加入缓存 keep-alive
