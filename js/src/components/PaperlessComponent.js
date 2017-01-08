import React from "react";

class PaperlessComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	// GET HOST
	getHost() {

		var host = localStorage.getItem("settings.host");
		host = host.replace(
			"http://",
			"http://" +
				localStorage.getItem("settings.auth.username") +
				":" +
				localStorage.getItem("settings.auth.password") +
				"@"
		);

		host = host.replace(
			"https://",
			"https://" +
				localStorage.getItem("settings.auth.username") +
				":" +
				localStorage.getItem("settings.auth.password") +
				"@"
		);

		return host;
	}

	// GET DATA URI
	getDataUri(url, callback) {
	    var image = new Image();

	    image.onload = function () {
	        var canvas = document.createElement('canvas');
	        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
	        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

	        canvas.getContext('2d').drawImage(this, 0, 0);

	        // ... or get as Data URI
	        callback(canvas.toDataURL('image/png'));
	    };

	    image.src = url;
	}
}

export default PaperlessComponent;
