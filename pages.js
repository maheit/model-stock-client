// scriptLoading	{'blocking'|'defer'}
const pagesList = {
  index: {
    chunk: "./src/dashboard/index.js",
    js: [],
    css: [],
    title: "App for FC",
    favicon: "",
    meta: {
      viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
      "theme-color": "#a1fa11",
    },
    scriptLoading: "blocking",
  },
};
module.exports.pages = { ...pagesList };
