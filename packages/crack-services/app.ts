import express = require("express");
import bodyParser = require("body-parser");
import axios from "axios";
import * as _ from "lodash";
const FormData = require("form-data");
const multer = require("multer");

async function app() {
  const port = process.env.PORT || 3000;
  const app = express();
  const upload = multer();

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use((req, res, next) => {
    const url = `https://${req.hostname}${req.path}`;

    console.log(req.hostname, req.method, req.path, req.protocol, url);

    next();
  });
  app.get("/scripts/TB401/properties", async (req, res) => {
    // res.json({
    //   success: true,
    //   free: false,
    //   hash: "",
    //   engversion: "24.3.1",
    // });
    const { data } = await axios.get(
      "http://51.38.126.82/scripts/TB401/properties",
      {
        headers: {
          ...(req.headers as any),
          host: "bablosoft.com",
        },
      }
    );

    res.json(data);
  });
  app.get("//apps/TB401/logininterface", async (req, res) => {
    const { data } = await axios.get(
      "http://51.38.126.82/apps/TB401/logininterface",
      {
        headers: {
          ...(req.headers as any),
          host: "bablosoft.com",
        },
      }
    );

    res.json(data);
  });
  app.post("//scripts/TB401/last/data", upload.none(), async (req, res) => {
    const reqBody = JSON.parse(JSON.stringify(req.body));
    const form = new FormData();

    _.forEach(reqBody, (v, k) => {
      form.append(k, v);
    });

    console.log("req.body", reqBody);

    const { data } = await axios.post(
      "http://51.38.126.82/scripts/TB401/last/data",
      form,
      {
        headers: {
          ...(req.headers as any),
          host: "bablosoft.com",
          "content-type": "multipart/form-data",
        },
      }
    );

    console.log("data", data);

    res.json(data);
  });

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}

app().catch(console.error);
