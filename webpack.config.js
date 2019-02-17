const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const dev = process.env.NODE_ENV !== "production";

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	template: path.join(__dirname, "/src/index.html"),
	filename: "index.html",
	inject: true
});

const DefinePluginConfig = new webpack.DefinePlugin({
	"process.env.NODE_ENV": JSON.stringify("production")
});

module.exports = {
	entry: [path.join(__dirname, "/src/index.js")],
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loaders: ["babel-loader"]
			},
			{
				test: /\.s?css$/,
				loader: "style-loader!css-loader!sass-loader"
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: "url-loader",
				options: {
					limit: 10000
				}
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				loader: "file-loader",
				options: {
					name: "[name].[ext]",
					outputPath: "fonts/"
				}
			}
		]
	},
	resolve: {
		extensions: [".js", ".jsx"]
	},
	output: {
		filename: "index.js",
		path: path.join(__dirname, "/build")
	},
	mode: dev ? "development" : "production",
	plugins: [HTMLWebpackPluginConfig, DefinePluginConfig]
};
