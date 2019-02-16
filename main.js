const { app, BrowserWindow } = require("electron");

let window;

/**
 * Creates a new window
 * @returns {void}
 */
const createWindow = () => {
	// Create the browser window.
	window = new BrowserWindow({
		minWidth: 1000,
		minHeight: 650,
		width: 1200,
		height: 700,
		title: "TraceMate - Unternehmenskarten",
		center: true,
		fullscreenable: false,
		maximizable: false
	});

	window.setMenu(null);

	// and load the index.html of the app.
	window.loadFile("build/index.html");
};

// this method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// quit when all windows are closed.
app.on("window-all-closed", () => {
	// on OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") {
		app.quit();
	}

	Logger.log("Quit app");
});

app.on("activate", () => {
	// Oo OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (window === null) {
		createWindow();
	}
});
