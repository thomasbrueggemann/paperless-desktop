import React from "react";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const remote = electron.remote;
const dialog = remote.dialog;
const ipcRenderer = electron.ipcRenderer;

class Store {
    // CONSTRUCTOR
    constructor() {
        this.router = null;
    }

    // SET ROUTER
    setRouter(router) {
        this.router = router;
    }

    // GO BACK TO LOGIN
    goBackToLogin() {
        localStorage.removeItem("settings.auth.username");
        localStorage.removeItem("settings.auth.password");
        localStorage.removeItem("settings.host");

        ipcRenderer.send("setSize", {
            width: 500,
            height: 520
        });

        if (this.router) {
            this.router.push("/login");
        }
    }
}

export default Store;
