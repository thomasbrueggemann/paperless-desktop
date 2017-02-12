import React from "react";

class PaperlessComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	// GET HOST
	getHost() {
		return localStorage.getItem("settings.host");
	}

	// GET DATA URI
	getDataUri(url, callback) {

		if(localStorage.getItem(url)) {
			return callback(localStorage.getItem(url));
		}

	    var image = new Image();
		var that = this;

	    image.onload = function () {
	        var canvas = document.createElement("canvas");
	        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
	        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

	        canvas.getContext("2d").drawImage(this, 0, 0);

	        // ... or get as Data URI
			var d = canvas.toDataURL("image/png");

			localStorage.setItem(url, d);
	        return callback(d);
	    };

	    image.src = url;
	}
}

export default PaperlessComponent;
