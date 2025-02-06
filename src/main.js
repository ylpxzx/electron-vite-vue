import { app, BrowserWindow, MessageChannelMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

// Avoid Warning：Electron Security Warning (Insecure Content-Security-Policy) This renderer process has either no Content Security
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

if (started) {
  app.quit();
}

// crerate message channel
const { port1, port2 } = new MessageChannelMain()

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeintegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // webContents准备就绪后，使用postMessage向webContents发送一个端口。
  mainWindow.once('ready-to-show', () => {
    mainWindow.webContents.postMessage('port1', null, [port1])
  })

  // mainWindow.webContents.openDevTools();
};

const createSettingsWindow = () => {
  const settingsWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeintegration: true,
      preload: path.join(__dirname, 'settingPreload.js'),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    const settingUrl = `${MAIN_WINDOW_VITE_DEV_SERVER_URL}/#/settings`;
    settingsWindow.loadURL(settingUrl);
  } else {
    // hash: 'settings', 保证打包好的生产环境下正常跳转
    settingsWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`), { hash: 'settings' });
  }

  settingsWindow.once('ready-to-show', () => {
    settingsWindow.webContents.postMessage('port2', null, [port2])
  })

  // settingsWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
  createSettingsWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});