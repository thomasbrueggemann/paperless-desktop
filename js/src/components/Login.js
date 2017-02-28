import React from "react";
import Header from "./Header";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const ipcRenderer = electron.ipcRenderer;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // COMPONENT DID MOUNT
    componentDidMount() {
        // already logged in?
        if (
            localStorage.getItem("settings.auth.username") &&
            localStorage.getItem("settings.auth.username").length > 0 &&
            localStorage.getItem("settings.auth.password") &&
            localStorage.getItem("settings.auth.password").length > 0 &&
            localStorage.getItem("settings.host") &&
            localStorage.getItem("settings.host").length > 0
        ) {
            // send login information down the wire to the main process
            ipcRenderer.send("login", {
                username: localStorage.getItem("settings.auth.username"),
                password: localStorage.getItem("settings.auth.password")
            });

            this.goHome();
        }
    }

    // HANDLE CHANGE
    handleChange(event) {
        var s = {};
        s[event.target.name] = event.target.value;
        this.setState(s);
    }

    // HANDLE LOGIN
    handleLogin() {
        // a bit of validation
        if (!("host" in this.state) || this.state.host.length <= 0) {
            return;
        }

        if (!("username" in this.state) || this.state.username.length <= 0) {
            return;
        }

        if (!("password" in this.state) || this.state.password.length <= 0) {
            return;
        }

        // check if host has http as prefix
        var host = this.state.host;
        if (host.indexOf("http://") < 0 && host.indexOf("https://") < 0) {
            host = "http://" + host;
        }

        // all is fine
        localStorage.setItem("settings.auth.username", this.state.username);
        localStorage.setItem("settings.auth.password", this.state.password);
        localStorage.setItem("settings.host", host);

        ipcRenderer.send("login", {
            username: localStorage.getItem("settings.auth.username"),
            password: localStorage.getItem("settings.auth.password")
        });

        this.goHome();
    }

    // GO HOME
    goHome() {
        ipcRenderer.send("setSize", {
            width: 1200,
            height: 750
        });
        this.context.router.push("/documents");
    }

    // RENDER
    render() {
        return (
            <div className="center-form">
                <center>
                    <img src="icon.png" width="180" />
                </center>
                <form className="login-form">
                    <div className="form-group">
                        <label>Hostname / IP</label>
                        <input
                            type="text"
                            name="host"
                            onChange={this.handleChange.bind(this)}
                            className="form-control"
                            placeholder="Host / IP to reach paperless, eg. http://localhost:1234"
                        />
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="username"
                            onChange={this.handleChange.bind(this)}
                            name="username"
                            className="form-control"
                            placeholder="Username"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            onChange={this.handleChange.bind(this)}
                            name="password"
                            className="form-control"
                            placeholder="Password"
                        />
                    </div>
                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={this.handleLogin.bind(this)}
                            className="btn btn-form btn-primary">
                            Log in
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

// CONTEXT TYPES
Login.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Login;
