import { execSync } from "child_process";
import { ensureDirSync, moveSync, removeSync } from "fs-extra";
import path = require("path");
import { readdirSync } from "fs";
import _ = require("lodash");

const setupCert = execSync("mkcert -install", {
  cwd: __dirname,
}).toString();

console.log(setupCert);

const domains = [
  "localhost",
  "127.0.0.1",
  "::1",
  "bablosoft.com",
  "*.bablosoft.com",
]
  .map((v) => `"${v}"`)
  .join(" ");

const installCert = execSync(`mkcert ${domains}`).toString();

console.log(installCert);

const saveCertDir = path.join(__dirname, ".cert");

removeSync(saveCertDir);
ensureDirSync(saveCertDir);

const files = readdirSync(__dirname);

_.forEach(files, (file) => {
  const fullPath = path.join(__dirname, file);

  if (fullPath.endsWith("-key.pem")) {
    moveSync(fullPath, path.join(saveCertDir, "key.pem"));
  } else if (fullPath.endsWith(".pem")) {
    moveSync(fullPath, path.join(saveCertDir, "cert.pem"));
  }
});
