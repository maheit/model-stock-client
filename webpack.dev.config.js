const path = require("path");
const pagesConfig = require("./pages");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

let pagesList = { ...pagesConfig.pages };
let pages = {};

let devUrlPatterns = [];

let htmlWebpackPluginsPages = [];

Object.keys(pagesList).forEach((key, index) => {
  pages[`${key}`] = pagesList[`${key}`]["chunk"];
  let jsChunks = [`${key}`];

  if (index === 0) {
    let urlRewrites = { from: /^\/$/, to: `/${key}.html` };
    devUrlPatterns.push(urlRewrites);
  }
  let regexString = `^/${key}`;
  let newUrlMatchPattern = new RegExp(regexString);
  let urlRewrites = { from: newUrlMatchPattern, to: `/${key}.html` };
  devUrlPatterns.push(urlRewrites);

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
      // hash: true,
      template: "templates/index.html",
      filename: `${key}.html`,
      chunks: [...jsChunks],
      minify: {
        collapseWhitespace: false,
        removeComments: false,
      },
      files: {
        css: [...pagesList[`${key}`]["css"]],
        js: [...pagesList[`${key}`]["js"]],
      },
      ...basicDetails,
    })
  );
});

console.log(JSON.stringify(pages));
console.log(devUrlPatterns);

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
          },
        },
      },
      {
        test: [/\.scss$|\.css/],
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [...htmlWebpackPluginsPages],
  devtool: "cheap-module-eval-source-map",
  devServer: {
    // contentBase: path.join(__dirname, "public/"),
    // publicPath: "/scripts/",
    compress: true,
    port: 9000,
    historyApiFallback: {
      // rewrites: [
      //   { from: /^\/$/, to: "/app.html" },
      //   { from: /^\/app1/, to: "/app1.html" },
      //   { from: /./, to: "/app.html" },
      // ],
      rewrites: devUrlPatterns,
    },
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
