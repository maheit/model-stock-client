const path = require("path");
const pagesConfig = require("./pages");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let pagesList = { ...pagesConfig.pages };
let pages = {};

let htmlWebpackPluginsPages = [];

Object.keys(pagesList).forEach((key) => {
  pages[`${key}`] = pagesList[`${key}`]["chunk"];
  let jsChunks = [`${key}`];
  let basicDetails = {};
  if (pagesList[`${key}`]["title"]) {
    basicDetails["title"] = pagesList[`${key}`]["title"];
  }
  if (pagesList[`${key}`]["favicon"]) {
    basicDetails["favicon"] = pagesList[`${key}`]["favicon"];
  }
  if (pagesList[`${key}`]["meta"]) {
    basicDetails["meta"] = { ...pagesList[`${key}`]["meta"] };
  }
  if (pagesList[`${key}`]["scriptLoading"]) {
    basicDetails["scriptLoading"] = pagesList[`${key}`]["scriptLoading"];
  }
  htmlWebpackPluginsPages.push(
    new HtmlWebpackPlugin({
      hash: true,
      template: "templates/index.html",
      filename: `${key}.[hash].html`,
      chunks: [...jsChunks],
      minify: {
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        useShortDoctype: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
      },
      files: {
        css: [...pagesList[`${key}`]["css"]],
        js: [...pagesList[`${key}`]["js"]],
      },
      append: {
        head: `<script src="//cdn.polyfill.io/v3/polyfill.min.js"></script>`,
      },
      ...basicDetails,
    })
  );
});

console.log(JSON.stringify(pages));

module.exports = {
  entry: { ...pages },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "scripts/[name].[hash].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: [/\.scss$|\.css/],
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), ...htmlWebpackPluginsPages],
  devtool: "nosources-source-map",
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    publicPath: "/scripts/",
    compress: true,
    port: 9000,
    historyApiFallback: true,
    allowedHosts: ["localhost"],
    clientLogLevel: "debug",
    open: "Google Chrome",
    openPage: [""],
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:3000",
        pathRewrite: { "^/api": "" },
        secure: false,
      },
    ],
  },
};
