//------------------------importy i konfiguracja------------
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { join } from 'path';
import { readFileSync, copyFileSync } from 'fs';
const vision = require('@google-cloud/vision');

let mainWindow: BrowserWindow | null = null;

//-------------------------------------TWORZENIE OKNA APLIKACJI--------------------------------------------

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      sandbox: false
    }
  });
  

  mainWindow.loadURL('http://localhost:5173'); 
}

//------------------------wyłączenie cache GPU (dla lepszej wydajności)------------------------------

app.commandLine.appendSwitch('disable-gpu-shader-disk-cache');
app.commandLine.appendSwitch('disable-gpu-program-cache');

//uruchan=mianie okna gdy aplikacja jest gotowa
app.whenReady().then(createWindow);

//----------------------------------odpala okienko wyboru pliku do analizy---------------
ipcMain.handle('select-file', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png'] }]
  });

  if (canceled || filePaths.length === 0) return null;
  return filePaths[0];
});

//------------------------------------OBSŁUGA GOOGLE VISION--------------------------------------------
ipcMain.handle('upload-and-analyze', async (_event, originalPath) => {
  if (!originalPath) return ['No file selected'];

  const client = new vision.ImageAnnotatorClient({
    keyFilename: join(__dirname, '../../google-key.json')
  });

  const copiedPath = join(app.getPath('documents'), `photo_${Date.now()}.jpg`);
  copyFileSync(originalPath, copiedPath);

  const [result] = await client.labelDetection(copiedPath);
  const labels = result.labelAnnotations?.map((label: any) => label.description) || [];

  return labels;
});
