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
	devServer: {
		host: "localhost",
		port: "3000",
		hot: true,
		headers: {
			"Access-Control-Allow-Origin": "*"
		},
		historyApiFallback: true
	},
	entry: ["react-hot-loader/patch", path.join(__dirname, "/src/index.js")],
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loaders: ["babel-loader"]
			},
			{
				test: /\.scss$/,
				loader: "style-loader!css-loader!sass-loader"
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: "url-loader",
				options: {
					limit: 10000
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
	plugins: dev
		? [HTMLWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
		: [HTMLWebpackPluginConfig, DefinePluginConfig]
};
