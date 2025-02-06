// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron/renderer')

let electronMessage = null

ipcRenderer.on('port1', e => {
  electronMessage = e.ports[0]
})

contextBridge.exposeInMainWorld('electronAPI', {
  pushMessageEvent: (message) => electronMessage.postMessage(message),
  onMessagePort: (callback) => {
    const listener = (e) => {
      e.ports[0].onmessage = messageEvent => {
        callback(messageEvent.data)
      }
    }
    ipcRenderer.on('port1', listener)
    return () => ipcRenderer.removeListener('port1', listener)
  },
})

