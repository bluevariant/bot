import path = require("path");

require("./gen-cert");

import { readFileSync } from "fs";
import express = require("express");
import https = require("https");

async function app() {
  const credentials = {
    key: readFileSync(path.join(__dirname, ".cert/key.pem"), "utf8"),
    cert: readFileSync(path.join(__dirname, ".cert/cert.pem"), "utf8"),
  };
  const port = process.env.PORT || 3000;
  const app = express();
  const httpsServer = https.createServer(credentials, app);

  app.use((req, res, next) => {
    console.log(req.headers, req.path);

    next();
  });

  httpsServer.listen(port, () => {
    console.log(`App listening at https://localhost:${port}`);
  });
}

app().catch(console.error);
