<<<<<<< HEAD
# my-vision-app

An Electron application with React and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```
=======
# Segregator_fot_z_tripow
To program do segregacji zdjec z tripow - uzyteczna sprawa. Wykorzystuje narzędzia google (Google Cloud Vision API). Jest to jednocześnie projekt zaliczeniowy na uś (zmpo)
Przy okazji wykorzystuje LLMki od Google wiec fajnie wyglada
Niezbędne do prawidłowego działania programu jest dodanie w głównym folderze programu pliku z kluczami od google pod nazwą google-key.json


Tech Stack:
Backend: Ts w Electronie
Frontend: React (gui).

Google Cloud Vision API (rozpoznawanie obrazów/etykietowanie).
Wykorzystanie lm-ków (modeli jezykowych) Google do inteligentnej analizy i opisu kontekstu zdjęć


Architektura:

mainProcess: Komunikacja z Google Cloud Vision i zarządzanie plikami.
rendererProcess: Interface w Reactcie.
preloadScripts: IPC (pośrednik) między UI a OS.

Program włączany przez konsole:
cd *sciezka do folderu programu*
npm run dev
