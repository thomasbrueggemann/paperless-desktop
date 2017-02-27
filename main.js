const { app, Menu, BrowserWindow, session, ipcMain } = require("electron");
const btoa = require("btoa");
const { download } = require("electron-dl");
const path = require("path");
const url = require("url");

// keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow;
var modalWindow;

// authentication object
var auth = null;

// create menu template
var menu = Menu.buildFromTemplate([{
    "label": app.getName(),
    "submenu": [{
		"label": "About App",
		"selector": "orderFrontStandardAboutPanel:"
	},{
		"label": "Close Tab",
        "accelerator": "CmdOrCtrl+W",
		"click": function() {
			mainWindow.webContents.send("closeCurrentTab", true);
		}
	}, {
        "label": "Quit",
        "accelerator": "CmdOrCtrl+Q",
        "click": function() {
            app.quit();
        }
    }]
}]);

// listen for login message from the renderer
ipcMain.on("login", (event, arg) => {
    if(typeof arg === "string") arg = JSON.parse(arg);
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
	modalWindow.loadURL(url.format({
		pathname: path.join(__dirname, "index.html"),
		protocol: "file:",
		slashes: true
	}) + "#" + args.route);

	//modalWindow.webContents.openDevTools();

	// once the modal is ready to show, open it
	modalWindow.once("ready-to-show", () => {
		modalWindow.show()
  	});
});

// listen on close modal
ipcMain.on("closeModal", () => {
	modalWindow.hide();
});

// listen on tag add
ipcMain.on("tagAdd", (e, args) => {
	if(args.data) {
		mainWindow.webContents.send("tagAdded", args.data);
	}
});

// listen on correspondent add
ipcMain.on("correspondentAdd", (e, args) => {
	if(args.data) {
		mainWindow.webContents.send("correspondentAdded", args.data);
	}
});

// CREATE WINDOW
function createWindow () {

	Menu.setApplicationMenu(menu);

  	// Create the browser window.
  	mainWindow = new BrowserWindow({
		width: 1200,
		height: 750,
		minHeight: 200,
		minWidth: 400,
	    titleBarStyle: "hidden",
		webPreferences: {
		    webSecurity: false
		}
 	});

	// and load the index.html of the app.
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, "index.html"),
		protocol: "file:",
		slashes: true
	}));

	// ON BEFORE SEND HEADERS
	session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {

		// check if the auth information is present
		if(auth !== null) {
			details.requestHeaders["Authorization"] = "Basic " + btoa(auth.username + ":" + auth.password);
		}

		// drop all cookie information, we authenticate just via HTTP Basic
		delete details.requestHeaders["Cookie"];

	  	callback({ cancel: false, requestHeaders: details.requestHeaders });
	});

	// Open the DevTools.
	mainWindow.webContents.openDevTools();

	// Emitted when the window is closed.
	mainWindow.on("closed", () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
}

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
