/* eslint-disable */

const { app, Menu, BrowserWindow, session, ipcMain } = require("electron");
const btoa = require("btoa");
const { download } = require("electron-dl");
const path = require("path");
const url = require("url");
const appVersion = require("./package.json").version;
const os = require("os").platform();

const DEBUG = false;

// https://medium.com/@ccnokes/how-to-store-user-data-in-electron-3ba6bf66bc1e#.b6j3oex0s
const Store = require("./store.js");

// keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow;
var modalWindow;

// authentication object
var auth = null;

/*
 ___ _
/ __| |_ ___ _ _ ___
\__ \  _/ _ \ '_/ -_)
|___/\__\___/_| \___|

*/

// First instantiate the class
const store = new Store({
	// We'll call our data file 'user-preferences'
	configName: "user-preferences",
	defaults: {
		// 800x600 is the default size of our window
		windowBounds: { width: 500, height: 520 }
	}
});

/*
 __  __
|  \/  |___ _ _ _  _
| |\/| / -_) ' \ || |
|_|  |_\___|_||_\_,_|

*/

// create menu template
var menu = Menu.buildFromTemplate([
	{
		label: app.getName(),
		submenu: [
			{
				label: "About Paperless Desktop",
				selector: "orderFrontStandardAboutPanel:"
			},
			{
				label: "Quit",
				accelerator: "CmdOrCtrl+Q",
				click: function() {
					app.quit();
				}
			}
		]
	},
	{
		label: "File",
		submenu: [
			{
				label: "Close Tab",
				accelerator: "CmdOrCtrl+W",
				click: function() {
					mainWindow.webContents.send("closeCurrentTab", true);
				}
			}
		]
	},
	{
		label: "Edit",
		submenu: [
			{ label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
			{ label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
			{ label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
		]
	}
]);

/*
 _          __  __      _
(_)_ __  __|  \/  |__ _(_)_ _
| | '_ \/ _| |\/| / _` | | ' \
|_| .__/\__|_|  |_\__,_|_|_||_|
|_|

*/

// listen for login message from the renderer
ipcMain.on("login", (event, arg) => {
	if (typeof arg === "string") arg = JSON.parse(arg);
	auth = arg;
});

// listen or URL download requests
ipcMain.on("download", (e, args) => {
	download(BrowserWindow.getFocusedWindow(), args.url);
});

// listen to open a modal window
ipcMain.on("modal", (e, args) => {
	// init modal view
	modalWindow = new BrowserWindow({
		parent: mainWindow,
		modal: true,
		show: false,
		width: args.width,
		height: args.height
	});

	// build the url
	modalWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, "index.html"),
			protocol: "file:",
			slashes: true
		}) +
			"#" +
			args.route
	);

	if (DEBUG) modalWindow.webContents.openDevTools();

	// once the modal is ready to show, open it
	modalWindow.once("ready-to-show", () => {});
	modalWindow.show();
});

// listen on close modal
ipcMain.on("closeModal", () => {
	modalWindow.hide();
});

// listen on tag add
ipcMain.on("tagAdd", (e, args) => {
	if (args.data) {
		mainWindow.webContents.send("tagAdded", args.data);
	}
});

// listen on reminder add
ipcMain.on("reminderAdd", (e, args) => {
	if (args.data) {
		mainWindow.webContents.send("reminderAdded", args.data);
	}
});

// listen on correspondent add
ipcMain.on("correspondentAdd", (e, args) => {
	if (args.data) {
		mainWindow.webContents.send("correspondentAdded", args.data);
	}
});

// listen on resizing the main window
ipcMain.on("setSize", (e, args) => {
	mainWindow.setSize(args.width, args.height, false);
	mainWindow.center();
});

// listen to open the dev tools
ipcMain.on("openDevTools", (e, args) => {
	mainWindow.webContents.openDevTools();
});

// show and focus the main window
ipcMain.on("focusWindow", (e, args) => {
	mainWindow.show();
});

// listen on correspondent add
ipcMain.on("openDocument", (e, args) => {
	if (args.id) {
		mainWindow.webContents.send("openDocument", args.id);
	}
});

/* 
 __  __      _       __      ___         _
|  \/  |__ _(_)_ _   \ \    / (_)_ _  __| |_____ __ __
| |\/| / _` | | ' \   \ \/\/ /| | ' \/ _` / _ \ V  V /
|_|  |_\__,_|_|_||_|   \_/\_/ |_|_||_\__,_\___/\_/\_/

*/

/**
 * Creates a new application window
 */
function createWindow() {
	Menu.setApplicationMenu(menu);

	// First we'll get our height and width. This will be the defaults if there wasn't anything saved
	let { width, height } = store.get("windowBounds");

	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: width,
		height: height,
		minHeight: 200,
		minWidth: 400,
		titleBarStyle: "hidden",
		webPreferences: {
			webSecurity: false
		},
		center: true
	});

	// and load the index.html of the app.
	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, "index.html"),
			protocol: "file:",
			slashes: true
		})
	);

	// ON BEFORE SEND HEADERS
	session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
		// check if the auth information is present
		if (auth !== null) {
			details.requestHeaders["Authorization"] =
				"Basic " + btoa(auth.username + ":" + auth.password);
		}

		// drop all cookie information, we authenticate just via HTTP Basic
		delete details.requestHeaders["Cookie"];

		callback({ cancel: false, requestHeaders: details.requestHeaders });
	});

	// Open the DevTools.
	if (DEBUG) mainWindow.webContents.openDevTools();

	// Emitted when the window is closed.
	mainWindow.on("closed", () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});

	// The BrowserWindow class extends the node.js core EventEmitter class, so we use that API
	// to listen to events on the BrowserWindow. The resize event is emitted when the window size changes.
	mainWindow.on("resize", () => {
		// The event doesn't pass us the window size, so we call the `getBounds` method which returns an object with
		// the height, width, and x and y coordinates.
		let { width, height } = mainWindow.getBounds();
		// Now that we have them, save them using the `set` method.
		store.set("windowBounds", { width, height });
	});
}

/*
   _
  /_\  _ __ _ __
 / _ \| '_ \ '_ \
/_/ \_\ .__/ .__/
      |_|  |_|
*/

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
	// on OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// on OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow();
	}
});
