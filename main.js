const {app, Menu, BrowserWindow, session, ipcMain} = require("electron");
const btoa = require("btoa");
const {download} = require("electron-dl");
const path = require("path");
const url = require("url");

// keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow;

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
			mainWindow.webContents.send("closeTab", true);
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
ipcMain.on("login", function(event, arg) {
    if(typeof arg === "string") arg = JSON.parse(arg);
	auth = arg;
});

// listen or URL download requests
ipcMain.on("download", function(e, args) {
    download(BrowserWindow.getFocusedWindow(), args.url)
        .then(dl => console.log(dl.getSavePath()))
        .catch(console.error);
});

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
	session.defaultSession.webRequest.onBeforeSendHeaders(function(details, callback) {

		// check if the auth information is present
		if(auth !== null) {
			details.requestHeaders["Authorization"] = "Basic " + btoa(auth.username + ":" + auth.password);
		}

	  	callback({ cancel: false, requestHeaders: details.requestHeaders });
	});

	// Open the DevTools.
	mainWindow.webContents.openDevTools();

	// Emitted when the window is closed.
	mainWindow.on("closed", function () {
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
app.on("window-all-closed", function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow();
	}
});
