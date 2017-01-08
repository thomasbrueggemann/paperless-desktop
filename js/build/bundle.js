(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _alt = require("../alt");

var _alt2 = _interopRequireDefault(_alt);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

// CORRESPONDENTS ACTIONS

var CorrespondentsActions = (function () {
    function CorrespondentsActions() {
        _classCallCheck(this, CorrespondentsActions);

        this.generateActions("getCorrespondentsSuccess", "getCorrespondentsFail");
    }

    // GET TAGS

    _createClass(CorrespondentsActions, [{
        key: "getTags",
        value: function getTags() {

            var url = localStorage.getItem("settings.host") + "/api/correspondents/";

            (0, _axios2["default"])({
                "method": "get",
                "url": url,
                "auth": {
                    "username": localStorage.getItem("settings.auth.username"),
                    "password": localStorage.getItem("settings.auth.password")
                }
            }).then(this.actions.getCorrespondentsSuccess)["catch"](this.actions.getCorrespondentsFail);
        }
    }]);

    return CorrespondentsActions;
})();

exports["default"] = _alt2["default"].createActions(CorrespondentsActions);
module.exports = exports["default"];

},{"../alt":4,"axios":"axios"}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _alt = require("../alt");

var _alt2 = _interopRequireDefault(_alt);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

// DOCUMENTS ACTIONS

var DocumentsActions = (function () {
    function DocumentsActions() {
        _classCallCheck(this, DocumentsActions);

        this.generateActions("getDocumentsSuccess", "getDocumentsFail");
    }

    // GET DOCS

    _createClass(DocumentsActions, [{
        key: "getDocuments",
        value: function getDocuments() {

            var url = localStorage.getItem("settings.host") + "/api/documents/";

            (0, _axios2["default"])({
                "method": "get",
                "url": url,
                "auth": {
                    "username": localStorage.getItem("settings.auth.username"),
                    "password": localStorage.getItem("settings.auth.password")
                }
            }).then(this.actions.getDocumentsSuccess)["catch"](this.actions.getDocumentsFail);
        }
    }]);

    return DocumentsActions;
})();

exports["default"] = _alt2["default"].createActions(DocumentsActions);
module.exports = exports["default"];

},{"../alt":4,"axios":"axios"}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _alt = require("../alt");

var _alt2 = _interopRequireDefault(_alt);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

// TAGS ACTIONS

var TagsActions = (function () {
    function TagsActions() {
        _classCallCheck(this, TagsActions);

        this.generateActions("getTagsSuccess", "getTagsFail");
    }

    // GET TAGS

    _createClass(TagsActions, [{
        key: "getTags",
        value: function getTags() {

            var url = localStorage.getItem("settings.host") + "/api/tags/";

            (0, _axios2["default"])({
                "method": "get",
                "url": url,
                "auth": {
                    "username": localStorage.getItem("settings.auth.username"),
                    "password": localStorage.getItem("settings.auth.password")
                }
            }).then(this.actions.getTagsSuccess)["catch"](this.actions.getTagsFail);
        }
    }]);

    return TagsActions;
})();

exports["default"] = _alt2["default"].createActions(TagsActions);
module.exports = exports["default"];

},{"../alt":4,"axios":"axios"}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _alt = require("alt");

var _alt2 = _interopRequireDefault(_alt);

exports["default"] = new _alt2["default"]();
module.exports = exports["default"];

},{"alt":"alt"}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Header = require("./Header");

var _Header2 = _interopRequireDefault(_Header);

var App = (function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		_get(Object.getPrototypeOf(App.prototype), "constructor", this).call(this, props);
	}

	// COMPONENT DID MOUNT

	_createClass(App, [{
		key: "componentDidMount",
		value: function componentDidMount() {}

		// RENDER
	}, {
		key: "render",
		value: function render() {

			return _react2["default"].createElement(
				"div",
				{ className: "window" },
				_react2["default"].createElement(_Header2["default"], null),
				_react2["default"].createElement(
					"div",
					{ className: "window-content" },
					this.props.children
				)
			);
		}
	}]);

	return App;
})(_react2["default"].Component);

exports["default"] = App;
module.exports = exports["default"];

},{"./Header":8,"react":"react"}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var DocumentItem = (function (_React$Component) {
	_inherits(DocumentItem, _React$Component);

	function DocumentItem(props) {
		_classCallCheck(this, DocumentItem);

		_get(Object.getPrototypeOf(DocumentItem.prototype), "constructor", this).call(this, props);
	}

	// COMPONENT DID MOUNT

	_createClass(DocumentItem, [{
		key: "componentDidMount",
		value: function componentDidMount() {}

		// RENDER
	}, {
		key: "render",
		value: function render() {

			var divStyle = {
				backgroundImage: 'url(' + localStorage.getItem("settings.host") + this.props.document.thumbnail_url.replace("\\", "") + ')'
			};

			return _react2["default"].createElement(
				_reactRouter.Link,
				{ className: "document-item", to: "/document/" + this.props.document.id },
				_react2["default"].createElement("div", { className: "document-item-thumbnail", style: divStyle }),
				_react2["default"].createElement(
					"div",
					{ className: "document-item-title" },
					this.props.document.title
				)
			);
		}
	}]);

	return DocumentItem;
})(_react2["default"].Component);

exports["default"] = DocumentItem;
module.exports = exports["default"];

},{"react":"react","react-router":"react-router"}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _actionsDocumentsActions = require("../actions/DocumentsActions");

var _actionsDocumentsActions2 = _interopRequireDefault(_actionsDocumentsActions);

var _storesDocumentsStore = require("../stores/DocumentsStore");

var _storesDocumentsStore2 = _interopRequireDefault(_storesDocumentsStore);

var _Sidebar = require("./Sidebar");

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _DocumentItem = require("./DocumentItem");

var _DocumentItem2 = _interopRequireDefault(_DocumentItem);

var Documents = (function (_React$Component) {
	_inherits(Documents, _React$Component);

	function Documents(props) {
		_classCallCheck(this, Documents);

		_get(Object.getPrototypeOf(Documents.prototype), "constructor", this).call(this, props);
		this.state = _storesDocumentsStore2["default"].getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT

	_createClass(Documents, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			_storesDocumentsStore2["default"].listen(this.onChange);
			_actionsDocumentsActions2["default"].getDocuments();
		}

		// COMPONENT WILL UNMOUNT
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			_storesDocumentsStore2["default"].unlisten(this.onChange);
		}

		// ON CHANGE
	}, {
		key: "onChange",
		value: function onChange(state) {
			this.setState(state);
		}

		// RENDER
	}, {
		key: "render",
		value: function render() {

			if (!this.state.documents || !("results" in this.state.documents)) return null;

			return _react2["default"].createElement(
				"div",
				{ className: "pane-group" },
				_react2["default"].createElement(_Sidebar2["default"], null),
				_react2["default"].createElement(
					"div",
					{ className: "pane" },
					this.state.documents.results.map(function (d) {
						return _react2["default"].createElement(_DocumentItem2["default"], { document: d, key: d.id });
					})
				)
			);
		}
	}]);

	return Documents;
})(_react2["default"].Component);

exports["default"] = Documents;
module.exports = exports["default"];

},{"../actions/DocumentsActions":2,"../stores/DocumentsStore":16,"./DocumentItem":6,"./Sidebar":10,"react":"react"}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var Header = (function (_React$Component) {
	_inherits(Header, _React$Component);

	function Header(props) {
		_classCallCheck(this, Header);

		_get(Object.getPrototypeOf(Header.prototype), "constructor", this).call(this, props);
	}

	// COMPONENT DID MOUNT

	_createClass(Header, [{
		key: "componentDidMount",
		value: function componentDidMount() {}

		// RENDER
	}, {
		key: "render",
		value: function render() {

			return _react2["default"].createElement(
				"header",
				{ className: "toolbar toolbar-header" },
				_react2["default"].createElement(
					"h1",
					{ className: "title" },
					"Paperless"
				),
				_react2["default"].createElement(
					"div",
					{ className: "toolbar-actions" },
					_react2["default"].createElement(
						"div",
						{ className: "btn-group" },
						_react2["default"].createElement(
							"button",
							{ className: "btn btn-default", title: "Correspondents" },
							_react2["default"].createElement("span", { className: "icon icon-users" })
						),
						_react2["default"].createElement(
							"button",
							{ className: "btn btn-default active", title: "Documents" },
							_react2["default"].createElement("span", { className: "icon icon-newspaper" })
						),
						_react2["default"].createElement(
							"button",
							{ className: "btn btn-default", title: "Tags" },
							_react2["default"].createElement("span", { className: "icon icon-tag" })
						)
					),
					_react2["default"].createElement(
						"div",
						{ className: "btn-group" },
						_react2["default"].createElement(
							"button",
							{ className: "btn btn-default" },
							_react2["default"].createElement("span", { className: "icon icon-cog" })
						),
						_react2["default"].createElement(
							"button",
							{ className: "btn btn-default", title: "Logs" },
							_react2["default"].createElement("span", { className: "icon icon-menu" })
						)
					)
				)
			);
		}
	}]);

	return Header;
})(_react2["default"].Component);

exports["default"] = Header;
module.exports = exports["default"];

},{"react":"react"}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Header = require("./Header");

var _Header2 = _interopRequireDefault(_Header);

var Login = (function (_React$Component) {
	_inherits(Login, _React$Component);

	function Login(props) {
		_classCallCheck(this, Login);

		_get(Object.getPrototypeOf(Login.prototype), "constructor", this).call(this, props);
		this.state = {};
	}

	// COMPONENT DID MOUNT

	_createClass(Login, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			if (localStorage.getItem("settings.auth.username") && localStorage.getItem("settings.auth.username").length > 0 && localStorage.getItem("settings.auth.password") && localStorage.getItem("settings.auth.password").length > 0 && localStorage.getItem("settings.host") && localStorage.getItem("settings.host").length > 0) {

				this.goHome();
			}
		}

		// HANDLE CHANGE
	}, {
		key: "handleChange",
		value: function handleChange(event) {

			var s = {};
			s[event.target.name] = event.target.value;
			this.setState(s);
		}

		// HANDLE LOGIN
	}, {
		key: "handleLogin",
		value: function handleLogin() {

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

			alert("Logged in!");
			this.goHome();
		}

		// GO HOME
	}, {
		key: "goHome",
		value: function goHome() {
			this.props.history.push("/documents");
		}

		// RENDER
	}, {
		key: "render",
		value: function render() {

			return _react2["default"].createElement(
				"div",
				{ className: "center-form" },
				_react2["default"].createElement(
					"form",
					null,
					_react2["default"].createElement(
						"div",
						{ className: "form-group" },
						_react2["default"].createElement(
							"label",
							null,
							"Hostname / IP"
						),
						_react2["default"].createElement("input", { type: "text", name: "host", onChange: this.handleChange.bind(this), className: "form-control", placeholder: "Host / IP to reach paperless, eg. http://localhost:1234" })
					),
					_react2["default"].createElement(
						"div",
						{ className: "form-group" },
						_react2["default"].createElement(
							"label",
							null,
							"Username"
						),
						_react2["default"].createElement("input", { type: "username", onChange: this.handleChange.bind(this), name: "username", className: "form-control", placeholder: "Username" })
					),
					_react2["default"].createElement(
						"div",
						{ className: "form-group" },
						_react2["default"].createElement(
							"label",
							null,
							"Password"
						),
						_react2["default"].createElement("input", { type: "password", onChange: this.handleChange.bind(this), name: "password", className: "form-control", placeholder: "Password" })
					),
					_react2["default"].createElement(
						"div",
						{ className: "form-actions" },
						_react2["default"].createElement(
							"button",
							{ type: "button", onClick: this.handleLogin.bind(this), className: "btn btn-form btn-primary" },
							"Log in"
						)
					)
				)
			);
		}
	}]);

	return Login;
})(_react2["default"].Component);

exports["default"] = Login;
module.exports = exports["default"];

},{"./Header":8,"react":"react"}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _SidebarTags = require("./SidebarTags");

var _SidebarTags2 = _interopRequireDefault(_SidebarTags);

var _SidebarCorrespondents = require("./SidebarCorrespondents");

var _SidebarCorrespondents2 = _interopRequireDefault(_SidebarCorrespondents);

var Sidebar = (function (_React$Component) {
	_inherits(Sidebar, _React$Component);

	function Sidebar(props) {
		_classCallCheck(this, Sidebar);

		_get(Object.getPrototypeOf(Sidebar.prototype), "constructor", this).call(this, props);
	}

	// COMPONENT DID MOUNT

	_createClass(Sidebar, [{
		key: "componentDidMount",
		value: function componentDidMount() {}

		// RENDER
	}, {
		key: "render",
		value: function render() {

			return _react2["default"].createElement(
				"div",
				{ className: "pane pane-sm sidebar" },
				_react2["default"].createElement(_SidebarCorrespondents2["default"], null),
				_react2["default"].createElement(_SidebarTags2["default"], null)
			);
		}
	}]);

	return Sidebar;
})(_react2["default"].Component);

exports["default"] = Sidebar;
module.exports = exports["default"];

},{"./SidebarCorrespondents":11,"./SidebarTags":12,"react":"react"}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _actionsCorrespondentsActions = require("../actions/CorrespondentsActions");

var _actionsCorrespondentsActions2 = _interopRequireDefault(_actionsCorrespondentsActions);

var _storesCorrespondentsStore = require("../stores/CorrespondentsStore");

var _storesCorrespondentsStore2 = _interopRequireDefault(_storesCorrespondentsStore);

var SidebarCorrespondents = (function (_React$Component) {
	_inherits(SidebarCorrespondents, _React$Component);

	function SidebarCorrespondents(props) {
		_classCallCheck(this, SidebarCorrespondents);

		_get(Object.getPrototypeOf(SidebarCorrespondents.prototype), "constructor", this).call(this, props);
		this.state = _storesCorrespondentsStore2["default"].getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT

	_createClass(SidebarCorrespondents, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			_storesCorrespondentsStore2["default"].listen(this.onChange);
			_actionsCorrespondentsActions2["default"].getTags();
		}

		// COMPONENT WILL UNMOUNT
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			_storesCorrespondentsStore2["default"].unlisten(this.onChange);
		}

		// ON CHANGE
	}, {
		key: "onChange",
		value: function onChange(state) {
			this.setState(state);
		}

		// RENDER
	}, {
		key: "render",
		value: function render() {

			if (!this.state.correspondents || !("results" in this.state.correspondents)) return null;

			return _react2["default"].createElement(
				"nav",
				{ className: "nav-group" },
				_react2["default"].createElement(
					"h5",
					{ className: "nav-group-title" },
					"Correspondents"
				),
				this.state.correspondents.results.map(function (t) {

					return _react2["default"].createElement(
						"span",
						{ className: "nav-group-item", key: t.id },
						_react2["default"].createElement("span", { className: "icon icon-user" }),
						t.name
					);
				})
			);
		}
	}]);

	return SidebarCorrespondents;
})(_react2["default"].Component);

exports["default"] = SidebarCorrespondents;
module.exports = exports["default"];

},{"../actions/CorrespondentsActions":1,"../stores/CorrespondentsStore":15,"react":"react"}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _actionsTagsActions = require("../actions/TagsActions");

var _actionsTagsActions2 = _interopRequireDefault(_actionsTagsActions);

var _storesTagsStore = require("../stores/TagsStore");

var _storesTagsStore2 = _interopRequireDefault(_storesTagsStore);

var SidebarTags = (function (_React$Component) {
	_inherits(SidebarTags, _React$Component);

	function SidebarTags(props) {
		_classCallCheck(this, SidebarTags);

		_get(Object.getPrototypeOf(SidebarTags.prototype), "constructor", this).call(this, props);
		this.state = _storesTagsStore2["default"].getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT

	_createClass(SidebarTags, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			_storesTagsStore2["default"].listen(this.onChange);
			_actionsTagsActions2["default"].getTags();
		}

		// COMPONENT WILL UNMOUNT
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			_storesTagsStore2["default"].unlisten(this.onChange);
		}

		// GET TAG COLOR
	}, {
		key: "getTagColor",
		value: function getTagColor(idx) {
			var colors = ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#b15928", "#000000", "#cccccc"];
			return colors[idx - 1];
		}

		// ON CHANGE
	}, {
		key: "onChange",
		value: function onChange(state) {
			this.setState(state);
		}

		// RENDER
	}, {
		key: "render",
		value: function render() {
			var _this = this;

			if (!this.state.tags || !("results" in this.state.tags)) return null;

			return _react2["default"].createElement(
				"nav",
				{ className: "nav-group" },
				_react2["default"].createElement(
					"h5",
					{ className: "nav-group-title" },
					"Tags"
				),
				this.state.tags.results.map(function (t) {

					return _react2["default"].createElement(
						"span",
						{ className: "nav-group-item", key: t.id },
						_react2["default"].createElement("span", { className: "icon icon-record", style: {
								"color": _this.getTagColor(t.colour)
							} }),
						t.name
					);
				})
			);
		}
	}]);

	return SidebarTags;
})(_react2["default"].Component);

exports["default"] = SidebarTags;
module.exports = exports["default"];

},{"../actions/TagsActions":3,"../stores/TagsStore":17,"react":"react"}],13:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _routes = require("./routes");

var _routes2 = _interopRequireDefault(_routes);

_reactDom2["default"].render(_react2["default"].createElement(
  _reactRouter.Router,
  { history: _reactRouter.hashHistory },
  _routes2["default"]
), document.getElementById("app"));

},{"./routes":14,"react":"react","react-dom":"react-dom","react-router":"react-router"}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _componentsApp = require("./components/App");

var _componentsApp2 = _interopRequireDefault(_componentsApp);

var _componentsDocuments = require("./components/Documents");

var _componentsDocuments2 = _interopRequireDefault(_componentsDocuments);

var _componentsLogin = require("./components/Login");

var _componentsLogin2 = _interopRequireDefault(_componentsLogin);

exports["default"] = _react2["default"].createElement(
	_reactRouter.Route,
	{ path: "/", component: _componentsApp2["default"] },
	_react2["default"].createElement(_reactRouter.IndexRoute, { component: _componentsLogin2["default"] }),
	_react2["default"].createElement(_reactRouter.Route, { path: "/documents", component: _componentsDocuments2["default"] })
);
module.exports = exports["default"];

},{"./components/App":5,"./components/Documents":7,"./components/Login":9,"react":"react","react-router":"react-router"}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _alt = require("../alt");

var _alt2 = _interopRequireDefault(_alt);

var _actionsCorrespondentsActions = require("../actions/CorrespondentsActions");

var _actionsCorrespondentsActions2 = _interopRequireDefault(_actionsCorrespondentsActions);

// CORRESPONDENTS STORE

var CorrespondentsStore = (function () {
	function CorrespondentsStore() {
		_classCallCheck(this, CorrespondentsStore);

		this.bindActions(_actionsCorrespondentsActions2["default"]);
		this.correspondents = [];
	}

	// GET CORRESPONDENTS SUCCESS

	_createClass(CorrespondentsStore, [{
		key: "getCorrespondentsSuccess",
		value: function getCorrespondentsSuccess(result) {
			this.correspondents = result.data;
		}

		// GET CORRESPONDENTS FAIL
	}, {
		key: "getCorrespondentsFail",
		value: function getCorrespondentsFail(err) {
			console.error(err);
		}
	}]);

	return CorrespondentsStore;
})();

exports["default"] = _alt2["default"].createStore(CorrespondentsStore);
module.exports = exports["default"];

},{"../actions/CorrespondentsActions":1,"../alt":4}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _alt = require("../alt");

var _alt2 = _interopRequireDefault(_alt);

var _actionsDocumentsActions = require("../actions/DocumentsActions");

var _actionsDocumentsActions2 = _interopRequireDefault(_actionsDocumentsActions);

// DOCUMENTS STORE

var DocumentsStore = (function () {
	function DocumentsStore() {
		_classCallCheck(this, DocumentsStore);

		this.bindActions(_actionsDocumentsActions2["default"]);
		this.documents = [];
	}

	// GET DOCUMENTS SUCCESS

	_createClass(DocumentsStore, [{
		key: "getDocumentsSuccess",
		value: function getDocumentsSuccess(result) {
			this.documents = result.data;
		}

		// GET DOCUMENTS FAIL
	}, {
		key: "getDocumentsFail",
		value: function getDocumentsFail(err) {
			console.error(err);
		}
	}]);

	return DocumentsStore;
})();

exports["default"] = _alt2["default"].createStore(DocumentsStore);
module.exports = exports["default"];

},{"../actions/DocumentsActions":2,"../alt":4}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _alt = require("../alt");

var _alt2 = _interopRequireDefault(_alt);

var _actionsTagsActions = require("../actions/TagsActions");

var _actionsTagsActions2 = _interopRequireDefault(_actionsTagsActions);

// TAGS STORE

var TagsStore = (function () {
	function TagsStore() {
		_classCallCheck(this, TagsStore);

		this.bindActions(_actionsTagsActions2["default"]);
		this.tags = [];
	}

	// GET TAGS SUCCESS

	_createClass(TagsStore, [{
		key: "getTagsSuccess",
		value: function getTagsSuccess(result) {
			this.tags = result.data;
		}

		// GET TAGS FAIL
	}, {
		key: "getTagsFail",
		value: function getTagsFail(err) {
			console.error(err);
		}
	}]);

	return TagsStore;
})();

exports["default"] = _alt2["default"].createStore(TagsStore);
module.exports = exports["default"];

},{"../actions/TagsActions":3,"../alt":4}]},{},[13]);
