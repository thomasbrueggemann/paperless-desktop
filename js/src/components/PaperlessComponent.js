import React from "react";

class PaperlessComponent extends React.Component {
    // CONSTRUCTOR
    constructor(props, context) {
        super(props, context);
    }

    // GET HOST
    getHost() {
        return localStorage.getItem("settings.host");
    }

    // GET DATA URI
    getDataUri(url, callback) {
        if (localStorage.getItem(url)) {
            return callback(localStorage.getItem(url));
        }

        var image = new Image();
        var that = this;

        image.onload = function() {
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

    // GET COLORS
    getColors() {
        return [
            "#a6cee3",
            "#1f78b4",
            "#b2df8a",
            "#33a02c",
            "#fb9a99",
            "#e31a1c",
            "#fdbf6f",
            "#ff7f00",
            "#cab2d6",
            "#6a3d9a",
            "#b15928",
            "#000000",
            "#cccccc"
        ];
    }

    // GET TAG COLOR
    getTagColor(idx) {
        var colors = this.getColors();
        return colors[idx - 1];
    }
}

export default PaperlessComponent;
