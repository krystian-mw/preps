import express from "express";
import pages from "./pages_temp";
import path from "path";
import PreactRender from "preact-render-to-string";
import bundler from "parcel-bundler";

new bundler(["./src/**"]).bundle({
  contentHash: false,
  outDir: './dist/'
});

const app = express();

app.use(express.static("dist"));
app.use(express.static("public"));

const render = async (req, res, page) => {
  import(path.join(__dirname, "dist", `${page.template}.js`))
    .then(imp => {
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
    })
    .catch(err => {
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
  render(req, res, { template: "404" });
});

app.listen(process.env.PORT || 80);
