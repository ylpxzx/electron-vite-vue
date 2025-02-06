const { contextBridge, ipcRenderer } = require('electron/renderer')
let electronMessageTest = null

ipcRenderer.on('port2', e => {
  electronMessageTest = e.ports[0]
})

contextBridge.exposeInMainWorld('electronSettingAPI', {
  pushMessageEvent: (message) => electronMessageTest.postMessage(message),
  onMessagePort: (callback) => ipcRenderer.on('port2', (e) => {
    e.ports[0].onmessage = messageEvent => {
      callback(messageEvent.data)
    }
  }),
})