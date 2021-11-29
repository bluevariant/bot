import express = require("express");

async function app() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`App listening at https://localhost:${port}`);
  });
}

app().catch(console.error);
