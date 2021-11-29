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
  app.get("//apps/TB401/logininterface", (req, res) => {
    res.json({
      icon: "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",
      x: 10000,
      y: 10000,
      width: 10000,
      height: 10000,
      is_debug: false,
      script_id: 24322,
      login_interface_html: "",
      uses_html_interface: false,
      interface_start_type: 0,
      success: true,
      message: "",
    });
  });
  app.post("//scripts/TB401/last/data", upload.none(), async (req, res) => {
    const form = new FormData();

    _.forEach(req.body, (v, k) => {
      form.append(k, v);
    });

    console.log("req.body", req.body);

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
