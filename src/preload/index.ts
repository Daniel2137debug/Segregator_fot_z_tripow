import { contextBridge, ipcRenderer } from 'electron';

//------------------------------------UDOSTEPNIANIE API DO RENDERERA--------------------------------------------
contextBridge.exposeInMainWorld('electronAPI', {
  selectFile: () => ipcRenderer.invoke('select-file'),
  analyze: (filePath: string) => ipcRenderer.invoke('upload-and-analyze', filePath)
});
