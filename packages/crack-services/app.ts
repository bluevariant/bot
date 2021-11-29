import express = require("express");
import bodyParser = require("body-parser");

async function app() {
  const port = process.env.PORT || 3000;
  const app = express();

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use((req, res, next) => {
    console.log(req.headers, req.method, req.path, req.protocol);

    next();
  });

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}

app().catch(console.error);
