'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

function _interopNamespace(e) {
  if (e && e.__esModule) { return e; } else {
    var n = {};
    if (e) {
      Object.keys(e).forEach(function (k) {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      });
    }
    n['default'] = e;
    return n;
  }
}

var express = _interopDefault(require('express'));
var path = _interopDefault(require('path'));
var PreactRender = _interopDefault(require('preact-render-to-string'));
var bundler = _interopDefault(require('parcel-bundler'));

var pages = [{
  title: "Home",
  handle: "",
  template: "home"
}, {
  title: "About",
  handle: "about",
  template: "page"
}];

new bundler(["./src/**"]).bundle({
  contentHash: false,
  outDir: './dist/'
});
const app = express();
app.use(express.static("dist"));
app.use(express.static("public"));

const render = async (req, res, page) => {
  new Promise(function (resolve) { resolve(_interopNamespace(require(path.join(__dirname, "dist", `${page.template}.js`)))); }).then(imp => {
    res.send(`
      <!doctype html>
      <html>
      <head>
      ${PreactRender(imp.head())}
      </head>
      <body>
        <div id="root">${PreactRender(imp.component())}</div>
        <script src="${`/${page.template}.js`}"></script>
        </body></html>`);
  }).catch(err => {
    console.log(err.toString());
    res.statusCode = 500;
    res.end();
  });
};

pages.forEach(page => {
  app.get(`/${page.handle}`, (req, res) => {
    render(req, res, page);
  });
});
app.use((req, res) => {
  render(req, res, {
    template: "404"
  });
});
app.listen(process.env.PORT || 80);
