(function() {

  // courtesy: https://github.com/sindresorhus/electron-boilerplate/blob/master/boilerplate/index.js
  'use strict';
  const electron = require('electron');
  const app = electron.app;
  const path = require('path');
  const firebase = require('firebase');
  const Store = require('./node_scripts/storage.js');
  const init = require('./node_scripts/firebase-config.js');

  // adds debug features like hotkeys for triggering dev tools and reload
  require('electron-debug')({showDevTools: true});

  //self explanatory, add firebase
  firebase.initializeApp(init);

  // prevent window being garbage collected
  let mainWindow;

  function onClosed() {
  	// dereference the window
  	// for multiple windows store them in an array
  	mainWindow = null;
  }

  function createMainWindow() {
  	const win = new electron.BrowserWindow({
  		width: 1200,
  		height: 600,
      icon: 'app/images/hackVT-icon.png'
  	});

  	win.loadURL(`file://${__dirname}/app/index.html`);
  	win.on('closed', onClosed);

  	return win;
  }

  app.on('window-all-closed', () => {
  	if (process.platform !== 'darwin') {
  		app.quit();
  	}
  });

  app.on('activate', () => {
  	if (!mainWindow) {
  		mainWindow = createMainWindow();
  	}
  });

  app.on('ready', () => {
  	mainWindow = createMainWindow();
  });
}());
