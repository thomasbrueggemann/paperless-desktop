import React from "react";
import $ from "jquery";
import axios from "axios";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const remote = electron.remote;
const dialog = remote.dialog;
const ipcRenderer = electron.ipcRenderer;

class Settings extends React.Component {
    // CONSTRUCTOR
    constructor(props) {
        super(props);

        this.old = {
            username: localStorage.getItem("settings.auth.username"),
            password: localStorage.getItem("settings.auth.password"),
            host: localStorage.getItem("settings.host")
        };

        this.state = {
            username: localStorage.getItem("settings.auth.username"),
            password: localStorage.getItem("settings.auth.password"),
            host: localStorage.getItem("settings.host")
        };
    }

    // COMPONENT DID MOUNT
    componentDidMount() {
        $(window).trigger("header.activeItem", { item: "settings" });
    }

    // HANDLE CHANGE
    handleChange(e) {
        var s = this.state;
        s[e.target.name] = e.target.value;

        this.setState(s);
    }

    // SAVE SIGN IN
    saveSignIn(e) {
        e.preventDefault();

        // check if the user information works
        var url = this.state.host + "/api/correspondents/";

        // set the localStorage to the input values
        ipcRenderer.send("login", {
            username: this.state.username,
            password: this.state.password
        });

        axios({
            method: "get",
            url: url
        })
            // the request worked out, we can save the settings
            .then(() => {
                localStorage.setItem(
                    "settings.auth.username",
                    this.state.username
                );
                localStorage.setItem(
                    "settings.auth.password",
                    this.state.password
                );
                localStorage.setItem("settings.host", this.state.host);

                this.old = {
                    username: this.state.username,
                    password: this.state.password,
                    host: this.state.host
                };
            })
            // the request did not work out, show an error
            .catch(() => {
                // reset information
                ipcRenderer.send("login", {
                    username: this.old.username,
                    password: this.old.password
                });
                this.setState({
                    username: this.old.username,
                    password: this.old.password,
                    host: this.old.host
                });

                dialog.showErrorBox(
                    "Ohoh!",
                    "These signin information can't be right. Just tested. Sad!"
                );
            });
    }

    // RENDER
    render() {
        return (
            <div className="pane-group">
                <div className="pane settings-pane">

                    <h3>SignIn</h3>
                    <hr />

                    <form className="settings-form">
                        <div className="form-group">
                            <label>URL to paperless</label>
                            <input
                                type="text"
                                name="host"
                                value={this.state.host}
                                onChange={this.handleChange.bind(this)}
                                className="form-control"
                                placeholder="For example: http://localhost:1234"
                            />
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="username"
                                value={this.state.username}
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
                                value={this.state.password}
                                onChange={this.handleChange.bind(this)}
                                name="password"
                                className="form-control"
                                placeholder="Password"
                            />
                        </div>
                        <button
                            className="btn btn-large btn-primary"
                            onClick={this.saveSignIn.bind(this)}
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Settings;
